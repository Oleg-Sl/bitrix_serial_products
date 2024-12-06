import ViewHeader from "../components/header.js";
// import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';
import MainPhotoManager from '../components/main_photo/mainphotomanager.js';
import CanvasManager from '../components/canvas/canvasmanager.js';
import FotAccessManager from '../../main/components/permissions/fot_access_manager.js';
import { ID_FOT } from '../../configs/calc/fot.js';
import ProductItemService from '../services/productitem_service.js';


export default class BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, productTypeId, productFields) {
        this.apiClient = apiClient;
        this.productService = productService;
        this.fabricService = fabricService;
        this.userService = userService;
        this.mechanismService = mechanismService;
        this.callbackService = callbackService;
        this.fileUploadService = fileUploadService;

        this.currentUserId = this.userService.getCurrentUser()?.ID;

        this.fotAccessManager = new FotAccessManager(this.apiClient);
        
        // this.portalUrl = portalUrl;
        // this.productId = productId;
        this.productTypeId = productTypeId;
        this.productFields = productFields;

        this.viewHeader = new ViewHeader(this.productService, this.userService, this.callbackService);
        this.mainPhotoManager = new MainPhotoManager(this.fileUploadService, this.productService, (17.46/10.15));
        this.canvasManager = new CanvasManager(this.apiClient, this.productService, this.fileUploadService);
        this.productItemService = new ProductItemService(apiClient);
        

        this.btnSave = document.querySelector(`.product-btn-save`);
        this.btnCopy = document.querySelector(`#btnCreateCopyProduct`);
        this.btnRemove = document.querySelector(`#btnDeleteProduct`);
    }

    async initialize() {
        this.productService.setCbNotifyCalculation(this.notifyCalculation.bind(this));
        this.fotAccessManager.initialize();
        this.fabricManager.initialize();
        this.calculation.initialize();
        this.viewMain.initialize();

        this.viewHeader.render();
        this.viewMain.render();

        this.mainPhotoManager.initialize();
        this.canvasManager.initialize();

        this.initHandlers();
    }

    initHandlers() {
        this.btnSave.addEventListener('click', this.handlerSaveChanges.bind(this));
        this.btnCopy.addEventListener('click', this.handlerCreateCopyProduct.bind(this));
        // this.btnRemove.addEventListener('click', this.handlerRemoveProduct.bind(this));
    }

    async handlerSaveChanges(event) {
        const target = this.btnSave;
        const spinner = target.querySelector('div');
        spinner.style.display = 'inline-block';
        target.disabled = true;
        try {
            const changedData = this.getChangedData();
            console.log("changedData = ", changedData);
            const result = await this.productService.updateProduct(changedData);
            await this.delay(350);
            await this.productService.refreshProduct();
            
            this.fabricManager.initialize();
            this.canvasManager.resetChangedData();
            this.viewMain.render();
            this.showRequestResult("Изменения сохранены");
        } catch (error) {
            console.error('Error in handlerSaveChanges:', error);
            alert("Не удалось сохранить изменения. Пожалуйста, сделайте скриншот вывода консоли раработчика. Открыть консоль комбинацией 'Ctrl + Shift + I' и перейдите в вкладку 'Console'.");
        } finally {
            target.disabled = false;
            spinner.style.display = 'none';
        }
    }

    notifyCalculation() {
        this.calculation.updateCaclulations();
    }

    async handlerCreateCopyProduct(event) {
        const target = event.target;
        const isCreateCopyProduct = confirm("Точно копируем открытую карточку изделия?");
        if (!isCreateCopyProduct) {
            return;
        }
        const spinner = target.querySelector('div');
        spinner.style.display = 'inline-block';
        target.disabled = true;
        try {
            const copyData = await this.getCopyData();
            console.log("copyData = ", copyData);
            const result = await this.apiClient.callMethod("crm.item.add", { entityTypeId: ID_ARMCHAIR, fields: copyData });
            const coopyProductId = result?.item?.id;
            if (coopyProductId) {
                await this.calculation.copyCalculationToNewProduct(result?.item?.id);
            }
            this.showRequestResult("Копия товара создана");
        } catch (error) {
            console.error('Error in handlerCreateCopyProduct:', error);
        } finally {
            target.disabled = false;
            spinner.style.display = 'none';
        }
    }

    // async handlerRemoveProduct(event) {
    //     const target = event.target;
    //     const isRemoveProduct = confirm("Вы точно хотите УДАЛИТЬ издедие из сделки?");
    //     if (!isRemoveProduct) {
    //         return;
    //     }
    //     const spinner = target.querySelector('div');
    //     spinner.style.display = 'inline-block';
    //     const isConfirmed = confirm("Вы уверены, что хотите удалить этот продукт?");
    //     if (isConfirmed) {
    //         target.disabled = true;
    //         try {
    //             // await this.productManager.remove();
    //             const result = await this.apiClient.callMethod("crm.item.delete", { entityTypeId: ID_ARMCHAIR, id: this.productId });
    //             BX24.closeApplication();
    //         } catch (error) {
    //             console.error('Error in handlerRemoveProduct:', error);
    //         } finally {
    //             target.disabled = false;
    //             spinner.style.display = 'none';
    //         }
    //     } else {
    //         spinner.style.display = 'none';
    //     }
    // }

    displayFabric(link, ind) {
        console.log("link = ", link, " ind = ", ind);
        this.canvasManager.addFabric(link, ind);
    }

    getChangedData() {
        return {
            [this.productService.getFieldName('updatedBy')]: this.userService.getCurrentUser()?.ID,
            title: `${this.productNameRus} `,
            [this.productService.getFieldName('calculationId')]: this.calculation.getSelectedCalculationId(),
            [`parentId${ID_FOT}`]: this.calculation.getSelectedFotCalculationId(),

            // ...this.calculation.getChangedData(),
            ...this.productService.getChangedData(),
            // ...this.fabricManager.getChangedData(),
            ...this.mainPhotoManager.getChangedData(),
            ...this.canvasManager.getChangedData()
        };
    }

    async getCopyData() {
        return {
            [this.productService.getFieldName('updatedBy')]: this.userService.getCurrentUser()?.ID,
            [this.productService.getProductFieldName('createdBy')]: this.userService.getCurrentUser()?.ID,
            title: this.productNameRus,
            // parentId1: this.dataManager.getProductData('parentId1'),
            ...this.productService.getCopyData(),
            // ...this.fabricManager.getCopyData(),
            ...await this.mainPhotoManager.getCopyData(),
            ...await this.canvasManager.getCopyData()
        };
    }

    showRequestResult(message) {
        const elemModal = document.querySelector(`#requestResult`);
        elemModal.querySelector('.modal-body').innerHTML = message;
        const myModal = new bootstrap.Modal(elemModal, {})
        myModal.show();
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }    
}
