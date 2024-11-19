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
        this.viewMain = new NightstandView(productService, userService, callbackService);
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
}
