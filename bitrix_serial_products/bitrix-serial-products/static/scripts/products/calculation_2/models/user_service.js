
export class UserService {
    constructor(users) {
        this.users = users;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}
