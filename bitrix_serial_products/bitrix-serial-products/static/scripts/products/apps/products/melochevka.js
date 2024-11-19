import BaseApp from '../base.js';
import { ID_MELOCHEVKA, FIELD_MELOCHEVKA, } from '../../../configs/products/melochevka.js';
import FabricManager from '../../components/fabric/products/melochevka.js';
import MelochevkaView from '../../components/view/products/melochevkaview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_MELOCHEVKA, CALC_FIELD_MELOCHEVKA } from '../../../configs/calc/sp_melochevka.js';
import CheckMelochevkaData from '../../components/validity/melochevkaquestionvalidity.js'


export default class MelochevkaApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_MELOCHEVKA, FIELD_MELOCHEVKA);

        this.productNameRus = 'Мелочевка';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new MelochevkaView(productService, userService, callbackService);
        this.checkData = new CheckMelochevkaData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_MELOCHEVKA,
            CALC_FIELD_MELOCHEVKA,
            ID_MELOCHEVKA,
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
