export default class Filter {
    constructor(filterButtonsContainer, productsService, productsList) {
        this.filterButtonsContainer = filterButtonsContainer;
        this.productsService = productsService;
        this.productsList = productsList;
    }

    async applyFilter(productType) {
        let products = [];
        try {
            products = await this.productsService.getProducts(productType);
        } catch (error) {
            // console.error('Error getting products: ', error);
            alert(`Ошибка получения списка продуктов: ${error.message}`);
        }

        this.productsList.displayProducts(products);
    }

    initialize() {
        this.filterButtonsContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const productType = event.target.getAttribute('data-type');
                this.applyFilter(productType);
            }
        });
    }
}
