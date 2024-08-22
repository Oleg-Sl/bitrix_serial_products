import { FIELD_FABRICS, ID_FABRIC, } from '../../../configs/smart_process/fabric.js';


export class FabricInfo {
    constructor(bx24, select) {
        this.bx24 = bx24;
        this.select = select;
        this.idWindowInfo = this.select.dataset.target;
        this.elemWindowInfo = document.getElementById(this.idWindowInfo);
        this.container = document;
        this.fabricData = null;
    }

    setFabricData(fabricData) {
        if (!fabricData) {
            fabricData = {};
        }
        this.fabricData = fabricData;

        const providerElement = this.elemWindowInfo.querySelector('.fabric-provider');
        const collectionElement = this.elemWindowInfo.querySelector('.fabric-collection');
        const colorElement = this.elemWindowInfo.querySelector('.fabric-color');
        const priceElement = this.elemWindowInfo.querySelector('.fabric-price');
        const linkElement = this.elemWindowInfo.querySelector('.fabric-link');

        providerElement.textContent = fabricData[FIELD_FABRICS.provider];
        collectionElement.textContent = fabricData[FIELD_FABRICS.collection];
        colorElement.textContent = fabricData[FIELD_FABRICS.color];
        priceElement.textContent = fabricData[FIELD_FABRICS.supplierPrice];
        linkElement.textContent = fabricData[FIELD_FABRICS.link];
        linkElement.href = fabricData[FIELD_FABRICS.link];
    }

    getFabricData() {
      return this.fabricData;
    }

    async fetchFabricData(fabricId) {
        try {
          const response = await this.bx24.callMethod('crm.item.get', {
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
