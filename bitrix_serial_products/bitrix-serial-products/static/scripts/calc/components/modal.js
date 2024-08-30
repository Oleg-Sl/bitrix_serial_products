import ModalMaterialsView from './modal/modal_materials.js';
import ModalQuestionsView from './modal/modal_questions.js';
import ModalFotView from './modal/modal_fot.js';
import ModalManagementView from './modal/modal_management.js';
import ModalRentView from './modal/modal_rent.js';
import ModalCostPriceView from './modal/modal_costprice.js';
import ModalSalesRangeView from './modal/modal_salesrange.js';
import ModalCommentView from './modal/modal_comment.js';
import ModalMetadataView from './modal/modal_metadata.js';
import ModalButtonsView from './modal/modal_buttons.js';


export default class ModalView {
    constructor(eventEmitter, isEditable) {
        this.eventEmitter = eventEmitter;
        this.isEditable = isEditable;

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

        this.initialize();
    }

    initialize() {
        this.eventEmitter.on('changeStateQuestion', this.changeStateButtons.bind(this));
        this.eventEmitter.on('redrawCalcualation', this.redrawCalcualation.bind(this));
    }

    redrawCalcualation(calculation) {
        this.render(calculation, true, calculation.isNewCalculation);
    }

    render(calculation, isEditable = true, isNewCalculation = true) {
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
        this.changeStateButtons(calculation);
    }

    changeStateButtons(calculation) {
        this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
        this.modalFotView.setActivateInputs(calculation.isAllAnswered(), calculation.isFotValid());
        this.modalButtonsView.updateStateButtonCalculate(calculation.isAllAnswered(), calculation.isFotValid());
    }

    show() {
        this.modalView.show();
    }

    hide() {
        this.modalView.hide();
    }
}
