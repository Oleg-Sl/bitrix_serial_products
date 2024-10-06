import Fabric from '../fabric.js';


export default class FabricManager {
    constructor(bx24, data, callback) {
        this.bx24 = bx24;
        this.dataManager = data;
        this.callbackOutputImage = callback;
        this.select_1 = document.querySelector(`#upholsteryFabricCollection`);
        this.select_2 = document.querySelector(`#upholsteryFabricCollection_1`);
        this.select_3 = document.querySelector(`#upholsteryFabricCollection_2`);
        this.fabric_1 = new Fabric(this.bx24, this.dataManager, this.select_1, 'upholsteryFabricCollection', 0, this.callbackOutputImage);
        this.fabric_2 = new Fabric(this.bx24, this.dataManager, this.select_2, 'upholsteryFabricCollection_1', 1, this.callbackOutputImage);
        this.fabric_3 = new Fabric(this.bx24, this.dataManager, this.select_3, 'upholsteryFabricCollection_2', 2, this.callbackOutputImage);
    }

    init() {
        this.fabric_1.init();
        this.fabric_2.init();
        this.fabric_3.init();
    }

    getFabricData1() {
        return this.fabric_1.getFabricData();
    }

    getFabricData2() {
        return this.fabric_2.getFabricData();
    }

    getFabricData3() {
        return this.fabric_3.getFabricData();
    }

    getFabricName1() {
        return this.fabric_1.getFabricName();
    }

    getFabricName2() {
        return this.fabric_2.getFabricName();
    }

    getFabricName3() {
        return this.fabric_3.getFabricName();
    }

    getFabricPrice1() {
        return this.fabric_1.getFabricPrice();
    }

    getFabricPrice2() {
        return this.fabric_2.getFabricPrice();
    }

    getFabricPrice3() {
        return this.fabric_3.getFabricPrice();
    }

    getFabricCategory1() {
        return this.fabric_1.getFabricCategory();
    }

    getFabricCategory2() {
        return this.fabric_2.getFabricCategory();
    }

    getFabricCategory3() {
        return this.fabric_3.getFabricCategory();
    }

    getFabricCollection1() {
        return this.fabric_1.getFabricCollection();
    }

    getFabricCollection2() {
        return this.fabric_2.getFabricCollection();
    }

    getFabricCollection3() {
        return this.fabric_3.getFabricCollection();
    }

    getCopyData() {
        const field_1 = this.fabric_1.getFields();
        const field_2 = this.fabric_2.getFields();
        const field_3 = this.fabric_3.getFields();
        return {...field_1, ...field_2, ...field_3};
    }

    getChangedData() {
        const field_1 = this.fabric_1.getChangedData();
        const field_2 = this.fabric_2.getChangedData();
        const field_3 = this.fabric_3.getChangedData();
        return {...field_1, ...field_2, ...field_3};
    }
    
    getFields() {
        return this.getChangedData();
    }

    getPrices() {
        return {
            1: this.getFabricPrice1(),
            2: this.getFabricPrice2(),
            3: this.getFabricPrice3(),
        };
    }

    getCategories() {
        return [
            this.getFabricCategory1(),
            this.getFabricCategory2(),
            this.getFabricCategory3(),
        ];
    }

    getComments() {
        return {
            1: `${this.getFabricName1()} (${this.getFabricCollection1()} - ${this.getFabricPrice1()})`,
            2: `${this.getFabricName2()} (${this.getFabricCollection2()} - ${this.getFabricPrice2()})`,
            3: `${this.getFabricName3()} (${this.getFabricCollection3()} - ${this.getFabricPrice3()})`,
        };
    }
}

