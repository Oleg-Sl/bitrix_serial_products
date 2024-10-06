import { ID_SOFA, ID_ARMCHAIR, ID_BED, ID_POUF, ID_MSP, ID_NIGHTSTAND, ID_TABLE, ID_CHAIR, ID_MELOCHEVKA } from '../import.js'


export default class Calculation {
    constructor(services, calculationRawData, productTypeId, productId, productNameRus, isNewCalculation, cbGetProductData) {
        this.calculationRawData = calculationRawData;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.cbGetProductData = cbGetProductData;
        this.smartFotId = null;

        this.fotService = services.fot;
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
        this.initManagement();
        this.initRent();
        this.initComment();
        this.calculateVariableData();
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
            if (fieldData && (fieldData.type === 'material' || fieldData.type === 'fabric')) {
                this.materials.push({
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
    }

    initCheckListQuestions() {
        this.questions = this.checklistcomplexityService.getQuestions();
    }

    initFot() {
        this.fots = [];
        const fotRawData = this.fotService.getFotByParentId(this.calculationRawData.id) || {};
        this.smartFotId = fotRawData.id;
        for (const fotAlias of this.fotService.getFotCodeList()) {
            let fot = {
                code: fotAlias,
                title: this.fotService.getFotTitle(fotAlias),
                estimate: fotRawData[this.fotService.getEstimateField(fotAlias)] || 0,
                coefficient: fotRawData[this.fotService.getGrowthField(fotAlias)] || 0,
                total: fotRawData[this.fotService.getFinalAmountField(fotAlias)] || 0,
                checksum: 0,
                basicSalary: this.coefficientsFotService.getBaseSalaryWorker(fotAlias),
                comment: fotRawData[this.fotService.getCommentField(fotAlias)] || 0,
            };
            this.calculateFotChecksum(fot);
            this.fots.push(fot);
        }
    }

    initManagement() {
        let costManagement = 0;
        const baseSalaryRateManagement = this.coefficientsFotService.getManagementField('baseSalaryRate');
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
                costManagement = costWorkUpholstery / costPerHourUpholstery / staffCountUpholstery * baseSalaryRateManagement || 0;
            case ID_NIGHTSTAND:
            case ID_TABLE:
            case ID_CHAIR:
                // Тумба, Стол, Стул
                const fotPainting = this.fots.find((item) => item.code === 'painting');
                const costWorkPainting = fotPainting.total;
                const costPerHourPainting = this.coefficientsFotService.getCostPerHour('painting');
                costManagement = costWorkPainting / costPerHourPainting * baseSalaryRateManagement || 0;
        }
        this.costManagement = isFinite(costManagement) ? costManagement : 0;
    }

    initRent() {
        const baseSalaryRateRent = this.coefficientsFotService.getRentField('baseSalaryRate');
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
                // console.log("costWorkUpholstery = ", costWorkUpholstery);
                // console.log("costPerHourUpholstery = ", costPerHourUpholstery);
                // console.log("staffCountUpholstery = ", staffCountUpholstery);
                // console.log("baseSalaryRateRent = ", baseSalaryRateRent);
                costRent = costWorkUpholstery / costPerHourUpholstery / staffCountUpholstery * baseSalaryRateRent || 0;
                break;
            case ID_NIGHTSTAND:
            case ID_TABLE:
            case ID_CHAIR:
                // Тумба, Стол, Стул
                const fotPainting = this.fots.find((item) => item.code === 'painting');
                const costWorkPainting = fotPainting.total;
                const costPerHourPainting = this.coefficientsFotService.getCostPerHour('painting');
                costRent = costWorkPainting / costPerHourPainting * baseSalaryRateRent || 0;
                break;
        }

        this.costRent = isFinite(costRent) ? costRent : 0;
    }

    initSalesRange() {
        let salesRange = [];
        const coefficients = this.coefficientsService.getMurkup();
        for (const k of coefficients) {
            salesRange.push({
                coefficient: k,
                price: this.costPrice * k,
            });
        }
        return salesRange;
    }

    initComment() {
        const field = this.calculationFieldsService.getFieldKeyByAlias('generalComment');
        return this.calculationRawData[field] || '';
    }



    calculateVariableData() {
        this.summaryMaterials = this.materials.reduce((sum, current) => sum + +current.amount.value, 0);
        this.summaryFot = this.fots.reduce((sum, current) => sum + +current.total, 0);
        this.costPrice = this.summaryMaterials + this.summaryFot + this.costManagement + this.costRent;
        this.salesRange = this.initSalesRange();
    }

    changeMaterialPrice(materialCode, field, newValue) {
        let material = this.materials.find((item) => item.code === materialCode);
        material[field].value = newValue;
        material.amount.value = material.price.value * material.value.value * material.coefficient;
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

    changeFotCoefficient(fotCode, newValue) {
        let fot = this.fots.find((item) => item.code === fotCode);
        fot.coefficient = +newValue;
        this.calculateFot(fot);
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
        const linearMeters = this.cbGetProductData().linearMeters;
        this.fots.map((fot) => {
            const baseRatePerUnit = this.coefficientsFotService.getBaseRatePerUnit(fot.code);
            const costPerHour = this.coefficientsFotService.getCostPerHour(fot.code);
            const coefficientWorker = this.checklistcomplexityService.getCoefficientWorker(this.cbGetProductData(), fot.code);
            fot.coefficientWorker = coefficientWorker;
            fot.estimate = linearMeters * baseRatePerUnit + coefficientWorker * costPerHour;
            this.calculateFot(fot);
            // console.log("fot = ", fot.code);
            // console.log("baseRatePerUnit = ", baseRatePerUnit);
            // console.log("coefficientWorker = ", coefficientWorker);
            // console.log("costPerHour = ", costPerHour);e
            // console.log("baseRatePerUnit = ", baseRatePerUnit);
        });
    }

    calculateFot(fot) {
        const costPerHour = this.coefficientsFotService.getCostPerHour(fot.code);
        // const coefficientWorker = this.checklistcomplexityService.getCoefficientWorker(this.cbGetProductData(), fot.code);
        fot.total = fot.estimate + fot.coefficient * costPerHour;
        this.calculateFotChecksum(fot);
    }

    calculateFotChecksum(fot) {
        const averageWorkHoursPerMonth = this.coefficientsFotService.getAverageWorkHoursPerMonth();
        const workerCostpPeroHour = this.coefficientsFotService.getCostPerHour(fot.code)
        if (workerCostpPeroHour === 0 || fot.total === 0) {
            fot.checksum = 0;
            return;
        } 
        const countProductPerMonth = Math.ceil(averageWorkHoursPerMonth / (fot.total / workerCostpPeroHour));
        fot.checksum = countProductPerMonth * fot.total;
        this.calculateVariableData();
    }



    isAllAnswered() {
        return this.checklistcomplexityService.isAllAnswered();
    }

    isFotValid() {
        // console.log(this.fots);
        const res = this.fots.every((fot) => {
            // console.log(0.95 * fot.basicSalary, fot.checksum,  1.05 * fot.basicSalary);
            return 0.95 * fot.basicSalary < fot.checksum && fot.checksum < 1.05 * fot.basicSalary;
        });
        // console.log("res = ", res);

        return res;
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



    getCalculationSmartData() {
        let data = {
            [`parentId${this.productTypeId}`]: this.productId,
            title: this.getTitle(),
            [this.calculationFieldsService.getFieldKeyByAlias('dateOfCalculation')]: this.dateOfCalculation,
            [this.calculationFieldsService.getFieldKeyByAlias('generalComment')]: this.comment,
            [this.calculationFieldsService.getFieldKeyByAlias('cost')]: this.costPrice,
        };
        for (let material of this.materials) {
            for (const key in material) {
                const fieldData = material[key];
                if (typeof(fieldData) === 'object' && !fieldData.isFixed) {
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
            title: this.getTitle(),
        };
        for (const fot of this.fots) {
            data[this.fotService.getEstimateField(fot.code)] = fot.estimate;
            data[this.fotService.getGrowthField(fot.code)] = fot.coefficient;
            data[this.fotService.getFinalAmountField(fot.code)] = fot.total;
            data[this.fotService.getCommentField(fot.code)] = fot.comment;
        }
        return data;
    }



}
