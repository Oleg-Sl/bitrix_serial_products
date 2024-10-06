import {
    FIELD_FABRICS,
    ID_FABRIC,
    ITEMS_CATEGORY_FABRIC,
    ITEMS_TYPE_FABRIC,
} from '../../../configs/smart_process/fabric.js';
import { FabricInfo } from './info.js';


export default class Fabric {
    constructor(fabricService, productService, select, fieldAlias, number, callbackOutputImage) {
        this.fabricService = fabricService;
        this.productService = productService;
        this.select = select;
        this.fieldAlias = fieldAlias;
        this.number = number;
        this.callbackOutputImage = callbackOutputImage;

        this.fabric = null;
    }

    init() {
        this.fabric = this.productService.getValue(this.fieldAlias);

        this.infoFabric = new FabricInfo(this.bx24, this.select);
        this.infoFabric.setFabricData(this.getFabricData(this.fabric));

        this.render();
        this.initHandler();
    }

    initHandler() {
        // инициализация chosen
        $(this.select).chosen().change((event) => {
            this.fabric = event.target.value;
            const fabric = this.getFabricData(this.fabric);
            this.productService.updateProductData(this.fieldAlias, this.fabric);
            this.infoFabric.setFabricData(fabric);
            const link = fabric[FIELD_FABRICS.image]?.urlMachine;
            this.callbackOutputImage(link, this.number);
        });
    }

    getFabricData() {        
        return this.fabricService.getFabricData(this.fabric) || {};
    }

    getFabricName() {
        const fabric = this.getFabricData(this.fabric);
        return fabric[FIELD_FABRICS.name] || '';
    }

    getFabricPrice() {
        const fabric = this.getFabricData(this.fabric);
        return fabric[FIELD_FABRICS.price] || 0;
    }

    getFabricCollection() {
        const fabric = this.getFabricData(this.fabric);
        return fabric[FIELD_FABRICS.collection];
    }

    getFabricCategory() {
        const fabric = this.getFabricData(this.fabric);
        // const fabric = this.dataManager.getFabricDataById(this.fabric) || {};
        const categoryId = fabric[FIELD_FABRICS.category];
        const categoryAlias = ITEMS_CATEGORY_FABRIC?.[categoryId];
        return {
            id: categoryId,
            alias: categoryAlias
        }
    }

    getFabricType(fabricTypeId) {
        return this.fabricService.getFabricType(fabricTypeId) || '';
    }

    // getFields() {
    //     const fieldInBx24 = this.dataManager.getProductFieldName(this.fieldAlias);
    //     return {
    //         [fieldInBx24]: this.fabric,
    //     };
    // }

    render() {
        const contentHTML = this.getFabricsOptionsSelectHTML();
        this.select.innerHTML = contentHTML;
        this.checkOption(this.select, this.fabric);
        this.setFabricsTypesAndColors();
    }

    setFabricsTypesAndColors() {
        const idElemType = this.select.getAttribute('data-fabric-type-id');
        const idElemColor = this.select.getAttribute('data-fabric-color-id');
        const elemType = document.getElementById(idElemType);
        const elemColor = document.getElementById(idElemColor);
        const fabric = this.productService.getProductFieldData(this.select.value) || {};
        elemType.value = this.getFabricType(fabric?.[FIELD_FABRICS.type]);
        elemColor.value = fabric?.[FIELD_FABRICS.colorText] || '';
    }

    getFabricsOptionsSelectHTML() {
        let contentHTML = '<option value="0">-</option>';
        for (const item of this.fabricService.getFabrics()) {
            contentHTML += `<option value="${item.id}">${item[FIELD_FABRICS.titleTmp]}</option>`;
        }

        return contentHTML;
    }

    checkOption(elem, value) {
        let options = elem.querySelectorAll('option');
        for (const option of options) {
            if (option.value == value) {
                option.selected = true;
                break;
            }
        }
    }

    // getChangedData() {
    //     this.fabric = this.select.value;
    //     const fieldInBx24 = this.dataManager.getProductFieldName(this.fieldAlias);
    //     return {
    //         [fieldInBx24]: this.fabric,
    //     };
    // }
    
    // getFields() {
    //     return this.getChangedData();
    // }
}


