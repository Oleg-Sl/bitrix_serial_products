
export default class CalculationFieldsService {
    constructor(calculationFields, calcFieldsAliases) {
        this.calculationFields = calculationFields;         // поля СП изделия (crm.item.fields)
        this.calculationFieldsAliases = calcFieldsAliases;  // объект вида: { "алиас": "код в битрикс" }
    }

    getTitleField(field) {
        return this.calculationFields?.[field]?.title || '-';
    }

    getAliases() {
        return this.calculationFieldsAliases;
    }

    getFieldKeyByAlias(alias) {
        return this.calculationFieldsAliases[alias];
    }
}
