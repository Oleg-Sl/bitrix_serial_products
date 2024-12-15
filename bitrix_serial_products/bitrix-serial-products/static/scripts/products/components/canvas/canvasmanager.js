import Canvas from './canvas.js';
import ControlPanel from './controlpanel.js';
// import PhotoUploader from './photo_uploader.js';


export default class CanvasManager {
    constructor(bx24, dataManager, photoUploader) {
        this.bx24 = bx24;
        this.dataManager = dataManager;
        this.photoUploader = photoUploader;

        this.portalUrl = portalUrl;

        this.productType = this.dataManager.getProductTypeId();
        this.productId = this.dataManager.getValue('id');
        this.smartFields = this.dataManager.getFieldMatching();
        
        this.container1 = document.querySelector('#canvasesContainer1');
        this.container2 = document.querySelector('#canvasesContainer2');
        this.outputMessage1 = this.container1.querySelector('.output-message');
        this.outputMessage2 = this.container2.querySelector('.output-message');

        this.canvas1 = new Canvas('canvas_1', this.getUrl.bind(this));
        this.canvas2 = new Canvas('canvas_2', this.getUrl.bind(this));
        this.controlPanel1 = new ControlPanel(
            this.container1,
            this.canvas1,
            this.photoUploader,
            this.smartFields.photo1_1,
            this.smartFields.photo1_2,
            this.smartFields.photo1_3,
            this.smartFields.photo1_4,
            this.smartFields.photo1_5,
            this.smartFields.photo1_6,
            this.uploadFile.bind(this),
            this.dataManager
        );
        this.controlPanel2 = new ControlPanel(
            this.container2,
            this.canvas2,
            this.photoUploader,
            this.smartFields.photo2_1,
            this.smartFields.photo2_2,
            this.smartFields.photo2_3,
            this.smartFields.photo2_4,
            this.smartFields.photo2_5,
            this.smartFields.photo2_6,
            this.uploadFile.bind(this),
            this.dataManager
        );
    }

    getChangedData() {
        let changedData = {};
        const jsonData1 = this.canvas1.getData();
        const jsonData2 = this.canvas2.getData();
        if (jsonData1) {
            const base64ScreenShot1 = this.canvas1.getScreenShot();
            const jsonString1 = JSON.stringify(jsonData1);
            const base64Data1 = this.utf8ToBase64(jsonString1);
            changedData[this.smartFields.canvas_1] = [`${this.productType}_${this.productId}`, base64Data1];
            changedData[this.smartFields.canvasScreen_1] = [`${this.productType}_${this.productId}.png`, base64ScreenShot1];
        }
        if (jsonData2) {
            const base64ScreenShot2 = this.canvas2.getScreenShot();
            const jsonString2 = JSON.stringify(jsonData2);
            const base64Data2 = this.utf8ToBase64(jsonString2);
            changedData[this.smartFields.canvas_2] = [`${this.productType}_${this.productId}`, base64Data2];
            changedData[this.smartFields.canvasScreen_2] = [`${this.productType}_${this.productId}.png`, base64ScreenShot2];
        }
        return changedData;
    }

    getUrl(field) {
        const urlBx24 = this.dataManager.getProductDataByFieldBx24(field)?.urlMachine;
        return this.getPublicURL(urlBx24);
    }

    resetChangedData() {
        this.canvas1.resetChangedData();
        this.canvas2.resetChangedData();
    }

    initSize() {
        this.canvas1.initSize(28.36/16.13);
        this.canvas2.initSize(28.36/16.13);
    }

    async initialize() {
        this.initSize();

        const urlCanvasFile1 = this.dataManager.getValue('canvas_1')?.urlMachine;
        const urlCanvasFile2 = this.dataManager.getValue('canvas_2')?.urlMachine;
        // console.log(this.dataManager.getValue('canvas_1'), this.dataManager.getValue('canvas_2'));

        if (urlCanvasFile1) {
            try {
                this.showMessage1('Загрузка данных...');
                const url1 = urlCanvasFile1;
                const base64Data1 = await this.bx24.loadFileToBase64FromUrl(url1);
                const jsonString1 = this.decodeBase64Data(base64Data1);
                const jsonData1 = JSON.parse(jsonString1);
                await this.canvas1.initData(jsonData1);
                this.showMessage1('');
            } catch (error) {
                this.showMessage1("Ошибка: ", error.message);
                console.error(error.message);
            }
        }

        if (urlCanvasFile2) {
            try {
                this.showMessage2('Загрузка данных...');
                const url2 = urlCanvasFile2;
                const base64Data2 = await this.bx24.loadFileToBase64FromUrl(url2);
                const jsonString2 = this.decodeBase64Data(base64Data2);
                const jsonData2 = JSON.parse(jsonString2);
                await this.canvas2.initData(jsonData2);
                this.showMessage2('');
            } catch (error) {
                this.showMessage2("Ошибка: ", error.message);
                console.error(error.message);
            }
        }

        this.controlPanel1.init();
        this.controlPanel2.init();
    }

