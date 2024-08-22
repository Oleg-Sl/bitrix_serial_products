
export class Canvas {
    constructor(elementId, getPhotoUrl) {
        this.elemCanvas = document.getElementById(elementId);
        this.getPhotoUrl = getPhotoUrl;
        this.canvas = new fabric.Canvas(elementId);
        this.isChanged = false;

        this.canvas.on('mouse:dblclick', (event) => {
            const tag = event.target.tag;
            let link = '';
            if (tag.startsWith('fabric')) {
                link = event.target.link;
            } else {
                link = this.getPhotoUrl(tag);
            }
            console.log("link = ", link);
            if (link) {
                window.open(link, '_blank');
            }
        });
        this.canvas.on('object:moving', () => {
            this.isChanged = true;
        });
    }

    initSize(aspectRatio=Math.SQRT2) {
        const canvasContainer = this.elemCanvas.parentElement.parentElement;
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientWidth / aspectRatio;
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
    }

    async initData(sourceData) {
        if (sourceData) {
            let oldCanvasWidth = sourceData.width;
            let oldCanvasHeight = sourceData.height;
            await new Promise((resolve, reject) => {
                this.canvas.loadFromJSON(sourceData, () => {
                    this.initSize();
                    // Приведение размеров объектов к текущему размеру холста для сохранения пропорций
                    this.canvas.forEachObject((obj) => {
                        let scaleX = this.canvas.width / oldCanvasWidth;
                        let scaleY = this.canvas.height / oldCanvasHeight;
                        obj.set({
                            left: obj.left * scaleX,
                            top: obj.top * scaleY,
                            scaleX: obj.scaleX * scaleX,
                            scaleY: obj.scaleY * scaleY
                        });
                    });
                    this.canvas.renderAll();
                    resolve();
                });
            });
        }
    }

    resetChangedData() {
        this.isChanged = false;
    }

    getData() {
        if (!this.isChanged) {
            return;
        }
        let jsonData = this.canvas.toJSON();
        jsonData.width = this.canvas.width;
        jsonData.height = this.canvas.height;
        return jsonData;
    }

    getScreenShot() {
        const imageDataURL = this.canvas.toDataURL({
            format: 'png',
            quality: 1
        });
        const imageDataWithoutPrefix = imageDataURL.split(',')[1];
        return imageDataWithoutPrefix;
    }

    getAllData() {
        let jsonData = this.canvas.toJSON();
        jsonData.width = this.canvas.width;
        jsonData.height = this.canvas.height;
        return jsonData;
    }

    addImage(file, leftRatio, topRatio, widthRatio, heightRatio, link, tag) {
        if (!file) {
            return;
        }
        this.isChanged = true;
        let reader = new FileReader();
        reader.onload = (event) => {
            let canvasWidth = this.canvas.width;
            let canvasHeight = this.canvas.height;
            let img = new Image();
            img.onload = () => {
                let imgWidth, imgHeight;
                let wishWidth = canvasWidth * widthRatio;
                let wishHeight = canvasHeight * heightRatio;
                if (wishWidth / wishHeight > img.width / img.height) {
                    imgHeight = wishHeight;
                    imgWidth = img.width * (imgHeight / img.height);
                } else {
                    imgWidth = wishWidth;
                    imgHeight = img.height * (imgWidth / img.width);
                }

                let left = canvasWidth * leftRatio;
                let top = canvasHeight * topRatio;

                this.removeElementsByTag(tag);

                fabric.Image.fromURL(event.target.result, (fabricImg) => {
                    fabricImg.set({
                        left: left,
                        top: top,
                        scaleX: imgWidth / img.width,
                        scaleY: imgHeight / img.height,
                        link: link,
                        tag: tag
                    });
                    this.canvas.add(fabricImg);
                });
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(new Blob([file], { type: file.type }));
    }

    addImageFromBase64(base64Data, leftRatio, topRatio, widthRatio, heightRatio, link, tag) {
        if (!base64Data) {
            return;
        }
        this.isChanged = true;
    
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
    
        // Добавляем префикс, если его нет
        if (!base64Data.startsWith('data:image/png;base64,')) {
            base64Data = 'data:image/png;base64,' + base64Data;
        }
    
        fabric.Image.fromURL(base64Data, (fabricImg) => {
            let imgWidth, imgHeight;
            let wishWidth = canvasWidth * widthRatio;
            let wishHeight = canvasHeight * heightRatio;
            if (wishWidth / wishHeight > fabricImg.width / fabricImg.height) {
                imgHeight = wishHeight;
                imgWidth = fabricImg.width * (imgHeight / fabricImg.height);
            } else {
                imgWidth = wishWidth;
                imgHeight = fabricImg.height * (imgWidth / fabricImg.width);
            }
    
            let left = canvasWidth * leftRatio;
            let top = canvasHeight * topRatio;
    
            this.removeElementsByTag(tag);
    
            fabricImg.set({
                left: left,
                top: top,
                scaleX: imgWidth / fabricImg.width,
                scaleY: imgHeight / fabricImg.height,
                link: link,
                tag: tag
            });
    
            this.canvas.add(fabricImg);
        });
    }

    addImageByUrl(url, leftRatio, topRatio, widthRatio, heightRatio, link, tag) {
        this.isChanged = true;
        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;
        fabric.Image.fromURL(url, (fabricImg) => {
            let imgWidth, imgHeight;
            let wishWidth = canvasWidth * widthRatio;
            let wishHeight = canvasHeight * heightRatio;
            if (wishWidth / wishHeight > fabricImg.width / fabricImg.height) {
                imgHeight = wishHeight;
                imgWidth = fabricImg.width * (imgHeight / fabricImg.height);
            } else {
                imgWidth = wishWidth;
                imgHeight = fabricImg.height * (imgWidth / fabricImg.width);
            }
    
            let left = canvasWidth * leftRatio;
            let top = canvasHeight * topRatio;
    
            this.removeElementsByTag(tag);
    
            fabricImg.set({
                left: left,
                top: top,
                scaleX: imgWidth / fabricImg.width,
                scaleY: imgHeight / fabricImg.height,
                link: link,
                tag: tag
            });
    
            this.canvas.add(fabricImg);
        });
    }

    removeElementsByTag(tag) {
        this.canvas.forEachObject((obj) => {
            if (obj.tag === tag) {
                this.isChanged = true;
                this.canvas.remove(obj);
            }
        });
    }

    addText(color='black', text='Ваш текст') {
        this.isChanged = true;
        let textBox = new fabric.Textbox('Ваш текст', {
            left: 100,
            top: 100,
            width: 200,
            fontSize: 30,
            fill: color,
            fontFamily: 'Arial'
        });
        this.canvas.add(textBox);
    }

    addLine(color, width=3) {
        this.isChanged = true;
        let line = new fabric.Line([100, 100, 300, 200], {
            stroke: color,
            strokeWidth: width,
            selectable: true,
            hasControls: true,
            lockRotation: false
        });

        this.canvas.add(line);
    }

    removeSelected() {
        this.isChanged = true;
        let activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            this.canvas.remove(activeObject);
        }
    }

    changeColor(color) {
        this.isChanged = true;
        let selectedObject = this.canvas.getActiveObject();
        if (selectedObject) {
            selectedObject.set('fill', color);
            this.canvas.renderAll();
        }
    }
}

fabric.Image.prototype.toObject = (function (toObject) {
    return function (propertiesToInclude) {
        return fabric.util.object.extend(toObject.call(this, propertiesToInclude), {
            tag: this.tag,
            link: this.link
        });
    };
})(fabric.Image.prototype.toObject);
