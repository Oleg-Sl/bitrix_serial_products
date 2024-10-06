import { Fabric } from '../common/fabric/fabric.js';


export default class FabricManager {
    constructor(fabricService, productService, callbackOutputImage) {
        this.fabricService = fabricService;
        this.productService = productService;
        this.callbackOutputImage = callbackOutputImage;

        this.select_1 = document.querySelector(`#upholsteryFabricCollection_2`);
        this.select_2 = document.querySelector(`#upholsteryFabricCollection_3`);

        // Изголовье
        this.fabric_1 = new Fabric(this.fabricService, this.productService, this.select_1, 'upholsteryFabricCollection_2', 0, this.callbackOutputImage);
        // Царги
        this.fabric_2 = new Fabric(this.fabricService, this.productService, this.select_2, 'upholsteryFabricCollection_3', 1, this.callbackOutputImage);
    }

    init() {
        this.fabric_1.init();
        this.fabric_2.init();
    }

    getFabricData1() {
        return this.fabric_1.getFabricData();
    }

    getFabricData2() {
        return this.fabric_2.getFabricData();
    }

    getFabricName1() {
        return this.fabric_1.getFabricName();
    }

    getFabricName2() {
        return this.fabric_2.getFabricName();
    }

    getFabricName() {
        if (!this.fabric_1.isFabric() && !this.fabric_2.isFabric()) {
            return ' - ';
        }

        if (this.fabric_1.getFabricId() == this.fabric_2.getFabricId()) {
            return this.fabric_1.getFabricName();
        } if (this.fabric_1.isFabric() && !this.fabric_2.isFabric()) {
            return this.fabric_1.getFabricName();
        } else if (this.fabric_2.isFabric() && !this.fabric_1.isFabric()) {
            return this.fabric_2.getFabricName();
        }

        return `${this.fabric_1.getFabricName()}, ${this.fabric_2.getFabricName()}`;
    }

    getFabricPrice1() {
        return this.fabric_1.getFabricPrice();
    }

    getFabricPrice2() {
        return this.fabric_2.getFabricPrice();
    }

    getFabricCategory1() {
        return this.fabric_1.getFabricCategory();
    }

    getFabricCategory2() {
        return this.fabric_2.getFabricCategory();
    }

    getFabricType1() {
        return this.fabric_1.getFabricTypeData();
    }

    getFabricType2() {
        return this.fabric_2.getFabricTypeData();
    }

    getFabricCollection1() {
        return this.fabric_1.getFabricCollection();
    }

    getFabricCollection2() {
        return this.fabric_2.getFabricCollection();
    }

    getCopyData() {
        const field_1 = this.fabric_1.getFields();
        const field_2 = this.fabric_2.getFields();
        return {...field_1, ...field_2};
    }

    getChangedData() {
        const field_1 = this.fabric_1.getChangedData();
        const field_2 = this.fabric_2.getChangedData();
        return {...field_1, ...field_2};
    }
    
    getFields() {
        return this.getChangedData();
    }

    getPrices() {
        return {
            1: this.getFabricPrice1(),
            2: this.getFabricPrice2(),
        };
    }

    getCategories() {
        return [
            this.getFabricCategory1(),
            this.getFabricCategory2(),
        ];
    }

    getFabricTypes() {
        const typeOfFabric1 = this.getFabricType1();
        const typeOfFabric2 = this.getFabricType2();
        let typeOfFabrics = [];
        if (typeOfFabric1) {
            typeOfFabrics.push(typeOfFabric1);
        };
        if (typeOfFabric2) {
            typeOfFabrics.push(typeOfFabric2);
        };
        return typeOfFabrics;
    }

    getComments() {
        return {
            1: `${this.getFabricName1()} (${this.getFabricCollection1()} - ${this.getFabricPrice1()})`,
            2: `${this.getFabricName2()} (${this.getFabricCollection2()} - ${this.getFabricPrice2()})`,
        };
    }
}

