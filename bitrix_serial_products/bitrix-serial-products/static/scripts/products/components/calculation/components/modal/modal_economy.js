import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalEconomyView {
    constructor(eventEmitter, accessManager, currentUserId) {
        this.eventEmitter = eventEmitter;
        this.accessManager = accessManager;
        this.currentUserId = currentUserId;

        this.modal = document.querySelector('#calculationWindow');
        this.btnCollapse = document.querySelector('#btnEconomy');
        this.table = this.modal.querySelector('.economy');
        this.container = this.table.querySelector('.table-economy-list-body');
        this.summaryCell = this.table.querySelector('.economy-summary-cost');

        this.initHanlers();
    }

    initHanlers() {
        this.container.addEventListener('change', (event) => {
            const target = event.target;
            if (target.classList.contains('economy-margin')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    code: tr.dataset.code,
                    field: target.dataset.field,
                    value: target.value,
                };
                this.eventEmitter.emit("changeEconomyMargin", data);
            }
        })
    }

    setActivateInputs(isActiveInputs, isActivateButton) {
        const isCanEdit = this.accessManager.isAccess(this.currentUserId);

        // this.container.querySelectorAll('.fot-estimate-hour').forEach(item => item.disabled = !isActiveInputs || !isCanEdit);
        // this.container.querySelectorAll('.fot-coefficient').forEach(item => item.disabled = !isActiveInputs || !isCanEdit);
        // this.container.querySelectorAll('.fot-comment').forEach(item => item.disabled = !isActiveInputs || !isCanEdit);
        if (isActivateButton) {
            this.btnCollapse.classList.add("text-success");
            this.btnCollapse.classList.remove("text-danger");
        } else {
            this.btnCollapse.classList.remove("text-success");
            this.btnCollapse.classList.add("text-danger");
        }
    }

    render(economyList, summaryCost = 0, isEdit = false) {
        // this.setSummary(summaryCost);
        console.log("economyList = ", economyList);
        const contentHTML = economyList.map(economy => this.getMaterialsHTML(economy, isEdit)).join('');
        this.container.innerHTML = contentHTML;
    }

    getMaterialsHTML(economy, isEdit) {
        const isCanEdit = this.accessManager.isAccess(this.currentUserId);
        // console.log("isCanEdit = ", isCanEdit, isEdit);
        const classInputEdit = isEdit && isCanEdit ? '' : 'disabled';
        // console.log("classInputEdit = ", classInputEdit);
        // const colorCellChecksum = this.getColorOfValidatingCalcualation(economy.checksum, economy.basicSalary);
        // const descCellChecksum = this.getDescOfValidatingCalcualation(economy.checksum, economy.basicSalary);

        return `
            <tr data-code="${economy.code}">
                <td><input type="text" class="border-0 economy-fabric-category text-start" value="${economy.fabricCategory || '-'}" data-field="fabricCategory" disabled></td>
                <td class="text-end px-1">${this.convertNumberWithSpaces(economy.fabricPrice)}</td>
                <td class="text-end px-1">${this.convertNumberWithSpaces(economy.fabricSummary)}</td>
                <td class="text-end px-1">${this.convertNumberWithSpaces(economy.totalCost)}</td>
                <td><input type="number" class="border-0 economy-margin" min="0" step="0.01" value="${economy.margin || 0}" data-field="margin"></td>
                <td class="text-end px-1">${this.convertNumberWithSpaces(economy.price)}</td>
            </tr>
        `;
    }

    setSummary(cost) {
        this.summaryCell.innerHTML = this.convertNumberWithSpaces(cost);
    }

    convertNumberWithSpaces(n) {
        n = n || 0;
        return parseInt(n).toLocaleString('ru');
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
