

export class ReadModalView {
    constructor() {
        this.modal = document.querySelector('#calculationWindow');;
        this.btnSave = this.modal.querySelector('#saveCalculation');
        this.btnCopy = this.modal.querySelector('#copyCalculation');
        this.bntClose = this.modal.querySelector('#closeCalculation');
        this.container = this.modal.querySelector('.materials-list tbody');
        this.tfoot = this.modal.querySelector('.summary-materials-data tbody');
    }

    async openReadModal(calculationData, isLockedCreateCalc) {
        this.btnSave.classList.add('d-none');
        this.btnCopy.classList.remove('d-none');
        this.btnCopy.dataset.id = calculationData.id;
        this.render(calculationData);
        this.modal.classList.remove('d-none');
        if (isLockedCreateCalc) {
            this.btnCopy.disabled = true;
        }
    }

    closeModal() {
        this.modal.classList.add('d-none');
    }

    render(calculationData) {
        console.log("calculationData = ", calculationData);
        this.modal.querySelector('.date-price-validity').innerHTML = this.formatDate(calculationData?.dateOfCalculation?.value);
        this.container.innerHTML = this.getMaterialsHTML(calculationData.materials)
        this.tfoot.innerHTML = `
            <tr data-id="${calculationData.id}">
                <td class="d-flex justify-content-center fixed-rows-bottom" style="grid-column: 1 / span 3;"><div class="">Материалы ИТОГО</div></td>
                <td class="fixed-rows-bottom"><input type="number" class="summary-materials-cost updated-field bg-body-secondary" value="${this.roundToTwoDecimals(calculationData?.totalMaterials?.value)}" disabled  data-field="${calculationData?.totalMaterials?.field || ''}"></td>
                <td class="fixed-rows-bottom"><input type="text" class="bg-body-secondary" min="0" value="" disabled></td>
            </tr>
            <tr data-id="${calculationData.id}">
                <td class="fixed-rows-bottom" placeholder="">Работа</td>
                <td class="fixed-rows-bottom"><input type="number" class="bg-body-secondary" min="0" value="" disabled></td>
                <td class="fixed-rows-bottom"><input type="number" class="bg-body-secondary" min="0" value="" disabled></td>
                <td class="fixed-rows-bottom"><input type="number" class="cost-work updated-field" min="0" value="${this.roundToTwoDecimals(calculationData?.work?.amount?.value)}" disabled data-field="${calculationData?.work?.amount?.field || ''}"></td>
                <td class="fixed-rows-bottom"><input type="text" class="comment-work updated-field" min="0" value="${calculationData?.work?.comments?.value || ''}" disabled data-field="${calculationData?.work?.comments?.field || ''}"></td>
            </tr>
            <tr data-id="${calculationData.id}">
                <td class="fixed-rows-bottom" placeholder="">Работа подрядчиков</td>
                <td class="fixed-rows-bottom"><input type="number" class="bg-body-secondary" min="0" value="" disabled></td>
                <td class="fixed-rows-bottom"><input type="number" class="bg-body-secondary" min="0" value="" disabled></td>
                <td class="fixed-rows-bottom"><input type="number" class="cost-subcontractor-work updated-field" min="0" value="${this.roundToTwoDecimals(calculationData?.subcontractorWork?.amount?.value)}" disabled data-field="${calculationData?.subcontractorWork?.amount?.field || ''}"></td>
                <td class="fixed-rows-bottom"><input type="text" class="comment-subcontractor-work updated-field" min="0" value="${calculationData?.subcontractorWork?.comments?.value || ''}" disabled data-field="${calculationData?.subcontractorWork?.comments?.field || ''}"></td>
            </tr>
            <tr data-id="${calculationData.id}">
                <td class="fixed-rows-bottom" placeholder="">Постоянные затраты</td>
                <td class="fixed-rows-bottom"><input type="number" class="bg-body-secondary" min="0" value="" disabled></td>
                <td class="fixed-rows-bottom"><input type="number" class="bg-body-secondary" min="0" value="" disabled></td>
                <td class="fixed-rows-bottom"><input type="number" class="cost-constant-expenses updated-field bg-body-secondary" min="0" data-coefficient="${calculationData?.constantExpenses?.coefficient || 0}" value="${this.roundToTwoDecimals(calculationData?.constantExpenses?.value)}" disabled data-field="${calculationData?.constantExpenses?.field || ''}"></td>
                <td class="fixed-rows-bottom"><input type="text" class="bg-body-secondary" min="0" value="" disabled></td>
            </tr>
            <tr data-id="${calculationData.id}">
                <td class="d-flex justify-content-center fixed-rows-bottom" style="grid-column: 1 / span 3;"><div class="text-center">Себестоимость</div></td>
                <td class="fixed-rows-bottom"><input type="number" class="summary-price updated-field bg-body-secondary" value="${this.roundToTwoDecimals(calculationData?.cost?.value || 0)}" disabled  data-field="${calculationData?.cost?.field || ''}"></td>
                <td class="fixed-rows-bottom"><input type="text" class="bg-body-secondary" min="0" value="" disabled></td>
            </tr>
            <tr data-id="${calculationData.id}">
                <td class="fixed-rows-bottom"><div>Комментарий</div></td>
                <td class="comment fixed-rows-bottom"><textarea class="common-comment updated-field" name="" id="" rows="2" disabled data-field="${calculationData.generalComment?.field || ''}">${calculationData.generalComment?.value || ''}</textarea></td>
            </tr>
            <tr data-id="${calculationData.id}">
                <td class="d-flex justify-content-center fixed-rows-bottom" style="grid-column: 1 / span 5;"><input type="text" class="calculation-fixed updated-field text-center" min="0" value="${calculationData.calculationFixed?.value || ''}" disabled data-field="${calculationData.calculationFixed?.field || ''}"></td>
            </tr>
        `;
    }

