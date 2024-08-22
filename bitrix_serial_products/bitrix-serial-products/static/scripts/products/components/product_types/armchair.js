import BaseApp from '../product_page.js';
import { ID_ARMCHAIR, FIELD_ARMCHAIR, } from '../../../configs/products/armchair.js';
import FabricManager from '../fabric_products/armchair.js';

export default class App extends BaseApp {
    constructor(productService, fabricService, userService, mechanismService, callbackService) {
        super(productService, fabricService, userService, mechanismService, callbackService, ID_ARMCHAIR, FIELD_ARMCHAIR);

        this.fabricManager = new FabricManager(fabricService, productService);

        this.fabricManager.init();
    }

}
