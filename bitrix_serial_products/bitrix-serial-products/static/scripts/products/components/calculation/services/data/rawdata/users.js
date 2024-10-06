
export default class UserService {
    constructor(users, currentUser) {
        this.users = users;
        this.currentUser = currentUser;
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
