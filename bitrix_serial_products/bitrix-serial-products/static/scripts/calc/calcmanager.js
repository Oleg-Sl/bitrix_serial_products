import DataService from './services/data_service.js';
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
        this.calculationListView = new CalculationsListView(this.createCalculation.bind(this), this.openCalculation.bind(this));

        this.modalMaterialsView = new ModalMaterialsView();
        this.modalQuestionsView = new ModalQuestionsView();

        this.subscribers = [];
    }

    async init() {
        await this.dataService.init();

        const calculations = this.dataService.getCalculations();
        const caclulation = calculations[0];
        // this.calculationListView.init(calculations);

        this.modalMaterialsView.render(caclulation.materials);
        this.modalQuestionsView.render(caclulation.questions);
        console.log("fot = ", caclulation.fot);

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
