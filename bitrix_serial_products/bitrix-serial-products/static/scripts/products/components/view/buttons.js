
export default class ButtonsView {
    constructor(productService, userService, callbackService) {
        this.productService = productService;
        this.userService = userService;
        this.callbackService = callbackService;

        this.inputIsTechOk = document.getElementById('isTechOk');
        this.labelIsTechOk = this.inputIsTechOk.parentElement.querySelector('label');
        this.divDateOfTech = this.labelIsTechOk.querySelector('div');
    }

    init() {
        const isTechOk = this.productService.getValue('isTechOk');
        if (isTechOk === 'Y') {
            this.labelIsTechOk.classList.remove('btn-secondary');
            this.labelIsTechOk.classList.add('btn-outline-success');
        } else {
            this.labelIsTechOk.classList.remove('btn-outline-success');
            this.labelIsTechOk.classList.add('btn-secondary');
        }
        this.initHandlers();
    }

    initHandlers() {
        this.inputIsTechOk.addEventListener('change', this.changeStateIsActive.bind(this));
    }

    changeStateIsActive() {
        if (this.inputIsTechOk.checked) {
            this.productService.updateProductData('isTechOk', 'Y');
            this.productService.updateProductData('dateOfTech', new Date().toISOString());
            this.labelIsTechOk.classList.remove('btn-secondary');
            this.labelIsTechOk.classList.add('btn-outline-success');
        } else {
            this.productService.updateProductData('isTechOk', 'N');
            this.labelIsTechOk.classList.remove('btn-outline-success');
            this.labelIsTechOk.classList.add('btn-secondary');
        }
    }

    render() {
        let dateOfTech = this.productService.getValue('dateOfTech');
        let dateOfTechStr = '';
        if (dateOfTech) {
            dateOfTech = new Date(dateOfTech);
            dateOfTechStr = dateOfTech.toISOString().split('T')[0];
        }
        this.divDateOfTech.innerText = dateOfTechStr;
    }
};
