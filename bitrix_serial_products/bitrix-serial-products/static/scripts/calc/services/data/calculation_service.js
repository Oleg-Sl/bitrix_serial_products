
import UserService from './rawdata/users.js';
import ChecklistComplexityService from './rawdata/checklistcomplexity.js';
import CoefficientsService from './rawdata/coefficients.js';
import CoefficientsFotService from './rawdata/coefficientsfot.js';
import FotService from './rawdata/fot.js';
import MaterialsService from './rawdata/materials.js';
import CalculationFieldsService from './rawdata/calculationfields.js'
import Calculation from '../calculation.js';


export default class CalculationService {
    constructor(calcFieldsAliases, calcTypeId, productTypeId, productId, productNameRus, eventEmitter, cbGetProductData) {
        this.calcFieldsAliases = calcFieldsAliases;
        this.calcTypeId = calcTypeId;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.eventEmitter = eventEmitter;
        this.cbGetProductData = cbGetProductData;

        this.calculations = [];
        this.services = {};
    }

    initialize(servicesData) {
        this.services = {
            fot: new FotService(servicesData.fot, `parentId${this.calcTypeId}`),
            user: new UserService(servicesData.users, servicesData.currentUser),
            materials: new MaterialsService(servicesData.materials),
            coefficients: new CoefficientsService(servicesData.coefficients),
            coefficientsFot: new CoefficientsFotService(servicesData.coefficientsfot),
            checklistcomplexity: new ChecklistComplexityService(servicesData.checklistcomplexity),
            calculationFields: new CalculationFieldsService(servicesData.calculationFields, this.calcFieldsAliases),
        };
        this.initCalculations(servicesData.calculations);
    }

    initCalculations(calculations) {
        this.calculations = calculations.map(calculation => new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, false, this.cbGetProductData));
    }

    getCalculation(calculationId) {
        return this.calculations.find((item) => item.calculationId == calculationId);
    }

    getCalculations() {
        return this.calculations;
    }

    getLastDateOfAddingMaterials() {
        return this.services.materials.getLastDateOfAddingMaterials();
    }

    changeMaterialPrice(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeMaterialPrice(data.material, data.field, data.value);
        this.eventEmitter.emit('redrawCalcualation', calculation);
    }

    changeMaterialComment(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeMaterialComment(data.material, data.value);
    }

    changeAnswerToQuestion(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.answerQuestion(data.questionId, data.answer);
        this.eventEmitter.emit('changeStateQuestion', calculation);
    }

    changeFotEstimate(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeFotEstimate(data.code, data.value);
        this.eventEmitter.emit('redrawCalcualation', calculation);
    }

    changeFotCoefficient(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeFotCoefficient(data.code, data.value);
        this.eventEmitter.emit('redrawCalcualation', calculation);
    }

    changeFotComment(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeFotComment(data.code, data.value);
    }

    changeGeneralComment(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeGeneralComment(data.value);
    }

    addCalculation(calculation, fot, isNewCalculation = false) {
        this.services.fot.addFot(fot);
        const calc = new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, isNewCalculation, this.cbGetProductData);
        this.calculations.push(calc);
        return calc;
    }

    addTempCalculation() {
        let calculation = {
            id: Date.now(),
            isTemporary: true,
        };
        const calc = new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, true, this.cbGetProductData);
        this.calculations.push(calc);
        return calc;
    }

    copyCalculation(calculationId) {
        const calculation = this.getCalculation(calculationId);
        let calculationData = calculation.getCalculationSmartData();
        calculationData.id = Date.now();
        const fotData = calculation.getFotSmartData(calculationData.id);
        return this.addCalculation(calculationData, fotData, true);
    }

    resetStateOfQuestions() {
        this.services.checklistcomplexity.reset();
    }

}
