import { BaseAccessControl } from './base_control.js';


export default class AppUploadAccessControl extends BaseAccessControl {
    constructor(bx24) {
        const keyStorage = 'USERS_ACCESS';
        const tableId = 'tableUserAccessForAppUpload';
        const btnId = 'saveChangeUsersAccessForAppUpload';

        super(bx24, keyStorage, tableId, btnId);
    }
}
