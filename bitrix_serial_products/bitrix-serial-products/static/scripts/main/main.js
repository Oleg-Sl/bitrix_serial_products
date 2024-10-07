import Loader from './components/loader.js';
import App from './app.js';
import ProductService from './services/product_service.js';
import UserService from './services/user_service.js';
import PermissionManager from './components/permissions/permission_manager.js';


export async function main(apiClient) {
    const elemLoader = document.querySelector("#elemWaitingLoader");
    const elemApp = document.querySelector("#elemAppData");
    
    const loader = new Loader(elemLoader, elemApp);
    const userService = new UserService(apiClient);
    const productService = new ProductService(apiClient);
    const permissionManager = new PermissionManager(apiClient);

    const app = new App(apiClient, productService, userService);
    
    loader.show();

    try {
        await permissionManager.initialize();
    } catch (error) {
        alert(`Отсутствует доступ к приложению: ${error.message}`);
        return
    } finally {
        loader.hide();
    }
    
    try {
        await app.initialize();
        // if (BX24) {
        //     BX24.fitWindow();
        // }
    } catch (error) {
        alert(`Ошибка инициализации приложения: ${error.message}`);
        console.error('Ошибка инициализации приложения', error);
    } finally {
        loader.hide();
    }
}
