

export default class ViewHeader {
    constructor(productServer, userService, callbackService) {
        this.productServer = productServer;
        this.userService = userService;
        this.callbackService = callbackService;

        this.productData = this.productServer.getProductData();
        this.productFields = this.productServer.getProductFields();
        this.createdUser = this.userService.getCreatedUser();
        this.updatedUser = this.userService.getUpdatedUser();

        this.elemLeadNumber = document.querySelector(`#leadNumber`);
        this.elemLeadTitle = document.querySelector(`#leadTitle`);
        this.elemCreatedBy = document.querySelector(`#createdBy`);
        this.elemUpdatedBy = document.querySelector(`#updatedBy`);
        this.elemCreatedTime = document.querySelector(`#createdTime`);
        this.elemUpdatedTime = document.querySelector(`#updatedTime`);
    }

    render() {
        this.productServer.getValue('createdTime');
        this.productServer.getValue('updatedTime');
        this.elemCreatedBy.value = this.userService.getUserName(this.createdUser);
        this.elemUpdatedBy.value = this.userService.getUserName(this.updatedUser);
        this.elemCreatedBy.dataset.link = this.userService.getUserLink(this.createdUser);
        this.elemUpdatedBy.dataset.link = this.userService.getUserLink(this.updatedUser);
        this.elemCreatedTime.value = this.formatDate(this.productServer.getValue('createdTime'));
        this.elemUpdatedTime.value = this.formatDate(this.productServer.getValue('updatedTime'));

        this.initHandlers();
    }

    initHandlers() {
        this.elemCreatedBy.addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.callbackService.openPath(link);
            }
        });
        this.elemUpdatedBy.addEventListener('click', (event) => {
            const target = event.target;
            const link = target.dataset.link;
            if (link) {
                this.callbackService.openPath(link);
            }
        });
    }

    formatDate(inputDateString) {
        const dateObject = new Date(inputDateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const outputString = `${year}-${month}-${day}`;
        return outputString;
    }
}
