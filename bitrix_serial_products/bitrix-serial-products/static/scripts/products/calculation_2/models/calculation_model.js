import { ID_MATERIALS, FIELD_MATERIALS } from '../../../../parameters/calc/materials.js';
import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../../../parameters/calc/coefficients.js';
import { MaterialsService } from './materials_service.js';
import { CoefficientsService } from './coefficients_service.js';

export class CalculationModel {
    constructor(bx24, title, productManager, fabricManager, calcProductId, materials, coefficients, calculations, calculationFields, users, currentUser, otherCalculations, calcProductFields) {
        this.bx24 = bx24;
        this.title = title;

        this.productManager = productManager;
        this.productTypeId = this.productManager.smartTypeId;
        this.productId = this.productManager.productId;

        this.materialsService = new MaterialsService(materials);
        this.coefficientsService = new CoefficientsService(coefficients);

        this.calcProductId = calcProductId;
        this.materials = materials;
        this.coefficients = coefficients;
        this.calculations = calculations;
        this.calculationFields = calculationFields;

        this.users = users;
        this.currentUser = currentUser;
        this.otherCalculations = otherCalculations.filter(calculation => calculation?.[`parentId${this.productTypeId}`] != this.productId);
        this.fabricManager = fabricManager;
        this.calcProductFields = calcProductFields;

        this.newCalculation = null;
    }

    async init() {
    }

    getChoiceCalculationId() {
        return this.productManager.getProductData('calculationId');
    }

    async setChoiceCalculationId(calculateId) {
        this.productManager.setProductData('calculationId', calculateId);
        await this.productManager.updateProduct({
            [this.productManager.getProductFieldName('calculationId')]: calculateId
        });
    }

    getCalculations() {
        let calculations = [];
        for (const calculation of this.calculations) {
            const calculationData = this.calculateFullInfo(calculation);
            calculations.push(calculationData);
        }
        return calculations;
    }

    getOtherCalculations() {
        let calculations = [];
        for (const calculation of this.otherCalculations) {
            const calculationData = this.calculateFullInfo(calculation);
            calculations.push(calculationData);
        }
        return calculations;
    }

    getCalculationById(id) {
        const calculation = this.calculations.find(calculation => calculation.id == id);
        if (!calculation) return 0;
        this.updateFabricPrice();
        return this.calculateFullInfo(calculation);
    }

    getCopyCalculation(calculationId) {
        let calculation = this.calculations.find(calculation => calculation.id == calculationId);
        calculation = this.updateMaterialsPrices(calculation);
        calculation[this.calcProductFields?.dateOfCalculation] = this.getCurrentDateTime();
        
        this.newCalculation = this.calculateFullInfo(calculation);
        return this.newCalculation;
    }

    getCopyCalculationFromOthers(calculationId) {
        let calculation = this.otherCalculations.find(calculation => calculation.id == calculationId);
        calculation = this.updateMaterialsPrices(calculation);
        calculation[this.calcProductFields?.dateOfCalculation] = this.getCurrentDateTime();
        this.newCalculation = this.calculateFullInfo(calculation);

        return this.newCalculation;
    }

    updateMaterialsPrices(calculation) {
        const calculationData = this.calculateFullInfo(calculation);
        const materials = calculationData.materials;
        for (const material of materials) {
            material.amount.value = this.getMaterialAmount(material.price.value || 0, material.value.value || 0, material.coefficient || 1);
            if (material.fields?.type === 'fabric') {
                material.comments.value = this.getFabricComment(material.fields);
                calculation[material.comments.field] = this.getFabricComment(material.fields);
            }
            calculation[material.amount.field] = material.amount.value;
        }

        calculationData.totalMaterials.value = this.calcMaterialsSummaryCost(materials);
        calculationData.cost.value = this.calcCalculationSummaryPrice(calculationData);

        calculation[this.calcProductFields?.totalMaterials] = calculationData.totalMaterials.value;
        calculation[this.calcProductFields?.cost] = calculationData.cost.value;
        return calculation;
    }


