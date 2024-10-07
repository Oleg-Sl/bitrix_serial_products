import BaseView from '../viewbase.js';


export default class BedView extends BaseView {
    render() {
        const fields = this.productService.getFieldMatching();
        for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
            const elem = document.querySelector(`#${fieldAlias}`);
            const fieldDaata = this.productService.getProductFieldData(fieldAlias);
            if (elem && fieldDaata) {
                if (fieldAlias === 'hasStorageBox' || fieldAlias === 'system') {
                    this.displayFieldLiftingMechanism(fieldAlias);
                }
                let value = this.productService.getValue(fieldAlias);
                value = (value === null || value === undefined) ? '' : value;
                this.outputData(elem, value, fieldDaata);
            }
        }
    }

    dependentField(target) {
        if (target.dataset.field === 'liftingMechanism') {
            this.changeFieldLiftingMechanism(target);
        }
    }

    displayFieldLiftingMechanism(fieldAlias) {
        const liftingMechanism = this.productService.getValue('liftingMechanism');

        if (fieldAlias === 'hasStorageBox') {
            const elemHasStorageBox = document.querySelector('#hasStorageBox');
            if (liftingMechanism != "4071") {
                elemHasStorageBox.disabled = true;
                elemHasStorageBox.value = 4597;
                this.productService.updateProductData('hasStorageBox', 4597);
            }
        }
        
        if (fieldAlias === 'system') {
            const elemSystem = document.querySelector('#system');
            if (liftingMechanism != "4071") {
                elemSystem.disabled = true;
                elemSystem.value = 4085;
                this.productService.updateProductData('system', 4085);
            }
        }
    }

    changeFieldLiftingMechanism(elemLiftingMechanism) {
        const elemHasStorageBox = document.querySelector('#hasStorageBox');
        const elemSystem = document.querySelector('#system');
        // Механизм подъема: 4071 - "Да", 4073 - "Нет"
        // Наличие ящика для хранения: 4075 - "Есть", 4077 - "Нет", 4597 - "-"
        // Система: 4081 - "Салазки", 4083 - "Подъем дна", 4085 - "-"
        if (elemLiftingMechanism.value === '4071') {
            elemHasStorageBox.disabled = false;
            elemSystem.disabled = false;
        } else {
            elemHasStorageBox.disabled = true;
            elemSystem.disabled = true;
            elemHasStorageBox.value = 4597;
            elemSystem.value = 4085;
            this.productService.updateProductData('hasStorageBox', 4597);
            this.productService.updateProductData('system', 4085);
        }
    }
}
