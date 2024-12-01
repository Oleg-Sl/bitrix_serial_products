import { ID_SOFA, ID_ARMCHAIR, ID_BED, ID_POUF, ID_MSP, ID_NIGHTSTAND, ID_TABLE, ID_CHAIR, ID_MELOCHEVKA } from '../import.js';


export default class Calculation {
    constructor(services, calculationRawData, productTypeId, productId, productNameRus, isNewCalculation, cbGetProductData) {
        this.calculationRawData = calculationRawData;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.cbGetProductData = cbGetProductData;
        this.smartFotId = null;
        this.smartEconomyId = null;

        this.fotService = services.fot;
        this.economyService = services.economy;
        this.userService = services.user;
        this.materialsService = services.materials;
        this.coefficientsService = services.coefficients;
        this.coefficientsFotService = services.coefficientsFot;
        this.checklistcomplexityService = services.checklistcomplexity;
        this.calculationFieldsService = services.calculationFields;

        this.calculationId = null;
        this.dateOfCalculation = null;
        this.dateOfCalculationToday = null;
        this.isFinalCalculation = null;
        this.createdBy = null;

        this.materials = [];
        this.materialPacked = null;
        this.questions = [];
        this.fots = [];
        this.salesRange = null;

        this.isEditFields = false;
        this.isEditFots = false;
        this.isNewCalculation = isNewCalculation;

        this.summaryMaterials = 0
        this.summaryFot = 0;
        this.costManagement = 0;
        this.costRent = 0;
        this.costPrice = 0;
        this.comment = '';
        this.commentFixed = '';

        this.isSelected = false;

        this.initialize();
    }

    initialize() {
        const fieldDateOfCalculation = this.calculationFieldsService.getFieldKeyByAlias('dateOfCalculation');
        const fieldDateOfCalculationToday = this.calculationFieldsService.getFieldKeyByAlias('dateOfCalculationToday');
        const fieldFinalCalculation = this.calculationFieldsService.getFieldKeyByAlias('finalCalculation');

        this.calculationId = this.calculationRawData.id;
        this.dateOfCalculation = this.calculationRawData[fieldDateOfCalculation] || new Date().toISOString();
        this.dateOfCalculationToday = this.calculationRawData[fieldDateOfCalculationToday] || '';
        this.isFinalCalculation = this.calculationRawData[fieldFinalCalculation] || false;
        this.createdBy = this.userService.getUser(this.calculationRawData.createdBy);

        this.initMaterials();
        this.initCheckListQuestions();
        this.initFot();
        this.initComment();

        this.updateFabricsComments();
        this.calculateVariableData();

        this.initEconomy();
    }

    recaclulate() {
        for (const [fieldAlias, fieldData] of Object.entries(this.calculationFieldsService.getAliases())) {  
            if (fieldData && fieldData.type === 'fabric') {
                let material = this.materials.find(item => item.code === fieldAlias);
                material.price = this.getPriceByDate(fieldAlias, fieldData);
                material.amount.value = material.price.value * material.value.value * material.coefficient;
                // material.comments.value = this.cbGetProductData().fabricComments?.[fieldData?.number] || 0;
            }
        }
        this.updateFabricsComments();
        this.calculateVariableData();
    }

    updateFabricsComments() {
        if (!this.isNewCalculation) {
            return;
        }
        for (const [fieldAlias, fieldData] of Object.entries(this.calculationFieldsService.getAliases())) {
            if (fieldData && fieldData.type === 'fabric') {
                let material = this.materials.find(item => item.code === fieldAlias);
                material.comments.value = this.cbGetProductData().fabricComments?.[fieldData?.number] || 0;
            }
        }
    }

