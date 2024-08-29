import { ID_FOT, FIELD_FOT } from '../configs/calc/fot.js';

import DataService from './services/data_service.js';
import CalculationsListView from './components/calculationslist.js';
import EditCalculationView from './components/calculationedit.js';
import ModalMaterialsView from './components/modal_materials.js';
import ModalQuestionsView from './components/modal_questions.js';
import ModalFotView from './components/modal_fot.js';
import ModalManagementView from './components/modal_management.js';
import ModalRentView from './components/modal_rent.js';
import ModalCostPriceView from './components/modal_costprice.js';
import ModalSalesRangeView from './components/modal_salesrange.js';
import ModalCommentView from './components/modal_comment.js';
import ModalMetadataView from './components/modal_metadata.js';
import ModalButtonsView from './components/modal_buttons.js';

import CalculationRepository from './services/repository.js';
import EventEmitter from './eventemitter.js';


export default class CalculationManager {
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, productNameRus, isEditable = false) {
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
        this.modalView = new ModalMetadataView(this.eventEmitter);
        this.modalMaterialsView = new ModalMaterialsView(this.eventEmitter);
        this.modalQuestionsView = new ModalQuestionsView(this.eventEmitter);
        this.modalFotView = new ModalFotView(this.eventEmitter);
        this.modalManagementView = new ModalManagementView(this.eventEmitter);
        this.modalRentView = new ModalRentView(this.eventEmitter);
        this.modalCostPriceView = new ModalCostPriceView(this.eventEmitter);
        this.modalSalesRangeView = new ModalSalesRangeView(this.eventEmitter);
        this.modalCommentView = new ModalCommentView(this.eventEmitter);
        this.modalButtonsView = new ModalButtonsView(this.eventEmitter);
    }

    async init() {
        await this.dataService.init();

        this.eventEmitter.on('rerenderCalcualation', this.rerenderCalcualation.bind(this));
        this.eventEmitter.on('createCalculation', this.createCalculation.bind(this));
        this.eventEmitter.on('copyCalculation', this.copyCalculation.bind(this));
        this.eventEmitter.on('saveCalculation', this.saveCalculation.bind(this));
        this.eventEmitter.on('closeCalculation', this.closeCalculation.bind(this));
        this.eventEmitter.on('calculateFot', this.calculateFot.bind(this));
        this.eventEmitter.on('changeStateQuestion', this.changeStateButtons.bind(this));
        
        
        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.init(calculations, dateOfAddingMaterials);
    }

    rerenderCalcualation(calculation) {
        console.log(calculation);
        this.renderCalculation(calculation, true, calculation.isNewCalculation);
    }

    renderCalculation(calculation, isEditable = true, isNewCalculation = true) {
        this.modalView.render(calculation.calculationId, calculation.dateOfCalculation)
        this.modalMaterialsView.render(calculation.materials, calculation.summaryMaterials, isEditable);
        this.modalQuestionsView.render(calculation.questions);
        this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
        this.modalFotView.render(calculation.fots, calculation.summaryFot, isEditable && calculation.isAllAnswered());
        this.modalManagementView.render(calculation.costManagement);
        this.modalRentView.render(calculation.costRent);
        this.modalCostPriceView.render(calculation.costPrice);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalCommentView.render(calculation.comment, isEditable);
        this.modalButtonsView.render(isEditable, isNewCalculation);
        this.modalButtonsView.updateStateButtonCalculate(calculation.isAllAnswered(), calculation.isFotValid());

    }

    changeStateButtons(calculation) {
        this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
        this.modalFotView.setActivateInputs(calculation.isAllAnswered());
        this.modalButtonsView.updateStateButtonCalculate(calculation.isAllAnswered(), calculation.isFotValid());
        
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
                individual: false,               // Диван. Индивидуалка
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
        calculation.initialize();

        this.renderCalculation(calculation, this.isEditable, false);
        this.modalView.show();
    }

    openNewCalculation() {
        const calculation = this.dataService.addTempCalculation();
        calculation.initialize();

        this.renderCalculation(calculation, true);
        this.modalView.show();
    }

    async createCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        const calculationData = calculation.getCalculationSmartData();
        const newCalculation = await this.calculationRepository.createCalculation(calculationData);
        const fotData = calculation.getFotSmartData(newCalculation.id);
        const newFot = await this.calculationRepository.createFot(fotData);
        const calcObj = this.dataService.addCalculation(newCalculation, newFot);
        calculation.initialize();

        this.renderCalculation(calcObj, this.isEditable, false);
        // console.log("newCalculation = ", newCalculation);
        // console.log("newFot = ", newFot);
        // console.log("calcObj = ", calcObj);
        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.update(calculations, dateOfAddingMaterials);
    }

    async copyCalculation(calculationId) {
        const calculation = this.dataService.copyCalculation(calculationId);
        this.renderCalculation(calculation, true, true);
        console.log("Copy calculation = ", calculation);
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

    calculateFot(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        calculation.calculateNewFots();
        calculation.initialize();

        this.renderCalculation(calculation, true, calculation.isNewCalculation);
    }

}



// getFabricData(number) {
//     let price = 0;
//     switch (number) {
//         case 1:
//             price = 1;
//             // price = this.fabricManager.getFabricPrice1();
//             break;
//         case 2:
//             price = 2;
//             // price = this.fabricManager.getFabricPrice2();
//             break;
//         case 3:
//             price = 3;
//             // price = this.fabricManager.getFabricPrice3();
//             break;
//     }
//     return price;
// }
