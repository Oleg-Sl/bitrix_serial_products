import ApiClient from './utils/api_client.js';
import { main } from './main/main.js';


document.addEventListener("DOMContentLoaded", async function() {
    BX24.init(async function(){
        const bx24 = new ApiClient();
        await bx24.init();
        main(bx24);
    });
});
