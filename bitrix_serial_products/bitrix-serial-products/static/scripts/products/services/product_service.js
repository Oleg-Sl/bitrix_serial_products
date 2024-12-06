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
}
