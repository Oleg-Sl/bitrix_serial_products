
export default class CalculationAccessManager {
    constructor(apiClient) {
        this.apiClient = apiClient;

        this.key = 'USERS_CALCULATION_ACCESS';
        this.chosenUsers = null;
    }

    async init() {
        this.chosenUsers = await this.getChosenUsers();
    }

    async getChosenUsers() {
        const userStr = await this.apiClient.getSettingsApp(this.key) || '';
        console.log("userStr = ", userStr);
        return userStr.split(',');
    }

    isAccess(userId) {
        return this.chosenUsers.includes(String(userId));
    }
};
