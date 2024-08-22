import DataService from './services/data_service.js';
// import CalculationsService from './services/calculation_service.js';
// import CoefficientsService from './services/coefficients_service.js';
// import MaterialsService from './services/materials_service.js';
// import UserService from './services/user_service.js';
import CalculationsListView from './components/calculationslist.js';
import EditCalculationView from './components/calculationedit.js';
import ModalMaterialsView from './components/modal_materials.js';
import ModalQuestionsView from './components/modal_questions.js';


export default class CalculationManager {
    constructor(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldAliases = calcFieldAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;

        this.dataService = new DataService(apiClient, calcTypeId, calcFieldAliases, productTypeId, productId);
        this.calculationListView = new CalculationsListView();

        this.modalMaterialsView = new ModalMaterialsView();
        this.modalQuestionsView = new ModalQuestionsView();

        this.subscribers = [];

    }

    async init() {
        await this.dataService.init();
        const calculations = this.dataService.getCalculationsFullInfo();
        this.calculationListView.render(calculations);


        // const materials = this.dataService.getMaterialsData();
        // this.modalMaterialsView.render(materials);

        // const questions = this.dataService.getQuestions();
        // this.modalQuestionsView.render(questions);

        // const coefficienFot = this.dataService.getCoefficientsFot();
        // console.log('coefficienFot = ', coefficienFot);



        // this.editCalculationView.render(calculations[0]);
        // const questions = this.dataService.getQuestions();
        // console.log('questions = ', questions);
        // this.editCalculationView.retnderQuestions(questions);

        // const crmId = this.productManager.getCrmData('id');
        // this.connector.init(crmId);
        // const { materials, calculations, coefficients, calculationFields, otherCalculations } = await this.connector.getCalculations();
        // const usersIds = calculations.map(calculation => calculation.createdBy);
        // const users = await this.connector.getUsersFromBx24(usersIds);

        // this.calculationController = new CalculationController(this.bx24, this.title, this.productManager, this.fabricManager, this.calcProductId, materials, coefficients, calculations, calculationFields, users, currentUser, otherCalculations, this.calcProductFields, isAccess);
        // this.calculationController.init();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    // Отправка уведомлений всем подписчикам
    notify() {
        this.subscribers.forEach(callback => callback(this.data));
    }

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
}