    getNewCalculation() {
        let materials = [];
        for (const fieldAlias in this.calcProductFields) {
            const fields = this.calcProductFields[fieldAlias];
            if (typeof fields === 'object' && fields !== null && (fields?.type === 'material' || fields?.type === 'fabric')) {
                materials.push({
                    title: this.getTitleField(fields.value),
                    // coefficient: this.getCoefficients(fieldAlias),
                    coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
                    price: this.getPrice(fieldAlias, fields),
                    value: { value: 0, field: fields.value, isFixed: false },
                    amount: { value: 0, field: fields.amount, isFixed: true },
                    comments: { value: this.getFabricComment(fields), field: fields.comments, isFixed: false },
                });
            }
        }
        // const materialPrices = this.getMaterialPricesWithLatestDate();

        this.newCalculation = {
            // dateOfCalculation: {value: materialPrices?.[FIELD_MATERIALS.datePriceValidity], field: this.calcProductFields.dateOfCalculation},
            dateOfCalculation: {value: this.materialsService.getClosestMaterialPrice('datePriceValidity'), field: this.calcProductFields.dateOfCalculation},
            // dateOfCalculationToday: {value: materialPrices?.[FIELD_MATERIALS.datePriceValidity], field: this.calcProductFields.dateOfCalculationToday},
            dateOfCalculationToday: {value: this.getCurrentDateTime(), field: this.calcProductFields.dateOfCalculationToday},
            constantExpenses: {value: 0, field: this.calcProductFields.constantExpenses, coefficient: this.coefficientsService.getCoefficientByKey('constantCosts')},
            generalComment: {value: '', field: this.calcProductFields.generalComment},
            cost: {value: 0, field: this.calcProductFields.cost},
            totalMaterials: {value: 0, field: this.calcProductFields.totalMaterials},
            calculationFixed: {value: 0, field: this.calcProductFields.calculationFixed},
            materials: materials,
            work: {
                amount: { value: 0, field: this.calcProductFields?.totalWork?.amount, isFixed: false },
                comments: { value: '', field: this.calcProductFields?.totalWork?.comments, isFixed: false },
            },
            subcontractorWork: {
                amount: { value: 0, field: this.calcProductFields?.subcontractorWork?.amount, isFixed: false },
                comments: { value: '', field: this.calcProductFields?.subcontractorWork?.comments, isFixed: false },
            }
        }
        return this.newCalculation;
    }

    async createNewCalculationInBx24() {
        return this.createCalculationInBx24(this.newCalculation, this.productId);
    }

    async copyCalculationToNewProduct(productId) {
        const calculationId = this.getChoiceCalculationId();
        const calculationData = this.getCalculationById(calculationId);
        return this.createCalculationInBx24(calculationData, productId);
    }

    getTitle(calculationData) {
        // Кровать | Кровать для девочки | 130 000 (78 000)
        const freeTitle = this.productManager.getProductData('freeTitle');
        const cost = calculationData.cost.value ? calculationData.cost.value : 0;
        const totalMaterials = calculationData.totalMaterials.value ? calculationData.totalMaterials.value : 0;
        return `${this.title} | ${freeTitle || '-'} | ${cost} (${totalMaterials})`;
    }

    async createCalculationInBx24(calculationData, productId) {
        if (!calculationData) return;
        console.log("=================== this.productManager =================== ", this.productManager);
        const parentEntity = this.productManager.hasDeal() ? 'parentId2' : 'parentId1';
        // const parentEntity = this.crmType === 'D' ? 'parentId2' : 'parentId1';
        const calculateData = {
            title: this.getTitle(calculationData),
            // title: `${this.productManager.getProductData('id')} ${this.title} ${this.productManager.getProductSize()}`,
            [`parentId${this.productTypeId}`]: productId,
            [parentEntity]: this.productManager.getCrmData('id'),
            [this.calcProductFields.dateOfCalculation]: this.getLastDateMaterialCost(),
            createdBy: this.currentUser?.ID,

            [calculationData.dateOfCalculation.field]: calculationData.dateOfCalculation.value,
            [calculationData.dateOfCalculationToday.field]: calculationData.dateOfCalculationToday.value,
            [calculationData.constantExpenses.field]: calculationData.constantExpenses.value,
            [calculationData.generalComment.field]: calculationData.generalComment.value,
            [calculationData.cost.field]: calculationData.cost.value,
            [calculationData.totalMaterials.field]: calculationData.totalMaterials.value,
            [calculationData.work.amount.field]: calculationData.work.amount.value,
            [calculationData.work.comments.field]: calculationData.work.comments.value,
            [calculationData.subcontractorWork.amount.field]: calculationData.subcontractorWork.amount.value,
            [calculationData.subcontractorWork.comments.field]: calculationData.subcontractorWork.comments.value,
            [calculationData.calculationFixed.field]: calculationData.calculationFixed.value,
        };

        for (const material of calculationData.materials) {
            if ('field' in material.price) {
                calculateData[material.price.field] = material.price.value;
            }
            calculateData[material.value.field] = material.value.value;
            calculateData[material.amount.field] = material.amount.value;
            calculateData[material.comments.field] = material.comments.value;
        }

        const result = await this.bx24.callMethodJS('crm.item.add', {
            entityTypeId: this.calcProductId,
            fields: calculateData
        });

        const calculation = result?.item;
        await this.setChoiceCalculationId(calculation?.id);
        this.addCalculation(calculation);
        return calculation;
    }

