import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalQuestionsView {
    constructor() {
        this.modal = document.querySelector('#calculationWindow');
        this.containerQuestionsAnswer = this.modal.querySelector('.check-list-complexity-questions-answer');
        this.containerQuestionsStatement = this.modal.querySelector('.check-list-complexity-questions-statement');
    }

    render(questions) {
        let contentAnswerHTML = '';
        let contentStatementHTML = '';

        for (const question of questions) {
            // console.log("question = ", question);
            if (question?.showInQuestions) {
                contentAnswerHTML += this.getQuestionsAnswerHTML(question);
            } else {
                contentStatementHTML += this.getQuestionsStatementHTML(question);
            }
        }
        
        this.containerQuestionsAnswer.innerHTML = contentAnswerHTML;
        this.containerQuestionsStatement.innerHTML = contentStatementHTML;
    }

    getQuestionsAnswerHTML(question) {
        return `
            <tr data-id="" class="form-check">
                <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="" title="${question?.description}">${question?.question}</div></td>
                <td class="fixed-rows justify-content-center" style="grid-column: 6 / 7;"><input class="" type="radio" name="radioButtonsGroup1" id="">ДА</td>
                <td class="fixed-rows justify-content-center" style="grid-column: 7 / 8;"><input class="" type="radio" name="radioButtonsGroup1" id="">НЕТ</td>
            </tr>
        `;
    }

    getQuestionsStatementHTML(question) {
        return `
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
}