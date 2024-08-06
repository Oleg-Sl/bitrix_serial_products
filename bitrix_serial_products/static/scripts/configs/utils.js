import { ID_ARMCHAIR, FIELD_ARMCHAIR, SCETCH_ITEMS as SCETCH_ITEMS_ARMCHAIR } from './products/armchair.js';
import { ID_BED, FIELD_BED, SCETCH_ITEMS as SCETCH_ITEMS_BED } from './products/bed.js';
import { ID_CHAIR, FIELD_CHAIR, SCETCH_ITEMS as SCETCH_ITEMS_CHAIR } from './products/chair.js';
import { ID_MELOCHEVKA, FIELD_MELOCHEVKA, SCETCH_ITEMS as SCETCH_ITEMS_MELOCHEVKA } from './products/melochevka.js';
import { ID_MSP, FIELD_MSP, SCETCH_ITEMS as SCETCH_ITEMS_MSP } from './products/msp.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND, SCETCH_ITEMS as SCETCH_ITEMS_NIGHTSTAND } from './products/nightstand.js';
import { ID_POUF, FIELD_POUF, SCETCH_ITEMS as SCETCH_ITEMS_POUF } from './products/pouf.js';
import { ID_SOFA, FIELD_SOFA, SCETCH_ITEMS as SCETCH_ITEMS_SOFA } from './products/sofa.js';
import { ID_TABLE, FIELD_TABLE, SCETCH_ITEMS as SCETCH_ITEMS_TABLE } from './products/table.js';



export function getProductConfig(productType) {
    switch (productType) {
        case 'armchair':
            return { title: 'Кресло', smartId: ID_ARMCHAIR, field: FIELD_ARMCHAIR };
        case 'bed':
            return { title: 'Кровать', smartId: ID_BED, field: FIELD_BED };
        case 'chair':
            return { title: 'Стул', smartId: ID_CHAIR, field: FIELD_CHAIR };
        case 'melochevka':
            return { title: 'Мелочевка', smartId: ID_MELOCHEVKA, field: FIELD_MELOCHEVKA };
        case 'msp':
            return { title: 'МСП', smartId: ID_MSP, field: FIELD_MSP };
        case 'nightstand':
            return { title: 'Тумбочка', smartId: ID_NIGHTSTAND, field: FIELD_NIGHTSTAND };
        case 'pouf':
            return { title: 'Пуф-банкетка', smartId: ID_POUF, field: FIELD_POUF };
        case 'sofa':
            return { title: 'Диван', smartId: ID_SOFA, field: FIELD_SOFA };
        case 'table':
            return { title: 'Стол', smartId: ID_TABLE, field: FIELD_TABLE };
        default:
            return null;
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
