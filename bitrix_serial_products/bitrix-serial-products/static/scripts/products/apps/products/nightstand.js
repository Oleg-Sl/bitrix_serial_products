import BaseApp from '../base.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND, } from '../../../configs/products/nightstand.js';
import FabricManager from '../../components/fabric/products/nightstand.js';
import NightstandView from '../../components/view/products/nightstandview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_NIGHTSTAND, CALC_FIELD_NIGHTSTAND } from '../../../configs/calc/sp_nightstand.js';
import CheckNightstandData from '../../components/validity/nightstandquestionvalidity.js'


export default class NightstandApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_NIGHTSTAND, FIELD_NIGHTSTAND);

        this.productNameRus = 'Тумба';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new NightstandView(productService, userService, callbackService, this.callbackProductItem.bind(this));
        this.checkData = new CheckNightstandData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_NIGHTSTAND,
            CALC_FIELD_NIGHTSTAND,
            ID_NIGHTSTAND,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this),
            this.fotAccessManager,
            this.currentUserId
        );
    }

    getProperty553() {
        const filterTopMaterial = this.productService.getValue('filterTopMaterial');
        if (filterTopMaterial == 5991) {
            // Нат. камен
            return 485;
        } else if (filterTopMaterial == 5987) {
            // Стекло
            return 483;
        } else if (filterTopMaterial == 5989) {
            // Вставка из кож
            return 487;
        }
    }

    async callbackProductItem(action, productId = null, detailText = null) {
        let fields = {};
        const property553 = this.getProperty553();
        if (property553) {
            fields.property553 = { value: property553 };
        }

        // action = 0 - создание главного товара и вариаций
        // action = 1 - обновление вариаций
        if (action == 0) {
            return await this.createProductItem(productId, detailText, fields);
        } else if (action == 1) {
            return await this.updateProductItem(fields);
        }
    }

    getMainProductItemTitle() {          
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        return `${this.productNameRus} ${collection}`;
    }

    getProductItemvariationTitle(fabric = null) {
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        const filterSize = this.productService.getValueText('filterSize') || '-';
        const filterSizeDesc = this.productService.getValue('filterSizeDesc') || '-';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        const filterTopMaterial = this.productService.getValueText('filterTopMaterial') || '-';

        let title = `${this.productNameRus} ${collection}. ${filterSize}. ${filterSizeDesc}. Общий габарит: Ш*Г*В - ${w}*${d}*${h} мм. Материал столешницы: ${filterTopMaterial}.`;
        // let title = `${this.productNameRus} ${collection}. ${filterSize}. ${filterSizeDesc} (индивидуальное изделие код №2). Общий габарит: Ш*Г*В - ${w}*${d}*${h} мм. Материал столешницы: ${filterTopMaterial}.`;
        // if (fabric) {
        //     title += ` Ткань: ${fabric}.`;
        // }
        return title;
    }
}
