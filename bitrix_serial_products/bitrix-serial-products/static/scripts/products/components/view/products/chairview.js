import BaseView from '../viewbase.js';


// export default class ChairView extends BaseView {
// }

// import { ViewMainBase } from '../common/view/main.js';


export default class ChairView extends BaseView {
    render() {
        const fields = this.productService.getFieldMatching();
        for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
            const elem = document.querySelector(`#${fieldAlias}`);
            const fieldDaata = this.productService.getProductFieldData(fieldAlias);
            if (elem && fieldDaata) {
                switch (fieldAlias) {
                    case 'backMaterial_2':
                        this.handleMaterialChange(this.productService.getValueText('backMaterial_2'), 'backVeneer_2');
                        break;
                    case 'seatMaterial_3':
                        this.handleMaterialChange(this.productService.getValueText('seatMaterial_3'), 'seatVeneer_3');
                        break;
                }
                // const value = this.productService.getProductData(fieldAlias) || '';
                let value = this.productService.getValue(fieldAlias);
                value = (value === null || value === undefined) ? '' : value;
                this.outputData(elem, value, fieldDaata);
            }
        }
    }

    handleMaterialChange(value, veneerFieldAlias) {
        const element = document.getElementById(veneerFieldAlias);
        if (!element) return;
    
        if (this.checkSubstringInString('шпон', value || "")) {
            element.disabled = false;
            element.value = '';
            this.productService.updateProductData(veneerFieldAlias, element.value);
        } else {
            element.disabled = true;
        }
    }

    checkSubstringInString(substring, string) {
        const lowerCaseSubstring = substring.toLowerCase();
        const lowerCaseString = string.toLowerCase();
        return lowerCaseString.includes(lowerCaseSubstring);
    }

    dependentField(target) {
        switch (target.dataset.field) {
            case 'backMaterial_2':
                this.setDependentField(target.dataset.field, 'backVeneer_2', 'шпон');
                break;
            case 'seatMaterial_3':
                this.setDependentField(target.dataset.field, 'seatVeneer_3', 'шпон');
                break;
        }
    }

    setDependentField(mainElemId, dependentElemId, substring) {
        const mainElem = document.getElementById(mainElemId);
        const dependentElem = document.getElementById(dependentElemId);
        const selectedOptionText = mainElem.options[mainElem.selectedIndex].text;
        if (this.checkSubstringInString(substring, selectedOptionText)) {
            dependentElem.disabled = false;
            dependentElem.value = '';
        } else {
            dependentElem.disabled = true;
            dependentElem.value = '-';
        }
        this.productService.updateProductData(dependentElemId, dependentElem.value);

    }
}