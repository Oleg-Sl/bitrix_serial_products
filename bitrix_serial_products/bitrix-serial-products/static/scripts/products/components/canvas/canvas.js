
export default class Canvas {
    constructor(elementId, getPhotoUrl) {
        this.elemCanvas = document.getElementById(elementId);
        this.getPhotoUrl = getPhotoUrl;
        this.canvas = new fabric.Canvas(elementId);
        this.isChanged = false;

        this.canvas.on('mouse:dblclick', (event) => {
            const tag = event.target.tag;
            this.isChanged = true;
            if (!tag) {
                return;
            }
            let link = '';
            console.log("tag = ", tag);
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
        this.checkElementExistsOnCanvas("s");

    }

    initSize(aspectRatio=Math.SQRT2) {
        console.log('++++++++++++++++++++++++++++++++++++++++++ aspectRatio = ', aspectRatio);
        this.aspectRatio = aspectRatio;
        // const coefficient = Math.SQRT2;
        // const coefficient = (28.39 / 17.02);
        // console.log("aspectRatio = ", aspectRatio);
        const canvasContainer = this.elemCanvas.parentElement.parentElement;
        // console.log("canvasContainer = ", canvasContainer);
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientWidth / aspectRatio;
        // console.log("width = ", width, " height = ", height);
        // console.log(document.getElementById('canvasesContainer2').clientWidth);
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
    }

    checkElementExistsOnCanvas(tag) {
        const objects = this.canvas.getObjects();
        for (let obj of objects) {
            if (obj.tag === tag) {
                return true;
            }
        }
        return false;
    }

    async initData(sourceData) {
        if (sourceData) {
            let oldCanvasWidth = sourceData.width;
            let oldCanvasHeight = sourceData.height;
            await new Promise((resolve, reject) => {
                this.canvas.loadFromJSON(sourceData, () => {
                    this.initSize(this.aspectRatio);
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
                        obj.setCoords();
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
        // console.log("imageDataURL = ", imageDataURL);
        // console.log("imageDataWithoutPrefix = ", imageDataWithoutPrefix);
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
        const width = this.elemCanvas.offsetWidth;
        let textBox = new fabric.Textbox(text, {
            left: width / 2 - 100,
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

fabric.Image.prototype.toObject = (function (toObject) {
    return function (propertiesToInclude) {
        return fabric.util.object.extend(toObject.call(this, propertiesToInclude), {
            tag: this.tag,
            link: this.link
        });
    };
})(fabric.Image.prototype.toObject);