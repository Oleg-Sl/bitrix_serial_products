
export default class ProductAction {
    constructor(apiClient, productsService) {
        this.apiClient = apiClient;
        this.productsService = productsService;

        this.addProductButtonsContainer = document.getElementById('addProductContainer');
        this.productCardsContainer = document.getElementById('productCardsContainer');
    }

    initialize() {
        // создание нового изделия
        this.addProductButtonsContainer.addEventListener('click', async (event) => {
            if (event.target.tagName === 'A') {
                const productType = event.target.getAttribute('data-type');
                // console.log('productType = ', productType);
                // const { title, smartId, field } = getProductConfig(productType);
                // const productId = 1;
                const response = await this.productsService.createProduct(productType);
                const productData = response?.result?.products?.item;
                console.log('createProductData = ', productData);
                await this.productsService.openProductCard(productData?.entityTypeId, productData?.id, productData?.title);
                // await this.apiClient.openProductCard(smartId, productData?.id, productData?.title);
            }
        });

        // редактирование изделия
        this.productCardsContainer.addEventListener('dblclick', async (event) => {
            const target = event.target.closest('[data-id]');
            const header = event.target.closest('.product-card-header');

            if (target && !header) {
                const productId = target.dataset.id;
                const smartTypeId = target.dataset.smartTypeId;
                await this.productsService.openProductCard(smartTypeId, productId, smartTypeId);
                // await this.apiClient.openProductCard(smartTypeId, productId, smartTypeId);
            }
        });

        // 
        this.productCardsContainer.addEventListener('click', this.updateProduct.bind(this));
    }

    async updateProduct(event) {
        const target = event.target;
        if (!target.classList.contains('product-card-header-update')) {
            return;
        }
        const card = event.target.closest('[data-id]');
        if (!card) {
            return;
        }
        const productId = card.dataset.id;
        const productTypeId = card.dataset.smartTypeId;
        console.log(`Update product: type_id=${productTypeId}, id = ${productId}`);

        const result = await this.productsService.runRecaculateCombinationBP(productTypeId, productId);
        console.log('Result of launching a business process: ', result);
    }
}
