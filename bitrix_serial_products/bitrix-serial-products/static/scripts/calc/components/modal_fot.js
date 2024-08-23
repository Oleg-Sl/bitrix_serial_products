import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalFotView {
    constructor() {
        this.table = document.querySelector('#calculationWindow .fot');;
        this.container = this.table.querySelector('.table-fot-list-body');
        this.summaryCell = this.table.querySelector('.fot-summary-cost');
    }

    render(fotList, summaryCost) {
        this.setSummary(summaryCost);
        const contentHTML = fotList.map(fot => this.getMaterialsHTML(fot)).join('');
        this.container.innerHTML = contentHTML;
    }

    getMaterialsHTML(fot) {
        return `
            <tr>
                <td placeholder="">${fot.title || '-'}</td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${fot.estimate || 0}" disabled></td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${fot.coefficient || 0}" data-field="0" disabled data-coefficient="0"></td>
                <td><input type="number" class="border-0 " min="0" value="${fot.total || 0}" data-field="0"></td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${fot.checksum || 0}" disabled data-field="0"></td>
                <td style="grid-column: 6 / 8;"><input type="text" class="border-0" min="0" value="${fot.comment || ""}" data-field="0"></td>
            </tr>
        `;
    }

    setSummary(cost) {
        this.summaryCell.value = cost;
    }
}
