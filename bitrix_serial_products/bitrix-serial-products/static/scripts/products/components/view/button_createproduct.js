

export default class ButtonCreateProductView {
    constructor(productService, userService, callbackService, callbackAddProductItem) {
        this.productService = productService;
        this.userService = userService;
        this.callbackService = callbackService;
        this.callbackAddProductItem = callbackAddProductItem;
        // this.buttonCreateProduct = document.getElementById('createProductItem');
    }

    init() {
        document.body.insertAdjacentHTML('beforeend', this.getModalHTML());

        this.modal = new bootstrap.Modal('#createProductModal', {});
        this.inputProductId = document.getElementById('inputProductId');

        this.initHandlers();
    }

    initHandlers() {
        document.getElementById('btnCreateProduct').addEventListener('click', async () => {
            const productId = this.inputProductId.value;
            if (this.callbackAddProductItem) {
                await this.callbackAddProductItem(productId);
            }
            this.modal.hide();
        })
    }

    getModalHTML() {
        return `
            <div class="modal fade" id="createProductModal" tabindex="-1" aria-labelledby="createProductModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createProductModalLabel">Создание товара</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div class="modal-body" >
                        <div class="mb-3">
                            <label for="inputProductId" class="col-form-label">ID овного товара:</label>
                            <input type="number" min="0" step="1" class="form-control" id="inputProductId">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary" id="btnCreateProduct">Создать</button>
                    </div>
                    </div>
                </div>
            </div>
        `;
    }
}
