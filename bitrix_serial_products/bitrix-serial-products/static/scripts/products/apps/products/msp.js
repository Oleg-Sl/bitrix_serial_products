import BaseApp from '../base.js';
import { ID_MSP, FIELD_MSP, } from '../../../configs/products/msp.js';
import FabricManager from '../../components/fabric/products/msp.js';
import MspView from '../../components/view/products/mspview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_MSP, CALC_FIELD_MSP } from '../../../configs/calc/sp_msp.js';
import CheckMspData from '../../components/validity/mspquestionvalidity.js'


export default class MspApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_MSP, FIELD_MSP);

        this.productNameRus = 'МСП';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new MspView(productService, userService, callbackService);
        this.checkData = new CheckMspData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_MSP,
            CALC_FIELD_MSP,
            ID_MSP,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this),
            this.fotAccessManager,
            this.currentUserId
        );
    }

    async callbackProductItem(action, productId = null, detailText = null) {
        let fields = {};
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
        return `${collection}`;
    }

    getProductItemvariationTitle(fabric = null) {
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        
        let title = `Мягкая стеновая панель, ${collection}, тест. Общий габарит: ${w}*${d}*${h} мм.`;
        // let title = `Мягкая стеновая панель, ${collection}, тест (индивидуальное изделие код №2). Общий габарит: ${w}*${d}*${h} мм.`;
        if (fabric) {
            title += ` Ткань: ${fabric}.`;
        }
        return title;
    }
}
