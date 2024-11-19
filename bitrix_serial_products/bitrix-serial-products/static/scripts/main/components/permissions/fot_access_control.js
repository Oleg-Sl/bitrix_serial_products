import { BaseAccessControl } from './base_control.js';


export default class FotAccessControl extends BaseAccessControl {
    constructor(bx24) {
        const keyStorage = 'USERS_ACCESS_FOT';
        const tableId = 'tableUserAccessForCalcFot';
        const btnId = 'saveChangeUsersAccessForCalcFot';

        super(bx24, keyStorage, tableId, btnId);
    }
}


