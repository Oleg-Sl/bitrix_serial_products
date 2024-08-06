import { ID_MSP, FIELD_MSP } from '../../configs/products/msp.js';
import { ID_SOFA, FIELD_SOFA } from '../../configs/products/sofa.js';
import { ID_ARMCHAIR, FIELD_ARMCHAIR } from '../../configs/products/armchair.js';
import { ID_BED, FIELD_BED } from '../../configs/products/bed.js';
import { ID_POUF, FIELD_POUF } from '../../configs/products/pouf.js';
import { ID_MELOCHEVKA, FIELD_MELOCHEVKA } from '../../configs/products/melochevka.js';
import { ID_NIGHTSTAND, FIELD_NIGHTSTAND } from '../../configs/products/nightstand.js';
import { ID_TABLE, FIELD_TABLE } from '../../configs/products/table.js';
import { ID_CHAIR, FIELD_CHAIR } from '../../configs/products/chair.js';

import { ID_SPECIFIC_WEIGHT, FIELD_SPECIFIC_WEIGHT } from '../../configs/smart_process/specific_weight.js';


export default class PackedParameters {
    constructor(specificWeights) {
        this.specificWeights = specificWeights;
    }

    calcWidth(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Ш (общая)/1000
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_CHAIR:
                // Ш (общая)/1000
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_TABLE:
                // Ш (общая)/1000
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_BED:
                // Ш (изголовья)/1000
                return this.getNumber(product.commonDimensionsWidth_2) * 0.001;
            case ID_MSP:
                // Если Ш(общая) > 2500мм, то ставим 2,5м
                return this.getNumber(product.commonDimensionsWidth) > 2500 ? 2.5 : this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_SOFA:
                // Форума: Если Ш(общая) > 2500мм, то ставим 2,5м
                return this.getNumber(product.commonDimensionsWidth) > 2500 ? 2.5 : this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_POUF:
                // Ш (общая)/1000
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Ш (общая)/1000
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
        }
        return 0;
    }

    calcHeight(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // В (общая)/1000
                return this.getNumber(product.commonDimensionsHeight) * 0.001;
            case ID_CHAIR:
                // В (общая)/1000
                return this.getNumber(product.commonDimensionsHeight) * 0.001;
            case ID_TABLE:
                // (В (общая)/1000) + (В (столешница)/1000)
                return this.getNumber(product.commonDimensionsHeight) * 0.001 + this.getNumber(product.commonDimensionsHeight_2) * 0.001;
            case ID_BED:
                // (В(изголовья)*(В(царга)*2)/1000
                return 2 * this.getNumber(product.commonDimensionsHeight_2) * 0.001 * this.getNumber(product.commonDimensionsHeight_3) * 0.001;
            case ID_MSP:
                // Если Ш(общая) > 2500мм, то ставим 2,5м
                return this.getNumber(product.commonDimensionsHeight) * 0.001 > 2500 ? 2.5 : this.getNumber(product.commonDimensionsHeight) * 0.001;
            case ID_SOFA:
                return this.getHeightSofa(product);
            case ID_POUF:
                // В (общая)/1000
                return this.getNumber(product.commonDimensionsHeight) * 0.001;
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // В (общая)/1000
                return this.getNumber(product.commonDimensionsHeight) * 0.001;
        }
        return 0;
    }

    calcDepth(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Г (общая)/1000
                return this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_CHAIR:
                // Г (общая)/1000
                return this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_TABLE:
                // Г (общая)/1000
                return this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_BED:
                // Г (общая)/1000
                return this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_MSP:
                // Округляем до целого вверх (Ш/2500)*100 - ИСПРАВИТЬ Округляем до целого вверх (Ш/2500)/10
                return Math.ceil(this.getNumber(product.commonDimensionsWidth) / 2500 / 10);
            case ID_SOFA:
                // Если Г2> заполнено, то ставим это значение, Если нет, то Г(общая)
                return this.getNumber(product.depthOne) ? this.getNumber(product.depthOne) * 0.001 : this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_POUF:
                // Г (общая)/1000
                return this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Г (общая)/1000
                return this.getNumber(product.commonDimensionsDepth) * 0.001;
        }
        return 0;
    }

    calcSquareMeters(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Ш*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_CHAIR:
                // Ш*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_TABLE:
                //	Ш*Г (Столешка) + Ш*Г (Опора)
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001
                    + this.getNumber(product.commonDimensionsWidth_2) * 0.001 * this.getNumber(product.commonDimensionsDepth_2) * 0.001;
            case ID_BED:
                // Ш*В (Изголовья) + ((В (царга) * Г (общия))*2)+(В (царга) * Ш (общая))
                return this.getNumber(product.commonDimensionsWidth_2) * 0.001 * this.getNumber(product.commonDimensionsHeight_2) * 0.001 
                    + (this.getNumber(product.commonDimensionsHeight_3) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001) * 2
                    + this.getNumber(product.commonDimensionsHeight_3) * 0.001 *  this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_MSP:
                // Кв.м = Ш*В
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001;
            case ID_SOFA:
                return this.getSquareMetersSofa(product);
            case ID_POUF:
                // Ш*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Ш*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
        }
        return 0;
    }

    calcLinearMeters(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Ш
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_CHAIR:
                // Ш
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_TABLE:
                // Ш
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_BED:
                return 0;
            case ID_MSP:
                // Пог.м	Не расчитывается
                return 0;
            case ID_SOFA:
                return this.getLinearMetersSofa(product);
            case ID_POUF:
                // Ш
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Ш
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
        }
        return 0;
    }

    calcCubicCapacity(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Ш*В*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_CHAIR:
                // Ш*В*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_TABLE:
                // Ш*В*Г (Столешка) + Ш*В*Г (Опоры)
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001
                    + this.getNumber(product.commonDimensionsWidth_2) * 0.001 * this.getNumber(product.commonDimensionsHeight_2) * 0.001 * this.getNumber(product.commonDimensionsDepth_2) * 0.001;
            case ID_BED:
                // Ш*В*Г (Изголовья) + ((Т(царга)*В(царга)*(Г (общая) * 2)) + (Т(царга)*В(царга) * Ш (общая))
                return this.getNumber(product.commonDimensionsWidth_2) * 0.001 * this.getNumber(product.commonDimensionsHeight_2) * 0.001 * this.getNumber(product.commonDimensionsDepth_2) * 0.001
                    + 2 * this.getNumber(product.commonDimensionsWidth_3) * 0.001 * this.getNumber(product.commonDimensionsHeight_3) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001
                    + this.getNumber(product.commonDimensionsWidth_3) * 0.001 * this.getNumber(product.commonDimensionsHeight_3) * 0.001 * this.getNumber(product.commonDimensionsWidth) * 0.001;
            case ID_MSP:
                // Ш*В*0,01 (это фиксированное значение)
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001 * 0.01;
            case ID_SOFA:
                return this.getCubicCapacitySofa(product);
            case ID_POUF:
                // Ш*В*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Ш*В*Г
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
        }
        return 0;
    }

    calcWeight(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Куб * на поле. UF_CRM_33_1715486100
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersArmchair);
            case ID_CHAIR:
                // Куб * на поле. UF_CRM_33_1715487285
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersChair);
            case ID_TABLE:
                // Куб * на поле. UF_CRM_33_1715487170
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersTable);
            case ID_BED:
                // Куб * на поле. UF_CRM_33_1715486831
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersBed);
            case ID_MSP:
                // Куб * на поле. UF_CRM_33_1715484960
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersMsp);
            case ID_SOFA:
                // Куб * на поле. UF_CRM_33_1715485962
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersSofa);
            case ID_POUF:
                // Куб * на поле. UF_CRM_33_1715486308
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersPouf);
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Куб * на поле. UF_CRM_33_1715486997
                return this.calcCubicCapacity(product) * this.getSpecificWeights(FIELD_SPECIFIC_WEIGHT.weightSquareMetersNightstand);
        }
        return 0;
    }

    calcPlaces(product) {
        switch (+product.entityTypeId) {
            case ID_ARMCHAIR:
                // Берем данные из поля - UF_CRM_57_1713503292
                return this.getNumber(product.quantity);
            case ID_CHAIR:
                // Берем данные из поля - UF_CRM_77_1714055115
                return this.getNumber(product.quantity);
            case ID_TABLE:
                // Формула: UF_CRM_75_1714013775*2
                return 2 * this.getNumber(product.quantity);
            case ID_BED:
                // Всегда ставим 4 места
                return 4;
            case ID_MSP:
                // Формула (фиксированная): 1 места = 2кв. Формула: кв.м/2 = выводим целое значение (1,2 и т.д.)
                return Math.ceil(this.calcSquareMeters(product) / 2);
            case ID_SOFA:
                // Берем данные из поля - UF_CRM_53_1713497435 * на поле UF_CRM_53_1713501067
                // Формула: Пог.м / 2,5 - выводим целое число (в большую сторону)
                return Math.ceil(this.calcLinearMeters(product) / 2.5);
            case ID_POUF:
                // Берем данные из поля - UF_CRM_67_1713517848
                return this.getNumber(product.quantity);
            case ID_MELOCHEVKA:
                return 0;
            case ID_NIGHTSTAND:
                // Берем данные из поля - UF_CRM_73_1714011439
                return this.getNumber(product.quantity);
        }
        return 0;
    }

    getNumber(number) {
        const parsedNumber = parseInt(number, 10);
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    }
    
    getSpecificWeights(key) {
        return +this.specificWeights[key] || 0;
    }

    getHeightSofa(product) {
        switch (String(product.shape)) {
            case '3703':
                // Прямой - В(общая)
                return this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3705':
                // С оттоманкой - (Округление вверх до целого -((Ш+(Г1+Г3))-Г2)/2500)*В(общая)
                return Math.ceil((this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    / 2500
                    * this.getNumber(product.commonDimensionsHeight) * 0.001);
            case '3707':
                // Угловой - (Округление вверх до целого -((Ш+(Г1+Г3))-Г2)/2500)*В(общая)
                return Math.ceil((this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    / 2500
                    * this.getNumber(product.commonDimensionsHeight) * 0.001);
            case '3709':
                // П-образный - (Округление вверх до целого -((Ш+(Г1+Г3))-Г2)/2500)*В(общая)
                return Math.ceil((this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    / 2500
                    * this.getNumber(product.commonDimensionsHeight) * 0.001);
            case '3711':
                // Радиусный
                return this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3713':
                // Модульный
                return 0;
        }
        return 0;
    }

    getSquareMetersSofa(product) {
        switch (String(product.shape)) {
            case '3703':
                // Прямой - Ш(общая)*Г(общая)
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case '3705':
                // С оттоманкой - ((Ш+(Г1+Г3))-Г2)*Г2
                return (this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    * this.getNumber(product.depthTwo) * 0.001;
            case '3707':
                // Угловой - ((Ш+(Г1+Г3))-Г2)*Г2
                return (this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    * this.getNumber(product.depthTwo) * 0.001;
            case '3709':
                // П-образный - (Ш+Г1+Г3-Г2*2)*Г2
                return (this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - 2 * this.getNumber(product.depthTwo) * 0.001)
                    * this.getNumber(product.depthTwo) * 0.001;
            case '3711':
                // Радиусный - (Ш(общая)*1,2)*Г(общая)
                return 1.2 * this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001;
            case '3713':
                // Модульный
                return 0;
        }
        return 0;
    }

    getLinearMetersSofa(product) {
        switch (String(product.shape)) {
            case '3703':
                // Прямой - Ш
                return this.getNumber(product.commonDimensionsWidth) * 0.001;
            case '3705':
                // С оттоманкой - (Ш+(Г1+Г3))-Г2
                return this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001;
            case '3707':
                // Угловой - (Ш+(Г1+Г3))-Г2
                return this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001;
            case '3709':
                // П-образный - (Ш+(Г1+Г3))-(Г2*2)
                return this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - 2 * this.getNumber(product.depthTwo) * 0.001;
            case '3711':
                // Радиусный - Ш*1,2
                return 1.2 * this.getNumber(product.commonDimensionsWidth) * 0.001;
            case '3713':
                // Модульный
                return 0;
        }
        return 0;
    }

    getCubicCapacitySofa(product) {
        switch (String(product.shape)) {
            case '3703':
                // Прямой - Ш*В*Г (общие)
                return this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3705':
                // С оттоманкой - (((Ш+(Г1+Г3))-Г2)*Г2)*В(общая)
                return (this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    * this.getNumber(product.depthTwo) * 0.001
                    * this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3707':
                // Угловой - (((Ш+(Г1+Г3))-Г2)*Г2)*В(общая)
                return (this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - this.getNumber(product.depthTwo) * 0.001)
                    * this.getNumber(product.depthTwo) * 0.001
                    * this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3709':
                // П-образный - (Ш+Г1+Г3-Г2*2)*Г2*В(общая)
                return (this.getNumber(product.commonDimensionsWidth) * 0.001
                    + this.getNumber(product.depthOne) * 0.001
                    + this.getNumber(product.depthThree) * 0.001
                    - 2 * this.getNumber(product.depthTwo) * 0.001)
                    * this.getNumber(product.depthTwo) * 0.001
                    * this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3711':
                // Радиусный - (Ш(общая)*1,2)*Г(общая)*В(общая)
                return 1.2 * this.getNumber(product.commonDimensionsWidth) * 0.001 * this.getNumber(product.commonDimensionsDepth) * 0.001 * this.getNumber(product.commonDimensionsHeight) * 0.001;
            case '3713':
                // Модульный
                console.log("Модульный");
                return 0;
        }
        return 0;
    }
}
