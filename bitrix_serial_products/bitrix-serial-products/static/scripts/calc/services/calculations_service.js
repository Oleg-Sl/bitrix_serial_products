
export default class CalculationsService {
    constructor(calculations, calculationFields, calcFieldsAliases) {
        this.calculations = calculations;
        this.calculationFields = calculationFields;
        this.calculationFieldsAliases = calcFieldsAliases;

    }

    getTitleField(field) {
        return this.calculationFields?.[field]?.title || '-';
    }

    getCalculations() {
        return this.calculations;
    }
}
