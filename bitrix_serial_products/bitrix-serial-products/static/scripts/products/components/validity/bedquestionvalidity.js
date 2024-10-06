import { DeliveryCalculation } from '../../../components/delivery/deliverycalculation.js';


class QuestionDTO {
    constructor(data) {
        this.individual = data?.individual;                             // Диван. Индивидуалка
        this.looseFabric = data?.looseFabric;                           // Рыхлая ткань? требуется оверлог
        this.mechanism = data?.mechanism;                               // Проверка Механизма
        this.boxAvailability = data?.boxAvailability;                   // Наличие Ящика
        this.size = data?.size;                                         // Проверка размера

        this.seamTsargiDoubleStitchOrEdging = data?.seamSeatDoubleStitchOrEdging;             // Шов Двушка или Кант (Сидение)
        this.seamTsargiSeamOut = data?.seamSeatSeamOut;                                       // Шов НАРУЖУ(сидение)
        this.seamTsargiMinotti = data?.seamSeatMinotti;                                       // Шов Минотти(сидение)

        this.seamHeaderDoubleStitchOrEdging = data?.seamSeatDoubleStitchOrEdging;             // Шов Двушка или Кант (Сидение)
        this.seamHeaderSeamOut = data?.seamSeatSeamOut;                                       // Шов НАРУЖУ(сидение)
        this.seamHeaderMinotti = data?.seamSeatMinotti;                                       // Шов Минотти(сидение)
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


export default class CheckBedData {
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
                individual: this.checkQuestionIndividual(),                     // Диван. Индивидуалка
                looseFabric: this.checkLooseFabric(),                           // Рыхлая ткань? требуется оверлог
                mechanism: this.checkMechanism(),                               // Проверка Механизма
                boxAvailability: this.checkBoxAvailability(),                   // Наличие Ящика
                size: this.checkSize(),                                         // Проверка размера

                seamTsargiDoubleStitchOrEdging: this.checkSeamTypeTsargi(['doubleStitch', 'edgingSeam']),   // Шов Двушка или Кант (Сидение)
                seamTsargiSeamOut: this.checkSeamTypeTsargi(['seamOut']),                                   // Шов НАРУЖУ(сидение)
                seamTsargiMinotti: this.checkSeamTypeTsargi(['minotti']),                                   // Шов Минотти(сидение)
                
                seamHeaderDoubleStitchOrEdging: this.checkSeamTypeHeader(['doubleStitch', 'edgingSeam']),   // Шов Двушка или Кант (Сидение)
                seamHeaderSeamOut: this.checkSeamTypeHeader(['seamOut']),                                   // Шов НАРУЖУ(сидение)
                seamHeaderMinotti: this.checkSeamTypeHeader(['minotti']),                                   // Шов Минотти(сидение)
                
            })
        });
    }

    checkQuestionIndividual() {
        // Проверяется поле "Поточка?". Если ДА - то коэф. не срабатывает.
        return !this.productManager.isPotochka();
    }

    checkLooseFabric() {
        // Если "категория ткани" != base - то коэ. срабатывает
        const categories = this.fabricManager.getCategories();
        return !categories.find((item) => item.alias === 'base');
    }

    checkMechanism() {
        // Если поле "Механизм подъема" == "ДА", то коэф. срабатывают (4071 - ДА, 4073 - НЕТ)
        const mechanismId = this.productManager.getValue('liftingMechanism');
        const idIsMechanism = 4071;
        return Boolean(mechanismId) && mechanismId == idIsMechanism;
    }

    checkBoxAvailability() {
        // Если "Наличие Ящика" == "есть", то коэ. срабатывают (4075 - есть, 4077 - нет, 4597 - не выбрано)
        const storageBoxId = this.productManager.getValue("hasStorageBox");
        const hasStorageBoxId = 4075;
        return storageBoxId == hasStorageBoxId;
    }

    checkSize() {
        // Если размерв в поле "СМП" меньше 1600*2000, то коэ. срабатывает
        const maxWidth = 1600;
        const maxHeight = 2000;
        const smpSize = this.productManager.getValue("smp");
        const arrSmpSize = smpSize.split('*');
        // return arrSmpSize.length == 2 && (parseInt(arrSmpSize[0]) < maxWidth || parseInt(arrSmpSize[1]) < maxHeight);
        return arrSmpSize.length == 2 && parseInt(arrSmpSize[0]) < maxWidth;
    }

    checkSeamTypeTsargi(seamTypes) {
        const seamTypeIds = {
            doubleStitch: 3765,     // Двухстрочный
            edgingSeam: 3769,       // Кант
            seamOut: 3767,          // Шов наружу
            minotti: 5207,          // Двойной со вставкой (минотти)
        };
        const seamTypeId = this.productManager.getValue("facingTopDrawer_3");
        return seamTypes.some(seamType => seamTypeIds[seamType] === seamTypeId);
    }

    checkSeamTypeHeader(seamTypes) {
        const seamTypeIds = {
            doubleStitch: 5321,     // Двухстрочный
            edgingSeam: 5327,       // Кант
            seamOut: 5323,          // Шов наружу
            minotti: 5325,          // Двойной со вставкой (минотти)
        };
        const seamTypeId = this.productManager.getValue("seamType_3");
        return seamTypes.some(seamType => seamTypeIds[seamType] === seamTypeId);
    }
}
