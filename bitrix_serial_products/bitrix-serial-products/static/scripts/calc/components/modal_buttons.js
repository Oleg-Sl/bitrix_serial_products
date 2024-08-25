import { formatDate, getCurrentDate, roundToTwoDecimals } from '../common/utils.js';


export default class ModalButtonsView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.btnCalculate = document.querySelector('#btnCalculate');
        this.btnCopyCalculation = document.querySelector('#copyCalculation');
        this.btnSaveCalculation = document.querySelector('#saveCalculation');
        this.btnCloseCalculation = document.querySelector('#closeCalculation');

        this.initHanlers();
    }

    initHanlers() {
        this.btnCalculate.addEventListener('click', (event) => {
            const data = {
                calculationId: this.modal.dataset.calculationId,
            };
            this.eventEmitter.emit('calculateFot', data);
        })
        this.btnCloseCalculation.addEventListener('click', (event) => {
            this.eventEmitter.emit('closedCalcualation');
        })
        this.btnSaveCalculation.addEventListener('click', (event) => {

            this.eventEmitter.emit('saveCalcualation', this.modal.dataset.calculationId);
        })
    }
}
