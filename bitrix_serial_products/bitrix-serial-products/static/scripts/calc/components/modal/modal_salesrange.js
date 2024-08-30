import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalSalesRangeView {
    constructor() {
        this.table = document.querySelector('#calculationWindow .sell-range');;
        this.coefficientCells = this.table.querySelectorAll('.sell-range-coefficient');
        this.costCells = this.table.querySelectorAll('.sell-range-cost');
    }

    render(salesRange) {
        for (const i in salesRange) {
            this.coefficientCells[i].value = salesRange[i].coefficient;
            // this.costCells[i].innerHTML = roundToTwoDecimals(salesRange[i].price);
            this.costCells[i].innerHTML = this.convertNumberWithSpaces(salesRange[i].price);
            this.costCells[i].title = `${this.convertNumberWithSpaces(salesRange[i].price)} руб.`;
        }
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}
