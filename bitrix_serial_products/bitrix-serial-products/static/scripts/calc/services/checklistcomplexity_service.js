import { ID_CHECKLIST_COMPLEXITY, FIELD_CHECKLIST_COMPLEXITY, PRODUCT_TYPES_CHECKLIST_COMPLEXITY } from '../../configs/calc/checklistcomplexity.js';


export default class ChecklistComplexityService {
    constructor(checklist) {
        this.checklist = checklist;
        console.log("checklist = ", this.checklist);
    }

    getCheckList() {
        // console.log(this.checklist);
        return this.checklist.map(item => this.mapCheckListItem(item))
    }

    mapCheckListItem(item) {
        return {
            title: item?.[FIELD_CHECKLIST_COMPLEXITY.title],
            showInQuestions: item?.[FIELD_CHECKLIST_COMPLEXITY.showInQuestions] === 'Y',
            showInApp: item?.[FIELD_CHECKLIST_COMPLEXITY.showInApp] === 'Y',
            description: item?.[FIELD_CHECKLIST_COMPLEXITY.description] === 'Y',
            showInCalc: item?.[FIELD_CHECKLIST_COMPLEXITY.showInCalc] === 'Y',
            coefficients: {
                development: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.development],
                saw: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.saw],
                assembly: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.assembly],
                foamProcessing: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.foamProcessing],
                sewing: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.sewing],
                upholstery: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.upholstery],
                carpentry: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.carpentry],
                carpentryAssembly: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.carpentryAssembly],
                painting: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.painting],
                paintingPreparation: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.paintingPreparation],
                // service: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.service],
            }
        };
    }

    // getCoefficientById(id) {
    //     return this.coefficients.find(coefficient => coefficient.id === id);
    // }

    // getCoefficientByKey(key) {
    //     const fieldInBx24 = FIELD_COEFFICIENTS?.[key]?.fieldId;
    //     if (!fieldInBx24) {
    //         return 1;
    //     }
    //     const coefficient = this.coefficients?.[fieldInBx24] || 1;
    //     return +coefficient;
    // }
}
