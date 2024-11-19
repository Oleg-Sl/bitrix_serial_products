import BaseApp from '../base.js';
import { ID_CHAIR, FIELD_CHAIR, } from '../../../configs/products/chair.js';
import FabricManager from '../../components/fabric/products/chair.js';
import ChairView from '../../components/view/products/chairview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_CHAIR, CALC_FIELD_CHAIR } from '../../../configs/calc/sp_chair.js';
import CheckChairData from '../../components/validity/chairquestionvalidity.js'


export default class ChairApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_CHAIR, FIELD_CHAIR);

        this.productNameRus = 'Стул';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new ChairView(productService, userService, callbackService);
        this.checkData = new CheckChairData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_CHAIR,
            CALC_FIELD_CHAIR,
            ID_CHAIR,
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
