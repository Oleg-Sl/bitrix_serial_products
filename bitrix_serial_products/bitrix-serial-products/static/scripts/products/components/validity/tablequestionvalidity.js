import { DeliveryCalculation } from '../../../components/delivery/deliverycalculation.js';


class QuestionDTO {
    constructor(data) {
    }
}


class ProductDataForCalculationDTO {
    constructor(data) {
        this.id = data?.id;
        this.leadId = data?.leadId;
        this.dealId = data?.dealId;
        this.name = data?.name;
        this.freeTitle = data?.freeTitle;
        this.linearMeters = data?.linearMeters;
        this.baseValue = data?.baseValue;
        this.fabricPrices = data?.fabricPrices;
        this.fabricComments = data?.fabricComments;
        this.selectedCalculationId = data?.selectedCalculationId;
        this.selectedCalculationField = data?.selectedCalculationField;
        this.questions = data?.questions;
    }
}


export default class CheckTableData {
    constructor(productManager, fabricManager, productNameRus) {
        this.productManager = productManager;
        this.fabricManager = fabricManager;
        this.productNameRus = productNameRus;
        this.deliveryCalculation = new DeliveryCalculation();
    }

    getProductData() {
        return new ProductDataForCalculationDTO({
            id: this.productManager.getValue("id"),
            leadId: null,
            dealId: null,
            name: this.productNameRus,
            freeTitle: this.productManager.getValue("freeTitle"),
            baseValue: 1,

            fabricPrices: this.fabricManager.getPrices(),
            fabricComments: this.fabricManager.getComments(),

            selectedCalculationId: this.productManager.getValue("calculationId"),
            selectedCalculationField: this.productManager.getFieldName("calculationId"),
            questions: new QuestionDTO({
            })
        });
    }
}
