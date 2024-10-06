
import FetchService from './data/fetch_service.js';
import CalculationService from './data/calculation_service.js';
import EventService from './data/event_service.js';


export default class DataService {
    constructor(apiClient, calcTypeId, calcFieldsAliases, productTypeId, productId, eventEmitter, productNameRus, cbGetProductData) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldsAliases = calcFieldsAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.cbGetProductData = cbGetProductData;
        this.eventEmitter = eventEmitter;

        
        this.fetchService = new FetchService(apiClient, calcTypeId, productTypeId, productId);
        this.calculationService = new CalculationService(calcFieldsAliases, calcTypeId, productTypeId, productId, productNameRus, this.eventEmitter, cbGetProductData);
        this.eventService = new EventService(eventEmitter, this.calculationService);
    }

    async init() {
        const servicesData = await this.fetchService.fetchData(this.cbGetProductData().leadId, this.cbGetProductData().dealId);
        this.currentUser = servicesData.currentUser;
        this.calculationService.initialize(servicesData);
        this.eventService.subscribeEvents();
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getCalculation(calculationId) {
        return this.calculationService.getCalculation(calculationId);
    }

    getCalculations() {
        return this.calculationService.getCalculations();
    }

    getOtherCalculations() {
        return this.calculationService.getOtherCalculations();
    }

    getDateOfAddingMaterials() {
        return this.calculationService.getLastDateOfAddingMaterials();
    }

    getFinallyCost() {
        return this.calculationService.getFinallyCost();
    }
    

    getSelectedCalculationId() {
        return this.calculationService.getSelectedCalculationId();
    }

    getSelectedFotCalculationId() {
        return this.calculationService.getSelectedFotCalculationId();
    }

    setSelectedCalculationId(calculationId) {
        return this.calculationService.selectedCalculation(calculationId);
    }

    addCalculation(calculation, fot, isNewCalculation = false) {
        return this.calculationService.addCalculation(calculation, fot, isNewCalculation);

    }

    addTempCalculation() {
        return this.calculationService.addTempCalculation();
    }

    copyCalculation(calculationId) {
        return this.calculationService.copyCalculation(calculationId);
    }

    copyCalculationFromOthers(calculationId) {
        return this.calculationService.copyCalculationFromOthers(calculationId);
    }

    resetStateOfQuestions() {
        return this.calculationService.resetStateOfQuestions();
    }

    selectedCalculation(calculationId) {
        this.calculationService.selectedCalculation(calculationId);
    }
}
