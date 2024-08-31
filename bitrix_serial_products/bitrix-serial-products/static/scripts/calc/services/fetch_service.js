import { ID_MATERIALS, ID_COEFFICIENTS, ID_CHECKLIST_COMPLEXITY, ID_FOT, ID_COEFFICIENTS_FOT } from '../../configs/calc/constants.js';

export default class FetchService {
    constructor(apiClient, calcTypeId, productTypeId, productId) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.productTypeId = productTypeId;
        this.productId = productId;
    }

    async fetchData() {
        const checklistcomplexityProductType = PRODUCT_TYPES_CHECKLIST_COMPLEXITY[this.productTypeId];
        const coefficientFotProductType = PRODUCT_TYPES_COEFFICIENTS_FOT[this.productTypeId];

        const cmd = {
            materials: `crm.item.list?entityTypeId=${ID_MATERIALS}`,
            coefficients: `crm.item.list?entityTypeId=${ID_COEFFICIENTS}`,
            checklistcomplexity: `crm.item.list?entityTypeId=${ID_CHECKLIST_COMPLEXITY}&filter[typeProduct]=${checklistcomplexityProductType}`,
            coefficientsfot: `crm.item.list?entityTypeId=${ID_COEFFICIENTS_FOT}&filter[typeProduct]=${coefficientFotProductType}`,
            calculationFields: `crm.item.fields?entityTypeId=${this.calcTypeId}`,
            calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId${this.productTypeId}]=${this.productId}`,
            fot: `crm.item.list?entityTypeId=${ID_FOT}&filter[parentId${this.productTypeId}]=${this.productId}`,
        };

        const response = await this.apiClient.callMethod('batch', { halt: 0, cmd: cmd });

        const materials = response?.result?.materials?.items || [];
        const coefficients = response?.result?.coefficients?.items?.[0] || {};
        const checklistcomplexity = response?.result?.checklistcomplexity?.items || [];
        const fot = response?.result?.fot?.items || [];
        const coefficientsfot = response?.result?.coefficientsfot?.items || [];
        const calculationFields = response?.result?.calculationFields?.fields || [];
        const calculations = response?.result?.calculations?.items || [];

        const currentUser = await this.getCurrentUser();
        const users = await this.getUsers(calculations.map(calculation => calculation.createdBy));

        return { materials, coefficients, checklistcomplexity, fot, coefficientsfot, calculationFields, calculations, currentUser, users };
    }

    async getCurrentUser() {
        const response = await this.apiClient.callMethod('user.current');
        return response;
    }

    async getUsers(userIds) {
        let cmd = userIds.reduce((acc, userId) => {
            acc[userId] = `user.get?id=${userId}`;
            return acc;
        }, {});

        const result = await this.apiClient.callMethod('batch', { halt: 0, cmd: cmd });
        return result?.result || {};
    }
}
