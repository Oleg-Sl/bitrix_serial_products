export const ID_ARMCHAIR = 165;

export const ITEM_ID_POTOCHKA = 4351;

export const SCETCH_ITEMS = {
    notSelected: "4683",            // не выбран
    notNeeded: "4537",              // не нужен
    pause: "4705",                  // ПАУЗА (отправить позже)
    needed: "4539",                 // нужен
    neededSent: "4603",             // нужен (отправлен)
    completed: "4541",              // выполнен
    completedSent: "4821",          // выполнен (отправлен)
    completedSigned: "4629",        // выполнен (подписан)
};

export const FIELD_ARMCHAIR = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1",
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm57_1716716686",   // Шаблон поточки
    filter: "ufCrm57_1730290983",               // Для фильтра в Поточке

    sketch: "ufCrm57_1718035870",               // Эскиз
    sentToWorkshop: "ufCrm57_1718036536",       // Отправлено в цех

    linkClientDoc: "ufCrm57_1714708571",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm57_1714708580",      // Ссылка на документ для цеха

    isTechOk: "ufCrm57_1731470976",             // tech-OK
    dateOfTech: "ufCrm57_1731471248",           // Дата проверки tech
    isComDirOk: "ufCrm57_1732253380",           // Ком.дир-OK
    dateOfComDir: "ufCrm57_1732253651",         // Дата согласования ком.дир
    productVariationIds: "ufCrm57_1733073381",  // ID_вариации_каталога
    productMainId: "ufCrm57_1733204801",        // ID_головного товара

    deliveryCity: "ufCrm57_1713503260",             // Город доставки
    link: "ufCrm57_1713503175",                     // Ссылка на оригинал
    referencePoint: "ufCrm57_1713503212",           // Ориентир
    quantity: "ufCrm57_1713503292",                 // Количество
    dirId: "ufCrm57_1713503012",                    // ID папки с файлами
    isActive: "ufCrm57_1713502970",                 // Товар активен
    isMeasured: "ufCrm57_1713502994",               // Замер нужен
    itemId: "ufCrm57_1714229326",                   // ID товара
    itemPositionId: "ufCrm57_1714367422",           // ID товарной позиции
    itemPotochkaId: "ufCrm57_1716304988",           // ID_товар_поточка_вариация

    isExist: "ufCrm57_1714295032",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm57_1714369757557",    // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm57_1718330217",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm57_1714839659",               // Поточка?
    calculationId: "ufCrm57_1714909917",            // Расчет
    deliveryToMSK: "ufCrm57_1716434567",            // Доставка до МСК

    btnSave: "ufCrm57_1714990808",                  // Кнопка "сохранить"
    btnRemove: "ufCrm57_1714990826",                // Кнопка "удалить"
    btnCopy: "ufCrm57_1714990842",                  // Кнопка "копировать"

    filterNameCollection: "ufCrm57_1733553271",     // Фильтр - Название коллекии
    filterTags: "ufCrm57_1730290983",               // Фильтр - ТЕГИ

    createdBy: 'ufCrm57_1715516293',
    updatedBy: 'ufCrm57_1715516309',

    freeTitle: "ufCrm57_1713504224",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm57_1713504591",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm57_1713504619",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm57_1713504631",       // 1-Общие габариты (В.)
    supports: "ufCrm57_1713504663",                     // 1-Опоры
    supportColor: "ufCrm57_1713504745",                 // 1-Цвет опор
    supportHeight: "ufCrm57_1713504770",                // 1-Высота опор
    upholsteryFabricCollection: "ufCrm57_1713504806",   // 1-Коллекция и цвет обивочной ткани
    decorationDescription: "ufCrm57_1713504835",        // 1-Доп. описание и описание декора
    
    // Подлокотники
    // totalThickness_2: "ufCrm57_1713504867",             // 2-Общая толщина
    totalThickness_2: "ufCrm57_1716821262",             // 2-Общая толщина
    softnessWish_2: "ufCrm57_1713504895",               // 2-Пожелание по мягкости
    seamType_2: "ufCrm57_1713504908",                   // 2-Тип шва
    decorationDescription_2: "ufCrm57_1713505003",      // 2-Доп. описание и описание декора

    // Сидение
    totalThickness_3: "ufCrm57_1713505039",             // 3-Общая толщина
    plantingDepth_3: "ufCrm57_1713505053",              // 3-Глубина посадки
    plantingHeight_3: "ufCrm57_1713505067",             // 3-Высота посадки, мм
    agreedFillerOption_3: "ufCrm57_1713505099",         // 3-Согласованный вариант наполнителя
    useInFillers_3: "ufCrm57_1713505162",               // 3-Использовать в наполнители
    seamType_3: "ufCrm57_1713505253",                   // 3-Тип шва
    decorationDescription_3: "ufCrm57_1713505479",      // 3-Доп. описание и описание декора
    
    // Спинка
    // totalThickness_4: "ufCrm57_1713505536",             // 4-Общая толщина
    totalThickness_4: "ufCrm57_1716821300",             // 4-Общая толщина
    tiltAngle_4: "ufCrm57_1713505550",                  // 4-Угол наклона
    softnessWish_4: "ufCrm57_1713505564",               // 4-Пожелание по мягкости
    decorationDescription_4: "ufCrm57_1713505581",      // 4-Доп. описание и описание декора

    agreedFillerOption_5: "ufCrm57_1713505633",         // 5-Согласованный вариант наполнителя
    seamType_5: "ufCrm57_1713505350",                   // 5-Тип шва
    seamPitch_5: "ufCrm57_1713505880",                  // 5-Шаг шва
    cutType_5: "ufCrm57_1713505915",                    // 5-Тип кроя
    pillowSize1_5: "ufCrm57_1713506005",                // 5-Размер подушки (чистовой)-1
    pillowNumber1_5: "ufCrm57_1713506050",              // 5-Кол-во подушек - 1
    pillowSize2_5: "ufCrm57_1713506015",                // 5-Размер подушки (чистовой)-2
    pillowNumber2_5: "ufCrm57_1713506060",              // 5-Кол-во подушек - 2
    pillowSize3_5: "ufCrm57_1713506024",                // 5-Размер подушки (чистовой)-3
    pillowNumber3_5: "ufCrm57_1713506068",              // 5-Кол-во подушек - 3
    decorationDescription_5: "ufCrm57_1713506089",      // 5-Доп. описание и описание декора

    agreedFillerOption_6: "ufCrm57_1713506120",         // 6-Согласованный вариант наполнителя
    seamType_6: "ufCrm57_1713506163",                   // 6-Вид шва
    pillowSize1_6: "ufCrm57_1713506228",                // 6-Размер подушки (чистовой)-1
    pillowNumber1_6: "ufCrm57_1713506259",              // 6-Кол-во подушек - 1
    pillowSize2_6: "ufCrm57_1713506236",                // 6-Размер подушки (чистовой)-2
    pillowNumber2_6: "ufCrm57_1713506277",              // 6-Кол-во подушек - 2
    pillowSize3_6: "ufCrm57_1713506245",                // 6-Размер подушки (чистовой)-3
    pillowNumber3_6: "ufCrm57_1713506285",              // 6-Кол-во подушек - 3
    decorationDescription_6: "ufCrm57_1713506303",      // 6- Доп. описание и описание декора

    managerDescription_7: "ufCrm57_1713506336",         // 7-Дополнительное описание менеджера
    paintColor_7: "ufCrm57_1713506352",                 // 7-Цвет краски
    ral_7: "ufCrm57_1713506363",                        // 7-RAL | NSC
    treeType_7: "ufCrm57_1713506378",                   // 7-Сорт дерева
    veneer_7: "ufCrm57_1713506423",                     // 7- Шпон
    woodColorType_7: "ufCrm57_1713506554",              // 7-Тип окраски дерева
    glossiness_7: "ufCrm57_1713506614",                 // 7-Глянцевость
    metalCoatingType_7: "ufCrm57_1713506663",           // 7-Тип покрытия металла
    description_7: "ufCrm57_1713506711",                // 7-Доп.описание
    managerNotes_7: "ufCrm57_1713506724",               // 8-Замечание руководителя

    // Фотографии товара
    canvasMain: "ufCrm57_1714816791",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm57_1713503043", // Главное фото
    mainPhoto: "ufCrm57_1714816752",        // Главное фото    

    canvas_1: "ufCrm57_1714037623",         // Полотно 1
    canvasScreen_1: "ufCrm57_1714229423",   // Скриншот полотна 1
    photo1_1: "ufCrm57_1713504296",         // Фото 1 ст1
    photo1_2: "ufCrm57_1713504314",         // Фото 2 ст1
    photo1_3: "ufCrm57_1713504353",         // Фото 3 ст1
    photo1_4: "ufCrm57_1713504362",         // Фото 4 ст1
    photo1_5: "ufCrm57_1713504376",         // Фото 5 ст1
    photo1_6: "ufCrm57_1714928196",         // Фото 6 ст1

    canvas_2: "ufCrm57_1714037673",         // Полотно 2
    canvasScreen_2: "ufCrm57_1714229449",   // Скриншот полотна 2
    photo2_1: "ufCrm57_1713504386",         // Фото 1 ст2
    photo2_2: "ufCrm57_1713504397",         // Фото 2 ст2
    photo2_3: "ufCrm57_1713504410",         // Фото 3 ст2
    photo2_4: "ufCrm57_1713504459",         // Фото 4 ст2
    photo2_5: "ufCrm57_1713681000",         // Фото 5 ст2
    photo2_6: "ufCrm57_1713681019",         // Фото 6 ст2


    canvas_3: "ufCrm57_1716700893",         // Полотно 3
    canvasScreen_3: "ufCrm57_1716700909",   // Скриншот полотна 3
    photo3_1: "ufCrm57_1716700934",         // Фото 8 ст3
    photo3_2: "ufCrm57_1716700949",         // Фото 9 ст3
    photo3_3: "ufCrm57_1716700972",         // Фото 10 ст3
    photo3_4: "ufCrm57_1716700988",         // Фото 11 ст3
    photo3_5: "ufCrm57_1716701006",         // Фото 12 ст3
    photo3_6: "ufCrm57_1716701018",         // Фото 13 ст3
};
