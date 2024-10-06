import { DeliveryCalculation } from '../../../components/delivery/deliverycalculation.js';


class QuestionDTO {
    constructor(data) {
        this.individual = data?.individual;                             // Кресло. Индивидуалка
        this.looseFabric = data?.looseFabric;                           // Рыхлая ткань? требуется оверлог
        this.seamArmrestsDoubleStitchOrEdging = data?.seamArmrestsDoubleStitchOrEdging;     // Шов Двушка или Кант(подлокотник)
        this.seamArmrestSeamOut = data?.seamArmrestSeamOut;                                 // Шов НАРУЖУ(подлокотник)
        this.seamArmrestMinotti = data?.seamArmrestMinotti;                                 // Шов Минотти(подлокотник)
        this.seamSeatDoubleStitchOrEdging = data?.seamSeatDoubleStitchOrEdging;             // Шов Двушка или Кант (Сидение)
        this.seamSeatSeamOut = data?.seamSeatSeamOut;                                       // Шов НАРУЖУ(сидение)
        this.seamSeatMinotti = data?.seamSeatMinotti;                                       // Шов Минотти(сидение)

        this.woodenSupports = data?.woodenSupports;                     // Деревянные опоры
        this.woodenFrameAndSupports = data?.woodenFrameAndSupports;     // Деревянная рама и опоры

    }
}


class ProductDataForCalculationDTO {
    constructor(data) {
        this.id = data?.id;
        this.leadId = data?.leadId;
        this.dealId = data?.dealId;
        this.name = data?.name;
        this.freeTitle = data?.freeTitle;
        this.baseValue = data?.baseValue;
        this.fabricPrices = data?.fabricPrices;
        this.fabricComments = data?.fabricComments;
        this.selectedCalculationId = data?.selectedCalculationId;
        this.selectedCalculationField = data?.selectedCalculationField;
        this.questions = data?.questions;
    }
}


export default class CheckArmchairData {
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
            baseValue: this.deliveryCalculation.calcSquareMeters(this.productManager.getProductDataMap()),
            fabricPrices: this.fabricManager.getPrices(),
            fabricComments: this.fabricManager.getComments(),
            selectedCalculationId: this.productManager.getValue("calculationId"),
            selectedCalculationField: this.productManager.getFieldName("calculationId"),
            questions: new QuestionDTO({
                individual: this.checkQuestionIndividual(),                     // Кресло. Индивидуалка
                looseFabric: this.checkLooseFabric(),                           // Рыхлая ткань? требуется оверлог
                seamArmrestsDoubleStitchOrEdging: this.checkSeamTypeArmrests(['doubleStitch', 'edgingSeam']),   // Шов Двушка или Кант(подлокотник)
                seamArmrestSeamOut: this.checkSeamTypeArmrests(['seamOut']),                                    // Шов НАРУЖУ(подлокотник)
                seamArmrestMinotti: this.checkSeamTypeArmrests(['minotti']),                                    // Шов Минотти(подлокотник)
                seamSeatDoubleStitchOrEdging: this.checkSeamTypeSeat(['doubleStitch', 'edgingSeam']),   // Шов Двушка или Кант (Сидение)
                seamSeatSeamOut: this.checkSeamTypeSeat(['seamOut']),                                   // Шов НАРУЖУ(сидение)
                seamSeatMinotti: this.checkSeamTypeSeat(['minotti']),                                   // Шов Минотти(сидение)

                woodenSupports: this.checkWoodenSupports(),                     // Деревянные опоры
                woodenFrameAndSupports: this.checkWoodenFrameAndSupports(),     // Деревянная рама и опоры
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

    checkSeamTypeArmrests(seamTypes) {
        const seamTypeIds = {
            doubleStitch: 3907,     // Двухстрочный
            edgingSeam: 3911,       // Кант
            seamOut: 3909,          // Шов наружу
            minotti: 5377,          // Двойной со вставкой (минотти)
        };
        const seamTypeId = this.productManager.getValue("seamType_2");
        return seamTypes.some(seamType => seamTypeIds[seamType] === seamTypeId);
    }

    checkSeamTypeSeat(seamTypes) {
        const seamTypeIds = {
            doubleStitch: 3939,     // Двухстрочный
            edgingSeam: 3943,       // Кант
            seamOut: 3941,          // Шов наружу
            minotti: 5379,          // Двойной со вставкой (минотти)
        };
        const seamTypeId = this.productManager.getProductData("seamType_3");
        return seamTypes.some(seamType => seamTypeIds[seamType] === seamTypeId);
    }

    checkWoodenSupports() {
        // Если поле "Опоры (материал)" == "Деревянные" и "Высота опор" > 80, то коэ. срабатывает
        const woodenSupportId = 3891;
        const maxSupportHeight = 80;
        const supportId = this.productManager.getValue("supports");
        const supportHeight = this.productManager.getValue("supportHeight");
        return supportId === woodenSupportId && supportHeight > maxSupportHeight;
    }

    checkWoodenFrameAndSupports() {
        // Если "Опоры (материал)" == "Деревянные с рамой", то коэ. срабатывает
        const woodenFrameAndSupportId = 4499;
        const supportId = this.productManager.getValue("supports");
        return supportId === woodenFrameAndSupportId;
    }

    checkSeamMinotti() {
        // Если тип шва Подлокотник равен "Шов Двойной со вставкой (минотти)", то коэ. срабатывает
        const seamMinottiArmrestsId = 3743;    // Двухстрочный - Подлокотник
        const seamTypeArmrestsId = this.productManager.getValue("seamType_2");
        return seamTypeArmrestsId === seamMinottiArmrestsId;
    }
}