
export default class ControlPanel {
    constructor(container, canvas, photoUploader, field_1, field_2, field_3, field_4, field_5, field_6, callbackUploadFile, dataManager) {
        this.container = container;
        this.canvas = canvas;
        this.photoUploader = photoUploader;
        this.field_1 = field_1;
        this.field_2 = field_2;
        this.field_3 = field_3;
        this.field_4 = field_4;
        this.field_5 = field_5;
        this.field_6 = field_6;
        this.callbackUploadFile = callbackUploadFile;
        this.dataManager = dataManager;
        this.isLockedButtons = true;

        this.inputImgLoader1 = this.container.querySelector('.input-img-loader-1');
        this.inputImgLoader2 = this.container.querySelector('.input-img-loader-2');
        this.inputImgLoader3 = this.container.querySelector('.input-img-loader-3');
        this.inputImgLoader4 = this.container.querySelector('.input-img-loader-4');
        this.inputImgLoader5 = this.container.querySelector('.input-img-loader-5');
        this.inputImgLoader6 = this.container.querySelector('.input-img-loader-6');

        this.btnAddImage1 = this.container.querySelector('.btn-add-image-1');
        this.btnAddImage2 = this.container.querySelector('.btn-add-image-2');
        this.btnAddImage3 = this.container.querySelector('.btn-add-image-3');
        this.btnAddImage4 = this.container.querySelector('.btn-add-image-4');
        this.btnAddImage5 = this.container.querySelector('.btn-add-image-5');
        this.btnAddImage6 = this.container.querySelector('.btn-add-image-6');

        this.btnAddArrow = this.container.querySelector('.btn-add-arrow');
        this.btnAddText = this.container.querySelector('.btn-add-text');
        this.btnRemoveSelected = this.container.querySelector('.btn-remove-selected');
        this.btnChangeColor = this.container.querySelector('.btn-change-color');
        this.inputColorPicker = this.container.querySelector('.input-color-picker');
        this.outputMessage = this.container.querySelector('.output-message');
    }
    
    init() {
        // console.log("ControlPanel.init()");
        this.btnAddImage1.disabled = false;
        this.btnAddImage2.disabled = false;
        this.btnAddImage3.disabled = false;
        this.btnAddImage4.disabled = false;
        this.btnAddImage5.disabled = false;
        this.btnAddImage6.disabled = false;
        this.btnAddArrow.disabled = false;
        this.btnAddText.disabled = false;
        this.btnRemoveSelected.disabled = false;
        this.btnChangeColor.disabled = false;

        this.bindEvents();
        this.initButtons();
    }

    initButtons() {
        if (this.canvas.checkElementExistsOnCanvas(this.field_1)) {
            this.setBtnImageUploaded(this.btnAddImage1);
        }
        if (this.canvas.checkElementExistsOnCanvas(this.field_2)) {
            this.setBtnImageUploaded(this.btnAddImage2);
        }
        if (this.canvas.checkElementExistsOnCanvas(this.field_3)) {
            this.setBtnImageUploaded(this.btnAddImage3);
        }
        if (this.canvas.checkElementExistsOnCanvas(this.field_4)) {
            this.setBtnImageUploaded(this.btnAddImage4);
        }
        if (this.canvas.checkElementExistsOnCanvas(this.field_5)) {
            this.setBtnImageUploaded(this.btnAddImage5);
        }
        if (this.canvas.checkElementExistsOnCanvas(this.field_6)) {
            this.setBtnImageUploaded(this.btnAddImage6);
        }
        // console.log(this.field_1, this.dataManager.getProductDataByFieldBx24(this.field_1));
        // console.log(this.field_2, this.dataManager.getProductDataByFieldBx24(this.field_2));
        // console.log(this.field_3, this.dataManager.getProductDataByFieldBx24(this.field_3));
        // console.log(this.field_4, this.dataManager.getProductDataByFieldBx24(this.field_4));
        // console.log(this.field_5, this.dataManager.getProductDataByFieldBx24(this.field_5));
        // console.log(this.field_6, this.dataManager.getProductDataByFieldBx24(this.field_6));
    }

