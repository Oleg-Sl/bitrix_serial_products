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
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, productNameRus, isEditable = true) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldAliases = calcFieldAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.isEditable = isEditable;

        this.eventEmitter = new EventEmitter();
        this.dataService = new DataService(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, this.eventEmitter, this.productNameRus, this.getProductData.bind(this), this.getFabricData.bind(this));
        this.calculationRepository = new CalculationRepository(apiClient, calcTypeId, ID_FOT);

        this.calculationListView = new CalculationsListView(this.opneNewCalculation.bind(this), this.openCalculation.bind(this));
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

        this.eventEmitter.on('renderCalcualation', this.renderCalculation.bind(this));
        this.eventEmitter.on('closedCalcualation', this.closedCalcualation.bind(this));
        this.eventEmitter.on('saveCalcualation', this.saveCalcualation.bind(this));
        this.eventEmitter.on('createCalcualation', this.createCalculation.bind(this));

        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.init(calculations, dateOfAddingMaterials);
    }

    renderCalculation(calculation, isEdit = true) {
        console.log("isEdit = ", isEdit);
        this.modalView.render(calculation.calculationId, calculation.dateOfCalculation)
        this.modalMaterialsView.render(calculation.materials, calculation.summaryMaterials, isEdit);
        this.modalQuestionsView.render(calculation.questions);
        this.modalFotView.render(calculation.fots, calculation.summaryFot, isEdit);
        this.modalManagementView.render(calculation.costManagement);
        this.modalRentView.render(calculation.costRent);
        this.modalCostPriceView.render(calculation.costPrice);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalCommentView.render(calculation.comment, isEdit);
    }

    getFabricData(number) {
        let price = 0;
        switch (number) {
            case 1:
                price = 1;
                // price = this.fabricManager.getFabricPrice1();
                break;
            case 2:
                price = 2;
                // price = this.fabricManager.getFabricPrice2();
                break;
            case 3:
                price = 3;
                // price = this.fabricManager.getFabricPrice3();
                break;
        }
        return price;
    }

    getProductData() {
        return {
            id: this.productId,
            name: this.productNameRus,
            freeTitle: "This will be free title for this product",
            linearMeters: 4
        };
    }

    openCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        this.renderCalculation(calculation, true);
        this.modalView.show();
    }

    opneNewCalculation() {
        const calculation = this.dataService.addTempCalculation();
        this.renderCalculation(calculation, true);
        this.modalView.show();
    }

    closedCalcualation() {
        this.modalView.hide();
    }

    createCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        this.renderCalculation(calculation, false);
        this.modalView.show();
    }

    async saveCalcualation(calculationId) {
        // target.disabled = true;
        // setTimeout(() => { target.disabled = false; }, 2000);
        const calculation = this.dataService.getCalculation(calculationId);

        const calculationData = calculation.getCalculationSmartData();
        const newCalculation = await this.calculationRepository.createCalculation(calculationData);

        const fotData = calculation.getFotSmartData(newCalculation.id);
        const newFot = await this.calculationRepository.createFot(fotData);

        const calcObj = this.dataService.addCalculation(newCalculation, newFot);

        console.log("newCalculation = ", newCalculation);
        console.log("newFot = ", newFot);
        console.log("calcObj = ", calcObj);

        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.update(calculations, dateOfAddingMaterials);
    }
}
