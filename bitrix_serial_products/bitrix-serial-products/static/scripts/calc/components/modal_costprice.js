import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';

export default class ModalCostPriceView {
    constructor() {
        this.costPriceCell = document.querySelector('.cost-price');
    }

    render(costPrice) {
        this.costPriceCell.value = costPrice;
    }
}
