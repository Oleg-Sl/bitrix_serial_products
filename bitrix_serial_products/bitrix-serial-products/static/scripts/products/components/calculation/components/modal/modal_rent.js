import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalRentView {
    constructor() {
        this.rentCostCell = document.querySelector('.rent-cost');
        this.rentTotalCell = document.querySelector('.rent-total');
    }

    render(rentCost) {
        this.rentTotalCell.innerHTML = this.convertNumberWithSpaces(rentCost);
        this.rentTotalCell.title = `${this.convertNumberWithSpaces(rentCost)} руб.`;
        this.rentCostCell.value = Math.ceil(rentCost);
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}