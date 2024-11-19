export const ID_TABLE = 186;

export const ITEM_ID_POTOCHKA = 4359;

export const SCETCH_ITEMS = {
    notSelected: "4693",            // не выбран
    notNeeded: "4567",              // не нужен
    pause: "4715",                  // ПАУЗА (отправить позже)
    needed: "4569",                 // нужен
    neededSent: "4613",             // нужен (отправлен)
    completed: "4571",              // выполнен
    completedSent: "4831",          // выполнен (отправлен)
    completedSigned: "4639",        // выполнен (подписан)
};

export const FIELD_TABLE = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1", 
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm75_1716718253",   // Шаблон поточки
    filter: "ufCrm75_1730291077",               // Для фильтра в Поточке

    sketch: "ufCrm75_1718036109",               // Эскиз
    sentToWorkshop: "ufCrm75_1718036424",       // Отправлено в цех

    linkClientDoc: "ufCrm75_1714708040",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm75_1714708181",      // Ссылка на документ для цеха

    isTechOk: "ufCrm75_1731471099",             // tech-OK
    dateOfTech: "ufCrm75_1731471164",           // Дата проверки tech

    deliveryCity: "ufCrm75_1714013762",         // Город доставки
    link: "ufCrm75_1714013734",                 // Ссылка на оригинал
    referencePoint: "ufCrm75_1714013745",       // Ориентир
    quantity: "ufCrm75_1714013775",             // Количество
    dirId: "ufCrm75_1714013703",                // ID папки с файлами
    isActive: "ufCrm75_1714013673",             // Товар активен
    isMeasured: "ufCrm75_1714013685",           // Замер нужен
    itemId: "ufCrm75_1714661765",               // ID товара
    itemPositionId: "ufCrm75_1714661802",       // ID товарной позиции
    itemPotochkaId: "ufCrm75_1716305089",       // ID_товар_поточка_вариация

    isExist: "ufCrm75_1714661717",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm75_1714661676",       // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm75_1718330303",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm75_1714839787",           // Поточка?
    calculationId: "ufCrm75_1714910362",        // Расчет
    deliveryToMSK: "ufCrm75_1716434662",        // Доставка до МСК

    createdBy: "ufCrm75_1715516669",
    updatedBy: "ufCrm75_1715516681",

    btnSave: "ufCrm75_1714991732",              // Кнопка "сохранить"
    btnRemove: "ufCrm75_1714991742",            // Кнопка "удалить"
    btnCopy: "ufCrm75_1714991754",              // Кнопка "копировать"

    // Столешница
    freeTitle: "ufCrm75_1714013792",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm75_1714013812",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm75_1714013823",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm75_1714013837",       // 1-Общие габариты (В.)
    countertopMaterial: "ufCrm75_1714013918",           // 1-Материал (столешница)
    countertopVeneer: "ufCrm75_1714014217",             // 1-Шпон | HPL (столешница)
    countertopColor:  "ufCrm75_1714014259",             // 1-Цвет (окраска) - столешница
    countertopRal:  "ufCrm75_1714014292",               // 1-RAL | NSC (столешница)
    countertopFoldMechanism: "ufCrm75_1714014371",      // 1-Механизм раскладывания (столешница)
    decor: "ufCrm75_1714014433",                        // 1-Декор (описывается в ручную)
    description: "ufCrm75_1714014454",                  // 1-Доп. Описание и комментарии

    // Опоры
    commonDimensionsWidth_2: "ufCrm75_1714014505",      // 2-Общие габариты (Ш.)
    commonDimensionsDepth_2: "ufCrm75_1714014521",      // 2-Общие габариты (Г.)
    commonDimensionsHeight_2: "ufCrm75_1714014534",     // 2-Общие габариты (В.)
    material_2: "ufCrm75_1714014569",                   // 2-Материал
    veneer_2: "ufCrm75_1714014687",                     // 2-Шпон
    color_2:  "ufCrm75_1714014714",                     // 2-Цвет (окраска)
    ral_2:  "ufCrm75_1714014735",                       // 2-RAL | NSC
    decor_2: "ufCrm75_1714014754",                      // 2-Декор (описывается в ручную)
    description_2: "ufCrm75_1714014766",                // 2-Доп. Описание и комментарии

    decorOnCountertop_3: "ufCrm75_1714014794",          // 3-Декор на столешнице
    descDecorOnCountertop_3: "ufCrm75_1714014904",      // 3-Описание декора на столешнице
    decorOnSupport_3: "ufCrm75_1714014934",             // 3-Декор на опоре
    descDecorOnSupport_3: "ufCrm75_1714014987",         // 3-Описание декора на опоре
    elementsUpholsteryFabric_3: "ufCrm75_1714015017",   // 3-Какие элементы в обивочной ткани
    upholsteryFabricCollection_3: "ufCrm75_1714015042", // 3-Коллекция и цвет обивочной ткани
    decor_3: "ufCrm75_1714015074",                      // 3-Декор (описывается в ручную)
    description_3: "ufCrm75_1714015091",                // 3-Доп. Описание и комментарии

    generalComments_4: "ufCrm75_1714015148",            // 4-Общие комментарии менеджера
    managerNotes_5: "ufCrm75_1714015173",               // 5-Замечание руководителя

    // Фотографии товара
    canvasMain: "ufCrm75_1714818036",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm75_1714013720", // Главное фото
    mainPhoto: "ufCrm75_1714818073",        // Главное фото

    canvas_1: "ufCrm75_1714661859",         // Полотно 1
    canvasScreen_1: "ufCrm75_1714661905",   // Скриншот полотна 1
    photo1_1: "ufCrm75_1714015180",         // Фото 3 ст1
    photo1_2: "ufCrm75_1714015195",         // Фото 4 ст 1
    photo1_3: "ufCrm75_1714015214",         // Фото 5 ст1
    photo1_4: "ufCrm75_1714015222",         // Фото 6 ст 1
    photo1_5: "ufCrm75_1714015234",         // Фото 7 ст 1
    photo1_6: "ufCrm75_1714015244",         // Фото 8 ст 1

    canvas_2: "ufCrm75_1714661970",         // Полотно 2
    canvasScreen_2: "ufCrm75_1714662008",   // Скриншот полотна 2
    photo2_1: "ufCrm75_1714015254",         // Фото 8 ст 2
    photo2_2: "ufCrm75_1714015263",         // Фото 9 ст 2
    photo2_3: "ufCrm75_1714015276",         // Фото 10 ст2
    photo2_4: "ufCrm75_1714015286",         // Фото 11 ст2
    photo2_5: "ufCrm75_1714015297",         // Фото 12 ст2
    photo2_6: "ufCrm75_1714015306",         // Фото 13 ст2

    canvas_3: "ufCrm75_1716711172",         // Полотно 3
    canvasScreen_3: "ufCrm75_1716711180",   // Скриншот полотна 3
    photo3_1: "ufCrm75_1716711196",         // Фото 8 ст3
    photo3_2: "ufCrm75_1716711211",         // Фото 9 ст3
    photo3_3: "ufCrm75_1716711222",         // Фото 10 ст3
    photo3_4: "ufCrm75_1716711231",         // Фото 11 ст3
    photo3_5: "ufCrm75_1716711241",         // Фото 12 ст3
    photo3_6: "ufCrm75_1716711252",         // Фото 13 ст3
};
