
export default class CallbackService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    openPath(link) {
        console.log("link = ", link);
        // this.apiClient.openPath(link);
    }
}
