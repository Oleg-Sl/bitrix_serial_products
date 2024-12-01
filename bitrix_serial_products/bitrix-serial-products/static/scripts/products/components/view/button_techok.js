import ButtonBaseView from './button_base.js';


export default class ButtonTechokView extends ButtonBaseView {
    constructor(productService, userService, callbackService) {
        super(productService, userService, callbackService, 'isTechOk', 'dateOfTech');
    }
}
