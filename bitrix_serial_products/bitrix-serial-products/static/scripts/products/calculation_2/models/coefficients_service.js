import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../../../parameters/calc/coefficients.js';


export class CoefficientsService {
    constructor(coefficients) {
        this.coefficients = coefficients;
        console.log("coefficients = ", this.coefficients);
    }

    getCoefficientById(id) {
        return this.coefficients.find(coefficient => coefficient.id === id);
    }

    getCoefficientByKey(key) {
        const fieldInBx24 = FIELD_COEFFICIENTS?.[key]?.fieldId;
        if (!fieldInBx24) {
            return 1;
        }
        const coefficient = this.coefficients?.[fieldInBx24] || 1;
        return +coefficient;
    }

}
