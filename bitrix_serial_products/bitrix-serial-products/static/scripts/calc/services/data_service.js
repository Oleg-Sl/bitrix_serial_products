import { ID_MATERIALS, FIELD_MATERIALS } from '../../configs/calc/materials.js';
import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../configs/calc/coefficients.js';
import { ID_CHECKLIST_COMPLEXITY, PRODUCT_TYPES_CHECKLIST_COMPLEXITY, FIELD_CHECKLIST_COMPLEXITY } from '../../configs/calc/checklistcomplexity.js';
import { ID_FOT, FIELD_FOT } from '../../configs/calc/fot.js';
import { ID_COEFFICIENTS_FOT, PRODUCT_TYPES_COEFFICIENTS_FOT, FIELD_COEFFICIENTS_FOT } from '../../configs/calc/coefficientsfot.js';

import UserService from './users_service.js';
import ChecklistComplexityService from './checklistcomplexity_service.js';
import CoefficientsService from './coefficients_service.js';
import CoefficientsFotService from './coefficientsfot_service.js';
import FotService from './fot_service.js';
import MaterialsService from './materials_service.js';
import CalculationsService from './calculations_service.js';
import CalculationFieldsService from './calculationfields_service.js'
import Calculation from './calculation.js';


export default class DataService {
    constructor(apiClient, calcTypeId, calcFieldsAliases, productTypeId, productId, fabricManager) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldsAliases = calcFieldsAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.fabricManager = fabricManager;

        this.services = {
            fot: null,
            user: null,
            materials: null,
            coefficients: null,
            coefficientsFot: null,
            checklistcomplexity: null,
            calculationFields: null,
        };

