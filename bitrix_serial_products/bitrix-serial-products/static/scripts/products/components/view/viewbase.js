// import ButtonsView from './buttons.js';
import ButtonComdirokView from './button_comdirok.js';
import ButtonTechokView from './button_techok.js';
import ButtonCreateProductView from './button_createproduct.js';
import LinksView from './links.js';


export default class BaseView {
    constructor(productService, userService, callbackService, callbackAddProductItem) {
        this.productService = productService;
        this.userService = userService;
        this.callbackService = callbackService;
        
        // this.buttonView = new ButtonsView(productService, userService, callbackService);
        this.buttonTechokView = new ButtonTechokView(productService, userService, callbackService);
        this.buttonComdirokView = new ButtonComdirokView(productService, userService, callbackService);
        this.buttonCreateProductView = new ButtonCreateProductView(productService, userService, callbackService, callbackAddProductItem);
        this.linksView = new LinksView(productService, userService)
    }

    initialize() {
        console.log("INIT BaseView");
        this.initHandlers();
        this.blockFields();
        this.buttonTechokView.init();
        this.buttonComdirokView.init();
        this.buttonCreateProductView.init();

        // this.linksView.render();
    }

    blockFields() {
        const productVariationIds = this.productService.getValue('productVariationIds');
        if (productVariationIds && productVariationIds.length > 0) {
            document.getElementById('btnOpenCreateProductModal').disabled = true;
        }
        // const fields = this.productService.getFieldMatching();
        // for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
        //     const elem = document.querySelector(`#${fieldAlias}`);
        //     if (elem) {
        //         elem.disabled = true;
        //     }
        // }
    }

    render() {
        const fields = this.productService.getFieldMatching();
        for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
            const elem = document.querySelector(`#${fieldAlias}`);
            const fieldData = this.productService.getProductFieldData(fieldAlias);
            if (elem && fieldData) {
                let value = this.productService.getValue(fieldAlias);
                value = (value === null || value === undefined) ? '' : value;
                this.outputData(elem, value, fieldData);
            }
        }
        this.buttonTechokView.render();
        this.buttonComdirokView.render();
    }

    outputData(elem, value, fieldData) {
        if (!elem) {
            return;
        }

        switch (fieldData.type) {
            case 'enumeration':
                elem.innerHTML = this.getOptionsSelectHTML(fieldData.items);
                this.checkOption(elem, value);
                break;
            case 'string':
            case 'double':
            case 'integer':
            case 'url':
                elem.value = value;
                break;
            case 'date':
            case 'datetime':
                elem.value = this.formatDate(value);
                break;
            case 'boolean':
                elem.checked = (value == 'Y');
                break;
            default:
                break;
        }
    }

    getOptionsSelectHTML(items) {
        let contentHTML = '<option value=""></option>';
        for (const item of items) {
            contentHTML += `<option value="${item.ID}">${item.VALUE}</option>`;
        }
        return contentHTML;
    }

    checkOption(elem, value) {
        const options = elem.querySelectorAll('option');
        for (const option of options) {
            if (option.value == value) {
                option.selected = true;
                break;
            }
        }
    }

    formatDate(inputDateString) {
        const dateObject = new Date(inputDateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const outputString = `${year}-${month}-${day}`;
        return outputString;
    }

    initHandlers() {
        const buttonsSetDefaultValues = document.querySelectorAll('.btn-set-default-values');
        buttonsSetDefaultValues.forEach((elem) => {
            elem.addEventListener('click', (event) => {
                const container = event.target.parentElement.parentElement;
                const fields = this.productService.getFieldMatching();
                // console.log("fields = ", fields);
                for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
                    const elem = container.querySelector(`#${fieldAlias}`);
                    if (elem) {
                        this.handlerSetDefaultValue(elem, fieldAlias);
                    }
                }
            })
        })
        document.addEventListener('change', (event) => {
            const target = event.target;
            if (target.dataset.track && target.dataset.field) {
                const fieldAlias = target.dataset.field;
                const value = this.getValueFromTarget(target, fieldAlias);
                console.log('FFF = ', fieldAlias, value);
                this.productService.updateProductData(fieldAlias, value);
                this.dependentField(target);
            }
        })

        const smpElem = document.querySelector('#smp');
        if (smpElem) {
            smpElem.addEventListener('keyup', (event) => {
                const target = event.target;
                if (target.dataset.track && target.dataset.field) {
                    const fieldAlias = target.dataset.field;
                    const value = this.getValueFromTarget(target, fieldAlias);
                    this.productService.updateProductData(fieldAlias, value);
                    this.dependentField(target);
                }
            })
        };
    }

    getValueFromTarget(target, fieldAlias = null) {
        let value = target.value;
        // if (fieldAlias === 'sketch') {
        //     value = this.dataManager.getSketchId(target.checked);
        // } else
        if (target.type === 'checkbox') {
            value = target.checked ? 'Y' : 'N';
        }
        return value;
    }

    dependentField(target) {
    }

    handlerSetDefaultValue(elem, fieldAlias) {
        const fieldData = this.productService.getProductFieldData(fieldAlias);
        // console.log(fieldAlias, fieldData, elem);
        let value = null;
        switch (fieldData.type) {
            case 'string':
                value = elem.tagName == 'INPUT' && elem.type == 'number' ? 0 : '-';
                break;
            case 'enumeration':
                value = this.getFieldIdByValue(fieldData.items, '-');
                break;
            case 'double':
            case 'integer':
                value = 0;
                break;
            case 'crm':
                if (fieldAlias.startsWith('upholsteryFabricCollection')) {
                    value = 1;
                }
                break;
            default:
                break;
        }

        elem.value = value;
        // console.log(">>> ", fieldAlias, value);
        this.productService.updateProductData(fieldAlias, value);
        this.dependentField(elem);
    }

    getFieldIdByValue(items, value) {
        return items?.find(item => item.VALUE == value)?.ID;
    }
};
