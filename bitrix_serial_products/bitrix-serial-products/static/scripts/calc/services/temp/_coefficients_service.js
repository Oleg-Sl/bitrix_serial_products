import { FIELD_COEFFICIENTS } from '../../../configs/calc/coefficients.js';


export default class CoefficientsService {
    constructor(dataService) {
        this.dataService = dataService;
        this.coefficients = this.dataService.getCoefficients();
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
