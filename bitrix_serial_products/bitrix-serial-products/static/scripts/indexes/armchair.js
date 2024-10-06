// import Loader from '../components/loader.js';
// import DataService from './services/data_service.js'
// import ProductService from './services/product_service.js'
// import FabricService from './services/fabric_service.js'
// import UserService from './services/user_service.js'
// import MechanismService from './services/mechanism_service.js'
// import { getProductConfig, getProductConfigById } from '../configs/utils.js'


// export default async function main(apiClient) {
//     const elemLoader = document.querySelector("#elemWaitingLoader");
//     const elemApp = document.querySelector("#elemAppData");

//     const loader = new Loader(elemLoader, elemApp);
//     const { title, smartId, field} = getProductConfigById(smartProcessTypeId);

//     loader.show();

//     const dataService = new DataService(apiClient, field);
//     await dataService.fetchData(smartProcessTypeId, smartProcessId);

//     const mechanismService = new MechanismService(dataService);
//     const productService = new ProductService(dataService);
//     const fabricService = new FabricService(dataService);
//     const userService = new UserService(dataService);

//     // const app = new AppClass(productService, fabricService, userService, mechanismService);

//     // try {
//     //     await app.initialize();
//     // } catch (error) {
//     //     alert(`Ошибка инициализации приложения: ${error.message}`);
//     //     console.error('Ошибка инициализации приложения', error);
//     // } finally {
//     //     loader.hide();
//     // }
// }
