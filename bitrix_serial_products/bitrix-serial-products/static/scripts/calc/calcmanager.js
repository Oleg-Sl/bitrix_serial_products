import { ID_FOT, FIELD_FOT } from './import.js';

import DataService from './services/data_service.js';
import CalculationsListView from './components/calculationslist.js';
import EditCalculationView from './components/calculationedit.js';

import ModalView from './components/modal.js'

import CalculationRepository from './services/repository.js';
import EventEmitter from './eventemitter.js';


export default class CalculationManager {
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, productNameRus, isEditable = true) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldAliases = calcFieldAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.isEditable = isEditable;           // все расчеты редактируемые (выводим кнопку "Сохранить") / иначе не редактируемые (кнопка "Копировать")

        this.eventEmitter = new EventEmitter();
        this.dataService = new DataService(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, this.eventEmitter, this.productNameRus, this.getProductData.bind(this));
        this.calculationRepository = new CalculationRepository(apiClient, calcTypeId, ID_FOT);

        this.calculationListView = new CalculationsListView(this.openNewCalculation.bind(this), this.openCalculation.bind(this));
        this.modalView = new ModalView(this.eventEmitter, this.isEditable);
    }

    async init() {
        await this.dataService.init();

        this.eventEmitter.on('createCalculation', this.createCalculation.bind(this));
        this.eventEmitter.on('copyCalculation', this.copyCalculation.bind(this));
        this.eventEmitter.on('saveCalculation', this.saveCalculation.bind(this));
        this.eventEmitter.on('closeCalculation', this.closeCalculation.bind(this));
        this.eventEmitter.on('calculateDataFots', this.calculateDataFots.bind(this));
        
        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.init(calculations, dateOfAddingMaterials);
    }

    getProductData() {
        return {
            id: this.productId,
            // isPotochka: true,
            name: this.productNameRus,
            freeTitle: "This will be free title for this product",
            linearMeters: 4,
            fabricPrices: [ 111, 222, 333 ],
            questions: {
                individual: false,              // Диван. Индивидуалка
                looseFabric: true,              // Рыхлая ткань? требуется оверлог
                mechanism: true,                // Проверка Механизма
                shapeRadius: true,              // Форма РАДИУС
                seamType1: true,                // Проверка типа Шва
                numberModules: true,            // Кол-во модулей
                seamType1: true,                // Проверка типа Шва №2
                woodenSupports: true,           // Деревянные опоры
                woodenFrameAndSupports: true,   // Деревянная рама и опоры
            }
        };
    }

    openCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        this.dataService.resetStateOfQuestions();
        this.modalView.render(calculation, this.isEditable, false);
        this.modalView.show();
    }

    openNewCalculation() {
        this.dataService.resetStateOfQuestions();
        const calculation = this.dataService.addTempCalculation();
        this.modalView.render(calculation, true);
        this.modalView.show();
    }

    async createCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        const calculationData = calculation.getCalculationSmartData();
        const newCalculation = await this.calculationRepository.createCalculation(calculationData);
        const fotData = calculation.getFotSmartData(newCalculation.id);
        const newFot = await this.calculationRepository.createFot(fotData);
        const calcObj = this.dataService.addCalculation(newCalculation, newFot);
        this.dataService.resetStateOfQuestions();

        this.modalView.render(calcObj, this.isEditable, false);
        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.update(calculations, dateOfAddingMaterials);
    }

    async copyCalculation(calculationId) {
        const calculation = this.dataService.copyCalculation(calculationId);
        this.dataService.resetStateOfQuestions();
        this.modalView.render(calculation, true, true);
    }

    async saveCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        const calculationData = calculation.getCalculationSmartData();
        const updateCalculation = await this.calculationRepository.updateCalculation(calculationData, calculationId);
        const fotData = calculation.getFotSmartData(updateCalculation.id);
        const updateFot = await this.calculationRepository.updateFot(fotData, calculation.smartFotId);
    }

    closeCalculation() {
        this.modalView.hide();
    }

    calculateDataFots(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        calculation.calculateDataFots();
        this.eventEmitter.emit("changeStateQuestion", calculation);
        this.modalView.render(calculation, true, calculation.isNewCalculation);
    }

}
