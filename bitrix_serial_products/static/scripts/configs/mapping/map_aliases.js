import { ID_MSP, FIELD_MSP } from '../products/msp.js';
import { ID_SOFA, FIELD_SOFA } from '../products/sofa.js';
import { ID_ARMCHAIR, FIELD_ARMCHAIR } from '../products/armchair.js';
import { ID_BED, FIELD_BED } from '../products/bed.js';
import { ID_POUF, FIELD_POUF } from '../products/pouf.js';
import { ID_MELOCHEVKA, FIELD_MELOCHEVKA } from '../products/melochevka.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND } from '../products/nightstand.js';
import { ID_TABLE, FIELD_TABLE } from '../products/table.js';
import { ID_CHAIR, FIELD_CHAIR } from '../products/chair.js';


const aliasMaps = {
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


function mapAliases(data) {
    const aliasMap = aliasMaps[data.entityTypeId];
    
    const result = {};
    for (const key in data) {
      if (aliasMap[key]) {
        result[aliasMap[key]] = data[key];
      } else {
        result[key] = data[key];
      }
    }
    return result;
}
  
export { mapAliases };
