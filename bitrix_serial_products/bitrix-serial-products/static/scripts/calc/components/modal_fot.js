import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalFotView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.table = this.modal.querySelector('.fot');
        this.container = this.table.querySelector('.table-fot-list-body');
        this.summaryCell = this.table.querySelector('.fot-summary-cost');

        this.initHanlers();
    }

    initHanlers() {
        this.container.addEventListener('change', (event) => {
            const target = event.target;
            if (target.classList.contains('fot-estimate') || target.classList.contains('fot-coefficient')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    code: tr.dataset.code,
                    field: target.dataset.field,
                    value: target.value,
                };
                this.eventEmitter.emit("changeFotPrice", data);
            } else if (target.classList.contains('fot-comment')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    code: tr.dataset.code,
                    value: target.value,
                };
                this.eventEmitter.emit("changeFotComment", data);
            }
        })
    }

    render(fotList, summaryCost, isEdit = false) {
        this.setSummary(summaryCost);
        const contentHTML = fotList.map(fot => this.getMaterialsHTML(fot, isEdit)).join('');
        this.container.innerHTML = contentHTML;
    }

    getMaterialsHTML(fot, isEdit) {
        const classInputEdit = isEdit ? '' : 'disabled';
        return `
            <tr data-code="${fot.code}">
                <td placeholder="">${fot.title || '-'}</td>
                <td><input type="number" class="border-0 fot-estimate" min="0" value="${fot.estimate || 0}" data-field="estimate" ${classInputEdit}></td>
                <td><input type="number" class="border-0 fot-coefficient" min="0" step="0.5" value="${fot.coefficient || 0}" data-field="coefficient" ${classInputEdit}></td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${fot.total || 0}" disabled></td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${fot.checksum || 0}" disabled></td>
                <td style="grid-column: 6 / 8;"><input type="text" class="border-0 fot-comment" min="0" value="${fot.comment || ""}" ${classInputEdit}></td>
            </tr>
        `;
    }

    setSummary(cost) {
        this.summaryCell.value = cost;
    }
}
