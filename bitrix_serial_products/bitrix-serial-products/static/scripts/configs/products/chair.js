export const ID_CHAIR = 150;

export const ITEM_ID_POTOCHKA = 4361;

export const SCETCH_ITEMS = {
    notSelected: "4691",            // не выбран
    notNeeded: "4561",              // не нужен
    pause: "4713",                  // ПАУЗА (отправить позже)
    needed: "4563",                 // нужен
    neededSent: "4611",             // нужен (отправлен)
    completed: "4565",              // выполнен
    completedSent: "4829",          // выполнен (отправлен)
    completedSigned: "4637",        // выполнен (подписан)
};

export const FRAME_VARIANTS = {
    woodSelfmade: "5459",           // Деревянный, делаем сами
    woodPurchased: "5461",          // Деревянный, покупаем готовый
    metalPurchased: "5463",         // Металлический, покупаем готовый
};

export const FIELD_CHAIR = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1", 
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm77_1728261767",   // Шаблон поточки
    filter: "ufCrm77_1730291060",               // Для фильтра в Поточке

    sketch: "ufCrm77_1718036074",               // Эскиз
    sentToWorkshop: "ufCrm77_1718036447",       // Отправлено в цех

    linkClientDoc: "ufCrm77_1714708767",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm77_1714708772",      // Ссылка на документ для цеха

    isTechOk: "ufCrm77_1731471083",             // tech-OK
    dateOfTech: "ufCrm77_1731471182",           // Дата проверки tech
    isComDirOk: "ufCrm77_1732253472",           // Ком.дир-OK
    dateOfComDir: "ufCrm77_1732253577",         // Дата согласования ком.дир

    deliveryCity: "ufCrm77_1714055105",         // Город доставки
    link: "ufCrm77_1714055075",                 // Ссылка на оригинал
    referencePoint: "ufCrm77_1714055087",       // Ориентир
    quantity: "ufCrm77_1714055115",             // Количество
    dirId: "ufCrm77_1714055052",                // ID папки с файлами
    isActive: "ufCrm77_1714055009",             // Товар активен
    isMeasured: "ufCrm77_1714055040",           // Замер нужен
    itemId: "ufCrm77_1714662166",               // ID товара
    itemPositionId: "ufCrm77_1714662208",       // ID товарной позиции
    itemPotochkaId: "ufCrm77_1716305073",       // ID_товар_поточка_вариация

    isExist: "ufCrm77_1714662133",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm77_1714662107",       // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm77_1718330289",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm77_1714839814",           // Поточка?
    calculationId: "ufCrm77_1714910084",        // Расчет
    deliveryToMSK: "ufCrm77_1716434643",        // Доставка до МСК

    btnSave: "ufCrm77_1714991120",              // Кнопка "сохранить"
    btnRemove: "ufCrm77_1714991144",            // Кнопка "удалить"
    btnCopy: "ufCrm77_1714991165",              // Кнопка "копировать"

    filterNameCollection: "ufCrm77_1733553532",     // Фильтр - Название коллекии
    filterTags: "ufCrm77_1730291060",               // Фильтр - ТЕГИ

    createdBy: "ufCrm77_1715516585",            // Кем создан
    updatedBy: "ufCrm77_1715516603",            // Кем обновлён

    freeTitle: "ufCrm77_1714055263",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm77_1714055274",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm77_1714055293",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm77_1714055303",       // 1-Общие габариты (В.)
    frameMaterial: "ufCrm77_1714055341",                // 1-Материал каркаса
    frameColor:  "ufCrm77_1714055664",                  // 1-Цвет (окраска)
    frameRal:  "ufCrm77_1714055680",                    // 1-RAL | NSC
    decor: "ufCrm77_1714055708",                        // 1-Декор (описывается в ручную)
    description: "ufCrm77_1714055718",                  // 1-Доп. Описание и комментарии

    backMaterial_2: "ufCrm77_1714055821",               // 2-Материал Спинки
    backVeneer_2: "ufCrm77_1714055966",                 // 2-Шпон
    backColor_2:  "ufCrm77_1714055987",                 // 2-Цвет (окраска)
    backRal_2:  "ufCrm77_1714055998",                   // 2-RAL | NSC

    seatMaterial_3: "ufCrm77_1714056018",               // 3-Материал Сидения
    seatVeneer_3: "ufCrm77_1714056192",                 // 3-Шпон
    seatColor_3:  "ufCrm77_1714056208",                 // 3-Цвет (окраска)
    seatRal_3:  "ufCrm77_1714056218",                   // 3-RAL | NSC

    accessories_4: "ufCrm77_1714056249",                // 4-Фурнитура
    upholsteryFabricCollection_4: "ufCrm77_1714056296", // 4-Коллекция и цвет обивочной ткани
    decor_4: "ufCrm77_1714056323",                      // 4-Декор (описывается в ручную)
    description_4: "ufCrm77_1714056334",                // 4-Доп. Описание и комментарии

    generalComments_5: "ufCrm77_1714056377",            // 5-Общие комментарии менеджера
    managerNotes_5: "ufCrm77_1714056390",               // 5-Замечание руководителя

    // Фотографии товара    
    canvasMain: "ufCrm77_1714817312",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm77_1714055062", // Главное фото
    mainPhoto: "ufCrm77_1714817336",        // Главное фото    

    canvas_1: "ufCrm77_1714055236",         // Полотно 1
    canvasScreen_1: "ufCrm77_1714662240",   // Скриншот полотна 1
    photo1_1: "ufCrm77_1714056402",         // Фото 3 ст1
    photo1_2: "ufCrm77_1714056425",         // Фото 4 ст 1
    photo1_3: "ufCrm77_1714056434",         // Фото 5 ст1
    photo1_4: "ufCrm77_1714056446",         // Фото 6 ст 1
    photo1_5: "ufCrm77_1714056455",         // Фото 7 ст 1
    photo1_6: "ufCrm77_1714056464",         // Фото 8 ст 1

    canvas_2: "ufCrm77_1714055246",         // Полотно 2
    canvasScreen_2: "ufCrm77_1714662303",   // Скриншот полотна 2
    photo2_1: "ufCrm77_1714056475",         // Фото 8 ст 2
    photo2_2: "ufCrm77_1714056485",         // Фото 9 ст 2
    photo2_3: "ufCrm77_1714056495",         // Фото 10 ст2
    photo2_4: "ufCrm77_1714056505",         // Фото 11 ст2
    photo2_5: "ufCrm77_1714056516",         // Фото 12 ст2
    photo2_6: "ufCrm77_1714056526",         // Фото 13 ст2

    canvas_3: "ufCrm77_1716701160",         // Полотно 3
    canvasScreen_3: "ufCrm77_1716701170",   // Скриншот полотна 3
    photo3_1: "ufCrm77_1716701183",         // Фото 8 ст3
    photo3_2: "ufCrm77_1716701198",         // Фото 9 ст3
    photo3_3: "ufCrm77_1716701209",         // Фото 10 ст3
    photo3_4: "ufCrm77_1716701222",         // Фото 11 ст3
    photo3_5: "ufCrm77_1716701235",         // Фото 12 ст3
    photo3_6: "ufCrm77_1716701248",         // Фото 13 ст3
};
