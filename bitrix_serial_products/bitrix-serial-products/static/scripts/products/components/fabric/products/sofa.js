import Fabric from '../fabric.js';


export default class FabricManager {
    constructor(fabricService, productService, callbackOutputImage) {
        this.fabricService = fabricService;
        this.productService = productService;
        this.callbackOutputImage = callbackOutputImage;

        this.select_1 = document.querySelector(`#upholsteryFabricCollection`);
        this.fabric_1 = new Fabric(this.fabricService, this.productService, this.select_1, 'upholsteryFabricCollection', 0, this.callbackOutputImage);
    }
    
    init() {
        this.fabric_1.init();
    }

    getFabricData1() {
        return this.fabric_1.getFabricData();
    }

    getFabricName1() {
        return this.fabric_1.getFabricName();
    }

    getFabricPrice1() {
        return this.fabric_1.getFabricPrice();
    }

    getFabricCategory1() {
        return this.fabric_1.getFabricCategory();
    }

    getFabricCollection1() {
        return this.fabric_1.getFabricCollection();
    }

    getCopyData() {
        const field_1 = this.fabric_1.getFields();
        return {...field_1};
    }

    getChangedData() {
        const field_1 = this.fabric_1.getChangedData();
        return {...field_1};
    }
    
    getFields() {
        return this.getChangedData();
    }

    getPrices() {
        return {
            1: this.getFabricPrice1(),
        };
    }

    getCategories() {
        return [
            this.getFabricCategory1(),
        ];
    }

    getComments() {
        return {
            1: `${this.getFabricName1()} (${this.getFabricCollection1()} - ${this.getFabricPrice1()})`,
        };
    }
}

