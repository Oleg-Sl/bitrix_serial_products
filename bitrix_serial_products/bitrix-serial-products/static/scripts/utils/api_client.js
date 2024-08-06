
export default class ApiClient {
    constructor() {
        this.baseUrl = null;
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async init() {
        this.domain = await BX24.getDomain();
        this.baseUrl = await this.getSettingsApp('webhook');
        if (!this.baseUrl) {
            throw new Error('Webhook url not found');
        }
        console.log("domain = ", this.domain);
        console.log("baseUrl = ", this.baseUrl);
    }

    async setSettingsApp(key, value) {
        try {
            const result = await new Promise((resolve, reject) => {
                BX24.appOption.set(key, value, response => {
                    resolve(response);
                });
            });
            return result;
        } catch (error) {
            const errorMessage = `An error occurred in setSettingsAppByKey: ${error}`;
            return null;
        }
    }

    async getSettingsApp(key) {
        const value = await BX24.appOption.get(key);
        return value;
    }

    async openPath(path) {
        try {
            await new Promise((resolve, reject) => {
                BX24.openPath(path, (response) => {
                    resolve();
                });
            });
        } catch (error) {
            this.logError(`An error occurred in openPath: ${error}`);
        }
    }

    async callMethod(method, body) {
        const response = await fetch(`${this.baseUrl}${method}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();
        // console.log('result = ', result);
        return result?.result;
    }

    async callMethodJS(method, params = {}) {
        try {
            const result = await new Promise((resolve, reject) => {
                BX24.callMethod(method, params, response => {
                    if (response.status !== 200 || response.error()) {
                        const errorMessage = `${response.error()} (callMethod ${method}: ${JSON.stringify(params)})`;
                        this.logError(errorMessage);
                        reject(errorMessage);
                    }
                    resolve(response.data());
                });
            });

            return result;
        } catch (error) {
            const errorMessage = `An error occurred in callMethod: ${error}`;
            this.logError(errorMessage);
            return null;
        }
    }


    async uploadFile(folderId, file) {
        try {
            const base64Data = await this.readFileAsBase64(file);
            const result = await this.callMethod("disk.folder.uploadfile", {
                id: folderId,
                data: {
                    NAME: file.name
                },
                fileContent: base64Data,
                generateUniqueName: true
            });
            return result;
        } catch (error) {
            console.error('Error uploading file: ', error);
            throw error;
        }
    }

    async readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result.split(',')[1];
                resolve(base64Data);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    async loadFileToBase64FromUrl(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
    
            xhr.onload = () => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Data = reader.result.split(',')[1];
                    resolve(base64Data);
                };
                reader.onerror = () => {
                    reject(new Error('Ошибка при чтении данных из URL'));
                };
                reader.readAsDataURL(xhr.response);
            };
    
            xhr.onerror = () => {
                reject(new Error('Ошибка при загрузке данных из URL'));
            };
    
            xhr.send();
        });
    }

    async loadFileToBase64FromProxy(urlSrc) {
        const url = portalUrl + '/get-image/?url=' + encodeURIComponent(urlSrc);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
    
            xhr.onload = () => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Data = reader.result.split(',')[1];
                    resolve(base64Data);
                };
                reader.onerror = () => {
                    // reject(new Error('Ошибка при чтении данных из URL'));
                    reject();
                };
                reader.readAsDataURL(xhr.response);
            };
    
            xhr.onerror = () => {
                // reject(new Error('Ошибка при загрузке данных из URL'));
                reject();
            };
    
            xhr.send();
        });
    }
}
