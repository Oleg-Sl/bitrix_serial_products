import BaseApp from '../base.js';
import { ID_TABLE, FIELD_TABLE, } from '../../../configs/products/table.js';
import FabricManager from '../../components/fabric/products/table.js';
import TableView from '../../components/view/products/tableview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_TABLE, CALC_FIELD_TABLE } from '../../../configs/calc/sp_table.js';
import CheckTableData from '../../components/validity/tablequestionvalidity.js'


export default class TableApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        this.mainPhotoRatio = (17.43/13.2);

        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_TABLE, FIELD_TABLE, this.mainPhotoRatio);

        this.productNameRus = 'Стол';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new TableView(productService, userService, callbackService);
        this.checkData = new CheckTableData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_TABLE,
            CALC_FIELD_TABLE,
            ID_TABLE,
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
