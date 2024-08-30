import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';

export default class ModalCostPriceView {
    constructor() {
        this.costPriceCell = document.querySelector('.cost-price');
    }

    render(costPrice) {
        this.costPriceCell.innerHTML = this.convertNumberWithSpaces(costPrice);
        this.costPriceCell.title = `${this.convertNumberWithSpaces(costPrice)} руб.`;
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}
