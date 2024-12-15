import BaseApp from '../base.js';
import { ID_BED, FIELD_BED, } from '../../../configs/products/bed.js';
import FabricManager from '../../components/fabric/products/bed.js';
import BedView from '../../components/view/products/bedview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_BED, CALC_FIELD_BED } from '../../../configs/calc/sp_bed.js';
import CheckBedData from '../../components/validity/bedquestionvalidity.js'


export default class BedApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_BED, FIELD_BED);

        this.productNameRus = 'Кровать';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new BedView(productService, userService, callbackService);
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
}
