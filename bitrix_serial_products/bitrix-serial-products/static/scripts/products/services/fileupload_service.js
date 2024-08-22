
export default class FileUploadService {
    constructor(apiClient, portalUrl, productType, productId) {
        this.apiClient = apiClient;
        this.portalUrl = portalUrl;
        this.productType = productType;
        this.productId = productId;
    }

    async uploadPhoto(file, callback) {
        const base64 = await this.getBase64(file);
        const fName = file.name;
        const result = await callback([fName, base64]);
        return result;
    }

    async uploadFile(newData, field) {
        const result = await this.apiClient.callMethod('crm.item.update', {
            entityTypeId: this.productType,
            id: this.productId,
            fields: newData
        });
        this.dataManager.setProductData(field, result?.item?.[field]);
        const url = result?.item?.[field]?.urlMachine;
        return this.getPublicURL(url);
    }

    async getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const base64Data = event.target.result.split(',')[1];
                resolve(base64Data);
            };
    
            reader.onerror = (error) => {
                reject(error);
            };
    
            reader.readAsDataURL(file);
        });
    }

    getPublicURL(url) {
        return this.portalUrl + '/get-image/?url=' + encodeURIComponent(url);
    }
}
