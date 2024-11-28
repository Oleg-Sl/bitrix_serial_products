import { FIELD_MECHANISMS } from '../../configs/smart_process/bed_mechanism.js';


export default class MechanismService {
    constructor(dataService) {
        this.dataService = dataService;

        this.mechanisms = this.dataService.getMechanisms();
    }

    getMechanisms() {
        if (!this.mechanisms || !Array.isArray(this.mechanisms)) {
            return [];
        }
        return this.mechanisms.map(item => {
            return {
                id: item[FIELD_MECHANISMS.id] || null,
                title: item[FIELD_MECHANISMS.title] || '',
                description: item[FIELD_MECHANISMS.description] || '',
            };
        });
    }

    getMechanismData(mechanismId) {
        return this.getMechanisms().find(item => item.id == mechanismId) || {}; 
    }
}
