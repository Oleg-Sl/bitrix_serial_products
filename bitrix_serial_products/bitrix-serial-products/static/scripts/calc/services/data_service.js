
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
        const servicesData = await this.fetchService.fetchData();
        this.calculationService.initialize(servicesData);
        this.eventService.subscribeEvents();
    }

    getCalculation(calculationId) {
        return this.calculationService.getCalculation(calculationId);
    }

    getCalculations() {
        return this.calculationService.getCalculations();
    }

    getDateOfAddingMaterials() {
        return this.calculationService.getLastDateOfAddingMaterials();
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

    resetStateOfQuestions() {
        return this.calculationService.resetStateOfQuestions();
    }
}
