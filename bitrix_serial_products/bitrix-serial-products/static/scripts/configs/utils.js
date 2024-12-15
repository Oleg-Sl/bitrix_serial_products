import { ID_ARMCHAIR, FIELD_ARMCHAIR, SCETCH_ITEMS as SCETCH_ITEMS_ARMCHAIR, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_ARMCHAIR } from './products/armchair.js';
import { ID_BED, FIELD_BED, SCETCH_ITEMS as SCETCH_ITEMS_BED, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_BED } from './products/bed.js';
import { ID_CHAIR, FIELD_CHAIR, SCETCH_ITEMS as SCETCH_ITEMS_CHAIR, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_CHAIR } from './products/chair.js';
import { ID_MELOCHEVKA, FIELD_MELOCHEVKA, SCETCH_ITEMS as SCETCH_ITEMS_MELOCHEVKA, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_MELOCHEVKA } from './products/melochevka.js';
import { ID_MSP, FIELD_MSP, SCETCH_ITEMS as SCETCH_ITEMS_MSP, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_MSP } from './products/msp.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND, SCETCH_ITEMS as SCETCH_ITEMS_NIGHTSTAND, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_NIGHTSTAND } from './products/nightstand.js';
import { ID_POUF, FIELD_POUF, SCETCH_ITEMS as SCETCH_ITEMS_POUF, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_POUF } from './products/pouf.js';
import { ID_SOFA, FIELD_SOFA, SCETCH_ITEMS as SCETCH_ITEMS_SOFA, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_SOFA } from './products/sofa.js';
import { ID_TABLE, FIELD_TABLE, SCETCH_ITEMS as SCETCH_ITEMS_TABLE, ITEM_ID_POTOCHKA as ITEM_ID_POTOCHKA_TABLE } from './products/table.js';
import { CALC_ID_ARMCHAIR, CALC_FIELD_ARMCHAIR } from './calc/sp_armchair.js';
import { CALC_ID_BED, CALC_FIELD_BED } from './calc/sp_bed.js';
import { CALC_ID_CHAIR, CALC_FIELD_CHAIR } from './calc/sp_chair.js';
import { CALC_ID_MELOCHEVKA, CALC_FIELD_MELOCHEVKA } from './calc/sp_melochevka.js';
import { CALC_ID_MSP, CALC_FIELD_MSP } from './calc/sp_msp.js';
import { CALC_ID_NIGHTSTAND, CALC_FIELD_NIGHTSTAND } from './calc/sp_nightstand.js';
import { CALC_ID_POUF, CALC_FIELD_POUF } from './calc/sp_pouf.js';
import { CALC_ID_SOFA, CALC_FIELD_SOFA } from './calc/sp_sofa.js';
import { CALC_ID_TABLE, CALC_FIELD_TABLE } from './calc/sp_table.js';


export function getProductConfig(productType) {
    switch (productType) {
        case 'armchair':
            return getProductConfigById(ID_ARMCHAIR);
            // return { title: 'Кресло', smartId: ID_ARMCHAIR, field: FIELD_ARMCHAIR, calcTypeId: CALC_ID_ARMCHAIR, calcFieldAlias: CALC_FIELD_ARMCHAIR };
        case 'bed':
            return getProductConfigById(ID_BED);
            // return { title: 'Кровать', smartId: ID_BED, field: FIELD_BED, calcTypeId: CALC_ID_BED, calcFieldAlias: CALC_FIELD_BED };
        case 'chair':
            return getProductConfigById(ID_CHAIR);
            // return { title: 'Стул', smartId: ID_CHAIR, field: FIELD_CHAIR, calcTypeId: CALC_ID_CHAIR, calcFieldAlias: CALC_FIELD_CHAIR };
        case 'melochevka':
            return getProductConfigById(ID_MELOCHEVKA);
            // return { title: 'Мелочевка', smartId: ID_MELOCHEVKA, field: FIELD_MELOCHEVKA, calcTypeId: CALC_ID_MELOCHEVKA, calcFieldAlias: CALC_FIELD_MELOCHEVKA };
        case 'msp':
            return getProductConfigById(ID_MSP);
            // return { title: 'МСП', smartId: ID_MSP, field: FIELD_MSP, calcTypeId: CALC_ID_MSP, calcFieldAlias: CALC_FIELD_MSP };
        case 'nightstand':
            return getProductConfigById(ID_NIGHTSTAND);
            // return { title: 'Тумбочка', smartId: ID_NIGHTSTAND, field: FIELD_NIGHTSTAND, calcTypeId: CALC_ID_NIGHTSTAND, calcFieldAlias: CALC_FIELD_NIGHTSTAND };
        case 'pouf':
            return getProductConfigById(ID_POUF);
            // return { title: 'Пуф-банкетка', smartId: ID_POUF, field: FIELD_POUF, calcTypeId: CALC_ID_POUF, calcFieldAlias: CALC_FIELD_POUF };
        case 'sofa':
            return getProductConfigById(ID_SOFA);
            // return { title: 'Диван', smartId: ID_SOFA, field: FIELD_SOFA, calcTypeId: CALC_ID_SOFA, calcFieldAlias: CALC_FIELD_SOFA };
        case 'table':
            return getProductConfigById(ID_TABLE);
            // return { title: 'Стол', smartId: ID_TABLE, field: FIELD_TABLE, calcTypeId: CALC_ID_TABLE, calcFieldAlias: CALC_FIELD_TABLE };
        default:
            return {};
    }
}


