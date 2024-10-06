
import ApiClient from '../../utils/api_client.js';
import BedApp from '../apps/products/bed.js';
import { main } from '../main.js';


document.addEventListener("DOMContentLoaded", async function() {
    BX24.init(async function(){
        const apiClient = new ApiClient();
        await apiClient.init();
        main(apiClient, BedApp);
    });
});
