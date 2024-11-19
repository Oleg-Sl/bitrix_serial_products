import { BaseAccessManager } from './base_manager.js';


export default class FotAccessManager extends BaseAccessManager {
    constructor(bx24) {
        super(bx24, 'USERS_ACCESS_FOT');
    }
};