export function getProductConfigById(productTypeId) {
    switch (parseInt(productTypeId)) {
        case ID_ARMCHAIR:
            return { title: 'Кресло', smartId: ID_ARMCHAIR, field: FIELD_ARMCHAIR, calcTypeId: CALC_ID_ARMCHAIR, calcFieldAlias: CALC_FIELD_ARMCHAIR, potochkaId: ITEM_ID_POTOCHKA_ARMCHAIR, fieldIsPotochka: FIELD_ARMCHAIR.isPotochka, fieldIsTemplatePotochka: FIELD_ARMCHAIR.isTemplatePotochka };
        case ID_BED:
            return { title: 'Кровать', smartId: ID_BED, field: FIELD_BED, calcTypeId: CALC_ID_BED, calcFieldAlias: CALC_FIELD_BED, potochkaId: ITEM_ID_POTOCHKA_BED, fieldIsPotochka: FIELD_BED.isPotochka, fieldIsTemplatePotochka: FIELD_BED.isTemplatePotochka };
        case ID_CHAIR:
            return { title: 'Стул', smartId: ID_CHAIR, field: FIELD_CHAIR, calcTypeId: CALC_ID_CHAIR, calcFieldAlias: CALC_FIELD_CHAIR, potochkaId: ITEM_ID_POTOCHKA_CHAIR, fieldIsPotochka: FIELD_CHAIR.isPotochka, fieldIsTemplatePotochka: FIELD_CHAIR.isTemplatePotochka };
        case ID_MELOCHEVKA:
            return { title: 'Мелочевка', smartId: ID_MELOCHEVKA, field: FIELD_MELOCHEVKA, calcTypeId: CALC_ID_MELOCHEVKA, calcFieldAlias: CALC_FIELD_MELOCHEVKA, potochkaId: ITEM_ID_POTOCHKA_MELOCHEVKA, fieldIsPotochka: FIELD_MELOCHEVKA.isPotochka, fieldIsTemplatePotochka: FIELD_MELOCHEVKA.isTemplatePotochka };
        case ID_MSP:
            return { title: 'МСП', smartId: ID_MSP, field: FIELD_MSP, calcTypeId: CALC_ID_MSP, calcFieldAlias: CALC_FIELD_MSP, potochkaId: ITEM_ID_POTOCHKA_MSP, fieldIsPotochka: FIELD_MSP.isPotochka, fieldIsTemplatePotochka: FIELD_MSP.isTemplatePotochka };
        case ID_NIGHTSTAND:
            return { title: 'Тумбочка', smartId: ID_NIGHTSTAND, field: FIELD_NIGHTSTAND, calcTypeId: CALC_ID_NIGHTSTAND, calcFieldAlias: CALC_FIELD_NIGHTSTAND, potochkaId: ITEM_ID_POTOCHKA_NIGHTSTAND, fieldIsPotochka: FIELD_NIGHTSTAND.isPotochka, fieldIsTemplatePotochka: FIELD_NIGHTSTAND.isTemplatePotochka };
        case ID_POUF:
            return { title: 'Пуф-банкетка', smartId: ID_POUF, field: FIELD_POUF, calcTypeId: CALC_ID_POUF, calcFieldAlias: CALC_FIELD_POUF, potochkaId: ITEM_ID_POTOCHKA_POUF, fieldIsPotochka: FIELD_POUF.isPotochka, fieldIsTemplatePotochka: FIELD_POUF.isTemplatePotochka };
        case ID_SOFA:
            return { title: 'Диван', smartId: ID_SOFA, field: FIELD_SOFA, calcTypeId: CALC_ID_SOFA, calcFieldAlias: CALC_FIELD_SOFA, potochkaId: ITEM_ID_POTOCHKA_SOFA, fieldIsPotochka: FIELD_SOFA.isPotochka, fieldIsTemplatePotochka: FIELD_SOFA.isTemplatePotochka };
        case ID_TABLE:
            return { title: 'Стол', smartId: ID_TABLE, field: FIELD_TABLE, calcTypeId: CALC_ID_TABLE, calcFieldAlias: CALC_FIELD_TABLE, potochkaId: ITEM_ID_POTOCHKA_TABLE, fieldIsPotochka: FIELD_TABLE.isPotochka, fieldIsTemplatePotochka: FIELD_TABLE.isTemplatePotochka };
        default:
            return {};
    }
}

