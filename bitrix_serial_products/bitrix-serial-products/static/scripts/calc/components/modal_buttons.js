import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalButtonsView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.btnCalculate = document.querySelector('#btnCalculate');
        this.btnCreateCalculation = document.querySelector('#createCalculation');
        this.btnCopyCalculation = document.querySelector('#copyCalculation');
        this.btnSaveCalculation = document.querySelector('#saveCalculation');
        this.btnCloseCalculation = document.querySelector('#closeCalculation');

        this.initHanlers();
    }

    initHanlers() {
        this.btnCalculate.addEventListener('click', (event) => {
            const target = event.target;
            target.disabled = true;
            setTimeout(() => { target.disabled = false; }, 500);
            this.eventEmitter.emit('calculateFot', this.modal.dataset.calculationId);
        })

        this.btnCreateCalculation.addEventListener('click', (event) => {
            const target = event.target;
            target.disabled = true;
            setTimeout(() => { target.disabled = false; }, 2000);
            this.eventEmitter.emit('createCalculation', this.modal.dataset.calculationId);
        })

        this.btnCopyCalculation.addEventListener('click', (event) => {
            const target = event.target;
            target.disabled = true;
            setTimeout(() => { target.disabled = false; }, 2000);
            this.eventEmitter.emit('copyCalculation', this.modal.dataset.calculationId);
        })

        this.btnSaveCalculation.addEventListener('click', (event) => {
            const target = event.target;
            target.disabled = true;
            setTimeout(() => { target.disabled = false; }, 2000);
            this.eventEmitter.emit('saveCalculation', this.modal.dataset.calculationId);
        })

        this.btnCloseCalculation.addEventListener('click', (event) => {
            this.eventEmitter.emit('closeCalculation');
        })
    }

    render(isEditable, isNewCalculation) {
        // console.log(isEditable, isNewCalculation);
        if (!isEditable) {
            this.btnCreateCalculation.classList.add('d-none');
            this.btnCopyCalculation.classList.remove('d-none');
            this.btnSaveCalculation.classList.add('d-none');
            return;
        }
        if (isNewCalculation) {
            this.btnCreateCalculation.classList.remove('d-none');
            this.btnCopyCalculation.classList.add('d-none');
            this.btnSaveCalculation.classList.add('d-none');
        } else {
            this.btnCreateCalculation.classList.add('d-none');
            this.btnCopyCalculation.classList.add('d-none');
            this.btnSaveCalculation.classList.remove('d-none');
        }
    }
}