    // async createCalculationInBx24(productId) {
    //     if (!this.newCalculation) return;
    //     const calculateData = {
    //         title: `${this.productManager.getProductData('id')} ${this.title} ${this.productManager.getProductSize()}`,
    //         [`parentId${this.productTypeId}`]: productId,
    //         [this.calcProductFields.dateOfCalculation]: this.getLastDateMaterialCost(),
    //         createdBy: this.currentUser?.ID,

    //         [this.newCalculation.dateOfCalculation.field]: this.newCalculation.dateOfCalculation.value,
    //         [this.newCalculation.dateOfCalculationToday.field]: this.newCalculation.dateOfCalculationToday.value,
    //         [this.newCalculation.constantExpenses.field]: this.newCalculation.constantExpenses.value,
    //         [this.newCalculation.generalComment.field]: this.newCalculation.generalComment.value,
    //         [this.newCalculation.cost.field]: this.newCalculation.cost.value,
    //         [this.newCalculation.totalMaterials.field]: this.newCalculation.totalMaterials.value,
    //         [this.newCalculation.work.amount.field]: this.newCalculation.work.amount.value,
    //         [this.newCalculation.work.comments.field]: this.newCalculation.work.comments.value,
    //         [this.newCalculation.subcontractorWork.amount.field]: this.newCalculation.subcontractorWork.amount.value,
    //         [this.newCalculation.subcontractorWork.comments.field]: this.newCalculation.subcontractorWork.comments.value,
    //     };

    //     for (const material of this.newCalculation.materials) {
    //         if ('field' in material.price) {
    //             calculateData[material.price.field] = material.price.value;
    //         }
    //         calculateData[material.value.field] = material.value.value;
    //         calculateData[material.amount.field] = material.amount.value;
    //         calculateData[material.comments.field] = material.comments.value;
    //     }

    //     const result = await this.bx24.callMethodJS('crm.item.add', {
    //         entityTypeId: this.calcProductId,
    //         fields: calculateData
    //     });

    //     const calculation = result?.item;
    //     await this.setChoiceCalculationId(calculation?.id);
    //     this.addCalculation(calculation);
    //     return calculation;
    // }

    updateMaterialInNewCalculation(field, value, key) {
        if (!this.newCalculation) return;
        let materials = this.newCalculation.materials;
        for (let i = 0; i < materials.length; i++) {
            if (materials[i][key].field === field) {
                materials[i][key].value = value;
                materials[i].amount.value = this.getMaterialAmount(materials[i].price.value || 0, materials[i].value.value || 0, materials[i].coefficient || 1);
                // console.log("materials[i] = ", materials[i]);
                break;
            }
        }
        
        this.newCalculation.totalMaterials.value = this.calcMaterialsSummaryCost(materials);
        this.newCalculation.cost.value = this.calcCalculationSummaryPrice(this.newCalculation);
        return this.newCalculation;
    }

    updateNewCalculation(field, value, rowKey, colKey) {
        if (!this.newCalculation) return;
        this.newCalculation[rowKey][colKey].value = value;
        this.newCalculation.cost.value = this.calcCalculationSummaryPrice(this.newCalculation);
        return this.newCalculation;
    }

    updateGeneralCommentNewCalculation(field, value) {
        if (!this.newCalculation) return;
        this.newCalculation.generalComment.value = value;
        return this.newCalculation;
    }

    updateCalculationFixed(field, value) {
        if (!this.newCalculation) return;
        console.log("updateCalculationFixed = ", field, value);
        this.newCalculation.calculationFixed.value = value;
        return this.newCalculation;
    }

