export const ID_NIGHTSTAND = 188;

export const ITEM_ID_POTOCHKA = 4357;

export const SCETCH_ITEMS = {
    notSelected: "4687",            // не выбран
    notNeeded: "4549",              // не нужен
    pause: "4709",                  // ПАУЗА (отправить позже)
    needed: "4551",                 // нужен
    neededSent: "4607",             // нужен (отправлен)
    completed: "4553",              // выполнен
    completedSent: "4825",          // выполнен (отправлен)
    completedSigned: "4633",        // выполнен (подписан)
};

export const FIELD_NIGHTSTAND = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1",
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm73_1719638118",   // Шаблон поточки
    filter: "ufCrm73_1730291022",               // Для фильтра в Поточке

    sketch: "ufCrm73_1718035964",               // Эскиз
    sentToWorkshop: "ufCrm73_1718036494",       // Отправлено в цех

    linkClientDoc: "ufCrm73_1714708330",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm73_1714708341",      // Ссылка на документ для цеха

    deliveryCity: "ufCrm73_1714011425",         // Город доставки
    link: "ufCrm73_1714011384",                 // Ссылка на оригинал
    referencePoint: "ufCrm73_1714011399",       // Ориентир
    quantity: "ufCrm73_1714011439",             // Количество
    dirId: "ufCrm73_1714011296",                // ID папки с файлами
    isActive: "ufCrm73_1714011255",             // Товар активен
    isMeasured: "ufCrm73_1714011274",           // Замер нужен
    itemId: "ufCrm73_1714230141",               // ID товара
    itemPositionId: "ufCrm73_1714367597",       // ID товарной позиции
    itemPotochkaId: "ufCrm73_1716305024",       // ID_товар_поточка_вариация

    isExist: "ufCrm73_1714295222",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm73_1714382640",       // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm73_1718330261",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm73_1714839761",           // Поточка?
    calculationId: "ufCrm73_1714910204",        // Расчет
    deliveryToMSK: "ufCrm73_1716434602",        // Доставка до МСК

    createdBy: "ufCrm73_1715516444",
    updatedBy: "ufCrm73_1715516459",

    btnSave: "ufCrm73_1714991521",              // Кнопка "сохранить"
    btnRemove: "ufCrm73_1714991531",            // Кнопка "удалить"
    btnCopy: "ufCrm73_1714991546",              // Кнопка "копировать"

    freeTitle: "ufCrm73_1714011680",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm73_1714011692",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm73_1714011704",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm73_1714011726",       // 1-Общие габариты (В.)
    frameMaterial: "ufCrm73_1714011823",                // 1-Материал каркаса
    frameVeneer: "ufCrm73_1714012080",                  // 1-Шпон
    frameColor:  "ufCrm73_1714012146",                  // 1-Цвет (окраска) - каркас
    frameRal:  "ufCrm73_1714012204",                    // 1-RAL | NSC - каркас    
    topMaterial: "ufCrm73_1714012271",                  // 1-Материал ТОП
    topVeneer: "ufCrm73_1714012376",                    // 1-Шпон ТОП
    topColor:  "ufCrm73_1714012393",                    // 1-Цвет (окраска) - ТОП
    topRal:  "ufCrm73_1714012407",                      // 1-RAL | NSC - ТОП
    facadeMaterial: "ufCrm73_1714012434",               // 1-Материал фасад
    facadeVeneer: "ufCrm73_1714012497",                 // 1-Шпон фасад
    facadeColor:  "ufCrm73_1714012517",                 // 1-Цвет (окраска) - фасад
    facadeRal:  "ufCrm73_1714012536",                   // 1-RAL | NSC - фасад
    decor: "ufCrm73_1714012575",                        // 1-Декор (описывается в ручную)
    description: "ufCrm73_1714012594",                  // 1-Доп. Описание и комментарии
    
    accessories_2: "ufCrm73_1714012617",                // 2-Фурнитура
    glazingDescription_2: "ufCrm73_1714012643",         // 2-Описание остекления
    openingHandle_2: "ufCrm73_1714012660",              // 2-Ручка открывания
    elementsUpholsteryFabric_2: "ufCrm73_1714012685",   // 2-Какие элементы в обивочной ткани
    upholsteryFabricCollection_2: "ufCrm73_1714012719", // 2-Коллекция и цвет обивочной ткани
    decor_2: "ufCrm73_1714012750",                      // 2-Декор (описывается в ручную)
    description_2: "ufCrm73_1714012780",                // 2-Доп. Описание и комментарии

    generalComments_3: "ufCrm73_1714013081",            // 3-Общие комментарии

    managerNotes_4: "ufCrm73_1714013325",               // 4-Замечание руководителя

    // Фотографии товара    
    canvasMain: "ufCrm73_1714817776",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm73_1714011366", // Главное фото
    mainPhoto: "ufCrm73_1714817791",        // Главное фото    

    canvas_1: "ufCrm73_1714011501",     // Полотно 1
    canvasScreen_1: "ufCrm73_1714230006",   // Скриншот полотна 1
    photo1_1: "ufCrm73_1714013354",     // Фото 3 ст1
    photo1_2: "ufCrm73_1714013372",     // Фото 4 ст 1
    photo1_3: "ufCrm73_1714013383",     // Фото 5 ст1
    photo1_4: "ufCrm73_1714013413",     // Фото 6 ст 1
    photo1_5: "ufCrm73_1714013428",     // Фото 7 ст 1
    photo1_6: "ufCrm73_1714013438",     // Фото 8 ст 1

    canvas_2: "ufCrm73_1714011544",         // Полотно 2
    canvasScreen_2: "ufCrm73_1714230049",   // Скриншот полотна 2
    photo2_1: "ufCrm73_1714013450",         // Фото 8 ст 2
    photo2_2: "ufCrm73_1714013460",         // Фото 9 ст 2
    photo2_3: "ufCrm73_1714013478",         // Фото 10 ст2
    photo2_4: "ufCrm73_1714013489",         // Фото 11 ст2
    photo2_5: "ufCrm73_1714013507",         // Фото 12 ст2
    photo2_6: "ufCrm73_1714013518",         // Фото 13 ст2

    canvas_3: "ufCrm73_1716710771",         // Полотно 3
    canvasScreen_3: "ufCrm73_1716710794",   // Скриншот полотна 3
    photo3_1: "ufCrm73_1716710808",         // Фото 8 ст3
    photo3_2: "ufCrm73_1716710822",         // Фото 9 ст3
    photo3_3: "ufCrm73_1716710834",         // Фото 10 ст3
    photo3_4: "ufCrm73_1716710855",         // Фото 11 ст3
    photo3_5: "ufCrm73_1716710866",         // Фото 12 ст3
    photo3_6: "ufCrm73_1716710877",         // Фото 13 ст3
};
