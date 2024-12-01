// import { ID_MATERIALS, FIELD_MATERIALS } from '../../../configs/calc/materials.js';
// import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../../configs/calc/coefficients.js';
// import { ID_CHECKLIST_COMPLEXITY, PRODUCT_TYPES_CHECKLIST_COMPLEXITY, FIELD_CHECKLIST_COMPLEXITY } from '../../../configs/calc/checklistcomplexity.js';
// import { ID_FOT, FIELD_FOT } from '../../../configs/calc/fot.js';
// import { ID_COEFFICIENTS_FOT, PRODUCT_TYPES_COEFFICIENTS_FOT, FIELD_COEFFICIENTS_FOT } from '../../../configs/calc/coefficientsfot.js';
import { ID_FOT, ID_ECONOMY, ID_MATERIALS, ID_COEFFICIENTS, ID_CHECKLIST_COMPLEXITY, ID_COEFFICIENTS_FOT, ID_FABRIC, } from '../../import.js';
import { FIELD_ECONOMY, FIELD_CHECKLIST_COMPLEXITY, FIELD_COEFFICIENTS_FOT, } from '../../import.js';
import { PRODUCT_TYPES_CHECKLIST_COMPLEXITY, PRODUCT_TYPES_COEFFICIENTS_FOT, } from '../../import.js';


export default class FetchService {
    constructor(apiClient, calcTypeId, productTypeId, productId, leadId, dealId) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.productTypeId = productTypeId;
        this.productId = productId;
        // this.leadId = leadId;
        // this.dealId = dealId;
    }

    async fetchData(leadId, dealId) {
        const checklistcomplexityProductType = PRODUCT_TYPES_CHECKLIST_COMPLEXITY[this.productTypeId];
        const coefficientFotProductType = PRODUCT_TYPES_COEFFICIENTS_FOT[this.productTypeId];

        let cmd = {
            materials: `crm.item.list?entityTypeId=${ID_MATERIALS}`,
            coefficients: `crm.item.list?entityTypeId=${ID_COEFFICIENTS}`,
            checklistcomplexity: `crm.item.list?entityTypeId=${ID_CHECKLIST_COMPLEXITY}&filter[${FIELD_CHECKLIST_COMPLEXITY.typeProduct}]=${checklistcomplexityProductType}`,
            coefficientsfot: `crm.item.list?entityTypeId=${ID_COEFFICIENTS_FOT}&filter[${FIELD_COEFFICIENTS_FOT.typeProduct}]=${coefficientFotProductType}`,
            calculationFields: `crm.item.fields?entityTypeId=${this.calcTypeId}`,
            calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId${this.productTypeId}]=${this.productId}`,
            fot: `crm.item.list?entityTypeId=${ID_FOT}&filter[parentId${this.productTypeId}]=${this.productId}`,
            economy: `crm.item.list?entityTypeId=${ID_ECONOMY}&filter[parentId${this.productTypeId}]=${this.productId}`,
            // other_calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[${fieldParent}]=${this.leadId}`,
        };
        for (const fabric in FIELD_ECONOMY) {
            cmd[fabric] = `crm.item.get?entityTypeId=${ID_FABRIC}&id=${FIELD_ECONOMY[fabric].smartId}`
        }
        if (leadId) {
            cmd.leads_calculations = `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId1]=${leadId}`;
            cmd.leads_fots = `crm.item.list?entityTypeId=${ID_FOT}&filter[parentId1]=${leadId}`;
        }
        if (dealId) {
            // cmd.deals_calculations = `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId2]=${dealId}&filter[parentId${this.productTypeId}]=${this.productId}`;
            cmd.deals_calculations = `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId2]=${dealId}`;
            // cmd.deals_fots = `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId2]=${dealId}&filter[parentId${this.productTypeId}]=${this.productId}`;
            cmd.deals_fots = `crm.item.list?entityTypeId=${ID_FOT}&filter[parentId2]=${dealId}`;
        }
        const response = await this.apiClient.callMethod('batch', { halt: 0, cmd: cmd });
        console.log("Calculation init response = ", cmd, response);

        const materials = response?.result?.materials?.items || [];
        const coefficients = response?.result?.coefficients?.items?.[0] || {};
        const checklistcomplexity = response?.result?.checklistcomplexity?.items || [];
        const fot = response?.result?.fot?.items || [];
        const economy = response?.result?.economy?.items || [];
        const coefficientsfot = response?.result?.coefficientsfot?.items || [];
        const calculationFields = response?.result?.calculationFields?.fields || [];
        const calculations = response?.result?.calculations?.items || [];
        const leadsCalculations = response?.result?.leads_calculations?.items || [];
        const dealsCalculations = response?.result?.deals_calculations?.items || [];
        const othersCalculations = [...leadsCalculations, ...dealsCalculations];

        const leadsFots = response?.result?.leads_fots?.items || [];
        const dealsFots = response?.result?.deals_fots?.items || [];
        const othersFots = [...fot, ...leadsFots, ...dealsFots];

        const fabrics = Object.keys(FIELD_ECONOMY).map(key => response?.result?.[key]?.item);

        const currentUser = await this.getCurrentUser();
        const users = await this.getUsers(calculations.map(calculation => calculation.createdBy));
        users[currentUser.ID] = currentUser;
        

        return { materials, coefficients, checklistcomplexity, fot, coefficientsfot, calculationFields, calculations, currentUser, users, othersCalculations, othersFots, economy, fabrics, };
    }

    async getCurrentUser() {
        const response = await this.apiClient.callMethodJS('user.current', {});
        return response;
    }

    async getUsers(userIds) {
        let users = {};

        let cmd = userIds.reduce((acc, userId) => {
            acc[userId] = `user.get?id=${userId}`;
            return acc;
        }, {});

        const result = await this.apiClient.callMethod('batch', { halt: 0, cmd: cmd });

        for (const userId in result?.result) {
            const user = Array.isArray(result?.result[userId]) ? result?.result[userId]?.[0] : result?.result[userId];
            users[user.ID] = user;
        }
        return users;
    }
}
