import { ID_MATERIALS, FIELD_MATERIALS } from '../../configs/calc/materials.js';


export default class MaterialsService {
    constructor(materialsList) {
        this.materials = materialsList;
    }

    getMaterialById(id) {
        return this.materials.find(material => material.id === id);
    }

    // getPriceByDate(materialId, targetDate) {
    //     const material = this.getMaterialById(materialId);
    //     if (!material) return 0;
    // }

    getClosestMaterialPrice(key, targetDate=new Date().toISOString()) {
        const closestMaterial = this.getMaterialPricesClosestDateLessOrEqual(targetDate);
        if (!closestMaterial) return 0;
        const field = FIELD_MATERIALS[key];
        return +closestMaterial[field];
    }

    getMaterialPricesClosestDateLessOrEqual(targetDate) {
        const targetDateObj = new Date(targetDate);
        let closestItem = null;
        let closestDate = null;
        for (const material of this.materials) {
            const itemDate = new Date(material[FIELD_MATERIALS.datePriceValidity]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestItem = material;
                closestDate = itemDate;
            }
        }
        return closestItem;
    }

    getLastDateOfAddingMaterials() {
        const targetDateObj = new Date();
        let closestDate = null;

        for (const material of this.materials) {
            const itemDate = new Date(material[FIELD_MATERIALS.datePriceValidity]);
            if (!isNaN(itemDate.getTime()) && (itemDate <= targetDateObj && (closestDate === null || itemDate > closestDate))) {
                closestDate = itemDate;
            }
        }

        return closestDate;
    }
}
