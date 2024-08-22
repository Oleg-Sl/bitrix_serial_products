import { ID_MATERIALS, FIELD_MATERIALS } from '../../../../parameters/calc/materials.js';


export class MaterialsService {
    constructor(materials) {
        this.materials = materials;
    }

    getMaterialById(id) {
        return this.materials.find(material => material.id === id);
    }

    getPriceByDate(materialId, targetDate) {
        const material = this.getMaterialById(materialId);
        if (!material) return 0;
    }

    getClosestMaterialPrice(key, targetDate=new Date().toISOString()) {
        const closestMaterial = this.getMaterialPricesClosestDateLessOrEqual(targetDate);
        // console.log("closestMaterial = ", closestMaterial);
        // console.log("key = ", key);
        if (!closestMaterial) return 0;
        const field = FIELD_MATERIALS[key];
        // console.log("field = ", field);
        return closestMaterial[field];
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

    // getMaterialPricesWithLatestDate() {
    //     if (!Array.isArray(this.materials) || this.materials.length === 0) {
    //         return null;
    //     }
    //     let latestMaterial = this.materials[0];
    //     let latestDate = new Date(latestMaterial[FIELD_MATERIALS.datePriceValidity]);
    //     for (let i = 1; i < this.materials.length; i++) {
    //         const currentDate = new Date(this.materials[i][FIELD_MATERIALS.datePriceValidity]);
    //         if (currentDate > latestDate) {
    //             latestMaterial = this.materials[i];
    //             latestDate = currentDate;
    //         }
    //     }
    //     return latestMaterial;
    // }

}