    initMaterials() {
        this.materials = [];
        const getFieldValue = (fieldNameInBx, defaultValue = '') => this.calculationRawData?.[fieldNameInBx] || defaultValue;

        const createField = (fieldNameInBx, defaultValue = '', isFixed = false) => ({
            value: getFieldValue(fieldNameInBx, defaultValue),
            field: fieldNameInBx,
            isFixed
        });

        for (const [fieldAlias, fieldData] of Object.entries(this.calculationFieldsService.getAliases())) {
            if (fieldData && (fieldData.type === 'material' || fieldData.type === 'fabric' || fieldData.type === 'others')) {
                this.materials.push({
                    fieldType: fieldData.fieldType,
                    code: fieldAlias,
                    title: this.calculationFieldsService.getTitleField(fieldData.value),
                    coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
                    price: this.getPriceByDate(fieldAlias, fieldData),
                    value: createField(fieldData.value, 0, false),
                    amount: createField(fieldData.amount, 0, true),
                    comments: createField(fieldData.comments, '', false),
                });
            } else if (fieldData && fieldData.type === 'package') {
                this.materials.push({
                    fieldType: fieldData.fieldType,
                    code: fieldAlias,
                    title: this.calculationFieldsService.getTitleField(fieldData.value),
                    coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
                    price: this.getPriceByDate(fieldAlias, fieldData),
                    value: createField(fieldData.value, 0, false),
                    amount: createField(fieldData.amount, 0, true),
                    comments: createField(fieldData.comments, '', false),
                });
            }
        }
        // console.log("MATERIALS = ", this.materials);
    }

    getFabricRunningMeters() {
        let fabricRunningMeters = 0;
        this.materials.forEach(item => {
            if (item.fieldType === 'fabric') {
                fabricRunningMeters += +item.value.value;
            }
        })
        return fabricRunningMeters;
    }

    initCheckListQuestions() {
        this.questions = this.checklistcomplexityService.getQuestions();
    }

    initFot() {
        this.fots = [];
        const fotRawData = this.fotService.getFotByParentId(this.calculationRawData.id) || {};
        this.smartFotId = fotRawData.id;
        for (const fotAlias of this.fotService.getFotCodeList()) {
            const fot = {
                code: fotAlias,
                title: this.fotService.getFotTitle(fotAlias),
                estimate: fotRawData[this.fotService.getEstimateField(fotAlias)] || 0,
                allocatedHours: fotRawData[this.fotService.getAllocatedHoursField(fotAlias)] || 0,
                coefficient: fotRawData[this.fotService.getGrowthField(fotAlias)] || 0,
                total: fotRawData[this.fotService.getFinalAmountField(fotAlias)] || 0,
                checksum: 0,
                basicSalary: this.coefficientsFotService.getBaseSalaryWorker(fotAlias),
                comment: fotRawData[this.fotService.getCommentField(fotAlias)] || '',
            };
            this.fots.push(fot);
        }
    }

    initEconomy() {
        this.economies = [];
        const fabricRunningMeters = this.getFabricRunningMeters();
        const economyRawData = this.economyService.getByParentId(this.calculationRawData.id);
        this.smartEconomyId = economyRawData?.id;
        for (const economyAlias of this.economyService.getFabricAliases()) {
            const fabricSummary = this.economyService.getFabricPrice(economyAlias) * fabricRunningMeters;
            let economy = {
                code: economyAlias,
                fabricCategory: this.economyService.getFabricName(economyAlias),
                fabricPrice: this.economyService.getFabricPrice(economyAlias),
                fabricSummary: fabricSummary,
                totalCost: this.costPrice + fabricSummary,
                margin: this.coefficientsService.getCoefficient(economyAlias) || 0,
                price: economyRawData[this.economyService.getPriceField(economyAlias)] || 0
            }
            if (economyRawData == undefined) {
                economy.price = Math.ceil(economy.totalCost * (1 + economy.margin));
            }

            this.economies.push(economy);
        }
        // console.log("ECONOMIES = ", this.economies);
    }

    initComment() {
        const fieldComment = this.calculationFieldsService.getFieldKeyByAlias('generalComment');
        this.comment = this.calculationRawData[fieldComment] || '';
        const fieldCommentFixed = this.calculationFieldsService.getFieldKeyByAlias('calculationFixed');
        this.commentFixed = this.calculationRawData[fieldCommentFixed] || '';
    }

    calculateVariableData() {
        this.calculationMaterialPacked();
        this.calculateSummaryMaterials();
        this.calculateServicePackedAmount();
        this.calculateManagementAmount();
        this.calculateRentAmount();
        this.calculateSummaryFots();
        this.calculateCostPrice()
        this.calculateSalesRange();
        this.calculateChecksum();
        // this.calculateEconomies();
    }

