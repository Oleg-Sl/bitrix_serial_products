import {ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../configs/calc/coefficients.js';


export default class CoefficientsService {
    constructor(coefficientsList) {
        this.coefficients = coefficientsList;
        console.log("this.coefficients = ", this.coefficients);
    }

    // getCoefficientById(id) {
    //     return this.coefficients.find(coefficient => coefficient.id === id);
    // }

    getCoefficientByKey(key) {
        const fieldInBx24 = FIELD_COEFFICIENTS?.[key]?.fieldId;
        if (!fieldInBx24) {
            return 1;
        }
        const coefficient = this.coefficients?.[fieldInBx24] || 1;
        return +coefficient;
    }

    getMurkup() {
        return FIELD_COEFFICIENTS.markup.map((field) => this.coefficients[field]);
    }


}
