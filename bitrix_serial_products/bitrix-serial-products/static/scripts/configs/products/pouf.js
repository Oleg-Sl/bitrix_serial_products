export const ID_POUF = 167;

export const ITEM_ID_POTOCHKA = 4355;

export const SCETCH_ITEMS = {
    notSelected: "4695",            // не выбран
    notNeeded: "4573",              // не нужен
    pause: "4717",                  // ПАУЗА (отправить позже)
    needed: "4575",                 // нужен
    neededSent: "4615",             // нужен (отправлен)
    completed: "4577",              // выполнен
    completedSent: "4833",          // выполнен (отправлен)
    completedSigned: "4641",        // выполнен (подписан)
};

export const FIELD_POUF = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1",
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm67_1716718131",   // Шаблон поточки
    filter: "ufCrm67_1730291092",               // Для фильтра в Поточке

    sketch: "ufCrm67_1718036145",               // Эскиз
    sentToWorkshop: "ufCrm67_1718036378",       // Отправлено в цех

    linkClientDoc: "ufCrm67_1714708374",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm67_1714708390",      // Ссылка на документ для цеха

    isTechOk: "ufCrm67_1731471115",             // tech-OK
    dateOfTech: "ufCrm67_1731471130",           // Дата проверки tech
    isComDirOk: "ufCrm67_1732253509",           // Ком.дир-OK
    dateOfComDir: "ufCrm67_1732253523",         // Дата согласования ком.дир

    deliveryCity: "ufCrm67_1713517806",         // Город доставки
    link: "ufCrm67_1713517820",                 // Ссылка на оригинал
    referencePoint: "ufCrm67_1713517832",       // Ориентир
    quantity: "ufCrm67_1713517848",             // Количество
    dirId: "ufCrm67_1713517868",                // ID папки с файлами
    isActive: "ufCrm67_1713518055",             // Товар активен
    isMeasured: "ufCrm67_1713518068",           // Замер нужен
    itemId: "ufCrm67_1714232435",               // ID товара
    itemPositionId: "ufCrm67_1714367656",       // ID товарной позиции
    itemPotochkaId: "ufCrm67_1716305107",       // ID_товар_поточка_вариация

    isExist: "ufCrm67_1714295272",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm67_1714389015",       // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm67_1718330319",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm67_1714839736",           // Поточка?
    calculationId: "ufCrm67_1714910251",        // Расчет
    deliveryToMSK: "ufCrm67_1716434680",        // Доставка до МСК

    createdBy: "ufCrm67_1715516733",
    updatedBy: "ufCrm67_1715516756",

    btnSave: "ufCrm67_1714991630",              // Кнопка "сохранить"
    btnRemove: "ufCrm67_1714991637",            // Кнопка "удалить"
    btnCopy: "ufCrm67_1714991652",              // Кнопка "копировать"

    filterNameCollection: "ufCrm67_1733553623",     // Фильтр - Название коллекии
    filterTags: "ufCrm67_1730291092",               // Фильтр - ТЕГИ

    freeTitle: "ufCrm67_1713518136",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm67_1713518148",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm67_1713518155",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm67_1713518169",       // 1-Общие габариты (В.)
    supports: "ufCrm67_1713518193",                     // 1-Опоры
    supportColor: "ufCrm67_1713518253",                 // 1-Цвет опор
    ral: "ufCrm67_1713518286",                          // 1-RAL | NSC
    treeType: "ufCrm67_1713518316",                     // 1-Тип дерева
    woodColorType:  "ufCrm67_1713518379",               // 1-Тип окраски дерева
    glossiness: "ufCrm67_1713518431",                   // 1-Глянцевость
    metalCoatingType: "ufCrm67_1713518476",             // 1-Тип покрытия металла
    supportHeight: "ufCrm67_1713518541",                // 1-Высота опор
    hasBox: "ufCrm67_1713518573",                       // 1-Наличие ящика
    mechanism: "ufCrm67_1713518623",                    // 1-Механизм
    thicknessPerimeterPPU: "ufCrm67_1713518667",        // 1-Толщина ППУ по периметру
    seamType: "ufCrm67_1726481213",                     // Тип шва
    thicknessSeatPPU: "ufCrm67_1713518725",             // 1-Толщина ППУ по сидения
    upholsteryFabricCollection: "ufCrm67_1713518754",   // 1-Коллекция и цвет обивочной ткани
    decor: "ufCrm67_1713518816",                        // 1-Декор (описывается в ручную)
    managerDescription: "ufCrm67_1713518824",           // 1-Дополнительное описание менеджера
    
    generalCommentsResponsible_2: "ufCrm67_1714058177", // 2-Общие комментарии ответственного

    managerNotes_3: "ufCrm67_1713518899",               // 3-Замечание руководителя

    // Фотографии товара    
    canvasMain: "ufCrm67_1714817894",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm67_1713518917", // Главное фото
    mainPhoto: "ufCrm67_1714817905",        // Главное фото    
    
    canvas_1: "ufCrm67_1714057005",         // Полотно 1
    canvasScreen_1: "ufCrm67_1714232612",   // Скриншот полотна 1
    photo1_1: "ufCrm67_1713518940",         // Фото 3 ст1
    photo1_2: "ufCrm67_1713518950",         // Фото 4 ст 1
    photo1_3: "ufCrm67_1713518963",         // Фото 5 ст1
    photo1_4: "ufCrm67_1713518976",         // Фото 6 ст 1
    photo1_5: "ufCrm67_1713518991",         // Фото 6 ст 1
    photo1_6: "ufCrm67_1713519009",         // Фото 6 ст 1

    canvas_2: "ufCrm67_1714057050",         // Полотно 2
    canvasScreen_2: "ufCrm67_1714232698",   // Скриншот полотна 2
    photo2_1: "ufCrm67_1713519021",         // Фото 8 ст 2
    photo2_2: "ufCrm67_1713519031",         // Фото 9 ст 2
    photo2_3: "ufCrm67_1713519040",         // Фото 10 ст2
    photo2_4: "ufCrm67_1713681891",         // Фото 11 ст2
    photo2_5: "ufCrm67_1713681908",         // Фото 12 ст2
    photo2_6: "ufCrm67_1713681919",         // Фото 13 ст2

    canvas_3: "ufCrm67_1716710987",         // Полотно 3
    canvasScreen_3: "ufCrm67_1716710996",   // Скриншот полотна 3
    photo3_1: "ufCrm67_1716711009",         // Фото 8 ст3
    photo3_2: "ufCrm67_1716711026",         // Фото 9 ст3
    photo3_3: "ufCrm67_1716711035",         // Фото 10 ст3
    photo3_4: "ufCrm67_1716711047",         // Фото 11 ст3
    photo3_5: "ufCrm67_1716711059",         // Фото 12 ст3
    photo3_6: "ufCrm67_1716711070",         // Фото 13 ст3
};
