
import ApiClient from '../../utils/api_client.js';
import PoufApp from '../apps/products/pouf.js';
import { main } from '../main.js';


document.addEventListener("DOMContentLoaded", async function() {
    BX24.init(async function(){
        const apiClient = new ApiClient();
        await apiClient.init();
        main(apiClient, PoufApp);
    });
});
