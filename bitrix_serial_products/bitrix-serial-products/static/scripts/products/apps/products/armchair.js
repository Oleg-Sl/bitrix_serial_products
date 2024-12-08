import BaseApp from '../base.js';
import { ID_ARMCHAIR, FIELD_ARMCHAIR, } from '../../../configs/products/armchair.js';
import FabricManager from '../../components/fabric/products/armchair.js';
import ArmchairView from '../../components/view/products/armchairview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_ARMCHAIR, CALC_FIELD_ARMCHAIR } from '../../../configs/calc/sp_armchair.js';
import CheckArmchairData from '../../components/validity/armchairquestionvalidity.js'


export default class ArmchairApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_ARMCHAIR, FIELD_ARMCHAIR);

        this.productNameRus = 'Кресло';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new ArmchairView(productService, userService, callbackService, this.callbackProductItem.bind(this));
        this.checkData = new CheckArmchairData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_ARMCHAIR,
            CALC_FIELD_ARMCHAIR,
            ID_ARMCHAIR,
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
        return `${this.productNameRus} ${collection}`;
    }

    getProductItemvariationTitle(fabric = null) {
        const description = this.productService.getValue('freeTitle');
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        const support = this.productService.getValueText('supports') || '-';
        const useInFillers = this.productService.getValueText('useInFillers_3') || '-';
        
        let title = `Кресло ${description} (коллекция tamamm). Общий размер: Ш*Г*В - ${w}*${d}*${h} мм. Опоры: ${support}.`;
        if (fabric) {
            title += ` Ткань: ${fabric}.`;
        }
        return title;
    }
}
