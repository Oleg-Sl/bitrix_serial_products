import { FIELD_FABRICS, ID_FABRIC, } from '../../configs/smart_process/fabric.js';


export default class FabricService {
    constructor(apiClient, dataService) {
        this.apiClient = apiClient;
        this.dataService = dataService;
        this.fabricFields = this.dataService.getFabricFields();
        this.fabrics = this.dataService.getFabrics();

        this.changedData = {};
    }

    getFabrics() {
        return this.fabrics;
    }

    getFabricData(fabricId) {
        return this.fabrics.find(fabric => fabric.id == fabricId);
    }

    getFabricFields() {
        return this.fabricFields;
    }


    getFabricType(fabricTypeId) {
        const types = this.fabricFields[FIELD_FABRICS.type]?.items;
        const fabricType = types?.find(item => item.ID == fabricTypeId);
        return fabricType?.VALUE;
    }

    updateFabricData(fieldAlias, value) {
        // const field = this.productFieldsMatching[fieldAlias];
        this.changedData[fieldAlias] = value;
    }

    async fetchFabricData(fabricId) {
        try {
          const response = await this.apiClient.callMethod('crm.item.get', {
            entityTypeId: ID_FABRIC,
            id: fabricId,
          });
          return response?.result?.item;
        } catch (error) {
          console.error('Ошибка при получении данных о ткани:', error);
          return null;
        }
    }

}
