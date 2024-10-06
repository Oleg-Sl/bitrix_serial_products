
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
        this.otherCalculations = [];
        this.services = {};
        this.selectedCalculationId = null;
    }

    initialize(servicesData) {
        this.selectedCalculationId = this.cbGetProductData().selectedCalculationId;
        this.services = {
            // fot: new FotService(servicesData.fot, `parentId${this.calcTypeId}`),
            fot: new FotService(servicesData.othersFots, `parentId${this.calcTypeId}`),
            user: new UserService(servicesData.users, servicesData.currentUser),
            materials: new MaterialsService(servicesData.materials),
            coefficients: new CoefficientsService(servicesData.coefficients),
            coefficientsFot: new CoefficientsFotService(servicesData.coefficientsfot),
            checklistcomplexity: new ChecklistComplexityService(servicesData.checklistcomplexity),
            calculationFields: new CalculationFieldsService(servicesData.calculationFields, this.calcFieldsAliases),
        };
        this.initCalculations(servicesData.calculations);
        this.initOtherCalculations(servicesData.othersCalculations);

    }

    initCalculations(calculations) {
        this.calculations = calculations.map(calculation => new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, false, this.cbGetProductData));
        this.changeSelectedCalculation(this.selectedCalculationId);
    }

    initOtherCalculations(calculations) {
        // console.log("OTHER calculations = ", calculations);
        const uniqCaclulations = calculations.filter(item => item[`parentId${this.productTypeId}`] !== this.productId).reduce((acc, item) => {
            if (acc.findIndex(obj => obj.id === item.id) === -1) {
                acc.push(item);
            }
            return acc;
        }, []);
        this.otherCalculations = uniqCaclulations.map(calculation => new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, false, this.cbGetProductData));
        console.log("this.otherCalculations = ", this.otherCalculations);
    }

    changeSelectedCalculation(calculationId) {
        this.calculations.map((calculation) => calculation.isSelected = (calculation.calculationId == calculationId));
    }

    getCalculation(calculationId) {
        return this.calculations.find((item) => item.calculationId == calculationId);
    }

    getCalculations() {
        return this.calculations;
    }

    getOtherCalculations() {
        return this.otherCalculations;
    }

    getLastDateOfAddingMaterials() {
        return this.services.materials.getLastDateOfAddingMaterials();
    }

    getFinallyCost() {
        const calculation = this.getCalculation(this.selectedCalculationId);
        return calculation?.costPrice || 0;
    }

    getSelectedCalculationId() {
        return this.selectedCalculationId;
    }

    getSelectedFotCalculationId() {
        // return this.services.fot.getSelectedCalculationId();
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

    copyCalculationFromOthers(calculationId) {
        const calculation = this.otherCalculations.find((item) => item.calculationId == calculationId);
        if (!calculation) {
            return;
        }
        let calculationData = calculation.getCalculationSmartData();
        calculationData.id = Date.now();
        const fotData = calculation.getFotSmartData(calculationData.id);
        return this.addCalculation(calculationData, fotData, true);
    }

    resetStateOfQuestions() {
        this.services.checklistcomplexity.reset();
    }

    selectedCalculation(calculationId) {
        this.selectedCalculationId = calculationId;
        this.changeSelectedCalculation(this.selectedCalculationId);
    }}
