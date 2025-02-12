import BaseApp from '../base.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND, } from '../../../configs/products/nightstand.js';
import FabricManager from '../../components/fabric/products/nightstand.js';
import NightstandView from '../../components/view/products/nightstandview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_NIGHTSTAND, CALC_FIELD_NIGHTSTAND } from '../../../configs/calc/sp_nightstand.js';
import CheckNightstandData from '../../components/validity/nightstandquestionvalidity.js'


const MAIN_PHOTO_RATIO = (17.46/10.15);


export default class NightstandApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_NIGHTSTAND, FIELD_NIGHTSTAND, MAIN_PHOTO_RATIO);

        this.productNameRus = 'Тумба';
        this.isFabrics = false;
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
        console.log('filterTopMaterial = ', filterTopMaterial);
        if (filterTopMaterial == 5991) {
            // Нат. камен
            return 485;
        } else if (filterTopMaterial == 5987) {
            // Стекло
            return 483;
        } else if (filterTopMaterial == 5989) {
            // Вставка из кож
            return 487;
        } else if (filterTopMaterial == 5985) {
            // Шпон
            return 683;
        } else if (filterTopMaterial == 5983) {
            // Эмаль
            return 719;
        }
    }

    getProperty547() {
        const filterSize = this.productService.getValue('filterSize') || '-';
        console.log('filterSize = ', filterSize);
        if (filterSize == 5949) {
            // XS
            return 713;
        } else if (filterSize == 5951) {
            // S
            return 473;
        } else if (filterSize == 5953) {
            // M
            return 475;
        } else if (filterSize == 5955) {
            // L
            return 477;
        } else if (filterSize == 5957) {
            // XL
            return 715;
        } else if (filterSize == 5959) {
            // XXL
            return 717;
        }
    }

    async callbackProductItem(action, productId = null, detailText = null) {
        let fields = {};
        const property553 = this.getProperty553();
        console.log('property553 = ', property553);

        if (property553) {
            fields.property553 = { value: property553 };
        }

        const property547 = this.getProperty547();
        console.log('property547 = ', property547);

        if (property547) {
            fields.property547 = { value: property547 };
        }
        console.log('fields = ', fields);
        
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

        let title = `${this.productNameRus} ${collection} ${filterSize} ${filterSizeDesc}. Общий габарит: Ш*Г*В - ${w}*${d}*${h} мм. Материал столешницы: ${filterTopMaterial}.`;
        // let title = `${this.productNameRus} ${collection}. ${filterSize}. ${filterSizeDesc} (индивидуальное изделие код №2). Общий габарит: Ш*Г*В - ${w}*${d}*${h} мм. Материал столешницы: ${filterTopMaterial}.`;
        // if (fabric) {
        //     title += ` Ткань: ${fabric}.`;
        // }
        return title;
    }
}