    async addFabric(fabricLink, ind) {
        const link = this.getPublicURL(fabricLink);
        const url = link;
        const data = await this.bx24.loadFileToBase64FromUrl(url);
        this.canvas1.addImageFromBase64(data, 0.15 * ind, 0.0, 0.15, 0.15, link, `fabric${ind}`);
    }

    getPublicURL(url) {
        return this.portalUrl + '/get-image/?url=' + encodeURIComponent(url);
    }

    async uploadFile(newData, field) {
        const result = await this.bx24.callMethod('crm.item.update', {
            entityTypeId: this.productType,
            id: this.productId,
            fields: newData
        });
        console.log('field = ', field);
        this.dataManager.updateProductDataByField(field, result?.item?.[field]);
        const url = result?.item?.[field]?.urlMachine;
        return this.getPublicURL(url);
    }

    showMessage1(message='') {
        this.outputMessage1.value = message;
    }

    showMessage2(message='') {
        this.outputMessage2.value = message;
    }

    async getCopyData() {
        let data = {};
        const jsonData1 = this.canvas1.getAllData();
        const jsonData2 = this.canvas2.getAllData();
        if (jsonData1) {
            const base64ScreenShot1 = this.canvas1.getScreenShot();
            const jsonString1 = JSON.stringify(jsonData1);
            const base64Data1 = this.utf8ToBase64(jsonString1);
            const urlPhoto1_1 = this.dataManager.getValue('photo1_1')?.urlMachine;
            const urlPhoto1_2 = this.dataManager.getValue('photo1_2')?.urlMachine;
            const urlPhoto1_3 = this.dataManager.getValue('photo1_3')?.urlMachine;
            const urlPhoto1_4 = this.dataManager.getValue('photo1_4')?.urlMachine;
            const urlPhoto1_5 = this.dataManager.getValue('photo1_5')?.urlMachine;
            const urlPhoto1_6 = this.dataManager.getValue('photo1_6')?.urlMachine;

            if (urlPhoto1_1) {
                const base64Photo1_1 = await this.bx24.loadFileToBase64FromUrl(urlPhoto1_1);
                data[this.smartFields.photo1_1] = [`${this.productType}_${this.productId}.png`, base64Photo1_1];
            }
            if (urlPhoto1_2) {
                const base64Photo1_2 = await this.bx24.loadFileToBase64FromUrl(urlPhoto1_2);
                data[this.smartFields.photo1_2] = [`${this.productType}_${this.productId}.png`, base64Photo1_2];
            }
            if (urlPhoto1_3) {
                const base64Photo1_3 = await this.bx24.loadFileToBase64FromUrl(urlPhoto1_3);
                data[this.smartFields.photo1_3] = [`${this.productType}_${this.productId}.png`, base64Photo1_3];
            }
            if (urlPhoto1_4) {
                const base64Photo1_4 = await this.bx24.loadFileToBase64FromUrl(urlPhoto1_4);
                data[this.smartFields.photo1_4] = [`${this.productType}_${this.productId}.png`, base64Photo1_4];
            }
            if (urlPhoto1_5) {
                const base64Photo1_5 = await this.bx24.loadFileToBase64FromUrl(urlPhoto1_5);
                data[this.smartFields.photo1_5] = [`${this.productType}_${this.productId}.png`, base64Photo1_5];
            }
            if (urlPhoto1_6) {
                const base64Photo1_6 = await this.bx24.loadFileToBase64FromUrl(urlPhoto1_6);
                data[this.smartFields.photo1_6] = [`${this.productType}_${this.productId}.png`, base64Photo1_6];
            }
            data[this.smartFields.canvas_1] = [`${this.productType}_${this.productId}`, base64Data1];
            data[this.smartFields.canvasScreen_1] = [`${this.productType}_${this.productId}.png`, base64ScreenShot1];
            // console.log({
            //     "canvas_1": [`${this.productType}_${this.productId}`, base64Data1],
            //     "canvasScreen_1": [`${this.productType}_${this.productId}.png`, base64ScreenShot1],
            //     "photo1_1": urlPhoto1_1,
            //     "photo1_2": urlPhoto1_2,
            //     "photo1_3": urlPhoto1_3,
            //     "photo1_4": urlPhoto1_4,
            //     "photo1_5": urlPhoto1_5,
            //     "photo1_6": urlPhoto1_6
            // });
        }
        // console.log('data 1 = ', data);
        if (jsonData2) {
            const base64ScreenShot2 = this.canvas2.getScreenShot();
            const jsonString2 = JSON.stringify(jsonData2);
            const base64Data2 = this.utf8ToBase64(jsonString2);
            const urlPhoto2_1 = this.dataManager.getValue('photo2_1')?.urlMachine;
            const urlPhoto2_2 = this.dataManager.getValue('photo2_2')?.urlMachine;
            const urlPhoto2_3 = this.dataManager.getValue('photo2_3')?.urlMachine;
            const urlPhoto2_4 = this.dataManager.getValue('photo2_4')?.urlMachine;
            const urlPhoto2_5 = this.dataManager.getValue('photo2_5')?.urlMachine;
            const urlPhoto2_6 = this.dataManager.getValue('photo2_6')?.urlMachine;
            if (urlPhoto2_1) {
                const base64Photo2_1 = await this.bx24.loadFileToBase64FromUrl(urlPhoto2_1);
                data[this.smartFields.photo2_1] = [`${this.productType}_${this.productId}.png`, base64Photo2_1];
            }
            if (urlPhoto2_2) {
                const base64Photo2_2 = await this.bx24.loadFileToBase64FromUrl(urlPhoto2_2);
                data[this.smartFields.photo2_2] = [`${this.productType}_${this.productId}.png`, base64Photo2_2];
            }
            if (urlPhoto2_3) {
                const base64Photo2_3 = await this.bx24.loadFileToBase64FromUrl(urlPhoto2_3);
                data[this.smartFields.photo2_3] = [`${this.productType}_${this.productId}.png`, base64Photo2_3];
            }
            if (urlPhoto2_4) {
                const base64Photo2_4 = await this.bx24.loadFileToBase64FromUrl(urlPhoto2_4);
                data[this.smartFields.photo2_4] = [`${this.productType}_${this.productId}.png`, base64Photo2_4];
            }
            if (urlPhoto2_5) {
                const base64Photo2_5 = await this.bx24.loadFileToBase64FromUrl(urlPhoto2_5);
                data[this.smartFields.photo2_5] = [`${this.productType}_${this.productId}.png`, base64Photo2_5];
            }
            if (urlPhoto2_6) {
                const base64Photo2_6 = await this.bx24.loadFileToBase64FromUrl(urlPhoto2_6);
                data[this.smartFields.photo2_6] = [`${this.productType}_${this.productId}.png`, base64Photo2_6];
            }
            
            data[this.smartFields.canvas_2] = [`${this.productType}_${this.productId}`, base64Data2];
            data[this.smartFields.canvasScreen_2] = [`${this.productType}_${this.productId}.png`, base64ScreenShot2];
            // console.log({
            //     "canvas_2": [`${this.productType}_${this.productId}`, base64Data2],
            //     "canvasScreen_2": [`${this.productType}_${this.productId}.png`, base64ScreenShot2],
            //     "photo2_1": urlPhoto2_1,
            //     "photo2_2": urlPhoto2_2,
            //     "photo2_3": urlPhoto2_3,
            //     "photo2_4": urlPhoto2_4,
            //     "photo2_5": urlPhoto2_5,
            //     "photo2_6": urlPhoto2_6
            // });
        }

        // console.log('data 2 = ', data);

        return data;
    }

    utf8ToBase64(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        let binary = '';
        const len = data.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(data[i]);
        }
        return btoa(binary);
    }

    base64ToUtf8(base64) {
        const binaryString = atob(base64);
        const binaryLength = binaryString.length;
        const bytes = new Uint8Array(binaryLength);
        for (let i = 0; i < binaryLength; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    }
    
    base64ToLatin1(base64) {
        const binaryString = atob(base64);
        return decodeURIComponent(escape(binaryString));
    }
    
    decodeBase64Data(base64) {
        try {
            // Попробуем декодировать как Latin1
            return this.base64ToLatin1(base64);
        } catch (e) {
            // Если не получилось, декодируем как UTF-8
            return this.base64ToUtf8(base64);
        }
    }
}