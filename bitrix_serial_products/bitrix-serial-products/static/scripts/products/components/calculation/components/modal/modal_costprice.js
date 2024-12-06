import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalCostPriceView {
    constructor() {
        this.costPriceMatAndFot = document.getElementById('costPriceMatAndFot');
        this.costPriceCeh = document.getElementById('costPriceCeh');
        this.costPriceTotal = document.getElementById('costPriceTotal');
    }

    render(costPriceMatAndFot, costPriceCeh, costPriceTotal) {
        this.costPriceMatAndFot.innerHTML = this.convertNumberWithSpaces(costPriceMatAndFot || 0);
        this.costPriceMatAndFot.title = `${this.convertNumberWithSpaces(costPriceMatAndFot || 0)} руб.`;

        this.costPriceCeh.innerHTML = costPriceCeh;

        this.costPriceTotal.innerHTML = this.convertNumberWithSpaces(costPriceTotal || 0);
        this.costPriceTotal.title = `${this.convertNumberWithSpaces(costPriceTotal || 0)} руб.`;
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}
