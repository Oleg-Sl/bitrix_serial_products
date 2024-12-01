
export default class ButtonBaseView {
    constructor(productService, userService, callbackService, elemId, elemDateId) {
        this.productService = productService;
        this.userService = userService;
        this.callbackService = callbackService;
        this.elemId = elemId;
        this.elemDateId = elemDateId;

        this.inputElem = document.getElementById(elemId);
        this.labelElem = this.inputElem.parentElement.querySelector('label');
        this.elemDate = this.labelElem.querySelector('div');
    }

    init() {
        const isTechOk = this.productService.getValue(this.elemId);
        if (isTechOk === 'Y') {
            this.labelElem.classList.remove('btn-secondary');
            this.labelElem.classList.add('btn-outline-success');
        } else {
            this.labelElem.classList.remove('btn-outline-success');
            this.labelElem.classList.add('btn-secondary');
        }
        this.initHandlers();
    }

    initHandlers() {
        this.inputElem.addEventListener('change', this.changeStateIsActive.bind(this));
    }

    changeStateIsActive() {
        if (this.inputElem.checked) {
            this.productService.updateProductData(this.elemId, 'Y');
            this.productService.updateProductData(this.elemDateId, new Date().toISOString());
            this.labelElem.classList.remove('btn-secondary');
            this.labelElem.classList.add('btn-outline-success');
        } else {
            this.productService.updateProductData(this.elemId, 'N');
            this.labelElem.classList.remove('btn-outline-success');
            this.labelElem.classList.add('btn-secondary');
        }
    }

    render() {
        let dateOfTech = this.productService.getValue(this.elemDateId);
        // console.log(this.elemDateId, ' = ', dateOfTech);
        let dateOfTechStr = '';
        if (dateOfTech) {
            dateOfTech = new Date(dateOfTech);
            dateOfTechStr = dateOfTech.toISOString().split('T')[0];
        }
        this.elemDate.innerText = dateOfTechStr;
    }
};
