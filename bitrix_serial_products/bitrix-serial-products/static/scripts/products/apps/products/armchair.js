import BaseApp from '../base.js';
import { ID_ARMCHAIR, FIELD_ARMCHAIR, } from '../../../configs/products/armchair.js';
import FabricManager from '../../components/fabric/products/armchair.js';
import ArmchairView from '../../components/view/products/armchairview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_ARMCHAIR, CALC_FIELD_ARMCHAIR } from '../../../configs/calc/sp_armchair.js';
import CheckArmchairData from '../../components/validity/armchairquestionvalidity.js'


export default class ArmchairApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_ARMCHAIR, FIELD_ARMCHAIR);

        this.productNameRus = 'Кресло';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new ArmchairView(productService, userService, callbackService);
        this.checkData = new CheckArmchairData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_ARMCHAIR,
            CALC_FIELD_ARMCHAIR,
            ID_ARMCHAIR,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this)
        );
    }

}
