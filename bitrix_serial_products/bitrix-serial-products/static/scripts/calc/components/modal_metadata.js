import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';

export default class ModalMetadataView {
    constructor() {
        this.modal = document.querySelector('#calculationWindow');
        this.elemDateOfCalculation = this.modal.querySelector('.date-price-validity');
        
    }

    render(calculationId, dateOfCalculation) {
        this.modal.dataset.calculationId = calculationId;
        this.elemDateOfCalculation.innerHTML = this.formatDate(dateOfCalculation);
    }
    
    show() {
        this.modal.classList.remove('d-none');
    }

    hide() {
        this.modal.classList.add('d-none');
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
}
