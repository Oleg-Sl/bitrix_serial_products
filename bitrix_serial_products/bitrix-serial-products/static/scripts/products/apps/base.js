import ViewHeader from "../components/header.js";
// import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';
import MainPhotoManager from '../components/main_photo/mainphotomanager.js';
import CanvasManager from '../components/canvas/canvasmanager.js';
import FotAccessManager from '../../main/components/permissions/fot_access_manager.js';
import { ID_FOT } from '../../configs/calc/fot.js';
import ProductItemService from '../services/productitem_service2.js';


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
        // Сохранить изменения
        this.btnSave.addEventListener('click', this.handlerSaveChanges.bind(this));
        // Копировать изделие
        this.btnCopy.addEventListener('click', this.handlerCreateCopyProduct.bind(this));
    }

    async callbackProductItem(action, productId = null, detailText = null) {
        // action = 0 - создание главного товара и вариаций
        // action = 1 - обновление вариаций
        if (action == 0) {
            return await this.createProductItem(productId, detailText);
        } else if (action == 1) {
            return await this.updateProductItem();
        }
    }

    async createProductItem(mainProductItemId = null, detailText = null, dataFields = {}) {
        const productMainId = this.productService.getValue('productMainId');
        const productVariationIds = this.productService.getValue('productVariationIds');
        if (productMainId) {
            alert('Главный товар уже создан');
            return;
        }
        if (productVariationIds && productVariationIds.length > 0) {
            alert('Вариации уже созданы');
            return;
        }

        const fileContentData = await this.mainPhotoManager.getFileContent();

        // создание главного товара
        if (mainProductItemId == 11) {
            const w = this.productService.getValue('commonDimensionsWidth') || '-';
            const d = this.productService.getValue('commonDimensionsDepth') || '-';
            const h = this.productService.getValue('commonDimensionsHeight') || '-';
            const overallDimensions = `${w}x${d}x${h} мм`;
            mainProductItemId = await this.productItemService.createMainProduct(193, this.getMainProductItemTitle(), detailText, overallDimensions, fileContentData);
        }

        if (!mainProductItemId) {
            alert('Не указан головной товар. Для создания нового укажите - 11');
            return;
        }

        let productPrices;
        try {
            productPrices = this.calculation.getProductPrices();
        } catch (error) {
            alert('Расчет не выполнен или не загружен');
            return;
        }

        // Создание вариаций
        let variationIds = [];
        for (const productPrice of productPrices) {
            const category = productPrice.fabricCategory;
            const price = productPrice.price;
            const categoryId = productPrice.categoryId;
            const title = this.getProductItemvariationTitle(category);
            let fields = {
                iblockId: 25,
                productType: 3,
                parentId: mainProductItemId,
                name: title,
                purchasingCurrency: "RUB",
                measure: "9",
                quantity: 0,
                vatId: 11,
                vatIncluded: "Y",
                property347: [],
                property467: null,
                // purchasingPrice: purchasingPrice,
                ...dataFields
            };

            if (fileContentData && fileContentData.length > 0) {
                fields.property347.push({ value: { fileData: fileContentData } });
            }

            if (categoryId) {
                fields.property467 = { value: categoryId };
            }

            const result = await this.productItemService.createVariationProduct(
                fields
                // mainProductItemId, title, fileContentData, price, categoryId
            );
            variationIds.push(result);
        }
        console.log('variationIds = ', variationIds);
        console.log('productPrices = ', productPrices);
        const responseSaveRetailPrice = await this.productItemService.createRetailPrice(variationIds, productPrices.map(item => item.price));
        console.log('responseSaveRetailPrice = ', responseSaveRetailPrice);

        // Сохранение ID главного товара и вариаций в изделие
        const response = await this.productItemService.saveVariationIdsToProduct(
            this.productService.getProductTypeId(),
            this.productService.getValue('id'),
            {
                [this.productFields.productMainId]: mainProductItemId,
                [this.productFields.productVariationIds]: variationIds
            }
        );
        console.log('response = ', response);
    }

    async updateProductItem(dataFields = {}) {
        const productVariationIds = this.productService.getValue('productVariationIds');
        if (productVariationIds && productVariationIds.length > 0) {
            let productPrices;
            try {
                productPrices = this.calculation.getProductPrices();
            } catch (error) {
                alert('Расчет не выполнен или не загружен');
                return;
            }
            await this.productItemService.removeImages(productVariationIds);
            const fileContentData = await this.mainPhotoManager.getFileContent();
            await this.productItemService.updateMainProduct(this.productService.getValue('productMainId'), fileContentData);
            for (const i in productVariationIds) {
                const productVariationId = productVariationIds[i];
                const price = productPrices[i].price;
                const categoryId = productPrices[i].categoryId;
                const title = this.getProductItemvariationTitle(productPrices[i]?.fabricCategory);

                let fields = {
                    name: title,
                    measure: "9",
                    property347: [],
                    property467: null,
                    // purchasingPrice: purchasingPrice,
                    ...dataFields
                };
        
                if (fileContentData && fileContentData.length > 0) {
                    fields.property347.push({ value: { fileData: fileContentData } });
                }
        
                if (categoryId) {
                    fields.property467 = { value: categoryId };
                }
                const response = await this.productItemService.updateVariationProduct(
                    productVariationId,
                    fields 
                    // title, fileContentData, price, categoryId
                );
                console.log('response = ', response);
            }

            const responseSaveRetailPrice = await this.productItemService.saveRetailPrice(productVariationIds, productPrices.map(item => item.price));
            console.log('responseSaveRetailPrice = ', responseSaveRetailPrice);
        } else {
            alert('Вариации отсутствуют');
        }
    }

    getMainProductItemTitle() {          
        return '-';
    }

    getProductItemvariationTitle(fabric = null) {
        return '-';
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
            // const [calculationId, fotId] = await this.calculation.copyCalculationToNewProduct(98654321);

            // await this.calculation.copyCalculationToNewProduct(111);
            const result = await this.apiClient.callMethod("crm.item.add", { entityTypeId: this.productTypeId, fields: copyData });
            const coopyProductId = result?.item?.id;
            if (coopyProductId) {
                const [calculationId, fotId] = await this.calculation.copyCalculationToNewProduct(coopyProductId);
                // this.productService.updateProductData('calculationId', calculationId);
                const resultUpdateProduct = await this.apiClient.callMethod("crm.item.update", { entityTypeId: this.productTypeId, id: coopyProductId, fields: { [this.productService.getFieldName('calculationId')]: calculationId } });
                console.log("resultUpdateProduct = ", resultUpdateProduct);                
                // const changedData = this.getChangedData();
                // console.log("changedData = ", changedData);
                // const result = await this.productService.updateProduct(changedData);
            }
            this.showRequestResult("Копия изделия создана. ID копии изделия: " + coopyProductId);
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
            title: this.productNameRus,
            ...this.productService.getCopyData(),
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
