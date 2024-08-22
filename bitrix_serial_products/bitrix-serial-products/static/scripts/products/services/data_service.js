import { ID_FABRIC, FIELD_FABRICS } from '../../configs/smart_process/fabric.js';
import { ID_MECHANISMS, FIELD_MECHANISMS } from '../../configs/smart_process/bed_mechanism.js';


export default class DataService {
    constructor(apiClient, smartFields) {
        this.apiClient = apiClient;
        this.smartFields = smartFields;

        this.product = null;
        this.productFields = null;

        this.fabrics = null;
        this.fabricFields = null;

        this.mechanisms = null;

        this.currentUser = null;
        this.createdBy = null;
        this.updatedBy = null;
    }

    async fetchData(productTypeId, productId) {
        const cmd = {
            product: `crm.item.get?entityTypeId=${productTypeId}&id=${productId}`,
            fabrics: `crm.item.list?entityTypeId=${ID_FABRIC}&filter[=${FIELD_FABRICS.isActive}]=1&select[]=id&select[]=${FIELD_FABRICS.name}&select[]=${FIELD_FABRICS.image}&select[]=${FIELD_FABRICS.type}&select[]=${FIELD_FABRICS.provider}&select[]=${FIELD_FABRICS.collection}&select[]=${FIELD_FABRICS.color}&select[]=${FIELD_FABRICS.colorText}&select[]=${FIELD_FABRICS.price}&select[]=${FIELD_FABRICS.supplierPrice}&select[]=${FIELD_FABRICS.link}&select[]=${FIELD_FABRICS.titleTmp}&order[id]=ASC`,
            fields_fabric: `crm.item.fields?entityTypeId=${ID_FABRIC}`,
            fields_product: `crm.item.fields?entityTypeId=${productTypeId}`,
            created_by: `user.get?id=$result[product][item][${this.smartFields.createdBy}]`,
            updated_by: `user.get?id=$result[product][item][${this.smartFields.updatedBy}]`,
            mechanisms: `crm.item.list?entityTypeId=${ID_MECHANISMS}&select[]=id&&select[]=${FIELD_MECHANISMS.title}&select[]=${FIELD_MECHANISMS.description}&order[${FIELD_MECHANISMS.sort || 'ufCrm55_1719576157'}]=ASC`,
            users: `user.get?sort=ID&order=ASC`,
        };

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });


        this.currentUser = await this.getCurrentUserFromBx24();
        this.product = response?.result?.product?.item;
        
        const totalFabrics = response?.result_total?.fabrics;
        this.fabrics = await this.getFabricsFromBx24(totalFabrics);

        this.productFields = response?.result?.fields_product?.fields;
        this.fabricFields = response?.result?.fields_fabric?.fields;
        
        this.mechanisms = response?.result?.mechanisms?.items;
        if (this.product[this.smartFields.createdBy]) {
            this.createdBy = response?.result?.created_by?.[0];
        }
        if (this.product[this.smartFields.updatedBy]) {
            this.updatedBy = response?.result?.updated_by?.[0];
        }
    }

    getProductFieldsMatching() {
        return this.smartFields;
    }

    getProductData() {
        return this.product;
    }

    getProductFields() {
        return this.productFields;
    }

    getCreatedUser() {
        return this.createdBy;
    }

    getUpdatedUser() {
        return this.updatedBy;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getMechanisms() {
        return this.mechanisms;
    }

    getFabrics() {
        return this.fabrics;
    }

    getFabricFields() {
        return this.fabricFields;
    }

    async getCurrentUserFromBx24() {
        const response = await this.apiClient.callMethodJS('user.current', {});
        return response;
    }

    async getFabricsFromBx24(total) {
        let data = []
        const sizeBatch = 25;
        for (let i = 0; i < total; i += 50 * sizeBatch) {
            let cmd = {};
            for (let j = i; j < i + sizeBatch * 50; j += 50) {
                if (j >= total) break;
                cmd[j] = `crm.item.list?entityTypeId=${ID_FABRIC}&filter[=${FIELD_FABRICS.isActive}]=1&start=${j}&select[]=id&&select[]=${FIELD_FABRICS.name}&select[]=${FIELD_FABRICS.image}&select[]=${FIELD_FABRICS.type}&select[]=${FIELD_FABRICS.provider}&select[]=${FIELD_FABRICS.collection}&select[]=${FIELD_FABRICS.color}&select[]=${FIELD_FABRICS.colorText}&select[]=${FIELD_FABRICS.price}&select[]=${FIELD_FABRICS.supplierPrice}&select[]=${FIELD_FABRICS.link}&select[]=${FIELD_FABRICS.titleTmp}&order[id]=ASC`;
            }
            const response = await this.apiClient.callMethod('batch', {
                halt: 0,
                cmd: cmd
            });
            for (const key in response?.result) {
                data = data.concat(response?.result[key]?.items);
            }
        }
        return data;
    }
}