        this.calculations = [];
    }

    async init() {
        const {
            materials, coefficients, checklistcomplexity,
            fot, coefficientsfot, calculationFields,
            calculations, otherCalculations, currentUser,
            users
        } = await this.fetchData();

        this.services.fot = new FotService(fot, `parentId${this.calcTypeId}`);
        this.services.user = new UserService(users, currentUser);
        this.services.materials = new MaterialsService(materials);
        this.services.coefficients = new CoefficientsService(coefficients);
        this.services.coefficientsFot = new CoefficientsFotService(coefficientsfot);
        this.services.checklistcomplexity = new ChecklistComplexityService(checklistcomplexity);
        this.services.calculationFields = new CalculationFieldsService(calculationFields, this.calcFieldsAliases);
        
        for (const calculation of calculations) {
            const calc = new Calculation(this.services, calculation, this.productTypeId);
            this.calculations.push(calc);
        }
    }

    getCalculations() {
        return this.calculations;
    }


    async fetchData() {
        const checklistcomplexityProductType = PRODUCT_TYPES_CHECKLIST_COMPLEXITY[this.productTypeId];
        const coefficientFotProductType = PRODUCT_TYPES_COEFFICIENTS_FOT[this.productTypeId];
        const cmd = {
            materials: `crm.item.list?entityTypeId=${ID_MATERIALS}`,
            coefficients: `crm.item.list?entityTypeId=${ID_COEFFICIENTS}`,
            checklistcomplexity: `crm.item.list?entityTypeId=${ID_CHECKLIST_COMPLEXITY}&filter[${FIELD_CHECKLIST_COMPLEXITY.typeProduct}]=${checklistcomplexityProductType}`,
            coefficientsfot: `crm.item.list?entityTypeId=${ID_COEFFICIENTS_FOT}&filter[${FIELD_COEFFICIENTS_FOT.typeProduct}]=${coefficientFotProductType}`,
            calculationFields: `crm.item.fields?entityTypeId=${this.calcTypeId}`,
            calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[parentId${this.productTypeId}]=${this.productId}`,
            fot: `crm.item.list?entityTypeId=${ID_FOT}&filter[parentId${this.productTypeId}]=${this.productId}`,
            fotFields: `crm.item.fields?entityTypeId=${ID_FOT}`,

            // other_calculations: `crm.item.list?entityTypeId=${this.calcTypeId}&filter[${fieldParent}]=${this.crmId}`,
        };

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });
        console.log('response = ', response);

        const materials = response?.result?.materials?.items || [];
        const coefficients = response?.result?.coefficients?.items?.[0] || {};
        const checklistcomplexity = response?.result?.checklistcomplexity?.items || [];
        const fot = response?.result?.fot?.items || [];
        const coefficientsfot = response?.result?.coefficientsfot?.items || [];
        const calculationFields = response?.result?.calculationFields?.fields || [];
        const calculations = response?.result?.calculations?.items || [];
        // this.otherCalculations = response?.result?.other_calculations?.items || [];

        const currentUser = await this.getCurrentUserFromBx24();
        const usersIds = calculations.map(calculation => calculation.createdBy);
        const users = await this.getUsersFromBx24(usersIds);
        users[currentUser.ID] = currentUser;

        return {
            materials: materials,
            coefficients: coefficients,
            checklistcomplexity: checklistcomplexity,
            fot: fot,
            coefficientsfot: coefficientsfot,
            calculationFields: calculationFields,
            calculations: calculations,
            currentUser: currentUser,
            users: users,
        }
    }

    async getCurrentUserFromBx24() {
        const response = await this.apiClient.callMethodJS('user.current', {});
        return response;
    }

    async getUsersFromBx24(userIds) {
        let users = {};
        let cmd = { current : `user.current` };
        userIds.forEach(userId => {
            cmd[userId] = `user.get?id=${userId}`;
        })
        
        const result = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });
        
        for (const userId in result?.result) {
            const user = Array.isArray(result?.result[userId]) ? result?.result[userId]?.[0] : result?.result[userId];
            users[user.ID] = user;
        }
        return users;
    }
}


















    // getCalculationsFullInfo() {
    //     const calculations = this.calculationsService.getCalculations();
    //     return calculations.map(calculation => this.getCalculationData(calculation));
    // }

    // getCalculationData(calculation) {
    //     const getFieldValue = (fieldAlias, defaultValue = '') => calculation?.[fieldAlias] || defaultValue;
    
    //     const createField = (fieldAlias, defaultValue = '', isFixed = false) => ({
    //         value: getFieldValue(fieldAlias, defaultValue),
    //         field: fieldAlias,
    //         isFixed
    //     });
    
    //     const calculationData = {
    //         id: calculation.id,
    //         title: getFieldValue(this.calcFieldsAliases?.title, ''),
    //         createdBy: this.userService.getUser(calculation?.createdBy),
    //         materials: this.getMaterialsData(calculation),
    //         dateOfCalculation: createField(this.calcFieldsAliases?.dateOfCalculation, ''),
    //         dateOfCalculationToday: createField(this.calcFieldsAliases?.dateOfCalculationToday, ''),
    //         constantExpenses: {
    //             ...createField(this.calcFieldsAliases?.constantExpenses, 0),
    //             coefficient: this.coefficientsService.getCoefficientByKey('constantCosts')
    //         },
    //         generalComment: createField(this.calcFieldsAliases?.generalComment, ''),
    //         cost: createField(this.calcFieldsAliases?.cost, 0),
    //         finalCalculation: createField(this.calcFieldsAliases?.finalCalculation, 'Y') === 'Y',
    //         totalMaterials: createField(this.calcFieldsAliases?.totalMaterials, 0),
    //         calculationFixed: createField(this.calcFieldsAliases?.calculationFixed, 0),
    //         work: {
    //             amount: createField(this.calcFieldsAliases?.totalWork?.amount, 0),
    //             comments: createField(this.calcFieldsAliases?.totalWork?.comments, '', false)
    //         },
    //         subcontractorWork: {
    //             amount: createField(this.calcFieldsAliases?.subcontractorWork?.amount, 0),
    //             comments: createField(this.calcFieldsAliases?.subcontractorWork?.comments, '', false)
    //         }
    //     };
    
    //     return calculationData;
    // }

    // getMaterialsData(calculation = this.calculationsService.getCalculations()[0]) {
    //     const materials = [];
    
    //     const getFieldValue = (fieldAlias, defaultValue = '') => calculation?.[fieldAlias] || defaultValue;
    
    //     const createField = (fieldAlias, defaultValue = '', isFixed = false) => ({
    //         value: getFieldValue(fieldAlias, defaultValue),
    //         field: fieldAlias,
    //         isFixed
    //     });
    
    //     for (const [fieldAlias, fieldData] of Object.entries(this.calcFieldsAliases)) {
    //         if (fieldData && (fieldData.type === 'material' || fieldData.type === 'fabric')) {
    //             const fieldDateOfCalculation = this.calcFieldsAliases?.dateOfCalculation;
    //             const title = this.calculationsService.getTitleField(fieldData.value);
    //             const coefficient = this.coefficientsService.getCoefficientByKey(fieldAlias);
    //             const price = this.getPriceByDate(fieldAlias, fieldData, calculation, calculation[fieldDateOfCalculation]);
    
    //             materials.push({
    //                 fields: fieldData,
    //                 title,
    //                 coefficient,
    //                 price,
    //                 value: createField(fieldData.value, 0, false),
    //                 amount: createField(fieldData.amount, 0, true),
    //                 comments: createField(fieldData.comments, '', false),
    //             });
    //         }
    //     }
    
    //     return materials;
    // }

    // getCoefficientsFot() {
    //     return this.coefficientsFotService.getCoefficients();
    // }
    
    // getQuestions() {
    //     return this.checklistcomplexityService.getCheckList();
    // }

    // getPriceByDate(fieldAlias, fields, calculation, dateTarget) {
    //     if ('price' in fields) {
    //         const fieldPrice = this.calcProductFields?.[fieldAlias]?.price;
    //         return { value: +calculation[fieldPrice] || 0, field: fields.price, isFixed: false };
    //     } else if (fields?.type === 'fabric') {
    //         let price = 0;
    //         switch (fields?.number) {
    //             // case 1:
    //             //     price = this.fabricManager.getFabricPrice1();
    //             //     break;
    //             // case 2:
    //             //     price = this.fabricManager.getFabricPrice2();
    //             //     break;
    //             // case 3:
    //             //     price = this.fabricManager.getFabricPrice3();
    //             //     break;
    //         }
    //         return { value: +price, isFixed: true };
    //     }

    //     const material = this.materialsService.getClosestMaterialPrice(fieldAlias, dateTarget);
    //     return { value: +material, isFixed: true };
    // }


// getCalculationData(calculation) {
//     const fieldDateOfCalculation = this.calcFieldsAliases?.dateOfCalculation;
//     const fieldDateOfCalculationToday = this.calcFieldsAliases?.dateOfCalculationToday;
//     const fieldConstantExpenses = this.calcFieldsAliases?.constantExpenses;
//     const fieldGeneralComment = this.calcFieldsAliases?.generalComment;
//     const fieldCost = this.calcFieldsAliases?.cost;
//     const filedFinalCalculation = this.calcFieldsAliases?.finalCalculation;
//     const fieldTotalMaterials = this.calcFieldsAliases?.totalMaterials
//     const fieldCalculationFixed = this.calcFieldsAliases?.calculationFixed;
//     const fieldTotalWorkAmount = this.calcFieldsAliases?.totalWork?.amount;
//     const fieldTotalWorkComments = this.calcFieldsAliases?.totalWork?.comments;
//     const fieldSubcontractorWorkAmount = this.calcFieldsAliases?.subcontractorWork?.amount;
//     const fieldSubcontractorWorkComments = this.calcFieldsAliases?.subcontractorWork?.comments;
//     const calculationData = {
//         id: calculation.id,
//         title: calculation?.title || '',
//         createdBy: this.userService.getUser(calculation?.createdBy),
//         materials: this.getMaterialsData(calculation),
//         dateOfCalculation: {
//             value: calculation[fieldDateOfCalculation] || '',
//             field: this.calcFieldsAliases.dateOfCalculation
//         },
//         dateOfCalculationToday: {
//             value: calculation[fieldDateOfCalculationToday] || '',
//             field: this.calcFieldsAliases.dateOfCalculationToday
//         },
//         constantExpenses: {
//             value: calculation[fieldConstantExpenses] || 0,
//             field: this.calcFieldsAliases.constantExpenses,
//             coefficient: this.coefficientsService.getCoefficientByKey('constantCosts')
//         },
//         generalComment: {
//             value: calculation[fieldGeneralComment] || '',
//             field: this.calcFieldsAliases.generalComment
//         },
//         cost: {
//             value: calculation[fieldCost] || 0,
//             field: this.calcFieldsAliases.cost
//         },
//         finalCalculation: {
//             value: calculation[filedFinalCalculation] === 'Y',
//             field: this.calcFieldsAliases.finalCalculation
//         },
//         totalMaterials: {
//             value: calculation[fieldTotalMaterials] || 0,
//             field: this.calcFieldsAliases.totalMaterials
//         },
//         calculationFixed: {
//             value: calculation[fieldCalculationFixed] || 0,
//             field: this.calcFieldsAliases.calculationFixed
//         },
//         work: {
//             amount: {
//                 value: calculation[fieldTotalWorkAmount] || 0,
//                 field: this.calcFieldsAliases?.totalWork?.amount,
//                 isFixed: false
//             },
//             comments: {
//                 value: calculation[fieldTotalWorkComments] || '',
//                 field: this.calcFieldsAliases?.totalWork?.comments,
//                 isFixed: false
//             },
//         },
//         subcontractorWork: {
//             amount: {
//                 value: calculation[fieldSubcontractorWorkAmount] || 0,
//                 field: this.calcFieldsAliases?.subcontractorWork?.amount,
//                 isFixed: false
//             },
//             comments: {
//                 value: calculation[fieldSubcontractorWorkComments] || '',
//                 field: this.calcFieldsAliases?.subcontractorWork?.comments,
//                 isFixed: false
//             },
//         }
//     };
//     return calculationData;
// }

// getMaterialsData(calculation) {
//     let materials = [];
//     for (const [fieldAlias, fieldData] of Object.entries(this.calcFieldsAliases)) {
//         if (typeof fieldData === 'object' && fieldData !== null && (fieldData?.type === 'material' || fieldData?.type === 'fabric')) {
//             const fieldValue = this.calcFieldsAliases?.[fieldAlias]?.value;
//             const fieldAmount = this.calcFieldsAliases?.[fieldAlias]?.amount;
//             const fieldComments = this.calcFieldsAliases?.[fieldAlias]?.comments;
//             const fieldDateOfCalculation = this.calcFieldsAliases?.dateOfCalculation;
//             materials.push({
//                 fields: fieldData,
//                 title: this.calculationsService.getTitleField(fieldData.value),
//                 coefficient: this.coefficientsService.getCoefficientByKey(fieldAlias),
//                 price: this.getPriceByDate(fieldAlias, fieldData, calculation, calculation[fieldDateOfCalculation]),
//                 value: { value: calculation[fieldValue] || 0, field: fieldData.value, isFixed: false },
//                 amount: { value: calculation[fieldAmount] || 0, field: fieldData.amount, isFixed: true },
//                 comments: { value: calculation[fieldComments] || '', field: fieldData.comments, isFixed: false },
//             });
//         }
//     }
//     return materials;
// }
