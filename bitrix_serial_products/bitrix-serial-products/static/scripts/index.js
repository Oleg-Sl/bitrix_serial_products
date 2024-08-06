import ApiClient from './utils/api_client.js';
import { main } from './index/index.js';


document.addEventListener("DOMContentLoaded", async function() {
    const bx24 = new ApiClient(API);
    main(bx24);
});