    calculationMaterialPacked() {
        this.materialPacked = {
            price: this.coefficientsFotService.getCostPerUnit('packaging'),
            value: this.cbGetProductData().baseValue,
            amount: this.cbGetProductData().baseValue * this.coefficientsFotService.getCostPerUnit('packaging'),
        };
    }

    calculateSummaryMaterials() {
        this.summaryMaterials = Math.ceil(
            this.materials.reduce((sum, current) => sum + +current.amount.value, 0) + this.materialPacked?.amount || 0
        );
    }

    calculateSummaryFots() {
        this.summaryFot = Math.ceil(
            this.fots.reduce((sum, current) => sum + +current.total, 0)
            + this.costServicePacked
            + this.costManagement
            + this.costRent
        );
    }

    calculateManagementAmount() {
        const costPerHour = this.coefficientsFotService.getCostPerHour('management');
        
        let costManagement = 0;
        switch (this.productTypeId) {
            case ID_SOFA:
            case ID_ARMCHAIR:
            case ID_BED:
            case ID_POUF:
            case ID_MSP:
            case ID_MELOCHEVKA:
                // Диван, Кресло, Кровать, Пуф, МСП, ИНОЕ
                const fotUpholstery = this.fots.find((item) => item.code === 'upholstery');
                const costWorkUpholstery = fotUpholstery.total;
                const costPerHourUpholstery = this.coefficientsFotService.getCostPerHour('upholstery');
                const staffCountUpholstery = this.coefficientsFotService.getUpholsteryStaffCount('getUpholsteryStaffCount');
                // Сумма за работу обтясчика / на стоимость часа обтясчика (поле в смрате 1044 - фильр по Типу)  / на Кол-во обтясчиков (поле в смаре 1044 фильр по полю) * стомсоть часа руководителей
                // console.log("management = ", {
                //     fotUpholstery,
                //     costWorkUpholstery,
                //     costPerHourUpholstery,
                //     staffCountUpholstery,
                //     costPerHour
                // });
                costManagement = costWorkUpholstery / costPerHourUpholstery / staffCountUpholstery * costPerHour || 0;
                break;
            case ID_NIGHTSTAND:
            case ID_TABLE:
            case ID_CHAIR:
                // Тумба, Стол, Стул
                const fotPainting = this.fots.find((item) => item.code === 'painting');
                const costWorkPainting = fotPainting.total;
                const costPerHourPainting = this.coefficientsFotService.getCostPerHour('painting');
                // Сумма за работупокраски / на стоимость часа покркаски (поле в смрате 1044 - фильр по Типу)  * стомсоть часа руководителей
                costManagement = costWorkPainting / costPerHourPainting * costPerHour || 0;
                break;
        }
        this.costManagement = isFinite(costManagement) ? Math.ceil(costManagement) : 0;
    }

    calculateRentAmount() {
        // const baseSalaryRateRent = this.coefficientsFotService.getRentField('baseSalaryRate');
        const costPerHour = this.coefficientsFotService.getCostPerHour('rent');
        let costRent = 0;
        switch (this.productTypeId) {
            case ID_SOFA:
            case ID_ARMCHAIR:
            case ID_BED:
            case ID_POUF:
            case ID_MSP:
            case ID_MELOCHEVKA:
                // Диван, Кресло, Кровать, Пуф, МСП, ИНОЕ
                const fotUpholstery = this.fots.find((item) => item.code === 'upholstery');
                const costWorkUpholstery = fotUpholstery.total;
                const costPerHourUpholstery = this.coefficientsFotService.getCostPerHour('upholstery');
                const staffCountUpholstery = this.coefficientsFotService.getUpholsteryStaffCount('getUpholsteryStaffCount');
                // console.log("rent = ", {
                //     fotUpholstery,
                //     costWorkUpholstery,
                //     costPerHourUpholstery,
                //     staffCountUpholstery,
                //     costPerHour
                    
                // });
                // Сумма за работу обтясчика / на стоимость часа обтясчика (поле в смрате 1044 - фильр по Типу)  / на Кол-во обтясчиков (поле в смаре 1044 фильр по полю) * стомсоть часа аренды
                costRent = costWorkUpholstery / costPerHourUpholstery / staffCountUpholstery * costPerHour || 0;
                break;
            case ID_NIGHTSTAND:
            case ID_TABLE:
            case ID_CHAIR:
                // Тумба, Стол, Стул
                const fotPainting = this.fots.find((item) => item.code === 'painting');
                const costWorkPainting = fotPainting.total;
                const costPerHourPainting = this.coefficientsFotService.getCostPerHour('painting');
                // Сумма за работупокраски / на стоимость часа покркаски (поле в смрате 1044 - фильр по Типу)  * стоимость часа аренды
                costRent = costWorkPainting / costPerHourPainting * costPerHour || 0;
                break;
        }

        this.costRent = isFinite(costRent) ? Math.ceil(costRent) : 0;
    }

