
export class BaseAccessManager {
    constructor(bx24, keyStorage) {
        this.bx24 = bx24;
        this.key = keyStorage;
        this.chosenUsers = null;
    }

    async initialize() {
        this.chosenUsers = await this.getChosenUsers();
    }

    async getChosenUsers() {
        const userStr = await this.bx24.getSettingsApp(this.key) || '';
        return userStr.split(',');
    }

    isAccess(userId) {
        if (!this.chosenUsers) {
            return false;
        }
        console.log("chosenUsers = ", this.chosenUsers);
        console.log("userId = ", userId);
        return this.chosenUsers.includes(String(userId));
    }
};
