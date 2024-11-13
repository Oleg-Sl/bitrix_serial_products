import { ID_FOT, FIELD_FOT } from './import.js';

import DataService from './services/data_service.js';
import CalculationsListView from './components/calculationslist.js';
import ModalView from './components/modal.js'
import CalculationRepository from './services/repository.js';
import EventEmitter from './eventemitter.js';
// import CalculationAccessManager from './services/accessmanager.js';


export default class CalculationManager {
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, productNameRus, cbGetProductData, isEditable = false, cbSaveChangesOfProduct) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldAliases = calcFieldAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.cbGetProductData = cbGetProductData;
        this.cbSaveChangesOfProduct = cbSaveChangesOfProduct;

        this.isEditable = isEditable;           // все расчеты редактируемые (выводим кнопку "Сохранить") / иначе не редактируемые (кнопка "Копировать")

        this.eventEmitter = new EventEmitter();
        this.dataService = new DataService(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, this.eventEmitter, this.productNameRus, this.cbGetProductData);
        this.calculationRepository = new CalculationRepository(apiClient, calcTypeId, ID_FOT, productTypeId, productId);
        // this.accessManager = new CalculationAccessManager(apiClient);

        this.calculationListView = new CalculationsListView(this.eventEmitter);
        this.modalView = new ModalView(this.eventEmitter, this.isEditable);
    }

    async initialize() {
        await this.dataService.init();
        // await this.accessManager.init();
        // const isAccess = this.accessManager.isAccess(this.dataService.getCurrentUser()?.ID);
        // if (!isAccess) {
            // this.calculationListView.remove()
            // return;
        // }

        this.eventEmitter.on('createCalculation', this.createCalculation.bind(this));
        this.eventEmitter.on('copyCalculation', this.copyCalculation.bind(this));
        this.eventEmitter.on('saveCalculation', this.saveCalculation.bind(this));
        this.eventEmitter.on('closeCalculation', this.closeCalculation.bind(this));
        this.eventEmitter.on('calculateDataFots', this.calculateDataFots.bind(this));
        this.eventEmitter.on('openNewCalculation', this.openNewCalculation.bind(this));
        this.eventEmitter.on('openCalculation', this.openCalculation.bind(this));
        this.eventEmitter.on('selectedCalculation', this.selectedCalculation.bind(this));
        this.eventEmitter.on('copyFromOtherCalculations', this.copyFromOtherCalculations.bind(this));
        
        const calculations = this.dataService.getCalculations();
        // const otherCalculations = this.dataService.getOtherCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.init(calculations, dateOfAddingMaterials, []);
        console.log(">>>>> ", this.cbGetProductData());
    }

    updateCaclulations() {
        const openCalculationId = this.modalView.getOpenCalculationId();
        const isNewCalculation = this.modalView.getStateCaclulation();
        // if (!isNewCalculation) {
        //     return;
        // }
        const calculation = this.dataService.getCalculation(openCalculationId);
        if (calculation) {
            calculation.recaclulate();
            this.modalView.render(calculation, isNewCalculation, isNewCalculation);
        }
    }

    getProductData() {
        return {
            id: this.productId,
            name: this.productNameRus,
            freeTitle: "This will be free title for this product",
            linearMeters: 4,
            fabricPrices: [ 111, 222, 333 ],
            selectedCalculationId: 683,
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

    getFinallyCost() {
        const calculationId = this.dataService.getSelectedCalculationId();
        const calculation = this.dataService.getCalculation(calculationId);
        if (!calculation) {
            return 0;
        }
        return calculation.getCostPrice();
    }

    getSelectedCalculationId() {
        return this.dataService.getSelectedCalculationId();
    }

    getSelectedFotCalculationId() {
        const calculationId = this.dataService.getSelectedCalculationId();
        if (!calculationId) {
            return;
        }
        const calculation = this.dataService.getCalculation(calculationId);
        if (!calculation) {
            return;
        }
        return calculation.getFotId();
    }

    openCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        this.dataService.resetStateOfQuestions();
        // this.modalView.render(calculation, this.isEditable, false);
        this.modalView.render(calculation, true, false);
        this.modalView.show();
    }

    openNewCalculation() {
        this.dataService.resetStateOfQuestions();
        const calculation = this.dataService.addTempCalculation();
        this.modalView.render(calculation, true);
        this.modalView.show();
    }

    selectedCalculation(calculationId) {
        this.dataService.selectedCalculation(calculationId);
    }

    async createCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        const calculationData = calculation.getCalculationSmartData();
        const newCalculation = await this.calculationRepository.createCalculation(calculationData);
        const fotData = calculation.getFotSmartData(newCalculation.id);
        const newFot = await this.calculationRepository.createFot(fotData);
        const calcObj = this.dataService.addCalculation(newCalculation, newFot);
        this.dataService.setSelectedCalculationId(calcObj.calculationId);
        console.log("Data for creating calculation = ", {
            calculationData,
            fotData,
            newCalculation,
            newFot
        });
        this.closeCalculation();

        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.update(calculations, dateOfAddingMaterials);
        this.cbSaveChangesOfProduct();
    }

    async copyCalculation(calculationId) {
        const calculation = this.dataService.copyCalculation(calculationId);
        calculation.resetGeneralComment();
        calculation.recaclulate();
        this.dataService.resetStateOfQuestions();
        this.modalView.render(calculation, true, true);
    }

    async saveCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        const calculationData = calculation.getCalculationSmartData();
        const updateCalculation = await this.calculationRepository.updateCalculation(calculationData, calculationId);
        const fotData = calculation.getFotSmartData(updateCalculation.id);
        // const updateFot = await this.calculationRepository.updateFot(fotData, calculation.smartFotId);
        if (!calculation.smartFotId) {
            const newFot = await this.calculationRepository.createFot(fotData);
            this.dataService.addFot(newFot);
            calculation.initFot();
        } else {
            const updateFot = await this.calculationRepository.updateFot(fotData, calculation.smartFotId);
        }
        console.log("Data for saving calculation = ", {
            calculationData,
            fotData,
            updateCalculation,
            // updateFot
        });
        this.cbSaveChangesOfProduct();
        this.modalView.hide();
    }

    closeCalculation() {
        this.modalView.hide();
    }

    calculateDataFots(calculationId) {
        console.log(">>>>> ", this.cbGetProductData());
        const calculation = this.dataService.getCalculation(calculationId);
        calculation.calculateDataFots();
        this.eventEmitter.emit("changeStateQuestion", calculation);
        this.modalView.render(calculation, true, calculation.isNewCalculation);
    }

    async copyCalculationToNewProduct(productId) {
        const selectedCalculationId = this.getSelectedCalculationId();
        const calculation = this.dataService.copyCalculation(selectedCalculationId);
        let calculationData = calculation.getCalculationSmartData();
        calculationData[`parentId${this.productTypeId}`] = productId;
        const createdCalculation = await this.calculationRepository.createCalculation(calculationData);
        console.log("createdCalculation = ", createdCalculation);
        let fotData = calculation.getFotSmartData(calculationData.id);
        fotData[`parentId${this.productTypeId}`] = productId;
        const createdFot = await this.calculationRepository.createFot(fotData);
        return [createdCalculation?.id, createdFot?.id];
    }

    copyFromOtherCalculations(calculationId) {
        const calculation = this.dataService.copyCalculationFromOthers(calculationId);
        if (calculation) {
            calculation.resetGeneralComment();
            calculation.recaclulate();
            this.dataService.resetStateOfQuestions();
            this.modalView.render(calculation, true, true);
            this.modalView.show();
        }
    }
}
