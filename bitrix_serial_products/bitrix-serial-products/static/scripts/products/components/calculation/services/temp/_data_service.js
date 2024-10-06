// import { ID_FABRIC, FIELD_FABRICS } from '../../configs/smart_process/fabric.js';
// import { ID_MECHANISMS, FIELD_MECHANISMS } from '../../configs/smart_process/bed_mechanism.js';
import { ID_MATERIALS, FIELD_MATERIALS } from '../../../configs/calc/materials.js';
import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../../configs/calc/coefficients.js';
import { ID_CHECKLIST_COMPLEXITY, FIELD_CHECKLIST_COMPLEXITY } from '../../../configs/calc/checklistcomplexity.js';
import { ID_FOT, FIELD_FOT } from '../../../configs/calc/fot.js';
import { ID_COEFFICIENTS_FOT, FIELD_COEFFICIENTS_FOT } from '../../../configs/calc/coefficientsfot.js';

export default class DataService {
    constructor(apiClient, calcTypeId, calcFieldsAliases, productTypeId, productId) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldsAliases = calcFieldsAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;

        this.materials = null;
        this.coefficients = null;
        this.checklistcomplexity = null;
        this.fot = null;
        this.coefficientsfot = null;
        this.calculationFields = null;
        this.calculations = null;
        this.otherCalculations = null;

        this.currentUser = null;
        this.users = null;
    }

    async fetchData() {
        const cmd = {
            materials: `crm.item.list?entityTypeId=${ID_MATERIALS}`,
            coefficients: `crm.item.list?entityTypeId=${ID_COEFFICIENTS}`,
            checklistcomplexity: `crm.item.list?entityTypeId=${ID_CHECKLIST_COMPLEXITY}`,
            fot: `crm.item.list?entityTypeId=${ID_FOT}`,
            coefficientsfot: `crm.item.list?entityTypeId=${ID_COEFFICIENTS_FOT}`,
            calculationFields: `crm.item.fields?entityTypeId=${this.calcTypeId}`,
            calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId${this.productTypeId}]=${this.productId}`,
            // other_calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[${fieldParent}]=${this.crmId}`,

        };

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        this.materials = response?.result?.materials?.items || [];
        this.coefficients = response?.result?.coefficients?.items?.[0] || {};
        this.checklistcomplexity = response?.result?.checklistcomplexity?.items?.[0] || {};
        this.fot = response?.result?.fot?.items?.[0] || {};
        this.coefficientsfot = response?.result?.coefficientsfot?.items?.[0] || {};
        this.calculationFields = response?.result?.calculationFields?.fields || [];
        this.calculations = response?.result?.calculations?.items || [];
        // this.otherCalculations = response?.result?.other_calculations?.items || [];

        const usersIds = this.calculations.map(calculation => calculation.createdBy);
        this.users = await this.getUsersFromBx24(usersIds);
    }

    getCalcFieldsAliases() {
        return this.calcFieldsAliases;
    }

    getMaterials() {
        return this.materials;
    }

    getCoefficients() {
        return this.coefficients;
    }

    getCalculationFields() {
        return this.calculationFields;
    }

    getCalculations() {
        return this.calculations;
    }

    getOtherCalculations() {
        return this.otherCalculations;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUsers() {
        return this.users;
    }

    async getCurrentUserFromBx24() {
        const response = await this.apiClient.callMethodJS('user.current', {});
        return response;
    }

    async getUsersFromBx24(userIds) {
        let users = {};
        let cmd = { current : `user.current` };
        userIds.forEach(userId => {
            cmd[userId] = `user.get?id=${userId}`;
        })
        
        const result = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });
        
        for (const userId in result?.result) {
            const user = Array.isArray(result?.result[userId]) ? result?.result[userId]?.[0] : result?.result[userId];
            users[user.ID] = user;
        }

        this.currentUser = await this.getCurrentUserFromBx24();
    
        if (this.currentUser) {
            users[this.currentUser.ID] = this.currentUser;
        }
        
        return users;
    }
}
