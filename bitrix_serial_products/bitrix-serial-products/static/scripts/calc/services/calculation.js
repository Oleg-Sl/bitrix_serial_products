
export default class Calculation {
    constructor(services, calculationRawData) {
        this.calculationRawData = calculationRawData;

        this.fotService = services.fot;
        this.userService = services.user;
        this.materialsService = services.materials;
        this.coefficientsService = services.coefficients;
        this.coefficientsFotService = services.coefficientsFot;
        this.checklistcomplexityService = services.checklistcomplexity;
        this.calculationFieldsService = services.calculationFields;

        this.materials = null;
        this.questions = null;
    
        this.initialize();
    }

    initialize() {
        this.materials = this.initMaterials();
        this.questions = this.initCheckListQuestions();
        this.fot = this.initFot();
        console.log('this.checkList = ', this.checkList);
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
        let fot = [];
        const fotFields = this.fotService.getFieldsFot();
        // const fot1 = {
        //     title: 0,
        //     estimate: 0,
        //     coefficient: 0,
        //     total: 0,
        //     checksum: 0,
        //     comment: 0,
        // }

        return fot;
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
