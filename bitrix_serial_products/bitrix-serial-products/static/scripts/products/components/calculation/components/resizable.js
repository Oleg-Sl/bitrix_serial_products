
export default class ResizableWrapper {
    constructor(elementId) {
        this.container = document.getElementById(elementId);

        this.startX;
        this.startY;
        this.startWidth;
        this.startHeight;

        this.resizeRightHandler = this.resizeRight.bind(this);
        this.resizeBottomHandler = this.resizeBottom.bind(this);
        this.resizeCornerHandler = this.resizeCorner.bind(this);
    }

    init() {
        this.initRightEdge();
        this.container.appendChild(this.rightEdge);
    }

    initRightEdge() {
        this.rightEdge = document.createElement('div');
        this.rightEdge.className = 'edge';
        this.rightEdge.style.position = 'absolute';
        this.rightEdge.style.width = '10px';
        this.rightEdge.style.height = '100%';
        this.rightEdge.style.top = '0';
        this.rightEdge.style.right = '-5px';
        this.rightEdge.style.cursor = 'ew-resize';
        this.rightEdge.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            this.startWidth = parseInt(document.defaultView.getComputedStyle(this.container).width, 10);
            document.documentElement.addEventListener('mousemove', this.resizeRightHandler);
            document.documentElement.addEventListener('mouseup', this.stopResize.bind(this));
        });
    }

    initBottomEdge() {
        this.bottomEdge = document.createElement('div');
        this.bottomEdge.className = 'edge';
        this.bottomEdge.style.position = 'absolute';
        this.bottomEdge.style.width = '100%';
        this.bottomEdge.style.height = '10px';
        this.bottomEdge.style.bottom = '-5px';
        this.bottomEdge.style.left = '0';
        this.bottomEdge.style.cursor = 'ns-resize';
        this.bottomEdge.addEventListener('mousedown', (e) => {
            this.startY = e.clientY;
            this.startHeight = parseInt(document.defaultView.getComputedStyle(this.container).height, 10);
            document.documentElement.addEventListener('mousemove', this.resizeBottomHandler);
            document.documentElement.addEventListener('mouseup', this.stopResize.bind(this));
        });
    }

    initCorner() {
        this.corner = document.createElement('div');
        this.corner.className = 'corner';
        this.corner.style.position = 'absolute';
        this.corner.style.width = '10px';
        this.corner.style.height = '10px';
        this.corner.style.bottom = '-5px';
        this.corner.style.right = '-5px';
        this.corner.style.cursor = 'nwse-resize';
        this.corner.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.startWidth = parseInt(document.defaultView.getComputedStyle(this.container).width, 10);
            this.startHeight = parseInt(document.defaultView.getComputedStyle(this.container).height, 10);
            document.documentElement.addEventListener('mousemove', this.resizeCornerHandler);
            document.documentElement.addEventListener('mouseup', this.stopResize.bind(this));
        });
    }

    resizeRight(e) {
        this.newWidth = this.startWidth + e.clientX - this.startX;
        this.container.style.width = this.newWidth + 'px';
    }

    resizeBottom(e) {
        this.newHeight = this.startHeight + e.clientY - this.startY;
        this.container.style.height = this.newHeight + 'px';
    }

    resizeCorner(e) {
        this.newWidth = this.startWidth + e.clientX - this.startX;
        this.newHeight = this.startHeight + e.clientY - this.startY;
        this.container.style.width = this.newWidth + 'px';
        this.container.style.height = this.newHeight + 'px';
    }

    stopResize() {
        document.documentElement.removeEventListener('mousemove', this.resizeRightHandler);
        document.documentElement.removeEventListener('mousemove', this.resizeBottomHandler);
        document.documentElement.removeEventListener('mousemove', this.resizeCornerHandler);
    }
}
