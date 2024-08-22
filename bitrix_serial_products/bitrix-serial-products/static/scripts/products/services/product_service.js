import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';


export default class ProductService {
    constructor(dataService) {
        this.dataService = dataService;

        this.productData = this.dataService.getProductData();
        this.productFields = this.dataService.getProductFields();
        this.productFieldsMatching = this.dataService.getProductFieldsMatching();

        this.changedData = {};
    }

    getProductData() {
        return this.productData;
    }

    getProductDataMap() {
        return mapKeys(this.productData);
    }

    getProductFields() {
        return this.productFields;
    }

    getProductFieldData(fieldAlias) {
        const field = this.productFieldsMatching[fieldAlias];
        return this.productFields[field];
    }

    getValue(field) {
        const data = mapKeys(this.productData);
        return data[field];
    }

    getFieldMatching() {
        return this.productFieldsMatching;
    }

    updateProductData(fieldAlias, value) {
        const field = this.productFieldsMatching[fieldAlias];
        this.changedData[field] = value;
        console.log("changedData = ", this.changedData);
    }

    // setCalculations(calculationsCount) {
    //     this.isCalculations = calculationsCount > 0;
    // }

    // isCalculation() {
    //     return this.isCalculations;
    // }

    // getFieldDataText(fieldData, value, fieldAlias) {
    //     if (fieldData.type === 'enumeration') {
    //         const item = fieldData.items?.find(item => item.ID == value);
    //         return item?.VALUE;
    //     } else if (fieldData.type === 'crm' && fieldAlias === 'sleepingMechanism') {
    //         const mechanism = this.mechanisms.find(item => item.id == value);
    //         return mechanism?.title || '-';
    //     } else if (fieldData.type === 'crm') {
    //         const fabric = this.fabrics.find(item => item.id == value);
    //         return fabric?.[FIELD_FABRICS.titleTmp] || '-';
    //     }
    //     return value || '';
    // }

    // getProductDataText(field) {
    //     const fieldInBx24 = this.smartFields?.[field];
    //     const fieldData = this.productFields[fieldInBx24];
    //     if (fieldData && fieldData.type == 'enumeration') {
    //         const items = fieldData.items;
    //         const item = items?.find(item => item.ID == this.product?.[fieldInBx24]);
    //         return item?.VALUE;
    //     }
    //     return this.product?.[fieldInBx24];
    // }

    // getProductSize() {
    //     if ('commonDimensionsDepth' in this.smartFields) {
    //         return `${this.getProductData('commonDimensionsWidth')}x${this.getProductData('commonDimensionsDepth')}x${this.getProductData('commonDimensionsHeight')} мм.`;
    //     }
    //     return `${this.getProductData('commonDimensionsWidth')}x${this.getProductData('commonDimensionsHeight')} мм.`;
    // }

    // setProductData(field, value) {
    //     const fieldInBx24 = this.smartFields?.[field];
    //     this.product[fieldInBx24] = value;
    //     this.changedProductData[fieldInBx24] = value;
    // }

    // getProductFieldData(field) {
    //     // this.smartFields
    //     console.l
    //     console.log("field = ", field);
    //     console.log("this.smartFields = ", this.smartFields);
    //     console.log("this.productFields = ", this.productFields);
    // }

    // setProductDataByFieldBx24(field, value) {
    //     this.product[field] = value;
    // }

    // getProductFieldData(field) {
    //     const fieldInBx24 = this.smartFields?.[field];
    //     const fieldData = this.productFields?.[fieldInBx24];
    //     return fieldData;
    // }

    // getProductFieldName(field) {
    //     const fieldInBx24 = this.smartFields?.[field];
    //     return fieldInBx24;
    // }

    // isPotochka() {
    //     if (this.getProductData('isPotochka') && this.itemIdIsPotochka && this.getProductData('isPotochka') == this.itemIdIsPotochka) {
    //         return true;
    //     }
    //     return false;
    // }

    // resetChangedData() {
    //     for (const [key, value] of Object.entries(this.changedProductData)) {
    //         this.product[key] = value;
    //     }
    //     this.changedProductData = {};
    // }

    // async updateData(field, value) {
    //     const fieldInBx24 = this.smartFields?.[field];
    //     this.changedProductData[fieldInBx24] = value;
    //     const oldValue = this.product?.[fieldInBx24];
    //     console.log('this.changedProductData = ', this.changedProductData);
    //     if (this.isInitializedProduct() && this.isCalculations) {
    //         // if (this.isInitializedProduct()) {
    //         // console.log("product isInitializedProduct = ", this.product);
    //         await this.historyManager.initRecord(this.smartTypeId, this.product?.id, fieldInBx24, oldValue);
    //         this.historyManager.addChange(fieldInBx24, value, this.currentUser.ID);
    //     }
    // }

    // isInitializedProduct() {
    //     return this.product[this.smartFields.isExist] == 1;
    // }

    // resetChangedData() {
    //     for (const [key, value] of Object.entries(this.changedProductData)) {
    //         this.product[key] = value;
    //     }
    //     this.changedProductData = {};
    // }

    // getCopyData() {
    //     let data = {};
    //     for (const key in this.smartFields) {
    //         if (key === this.smartFields.id || key === this.smartFields.updatedBy ||
    //             key === this.smartFields.createdTime || key === this.smartFields.updatedTime ||
    //             key == 'itemId' || key == 'itemPositionId') {
    //             continue;
    //         } else if (this.changedProductData.hasOwnProperty(this.smartFields[key])) {
    //             data[this.smartFields[key]] = this.changedProductData[this.smartFields[key]];
    //         } else if (this.product.hasOwnProperty(this.smartFields[key])) {
    //             data[this.smartFields[key]] = this.product[this.smartFields[key]];
    //         }
    //     }
    //     data[this.smartFields.createdBy] = this.currentUser.ID;
    //     data[this.smartFields.freeTitle] = `Копия ${this.product[this.smartFields.freeTitle]}`;
    //     return data;
    // }

    // async updateProductData(newData) {
    //     const result = await this.bx24.callMethod('crm.item.update', {
    //         entityTypeId: this.smartTypeId,
    //         id: this.productId,
    //         fields: newData
    //     });
    //     return result;
    // }

    // async refreshProductData() {
    //     const response = await this.bx24.callMethod('crm.item.get', {
    //         entityTypeId: this.smartTypeId,
    //         id: this.productId,
    //     });
    //     this.product = response?.item;
    //     console.log("this.PRODUCT = ", this.product);
    // }

    // async updateProduct(newData) {
    //     const result = await this.bx24.callMethod('crm.item.update', { entityTypeId: this.smartTypeId, id: this.productId, fields: newData });
    // }

    // getCurrentUserId() {
    //     return this.currentUser?.ID;
    // }
}