    calculateServicePackedAmount() {
        // const baseSalaryRateRent = this.coefficientsFotService.getRentField('baseSalaryRate');
        const costPerHour = this.coefficientsFotService.getCostPerHour('packaging');

        let costRent = 0;
        switch (this.productTypeId) {
            case ID_SOFA:
            case ID_ARMCHAIR:
            case ID_BED:
            case ID_POUF:
            case ID_MSP:
            case ID_MELOCHEVKA:
                // Диван, Кресло, Кровать, Пуф, МСП, ИНОЕ
                const fotUpholstery = this.fots.find((item) => item.code === 'upholstery');
                const costWorkUpholstery = fotUpholstery.total;
                const costPerHourUpholstery = this.coefficientsFotService.getCostPerHour('upholstery');
                const staffCountUpholstery = this.coefficientsFotService.getUpholsteryStaffCount('getUpholsteryStaffCount');
                // Сумма за работу обтясчика / на стоимость часа обтясчика (поле в смрате 1044 - фильр по Типу)  / на Кол-во обтясчиков (поле в смаре 1044 фильр по полю) * стомсоть часа аренды
                // console.log("ServicePacked = ", {
                //     fotUpholstery,
                //     costWorkUpholstery,
                //     costPerHourUpholstery,
                //     staffCountUpholstery,
                //     costPerHour
                // });
                costRent = costWorkUpholstery / costPerHourUpholstery / staffCountUpholstery * costPerHour || 0;
                break;
            case ID_NIGHTSTAND:
            case ID_TABLE:
            case ID_CHAIR:
                // Тумба, Стол, Стул
                const fotPainting = this.fots.find((item) => item.code === 'painting');
                const costWorkPainting = fotPainting.total;
                const costPerHourPainting = this.coefficientsFotService.getCostPerHour('painting');
                // Сумма за работупокраски / на стоимость часа покркаски (поле в смрате 1044 - фильр по Типу)  * стомсоть часа аренды
                costRent = costWorkPainting / costPerHourPainting * costPerHour || 0;
                break;
        }

        this.costServicePacked = isFinite(costRent) ? Math.ceil(costRent) : 0;
    }

    calculateSalesRange() {
        this.salesRange = [];
        const coefficients = this.coefficientsService.getMurkup();
        for (const k of coefficients) {
            this.salesRange.push({
                coefficient: k,
                price: Math.ceil(this.costPrice * k),
            });
        }
    }

    calculateCostPrice() {
        this.costPrice = Math.ceil(this.summaryMaterials + this.summaryFot);
    }

    calculateChecksum() {
        this.fots.map((fot) => { this.calculateFotChecksum(fot) });
    }

    changeMaterialPrice(materialCode, field, newValue) {
        let material = this.materials.find((item) => item.code === materialCode);
        material[field].value = +newValue;
        material.amount.value = Math.ceil(material.price.value * material.value.value * material.coefficient);
        this.calculateEconomies();

        this.calculateVariableData();
    }

    changeMaterialComment(materialCode, newValue) {
        let material = this.materials.find((item) => item.code === materialCode);
        material.comments.value = newValue;
    }

