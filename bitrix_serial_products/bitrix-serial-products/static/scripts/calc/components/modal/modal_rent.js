import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalRentView {
    constructor() {
        this.rentCostCell = document.querySelector('.rent-cost');
    }

    render(rentCost) {
        this.rentCostCell.innerHTML = this.convertNumberWithSpaces(rentCost);
        this.rentCostCell.title = `${this.convertNumberWithSpaces(rentCost)} руб.`;
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}