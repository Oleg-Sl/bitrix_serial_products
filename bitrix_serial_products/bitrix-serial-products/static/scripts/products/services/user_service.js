
export default class UserService {
    constructor(dataService) {
        this.dataService = dataService;

        this.currentUser = this.dataService.getCurrentUser();
        this.updatedUser = this.dataService.getUpdatedUser();
        this.createdUser = this.dataService.getCreatedUser();
    }

    getCurrentUser() {
        return this.currentUser || {};
    }

    getUpdatedUser() {
        return this.updatedUser || {};
    }

    getCreatedUser() {
        return this.createdUser || {};
    }

    getUserName(user) {
        return `${user?.LAST_NAME || ''} ${user?.NAME || ''} ${user?.SECOND_NAME || ''}`.trim();
    }

    getUserLink(user) {
        return `/company/personal/user/${user?.ID}/`;
    }
}