    changeFotEstimate(fotCode, newValue) {
        let fot = this.fots.find((item) => item.code === fotCode);
        fot.estimate = +newValue;
        this.calculateFot(fot);
        this.calculateVariableData();
    }

    changeFotAllocatedHours(fotCode, newValue) {
        let fot = this.fots.find((item) => item.code === fotCode);
        fot.allocatedHours = +newValue;
        this.calculateFot(fot);
        this.calculateVariableData();
    }

    changeFotCoefficient(fotCode, newValue) {
        let fot = this.fots.find((item) => item.code === fotCode);
        fot.coefficient = +newValue;
        this.calculateFot(fot);
        this.calculateVariableData();
    }

    changeEconomyMargin(code, value) {
        let economy = this.economies.find((item) => item.code === code);
        economy.margin = +value;
        economy.price = Math.ceil(economy.totalCost * (1 + economy.margin));
        this.calculateVariableData();
    }

    changeFotComment(fotCode, newValue) {
        let fot = this.fots.find((item) => item.code === fotCode);
        fot.comment = newValue;
    }

    answerQuestion(questionId, answer) {
        this.checklistcomplexityService.setAnswer(questionId, answer);
    }

    changeGeneralComment(newValue) {
        this.comment = newValue;
    }

    calculateDataFots() {
        const productData = this.cbGetProductData();
        const linearMeters = productData.baseValue;

        this.fots.map((fot) => {
            const baseRatePerUnit = this.coefficientsFotService.getBaseRatePerUnit(fot.code);
            const costPerHour = this.coefficientsFotService.getCostPerHour(fot.code);
            const coefficientWorker = this.checklistcomplexityService.getCoefficientWorker(productData, fot.code);
            fot.coefficientWorker = coefficientWorker;
            fot.estimate = Math.ceil(linearMeters * baseRatePerUnit + coefficientWorker * costPerHour * linearMeters);
            this.calculateFot(fot);
        });
        this.calculateVariableData();
    }

    calculateFot(fot) {
        const costPerHour = this.coefficientsFotService.getCostPerHour(fot.code);
        fot.estimate = Math.round(fot.allocatedHours * costPerHour * 100) / 100;
        fot.total = Math.ceil(fot.estimate + fot.coefficient * costPerHour);
    }

    calculateEconomies() {
        const fabricRunningMeters = this.getFabricRunningMeters();
        this.economies.map((economy) => {
            economy.fabricSummary = this.economyService.getFabricPrice(economy.code) * fabricRunningMeters;
            economy.totalCost = this.costPrice + economy.fabricSummary;
            economy.price = Math.ceil(economy.totalCost * (1 + economy.margin));
        });
    }

    calculateFotChecksum(fot) {
        const averageWorkHoursPerMonth = this.coefficientsFotService.getAverageWorkHoursPerMonth();
        const workerCostpPeroHour = this.coefficientsFotService.getCostPerHour(fot.code)
        if (workerCostpPeroHour === 0 || fot.total === 0) {
            fot.checksum = 0;
            return;
        } 
        const countProductPerMonth = Math.ceil(averageWorkHoursPerMonth / (fot.total / workerCostpPeroHour));
        fot.checksum = Math.ceil(countProductPerMonth * fot.total);
    }

    isAllAnswered() {
        return this.checklistcomplexityService.isAllAnswered();
    }

    isFotValid() {
        return this.fots.every((fot) => {
            return fot.checksum === 0 || (0.95 * fot.basicSalary < fot.checksum && fot.checksum < 1.05 * fot.basicSalary);
        });
    }

    getPriceByDate(fieldAlias, fieldData) {
        if ('price' in fieldData) {
            const priceFieldNameInBx = this.calculationFieldsService.getFieldKeyByAlias(fieldAlias)?.price;
            return {
                value: +this.calculationRawData[priceFieldNameInBx] || 0,
                field: fieldData.price,
                isFixed: false
            };
        } else if (fieldData?.type === 'fabric') {
            // console.log("====> ", fieldAlias, fieldData);
            let price = this.cbGetProductData().fabricPrices?.[fieldData?.number] || 0;
            return {
                value: +price,
                isFixed: true
            };
        }
        const dateOfCalculationField = this.calculationFieldsService.getFieldKeyByAlias('dateOfCalculation');
        const dateOfCalculation = this.calculationRawData?.[dateOfCalculationField];
        const materialPrice = this.materialsService.getClosestMaterialPrice(fieldAlias, dateOfCalculation);
        return {
            value: materialPrice,
            field: null,
            isFixed: true
        };
    }

