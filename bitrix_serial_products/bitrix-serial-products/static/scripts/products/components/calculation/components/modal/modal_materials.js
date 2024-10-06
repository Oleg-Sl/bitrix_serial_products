import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';
import Calculation from '../../services/calculation.js';


export default class ModalMaterialsView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');;
        this.table = this.modal.querySelector('.table-materials-list');;
        this.containerMaterialsRows = this.table.querySelector('.table-materials-list-body');
        this.summaryMaterialsCell = this.table.querySelector('.material-summary-cost');
        this.initHanlers();
    }

    initHanlers() {
        this.containerMaterialsRows.addEventListener('change', (event) => {
            const target = event.target;
            if (target.classList.contains('material-price') || target.classList.contains('material-value')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    material: tr.dataset.material,
                    field: target.dataset.field,
                    value: target.value,
                };
                this.eventEmitter.emit("changeMaterialPrice", data);
            } else if (target.classList.contains('material-comment')) {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    material: tr.dataset.material,
                    value: target.value,
                };
                this.eventEmitter.emit("changeMaterialComment", data);
            }
        })
    }

    render(materials, materialPacked, summaryMaterials, isEdit = false) {
        this.setSummaryCost(summaryMaterials);
        let contentHTML = this.getMaterialsHTML(materials, isEdit);
        contentHTML += this.getPackedHTML(materialPacked);
        this.containerMaterialsRows.innerHTML = contentHTML;
    }

    getMaterialsHTML(materials, isEdit) {
        let contentHTML = '';
        const classInputEdit = isEdit ? '' : 'disabled';
        // console.log('MATERIALS = ', materials);
        for (const material of materials) {
            if (material?.price?.isFixed) {
                contentHTML += `
                    <tr data-material="${material.code}">
                        <td style="grid-column: 1 / span 2;" title="${material?.title}">${material?.title}</td>
                        <td><input type="number" class="border-0 material-price bg-body-secondary" min="0" value="${material?.price?.value}" disabled></td>
                        <td><input type="number" class="border-0 material-value" min="0" value="${material?.value?.value}" data-field="value" ${classInputEdit}></td>
                        <td class="bg-body-secondary text-end px-1 material-amount">${this.convertNumberWithSpaces(material?.amount?.value)}</td>
                        <td style="grid-column: 6 / span 9;"><input type="text" class="border-0 text-start material-comment" min="0" value="${material?.comments?.value}" data-field="comments" ${classInputEdit}></td>
                    </tr>
                `;
            } else {
                contentHTML += `
                    <tr data-material="${material.code}">
                        <td style="grid-column: 1 / span 2;" title="${material?.title}">${material?.title}</td>
                        <td><input type="number" class="border-0 material-price" min="0" value="${material?.price?.value}" data-field="price" ${classInputEdit}></td>
                        <td><input type="number" class="border-0 material-value" min="0" value="${material?.value?.value}" data-field="value" data-coefficient="${material?.coefficient || 1}" ${classInputEdit}></td>
                        <td class="bg-body-secondary text-end px-1 material-amount">${this.convertNumberWithSpaces(material?.amount?.value)}</td>
                        <td style="grid-column: 6 / span 9;"><input type="text" class="border-0 text-start material-comment" min="0" value="${material?.comments?.value}" data-field="comments" ${classInputEdit}></td>
                    </tr>
                `;
            }
        }

        return contentHTML;
    }

    getPackedHTML(materialPacked, isEdit) {
        // console.log("materialPacked = ", materialPacked);
        return `
            <tr data-material="packed">
                <td style="grid-column: 1 / span 2;">Упаковка</td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${materialPacked?.price}" disabled></td>
                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="${Math.round(materialPacked?.value * 100) / 100 }" disabled></td>
                <td class="bg-body-secondary text-end px-1">${this.convertNumberWithSpaces(materialPacked?.amount)}</td>
                <td style="grid-column: 6 / span 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
            </tr>
        `;
    }

    setSummaryCost(summaryMaterials) {
        this.summaryMaterialsCell.value = summaryMaterials;
    }

    convertNumberWithSpaces(n) {
        return Math.ceil(n).toLocaleString('ru');
    }
}