import ButtonBaseView from './button_base.js';


export default class ButtonComdirokView extends ButtonBaseView {
    constructor(productService, userService, callbackService) {
        super(productService, userService, callbackService, 'isComDirOk', 'dateOfComDir');
    }
}
