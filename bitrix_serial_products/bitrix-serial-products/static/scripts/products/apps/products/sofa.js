import BaseApp from '../base.js';
import { ID_SOFA, FIELD_SOFA, } from '../../../configs/products/sofa.js';
import FabricManager from '../../components/fabric/products/sofa.js';
import SofaView from '../../components/view/products/sofaview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_SOFA, CALC_FIELD_SOFA } from '../../../configs/calc/sp_sofa.js';
import CheckSofaData from '../../components/validity/sofaquestionvalidity.js'


export default class SofaApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_SOFA, FIELD_SOFA);

        this.productNameRus = 'Диван';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new SofaView(productService, userService, callbackService, mechanismService);
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
}
