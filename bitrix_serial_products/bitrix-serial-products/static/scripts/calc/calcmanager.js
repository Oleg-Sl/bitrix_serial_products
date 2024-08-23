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


export default class CalculationManager {
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldAliases = calcFieldAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;

        this.dataService = new DataService(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId);
        this.calculationListView = new CalculationsListView(this.createCalculation.bind(this), this.openCalculation.bind(this));

        this.modalMaterialsView = new ModalMaterialsView();
        this.modalQuestionsView = new ModalQuestionsView();
        this.modalFotView = new ModalFotView();
        this.modalManagementView = new ModalManagementView();
        this.modalRentView = new ModalRentView();
        this.modalCostPriceView = new ModalCostPriceView();
        this.modalSalesRangeView = new ModalSalesRangeView();
        this.modalCommentView = new ModalCommentView();

        this.subscribers = [];
    }

    async init() {
        await this.dataService.init();

        const calculations = this.dataService.getCalculations();
        const calculation = calculations[0];
        // this.calculationListView.init(calculations);

        this.modalMaterialsView.render(calculation.materials, calculation.summaryMaterials);
        this.modalQuestionsView.render(calculation.questions);
        this.modalFotView.render(calculation.fots, calculation.summaryFot);
        this.modalManagementView.render(calculation.costManagement);
        this.modalRentView.render(calculation.costRent);
        this.modalCostPriceView.render(calculation.costPrice);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalCommentView.render(calculation.comment);

        // const coefficienFot = this.dataService.getCoefficientsFot();
        // console.log('coefficienFot = ', coefficienFot);

        // this.editCalculationView.render(calculations[0]);
        // const questions = this.dataService.getQuestions();
        // console.log('questions = ', questions);
        // this.editCalculationView.retnderQuestions(questions);
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify() {
        this.subscribers.forEach(callback => callback(this.data));
    }

    createCalculation() {
        // создать пустую модель расчета
    }

    openCalculation(calculationId) {
        // получить данные расчета и открыть их
    }
}


























// async init() {
//     await this.dataService.init();
//     const calculations = this.dataService.getCalculationsFullInfo();
//     this.calculationListView.render(calculations);


//     // const materials = this.dataService.getMaterialsData();
//     // this.modalMaterialsView.render(materials);

//     // const questions = this.dataService.getQuestions();
//     // this.modalQuestionsView.render(questions);

//     // const coefficienFot = this.dataService.getCoefficientsFot();
//     // console.log('coefficienFot = ', coefficienFot);



//     // this.editCalculationView.render(calculations[0]);
//     // const questions = this.dataService.getQuestions();
//     // console.log('questions = ', questions);
//     // this.editCalculationView.retnderQuestions(questions);

//     // const crmId = this.productManager.getCrmData('id');
//     // this.connector.init(crmId);
//     // const { materials, calculations, coefficients, calculationFields, otherCalculations } = await this.connector.getCalculations();
//     // const usersIds = calculations.map(calculation => calculation.createdBy);
//     // const users = await this.connector.getUsersFromBx24(usersIds);

//     // this.calculationController = new CalculationController(this.bx24, this.title, this.productManager, this.fabricManager, this.calcProductId, materials, coefficients, calculations, calculationFields, users, currentUser, otherCalculations, this.calcProductFields, isAccess);
//     // this.calculationController.init();
// }
    // updateFabricPrice() {
    //     this.calculationController.updateFabricPrice();
    // }

    // async updateCalculation() {
    //     await this.calculationController.updateCalculation();
    // }

    // getChangedData() {
    //     return {
    //         [this.productManager.getProductFieldName('calculationId')]: this.productManager.getProductData('calculationId'),
    //     };
    // }

    // getFinallyCost() {
    //     return this.calculationController.getFinallyCost();
    // }

    // copyCalculationToNewProduct(productId) {
    //     return this.calculationController.copyCalculationToNewProduct(productId);
    // }
