import {ID_COEFFICIENTS_FOT, PRODUCT_TYPES_COEFFICIENTS_FOT, FIELD_COEFFICIENTS_FOT } from '../../configs/calc/coefficientsfot.js';


export default class CoefficientsFotService {
    constructor(coefficientsList) {
        this.coefficients = coefficientsList;
    }

    getCoefficientById(id) {
        return this.coefficients.find(coefficient => coefficient.id === id);
    }

    getCoefficients() {
        return this.mapCoefficients();
    }

    mapCoefficients() {
        return {
            baseCalculation: this.coefficients[FIELD_COEFFICIENTS_FOT.baseCalculation] || 0,
            baseMeasurementValue: this.coefficients[FIELD_COEFFICIENTS_FOT.baseMeasurementValue] || 0,
            averageWorkHoursPerMonth: this.coefficients[FIELD_COEFFICIENTS_FOT.averageWorkHoursPerMonth] || 0,
            unitOfMeasurementForRate: this.coefficients[FIELD_COEFFICIENTS_FOT.unitOfMeasurementForRate] || 0,

            development: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.development.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.development.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.development.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.development.costPerHour] || 0,
            },
            saw: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.saw.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.saw.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.saw.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.saw.costPerHour] || 0,
            },
            assembly: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.assembly.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.assembly.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.assembly.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.assembly.costPerHour] || 0,
            },
            foamProcessing: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.foamProcessing.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.foamProcessing.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.foamProcessing.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.foamProcessing.costPerHour] || 0,
            },
            sewing: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.sewing.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.sewing.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.sewing.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.sewing.costPerHour] || 0,
            },
            upholstery: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.upholstery.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.upholstery.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.upholstery.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.upholstery.costPerHour] || 0,
            },
            carpentry: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentry.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentry.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentry.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentry.costPerHour] || 0,
            },
            carpentryAssembly: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentryAssembly.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentryAssembly.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentryAssembly.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.carpentryAssembly.costPerHour] || 0,
            },
            painting: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.painting.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.painting.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.painting.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.painting.costPerHour] || 0,
            },
            paintingPreparation: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.paintingPreparation.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.paintingPreparation.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.paintingPreparation.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.paintingPreparation.costPerHour] || 0,
            },
            service: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.service.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.service.baseTimeToProduce] || 0,
                baseRatePerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.service.baseRatePerUnit] || 0,
                costPerHour: this.coefficients[FIELD_COEFFICIENTS_FOT.service.costPerHour] || 0,
            },
            management: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.management.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.management.baseTimeToProduce] || 0,
            },
            rent: {
                baseSalaryRate: this.coefficients[FIELD_COEFFICIENTS_FOT.rent.baseSalaryRate] || 0,
                baseTimeToProduce: this.coefficients[FIELD_COEFFICIENTS_FOT.rent.baseTimeToProduce] || 0,
            },
            packaging: {
                costPerUnit: this.coefficients[FIELD_COEFFICIENTS_FOT.packaging.costPerUnit] || 0,
                materialsIncluded: this.coefficients[FIELD_COEFFICIENTS_FOT.packaging.materialsIncluded] || '',
            }
        }
    }
}
