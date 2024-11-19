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
}
