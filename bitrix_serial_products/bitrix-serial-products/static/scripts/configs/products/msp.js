export const ID_MSP = 172;

export const ITEM_ID_POTOCHKA = 4345;

export const SCETCH_ITEMS = {
    notSelected: "4679",            // не выбран
    notNeeded: "4531",              // не нужен
    pause: "4701",                  // ПАУЗА (отправить позже)
    needed: "4533",                 // нужен
    neededSent: "4599",             // нужен (отправлен)
    completed: "4535",              // выполнен
    completedSent: "4817",          // выполнен (отправлен)
    completedSigned: "4625",        // выполнен (подписан)
};

export const FIELD_MSP = {
    id: "id",
    entityTypeId: "entityTypeId",
    // productType: "ufCrm23_1706606771",  // Тип товара
    freeTitle: "ufCrm23_1707374226",    // Свободное название изделия

    // Поля блока общего для всех типов изделия 
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    parentId1: "parentId1",
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm23_1728261870",   // Шаблон поточки
    filter: "ufCrm23_1730290916",               // Для фильтра в Поточке

    sketch: "ufCrm23_1718035789",               // Эскиз
    sentToWorkshop: "ufCrm23_1718036578",       // Отправлено в цех

    linkClientDoc: "ufCrm23_1714708683",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm23_1714708692",      // Ссылка на документ для цеха

    isTechOk: "ufCrm23_1731470922",             // tech-OK
    dateOfTech: "ufCrm23_1731471281",           // Дата проверки tech

    isMeasured: "ufCrm23_1706958069",           // Замер нужен
    isActive: "ufCrm23_1706958090",             // Товар активен
    itemId: "ufCrm23_1714229941",               // ID товара
    itemPositionId: "ufCrm23_1714367534",       // ID товарной позиции
    itemPotochkaId: "ufCrm23_1716304870",       // ID_товар_поточка_вариация

    isExist: "ufCrm23_1714295164",                      // Товар создан (отображаются только созданные)
    productDescription: "ufCrm23_1714107731",           // Доп описание изделия (Видно в конце названия)
    productDescriptionStart: "ufCrm23_1718330057",      // Доп описание изделия (Видно в НАЧАЛЕ названия)
    isPotochka: "ufCrm23_1714839504",                   // Поточка?
    calculationId: "ufCrm23_1714909748",                // Расчет
    deliveryToMSK: "ufCrm23_1716434502",                // Доставка до МСК

    createdBy: "ufCrm23_1715516015",
    updatedBy: "ufCrm23_1715516039",

    btnSave: "ufCrm23_1714991412",              // Кнопка "сохранить"
    btnRemove: "ufCrm23_1714991418",            // Кнопка "удалить"
    btnCopy: "ufCrm23_1714991432",              // Кнопка "копировать"

    // Комментарии
    generalResponsibilityComments: "ufCrm23_1706606516",    // ОБЩИЕ КОММЕНТАРИИ ОТВЕТСТВЕННОГО
    managerNotes: "ufCrm23_1706606735",                     // ЗАМЕТКИ РУКОВОДИТЕЛЯ

    // Доставка
    deliveryCity: "ufCrm23_1706606550", // Город доставки
    quantity: "ufCrm23_1706606590",     // Количество
    
    // Себестоимость
    costPrice_1: "ufCrm23_1706606626", // МСП - Себестоимость - 1
    costPrice_2: "ufCrm23_1706606652", // МСП - Себестоимость - 2
    costPrice_3: "ufCrm23_1706606673", // МСП - Себестоимость - 3
    productionNotes_1: "ufCrm23_1706606694", // МСП - Комментарии Производства - 1
    productionNotes_2: "ufCrm23_1706606708", // МСП - Комментарии Производства - 2
    productionNotes_3: "ufCrm23_1706606717", // МСП - Комментарии Производства - 3

    // Блок - ОБЩИЕ ДАННЫЕ
    commonDimensionsWidth: "ufCrm23_1706603192",        // МСП - Общие габариты (Ш.)
    commonDimensionsHeight: "ufCrm23_1712408686",       // МСП - Общие габариты (В.)
    strictSizeCompliance: "ufCrm23_1706604821",         // МСП - Строгое соблюдение размера
    fasteningSystem: "ufCrm23_1706604922",              // МСП - Система крепежа
    hicknessPUT: "ufCrm23_1706605741",                  // МСП - Толщина ППУ панелей
    decorationDescription: "ufCrm23_1706605834",        // МСП - Описание декора и комментарии

    // Блок - Отличительные панели (ОТМЕЧАЮТСЯ НА ОСНОВНОМ ЭСКИЗЕ)
    decorationDescription_1: "ufCrm23_1706606119",      // МСП - Описание декора и комментарии - 1

    // Блок - Отличительные панели (ОТМЕЧАЮТСЯ НА ОСНОВНОМ ЭСКИЗЕ)
    decorationDescription_2: "ufCrm23_1706606454",         // МСП - Описание декора и комментарии - 2

    // ТКАНИ
    // Блок - ОБЩИЕ ДАННЫЕ
    upholsteryFabricCollection: "ufCrm23_1706605768",   // МСП - Коллекция и цвет обивочной ткани
    // Блок - Отличительные панели (ОТМЕЧАЮТСЯ НА ОСНОВНОМ ЭСКИЗЕ)
    upholsteryFabricCollection_1: "ufCrm23_1706605986", // МСП - Коллекция и цвет обивочной ткани - 1
     // Блок - Отличительные панели (ОТМЕЧАЮТСЯ НА ОСНОВНОМ ЭСКИЗЕ)
    upholsteryFabricCollection_2: "ufCrm23_1706606339",    // МСП - Коллекция и цвет обивочной ткани - 2 

    // Фотографии товара    
    canvasMain: "ufCrm23_1714817632",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm23_1706606863", // Главное фото
    mainPhoto: "ufCrm63_1714817489",        // Главное фото    

    canvas_1: "ufCrm23_1712992553",         // Полотно 1
    canvasScreen_1: "ufCrm23_1714229753",   // Скриншот полотна 1
    photo1_1: "ufCrm23_1706606980",         // Фото 3 ст1
    photo1_2: "ufCrm23_1706607130",         // Фото 4 ст 1
    photo1_3: "ufCrm23_1706607139",         // Фото 5 ст1
    photo1_4: "ufCrm23_1707373941",         // Фото 6 ст 1
    photo1_5: "ufCrm23_1714928607",         // Фото 6 ст 1
    photo1_6: "ufCrm23_1714928637",         // Фото 6 ст 1

    canvas_2: "ufCrm23_1712992603",         // Полотно 2
    canvasScreen_2: "ufCrm23_1714229777",   // Скриншот полотна 2
    photo2_1: "ufCrm23_1707374082",         // Фото 8 ст 2
    photo2_2: "ufCrm23_1713498087",         // Фото 9 ст 2
    photo2_3: "ufCrm23_1713498096",         // Фото 10 ст2
    photo2_4: "ufCrm23_1713498106",         // Фото 11 ст2
    photo2_5: "ufCrm23_1713498113",         // Фото 12 ст2
    photo2_6: "ufCrm23_1713498127",         // Фото 13 ст2

    canvas_3: "ufCrm23_1716710055",         // Полотно 3
    canvasScreen_3: "ufCrm23_1716710068",   // Скриншот полотна 3
    photo3_1: "ufCrm23_1716710092",         // Фото 8 ст3
    photo3_2: "ufCrm23_1716710108",         // Фото 9 ст3
    photo3_3: "ufCrm23_1716710130",         // Фото 10 ст3
    photo3_4: "ufCrm23_1716710141",         // Фото 11 ст3
    photo3_5: "ufCrm23_1716710151",         // Фото 12 ст3
    photo3_6: "ufCrm23_1716710164",         // Фото 13 ст3
};
