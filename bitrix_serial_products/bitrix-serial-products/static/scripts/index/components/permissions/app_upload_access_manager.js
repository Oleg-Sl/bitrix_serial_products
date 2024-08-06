import { BaseAccessManager } from './base_manager.js';


export default class AppUploadAccessManager extends BaseAccessManager {
    constructor(bx24) {
        super(bx24, 'USERS_ACCESS');
    }
};
