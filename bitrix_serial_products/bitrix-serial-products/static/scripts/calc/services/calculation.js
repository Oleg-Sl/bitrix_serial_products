import { ID_SOFA } from '../../configs/products/sofa.js'
import { ID_ARMCHAIR } from '../../configs/products/armchair.js';
import { ID_BED } from '../../configs/products/bed.js';
import { ID_POUF } from '../../configs/products/pouf.js';
import { ID_MSP } from '../../configs/products/msp.js';
import { ID_NIGHTSTAND } from '../../configs/products/nightstand.js';
import { ID_TABLE } from '../../configs/products/table.js';
import { ID_CHAIR } from '../../configs/products/chair.js';
import { ID_MELOCHEVKA } from '../../configs/products/melochevka.js';


export default class Calculation {
    constructor(services, calculationRawData, productTypeId) {
        this.calculationRawData = calculationRawData;
        this.productTypeId = productTypeId;

        this.fotService = services.fot;
        this.userService = services.user;
        this.materialsService = services.materials;
        this.coefficientsService = services.coefficients;
        this.coefficientsFotService = services.coefficientsFot;
        this.checklistcomplexityService = services.checklistcomplexity;
        this.calculationFieldsService = services.calculationFields;

        this.materials = null;
        this.questions = null;
        this.fots = null;
        this.salesRange = null;

        this.summaryMaterials = 0
        this.summaryFot = 0;
        this.costManagement = 0;
        this.costRent = 0;
        this.comment = '';
    
        this.initialize();
    }

    initialize() {
        this.materials = this.initMaterials();
        this.questions = this.initCheckListQuestions();
        this.fots = this.initFot();
        this.costManagement = this.initManagement();
        this.costRent = this.initRent();

        this.summaryMaterials = this.materials.reduce((sum, current) => sum + +current.amount.value, 0);
        this.summaryFot = this.fots.reduce((sum, current) => sum + +current.total, 0);

        this.costPrice = this.initCostPrice();
        this.salesRange = this.initSalesRange();
        this.comment = this.initComment();
    }

    initMaterials() {
        let materials = [];
        const getFieldValue = (fieldNameInBx, defaultValue = '') => this.calculationRawData?.[fieldNameInBx] || defaultValue;
    
        const createField = (fieldNameInBx, defaultValue = '', isFixed = false) => ({
            value: getFieldValue(fieldNameInBx, defaultValue),
            field: fieldNameInBx,
            isFixed
        });
    
        for (const [fieldAlias, fieldData] of Object.entries(this.calculationFieldsService.getAliases())) {
            if (fieldData && (fieldData.type === 'material' || fieldData.type === 'fabric')) {
                materials.push({
                    // fields: fieldData,
                    title: this.calculationFieldsService.getTitleField(fieldData.value),
                    coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
                    price: this.getPriceByDate(fieldAlias, fieldData),
                    value: createField(fieldData.value, 0, false),
                    amount: createField(fieldData.amount, 0, true),
                    comments: createField(fieldData.comments, '', false),
                });
            }
        }

        return materials;
    }

    initCheckListQuestions() {
        return this.checklistcomplexityService.getQuestions();
    }

    initFot() {
        let fotList = [];
        const fot = this.fotService.getFotByParentId(this.calculationRawData.id);
        for (const fotAlias of this.fotService.getFotCodeList()) {
            fotList.push({
                code: fotAlias,
                title: this.fotService.getFotTitle(fotAlias),
                estimate: fot[this.fotService.getEstimateField(fotAlias)] || 0,
                coefficient: fot[this.fotService.getGrowthField(fotAlias)] || 0,
                total: fot[this.fotService.getFinalAmountField(fotAlias)] || 0,
                checksum: 0,
                comment: fot[this.fotService.getCommentField(fotAlias)] || 0,
            });
        }
        return fotList;
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
        return isFinite(costManagement) ? costManagement : 0;
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

        return isFinite(costRent) ? costRent : 0;
    }

    initCostPrice() {
        console.log("this.summaryMaterials = ", this.summaryMaterials);
        console.log("this.summaryFot = ", this.summaryFot);
        console.log("this.costManagement = ", this.costManagement);
        console.log("this.costRent = ", this.costRent);
        return this.summaryMaterials + this.summaryFot + this.costManagement + this.costRent;
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

    getPriceByDate(fieldAlias, fieldData) {
        if ('price' in fieldData) {
            const priceFieldNameInBx = this.calculationFieldsService.getFieldKeyByAlias(fieldAlias)?.price;
            return {
                value: +this.calculationRawData[priceFieldNameInBx] || 0,
                field: fieldData.price,
                isFixed: false
            };
        } else if (fieldData?.type === 'fabric') {
            let price = 0;
            switch (fieldData?.number) {
                // case 1:
                //     price = this.fabricManager.getFabricPrice1();
                //     break;
                // case 2:
                //     price = this.fabricManager.getFabricPrice2();
                //     break;
                // case 3:
                //     price = this.fabricManager.getFabricPrice3();
                //     break;
            }
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
}
