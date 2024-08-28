// Чек лист для ФОТ увеличения
import { ID_SOFA } from '../products/sofa.js'
import { ID_ARMCHAIR } from '../products/armchair.js';
import { ID_BED } from '../products/bed.js';
import { ID_POUF } from '../products/pouf.js';
import { ID_MSP } from '../products/msp.js';
import { ID_NIGHTSTAND } from '../products/nightstand.js';
import { ID_TABLE } from '../products/table.js';
import { ID_CHAIR } from '../products/chair.js';
import { ID_MELOCHEVKA } from '../products/melochevka.js';


export const ID_CHECKLIST_COMPLEXITY = 1052;


export const PRODUCT_TYPES_CHECKLIST_COMPLEXITY = {
    [ID_SOFA]: 4777,
    [ID_ARMCHAIR]: 4779,
    [ID_BED]: 4781,
    [ID_POUF]: 4783,
    [ID_MSP]: 4785,
    [ID_NIGHTSTAND]: 4787,
    [ID_TABLE]: 4789,
    [ID_CHAIR]: 4791,
    [ID_MELOCHEVKA]: 4835,
};


export const FIELD_CHECKLIST_COMPLEXITY = {
    title: 'title',                             // Название
    typeProduct: 'ufCrm95_1723644276',          // Тип изделия
    isQuestion: 'ufCrm95_1723802156',           // Показываем в блоке ВОПРОСЫ (является вопросом)
    question: 'ufCrm95_1723644347',             // Вопрос (виден в приложении)
    description: 'ufCrm95_1723649609',          // Описание вопроса
    descriptionAction: 'ufCrm95_1724770245',    // Описание действия
    show: 'ufCrm95_1723649746',                 // Показываем в блоке расчета (выводится в таблице расчета)

    coefficietnts: {
        development: 'ufCrm95_1723649624',          // Коэф. разработка, час
        saw: 'ufCrm95_1723649667',                  // Коэф. пилка, час
        assembly: 'ufCrm95_1723649684',             // Коэф. сборка, час
        foamProcessing: 'ufCrm95_1723802238',       // Коэф. ППУ, час
        sewing: 'ufCrm95_1723802260',               // Коэф. швейка, час
        upholstery: 'ufCrm95_1723802273',           // Коэф. обтяжка, час
        carpentry: 'ufCrm95_1723802296',            // Коэф. столярка, час
        carpentryAssembly: 'ufCrm95_1723802318',    // Коэф. столярка (сборка), час
        painting: 'ufCrm95_1723802358',             // Коэф. покраска, час
        paintingPreparation: 'ufCrm95_1723802379',  // Коэф. покраска (сборка), час
        // service
    }
};
