import BaseApp from '../base.js';
import { ID_POUF, FIELD_POUF, } from '../../../configs/products/pouf.js';
import FabricManager from '../../components/fabric/products/pouf.js';
import PoufView from '../../components/view/products/poufview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_POUF, CALC_FIELD_POUF } from '../../../configs/calc/sp_pouf.js';
import CheckPoufData from '../../components/validity/poufquestionvalidity.js'


export default class PoufApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_POUF, FIELD_POUF);

        this.productNameRus = 'Пуф';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new PoufView(productService, userService, callbackService, this.callbackProductItem.bind(this));
        this.checkData = new CheckPoufData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_POUF,
            CALC_FIELD_POUF,
            ID_POUF,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this),
            this.fotAccessManager,
            this.currentUserId
        );
    }

    isStorageBox() {
        const hasStorageBox = this.productService.getValue('hasBox');
        return hasStorageBox && hasStorageBox != 4181;
    }

    async callbackProductItem(action, productId = null, detailText = null) {
        let fields = {
            property473: this.isStorageBox() ? 329 : 335,
        };

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
        const storageBox = this.isStorageBox() ? 'С ящиком' : 'Без ящика';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        
        let title = `${this.productNameRus} ${collection} тест. Общий габарит: ${w}*${d}*${h} мм. ${storageBox}.`;
        // let title = `${this.productNameRus} ${collection} тест (индивидуальное изделие код №2). Общий габарит: ${w}*${d}*${h} мм. ${storageBox}.`;
        if (fabric) {
            title += ` Ткань: ${fabric}.`;
        }
        return title;
    }
}
