
export default class ProcessTime {
    timeoutUpdateData = 1000;

    constructor() {
        this.modalProcessTimer = null;
        this.processTimer = null;
        this.title = null;
        this.timer = null;

        this.initModal();
    }

    process(title, timeSeconds = 5) {
        this.displayTitle(title);
        this.setTimer(timeSeconds);
    }

    async setTimer(timeSeconds) {
        this.displayTimer(`Осталось ${timeSeconds} секунд`);
        this.showModal();
        const intervalPromise = new Promise((resolve, reject) => {
            const intervalUpdateData = setInterval(() => {
                timeSeconds -= 1;
                this.displayTimer(`Осталось ${timeSeconds} секунд`);
                if (timeSeconds <= 0) {
                    clearInterval(intervalUpdateData);
                    resolve();
                }
            }, this.timeoutUpdateData);
        });

        await intervalPromise;
        this.hideModal();
    }

    displayTitle(title) {
        this.title.innerHTML = title;
    }

    displayTimer(timerTitle) {
        this.timer.innerHTML = timerTitle;
    }

    showModal() {
        this.modalProcessTimer.show();
    }

    hideModal() {
        this.modalProcessTimer.hide();
    }

    initModal() {
        const modalHTML = this.getModalHTML();

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.processTimer = document.querySelector('#modalProcessTimer');
        this.title = this.processTimer.querySelector('.title');
        this.timer = this.processTimer.querySelector('.timer');
 
        this.modalProcessTimer = new bootstrap.Modal(this.processTimer, {});
    }

    getModalHTML() {
        return `
            <div class="modal fade" id="modalProcessTimer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="title fs-5" id="staticBackdropLabel">Заголовок модального окна</h1>
                    </div>
                    <div class="modal-body">
                        <div class="timer"></div>
                    </div>
                </div>
            </div>
        `;
    }
}
