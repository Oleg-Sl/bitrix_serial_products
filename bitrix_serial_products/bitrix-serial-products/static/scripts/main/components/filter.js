export default class Filter {
    constructor(filterButtonsContainer, productsService, productsList) {
        this.filterButtonsContainer = filterButtonsContainer;
        this.productsService = productsService;
        this.productsList = productsList;
        this.inputFilter = document.getElementById('inputFilter');
        this.productType = null;
        this.debounceTimeout = null;
    }

    async applyFilter() {
        let products = [];
        try {
            const params = {};
            if (this.inputFilter.value.length >= 3) {
                params.filter = `${this.inputFilter.value}%`;
            }
            products = await this.productsService.getFilterProducts(this.productType, params);
        } catch (error) {
            alert(`Ошибка получения списка продуктов: ${error.message}`);
        }

        this.productsList.displayProducts(products);
        if (BX24) {
            BX24.fitWindow();
        }
    }


    initialize() {
        this.filterButtonsContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const productType = event.target.getAttribute('data-type');
                if (this.productType && productType != this.productType) {
                    this.inputFilter.value = '';
                }
                this.productType = productType;
                this.applyFilter();
            }
        });
        this.inputFilter.addEventListener('input', (event) => {
            const target = event.target;
            if (this.productType && target.value.length >= 3) {
                this.debounce(() => this.applyFilter(), 300);
            }
        })
    }

    debounce(func, delay) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(func, delay);
    }
}
