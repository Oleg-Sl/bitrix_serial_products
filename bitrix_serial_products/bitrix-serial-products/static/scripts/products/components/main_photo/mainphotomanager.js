import Canvas from '../canvas/canvas.js';
import FileUploadService from '../../services/fileupload_service.js';


export default class MainPhotoManager {
    constructor(fileUploadService, productService, aspectRatio=(17.46/10.15)) {
        this.photoUploader = fileUploadService;
        this.productService = productService;
        this.aspectRatio = aspectRatio;

        this.productType = this.productService.getProductTypeId();
        this.productId = this.productService.getValue('id');
        this.smartFields = this.productService.getFieldMatching();
        console.log("this.smartFields = ", this.smartFields);
        
        this.canvas = new Canvas('canvasMain', this.getUrl.bind(this));

        this.fieldPhoto = this.productService.getFieldName('mainPhoto');
        this.container = document.querySelector('#canvasContainerMain');
        this.btnAddImage = this.container.querySelector('.btn-add-image');
        this.inputImgLoader = this.container.querySelector('.input-img-loader');

    }

    async initialize() {
        this.canvas.initSize(this.aspectRatio);
        const urlCanvasFile = this.productService.getValue('canvasMain')?.urlMachine;
        if (urlCanvasFile) {
            try {
                const data = await this.loadURLAndData(urlCanvasFile);
                await this.canvas.initData(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        this.btnAddImage.disabled = false;

        this.btnAddImage.addEventListener('click', () => { this.inputImgLoader.click(); });
        this.inputImgLoader.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.photoUploader.uploadFile({[this.fieldPhoto]: data}, this.fieldPhoto);
            });
            this.canvas.addImage(file, 0.0, 0.0, 1.0, 1.0, link, this.productService.getFieldName('mainPhoto'));
        });
    }

    getUrl(field) {
        const urlBx24 = this.productService.getValue(field)?.urlMachine;
        return this.photoUploader.getPublicURL(urlBx24);
    }

    getChangedData() {
        let changedData = {};
        const jsonData = this.canvas.getData();
        if (jsonData) {
            const base64ScreenShot = this.canvas.getScreenShot();
            const jsonString = JSON.stringify(jsonData);
            const base64Data = btoa(jsonString);
            changedData[this.smartFields.canvasMain] = [`${this.productType}_${this.productId}`, base64Data];
            changedData[this.smartFields.canvasScreenMain] = [`${this.productType}_${this.productId}.png`, base64ScreenShot];
        }
        console.log("changedData = ", changedData);
        return changedData;
    }

    resetChangedData() {
        this.canvas.resetChangedData();
    }

    initSize() {
        this.canvas.initSize(this.aspectRatio);
    }





    async loadDataByURL(url) {
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

    async loadURLAndData(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
    
            xhr.onload = () => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Data = reader.result.split(',')[1];
                    const jsonString = atob(base64Data);
                    const jsonData = JSON.parse(jsonString);
                    resolve(jsonData);
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

    async getCopyData() {
        let data = {};
        const jsonData = this.canvas.getAllData();
        if (jsonData) {
            const base64ScreenShot = this.canvas.getScreenShot();
            const jsonString = JSON.stringify(jsonData);
            const base64Data = btoa(jsonString);
            data[this.smartFields.canvasMain] = [`${this.productType}_${this.productId}.json`, base64Data];
            data[this.smartFields.canvasScreenMain] = [`${this.productType}_${this.productId}.png`, base64ScreenShot];
            const urlPhotoMain = this.productService.getValue('mainPhoto')?.urlMachine;
            if (urlPhotoMain) {
                const base64PhotoMain = await this.loadDataByURL(urlPhotoMain);
                data[this.smartFields.mainPhoto] = [`${this.productType}_${this.productId}.png`, base64PhotoMain];
            }
        }
        return data;
    }

    async getFileContent() {
        const base64ScreenShot = this.canvas.getScreenShot();
        return [`${this.productType}_${this.productId}.png`, base64ScreenShot];
    }
}
