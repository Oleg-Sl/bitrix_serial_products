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
        this.viewMain = new PoufView(productService, userService, callbackService);
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
            this.handlerSaveChanges.bind(this)
        );
    }
}
