import { ID_MATERIALS, FIELD_MATERIALS } from '../../../parameters/calc/materials.js';
import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../../parameters/calc/coefficients.js';

export class ConnectorBx24 {
    constructor(bx24, calcProductId, parentSmartId, parentProductId, crmType) {
        this.bx24 = bx24;
        this.calcProductId = calcProductId;
        this.parentSmartId = parentSmartId;
        this.parentProductId = parentProductId;
        this.crmType = crmType;
        // this.crmId = crmId;
    }

    init(crmId) {
        this.crmId = crmId;
    }
  
    async getCalculations() {
        const fieldParent = this.crmType === 'D' ? 'parentId2' : 'parentId1';
        const cmd = {
            materials: `crm.item.list?entityTypeId=${ID_MATERIALS}`,
            coefficients: `crm.item.list?entityTypeId=${ID_COEFFICIENTS}`,
            history: `crm.item.list?entityTypeId=${this.calcProductId}&filter[parentId${this.parentSmartId}]=${this.parentProductId}`,
            other_calculations: `crm.item.list?entityTypeId=${this.calcProductId}&filter[${fieldParent}]=${this.crmId}`,
            fieldsHystory: `crm.item.fields?entityTypeId=${this.calcProductId}`,
        };
        const result = await this.bx24.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        const materials = result?.result?.materials?.items || [];
        const coefficients = result?.result?.coefficients?.items?.[0] || {};
        const calculations = result?.result?.history?.items || [];
        const otherCalculations = result?.result?.other_calculations?.items || [];
        const calculationFields = result?.result?.fieldsHystory?.fields || [];
        console.log('cmd = ', cmd);
        console.log('otherCalculations = ', otherCalculations);
        console.log('calculations = ', calculations);
        return {
            materials,
            calculations,
            coefficients,
            calculationFields,
            otherCalculations,
        };
    }

    async getUsersFromBx24(userIds) {
        let users = {};
        let cmd = { current : `user.current` };
        userIds.forEach(userId => {
            cmd[userId] = `user.get?id=${userId}`;
        })
        
        const result = await this.bx24.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });
        
        for (const userId in result?.result) {
            const user = Array.isArray(result?.result[userId]) ? result?.result[userId]?.[0] : result?.result[userId];
            users[user.ID] = user;
        }

        const currentUser = await this.getCurrentUserFromBx24();
        if (currentUser) {
            users[currentUser.ID] = currentUser;
        }
        
        return users;
    }

    async getCurrentUserFromBx24() {
        const response = await this.bx24.callMethodJS('user.current', {});
        return response;
    }
}
  