    getMaterialAmount(price, value, coefficient) {
        return (+price * +value) * +coefficient;
    }

    calcMaterialsSummaryCost(materials) {
        let total = 0;
        for (const material of materials) {
            total += +material.amount.value;
            // total += this.getMaterialAmount(material.price.value, materials[i].value.value, materials[i].coefficient);
        }
        // return total;
        return Math.ceil(total / 100) * 100
    }

    calcCalculationSummaryPrice(calculation) {
        const total = +calculation.totalMaterials.value
            + +calculation.constantExpenses.value
            + +calculation.work.amount.value
            + +calculation.subcontractorWork.amount.value;

        return Math.ceil(total / 100) * 100

    }

    calculateFullInfo(calculation) {
        let materials = [];
        for (const fieldAlias in this.calcProductFields) {
            const fields = this.calcProductFields[fieldAlias];
            if (typeof fields === 'object' && fields !== null && (fields?.type === 'material' || fields?.type === 'fabric')) {
                // Создание списка материалов
                materials.push({
                    title: this.getTitleField(fields.value),
                    // coefficient: this.getCoefficients(fieldAlias),
                    coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
                    price: this.getPriceByDate(fieldAlias, fields, calculation, calculation[this.calcProductFields?.dateOfCalculation]),
                    value: { value: calculation[this.calcProductFields?.[fieldAlias]?.value] || 0, field: fields.value, isFixed: false },
                    amount: { value: calculation[this.calcProductFields?.[fieldAlias]?.amount] || 0, field: fields.amount, isFixed: true },
                    // comments: { value: this.getFabricComment(fields), field: fields.comments, isFixed: false },
                    comments: { value: calculation[this.calcProductFields?.[fieldAlias]?.comments] || '', field: fields.comments, isFixed: false },
                    fields: fields,
                });
            }
        }
        // console.log('calculation = ', calculation);
        return {
            id: calculation.id,
            title: calculation?.title || '',
            createdBy: this.users[calculation?.createdBy],
            dateOfCalculation: {value: calculation[this.calcProductFields?.dateOfCalculation] || '', field: this.calcProductFields.dateOfCalculation},
            dateOfCalculationToday: {value: calculation[this.calcProductFields?.dateOfCalculationToday] || '', field: this.calcProductFields.dateOfCalculationToday},
            // constantExpenses: {value: calculation[this.calcProductFields?.constantExpenses] || 0, field: this.calcProductFields.constantExpenses, coefficient: this.coefficients?.[FIELD_COEFFICIENTS.constantCosts.fieldId]},
            constantExpenses: {value: calculation[this.calcProductFields?.constantExpenses] || 0, field: this.calcProductFields.constantExpenses, coefficient: this.coefficientsService.getCoefficientByKey('constantCosts')},
            generalComment: {value: calculation[this.calcProductFields?.generalComment] || '', field: this.calcProductFields.generalComment},
            cost: {value: calculation[this.calcProductFields?.cost] || 0, field: this.calcProductFields.cost},
            finalCalculation: {value: calculation[this.calcProductFields?.finalCalculation] === 'Y', field: this.calcProductFields.finalCalculation},
            totalMaterials: {value: calculation[this.calcProductFields?.totalMaterials] || 0, field: this.calcProductFields.totalMaterials},
            calculationFixed: {value: calculation[this.calcProductFields?.calculationFixed] || 0, field: this.calcProductFields.calculationFixed},
            materials: materials,
            work: {
                amount: { value: calculation[this.calcProductFields?.totalWork?.amount] || 0, field: this.calcProductFields?.totalWork?.amount, isFixed: false },
                comments: { value: calculation[this.calcProductFields?.totalWork?.comments] || '', field: this.calcProductFields?.totalWork?.comments, isFixed: false },
            },
            subcontractorWork: {
                amount: { value: calculation[this.calcProductFields?.subcontractorWork?.amount] || 0, field: this.calcProductFields?.subcontractorWork?.amount, isFixed: false },
                comments: { value: calculation[this.calcProductFields?.subcontractorWork?.comments] || '', field: this.calcProductFields?.subcontractorWork?.comments, isFixed: false },
            }
        };
    }

    getTitleField(fieldAlias) {
        return this.calculationFields?.[fieldAlias]?.title || '-';
    }

