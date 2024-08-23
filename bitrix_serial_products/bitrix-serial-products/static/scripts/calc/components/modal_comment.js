import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';

export default class ModalCommentView {
    constructor() {
        this.commentCell = document.querySelector('.general-comment');
    }

    render(comment) {
        this.commentCell.value = comment;
    }
}
