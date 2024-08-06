import Filter from './filter.js';
import ProductsList from './products.js';
import PackedParameters from '../services/packed.js';
// import AppUploadAccessManager from './permissions/app_upload_access_manager.js';
import PermissionManager from './permissions/permission_manager.js';


export default class App {
    constructor(productsService, userService) {
        this.productsService = productsService;
        this.userService = userService;
        this.currentUser = null;
        this.productsFields = null;
    }

    async initialize() {
        this.currentUser = await this.userService.getCurrentUser();
        this.productsFields = await this.productsService.getProductsFields();
        this.specificWeights = await this.productsService.getSpecificWeights();

        console.log('Current User:', this.currentUser);
        console.log('Products Fields:', this.productsFields);
        console.log('Specific Weights:', this.specificWeights);

        const filterButtonsContainer = document.querySelector(".product-buttons");
        const productsContainer = document.querySelector(".app-products-cards");
        
        const packed = new PackedParameters(this.specificWeights);
        const productsList = new ProductsList(productsContainer, this.productsFields, this.currentUser, packed);
        const filter = new Filter(filterButtonsContainer, this.productsService, productsList);

        filter.initialize();
    }
}