    // getCoefficients(fieldAlias) {
    //     const fieldInBx24 = FIELD_COEFFICIENTS?.[fieldAlias]?.fieldId;
    //     if (!fieldInBx24) {
    //         return 1;
    //     }
    //     const coefficient = this.coefficients?.[fieldInBx24] || 1;
    //     return +coefficient;
    // }

    getPriceByDate(fieldAlias, fields, calculation, dateTarget) {
        if ('price' in fields) {
            // Цена указана в расчете
            return { value: +calculation[this.calcProductFields?.[fieldAlias]?.price] || 0, field: fields.price, isFixed: false };
        }
        if (fields?.type === 'fabric') {
            // Цена берется из СП "список материалов"
            let price = 0;
            switch (fields?.number) {
                case 1:
                    price = this.fabricManager.getFabricPrice1();
                    break;
                case 2:
                    price = this.fabricManager.getFabricPrice2();
                    break;
                case 3:
                    price = this.fabricManager.getFabricPrice3();
                    break;
            }
            return { value: +price, isFixed: true };
        
        }

        // Цена берется из СП "список материалов"
        // const material = this.getMaterialPricesClosestDateLessOrEqual(dateTarget);
        // const fieldMaterial = FIELD_MATERIALS?.[fieldAlias];
        // return { value: +material?.[fieldMaterial], isFixed: true };
        const material = this.materialsService.getClosestMaterialPrice(fieldAlias, dateTarget);
        return { value: +material, isFixed: true };
    }

    getPrice(fieldAlias, fields, calculation = {}) {
        if ('price' in fields) {
            // Цена указана в расчете
            return { value: +calculation[this.calcProductFields?.[fieldAlias]?.price] || 0, field: fields.price, isFixed: false };
        }
        if (fields?.type === 'fabric') {
            // Цена берется из СП "список материалов"
            let price = 0;
            switch (fields?.number) {
                case 1:
                    price = this.fabricManager.getFabricPrice1();
                    break;
                case 2:
                    price = this.fabricManager.getFabricPrice2();
                    break;
                case 3:
                    price = this.fabricManager.getFabricPrice3();
                    break;
            }
            return { value: +price, isFixed: true };
        }

        // Цена берется из СП "список материалов"
        // const material = this.getMaterialPricesWithLatestDate();
        // const fieldMaterial = FIELD_MATERIALS?.[fieldAlias];
        // return { value: +material?.[fieldMaterial], isFixed: true };
        const material = this.materialsService.getClosestMaterialPrice(fieldAlias);
        return { value: +material, isFixed: true };
    }

    getFabricComment(fields) {
        // name (collection - price)
        if (fields?.type === 'fabric') {
            // Цена берется из СП "список материалов"
            switch (fields?.number) {
                case 1:
                    return `${this.fabricManager.getFabricName1()} (${this.fabricManager.getFabricCollection1()} - ${this.fabricManager.getFabricPrice1()})`;
                case 2:
                    return `${this.fabricManager.getFabricName2()} (${this.fabricManager.getFabricCollection2()} - ${this.fabricManager.getFabricPrice2()})`;
                case 3:
                    return `${this.fabricManager.getFabricName3()} (${this.fabricManager.getFabricCollection3()} - ${this.fabricManager.getFabricPrice3()})`;
            }
        }        
        return '';
    }

    getLastDateMaterialCost() {
        // const materialPrices = this.getMaterialPricesWithLatestDate();
        // return materialPrices?.[FIELD_MATERIALS.datePriceValidity];
        const materialPrices = this.materialsService.getClosestMaterialPrice('datePriceValidity');
        return materialPrices;
    }

    // async updateFabricPriceInCalculation() {
    //     if (this.calculations.length > 0) {
    //         const calculation = this.calculations[0];
    //         let cmd = {
    //         };
    //         const result = await this.bx24.callMethodJS('crm.item.update', {
    //             id: calculation?.id,
    //             entityTypeId: this.calcProductId,
    //             fields: {
    //                 [this.calcProductFields?.fabricPrice]: calculation[this.calcProductFields?.fabricPrice]
    //             }
    //         });
    //     }
    // }

