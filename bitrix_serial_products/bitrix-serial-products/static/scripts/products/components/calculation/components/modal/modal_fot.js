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
            this.btnFot.classList.add("text-success");
            this.btnFot.classList.remove("text-danger");
        } else {
            this.btnFot.classList.remove("text-success");
            this.btnFot.classList.add("text-danger");
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
        const descCellChecksum = this.getDescOfValidatingCalcualation(fot.checksum, fot.basicSalary);

        return `
            <tr data-code="${fot.code}">
                <td>${fot.title || '-'}</td>
                <td><input type="number" class="border-0 fot-estimate" min="0" value="${fot.estimate}" data-field="estimate" ${classInputEdit}></td>
                <td><input type="number" class="border-0 fot-estimate-hour" min="0" value="${fot.allocatedHours}" data-field="allocatedHours" disabled></td>
                <td><input type="number" class="border-0 fot-coefficient" step="0.5" value="${fot.coefficient || 0}" data-field="coefficient" ${classInputEdit}></td>
                <td class="text-end bg-body-secondary px-1">${this.convertNumberWithSpaces(Math.ceil(fot.total))}</td>
                <td class="text-end ${colorCellChecksum} px-1"  title="${this.getDescOfValidatingCalcualation(fot.basicSalary)}">${this.convertNumberWithSpaces(fot.checksum)}</td>
                <td style="grid-column: 7 / 9;"><input type="text" class="border-0 text-start fot-comment" min="0" value="${fot.comment || ""}" ${classInputEdit}></td>
            </tr>
        `;
    }

    setSummary(cost) {
        this.summaryCell.innerHTML = this.convertNumberWithSpaces(cost);
    }

    convertNumberWithSpaces(n) {
        return n.toLocaleString('ru');
    }

    getColorOfValidatingCalcualation(forecastSalary, basicSalary) {
        if (forecastSalary === 0) {
            return 'bg-body-secondary';
        }
        if (forecastSalary <= 0.95 * basicSalary) {
            return 'bg-danger';
        } else if (forecastSalary >= 1.05 * basicSalary) {
            return 'bg-warning';
        }
        return 'bg-body-secondary';
    }

    getDescOfValidatingCalcualation(basicSalary) {
        return `
Базовая: ${this.convertNumberWithSpaces(basicSalary)} руб.
Цветовое обозначение:
&bull; КРАСНЫЙ - ниже 95% от базоавой ЗП
&bull; ЖЕЛТЫЙ - выше 105% от базоавой ЗП
        `;
    }
}
