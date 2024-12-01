import Loader from '../components/loader.js';
import DataService from './services/data_service.js';
import ProductService from './services/product_service.js';
import FabricService from './services/fabric_service.js';
import UserService from './services/user_service.js';
import MechanismService from './services/mechanism_service.js';
import CallbackService from './services/callback_service.js';
import FileUploadService from './services/fileupload_service.js';
// import CalculationManager from '../products/components/calculation/calcmanager.js';
import { getProductConfig, getProductConfigById } from '../configs/utils.js';


export async function main(apiClient, App) {
    const elemLoader = document.querySelector("#elemWaitingLoader");
    const elemApp = document.querySelector("#elemAppData");
    console.log("elemLoader = ", elemLoader);
    console.log("elemApp = ", elemApp);

    const loader = new Loader(elemLoader, elemApp);
    const { title, smartId, field, calcTypeId } = getProductConfigById(smartProcessTypeId);

    loader.show();

    const dataService = new DataService(apiClient, field);
    await dataService.fetchData(smartProcessTypeId, smartProcessId);

    const userService = new UserService(dataService);
    const fabricService = new FabricService(apiClient, dataService);
    const productService = new ProductService(apiClient, dataService, smartProcessTypeId);
    const callbackService = new CallbackService(apiClient);
    const mechanismService = new MechanismService(dataService);
    const fileUploadService = new FileUploadService(apiClient, productService, portalUrl, smartProcessTypeId, smartProcessId);
    // const calculationManager

    const app = new App(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService);

    try {
        loader.hide();
        await app.initialize();
    } catch (error) {
        alert(`Ошибка инициализации приложения: ${error.message}`);
        console.error('Ошибка инициализации приложения', error);
    } finally {
        loader.hide();
    }
}
