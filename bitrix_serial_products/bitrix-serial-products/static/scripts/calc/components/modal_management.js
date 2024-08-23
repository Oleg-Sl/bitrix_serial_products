import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalManagementView {
    constructor() {
        this.managementCostCell = document.querySelector('.management-cost');
    }

    render(managementCost) {
        this.managementCostCell.value = managementCost;
    }
}