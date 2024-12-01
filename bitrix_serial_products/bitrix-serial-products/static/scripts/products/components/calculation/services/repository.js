
export default class CalculationRepository {

    constructor(apiClient, calculationTypeId, fotTypeId, productTypeId, productId, economyTypeId) {
        this.apiClient = apiClient;
        this.calculationTypeId = calculationTypeId;
        this.fotTypeId = fotTypeId;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.economyTypeId = economyTypeId;
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

    async createEconomy(economyFields) {
        const result = await this.apiClient.callMethodJS('crm.item.add', {
            entityTypeId: this.economyTypeId,
            fields: economyFields
        });

        return result?.item;
    }

    async updateEconomy(economyFields, economyId) {
        const result = await this.apiClient.callMethodJS('crm.item.update', {
            entityTypeId: this.economyTypeId,
            id: economyId,
            fields: economyFields
        });

        return result?.item;
    }

    async updateProduct(data) {
        const result = await this.apiClient.callMethod('crm.item.update', {
            entityTypeId: this.productTypeId,
            id: this.productId,
            fields: data
        });

        return result?.item;
    }
}
