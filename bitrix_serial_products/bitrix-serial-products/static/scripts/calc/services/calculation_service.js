import Calculation from './calculation.js';

export default class CalculationService {
    constructor() {
        this.calculations = [];
        this.services = {};
    }

    initializeServices(services, calcFieldsAliases, calcTypeId, productTypeId, productId, productNameRus, cbGetProductData) {
        this.services = {
            fot: new FotService(services.fot, `parentId${calcTypeId}`),
            user: new UserService(services.users, services.currentUser),
            materials: new MaterialsService(services.materials),
            coefficients: new CoefficientsService(services.coefficients),
            coefficientsFot: new CoefficientsFotService(services.coefficientsfot),
            checklistcomplexity: new ChecklistComplexityService(services.checklistcomplexity),
            calculationFields: new CalculationFieldsService(services.calculationFields, calcFieldsAliases),
        };
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.cbGetProductData = cbGetProductData;
    }

    initCalculations(calculations) {
        return calculations.map(calculation => new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, false, this.cbGetProductData));
    }

    changeMaterialPrice(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeMaterialPrice(data.material, data.field, data.value);
    }

    getCalculation(calculationId) {
        return this.calculations.find(item => item.calculationId == calculationId);
    }

}
