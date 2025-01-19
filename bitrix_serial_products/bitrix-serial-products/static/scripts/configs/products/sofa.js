export const ID_SOFA = 158;

export const ITEM_ID_POTOCHKA = 4349;

export const SCETCH_ITEMS = {
    notSelected: "4681",            // не выбран
    notNeeded: "4525",              // не нужен
    pause: "4703",                  // ПАУЗА (отправить позже)
    needed: "4527",                 // нужен
    neededSent: "4601",             // нужен (отправлен)
    completed: "4529",              // выполнен
    completedSent: "4819",          // выполнен (отправлен)
    completedSigned: "4627",        // выполнен (подписан)
};

export const FIELD_SOFA = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1",
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm53_1716735926",   // Шаблон поточки
    filter: "ufCrm53_1730290956",               // Для фильтра в Поточке

    sketch: "ufCrm53_1718035723",               // Эскиз
    sentToWorkshop: "ufCrm53_1718036558",       // Отправлено в цех

    linkClientDoc: "ufCrm53_1714708618",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm53_1714708635",      // Ссылка на документ для цеха

    isTechOk: "ufCrm53_1731470958",             // tech-OK
    dateOfTech: "ufCrm53_1731471267",           // Дата проверки tech
    isComDirOk: "ufCrm53_1732253331",           // Ком.дир-OK
    dateOfComDir: "ufCrm53_1732253669",         // Дата согласования ком.дир

    productVariationIds: "ufCrm53_1733073352",  // ID_вариации_каталога
    productMainId: "ufCrm53_1733204778",        // ID_головного товара

    deliveryCity: "ufCrm53_1713500870",         // Город доставки
    link: "ufCrm53_1713500898",                 // Ссылка на оригинал
    referencePoint: "ufCrm53_1713500963",       // Ориентир
    quantity: "ufCrm53_1713501067",             // Количество
    dirId: "ufCrm53_1713496953",                // ID папки с файлами
    isActive: "ufCrm53_1713496661",             // Товар активен
    isMeasured: "ufCrm53_1713496744",           // Замер нужен
    itemId: "ufCrm53_1714232898",               // ID товара
    itemPositionId: "ufCrm53_1714367721",       // ID товарной позиции
    itemPotochkaId: "ufCrm53_1716304972",       // ID_товар_поточка_вариация

    isExist: "ufCrm53_1714295327",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm53_1714383054",       // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm53_1718330110",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm53_1714839607",           // Поточка?
    calculationId: "ufCrm53_1714910311",        // Расчет
    deliveryToMSK: "ufCrm53_1716434545",        // Доставка до МСК

    filterMechanism: "ufCrm53_1732095781",      // Фильтр - Наличие механизма
    filterNameCollection: "ufCrm53_1732093381", // Фильтр - Название коллекии
    filterTags: "ufCrm53_1730290956",           // Фильтр - ТЕГИ

    createdBy: "ufCrm53_1715516212",
    updatedBy: "ufCrm53_1715516230",

    tzDevelopment: 'ufCrm53_1737287650',            // ТЗ-разработка
    tzSaw: 'ufCrm53_1737287887',                    // ТЗ-пилка
    tzAssembly: 'ufCrm53_1737287924',               // ТЗ-сборка
    tzPPU: 'ufCrm53_1737288157',                    // ТЗ-ппу
    tzSewing: 'ufCrm53_1737288222',                 // ТЗ-швейка
    tzCovering: 'ufCrm53_1737288382',               // ТЗ-обтяжка
    tzCarpentry: 'ufCrm53_1737288504',              // ТЗ-столярка
    tzGrinding: 'ufCrm53_1737288908',               // ТЗ-шлифовка
    tzMolar: 'ufCrm53_1737288943',                  // ТЗ-молярка
    tzPackage: 'ufCrm53_1737289121',                // ТЗ-упаковка
    tzDelivery: 'ufCrm53_1737289162',               // ТЗ-доставка

    btnSave: "ufCrm53_1714989111",              // Кнопка "сохранить"
    btnRemove: "ufCrm53_1714989140",            // Кнопка "удалить"
    btnCopy: "ufCrm53_1714989154",              // Кнопка "копировать"

    freeTitle: "ufCrm53_1713497057",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm53_1713497093",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm53_1713497114",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm53_1713497130",       // 1-Общие габариты (В.)
    strictSize: "ufCrm53_1713497217",                   // 1-Строгое соблюдение размера
    shape:  "ufCrm53_1713497257",                       // 1-Форма дивана
    numberModules: "ufCrm53_1713497435",                // 1-Кол-во модулей
    sleepingMechanism: "ufCrm53_1713497717",            // 1-Согласованный спальный механизм
    storageBox: "ufCrm53_1713497786",                   // 1-Ящик для хранения (указать на схеме)
    supports: "ufCrm53_1713497809",                     // 1-Опоры
    supportColor: "ufCrm53_1713497879",                 // 1-Цвет опор
    supportHeight: "ufCrm53_1713497937",                // 1-Высота опор
    upholsteryFabricCollection: "ufCrm53_1713496775",   // 1-Коллекция и цвет обивочной ткани
    decorationDescription: "ufCrm53_1713498015",        // 1-Доп. описание и описание декора
    depthThree: "ufCrm53_1715618438",                   // 1-Г(3)-правая часть
    depthTwo: "ufCrm53_1715618385",                     // 1-Г(2)-центральная часть
    depthOne: "ufCrm53_1715618319",                     // 1-Г(1)-левая часть
    ottomanSide: "ufCrm53_1716739850",                  // Сторона оттоманки

    // totalThickness_2: "ufCrm53_1713498135",             // 2-Общая толщина
    totalThickness_2: "ufCrm53_1716820670",             // 2-Общая толщина
    softnessWish_2: "ufCrm53_1713498165",               // 2-Пожелание по мягкости
    seamType_2: "ufCrm53_1713498375",                   // 2-Тип шва
    decorationDescription_2: "ufCrm53_1713498464",      // 2-Доп. описание и описание декора

    totalThickness_3: "ufCrm53_1713498494",             // 3-Общая толщина
    plantingDepth_3: "ufCrm53_1713498509",              // 3-Глубина посадки
    plantingHeight_3: "ufCrm53_1713498532",             // 3-Высота посадки, мм
    agreedFillerOption_3: "ufCrm53_1713498576",         // 3-Согласованный вариант наполнителя
    useInFillers_3: "ufCrm53_1713499060",               // 3-Использовать в наполнители
    seamType_3: "ufCrm53_1713499129",                   // 3-Тип шва
    decorationDescription_3: "ufCrm53_1713499219",      // 3-Доп. описание и описание декора
    
    // totalThickness_4: "ufCrm53_1713499334",             // 4-Общая толщина
    totalThickness_4: "ufCrm53_1716820921",             // 4-Общая толщина
    seamType_4: "ufCrm53_1725523131",                   // 2-Тип шва
    tiltAngle_4: "ufCrm53_1713499350",                  // 4-Угол наклона
    softnessWish_4: "ufCrm53_1713499455",               // 4-Пожелание по мягкости
    decorationDescription_4: "ufCrm53_1713499477",      // 4-Доп. описание и описание декора

    agreedFillerOption_5: "ufCrm53_1713499552",         // 5-Согласованный вариант наполнителя
    seamType_5: "ufCrm53_1713499746",                   // 5-Тип шва
    seamPitch_5: "ufCrm53_1713499968",                  // 5-Шаг шва
    cutType_5: "ufCrm53_1713500022",                    // 5-Тип кроя
    pillowSize1_5: "ufCrm53_1713500111",                // 5-Размер подушки (чистовой)-1
    pillowNumber1_5: "ufCrm53_1713500180",              // 5-Кол-во подушек - 1
    pillowSize2_5: "ufCrm53_1713500216",                // 5-Размер подушки (чистовой)-2
    pillowNumber2_5: "ufCrm53_1713500241",              // 5-Кол-во подушек - 2
    pillowSize3_5: "ufCrm53_1713500225",                // 5-Размер подушки (чистовой)-3
    pillowNumber3_5: "ufCrm53_1713500251",              // 5-Кол-во подушек - 3
    decorationDescription_5: "ufCrm53_1713500297",      // 5-Доп. описание и описание декора

    agreedFillerOption_6: "ufCrm53_1713500381",         // 6-Согласованный вариант наполнителя
    seamType_6: "ufCrm53_1713500473",                   // 6-Вид шва
    pillowSize1_6: "ufCrm53_1713500702",                // 6-Размер подушки (чистовой)-1
    pillowNumber1_6: "ufCrm53_1713500740",              // 6-Кол-во подушек - 1
    pillowSize2_6: "ufCrm53_1713500716",                // 6-Размер подушки (чистовой)-2
    pillowNumber2_6: "ufCrm53_1713500754",              // 6-Кол-во подушек - 2
    pillowSize3_6: "ufCrm53_1713500724",                // 6-Размер подушки (чистовой)-3
    pillowNumber3_6: "ufCrm53_1713500765",              // 6-Кол-во подушек - 3
    decorationDescription_6: "ufCrm53_1713500805",      // 6- Доп. описание и описание декора

    managerDescription_7: "ufCrm53_1713501117",         // 7-Дополнительное описание менеджера
    paintColor_7: "ufCrm53_1713501178",                 // 7-Цвет краски
    ral_7: "ufCrm53_1713501240",                        // 7-RAL | NSC
    treeType_7: "ufCrm53_1713501270",                   // 7-Сорт дерева
    veneer_7: "ufCrm53_1713501326",                     // 7- Шпон
    woodColorType_7: "ufCrm53_1713501366",              // 7-Тип окраски дерева
    glossiness_7: "ufCrm53_1713501449",                 // 7-Глянцевость
    metalCoatingType_7: "ufCrm53_1713501521",           // 7-Тип покрытия металла
    description_7: "ufCrm53_1713501586",                // 7-Доп.описание
    managerNotes_7: "ufCrm53_1713501617",               // 8-Замечание руководителя

    // Фотографии товара
    canvasMain: "ufCrm53_1714807133",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm53_1713496168", // Главное фото
    mainPhoto: "ufCrm53_1714812139",        // Главное фото

    canvas_1: "ufCrm53_1713973024",         // Полотно 1
    canvasScreen_1: "ufCrm53_1714232980",   // Скриншот полотна 1
    photo1_1: "ufCrm53_1713496500",         // Фото 3 ст1
    photo1_2: "ufCrm53_1713496522",         // Фото 4 ст 1
    photo1_3: "ufCrm53_1713496539",         // Фото 5 ст1
    photo1_4: "ufCrm53_1713496548",         // Фото 6 ст 1
    photo1_5: "ufCrm53_1713496561",         // Фото 7 ст 1
    photo1_6: "ufCrm53_1714928801",         // Фото 7 ст 1

    canvas_2: "ufCrm53_1713973055",         // Полотно 2
    canvasScreen_2: "ufCrm53_1714233030",   // Скриншот полотна 2
    photo2_1: "ufCrm53_1713496571",         // Фото 8 ст 2
    photo2_2: "ufCrm53_1713496605",         // Фото 9 ст2
    photo2_3: "ufCrm53_1713680308",         // Фото 10 ст2
    photo2_4: "ufCrm53_1713680349",         // Фото 11 ст2
    photo2_5: "ufCrm53_1713680362",         // Фото 12 ст2
    photo2_6: "ufCrm53_1713680387",         // Фото 13 ст2

    canvas_3: "ufCrm53_1716694868",         // Полотно 3
    canvasScreen_3: "ufCrm53_1716694884",   // Скриншот полотна 3
    photo3_1: "ufCrm53_1716694908",         // Фото 8 ст3
    photo3_2: "ufCrm53_1716694951",         // Фото 9 ст3
    photo3_3: "ufCrm53_1716694965",         // Фото 10 ст3
    photo3_4: "ufCrm53_1716694984",         // Фото 11 ст3
    photo3_5: "ufCrm53_1716694994",         // Фото 12 ст3
    photo3_6: "ufCrm53_1716695008",         // Фото 13 ст3
};
