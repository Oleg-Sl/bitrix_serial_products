// ФОТ цеха (стыковка к расчету и изделию)


export const ID_FOT = 1048;


export const FIELD_FOT = {
  development: {
    title: "Разработка",
    estimatedAmount: "ufCrm93_1723537303",    // Разработка - расчетная сумма
    growthCoefficient: "ufCrm93_1723537342",  // Разработка - коэффициент роста
    finalAmount: "ufCrm93_1723537368",        // Разработка - итоговая сумма
    allocatedHours: "ufCrm93_1726817717",     // Разработка - выделено часов
    comment: "ufCrm93_1723537384"             // Разработка - комментарий
  },
  saw: {
    title: "Пилка",
    estimatedAmount: "ufCrm93_1723537408",    // Пилка - расчетная сумма
    growthCoefficient: "ufCrm93_1723537488",  // Пилка - коэффициент роста
    finalAmount: "ufCrm93_1723537594",        // Пилка - итоговая сумма
    allocatedHours: "ufCrm93_1726817766",     // Пилка - выделено часов
    comment: "ufCrm93_1723537693"             // Пилка - комментарий
  },
  assembly: {
    title: "Сборка",
    estimatedAmount: "ufCrm93_1723537429",    // Сборка - расчетная сумма
    growthCoefficient: "ufCrm93_1723537505",  // Сборка - коэффициент роста
    finalAmount: "ufCrm93_1723537613",        // Сборка - итоговая сумма
    allocatedHours: "ufCrm93_1726817832",     // Сборка - выделено часов
    comment: "ufCrm93_1723537710"             // Сборка - комментарий
  },
  foamProcessing: {
    title: "ППУ",
    estimatedAmount: "ufCrm93_1723537445",    // ППУ - расчетная сумма
    growthCoefficient: "ufCrm93_1723537521",  // ППУ - коэффициент роста
    finalAmount: "ufCrm93_1723537627",        // ППУ - итоговая сумма
    allocatedHours: "ufCrm93_1726817923",     // ППУ - выделено часов
    comment: "ufCrm93_1723537831"             // ППУ - комментарий
  },
  sewing: {
    title: "Швейка",
    estimatedAmount: "ufCrm93_1723537457",    // Швейка - расчетная сумма
    growthCoefficient: "ufCrm93_1723537538",  // Швейка - коэффициент роста
    finalAmount: "ufCrm93_1723537641",        // Швейка - итоговая сумма
    allocatedHours: "ufCrm93_1726817944",     // Швейка - выделено часов
    comment: "ufCrm93_1723537845"             // Швейка - комментарий
  },
  upholstery: {
    title: "Обтяжка",
    estimatedAmount: "ufCrm93_1723537469",    // Обтяжка - расчетная сумма
    growthCoefficient: "ufCrm93_1723537554",  // Обтяжка - коэффициент роста
    finalAmount: "ufCrm93_1723537654",        // Обтяжка - итоговая сумма
    allocatedHours: "ufCrm93_1726817965",     // Обтяжка - выделено часов
    comment: "ufCrm93_1723537861"             // Обтяжка - комментарий
  },

  // // ВРЕМЕЕНО!!!
  // painting: {
  //   title: "Покраска",
  //   estimatedAmount: "ufCrm93_1723537303",    // Разработка - расчетная сумма
  //   growthCoefficient: "ufCrm93_1723537342",  // Разработка - коэффициент роста
  //   finalAmount: "ufCrm93_1723537368",        // Разработка - итоговая сумма
  //   comment: "ufCrm93_1723537384"             // Разработка - комментарий
  // }

  carpentry: {
    title: "Столярка",
    estimatedAmount: "ufCrm93_1724602922",    // Столярка - расчетная сумма
    growthCoefficient: "ufCrm93_1724603020",  // Столярка - коэффициент роста
    finalAmount: "ufCrm93_1724603097",        // Столярка - итоговая сумма
    allocatedHours: "ufCrm93_1726817986",     // Столярка - выделено часов
    comment: "ufCrm93_1724603181"             // Столярка - комментарий
  },
  carpentryAssembly: {
    title: "Столярка (сборка)",
    estimatedAmount: "ufCrm93_1724602957",    // Столярка (сборка) - расчетная сумма
    growthCoefficient: "ufCrm93_1724603039",  // Столярка (сборка) - коэффициент роста
    finalAmount: "ufCrm93_1724603120",        // Столярка (сборка) - итоговая сумма
    allocatedHours: "ufCrm93_1726818006",     // Столярка (сборка) - выделено часов
    comment: "ufCrm93_1724603199"             // Столярка (сборка) - комментарий
  },
  paintingPreparation: {
    title: "Покраска (подготовка)",
    estimatedAmount: "ufCrm93_1724602974",    // Покраска (подготовка) - расчетная сумма
    growthCoefficient: "ufCrm93_1724603053",  // Покраска (подготовка) - коэффициент роста
    finalAmount: "ufCrm93_1724603138",        // Покраска (подготовка) - итоговая сумма
    allocatedHours: "ufCrm93_1726818054",     // Покраска (подготовка) - выделено часов
    comment: "ufCrm93_1724603218"             // Покраска (подготовка) - комментарий
  },
  painting: {
    title: "Покраска",
    estimatedAmount: "ufCrm93_1724602995",    // Покраска - расчетная сумма
    growthCoefficient: "ufCrm93_1724603075",  // Покраска - коэффициент роста
    finalAmount: "ufCrm93_1724603155",        // Покраска - итоговая сумма
    allocatedHours: "ufCrm93_1726818030",     // Покраска - выделено часов
    comment: "ufCrm93_1724603238"             // Покраска - комментарий
  }
};

  