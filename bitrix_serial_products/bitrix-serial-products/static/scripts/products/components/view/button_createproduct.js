

export default class ButtonCreateProductView {
    constructor(productService, userService, callbackService, callbackProductItem) {
        this.productService = productService;
        this.userService = userService;
        this.callbackService = callbackService;
        this.callbackProductItem = callbackProductItem;
        // this.buttonCreateProduct = document.getElementById('createProductItem');
        this.btnOpenCreateProductModal = document.getElementById('btnOpenCreateProductModal');
        this.btnUpdateProductIems = document.getElementById('btnUpdateProductIems');
        this.spinnerBtnUpdateProductIems = this.btnUpdateProductIems.querySelector('div');
    }

    init() {
        if (this.isBlock()) {
            this.btnOpenCreateProductModal.disabled = true;
            this.btnUpdateProductIems.disabled = false;
            // this.btnOpenCreateProductModal.title = 'Вариации уже созданы';
            this.initUpdateProductHandler();
            return;
        } else {
            this.btnOpenCreateProductModal.disabled = false;
            this.btnUpdateProductIems.disabled = true;
            document.body.insertAdjacentHTML('beforeend', this.getModalHTML());
            this.modal = new bootstrap.Modal('#createProductModal', {});
            this.inputProductId = document.getElementById('inputProductId');
            this.inputProductDetailText = document.getElementById('inputProductDetailText');
            this.initCreateProductHandler();
        }
    }

    initUpdateProductHandler() {
        this.btnUpdateProductIems.addEventListener('click', async () => {
            this.btnUpdateProductIems.disabled = true;
            this.spinnerBtnUpdateProductIems.classList.remove('d-none');
            const result = await this.callbackProductItem(1);
            this.btnUpdateProductIems.disabled = false;
            this.spinnerBtnUpdateProductIems.classList.add('d-none');
        })
    }

    initCreateProductHandler() {
        document.getElementById('btnCreateProduct').addEventListener('click', async () => {
            const productId = this.inputProductId.value;
            const detailText = this.inputProductDetailText.value;
            console.log({
                productId: productId,
                detailText: detailText,
                callbackProductItem: this.callbackProductItem,

            });
            if (this.callbackProductItem) {
                this.showSpinner();
                const result = await this.callbackProductItem(0, productId, detailText);
                if (result) {
                    this.btnOpenCreateProductModal.disabled = true;
                    this.btnUpdateProductIems.disabled = false;
                    // this.btnOpenCreateProductModal.title = 'Вариации уже созданы';
                } else {
                    // alert('Произошла ошибка при создании товара');
                }
                this.hideSpinner();
            }
            this.modal.hide();
        })
    }

    isBlock() {
        const productVariationIds = this.productService.getValue('productVariationIds');
        if (productVariationIds && productVariationIds.length > 0) {
            return true;
        }
        return false;
    }

    showSpinner() {
        document.getElementById('btnCreateProduct').classList.add('disabled');
        document.querySelector('.spinner').classList.remove('d-none');
    }

    hideSpinner() {
        document.getElementById('btnCreateProduct').classList.remove('disabled');
        document.querySelector('.spinner').classList.add('d-none');
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
                        <div class="mb-3">
                            <label for="inputProductDetailText" class="col-form-label">Детальное описание товара:</label>
                            <textarea class="form-control" id="inputProductDetailText" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" class="btn btn-primary" id="btnCreateProduct">
                            <span class="spinner spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                            Создать
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        `;
    }
}
