import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalServicePackedView {
    constructor() {
        this.servicePackedCostCell = document.querySelector('.service-packed-cost');
        this.servicePackedTotalCell = document.querySelector('.service-packed-total');
    }

    render(servicePackedCost) {
        this.servicePackedTotalCell.innerHTML = this.convertNumberWithSpaces(servicePackedCost);
        this.servicePackedTotalCell.title = `${this.convertNumberWithSpaces(servicePackedCost)} руб.`;
        this.servicePackedCostCell.value = Math.ceil(servicePackedCost);
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}