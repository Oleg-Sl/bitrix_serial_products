export const ID_BED = 189;

export const ITEM_ID_POTOCHKA = 4347;
// export const ID_TEMPLATE_POTOCHKA_BED = ;

export const SCETCH_ITEMS = {
    notSelected: "4685",            // не выбран
    notNeeded: "4543",              // не нужен
    pause: "4707",                  // ПАУЗА (отправить позже)
    needed: "4545",                 // нужен
    neededSent: "4605",             // нужен (отправлен)
    completed: "4547",              // выполнен
    completedSent: "4823",          // выполнен (отправлен)
    completedSigned: "4631",        // выполнен (подписан)
};

export const FIELD_BED = {
    id: "id",
    createdTime: "createdTime",         // Когда создан
    updatedTime: "updatedTime",         // Когда обновлён
    // createdBy: "createdBy",             // Кем создан
    // updatedBy: "updatedBy",             // Кем обновлён
    entityTypeId: "entityTypeId",
    parentId1: "parentId1",
    parentId2: "parentId2",

    isTemplatePotochka: "ufCrm61_1728261687",   // Шаблон поточки
    filter: "ufCrm61_1730291004",               // Для фильтра в Поточке

    sketch: "ufCrm61_1718035927",               // Эскиз
    sentToWorkshop: "ufCrm61_1718036516",       // Отправлено в цех

    linkClientDoc: "ufCrm61_1714708496",        // Ссылка на документ для клиента
    linkWorkshopDoc: "ufCrm61_1714708506",      // Ссылка на документ для цеха

    isTechOk: "ufCrm61_1731471025",             // tech-OK
    dateOfTech: "ufCrm61_1731471233",           // Дата проверки tech
    isComDirOk: "ufCrm61_1732253409",           // Ком.дир-OK
    dateOfComDir: "ufCrm61_1732253633",         // Дата согласования ком.дир

    productVariationIds: "ufCrm61_1733073406",  // ID_вариации_каталога
    productMainId: "ufCrm61_1733204818",        // ID_головного товара

    deliveryCity: "ufCrm61_1713510730",         // Город доставки
    link: "ufCrm61_1713510684",                 // Ссылка на оригинал
    referencePoint: "ufCrm61_1713510703",       // Ориентир
    quantity: "ufCrm61_1713510965",             // Количество
    dirId: "ufCrm61_1713510398",                // ID папки с файлами
    isActive: "ufCrm61_1713510285",             // Товар активен
    isMeasured: "ufCrm61_1713510382",           // Замер нужен
    itemId: "ufCrm61_1714229153",               // ID товара
    itemPositionId: "ufCrm61_1714276490",       // ID товарной позиции
    itemPotochkaId: "ufCrm61_1716305002",       // ID_товар_поточка_вариация

    isExist: "ufCrm61_1714294942",                  // Товар создан (отображаются только созданные)
    productDescription: "ufCrm61_1714382435",       // Доп описание изделия (будет видно в наименовании товара)
    productDescriptionStart: "ufCrm61_1718330241",  // Доп описание изделия (Видно в НАЧАЛЕ названия)

    isPotochka: "ufCrm61_1714839559",           // Поточка?
    calculationId: "ufCrm61_1714909977",        // Расчет
    deliveryToMSK: "ufCrm61_1716434585",        // Доставка до МСК

    filterNameCollection: "ufCrm61_1732096195", // Фильтр - Название коллекии
    filterTitle: "ufCrm61_1732096195",          // Фильтр - Название
    filterTags: "ufCrm61_1730291004",           // Фильтр - ТЕГИ

    btnSave: "ufCrm61_1714990992",              // Кнопка "сохранить"
    btnRemove: "ufCrm61_1714991000",            // Кнопка "удалить"
    btnCopy: "ufCrm61_1714991021",              // Кнопка "копировать"

    createdBy: "ufCrm61_1715516369",            // Кем создан
    updatedBy: "ufCrm61_1715516390",            // Кем обновлён

    tzDevelopment: 'ufCrm61_1737287704',            // ТЗ-разработка
    tzSaw: 'ufCrm61_1737287860',                    // ТЗ-пилка
    tzAssembly: 'ufCrm61_1737287969',               // ТЗ-сборка
    tzPPU: 'ufCrm61_1737288100',                    // ТЗ-ппу
    tzSewing: 'ufCrm61_1737288259',                 // ТЗ-швейка
    tzCovering: 'ufCrm61_1737288364',               // ТЗ-обтяжка
    tzCarpentry: 'ufCrm61_1737288520',              // ТЗ-столярка
    tzGrinding: 'ufCrm61_1737288887',               // ТЗ-шлифовка
    tzMolar: 'ufCrm61_1737288963',                  // ТЗ-молярка
    tzPackage: 'ufCrm61_1737289103',                // ТЗ-упаковка
    tzDelivery: 'ufCrm61_1737289181',               // ТЗ-доставка

    // Основные данные
    freeTitle: "ufCrm61_1713511268",                    // 1-Свободное название изделия
    commonDimensionsWidth: "ufCrm61_1713511299",        // 1-Общие габариты (Ш.)
    commonDimensionsDepth: "ufCrm61_1713511307",        // 1-Общие габариты (Г.)
    commonDimensionsHeight: "ufCrm61_1713511318",       // 1-Общие габариты (В.)
    strictSize: "ufCrm61_1713511625",                   // 1-Строгое соблюдение размера
    orthopedicLattice:  "ufCrm61_1713511663",           // 1-Форма дивана
    smp: "ufCrm61_1713512412",                          // 1-СМП
    mattressHeight: "ufCrm61_1713512482",               // 1-Высота матраса
    mattressRecess: "ufCrm61_1713512541",               // 1-Углубление матраса
    liftingMechanism: "ufCrm61_1713512597",             // 1-Механизм подъема
    hasStorageBox: "ufCrm61_1713512938",                // 1-Наличие ящика для хранения
    system: "ufCrm61_1713513018",                       // 1-Система
    supports: "ufCrm61_1713513089",                     // 1-Опоры
    supportColor: "ufCrm61_1713513164",                 // 1-Цвет опор
    supportHeight: "ufCrm61_1713513178",                // 1-Высота опор
    decorationDescription: "ufCrm61_1713513213",        // 1-Доп. описание и описание декора

    // Изголовье
    commonDimensionsWidth_2: "ufCrm61_1713513409",      // 2-Общие габариты (Ш.)
    commonDimensionsDepth_2: "ufCrm61_1713513422",      // 2-Общие габариты (Г.)
    commonDimensionsHeight_2: "ufCrm61_1713513434",     // 2-Общие габариты (В.)
    thicknessPPU_2: "ufCrm61_1713513456",               // 2-Толщина ППУ
    seamType: "ufCrm61_1726218793",                     // 2-Тип шва
    upholsteryFabricCollection_2: "ufCrm61_1713513510", // 2-Коллекция и цвет обивочной ткани
    baseboardCutout_2: "ufCrm61_1713513572",            // 2-Вырез под плинтус
    baseboardHeight_2: "ufCrm61_1713513690",            // 2-Высота плинтуса
    sockets_2: "ufCrm61_1713513745",                    // 2-Розетки/включатели
    socketsNumber_2: "ufCrm61_1713513775",              // 2-Кол-во розеток/включателей
    decorationDescription_2: "ufCrm61_1713513815",      // 2-Доп. описание и описание декора
    
    // Царги
    commonDimensionsWidth_3: "ufCrm61_1713513869",      // 3-Общие габариты (T.)
    commonDimensionsHeight_3: "ufCrm61_1713513885",     // 3-Общие габариты (В.)
    facingTopDrawer_3: "ufCrm61_1713513911",            // 3-Обтачка по верху царги
    shapeCornerDrawer_3: "ufCrm61_1713514118",          // 3-Форма внешнего угла у царги
    thicknessPPU_3: "ufCrm61_1713514159",               // 3-Толщина ППУ
    case_3: "ufCrm61_1713514180",                       // 3-Чехол
    upholsteryFabricCollection_3: "ufCrm61_1713514220", // 3-Коллекция и цвет обивочной ткани
    decorationDescription_3: "ufCrm61_1713514250",      // 3-Доп. описание и описание декора
    
    managerDescription_4: "ufCrm61_1713514311",         // 4-Дополнительное описание менеджера
    managerNotes_5: "ufCrm61_1713514335",               // 5-Замечание руководителя


    // Фотографии товара    
    canvasMain: "ufCrm61_1714817167",       // Полотно - Главное фото
    canvasScreenMain: "ufCrm61_1713510411", // Главное фото
    mainPhoto: "ufCrm61_1714817197",        // Главное фото    

    canvas_1: "ufCrm61_1714044649",         // Полотно 1
    canvasScreen_1: "ufCrm61_1714228961",   // Скриншот полотна 1
    photo1_1: "ufCrm61_1713511110",         // Фото 3 ст1
    photo1_2: "ufCrm61_1713511126",         // Фото 4 ст 1
    photo1_3: "ufCrm61_1713511149",         // Фото 5 ст1
    photo1_4: "ufCrm61_1713511163",         // Фото 6 ст 1
    photo1_5: "ufCrm61_1714928424",         // Фото 6 ст 1
    photo1_6: "ufCrm61_1714928481",         // Фото 6 ст 1

    canvas_2: "ufCrm61_1714044682",         // Полотно 2
    canvasScreen_2: "ufCrm61_1714229003",   // Скриншот полотна 2
    photo2_1: "ufCrm61_1713511178",         // Фото 8 ст 2
    photo2_2: "ufCrm61_1713511189",         // Фото 9 ст 2
    photo2_3: "ufCrm61_1713511196",         // Фото 10 ст2
    photo2_4: "ufCrm61_1713511212",         // Фото 11 ст2
    photo2_5: "ufCrm61_1713511203",         // Фото 12 ст2
    photo2_6: "ufCrm61_1713681709",         // Фото 13 ст2

    canvas_3: "ufCrm61_1716700646",         // Полотно 3
    canvasScreen_3: "ufCrm61_1716700661",   // Скриншот полотна 3
    photo3_1: "ufCrm61_1716700677",         // Фото 8 ст3
    photo3_2: "ufCrm61_1716700696",         // Фото 9 ст3
    photo3_3: "ufCrm61_1716700707",         // Фото 10 ст3
    photo3_4: "ufCrm61_1716700721",         // Фото 11 ст3
    photo3_5: "ufCrm61_1716700740",         // Фото 12 ст3
    photo3_6: "ufCrm61_1716700762",         // Фото 13 ст3
};
