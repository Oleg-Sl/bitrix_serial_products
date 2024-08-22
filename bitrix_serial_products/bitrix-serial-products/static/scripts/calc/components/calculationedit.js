
export default class EditCalculationView {
    constructor() {
        this.modal = document.querySelector('#calculationWindow');;
        this.btnSave = this.modal.querySelector('#saveCalculation');
        this.btnCopy = this.modal.querySelector('#copyCalculation');
        this.btnClose = this.modal.querySelector('#closeCalculation');

        this.containerMaterials = this.modal.querySelector('.calculation-data');
        this.container = this.modal.querySelector('.materials-list tbody');
        this.tfoot = this.modal.querySelector('.summary-materials-data tbody');

        this.containerQuestionsAnswer = this.modal.querySelector('.check-list-complexity-questions-answer');
        this.containerQuestionsStatement = this.modal.querySelector('.check-list-complexity-questions-statement');
    }

    async openModal(calculate) {
        this.btnSave.classList.remove('d-none');
        this.btnCopy.classList.add('d-none');
        this.render(calculate);
        this.modal.classList.remove('d-none');
    }

    closeModal() {
        this.modal.classList.add('d-none');
    }

    render(calculationData) {
        this.modal.querySelector('.date-price-validity').innerHTML = this.formatDate(calculationData?.dateOfCalculation?.value);
        this.container.innerHTML = this.getMaterialsHTML(calculationData.materials)
        // this.getQuestionsHTML(calculationData.checklistcomplexity)
    }

    retnderQuestions(questions) {
        let contentHTML = '';
        for (const question of questions.filter(question => question?.showInQuestions)) {
            contentHTML += `
                <tr data-id="" class="form-check">
                    <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="" title="${question?.description}">${question?.title}</div></td>
                    <td class="fixed-rows justify-content-center" style="grid-column: 6 / 7;"><input class="" type="radio" name="radioButtonsGroup1" id=""></td>
                    <td class="fixed-rows justify-content-center" style="grid-column: 7 / 8;"><input class="" type="radio" name="radioButtonsGroup1" id=""></td>
                </tr>
            `;
        }

        this.containerQuestionsAnswer.innerHTML = contentHTML;
        contentHTML = '';
        for (const question of questions.filter(question => !question?.showInQuestions)) {
            contentHTML += `
                <tr data-id="" class="form-check">
                    <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="" title="${question?.description}">${question?.title}</div></td>
                    <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;">
                        <div class="form-check form-switch justify-content-center">
                            <input class="form-check-input" type="checkbox" role="switch" id="" checked>
                        </div>
                    </td>
                </tr>
            `;
        }
        this.containerQuestionsStatement.innerHTML = contentHTML;
    }

    getMaterialsHTML(materials) {
        let contentHTML = '';
        for (const material of materials) {
            // console.log('material = ', material);
            if (material?.price?.isFixed) {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="border-0 material-price bg-body-secondary" min="0" value="${material?.price?.value}" disabled></td>
                        <td><input type="number" class="border-0 material-value updated-field" min="0" value="${material?.value?.value}" data-field="${material?.value?.field}" data-coefficient="${material?.coefficient || 1}"></td>
                        <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="${this.roundToTwoDecimals(material?.amount?.value)}" disabled data-field="${material?.amount?.field}"></td>
                        <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="${material?.comments?.value}" data-field="${material?.comments?.field}"></td>
                    </tr>
                `;
            } else {
                contentHTML += `
                    <tr>
                        <td placeholder="">${material?.title}</td>
                        <td><input type="number" class="border-0 material-price updated-field" min="0" value="${material?.price?.value}" data-field="${material?.price?.field}"></td>
                        <td><input type="number" class="border-0 material-value updated-field" min="0" value="${material?.value?.value}" data-field="${material?.value?.field}" data-coefficient="${material?.coefficient || 1}"></td>
                        <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="${this.roundToTwoDecimals(material?.amount?.value)}" disabled data-field="${material?.amount?.field}"></td>
                        <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="${material?.comments?.value}" data-field="${material?.comments?.field}"></td>
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
        number = number || 0;
        return Math.round(number * 100) / 100;
    }
}