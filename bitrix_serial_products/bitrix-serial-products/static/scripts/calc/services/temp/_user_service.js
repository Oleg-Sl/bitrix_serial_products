
export default class UserService {
    constructor(dataService) {
        this.dataService = dataService;

        this.currentUser = this.dataService.getCurrentUser();
        this.users = this.dataService.getUsers();
    }

    getUser(id) {
        return this.users[id];
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserName(user) {
        return `${user?.LAST_NAME || ''} ${user?.NAME || ''} ${user?.SECOND_NAME || ''}`.trim();
    }

    getUserLink(user) {
        return `/company/personal/user/${user?.ID}/`;
    }


}
