import { getFilterFields } from "../../configs/utils.js";

export default class Filter {
    constructor(filterButtonsContainer, productsService, productsList, filterFields = []) {
        this.filterButtonsContainer = filterButtonsContainer;
        this.productsService = productsService;
        this.productsList = productsList;
        this.filterFields = filterFields;

        // this.inputFilter = document.getElementById('inputFilter');
        this.container = document.getElementById('filterContainer');
        this.btnFilter = document.getElementById('btnFilter');
        this.productType = null;
        this.debounceTimeout = null;
    }

    async applyFilter(page = 1) {
        let products = [];
        let economies = [];
        try {
            const params = this.getFilterParams();
            // if (this.inputFilter.value.length >= 3) {
            //     params.filter = `%${this.inputFilter.value}%`;
            // }
            this.productsList.displaySpinner();
            products = await this.productsService.getFilterProducts(this.productType, params, page);
            economies = await this.productsService.getDataEconomies(products);
        } catch (error) {
            alert(`Ошибка получения списка продуктов: ${error.message}`);
        }

        this.productsList.displayProducts(products, economies);
        if (BX24) {
            BX24.fitWindow();
        }
    }

    initialize() {
        this.filterButtonsContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const productType = event.target.getAttribute('data-type-id');
                // if (this.productType && productType != this.productType) {
                //     this.inputFilter.value = '';
                // }
                this.productType = productType;
                this.render();
                this.applyFilter();
            }
        });
        this.btnFilter.addEventListener('click', (event) => this.applyFilter());
        // this.inputFilter.addEventListener('input', (event) => {
        //     const target = event.target;
        //     if (this.productType && target.value.length >= 3) {
        //         this.debounce(() => this.applyFilter(), 300);
        //     }
        // })
    }

    debounce(func, delay) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(func, delay);
    }

    render() {
        let contentHTML = '';
        const filterFields = getFilterFields(this.productType);
        for (const field of filterFields) {
            const fieldAlias = field.alias;
            const fieldTitle = field.title;
            const fieldData = this.productsList.getFieldData(this.productType, fieldAlias);
            if (fieldData.type === 'enumeration') {
                contentHTML += this.getSelectHTML(fieldAlias, fieldTitle, fieldData.items);
            } else if (fieldData.type === 'boolean') {
                contentHTML += this.getSelectHTML(fieldAlias, fieldTitle, [{ ID: 1, VALUE: 'Да' }, { ID: 0, VALUE: 'Нет' }]);
            } else if (fieldData.type === 'string') {
                contentHTML += this.getInputHTML(fieldAlias, fieldTitle);
            }
        }
        this.container.innerHTML = contentHTML;
    }

    getSelectHTML(fieldAlias, title, options) {
        let optionsHTML = '';
        for (const option of options) {
            optionsHTML += `<option value="${option.ID}">${option.VALUE}</option>`;
        }
        return `
            <div class="col d-flex flex-nowrap input-group me-1">
                <span class="input-group-text" id="">${title}</span>
                <select id="${fieldAlias}" class="form-select form-select-sm p-0" aria-label="">
                    <option value=""></option>
                    ${optionsHTML}
                </select>
            </div>
        `;
    }

    getInputHTML(fieldAlias, title, placeholder = '') {
        return `
            <div class="col d-flex flex-nowrap input-group me-1">
                <span class="input-group-text" id="">${title}</span>
                <input type="text" id="${fieldAlias}" class="form-control form-control-sm" placeholder="${placeholder}" aria-label="" aria-describedby="">
            </div>
        `;
    }

    getFilterParams() {
        let params = {};
        const filterFields = getFilterFields(this.productType);
        for (const field of filterFields) {
            const fieldAlias = field.alias;
            const elem = document.getElementById(fieldAlias);
            if (!elem || !elem.value) {
                continue;
            }
            if (elem.tagName === 'SELECT') {
                params[fieldAlias] = elem.value;
            } else if (elem.tagName === 'INPUT') {
                params[fieldAlias] = `%25${elem.value}%25`;
            }
        }
        return params;
    }
}
