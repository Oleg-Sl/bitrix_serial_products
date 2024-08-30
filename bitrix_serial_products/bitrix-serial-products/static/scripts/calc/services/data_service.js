import { ID_MATERIALS, FIELD_MATERIALS } from '../../configs/calc/materials.js';
import { ID_COEFFICIENTS, FIELD_COEFFICIENTS } from '../../configs/calc/coefficients.js';
import { ID_CHECKLIST_COMPLEXITY, PRODUCT_TYPES_CHECKLIST_COMPLEXITY, FIELD_CHECKLIST_COMPLEXITY } from '../../configs/calc/checklistcomplexity.js';
import { ID_FOT, FIELD_FOT } from '../../configs/calc/fot.js';
import { ID_COEFFICIENTS_FOT, PRODUCT_TYPES_COEFFICIENTS_FOT, FIELD_COEFFICIENTS_FOT } from '../../configs/calc/coefficientsfot.js';

import UserService from './data/users.js';
import ChecklistComplexityService from './data/checklistcomplexity.js';
import CoefficientsService from './data/coefficients.js';
import CoefficientsFotService from './data/coefficientsfot.js';
import FotService from './data/fot.js';
import MaterialsService from './data/materials.js';
import CalculationsService from './data/calculations.js';
import CalculationFieldsService from './data/calculationfields.js'
import Calculation from './calculation.js';


export default class DataService {
    constructor(apiClient, calcTypeId, calcFieldsAliases, productTypeId, productId, eventEmitter, productNameRus, cbGetProductData) {
        this.apiClient = apiClient;
        this.calcTypeId = calcTypeId;
        this.calcFieldsAliases = calcFieldsAliases;
        this.productTypeId = productTypeId;
        this.productId = productId;
        this.productNameRus = productNameRus;
        this.cbGetProductData = cbGetProductData;
        this.eventEmitter = eventEmitter;

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
            const calc = new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, false, this.cbGetProductData);
            this.calculations.push(calc);
        }

        this.eventEmitter.on('changeMaterialPrice', this.changeMaterialPrice.bind(this));
        this.eventEmitter.on('changeMaterialComment', this.changeMaterialComment.bind(this));

        this.eventEmitter.on("answerQuestion", this.changeAnswerToQuestion.bind(this));
        
        this.eventEmitter.on('changeFotEstimate', this.changeFotEstimate.bind(this));
        this.eventEmitter.on('changeFotCoefficient', this.changeFotCoefficient.bind(this));
        this.eventEmitter.on('changeFotComment', this.changeFotComment.bind(this));

        this.eventEmitter.on('changeGeneralComment', this.changeGeneralComment.bind(this));
    }

    copyCalculation(calculationId) {
        const calculation = this.getCalculation(calculationId);
        let calculationData = calculation.getCalculationSmartData();
        calculationData.id = Date.now();
        const fotData = calculation.getFotSmartData(calculationData.id);
        return this.addCalculation(calculationData, fotData, true);
    }

    addCalculation(calculation, fot, isNewCalculation = false) {
        this.services.fot.addFot(fot);
        const calc = new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, isNewCalculation, this.cbGetProductData);
        this.calculations.push(calc);
        return calc;
    }

    addTempCalculation() {
        let calculation = {
            id: Date.now(),
            isTemporary: true,
        };
        const calc = new Calculation(this.services, calculation, this.productTypeId, this.productId, this.productNameRus, true, this.cbGetProductData);
        this.calculations.push(calc);
        return calc;
    }

    changeMaterialPrice(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeMaterialPrice(data.material, data.field, data.value);
        this.eventEmitter.emit('redrawCalcualation', calculation);
    }

    changeMaterialComment(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeMaterialComment(data.material, data.value);
    }

    changeAnswerToQuestion(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.answerQuestion(data.questionId, data.answer);
        this.eventEmitter.emit('changeStateQuestion', calculation);
    }

    changeGeneralComment(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeGeneralComment(data.value);
    }

    changeFotEstimate(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeFotEstimate(data.code, data.value);
        this.eventEmitter.emit('redrawCalcualation', calculation);
    }

    changeFotCoefficient(data) {
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeFotCoefficient(data.code, data.value);
        this.eventEmitter.emit('redrawCalcualation', calculation);
    }

    changeFotComment(data) {        
        const calculation = this.getCalculation(data.calculationId);
        calculation.changeFotComment(data.code, data.value);
    }

    resetStateOfQuestions() {
        this.services.checklistcomplexity.reset();
    }



    getCalculation(calculationId) {
        return this.calculations.find((item) => item.calculationId == calculationId);
    }
    
    getCalculations() {
        return this.calculations;
    }

    getDateOfAddingMaterials() {
        return this.services.materials.getLastDateOfAddingMaterials();
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
