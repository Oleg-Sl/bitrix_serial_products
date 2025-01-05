import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';
// import ProductItemService from './productitem_service.js';

export default class ProductService {
    constructor(apiClient, dataService, productTypeId) {
        this.apiClient = apiClient;
        this.dataService = dataService;
        this.productTypeId = productTypeId;
        this.cbNotifyAboutChanges = null;

        // this.productItemService = new ProductItemService(apiClient);

        this.productData = this.dataService.getProductData();
        this.productFields = this.dataService.getProductFields();
        this.productFieldsMatching = this.dataService.getProductFieldsMatching();
        this.currentUser = this.dataService.getCurrentUser();

        this.changedData = {};
    }

    isPotochka() {
        return true;
    }

    setCbNotifyCalculation(cbNotifyAboutChanges) {
        this.cbNotifyAboutChanges = cbNotifyAboutChanges;
    }

    getProductTypeId() {
        return this.productTypeId;
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

    getValueText(fieldAlias) {
        const fieldInBx24 = this.productFieldsMatching[fieldAlias];

        const fieldData = this.productFields[fieldInBx24];
        console.log({
            "fieldAlias": fieldAlias,
            "fieldInBx24": fieldInBx24,
            "fieldData": fieldData,
            "this.productData": this.productData,
            "this.productData?.[fieldInBx24]": this.productData?.[fieldInBx24]
        })
        if (fieldData && fieldData.type == 'enumeration') {
            const items = fieldData.items;
            const item = items?.find(item => item.ID == this.productData?.[fieldInBx24]);
            return item?.VALUE;
        }
        return this.getValue(fieldAlias);
    }

    getFieldMatching() {
        return this.productFieldsMatching;
    }

    getFieldName(fieldAlias) {
        return this.productFieldsMatching[fieldAlias];
    }


    // getProductFieldName(field) {
    //     const fieldInBx24 = this.smartFields?.[field];
    //     return fieldInBx24;
    // }

    updateProductData(fieldAlias, value) {
        const field = this.productFieldsMatching[fieldAlias];
        this.changedData[field] = value;
        this.cbNotifyAboutChanges();
        console.log("changedData = ", this.changedData);
    }

    updateProductDataByField(field, value) {
        this.changedData[field] = value;
        this.cbNotifyAboutChanges();
        console.log("changedData = ", this.changedData);
    }

    getChangedData() {
        return this.changedData;
    }

    resetChangedData() {
        this.changedData = {};
    }

    async updateProduct(newData) {
        const result = await this.apiClient.callMethod('crm.item.update', {
            entityTypeId: this.productTypeId,
            id: this.getValue('id'),
            fields: newData
        });
        return result;
    }

    async refreshProduct() {
        const response = await this.apiClient.callMethod('crm.item.get', {
            entityTypeId: this.productTypeId,
            id: this.getValue('id'),
        });
        this.productData = response?.item;
        this.resetChangedData();
    }

    getCopyData() {
        let data = {};
        const notCopyFields = [
            'id', 'createdBy', 'updatedBy', 'createdTime', 'updatedTime',
            'parentId1', 'parentId2',
            'sketch', 'sentToWorkshop',
            'linkClientDoc', 'linkWorkshopDoc',
            'isTechOk', 'dateOfTech', 'isComDirOk', 'dateOfComDir',
            'productVariationIds', 'productMainId',
            'itemId', 'itemPositionId', 'itemPotochkaId',
            'calculationId',
            'canvasMain', 'canvasScreenMain', 'mainPhoto',
            'canvas_1', 'canvasScreen_1', 'photo1_1', 'photo1_2', 'photo1_3', 'photo1_4', 'photo1_5', 'photo1_6',
            'canvas_2', 'canvasScreen_2', 'photo2_1', 'photo2_2', 'photo2_3', 'photo2_4', 'photo2_5', 'photo2_6',
            'canvas_3', 'canvasScreen_3', 'photo3_1', 'photo3_2', 'photo3_3', 'photo3_4', 'photo3_5', 'photo3_6'
        ];
        for (const fieldAlias in this.productFieldsMatching) {
            const fieldInBx24 = this.productFieldsMatching[fieldAlias];
            // console.log(fieldAlias, " = ", fieldInBx24);
            if (notCopyFields.includes(fieldAlias)) {
                continue;
            }
            if (this.changedData.hasOwnProperty(fieldInBx24)) {
                data[fieldInBx24] = this.changedData[fieldInBx24];
            } else if (this.productData.hasOwnProperty(fieldInBx24)) {
                data[fieldInBx24] = this.productData[fieldInBx24];
            }
            // if (fieldAlias === 'id' || fieldAlias === 'createdBy' || fieldAlias === 'updatedBy' ||
            //     fieldAlias === 'createdTime' || fieldAlias === 'updatedTime' ||
            //     fieldAlias == 'itemId' || fieldAlias == 'itemPositionId') {
            //     continue;
            // } else if (this.changedData.hasOwnProperty(this.productFields[key])) {
            //     data[this.productFields[key]] = this.changedData[this.productFields[key]];
            // } else if (this.productData.hasOwnProperty(this.productFields[key])) {
            //     data[this.productFields[key]] = this.productData[this.productFields[key]];
            // }
        }
        // console.log("this.currentUser = ", this.currentUser);
        console.log("this.productData = ", this.productData);
        // console.log("this.productFields = ", this.productFields);
        // console.log("this.productFieldsMatching = ", this.productFieldsMatching);

        // console.log("this.productFields.createdBy = ", this.productFields);
        // console.log("this.productFields.freeTitle = ", this.productFields.freeTitle);
        
        data.createdBy = this.currentUser?.ID;
        data.updatedBy = this.currentUser?.ID;
        data[this.productFieldsMatching.freeTitle] = `Копия ${this.productData[this.productFieldsMatching.freeTitle]}`;
        return data;
    }

}
