export default class Calculation {
    constructor(services, calculationRawData, productTypeId, productId, productNameRus, isNewCalculation, cbGetProductData) {
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.isNewCalculation = isNewCalculation;

        this.materialManager = new MaterialManager(services, calculationRawData, cbGetProductData);
        this.fotManager = new FotManager(services, calculationRawData, productTypeId, cbGetProductData);
        this.questionManager = new QuestionManager(services.checklistcomplexity);
        this.dateManager = new DateManager(services.calculationFields, calculationRawData);
        this.commentManager = new CommentManager(services.calculationFields, calculationRawData);

        this.salesRange = [];
        this.costManagement = 0;
        this.costRent = 0;

        this.calculateVariableData();
    }

    calculateVariableData() {
        this.summaryMaterials = this.materialManager.calculateSummaryMaterials();
        this.summaryFot = this.fotManager.calculateSummaryFot();
        this.costManagement = this.fotManager.calculateManagementCost();
        this.costRent = this.fotManager.calculateRentCost();
        this.costPrice = this.summaryMaterials + this.summaryFot + this.costManagement + this.costRent;
        this.salesRange = this.initSalesRange();
    }

    initSalesRange() {
        return this.materialManager.calculateSalesRange(this.costPrice);
    }

}

class MaterialManager {
    constructor(services, calculationRawData, cbGetProductData) {
        this.materialsService = services.materials;
        this.calculationFieldsService = services.calculationFields;
        this.calculationRawData = calculationRawData;
        this.cbGetProductData = cbGetProductData;
        this.materials = [];

        this.initMaterials();
    }

    initMaterials() {
        const getFieldValue = (fieldNameInBx, defaultValue = '') => this.calculationRawData?.[fieldNameInBx] || defaultValue;

        for (const [fieldAlias, fieldData] of Object.entries(this.calculationFieldsService.getAliases())) {
            if (fieldData && (fieldData.type === 'material' || fieldData.type === 'fabric')) {
                this.materials.push({
                    code: fieldAlias,
                    title: this.calculationFieldsService.getTitleField(fieldData.value),
                    coefficient: this.getPriceCoefficient(fieldAlias),
                    price: this.getPriceByDate(fieldAlias, fieldData),
                    value: getFieldValue(fieldData.value, 0),
                    amount: getFieldValue(fieldData.amount, 0),
                    comments: getFieldValue(fieldData.comments, '')
                });
            }
        }
    }

    calculateSummaryMaterials() {
        return this.materials.reduce((sum, current) => sum + current.amount, 0);
    }

    calculateSalesRange(costPrice) {
        const coefficients = this.materialsService.getMurkup();
        return coefficients.map(k => ({
            coefficient: k,
            price: costPrice * k
        }));
    }

    getPriceByDate(fieldAlias, fieldData) {
        const dateOfCalculation = this.calculationRawData?.[this.calculationFieldsService.getFieldKeyByAlias('dateOfCalculation')];
        return this.materialsService.getClosestMaterialPrice(fieldAlias, dateOfCalculation);
    }
}


class FotManager {
    constructor(services, calculationRawData, productTypeId, cbGetProductData) {
        this.fotService = services.fot;
        this.coefficientsFotService = services.coefficientsFot;
        this.calculationRawData = calculationRawData;
        this.productTypeId = productTypeId;
        this.cbGetProductData = cbGetProductData;
        this.fots = [];

        this.initFot();
    }

    initFot() {
        const fotRawData = this.fotService.getFotByParentId(this.calculationRawData.id) || {};
        this.fots = this.fotService.getFotCodeList().map(fotAlias => ({
            code: fotAlias,
            title: this.fotService.getFotTitle(fotAlias),
            estimate: fotRawData[this.fotService.getEstimateField(fotAlias)] || 0,
            coefficient: fotRawData[this.fotService.getGrowthField(fotAlias)] || 0,
            total: fotRawData[this.fotService.getFinalAmountField(fotAlias)] || 0,
            checksum: 0
        }));
    }

    calculateSummaryFot() {
        return this.fots.reduce((sum, fot) => sum + fot.total, 0);
    }

    calculateManagementCost() {
    }

    calculateRentCost() {
    }
}

class DateManager {
    constructor(calculationFieldsService, calculationRawData) {
        this.calculationFieldsService = calculationFieldsService;
        this.calculationRawData = calculationRawData;

        this.dateOfCalculation = this.getDate('dateOfCalculation');
        this.dateOfCalculationToday = this.getDate('dateOfCalculationToday');
    }

    getDate(alias) {
        const fieldKey = this.calculationFieldsService.getFieldKeyByAlias(alias);
        return this.calculationRawData[fieldKey] || new Date().toISOString();
    }
}

class QuestionManager {
    constructor(checklistcomplexityService) {
        this.checklistcomplexityService = checklistcomplexityService;
        this.questions = this.checklistcomplexityService.getQuestions();
    }

    answerQuestion(questionId, answer) {
        this.checklistcomplexityService.setAnswer(questionId, answer);
    }

    isAllAnswered() {
        return this.checklistcomplexityService.isAllAnswered();
    }
}

class CommentManager {
    constructor(calculationFieldsService, calculationRawData) {
        this.calculationFieldsService = calculationFieldsService;
        this.calculationRawData = calculationRawData;
        this.comment = this.initComment();
    }

    initComment() {
        const fieldKey = this.calculationFieldsService.getFieldKeyByAlias('generalComment');
        return this.calculationRawData[fieldKey] || '';
    }

    changeComment(newValue) {
        this.comment = newValue;
    }
}

