
export default class CalculationRepository {

    constructor(apiClient, calculationTypeId, fotTypeId) {
        this.apiClient = apiClient;
        this.calculationTypeId = calculationTypeId;
        this.fotTypeId = fotTypeId;
    }

    async createCalculation(calculationFields) {
        const result = await this.apiClient.callMethodJS('crm.item.add', {
            entityTypeId: this.calculationTypeId,
            fields: calculationFields
        });

        return result?.item;
    }

    async updateCalculation(calculationFields, calculationId) {
        const result = await this.apiClient.callMethodJS('crm.item.update', {
            entityTypeId: this.calculationTypeId,
            id: calculationId,
            fields: calculationFields
        });

        return result?.item;
    }


    async createFot(fotFields) {
        const result = await this.apiClient.callMethodJS('crm.item.add', {
            entityTypeId: this.fotTypeId,
            fields: fotFields
        });

        return result?.item;
    }

    async updateFot(fotFields, fotId) {
        const result = await this.apiClient.callMethodJS('crm.item.update', {
            entityTypeId: this.fotTypeId,
            id: fotId,
            fields: fotFields
        });

        return result?.item;
    }
}
