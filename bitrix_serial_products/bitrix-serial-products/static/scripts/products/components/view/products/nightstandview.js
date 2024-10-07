import BaseView from '../viewbase.js';


export default class NightstandView extends BaseView {
    render() {
        const fields = this.productService.getFieldMatching();
        for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
            const elem = document.querySelector(`#${fieldAlias}`);
            const fieldDaata = this.productService.getProductFieldData(fieldAlias);
            if (elem && fieldDaata) {
                switch (fieldAlias) {
                    case 'frameMaterial':
                        // this.handleMaterialChange(this.productService.getProductData('frameMaterial'), 'frameVeneer');
                        this.handleMaterialChange(this.productService.getValueText('frameMaterial'), 'frameVeneer');
                        break;
                    case 'topMaterial':
                        this.handleMaterialChange(this.productService.getValueText('topMaterial'), 'topVeneer');
                        // this.handleMaterialChange(this.productService.getProductData('topMaterial'), 'topVeneer');
                        break;
                    case 'facadeMaterial':
                        this.handleMaterialChange(this.productService.getValueText('facadeMaterial'), 'facadeVeneer');
                        // this.handleMaterialChange(this.productService.getProductData('facadeMaterial'), 'facadeVeneer');
                        break;
                }
                let value = this.productService.getValue(fieldAlias);
                value = (value === null || value === undefined) ? '' : value;
                this.outputData(elem, value, fieldDaata);
                this.lockFieldEdit(elem, fieldAlias);
            }
        }
    }

    handleMaterialChange(value, veneerFieldAlias) {
        const element = document.getElementById(veneerFieldAlias);
        if (!element) return;
    
        if (this.checkSubstringInString('шпон', value || '')) {
            element.disabled = false;
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
            case 'frameMaterial':
                this.setDependentField(target.dataset.field, 'frameVeneer', 'шпон');
                break;
            case 'topMaterial':
                this.setDependentField(target.dataset.field, 'topVeneer', 'шпон');
                break;
            case 'facadeMaterial':
                this.setDependentField(target.dataset.field, 'facadeVeneer', 'шпон');
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
