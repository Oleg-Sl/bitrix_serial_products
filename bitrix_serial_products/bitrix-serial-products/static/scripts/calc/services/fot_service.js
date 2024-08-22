import { ID_FOT, FIELD_FOT } from '../../configs/calc/fot.js';


export default class FotService {
    constructor(fotList) {
        this.fot = fotList[0];
        
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
