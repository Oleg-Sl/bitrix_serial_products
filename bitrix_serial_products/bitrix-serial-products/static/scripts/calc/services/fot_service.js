import { ID_FOT, FIELD_FOT } from '../../configs/calc/fot.js';


export default class FotService {
    constructor(fot, fieldParentId) {
        this.fot = fot;
        this.fieldParentId = fieldParentId;
        
    }

    isValid() {
        return true;
    }

    addFot(fot) {
        this.fot.push(fot);
    }

    getFieldParent() {
        return this.fieldParentId;
    }

    getFotByParentId(parentId) {
        return this.fot.find(item => item[this.fieldParentId] === parentId);
    }

    getFotCodeList() {
        return Object.keys(FIELD_FOT);
    }

    getFotTitle(key) {
        return FIELD_FOT[key]?.title;
    }

    getEstimateField(key) {
        return FIELD_FOT[key]?.estimatedAmount;
    }

    getGrowthField(key) {
        return FIELD_FOT[key]?.growthCoefficient;
    }

    getFinalAmountField(key) {
        return FIELD_FOT[key]?.finalAmount;
    }

    getCommentField(key) {
        return FIELD_FOT[key]?.comment;
    }

    getFieldsFot() {
        let arr = [];
        for (const [ fotName, fotData] of Object.entries(FIELD_FOT)) {
            
            arr.push({

            });
        }
        console.log(arr);
        return FIELD_FOT;
    }

    // getCoefficientById(id) {
    //     return this.coefficients.find(coefficient => coefficient.id === id);
    // }

    // getCoefficientByKey(key) {
    //     const fieldInBx24 = FIELD_COEFFICIENTS?.[key]?.fieldId;
    //     if (!fieldInBx24) {
    //         return 1;
    //     }
    //     const coefficient = this.coefficients?.[fieldInBx24] || 1;
    //     return +coefficient;
    // }
}