export function getFilterFields(productTypeId) {
    switch (parseInt(productTypeId)) {
        case ID_ARMCHAIR:
            return [
                { alias: 'filterNameCollection', title: 'Коллекция' },
                { alias: 'filterTags', title: 'Тег' },
            ];
        case ID_BED:
            return [
                { alias: 'filterNameCollection', title: 'Коллекция' },
                // { alias: 'filterTitle', title: 'Наименование' },
                // { alias: 'smp', title: 'СМП' },
                // { alias: 'liftingMechanism', title: 'Механизм' },
                // { alias: 'system', title: 'Система' },
                { alias: 'filterTags', title: 'Тег' },
            ];
        case ID_CHAIR:
            return [];
        case ID_MELOCHEVKA:
            return [];
        case ID_MSP:
            return [];
        case ID_NIGHTSTAND:
            return [];
        case ID_POUF:
            return [];
        case ID_SOFA:
            return [
                { alias: 'filterNameCollection', title: 'Коллекция' },
                { alias: 'shape', title: 'Форма' },
                { alias: 'filterMechanism', title: 'Механизм' },
                { alias: 'filterTags', title: 'Тег' },
            ];
        case ID_TABLE:
            return [];
        default:
            return {};
    }
    
}

// function getProductDescription(productType) {
//     if (productType == ID_MSP) {
//         return { code: 'msp', title: 'МСП' };
//     } else if(productType == ID_SOFA) {
//         return { code: 'sofa', title: 'Диван' };
//     } else if(productType == ID_ARMCHAIR) {
//         return { code: 'armchair', title: 'Кресло' };
//     } else if(productType == ID_BED) {
//         return { code: 'bed', title: 'Кровать' };
//     } else if(productType == ID_POUF) {
//         return { code: 'pouf', title: 'Пуф-банкетка' };
//     } else if(productType == ID_MELOCHEVKA) {
//         return { code: 'melochevka', title: 'Мелочевка' };
//     } else if(productType == ID_NIGHTSTAND) {
//         return { code: 'nightstand', title: 'Тумбочка' };
//     } else if(productType == ID_TABLE) {
//         return { code: 'table', title: 'Стол' };
//     } else if(productType == ID_CHAIR) {
//         return { code: 'chair', title: 'Стул' };
//     }
//     return { code: null, title: null };
// };

// function getProductFields(productType) {
//     if (productType == ID_MSP) {
//         return FIELD_MSP;
//     } else if(productType == ID_SOFA) {
//         return FIELD_SOFA;
//     } else if(productType == ID_ARMCHAIR) {
//         return FIELD_ARMCHAIR;
//     } else if(productType == ID_BED) {
//         return FIELD_BED;
//     } else if(productType == ID_POUF) {
//         return FIELD_POUF;
//     } else if(productType == ID_MELOCHEVKA) {
//         return FIELD_MELOCHEVKA;
//     } else if(productType == ID_NIGHTSTAND) {
//         return FIELD_NIGHTSTAND;
//     } else if(productType == ID_TABLE) {
//         return FIELD_TABLE;
//     } else if(productType == ID_CHAIR) {
//         return FIELD_CHAIR;
//     }
//     return {};
// };

// function getSketchItems(productType) {
//     if (productType == ID_MSP) {
//         return SCETCH_ITEMS_MSP;
//     } else if(productType == ID_SOFA) {
//         return SCETCH_ITEMS_SOFA;
//     } else if(productType == ID_ARMCHAIR) {
//         return SCETCH_ITEMS_ARMCHAIR;
//     } else if(productType == ID_BED) {
//         return SCETCH_ITEMS_BED;
//     } else if(productType == ID_POUF) {
//         return SCETCH_ITEMS_POUF;
//     } else if(productType == ID_MELOCHEVKA) {
//         return SCETCH_ITEMS_MELOCHEVKA;
//     } else if(productType == ID_NIGHTSTAND) {
//         return SCETCH_ITEMS_NIGHTSTAND;
//     } else if(productType == ID_TABLE) {
//         return SCETCH_ITEMS_TABLE;
//     } else if(productType == ID_CHAIR) {
//         return SCETCH_ITEMS_CHAIR;
//     }
//     return {};
// };

// export { getProductDescription, getProductFields, getSketchItems };
