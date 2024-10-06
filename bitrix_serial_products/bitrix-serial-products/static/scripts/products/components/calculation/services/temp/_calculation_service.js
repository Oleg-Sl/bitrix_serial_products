// import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';


export default class CalculationsService {
    constructor(dataService, coefficientsService, materialsService, usersService) {
        this.dataService = dataService;
        this.coefficientsService = coefficientsService;
        this.materialsService = materialsService;
        this.usersService = usersService;

        this.calculations = this.dataService.getCalculations();
        this.calculationFields = this.dataService.getCalculationFields();
        this.calculationFieldsAliases = this.dataService.getCalcFieldsAliases();
        this.otherCalculations = this.dataService.getOtherCalculations();

        // this.changedData = {};
    }

    getCalculations() {
        let calculations = [];
        for (const calculation of this.calculations) {
            const calculationData = this.calculateFullInfo(calculation);
            calculations.push(calculationData);
        }

        return calculations;
    }

    calculateFullInfo(calculation) {
        let materials = [];
        console.log('this.calculationFields = ', this.calculationFields);
        for (const [fieldAlias, fieldData] of Object.entries(this.calculationFieldsAliases)) {
            if (typeof fieldData === 'object' && fieldData !== null && (fieldData?.type === 'material' || fieldData?.type === 'fabric')) {
                // Создание списка материалов
                // console.log('fieldData = ', fieldData);
                materials.push({
                    title: this.getTitleField(fieldData.value),
                    coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
                    price: this.getPriceByDate(fieldAlias, fieldData, calculation, calculation[this.calculationFieldsAliases?.dateOfCalculation]),
                    value: { value: calculation[this.calculationFieldsAliases?.[fieldAlias]?.value] || 0, field: fieldData.value, isFixed: false },
                    amount: { value: calculation[this.calculationFieldsAliases?.[fieldAlias]?.amount] || 0, field: fieldData.amount, isFixed: true },
                    comments: { value: calculation[this.calculationFieldsAliases?.[fieldAlias]?.comments] || '', field: fieldData.comments, isFixed: false },
                    fields: fieldData,
                });
            }
        }
        // console.log('materials = ', materials);
        // console.log('this.usersService = ', this.usersService);
        // console.log('calculation = ', calculation);
        return {
            id: calculation.id,
            title: calculation?.title || '',
            createdBy: this.usersService.getUser(calculation?.createdBy),
            dateOfCalculation: {value: calculation[this.calculationFieldsAliases?.dateOfCalculation] || '', field: this.calculationFieldsAliases.dateOfCalculation},
            dateOfCalculationToday: {value: calculation[this.calculationFieldsAliases?.dateOfCalculationToday] || '', field: this.calculationFieldsAliases.dateOfCalculationToday},
            // constantExpenses: {value: calculation[this.calculationFieldsAliases?.constantExpenses] || 0, field: this.calculationFieldsAliases.constantExpenses, coefficient: this.coefficients?.[FIELD_COEFFICIENTS.constantCosts.fieldId]},
            constantExpenses: {value: calculation[this.calculationFieldsAliases?.constantExpenses] || 0, field: this.calculationFieldsAliases.constantExpenses, coefficient: this.coefficientsService.getCoefficientByKey('constantCosts')},
            generalComment: {value: calculation[this.calculationFieldsAliases?.generalComment] || '', field: this.calculationFieldsAliases.generalComment},
            cost: {value: calculation[this.calculationFieldsAliases?.cost] || 0, field: this.calculationFieldsAliases.cost},
            finalCalculation: {value: calculation[this.calculationFieldsAliases?.finalCalculation] === 'Y', field: this.calculationFieldsAliases.finalCalculation},
            totalMaterials: {value: calculation[this.calculationFieldsAliases?.totalMaterials] || 0, field: this.calculationFieldsAliases.totalMaterials},
            calculationFixed: {value: calculation[this.calculationFieldsAliases?.calculationFixed] || 0, field: this.calculationFieldsAliases.calculationFixed},
            materials: materials,
            work: {
                amount: { value: calculation[this.calculationFieldsAliases?.totalWork?.amount] || 0, field: this.calculationFieldsAliases?.totalWork?.amount, isFixed: false },
                comments: { value: calculation[this.calculationFieldsAliases?.totalWork?.comments] || '', field: this.calculationFieldsAliases?.totalWork?.comments, isFixed: false },
            },
            subcontractorWork: {
                amount: { value: calculation[this.calculationFieldsAliases?.subcontractorWork?.amount] || 0, field: this.calculationFieldsAliases?.subcontractorWork?.amount, isFixed: false },
                comments: { value: calculation[this.calculationFieldsAliases?.subcontractorWork?.comments] || '', field: this.calculationFieldsAliases?.subcontractorWork?.comments, isFixed: false },
            }
        };
    }

    getTitleField(field) {
        // console.log('fieldAlias = ', fieldAlias);
        return this.calculationFields?.[field]?.title || '-';
    }

    getPriceByDate(fieldAlias, fields, calculation, dateTarget) {
        if ('price' in fields) {
            return { value: +calculation[this.calcProductFields?.[fieldAlias]?.price] || 0, field: fields.price, isFixed: false };
        }
        // if (fields?.type === 'fabric') {
        //     // Цена берется из СП "список материалов"
        //     let price = 0;
        //     switch (fields?.number) {
        //         case 1:
        //             price = this.fabricManager.getFabricPrice1();
        //             break;
        //         case 2:
        //             price = this.fabricManager.getFabricPrice2();
        //             break;
        //         case 3:
        //             price = this.fabricManager.getFabricPrice3();
        //             break;
        //     }
        //     return { value: +price, isFixed: true };
        // }

        const material = this.materialsService.getClosestMaterialPrice(fieldAlias, dateTarget);
        return { value: +material, isFixed: true };
    }

    // getProductData() {
    //     return this.productData;
    // }

    // getProductDataMap() {
    //     return mapKeys(this.productData);
    // }

    // getProductFields() {
    //     return this.productFields;
    // }

    // getProductFieldData(fieldAlias) {
    //     const field = this.productFieldsMatching[fieldAlias];
    //     return this.productFields[field];
    // }

    // getValue(field) {
    //     const data = mapKeys(this.productData);
    //     return data[field];
    // }

    // getFieldMatching() {
    //     return this.productFieldsMatching;
    // }

    // updateProductData(fieldAlias, value) {
    //     const field = this.productFieldsMatching[fieldAlias];
    //     this.changedData[field] = value;
    //     console.log("changedData = ", this.changedData);
    // }
}
