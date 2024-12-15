import BaseApp from '../base.js';
import { ID_SOFA, FIELD_SOFA, } from '../../../configs/products/sofa.js';
import FabricManager from '../../components/fabric/products/sofa.js';
import SofaView from '../../components/view/products/sofaview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_SOFA, CALC_FIELD_SOFA } from '../../../configs/calc/sp_sofa.js';
import CheckSofaData from '../../components/validity/sofaquestionvalidity.js'


export default class SofaApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_SOFA, FIELD_SOFA);

        this.productNameRus = 'Диван';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new SofaView(productService, userService, callbackService, mechanismService);
        this.checkData = new CheckSofaData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_SOFA,
            CALC_FIELD_SOFA,
            ID_SOFA,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this),
            this.fotAccessManager,
            this.currentUserId
        );
    }

    async createProductItem(mainProductItemId = null, detailText = null) {
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
            alert('Не удалось создать главный товар');
        }

        let productPrices;
        try {
            productPrices = this.calculation.getProductPrices();
        } catch (error) {
            alert('Расчет не выполнен или не загружен');
            return;
        }

        let variationIds = [];
        // Создание вариаций
        for (const productPrice of productPrices) {
            const category = productPrice.fabricCategory;
            const price = productPrice.price;
            const categoryId = productPrice.categoryId;
            const title = this.getProductItemvariationTitle(category);
            const result = await this.productItemService.createVariationProduct(mainProductItemId, title, fileContentData, price, categoryId);
            variationIds.push(result);
        }

        const responseSaveRetailPrice = await this.productItemService.saveRetailPrice(productVariationIds, productPrices.map(item => item.price));
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

    async updateProductItem() {
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
                const response = await this.productItemService.updateVariationProduct(productVariationId, title, fileContentData, price, categoryId);
                console.log('response = ', response);
            }

            const responseSaveRetailPrice = await this.productItemService.saveRetailPrice(productVariationIds, productPrices.map(item => item.price));
            console.log('responseSaveRetailPrice = ', responseSaveRetailPrice);
        } else {
            alert('Вариации отсутствуют');
        }
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

    getMainProductItemTitle() {          
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        const ottomanSide = this.productService.getValueText('ottomanSide') || '-';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';

        return `${this.productNameRus} ${collection} ${ottomanSide} ${w} мм`;
    }

    getProductItemvariationTitle(fabric = null) {
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        const shape = this.productService.getValueText('shape') || '-';
        const sleepingMechanism = this.productService.getValue('sleepingMechanism');
        const mechanism = sleepingMechanism && sleepingMechanism != 1 ? 'С механизмом' : 'Без механизма';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        const support = this.productService.getValueText('supports') || '-';
        
        let title = `Кресло ${collection} (коллекция tamamm). Форма: ${shape}. Общий габарит: ${w}*${d}*${h} мм. ${mechanism}. Опоры: ${support}.`;
        if (fabric) {
            title += ` Ткань: ${fabric}.`;
        }
        return title;
    }

    getCreateVariationProductFields() {
        let fields = {
            iblockId: 25,
            productType: 3,
            parentId: parentProductId,
            name: title,
            purchasingCurrency: "RUB",
            measure: "9",
            quantity: 0,
            vatId: 11,
            vatIncluded: "Y",
            property347: [],
            property467: null,
            // purchasingPrice: purchasingPrice,
        };

        if (fileContent && fileContent.length > 0) {
            fields.property347.push({ value: { fileData: fileContent } });
        }

        if (categoryId) {
            fields.property467 = { value: categoryId };
        }

        return fields;
    }

    getUpdateVariationProductFields() {
        let fields = {
            name: title,
            measure: "9",
            property347: [],
            property467: null,
        };

        if (fileContent && fileContent.length > 0) {
            fields.property347.push({ value: { fileData: fileContent } });
        }

        if (categoryId) {
            fields.property467 = { value: categoryId };
        }

        return fields;
    }
}
