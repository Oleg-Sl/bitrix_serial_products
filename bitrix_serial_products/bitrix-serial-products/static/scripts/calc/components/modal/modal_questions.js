import { formatDate, getCurrentDate, roundToTwoDecimals } from '../../common/utils.js';


export default class ModalQuestionsView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.btnCheckListComplexity = document.querySelector('#btnCheckListComplexity');
        this.containerQuestionsAnswer = this.modal.querySelector('.check-list-complexity-questions-answer');
        this.containerQuestionsStatement = this.modal.querySelector('.check-list-complexity-questions-statement');

        this.initHandlers();
    }

    initHandlers() {
        this.containerQuestionsAnswer.addEventListener('change', (event) => {
            const target = event.target;
            if (target.tagName === 'INPUT') {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    questionId: tr.dataset.id,
                    answer: target.dataset.answer ? true : false,
                };
                this.eventEmitter.emit("answerQuestion", data);
            }
        })
        this.containerQuestionsStatement.addEventListener('change', (event) => {
            const target = event.target;
            if (target.tagName === 'INPUT') {
                const tr = target.closest('tr');
                const data = {
                    calculationId: this.modal.dataset.calculationId,
                    questionId: tr.dataset.id,
                    answer: target.checked,
                };
                this.eventEmitter.emit("answerQuestion", data);
            }
        })
    }

    updateStateButton(checked) {
        if (checked) {
            this.btnCheckListComplexity.classList.add("btn-success");
            this.btnCheckListComplexity.classList.remove("btn-danger");
        } else {
            this.btnCheckListComplexity.classList.remove("btn-success");
            this.btnCheckListComplexity.classList.add("btn-danger");
        }
    }

    render(questions) {
        let contentAnswerHTML = '';
        let contentStatementHTML = '';

        for (const question of questions) {
            // console.log("question = ", question);
            if (!question.show) {
                continue;
            }
            if (question?.isQuestion) {
                contentAnswerHTML += this.getQuestionsAnswerHTML(question);
            } else {
                contentStatementHTML += this.getQuestionsStatementHTML(question);
            }
        }

        this.containerQuestionsAnswer.innerHTML = contentAnswerHTML;
        this.containerQuestionsStatement.innerHTML = contentStatementHTML;
    }

    getQuestionsAnswerHTML(question) {
        const checkedYes = (question.isAnswered && question.answer) ? 'checked' : '';
        const checkedNo = (question.isAnswered && !question.answer) ? 'checked' : '';

        return `
            <tr data-id="${question?.id}" class="form-check">
                <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="" title="${question?.description}">${question?.question}</div></td>
                <td class="fixed-rows justify-content-center" style="grid-column: 6 / 7;">
                    <div class="fixed-rows justify-content-center">
                        <div><input class="" type="radio" name="radioButtonsGroup1" id="" data-answer="true" ${checkedYes}></div>
                        &nbsp;ДА
                    </div>
                </td>
                <td class="fixed-rows justify-content-center" style="grid-column: 7 / 8;">
                    <div class="fixed-rows justify-content-center">
                        <div><input class="" type="radio" name="radioButtonsGroup1" id="" ${checkedNo}></div>
                        &nbsp;НЕТ
                    </div>
                </td>
            </tr>
        `;
    }

    getQuestionsStatementHTML(question) {
        const checked = question.answer ? 'checked' : '';
        return `
            <tr data-id="${question?.id}" class="form-check">
                <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="" title="${question?.description}">${question?.title}</div></td>
                <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;">
                    <div class="form-check form-switch justify-content-center">
                        <input class="form-check-input" type="checkbox" role="switch" ${checked}>
                    </div>
                </td>
            </tr>
        `;
    }
}