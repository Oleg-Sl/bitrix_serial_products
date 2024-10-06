import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalManagementView {
    constructor() {
        this.managementCostCell = document.querySelector('.management-cost');
        this.managementTotalCell = document.querySelector('.management-total');
    }

    render(managementCost) {
        this.managementTotalCell.innerHTML = this.convertNumberWithSpaces(managementCost);
        this.managementTotalCell.title = `${this.convertNumberWithSpaces(managementCost)} руб.`;
        this.managementCostCell.value = Math.ceil(managementCost);
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}