    getMaterialsHTML(materials) {
        let contentHTML = '';
        for (const material of materials) {
            // console.log("material = ", material);
            // const coefficient = material?.coefficient || 1;
            if (material?.price?.isFixed) {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="material-price  bg-body-secondary" min="0" value="${material?.price?.value}" disabled></td>
                        <td><input type="number" class="material-value updated-field" min="0" value="${material?.value?.value}" disabled data-field="${material?.value?.field}" data-coefficient="${material?.coefficient || 1}"></td>
                        <td><input type="number" class="material-amount updated-field bg-body-secondary" min="0" value="${this.roundToTwoDecimals(material?.amount?.value)}" disabled data-field="${material?.amount?.field}"></td>
                        <td><input type="text" class="material-comment updated-field" min="0" value="${material?.comments?.value}" disabled data-field="${material?.comments?.field}"></td>
                    </tr>
                `;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="material-price updated-field" min="0" value="${material?.price?.value}" disabled data-field="${material?.price?.field}"></td>
                        <td><input type="number" class="material-value updated-field" min="0" value="${material?.value?.value}" disabled data-field="${material?.value?.field}" data-coefficient="${material?.coefficient || 1}"></td>
                        <td><input type="number" class="material-amount updated-field bg-body-secondary" min="0" value="${this.roundToTwoDecimals(material?.amount?.value)}" disabled data-field="${material?.amount?.field}"></td>
                        <td><input type="text" class="material-comment updated-field" min="0" value="${material?.comments?.value}" disabled data-field="${material?.comments?.field}"></td>
                    </tr>
                `;
            }
        }

        return contentHTML;
    }

    formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        if (isNaN(dateObj.getTime())) {
            return "";
        }

        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}.${month}.${year}`;
    }

    getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    roundToTwoDecimals(number) {
        return Math.round(number * 100) / 100;
    }

    

}
