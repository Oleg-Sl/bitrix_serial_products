
export class BaseAccessControl {
    constructor(bx24, keyStorage, tableId, btnId) {
        this.bx24 = bx24;

        this.table = document.querySelector(`#${tableId}`);
        this.tbody = this.table.querySelector('tbody');
        this.btnSave = document.querySelector(`#${btnId}`);

        
        this.key = keyStorage;
        this.users = null;
        this.chosenUsers = null;
    }

    async initialize(users) {
        this.users = users;
        this.btnSave.addEventListener('click', this.saveData.bind(this));
        this.chosenUsers = await this.getChosenUsers();
        this.render();
    }

    async getChosenUsers() {
        const userStr = await this.bx24.getSettingsApp(this.key) || '';
        return userStr.split(',');
    }

    initHandlers(tr) {
        const select = tr.querySelector('.permission-users-group');
        $(select).chosen().change((event) => {
            this.chosenUsers = $(select).val();
        });
    }

    render() {
        const tr = document.createElement('tr');
        tr.innerHTML = this.getRowHTML();
        this.tbody.append(tr);
        this.initHandlers(tr);
    }
    
    getRowHTML() {
        return `
            <td>
                <select class="permission-users-group w-100" name="states[]" multiple="multiple">
                    ${this.getOptionsUsers()}
                </select>
            </td>
        `;
    }

    getOptionsUsers() {
        let contentHTML = '';
        for (const user of this.users) {
            if (this.chosenUsers.includes(user.ID)) {
                contentHTML += `<option value="${user.ID}" selected>${user.LAST_NAME} ${user.NAME}</option>`;
            } else {
                contentHTML += `<option value="${user.ID}">${user.LAST_NAME} ${user.NAME}</option>`;
            }
        }
        return contentHTML;
    }

    async saveData() {
        const users = this.chosenUsers.join(',');
        const response = await this.bx24.setSettingsApp(this.key, users);
    }
};