    setBtnImageUploaded(btn) {
        btn.classList.add('image-uploaded');
    }

    bindEvents() {
        this.btnAddImage1.addEventListener('click', () => { console.log(this.inputImgLoader1); this.inputImgLoader1.click(); });
        this.btnAddImage2.addEventListener('click', () => { this.inputImgLoader2.click(); });
        this.btnAddImage3.addEventListener('click', () => { this.inputImgLoader3.click(); });
        this.btnAddImage4.addEventListener('click', () => { this.inputImgLoader4.click(); });
        this.btnAddImage5.addEventListener('click', () => { this.inputImgLoader5.click(); });
        this.btnAddImage6.addEventListener('click', () => { this.inputImgLoader6.click(); });
        this.inputImgLoader1.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            this.showMessage('Загрузка изображения...');
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.callbackUploadFile({[this.field_1]: data}, this.field_1);
            });
            this.showMessage('');
            if (!link) return;
            this.canvas.addImage(file, 0.01, 0.01, 0.23, 0.23, link, this.field_1);
            this.setBtnImageUploaded(this.btnAddImage1);
        });
        this.inputImgLoader2.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            this.showMessage('Загрузка изображения...');
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.callbackUploadFile({[this.field_2]: data}, this.field_2);
            });
            this.showMessage('');
            if (!link) return;
            this.canvas.addImage(file, 0.26, 0.01, 0.23, 0.23, link, this.field_2);
            this.setBtnImageUploaded(this.btnAddImage2);
        });
        this.inputImgLoader3.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            this.showMessage('Загрузка изображения...');
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.callbackUploadFile({[this.field_3]: data}, this.field_3);
            });
            this.showMessage('');
            if (!link) return;
            this.canvas.addImage(file, 0.01, 0.26, 0.23, 0.23, link, this.field_3);
            this.setBtnImageUploaded(this.btnAddImage3);
        });
        this.inputImgLoader4.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            this.showMessage('Загрузка изображения...');
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.callbackUploadFile({[this.field_4]: data}, this.field_4);
            });
            this.showMessage('');
            if (!link) return;
            this.canvas.addImage(file, 0.51, 0.01, 0.48, 0.48, link, this.field_4);
            this.setBtnImageUploaded(this.btnAddImage4);
        });
        this.inputImgLoader5.addEventListener('change', async (event) => {
            
            let file = event.target.files[0];
            this.showMessage('Загрузка изображения...');
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.callbackUploadFile({[this.field_5]: data}, this.field_5);
            });
            this.showMessage('');
            if (!link) return;
            this.canvas.addImage(file, 0.01, 0.51, 0.48, 0.48, link, this.field_5);
            this.setBtnImageUploaded(this.btnAddImage5);
        })
        this.inputImgLoader6.addEventListener('change', async (event) => {
            let file = event.target.files[0];
            this.showMessage('Загрузка изображения...');
            let link = await this.photoUploader.uploadPhoto(file, async (data) => {
                return await this.callbackUploadFile({[this.field_6]: data}, this.field_6);
            });
            this.showMessage('');
            if (!link) return;
            this.canvas.addImage(file, 0.51, 0.51, 0.48, 0.48, link, this.field_6);
            this.setBtnImageUploaded(this.btnAddImage6);
        })
        this.btnAddArrow.addEventListener('click', () => {
            this.canvas.addLine(this.getColor(), 3);
        })
        this.btnAddText.addEventListener('click', () => {
            this.canvas.addText(this.getColor(), 'Ваш текст');
        })
        this.btnRemoveSelected.addEventListener('click', () => {
            this.canvas.removeSelected();
        })
        this.btnChangeColor.addEventListener('click', () => {
            this.canvas.changeColor(this.getColor());
        })
    }

    showMessage(message='') {
        this.outputMessage.value = message;
    }
  
    getColor() {
        return this.inputColorPicker.value;
    }
}