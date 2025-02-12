import BaseApp from '../base.js';
import { ID_SOFA, FIELD_SOFA, } from '../../../configs/products/sofa.js';
import FabricManager from '../../components/fabric/products/sofa.js';
import SofaView from '../../components/view/products/sofaview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_SOFA, CALC_FIELD_SOFA } from '../../../configs/calc/sp_sofa.js';
import CheckSofaData from '../../components/validity/sofaquestionvalidity.js'


export default class SofaApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        this.mainPhotoRatio = (17.46/10.15);

        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_SOFA, FIELD_SOFA, this.mainPhotoRatio);

        this.productNameRus = 'Диван';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new SofaView(productService, userService, callbackService, this.callbackProductItem.bind(this), mechanismService);
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
  
    async callbackProductItem(action, productId = null, detailText = null) {
        const ottomanSide = this.productService.getValue('ottomanSide');
        let fields = {
            property471: { value: this.isMechanism() ? 327 : 333 },
            // property621: this.isMechanism() ? 327 : 333,
        }
        if (ottomanSide == 4503) {
            // правая
            fields['property621'] = { value: 701 };
        } else if (ottomanSide == 4505) {
            // левая
            fields['property621'] = { value: 703 };
        } else {
            fields['property621'] = { value: 0 };
        }
        // action = 0 - создание главного товара и вариаций
        // action = 1 - обновление вариаций
        if (action == 0) {
            return await this.createProductItem(productId, detailText, fields);
        } else if (action == 1) {
            return await this.updateProductItem(fields);
        }
    }

    isMechanism() {
        const sleepingMechanism = this.productService.getValue('sleepingMechanism');
        return sleepingMechanism && sleepingMechanism != 1;
    }

    getMainProductItemTitle() {          
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        const shape = this.productService.getValueText('shape') || '-';
        const shapeId = this.productService.getValue('shape') || '-';
        let ottomanSide = '';
        if (shapeId == 3705) {
            // Диван с оттоманкой
            ottomanSide = this.productService.getValueText('ottomanSide') || '';
            console.log("ottomanSide = ", ottomanSide);
            ottomanSide = ottomanSide.toLowerCase();

        }
        const w = this.productService.getValue('commonDimensionsWidth') || '-';

        return `${this.productNameRus} ${collection} | ${shape} ${ottomanSide} ${w} мм`;
    }

    getProductItemvariationTitle(fabric = null) {
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        let shape = this.productService.getValueText('shape') || '-';
        const shapeId = this.productService.getValue('shape') || '-';
        if (shapeId == 3705) {
            // Диван с оттоманкой
            let ottomanSide = this.productService.getValueText('ottomanSide') || '';
            ottomanSide = ottomanSide.toLowerCase();
            shape += ` (${ottomanSide})`;
        }

        const sleepingMechanism = this.productService.getValue('sleepingMechanism');
        const mechanism = sleepingMechanism && sleepingMechanism != 1 ? 'С механизмом' : 'Без механизма';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        const support = this.productService.getValueText('supports') || '-';
        
        let title = `${this.productNameRus} ${collection}. Форма: ${shape}. Общий габарит: ${w}*${d}*${h} мм. ${mechanism}. Опоры: ${support}.`;
        // let title = `${this.productNameRus} ${collection} (индивидуальное изделие код №2). Форма: ${shape}. Общий габарит: ${w}*${d}*${h} мм. ${mechanism}. Опоры: ${support}.`;
        if (fabric) {
            title += ` Ткань: ${fabric}.`;
        }
        return title;
    }
}
