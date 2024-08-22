import ViewHeader from "./header.js";
import MainView from "./main.js";
import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';
import FileUploadService from '../services/fileupload_service.js';
import MainPhotoManager from './main_photo/mainphotomanager.js';


export default class BaseApp {
    constructor(productService, fabricService, userService, mechanismService, callbackService, productId, productFields) {
        this.productService = productService;
        this.fabricService = fabricService;
        this.userService = userService;
        this.mechanismService = mechanismService;
        this.callbackService = callbackService;

        this.portalUrl = portalUrl;
        this.productTypeId = smartProcessTypeId;
        this.productId = productId;
        this.productFields = productFields;

        this.viewHeader = new ViewHeader(this.productService, this.userService, this.callbackService);
        this.viewMain = new MainView(this.productService, this.userService, this.callbackService);

        // this.fileUploadService = new FileUploadService(this.userService, this.portalUrl, this.productTypeId, this.productId);

        // this.viewMain = new ViewMain(this.dataManager);
        // this.fabricManager = new FabricManager(this.bx24, this.dataManager, this.displayFabric.bind(this));
        // this.mainPhotoManager = new MainPhotoManager(this.bx24, this.dataManager, this.portalUrl, (17.46/10.15));
        // this.canvasManager = new CanvasManager(this.bx24, this.dataManager, this.portalUrl);
        // this.productManager = new ProductManager(this.bx24, this.dataManager, ITEM_ID_POTOCHKA, this.mainPhotoManager.getFileContent.bind(this.mainPhotoManager));

        this.btnSave = document.querySelector(`.product-btn-save`);
        this.btnCopy = document.querySelector(`#btnCreateCopyProduct`);
        this.btnRemove = document.querySelector(`#btnDeleteProduct`);
    }

    async initialize() {
        // console.log("productFields = ", this.productFields);
        // console.log("productId = ", this.productId);
        this.viewHeader.render();
        this.viewMain.render();

        // this.initHandlers();
    }

    // initButtons() {
    //     if (this.dataManager.isLockedField('btnSave')) {
    //         this.btnSave.disabled = true;
    //     }
    //     if (this.dataManager.isLockedField('btnCopy')) {
    //         this.btnCopy.disabled = true;
    //     }
    //     if (this.dataManager.isLockedField('btnRemove')) {
    //         this.btnRemove.disabled = true;
    //     }
    // }

    // initHandlers() {
    //     this.btnSave.addEventListener('click', this.handlerSaveChanges.bind(this));
    //     this.btnCopy.addEventListener('click', this.handlerCreateCopyProduct.bind(this));
    //     this.btnRemove.addEventListener('click', this.handlerRemoveProduct.bind(this));
    // }

    // async handlerSaveChanges(event) {
    //     const target = event.target;
    //     const spinner = target.querySelector('div');
    //     spinner.style.display = 'inline-block';
    //     target.disabled = true;
    //     try {
    //         const changedData = this.getChangedData();
    //         const result = await this.dataManager.updateProductData(changedData);
    //         await this.dataManager.saveHistory();
    //         await this.calculation.updateCalculation();
    //         await this.dataManager.refreshProductData();

    //         const title = this.getTitleProductItem();
    //         const calculationCost = this.calculation.getFinallyCost();
    //         this.fabricManager.init();
    //         this.canvasManager.resetChangedData();
    //         await this.productManager.create(title, calculationCost);
    //         this.viewMain.render();
    //         this.showRequestResult("Изменения сохранены");
    //     } catch (error) {
    //         console.error('Error in handlerSaveChanges:', error);
    //         alert("Не удалось сохранить изменения. Пожалуйста, сделайте скриншот вывода консоли раработчика. Открыть консоль комбинацией 'Ctrl + Shift + I' и перейдите в вкладку 'Console'.");
    //     } finally {
    //         target.disabled = false;
    //         spinner.style.display = 'none';
    //     }
    // }