    getTitle() {
        const freeTitle = this.cbGetProductData()?.freeTitle || '-';
        return `${this.productNameRus} | ${freeTitle || '-'} | ${this.costPrice} (${this.summaryMaterials})`;
    }

    getFotTitle() {
        const dealId = this.cbGetProductData()?.dealId;
        return `${this.productNameRus} | ФОТ | ${dealId || '-'}`;
    }

    getEconomyTitle() {
        const dealId = this.cbGetProductData()?.dealId;
        return `${this.productNameRus} | Экономика | ${dealId || '-'}`;
    }

    getTitleOtherCalculation() {
        const freeTitle = this.cbGetProductData()?.freeTitle || '-';
        // return `${this.productNameRus} | ${freeTitle || '-'} | ${this.costPrice} (${this.summaryMaterials})`;
        return `${this.productNameRus} | ${this.summaryMaterials || '-'} | ${this.summaryFot || '-'} | ${this.costPrice || '-'}`;
    }

    getFotId() {
        return this.smartFotId;
    }

    getEconomyId() {
        return this.smartEconomyId;
    }

    getCostPrice() {
        return this.costPrice;
    }

    getCalculationSmartData() {
        let data = {
            [`parentId${this.productTypeId}`]: this.productId,
            title: this.getTitle(),
            [this.calculationFieldsService.getFieldKeyByAlias('dateOfCalculation')]: this.dateOfCalculation,
            [this.calculationFieldsService.getFieldKeyByAlias('generalComment')]: this.comment,
            [this.calculationFieldsService.getFieldKeyByAlias('cost')]: this.costPrice,
        };
        const leadId = this.cbGetProductData().leadId;
        const dealId = this.cbGetProductData().dealId;
        if (leadId) {
            data.parentId1 = leadId;
        }
        if (dealId) {
            data.parentId2 = dealId;
        }
        for (let material of this.materials) {
            for (const key in material) {
                const fieldData = material[key];
                if (typeof(fieldData) === 'object' && fieldData.field) {
                    data[fieldData.field] = fieldData.value;
                }
            }
        }
        return data;

    }

    getFotSmartData(parentId) {
        let data = {
            [this.fotService.getFieldParent()]: parentId,
            [`parentId${this.productTypeId}`]: this.productId,
            title: this.getFotTitle(),
        };
        const leadId = this.cbGetProductData().leadId;
        const dealId = this.cbGetProductData().dealId;
        if (leadId) {
            data.parentId1 = leadId;
        }
        if (dealId) {
            data.parentId2 = dealId;
        }
        for (const fot of this.fots) {
            data[this.fotService.getEstimateField(fot.code)] = fot.estimate;
            data[this.fotService.getAllocatedHoursField(fot.code)] = fot.allocatedHours;
            data[this.fotService.getGrowthField(fot.code)] = fot.coefficient;
            data[this.fotService.getFinalAmountField(fot.code)] = fot.total;
            data[this.fotService.getCommentField(fot.code)] = fot.comment;
        }
        return data;
    }

    getEconomySmartData(parentId) {
        let data = {
            [this.economyService.getFieldParent()]: parentId,
            [`parentId${this.productTypeId}`]: this.productId,
            title: this.getEconomyTitle(),
        };
        const leadId = this.cbGetProductData().leadId;
        const dealId = this.cbGetProductData().dealId;
        if (leadId) {
            data.parentId1 = leadId;
        }
        if (dealId) {
            data.parentId2 = dealId;
        }
        for (const economy of this.economies) {
            data[this.economyService.getMarginField(economy.code)] = economy.margin;
            data[this.economyService.getPriceField(economy.code)] = economy.price;
        }
        return data;
    }

    resetGeneralComment() {
        this.comment = '';
    }
}
