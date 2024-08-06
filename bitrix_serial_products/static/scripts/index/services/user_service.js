export default class UserService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getCurrentUser() {
        return await this.apiClient.callMethodJS('user.current');
    }
}
