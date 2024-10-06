import Fabric from '../fabric.js';


export default class FabricManager {
    constructor(fabricService, productService, callbackOutputImage) {
        this.fabricService = fabricService;
        this.productService = productService;
        this.callbackOutputImage = callbackOutputImage;
    }

    initialize() {
    }

    getFabricData1() {
        return '';
    }

    getFabricName1() {
        return '';
    }

    getFabricPrice1() {
        return '';
    }

    getFabricCategory1() {
        return '';
    }

    getFabricCollection1() {
        return '';
    }

    getCopyData() {
        return {};
    }

    getChangedData() {
        return {};
    }
    
    getFields() {
        return {};
    }

    getPrices() {
        return {
        };
    }

    getCategories() {
        return [
        ];
    }

    getComments() {
        return {
        };
    }
}
