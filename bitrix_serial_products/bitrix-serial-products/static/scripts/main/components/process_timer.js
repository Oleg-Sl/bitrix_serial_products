
class ProcessTime {
    constructor() {
        this.initModal();

        this.timeoutUpdateMessage = 1000;
        this.modalProcessTimer = null;
        this.processTimer = null;
        this.message = null;
        this.timer = null;
    }

    process(message, timeSeconds = 5) {
        this.displayMessage(message);
        this.setTimer(timeSeconds);
    }

    async setTimer(timeSeconds) {
        // const timerPromise = new Promise(function(resolve, reject) {
        //       setTimeout(() => resolve("done"), timeSeconds);
        // });
        this.displayTimer(`Осталось ${timeSeconds} секунд`);
        const intervalPromise = new Promise(function(resolve, reject) {
            const intervalMessage = setInterval(function() {
                timeSeconds -= 1;
                this.displayTimer(`Осталось ${timeSeconds} секунд`);
                if (timeSeconds <= 0) {
                    clearInterval(intervalMessage);
                    resolve();
                }
            }, this.timeoutUpdateMessage);
        });

        await intervalPromise;
        this.hideModal();
    }

    displayMessage(message) {
        this.message.innerHTML = message;
    }

    displayTimer(timerMessage) {
        this.timer.innerHTML = timerMessage;
    }

    hideModal() {
        this.modalProcessTimer.hide();
    }

    initModal() {
        const modalHTML = this.getModalHTML();
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.processTimer = document.querySelector('#modalProcessTimer');
        this.message = this.processTimer.querySelector('.message');
        this.timer = this.processTimer.querySelector('.timer');
        this.modalProcessTimer = new bootstrap.Modal(processTimer, {});

    }

    getModalHTML() {
        return `
            <div class="modal fade" id="modalProcessTimer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Заголовок модального окна</h1>
                    </div>
                    <div class="modal-body">
                        <div class="message"></div>
                        <div class="timer"></div>
                    </div>
                </div>
            </div>
        `;
    }
}