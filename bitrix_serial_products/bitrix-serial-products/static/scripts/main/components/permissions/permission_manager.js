// import {
//     SMART_GROUP_USERS_ID,
//     SMART_GROUP_USERS_FIELDS,
//     SMART_GROUP_FIELD_ID,
//     SP_FIELDS,
//     SMART_PERMISSION_ID,
//     SMART_PERMISSION_FIELDS,
// } from './parameters.js';
// import { ID_MSP, FIELD_MSP } from '../../parameters/sp_msp.js';
// import { ID_SOFA, FIELD_SOFA } from '../../parameters/sp_sofa.js';
// import { ID_ARMCHAIR, FIELD_ARMCHAIR } from '../../parameters/sp_armchair.js';
// import { ID_BED, FIELD_BED } from '../../parameters/sp_bed.js';
// import { ID_POUF, FIELD_POUF } from '../../parameters/sp_pouf.js';
// import { ID_MELOCHEVKA, FIELD_MELOCHEVKA } from '../../parameters/sp_melochevka.js';
// import { ID_NIGHTSTAND, FIELD_NIGHTSTAND } from '../../parameters/sp_nightstands.js';
// import { ID_TABLE, FIELD_TABLE } from '../../parameters/sp_table.js';
// import { ID_CHAIR, FIELD_CHAIR } from '../../parameters/sp_chair.js';


// import { Permissions } from './permission/permissions.js';
// import { GroupsUsers } from './users/group_users.js';
// import { GroupFields } from './fields/group_fields.js';
// import { UsersDocsPrinter } from './docs/docsprinter.js';
// // import { UsersAccessControlForBlokingCard } from './blocking_card/access_settings.js';
// import { UsersAccessControlForCalculation } from './calculation/access_settings.js';
// import { DealButtonsAccessControl } from './deal_buttons/settings.js';
// import { ProductFieldsBlockingAccessControl } from './product_card/settings.js';
// import { AccessControl } from './access_lead_app/access_control.js';

import AppUploadAccessManager from './app_upload_access_manager.js';
import AppUploadAccessControl from './app_upload_access_control.js'
import FotAccessManager from './fot_access_manager.js';
import FotAccessControl from './fot_access_control.js';

const ALLOWED_USERS = ['11789', '1', '351'];


export default class PermissionManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.appUploadManager = new AppUploadAccessManager(apiClient);
        this.appUploadAccessControl = new AppUploadAccessControl(apiClient);

        this.fotManager = new FotAccessManager(apiClient);
        this.fotAccessControl = new FotAccessControl(apiClient);

        this.btnEditPermission = document.getElementById('editPermission');
        this.permissionModal = document.getElementById('permissionModal');
    }

    async initialize() {
        this.appUploadManager.initialize();
        this.fotManager.initialize();

        this.currentUser = await this.getCurrentUser();
        // проверка доступа пользователя к приложению
        if (!this.appUploadManager.isAccess(this.currentUser?.ID)) {
            throw new Error('Access denied');
        }

        // проверка доступа пользователя к правам доступа
        if (!this.hasPermission()) {
            return;
        }

        this.users = await this.getUsers();
        this.appUploadAccessControl.initialize(this.users);
        this.fotAccessControl.initialize(this.users);
    }

    checkAppLoadPermission() {
        
    }

    hasPermission() {
        if (ALLOWED_USERS.includes(this.currentUser.ID)) {
            return true;
        }
        this.btnEditPermission.remove();
        this.permissionModal.remove();
        return false;
    }

    async getUsers() {
        let cmd = {
            users: `user.get?sort=ID&order=ASC`,
        };

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        const users = await this.getAllUsers(response?.result?.users);

        return users;
    }

    async getAllUsers(users) {
        if (!users || !users.length) {
            return;
        }

        let maxRequests = 5;
        const delayBetweenRequests = 1000;
        while (maxRequests >= 0) {
            const result = await this.apiClient.callMethod('user.get', {
                filter: { ">ID": users[users.length - 1]["ID"] }
            });
            users = users.concat(result);
            if (result.length < 50) {
                break;
            }
            --maxRequests;
            await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
        };

        return users;
    }

    async getCurrentUser() {
        return await this.apiClient.callMethodJS('user.current');
    }
}
