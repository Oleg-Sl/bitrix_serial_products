
export default class Loader {
    constructor(loaderElement, elemApp) {
        this.loaderElement = loaderElement;
        this.elemApp = elemApp;
    }

    show() {
        this.loaderElement.classList.remove("d-none");
        this.elemApp.classList.add("d-none");
    }

    hide() {
        this.loaderElement.classList.add("d-none");
        this.elemApp.classList.remove("d-none");
    }
}
