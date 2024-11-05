// База для ФОТ цеха в изделии
import { ID_SOFA } from '../products/sofa.js'
import { ID_ARMCHAIR } from '../products/armchair.js';
import { ID_BED } from '../products/bed.js';
import { ID_POUF } from '../products/pouf.js';
import { ID_MSP } from '../products/msp.js';
import { ID_NIGHTSTAND } from '../products/nightstand.js';
import { ID_TABLE } from '../products/table.js';
import { ID_CHAIR } from '../products/chair.js';
import { ID_MELOCHEVKA } from '../products/melochevka.js';


export const ID_COEFFICIENTS_FOT = 1044;

// export const 

export const PRODUCT_TYPES_COEFFICIENTS_FOT = {
    [ID_SOFA]: 4741,
    [ID_ARMCHAIR]: 4743,
    [ID_BED]: 4745,
    [ID_POUF]: 4749,
    [ID_MSP]: 4747,
    [ID_NIGHTSTAND]: 4755,
    [ID_TABLE]: 4751,
    [ID_CHAIR]: 4753,
    [ID_MELOCHEVKA]: 4757,
};


export const FIELD_COEFFICIENTS_FOT = {
    typeProduct: "ufCrm91_1723471240",                  // Тип изделия
    baseCalculation: "ufCrm91_1723533874",              // Основа для расчета изделия
    baseMeasurementValue: "ufCrm91_1723538385",         // Значение измерения в примере
    averageWorkHoursPerMonth: "ufCrm91_1723447829",     // Средний показатель рабочих часов в месяц
    unitOfMeasurementForRate: "ufCrm91_1723471840",     // Единица измерения для базовой ставки

    development: {
        baseSalaryRate: "ufCrm91_1723471340",           // Базовая ставка ЗП для разработки
        baseTimeToProduce: "ufCrm91_1723471442",        // Базовое время изготовления изделия в разработке
        baseRatePerUnit: "ufCrm91_1723538793",          // Базовая ставка за единицу изделия в разработке
        costPerHour: "ufCrm91_1723650090",              // Стоимость часа работы в разработке
    },
    saw: {
        baseSalaryRate: "ufCrm91_1723531972",           // Базовая ставка ЗП для пилки
        baseTimeToProduce: "ufCrm91_1723532230",        // Базовое время изготовления изделия в пилке
        baseRatePerUnit: "ufCrm91_1723538878",          // Базовая ставка за единицу изделия в пилке
        costPerHour: "ufCrm91_1723795974"               // Стоимость часа работы в пилке
    },
    assembly: {
        baseSalaryRate: "ufCrm91_1723531994",           // Базовая ставка ЗП для сборки
        baseTimeToProduce: "ufCrm91_1723532247",        // Базовое время изготовления изделия в сборке
        baseRatePerUnit: "ufCrm91_1723538893",          // Базовая ставка за единицу изделия в сборке
        costPerHour: "ufCrm91_1723795992"               // Стоимость часа работы в сборке
    },
    foamProcessing: {
        baseSalaryRate: "ufCrm91_1723532009",           // Базовая ставка ЗП для обработки ППУ
        baseTimeToProduce: "ufCrm91_1723532265",        // Базовое время изготовления изделия в ППУ
        baseRatePerUnit: "ufCrm91_1723538912",          // Базовая ставка за единицу изделия в ППУ
        costPerHour: "ufCrm91_1723796015"               // Стоимость часа работы в ППУ
    },
    sewing: {
        baseSalaryRate: "ufCrm91_1723532021",           // Базовая ставка ЗП для пошива
        baseTimeToProduce: "ufCrm91_1723532286",        // Базовое время изготовления изделия в пошиве
        baseRatePerUnit: "ufCrm91_1723538943",          // Базовая ставка за единицу изделия в пошиве
        costPerHour: "ufCrm91_1723796031"               // Стоимость часа работы в пошиве
    },
    upholstery: {
        baseSalaryRate: "ufCrm91_1723532152",           // Базовая ставка ЗП для обтяжки
        baseTimeToProduce: "ufCrm91_1723532311",        // Базовое время изготовления изделия в обтяжке
        baseRatePerUnit: "ufCrm91_1723538960",          // Базовая ставка за единицу изделия в обтяжке
        costPerHour: "ufCrm91_1723796063",              // Стоимость часа работы в обтяжке
        staffCount: "ufCrm91_1723805679"                // Количество сотрудников в отделе обтяжки
    },
    carpentry: {
        baseSalaryRate: "ufCrm91_1723532172",           // Базовая ставка ЗП для столярки
        baseTimeToProduce: "ufCrm91_1723532468",        // Базовое время изготовления изделия в столярке
        baseRatePerUnit: "ufCrm91_1723796152",          // Базовая ставка за единицу изделия в столярке
        costPerHour: "ufCrm91_1723796124",              // Стоимость часа работы в столярке
    },
    carpentryAssembly: {
        baseSalaryRate: "ufCrm91_1723532785",           // Базовая ставка ЗП для столярной сборки
        baseTimeToProduce: "ufCrm91_1723533001",        // Базовое время изготовления изделия в столярной сборке
        baseRatePerUnit: "ufCrm91_1723796178",          // Базовая ставка за единицу изделия в столярной сборке
        costPerHour: "ufCrm91_1723796214"               // Стоимость часа работы в столярной сборке
    },
    painting: {
        baseSalaryRate: "ufCrm91_1723532965",           // Базовая ставка ЗП для покраски
        baseTimeToProduce: "ufCrm91_1723533569",        // Базовое время изготовления изделия при покраске
        baseRatePerUnit: "ufCrm91_1723796357",          // Базовая ставка за единицу изделия при покраске
        costPerHour: "ufCrm91_1723796378"               // Стоимость часа работы при покраске
    },
    paintingPreparation: {
        baseSalaryRate: "ufCrm91_1723532806",           // Базовая ставка ЗП для подготовки к покраске
        baseTimeToProduce: "ufCrm91_1723533524",        // Базовое время изготовления изделия при подготовке к покраске
        baseRatePerUnit: "ufCrm91_1723796301",          // Базовая ставка за единицу изделия при подготовке к покраске
        costPerHour: "ufCrm91_1723796273"               // Стоимость часа работы при подготовке к покраске
    },
    service: {
        baseSalaryRate: "ufCrm91_1723533591",           // Базовая ставка ЗП для отдела сервиса
        baseTimeToProduce: "ufCrm91_1723533624",        // Базовое время изготовления изделия в сервисе
        baseRatePerUnit: "ufCrm91_1723796440",          // Базовая ставка за единицу изделия в сервисе
        costPerHour: "ufCrm91_1723796404"               // Стоимость часа работы в сервисе
    },
    management: {
        baseSalaryRate: "ufCrm91_1723533810",           // Базовая ставка ЗП для руководителей
        costPerHour: "ufCrm91_1723533654"               // Стоимость часа работы для руководителей
    },
    rent: {
        baseSalaryRate: "ufCrm91_1723533843",           // Базовая ставка ЗП для аренды
        costPerHour: "ufCrm91_1723533687"               // Стоимость часа работы для аренды
    },
    packaging: {
        costPerUnit: "ufCrm91_1723797057",              // Стоимость упаковки за единицу изделия
        materialsIncluded: "ufCrm91_1723797096",        // Материалы, входящие в упаковку
        costPerHour: "ufCrm91_1723796404"               // Стоимость часа работы для упаковки
    }
};
