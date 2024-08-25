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

import EventEmitter from './eventemitter.js';


export default class CalculationManager {
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldAliases = calcFieldAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;

        this.eventEmitter = new EventEmitter();
        this.dataService = new DataService(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId, this.eventEmitter, this.getFabricData.bind(this));

        this.calculationListView = new CalculationsListView(this.createCalculation.bind(this), this.openCalculation.bind(this));
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
        
        const calculations = this.dataService.getCalculations();
        const dateOfAddingMaterials = this.dataService.getDateOfAddingMaterials();
        this.calculationListView.init(calculations, dateOfAddingMaterials);
    }

    renderCalculation(calculation, isEdit = false) {
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

    getProduct() {
        return {

        };
    }

    openCalculation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        this.renderCalculation(calculation, true);
        this.modalView.show();
    }

    createCalculation() {
        const calculation = this.dataService.addTempCalculation();
        // console.log("calculation = ", calculation);
        this.renderCalculation(calculation, true);
        this.modalView.show();
    }

    closedCalcualation() {
        this.modalView.hide();
    }

    saveCalcualation(calculationId) {
        const calculation = this.dataService.getCalculation(calculationId);
        const calculationData = calculation.getCalculationSmartData();
        const fotData = calculation.getFotSmartData();
        // console.log("calculationData = ", calculationData);
        // console.log("fotData = ", fotData);
    }
}
