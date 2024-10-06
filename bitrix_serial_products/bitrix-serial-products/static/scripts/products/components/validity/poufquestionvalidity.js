import { DeliveryCalculation } from '../../../components/delivery/deliverycalculation.js';


class QuestionDTO {
    constructor(data) {
        this.individual = data?.individual;                             // Кресло. Индивидуалка
        this.looseFabric = data?.looseFabric;                           // Рыхлая ткань? требуется оверлог
        this.seamType1 = data?.seamType1;                               // Проверка типа Шва
        this.seamType1 = data?.seamType1;                               // Проверка типа Шва №2
        this.woodenSupports = data?.woodenSupports;                     // Деревянные опоры
        this.woodenFrameAndSupports = data?.woodenFrameAndSupports;     // Деревянная рама и опоры

        this.seamDoubleStitchOrEdging = data?.seamSeatDoubleStitchOrEdging;             // Шов Двушка или Кант (Сидение)
        this.seamSeamOut = data?.seamSeatSeamOut;                                       // Шов НАРУЖУ(сидение)
        this.seamMinotti = data?.seamSeatMinotti;                                       // Шов Минотти(сидение)

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


export default class CheckPoufData {
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
                individual: this.checkQuestionIndividual(),                     // Кресло. Индивидуалка
                looseFabric: this.checkLooseFabric(),                           // Рыхлая ткань? требуется оверлог
                mechanism: this.checkMechanism(),                               // ПроверкаМеханизма
                boxAvailability: this.checkBoxAvailability(),                   // Наличие Ящика

                // seamType1: this.checkSeamType1(),                               // Проверка типа Шва
                // seamType2: this.checkSeamType2(),                               // Проверка типа Шва №2
                woodenSupports: this.checkWoodenSupports(),                     // Деревянные опоры
                woodenFrameAndSupports: this.checkWoodenFrameAndSupports(),     // Деревянная рама и опоры
            
                seamDoubleStitchOrEdging: this.checkSeamType(['doubleStitch', 'edgingSeam']),   // Шов Двушка или Кант (Сидение)
                seamSeamOut: this.checkSeamType(['seamOut']),                                   // Шов НАРУЖУ(сидение)
                seamMinotti: this.checkSeamType(['minotti']),                                   // Шов Минотти(сидение)
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
        const isMechanismId = 4187;        //  Да
        const mechanismId = this.productManager.getValue("mechanism");
        return mechanismId == isMechanismId;
    }

    checkBoxAvailability() {
        // Если "Наличие Ящика" == "есть", то коэ. срабатывают (4181 - есть)
        const storageBoxId = this.productManager.getValue("hasBox");
        const hasStorageBoxId = 4181;
        return storageBoxId == hasStorageBoxId;
    }

    checkSeamType(seamTypes) {
        const seamTypeIds = {
            doubleStitch: 5337,     // Двухстрочный
            edgingSeam: 5343,       // Кант
            seamOut: 5339,          // Шов наружу
            minotti: 5341,          // Двойной со вставкой (минотти)
        };
        const seamTypeId = this.productManager.getValue("seamType");
        return seamTypes.some(seamType => seamTypeIds[seamType] === seamTypeId);
    }

    checkNumberModules() {
        // Поле "Кол-во моделей" умножаем на коэ. по сотрудникам
        const numberModules = this.productManager.getValue("numberModules");
        // console.log("numberModules = ", numberModules);
        return numberModules;
    }

    checkSeamType2() {
        // Если тип шва (Подлокотник, Сидение, Спинка ), хоть в одном  равен "Шов Наружу", то коэ. срабатывает
        const seamOutArmrestsId = 3739;    // Двухстрочный - Подлокотник
        const seamOutSeatId = 3767;        // Двухстрочный - Сидение
        const seamOutPillowId = 3797;      // Двухстрочный - Спинка
        const seamTypeArmrestsId = this.productManager.getValue("seamType_2");
        const seamTypeSeatId = this.productManager.getValue("seamType_3");
        const seamTypePillowId = this.productManager.getValue("seamType_5");
        return seamTypeArmrestsId === seamOutArmrestsId
            || seamTypeSeatId === seamOutSeatId
            || seamTypePillowId === seamOutPillowId;
    }

    checkWoodenSupports() {
        // Если поле "Опоры (материал)" == "Деревянные" и "Высота опор" > 80, то коэ. срабатывает
        const woodenSupportId = 4141;
        const maxSupportHeight = 80;
        const supportId = this.productManager.getValue("supports");
        const supportHeight = this.productManager.getValue("supportHeight");
        return supportId === woodenSupportId && supportHeight > maxSupportHeight;
    }

    checkWoodenFrameAndSupports() {
        // Если "Опоры (материал)" == "Деревянные с рамой", то коэ. срабатывает
        const woodenFrameAndSupportId = 5313;
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