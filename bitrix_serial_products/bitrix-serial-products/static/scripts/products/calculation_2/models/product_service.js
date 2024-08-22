
export class ProductService {
    constructor(productManager) {
        this.productManager = productManager;
    }

    getProductData(key) {
        return this.productManager.getProductData(key);
    }

    updateProduct(data) {
        return this.productManager.updateProduct(data);
    }
}
