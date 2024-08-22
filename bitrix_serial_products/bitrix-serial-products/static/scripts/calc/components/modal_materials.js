import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalMaterialsView {
    constructor() {
        this.table = document.querySelector('#calculationWindow .table-materials-list');;
        this.containerMaterialsRows = this.table.querySelector('.table-materials-list-body');
        this.summaryMaterialsCell = this.table.querySelector('.material-summary-cost');
    }


    render(materials) {
        this.containerMaterialsRows.innerHTML = this.getMaterialsHTML(materials)
    }

    getMaterialsHTML(materials) {
        let contentHTML = '';
        for (const material of materials) {
            if (material?.price?.isFixed) {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="border-0 material-price bg-body-secondary" min="0" value="${material?.price?.value}" disabled></td>
                        <td><input type="number" class="border-0 material-value updated-field" min="0" value="${material?.value?.value}" data-field="${material?.value?.field}" data-coefficient="${material?.coefficient || 1}"></td>
                        <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="${roundToTwoDecimals(material?.amount?.value)}" disabled data-field="${material?.amount?.field}"></td>
                        <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="${material?.comments?.value}" data-field="${material?.comments?.field}"></td>
                    </tr>
                `;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="border-0 material-price updated-field" min="0" value="${material?.price?.value}" data-field="${material?.price?.field}"></td>
                        <td><input type="number" class="border-0 material-value updated-field" min="0" value="${material?.value?.value}" data-field="${material?.value?.field}" data-coefficient="${material?.coefficient || 1}"></td>
                        <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="${roundToTwoDecimals(material?.amount?.value)}" disabled data-field="${material?.amount?.field}"></td>
                        <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="${material?.comments?.value}" data-field="${material?.comments?.field}"></td>
                    </tr>
                `;
            }
        }

        return contentHTML;
    }
}