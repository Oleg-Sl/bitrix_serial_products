import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalManagementView {
    constructor() {
        this.managementCostCell = document.querySelector('.management-cost');
    }

    render(managementCost) {
        this.managementCostCell.innerHTML = this.convertNumberWithSpaces(managementCost);
        this.managementCostCell.title = `${this.convertNumberWithSpaces(managementCost)} руб.`;

    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}