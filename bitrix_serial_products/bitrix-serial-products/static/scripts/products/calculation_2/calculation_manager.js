
import { ConnectorBx24 } from './connector.js';
import { CalculationController } from './controllers/calculation_controller.js';
import { CalculationAccessManager } from '../../../common/permission/calculation/access_manager.js'


export default class CalculationManager {
    constructor(bx24, productManager, fabricManager, calcProductId, calcProductFields, title) {
        this.bx24 = bx24;
        this.title = title;
        this.fabricManager = fabricManager;
        this.productManager = productManager;
        this.calcProductId = calcProductId;             // ID типа смарта расчета для конкретного изделия 
        this.calcProductFields = calcProductFields;     // Поля смарта расчета для конкретного изделия

        this.connector = new ConnectorBx24(this.bx24, this.calcProductId, this.productManager.smartTypeId, this.productManager.productId, this.productManager.crmType);
        this.accessManager = new CalculationAccessManager(this.bx24);
        this.editModalController = null;
    }

    async init() {
        await this.accessManager.init();
        const crmId = this.productManager.getCrmData('id');
        this.connector.init(crmId);
        const { materials, calculations, coefficients, calculationFields, otherCalculations } = await this.connector.getCalculations();
        const usersIds = calculations.map(calculation => calculation.createdBy);
        const users = await this.connector.getUsersFromBx24(usersIds);
        const currentUser = await this.connector.getCurrentUserFromBx24();
        const isAccess = this.accessManager.isAccess(this.productManager.currentUser.ID);

        this.calculationController = new CalculationController(this.bx24, this.title, this.productManager, this.fabricManager, this.calcProductId, materials, coefficients, calculations, calculationFields, users, currentUser, otherCalculations, this.calcProductFields, isAccess);
        this.calculationController.init();
  
    }

    updateFabricPrice() {
        this.calculationController.updateFabricPrice();
    }

    async updateCalculation() {
        await this.calculationController.updateCalculation();
    }

    getChangedData() {
        return {
            [this.productManager.getProductFieldName('calculationId')]: this.productManager.getProductData('calculationId'),
        };
    }

    getFinallyCost() {
        return this.calculationController.getFinallyCost();
    }

    copyCalculationToNewProduct(productId) {
        return this.calculationController.copyCalculationToNewProduct(productId);
    }
    
    // controlOfAccessToPayment() {
    //     if (!this.accessManager.isAccess(this.productManager.currentUser.ID)) {
    //         this.calculationController.disablePayment();
    //     }
    // }
}


































// this.modal = document.querySelector('#calculationWindow');
// this.container = document.querySelector('#productCalculations');
// this.dataManager = new DataManager(this.bx24, this.calcProductId, this.calcProductFields, this.productManager, this.fabricManager);
// this.viewCalcs = new ViewCalculations(this.container, this.dataManager, this.openModal.bind(this), this.choiceCalculation.bind(this));
// this.modalMutable = new ModalMutable(this.modal, this.dataManager, this.createCalculation.bind(this));
// this.modalUnmutable = new ModalUnmutable(this.modal, this.dataManager, this.copyCalculation.bind(this));




// this.editModalController = new EditModalController(calculationsData, currentUser);
// this.initButtons();
// await this.dataManager.init();
// const calculations = this.dataManager.getCalculations();
// this.viewCalcs.render(calculations, this.productManager.getProductData('calculationId'));     




























    // initButtons() {
    //     if (this.productManager.isLockedField('calculationId')) {
    //         this.container.querySelector('.product-btn-save').disabled = true;
    //         document.querySelector('#copyCalculation').disabled = true;
    //     }
    // }

    // async openModal(calculateId=null) {
    //     if (calculateId) {
    //         const calculation = this.dataManager.getCalculationById(calculateId);
    //         this.modalUnmutable.openModal(calculation);
    //         return;
    //     }
    //     const calculationData = this.dataManager.getNewCalculation();
    //     this.modalMutable.openModal(calculationData);
    // }

    // async choiceCalculation(calculateId) {
    //     this.productManager.setProductData('calculationId', calculateId);
    // }

    // async copyCalculation(calculateId) {
    //     let calculationData = this.dataManager.getCopyCalculation(calculateId);
    //     this.modalMutable.openModal(calculationData);
    // }

    // async createCalculation(calculateData) {
    //     calculateData.title = `${this.productManager.getProductData('id')} ${this.title} ${this.productManager.getProductSize()}`;
    //     calculateData[`parentId${this.dataManager.parentSmartId}`] = this.productManager?.productId;
    //     calculateData[this.calcProductFields.dateOfCalculation] = this.dataManager.getLastDateMaterialCost();
    //     calculateData.createdBy = this.productManager?.currentUser?.ID;

    //     const result = await this.bx24.callMethodJS('crm.item.add', {
    //         entityTypeId: this.calcProductId,
    //         fields: calculateData
    //     });
    //     const calculation = result?.item;
    //     this.choiceCalculation(calculation?.id);
    //     this.dataManager.addCalculation(calculation);
    //     const calculationData = this.dataManager.getCalculationById(calculation?.id);
    //     this.viewCalcs.createCalculation(calculationData, calculation?.id);

    //     this.productManager.updateProduct({
    //         [this.productManager.getProductFieldName('calculationId')]: calculation?.id
    //     });
    // }

    // getChangedData() {
    //     return {
    //         [this.productManager.getProductFieldName('calculationId')]: this.productManager.getProductData('calculationId'),
    //     };
    // }

    // getFinallyCost() {
    //     const calculationId = this.productManager.getProductData('calculationId');
    //     const calculation = this.dataManager.getCalculationById(calculationId);
    //     return calculation?.cost?.value || 0;
    // }
// }
