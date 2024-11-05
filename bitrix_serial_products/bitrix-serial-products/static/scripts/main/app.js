import Filter from './components/filter.js';
import ProductsList from './components/products.js';
import PackedParameters from './services/packed.js';
import ProductAction from './components/product_action.js';


export default class App {
    constructor(apiClient, productsService, userService) {
        this.apiClient = apiClient;
        this.productsService = productsService;
        this.userService = userService;

        this.currentUser = null;
        this.productsFields = null;
    }

    async initialize() {
        this.currentUser = await this.userService.getCurrentUser();
        this.productsFields = await this.productsService.getProductsFields();
        this.specificWeights = await this.productsService.getSpecificWeights();

        const filterButtonsContainer = document.querySelector(".product-buttons");
        const productsContainer = document.querySelector(".app-products-cards");

        const packed = new PackedParameters(this.specificWeights);
        const productsList = new ProductsList(productsContainer, this.productsFields, this.currentUser, packed);
        const filter = new Filter(filterButtonsContainer, this.productsService, productsList);
        const productAction = new ProductAction(this.apiClient, this.productsService);

        filter.initialize();
        productAction.initialize();
    }
}