    // async handlerCreateCopyProduct(event) {
    //     const target = event.target;
    //     const isCreateCopyProduct = confirm("Точно копируем открытую карточку изделия?");
    //     if (!isCreateCopyProduct) {
    //         return;
    //     }
    //     const spinner = target.querySelector('div');
    //     spinner.style.display = 'inline-block';
    //     target.disabled = true;
    //     try {
    //         const copyData = await this.getCopyData();
    //         console.log("copyData = ", copyData);
    //         const result = await this.bx24.callMethod("crm.item.add", { entityTypeId: ID_ARMCHAIR, fields: copyData });
    //         const coopyProductId = result?.item?.id;
    //         if (coopyProductId) {
    //             await this.calculation.copyCalculationToNewProduct(result?.item?.id);
    //         }
    //         this.showRequestResult("Копия товара создана");
    //     } catch (error) {
    //         console.error('Error in handlerCreateCopyProduct:', error);
    //     } finally {
    //         target.disabled = false;
    //         spinner.style.display = 'none';
    //     }
    // }

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
    //             await this.productManager.remove();
    //             const result = await this.bx24.callMethod("crm.item.delete", { entityTypeId: ID_ARMCHAIR, id: this.productId });
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

    // showRequestResult(message) {
    //     const elemModal = document.querySelector(`#requestResult`);
    //     elemModal.querySelector('.modal-body').innerHTML = message;
    //     const myModal = new bootstrap.Modal(elemModal, {})
    //     myModal.show();
    // }

    // displayFabric(link, ind) {
    //     this.canvasManager.addFabric(link, ind);
    // }

    // getTitleProductItem() {
    //     const width = this.dataManager.getProductDataText('commonDimensionsWidth');
    //     const depth = this.dataManager.getProductDataText('commonDimensionsDepth');
    //     const height = this.dataManager.getProductDataText('commonDimensionsHeight');
    //     const support = this.dataManager.getProductDataText('supports');
    //     const useInFillers = this.dataManager.getProductDataText('useInFillers_3');
    //     const productDescription = this.dataManager.getProductDataText('productDescription');
    //     const productDescriptionStart = this.dataManager.getProductDataText('productDescriptionStart');
        
    //     const fabric = this.fabricManager.getFabricName1();
    //     let title = `Кресло по индивидуальному проекту `;
    //     if (productDescriptionStart) {
    //         title += `${productDescriptionStart}`;
    //     }
    //     title += `. `;
    //     title += `Общий габарит: Ш*Г*В - ${width || '-'}*${depth || '-'}*${height || '-'} мм. `;
    //     title += `Опоры: ${support || '-'} `;
    //     title += `Наполнитель с использованием: ${useInFillers || '-'}. `;
    //     title += `Ткань: ${fabric || '-'}. `;
    //     if (productDescription) {
    //         title += `${productDescription}. `;
    //     }
    //     return title;    
    // }

    // getChangedData() {
    //     return {
    //         [this.dataManager.getProductFieldName('updatedBy')]: this.dataManager.getCurrentUserId(),
    //         title: this.getTitle(),
    //         ...this.calculation.getChangedData(),
    //         ...this.dataManager.getChangedData(),
    //         ...this.fabricManager.getChangedData(),
    //         ...this.mainPhotoManager.getChangedData(),
    //         ...this.canvasManager.getChangedData()
    //     };
    // }

    // async getCopyData() {
    //     return {
    //         [this.dataManager.getProductFieldName('updatedBy')]: this.dataManager.getCurrentUserId(),
    //         [this.dataManager.getProductFieldName('createdBy')]: this.dataManager.getCurrentUserId(),
    //         title: this.getTitle(),
    //         parentId1: this.dataManager.getProductData('parentId1'),
    //         ...this.dataManager.getCopyData(),
    //         ...this.fabricManager.getCopyData(),
    //         ...await this.mainPhotoManager.getCopyData(),
    //         ...await this.canvasManager.getCopyData()
    //     };
    // }

    // getTitle() {
    //     return `Кресло`;
    // }

    // compareData(oldData, newData) {
    //     console.log("oldData = ", oldData);
    //     console.log("newData = ", newData);
    //     for (let key in oldData) {
    //         if (oldData.hasOwnProperty(key)) {
    //             if (!newData.hasOwnProperty(key)) {
    //                 return false;
    //             }
    //             if ((+oldData[key] || +newData[key]) && oldData[key] != newData[key]) {
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // }

    // checkFabricDataChanged(newData) {
    //     const oldData = this.fabricManager.getChangedData();
    //     if (!this.compareData(oldData, newData)) {
    //         alert("Не удалось сохранить изменения. Пожалуйста, сделайте скриншот вывода консоли раработчика. Открыть консоль комбинацией 'Ctrl + Shift + I' и перейдите в вкладку 'Console'.");
    //     }
    // }
}
