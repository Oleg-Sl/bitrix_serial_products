import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalCommentView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.commentCell = this.modal.querySelector('.general-comment');
        this.initHanlers();
    }

    initHanlers() {
        this.commentCell.addEventListener('change', (event) => {
            const target = event.target;
            const data = {
                calculationId: this.modal.dataset.calculationId,
                value: target.value,
            };
            this.eventEmitter.emit("changeGeneralComment", data);
        })
    }

    render(comment, isEdit = false) {
        this.commentCell.value = comment;
        this.commentCell.disabled = !isEdit;
    }
}
