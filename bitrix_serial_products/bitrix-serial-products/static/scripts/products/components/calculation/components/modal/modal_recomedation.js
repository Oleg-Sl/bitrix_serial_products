
export default class ModalRecomedationRopView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.modal = document.querySelector('#calculationWindow');
        this.cell = this.modal.querySelector('.recomendation-rop-text');
        this.initHanlers();
    }

    initHanlers() {
        this.cell.addEventListener('change', (event) => {
            const target = event.target;
            const data = {
                calculationId: this.modal.dataset.calculationId,
                value: target.value,
            };
            this.eventEmitter.emit("changeRecomedationROP", data);
        });
    }

    render(value, isEdit = false) {
        this.cell.value = value;
        this.cell.disabled = !isEdit;
    }
}
