import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalRentView {
    constructor() {
        this.rentCostCell = document.querySelector('.rent-cost');
    }

    render(rentCost) {
        this.rentCostCell.value = rentCost;
    }
}