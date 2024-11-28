import { ID_MSP, FIELD_MSP } from '../products/msp.js';
import { ID_SOFA, FIELD_SOFA } from '../products/sofa.js';
import { ID_ARMCHAIR, FIELD_ARMCHAIR } from '../products/armchair.js';
import { ID_BED, FIELD_BED } from '../products/bed.js';
import { ID_POUF, FIELD_POUF } from '../products/pouf.js';
import { ID_MELOCHEVKA, FIELD_MELOCHEVKA } from '../products/melochevka.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND } from '../products/nightstand.js';
import { ID_TABLE, FIELD_TABLE } from '../products/table.js';
import { ID_CHAIR, FIELD_CHAIR } from '../products/chair.js';


const keyMaps = {
    [ID_MSP]: FIELD_MSP,
    [ID_SOFA]: FIELD_SOFA,
    [ID_ARMCHAIR]: FIELD_ARMCHAIR,
    [ID_BED]: FIELD_BED,
    [ID_POUF]: FIELD_POUF,
    [ID_MELOCHEVKA]: FIELD_MELOCHEVKA,
    [ID_NIGHTSTAND]: FIELD_NIGHTSTAND,
    [ID_TABLE]: FIELD_TABLE,
    [ID_CHAIR]: FIELD_CHAIR,
};

const keyStrMaps = {
    msp: FIELD_MSP,
    sofa: FIELD_SOFA,
    armchair: FIELD_ARMCHAIR,
    bed: FIELD_BED,
    pouf: FIELD_POUF,
    melochevka: FIELD_MELOCHEVKA,
    nightstand: FIELD_NIGHTSTAND,
    table: FIELD_TABLE,
    chair: FIELD_CHAIR,
};


function getFieldInBx24(productTypeId, fieldAlias) {
    // console.log(productTypeId, fieldAlias);
    // console.log(keyMaps?.[productTypeId]);
    return keyMaps?.[productTypeId]?.[fieldAlias];  
}


export { getFieldInBx24 };  
