import BaseApp from '../base.js';
import { ID_BED, FIELD_BED, } from '../../../configs/products/bed.js';
import FabricManager from '../../components/fabric/products/bed.js';
import BedView from '../../components/view/products/bedview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_BED, CALC_FIELD_BED } from '../../../configs/calc/sp_bed.js';
import CheckBedData from '../../components/validity/bedquestionvalidity.js'


const MAIN_PHOTO_RATIO = (17.46/10.15);


export default class BedApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_BED, FIELD_BED, MAIN_PHOTO_RATIO);

        this.productNameRus = 'Кровать';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new BedView(productService, userService, callbackService, this.callbackProductItem.bind(this));
        
        this.checkData = new CheckBedData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_BED,
            CALC_FIELD_BED,
            ID_BED,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this),
            this.fotAccessManager,
            this.currentUserId
        );
    }

    isMechanism() {
        const liftingMechanism = this.productService.getValue('liftingMechanism');
        return liftingMechanism && liftingMechanism == 4071;
    }

    isStorageBox() {
        const hasStorageBox = this.productService.getValue('hasStorageBox');
        return hasStorageBox && hasStorageBox == 4075;
    }

    getSmp() {
        const smp = this.productService.getValue('smp');
        const widthSmp = smp.split('*')?.[0];
        // console.log({
        //     smp: smp,
        //     widthSmp: widthSmp
        // });

        if (!smp) {
            return null;
        }

        switch (widthSmp.trim()) {
            case '800':
                return 349;
            case '900':
                return 351;
            case '1000':
                return 353;
            case '1200':
                return 403;
            case '1400':
                return 357;
            case '1600':
                return 311;
            case '1800':
                return 313;
            case '2000':
                return 315;
            default:
                return null;
        }
    }

    // - Ящик - данные берем из поля Ящик для хранения
    async callbackProductItem(action, productId = null, detailText = null) {
        let fields = {
            property471: { value: this.isMechanism() ? 327 : 333 },
            property473: { value: this.isStorageBox() ? 329 : 335 },
        };
        const smp = this.getSmp();
        if (smp) {
            fields['property465'] = { value: smp };
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
        const smp = this.productService.getValue('smp');
        const mechanism = this.isMechanism() ? 'С механизмом' : 'Без механизма';
        const storageBox = this.isStorageBox() ? 'С ящиком' : 'Без ящика';
        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';
        
        let title = `${this.productNameRus} ${collection}. Общий габарит:  Ш*Г*В - ${w}*${d}*${h} мм. Под матрас - ${smp}. ${mechanism}. ${storageBox}.`;
        // let title = `${this.productNameRus} ${collection} (индивидуальное изделие код №2). Общий габарит:  Ш*Г*В - ${w}*${d}*${h} мм. Под матрас - ${smp}. ${mechanism}. ${storageBox}.`;
        if (fabric) {
            title += ` Ткань: ${fabric}.`;
        }
        return title;
    }
}