    updateFabricPrice() {
        console.log("this.productManager.isPotochka() = ", this.productManager.isPotochka());
        if (!this.productManager.isPotochka()) {
            return;
        }
        let calculation = this.calculations[0];
        console.log("updateFabricPrice = ", calculation);
        const calculationData = this.calculateFullInfo(calculation);
        let materials = calculationData.materials;
        for (let material of materials) {
            material.amount.value = this.getMaterialAmount(material.price.value || 0, material.value.value || 0, material.coefficient || 1);
            // calculation.materials.find(m => m.id === material.id).amount.value = material.amount.value;
            calculation[material.amount.field] = material.amount.value;
            // console.log("updateFabricPrice material = ", material);
        }

        calculationData.totalMaterials.value = this.calcMaterialsSummaryCost(materials);
        calculationData.cost.value = this.calcCalculationSummaryPrice(calculationData);

        calculation[this.calcProductFields?.totalMaterials] = calculationData.totalMaterials.value;
        calculation[this.calcProductFields?.cost] = calculationData.cost.value;
    }

    async updateCalculation() {
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<updateCalculation>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        if (!this.productManager.isPotochka()) {
            return;
        }
        if (this.calculations.length > 0) {
            this.updateFabricPrice();
            const calculation = this.calculations[0];
            const cmd = {
                [this.calcProductFields?.totalMaterials]: calculation[this.calcProductFields?.totalMaterials],
                [this.calcProductFields?.cost]: calculation[this.calcProductFields?.cost],
            };
            const calculationData = this.calculateFullInfo(calculation);
            for (let material of calculationData.materials) {
                cmd[material.amount.field] = material.amount.value;
            }
            console.log("update calculation cmd = ", cmd);
            // const result = await this.bx24.callMethodJS('crm.item.update', {
            const result = await this.bx24.callMethod('crm.item.update', {
                id: calculation?.id,
                entityTypeId: this.calcProductId,
                fields: cmd
            });
            console.log("update calculation result = ", result);
        }
    }

    addCalculation(calculation) {
        this.calculations.push(calculation);
    }

    getLastDateMaterialCost() {
        // const materialPrices = this.getMaterialPricesWithLatestDate();
        // return materialPrices?.[FIELD_MATERIALS.datePriceValidity];
        const materialPrices = this.materialsService.getClosestMaterialPrice('datePriceValidity');
        return materialPrices;
    }

    getCurrentDateTime() {
        const now = new Date();
        return now.toISOString();
    }

    isActualCalculation(calculationId) {
        const calculation = this.getCalculationById(calculationId);
        if (!calculation) {
            return false;
        }
        // const lastDateMaterial = this.getMaterialPricesWithLatestDate();
        const lastDateMaterial = this.materialsService.getClosestMaterialPrice('datePriceValidity');
        if (!lastDateMaterial || !calculation.dateOfCalculation) {
            return false;
        }
        // const dateLastMaterial = new Date(lastDateMaterial[FIELD_MATERIALS.datePriceValidity]);
        const dateLastMaterial = new Date(lastDateMaterial);
        const dateCalculation = new Date(calculation?.dateOfCalculation?.value);
        return !isNaN(dateLastMaterial.getTime()) && !isNaN(dateCalculation.getTime()) && dateCalculation <= dateLastMaterial;
    }

    getFinallyCost() {
        const calculationId = this.productManager.getProductData('calculationId');
        const calculation = this.getCalculationById(calculationId);
        return calculation?.cost?.value || 0;
    }
}



// getMaterialPricesWithLatestDate() {
//     if (!Array.isArray(this.materials) || this.materials.length === 0) {
//         return null;
//     }
//     let latestMaterial = this.materials[0];
//     let latestDate = new Date(latestMaterial[FIELD_MATERIALS.datePriceValidity]);
//     for (let i = 1; i < this.materials.length; i++) {
//         const currentDate = new Date(this.materials[i][FIELD_MATERIALS.datePriceValidity]);
//         if (currentDate > latestDate) {
//             latestMaterial = this.materials[i];
//             latestDate = currentDate;
//         }
//     }
//     return latestMaterial;
// }

// getMaterialPricesClosestDateLessOrEqual(targetDate) {
//     const targetDateObj = new Date(targetDate);
//     let closestItem = null;
//     let closestDate = null;
//     for (const material of this.materials) {
//         const itemDate = new Date(material[FIELD_MATERIALS.datePriceValidity]);
//         if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
//             closestItem = material;
//             closestDate = itemDate;
//         }
//     }
//     return closestItem;
// }
