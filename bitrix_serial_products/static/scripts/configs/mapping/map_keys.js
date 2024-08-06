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
    [ID_MSP]: swapKeysAndValues(FIELD_MSP),
    [ID_SOFA]: swapKeysAndValues(FIELD_SOFA),
    [ID_ARMCHAIR]: swapKeysAndValues(FIELD_ARMCHAIR),
    [ID_BED]: swapKeysAndValues(FIELD_BED),
    [ID_POUF]: swapKeysAndValues(FIELD_POUF),
    [ID_MELOCHEVKA]: swapKeysAndValues(FIELD_MELOCHEVKA),
    [ID_NIGHTSTAND]: swapKeysAndValues(FIELD_NIGHTSTAND),
    [ID_TABLE]: swapKeysAndValues(FIELD_TABLE),
    [ID_CHAIR]: swapKeysAndValues(FIELD_CHAIR),
};


function mapKeys(data) {
    const keyMap = keyMaps[data.entityTypeId];
  
    const result = {};
    for (const key in data) {
      if (keyMap[key]) {
        result[keyMap[key]] = data[key];
      } else {
        result[key] = data[key];
      }
    }
    return result;
}

function swapKeysAndValues(obj) {
    const swapped = {};
    for (const key in obj) {
      swapped[obj[key]] = key;
    }
    return swapped;
}

export { mapKeys };  
