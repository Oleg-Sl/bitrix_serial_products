import BaseView from '../viewbase.js';


export default class SofaView extends BaseView {
    render() {
        const fields = this.productService.getFieldMatching();
        for (const [fieldAlias, fieldNameBx24] of Object.entries(fields)) {
            const elem = document.querySelector(`#${fieldAlias}`);
            const fieldDaata = this.productService.getProductFieldData(fieldAlias);
            if (elem && fieldDaata) {
                if (fieldAlias === 'storageBox' && (!this.productService.getValue('sleepingMechanism') || this.productService.getValue('sleepingMechanism') == '1')) {
                    elem.disabled = true;
                }

                if (fieldAlias === 'depthOne' || fieldAlias === 'depthTwo' || fieldAlias === 'depthThree') {
                    this.depthField(elem);
                }
                let value = this.productService.getValue(fieldAlias);
                value = (value === null || value === undefined) ? '' : value;
                if (fieldAlias === 'shape') {
                    this.dependentOttomanSideByShapeId(value);
                }
                this.outputData(elem, value, fieldDaata);
            }
        }
    }

    dependentField(target) {
        if (target.dataset.field === 'sleepingMechanism') {
            // 3717 = Есть, 3719 = Нет, 4665 = -
            const elem = document.querySelector('#storageBox');
            if ((!target.value || target.value === '1')) {
                elem.disabled = true;
                elem.value = 4665;
                this.productService.updateProductData('storageBox', '4665');
            } else {
                elem.disabled = false;
            }
        }

        if (target.dataset.field === 'shape') {
            this.shapeField(target);
            this.dependentOttomanSideByShape(target);
        }
    }

    depthField(target) {
        const shape = document.querySelector('#shape').value;
        if (shape === '3705' || shape === '3707' || shape === '3709') {
            target.disabled = false;
        } else {
            target.disabled = true;
        }
    }

    shapeField(target) {
        if (target.value === '3705' || target.value === '3707' || target.value === '3709') {
            document.querySelector('#depthOne').disabled = false;
            document.querySelector('#depthTwo').disabled = false;
            document.querySelector('#depthThree').disabled = false;
        } else {
            document.querySelector('#depthOne').disabled = true;
            document.querySelector('#depthTwo').disabled = true;
            document.querySelector('#depthThree').disabled = true;
            document.querySelector('#depthOne').value = '';
            document.querySelector('#depthTwo').value = '';
            document.querySelector('#depthThree').value = '';
            this.productService.updateProductData('depthOne', '');
            this.productService.updateProductData('depthTwo', '');
            this.productService.updateProductData('depthThree', '');

        }
    }

    shapeField(target) {
        if (target.value === '3705' || target.value === '3707' || target.value === '3709') {
            document.querySelector('#depthOne').disabled = false;
            document.querySelector('#depthTwo').disabled = false;
            document.querySelector('#depthThree').disabled = false;
        } else {
            document.querySelector('#depthOne').disabled = true;
            document.querySelector('#depthTwo').disabled = true;
            document.querySelector('#depthThree').disabled = true;
            document.querySelector('#depthOne').value = '';
            document.querySelector('#depthTwo').value = '';
            document.querySelector('#depthThree').value = '';
            this.productService.updateProductData('depthOne', '');
            this.productService.updateProductData('depthTwo', '');
            this.productService.updateProductData('depthThree', '');

        }
    }

    dependentOttomanSideByShape(targetShape) {
        if (targetShape.value == '3705') {
            // С оттоманкой
            document.querySelector('#ottomanSide').disabled = false;
        } else {
            document.querySelector('#ottomanSide').disabled = true;
            document.querySelector('#ottomanSide').value = '4509';
            this.productService.updateProductData('ottomanSide', '4509');
        }
    }

    dependentOttomanSideByShapeId(shapeId) {
        if (shapeId == '3705') {
            // С оттоманкой
            document.querySelector('#ottomanSide').disabled = false;
        } else {
            document.querySelector('#ottomanSide').disabled = true;
            document.querySelector('#ottomanSide').value = '4509';
            this.productService.updateProductData('ottomanSide', '4509');
        }
    }
}
