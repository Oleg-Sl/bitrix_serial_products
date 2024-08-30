import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalFotView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.btnFot = document.querySelector('#btnFot');
        this.table = this.modal.querySelector('.fot');
        this.container = this.table.querySelector('.table-fot-list-body');
        this.summaryCell = this.table.querySelector('.fot-summary-cost');

        this.initHanlers();
    }

    initHanlers() {
        this.container.addEventListener('change', (event) => {
            const target = event.target;
            if (target.classList.contains('fot-estimate')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    code: tr.dataset.code,
                    field: target.dataset.field,
                    value: target.value,
                };
                this.eventEmitter.emit("changeFotEstimate", data);
            } else if (target.classList.contains('fot-coefficient')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    code: tr.dataset.code,
                    field: target.dataset.field,
                    value: target.value,
                };
                this.eventEmitter.emit("changeFotCoefficient", data);
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

    setActivateInputs(isActiveInputs, isActivateButton) {
        this.container.querySelectorAll('.fot-estimate').forEach(item => item.disabled = !isActiveInputs);
        this.container.querySelectorAll('.fot-coefficient').forEach(item => item.disabled = !isActiveInputs);
        this.container.querySelectorAll('.fot-comment').forEach(item => item.disabled = !isActiveInputs);
        if (isActivateButton) {
            this.btnFot.classList.add("btn-success");
            this.btnFot.classList.remove("btn-danger");
        } else {
            this.btnFot.classList.remove("btn-success");
            this.btnFot.classList.add("btn-danger");
        }
    }

    render(fotList, summaryCost, isEdit = false) {
        this.setSummary(summaryCost);
        const contentHTML = fotList.map(fot => this.getMaterialsHTML(fot, isEdit)).join('');
        this.container.innerHTML = contentHTML;
    }

    getMaterialsHTML(fot, isEdit) {
        const classInputEdit = isEdit ? '' : 'disabled';
        const colorCellChecksum = this.getColorOfValidatingCalcualation(fot.checksum, fot.basicSalary);
        return `
            <tr data-code="${fot.code}">
                <td placeholder="">${fot.title || '-'}</td>
                <td><input type="number" class="border-0 fot-estimate" min="0" value="${fot.estimate || 0}" data-field="estimate" ${classInputEdit}></td>
                <td><input type="number" class="border-0 fot-coefficient" min="0" step="0.5" value="${fot.coefficient || 0}" data-field="coefficient" ${classInputEdit}></td>
                <td class="text-end bg-body-secondary px-1">${this.convertNumberWithSpaces(fot.total)}</td>
                <td class="text-end ${colorCellChecksum} px-1"  title="Базовая: ${this.convertNumberWithSpaces(fot.basicSalary)} руб.">${this.convertNumberWithSpaces(fot.checksum)}</td>
                <td style="grid-column: 6 / 8;"><input type="text" class="border-0 fot-comment" min="0" value="${fot.comment || ""}" ${classInputEdit}></td>
            </tr>
        `;
        // <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${fot.total || 0}" disabled></td>
        // <td><input type="number" class="border-0 ${colorCellChecksum}" min="0" value="${fot.checksum || 0}" disabled title="Базовая: ${this.convertNumberWithSpaces(fot.basicSalary)} руб."></td>
    }

    setSummary(cost) {
        this.summaryCell.value = cost;
    }

    convertNumberWithSpaces(n) {
        return n.toLocaleString('ru');
    }

    getColorOfValidatingCalcualation(forecastSalary, basicSalary) {
        if (forecastSalary < 0.95 * basicSalary) {
            return 'bg-danger';
        } else if (forecastSalary > 1.05 * basicSalary) {
            return 'bg-warning';
        }
        return 'bg-body-secondary';
    }
}
