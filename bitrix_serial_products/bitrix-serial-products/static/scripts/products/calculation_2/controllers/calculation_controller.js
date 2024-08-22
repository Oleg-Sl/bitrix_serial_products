import { CalculationsListView } from '../veiws/calculationslist_view.js';
import { CalculationModel } from '../models/calculation_model.js';
import { ReadModalView } from '../veiws/readmodal_view.js';
import { EditModalView } from '../veiws/editmodal_view.js'
import { ResizableWrapper } from '../modules/resizable.js';

export class CalculationController {
    constructor(bx24, title, productManager, fabricManager, calcProductId, materials, coefficients, calculations, calculationFields, users, currentUser, otherCalculations, calcProductFields, isAccess) {
        this.productManager = productManager;
        this.isAccess = isAccess;
        this.calculationModel = new CalculationModel(bx24, title, productManager, fabricManager, calcProductId, materials, coefficients, calculations, calculationFields, users, currentUser, otherCalculations, calcProductFields);

        this.calculationsListView = new CalculationsListView();
        this.readModalView = new ReadModalView();
        this.editModalView = new EditModalView();
        this.resizable = new ResizableWrapper('calculationWindow');

        this.window = document.querySelector('#calculationWindow');
        this.calculationContainer = document.querySelector('#productCalculations');
        this.btnNewProductCalculation = document.querySelector('#newProductCalculation');
        this.productOtherCalculationsList = document.querySelector('#productOtherCalculationsList');
        // this.btnAddProductCalculation = document.querySelector('#addProductCalculation');


    }

    init() {
        const calculations = this.calculationModel.getCalculations();
        const otherCalculations = this.calculationModel.getOtherCalculations();
        const lastDateMaterialCost = this.calculationModel.getLastDateMaterialCost();
        const isLockedCreateCalc = this.productManager.isLockedField('calculationId');
        if (!this.isAccess) {
            this.calculationContainer.remove();
            return;
        }
        this.resizable.init();
        this.calculationContainer.classList.remove('d-none');
    //     if () {
    //         this.container.querySelector('.product-btn-save').disabled = true;
    //         document.querySelector('#copyCalculation').disabled = true;
    //     }
        this.productManager.setCalculations(calculations.length);
        this.calculationsListView.renderCalculations(calculations, this.calculationModel.getChoiceCalculationId(), lastDateMaterialCost, isLockedCreateCalc, otherCalculations);

        this.initCalculationListHandler();
        this.initReadModalHandler();
        this.initEditModalHandler();
        // this.initResizableWindow();
        // $("#calculationWindow").resizable();
    }

    initCalculationListHandler() {
        // Открывает окно просмотра расчёта
        this.calculationsListView.containerList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('show-calculation-window')) {
                const calculationId = target.closest('tr').dataset.id;
                const calculationData = this.calculationModel.getCalculationById(calculationId);
                const isLockedCreateCalc = this.productManager.isLockedField('calculationId');
                console.log("================>>> calculationData = ", calculationData);
                this.readModalView.openReadModal(calculationData, isLockedCreateCalc);
            }
        });

        // // Открывает окно создания расчёта
        // this.calculationsListView.container.addEventListener('click', (event) => {
        //     const target = event.target;
        //     if (target.classList.contains('product-btn-save')) {
        //         const calculationData = this.calculationModel.getNewCalculation();
        //         this.editModalView.openModal(calculationData);
        //     }
        // });

        // Открывает окно создания нового расчёта
        this.btnNewProductCalculation.addEventListener('click', (event) => {
            const calculationData = this.calculationModel.getNewCalculation();
            this.editModalView.openModal(calculationData);
        });

        // Открывает окно создания расчёта на основе уже готовых
        this.productOtherCalculationsList.addEventListener('click', (event) => {
            const target = event.target;
            const calculationId = target.dataset.calculationId;
            if (target.tagName === 'LI' && calculationId) {
                const calculationData = this.calculationModel.getCopyCalculationFromOthers(calculationId);
                this.editModalView.openModal(calculationData);
            }
        });

        // Выбирает расчёт
        this.calculationsListView.container.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('radio-final-calculation')) {
                const smartId = target.closest('tr').dataset.id;
                this.calculationModel.setChoiceCalculationId(smartId);
            }
        });
    }

    initReadModalHandler() {
        // Копирование расчёта
        this.readModalView.btnCopy.addEventListener('click', (event) => {
            const calculationId = event.target.dataset.id;
            const calculation = this.calculationModel.getCopyCalculation(calculationId);
            this.editModalView.openModal(calculation);
        });
        // Закрытие модального окна
        this.readModalView.bntClose.addEventListener('click', () => {
            this.readModalView.closeModal();
        });
    }

    initEditModalHandler() {
        // Сохранение калькуляции
        this.editModalView.btnSave.addEventListener('click', async (event) => {
            const target = event.target;
            target.disabled = true;
            setTimeout(() => { target.disabled = false; }, 2000);
            await this.calculationModel.createNewCalculationInBx24();
            const calculations = this.calculationModel.getCalculations();
            const lastDateMaterialCost = this.calculationModel.getLastDateMaterialCost();
            const otherCalculations = this.calculationModel.getOtherCalculations();
            const isLockedCreateCalc = this.productManager.isLockedField('calculationId');
            this.productManager.setCalculations(calculations.length);
            this.calculationsListView.renderCalculations(calculations, this.calculationModel.getChoiceCalculationId(), lastDateMaterialCost, isLockedCreateCalc, otherCalculations);
            this.editModalView.closeModal();
        });
        // Закрытие окна калькуляции
        this.editModalView.btnClose.addEventListener('click', () => {
            this.editModalView.closeModal();
        });
        // Изменение значения полей
        this.editModalView.containerMaterials.addEventListener('change', (event) => {
            const target = event.target;
            const elemTr = target.closest('tr');
            if (target.classList.contains('material-price')) {
                // Цена материала
                const calculation = this.calculationModel.updateMaterialInNewCalculation(target.dataset.field, target.value, 'price');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('material-value')) {
                // Количество материала
                const calculation = this.calculationModel.updateMaterialInNewCalculation(target.dataset.field, target.value, 'value');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('material-comment')) {
                // Комментарий материала
                const calculation = this.calculationModel.updateMaterialInNewCalculation(target.dataset.field, target.value, 'comments');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('cost-work')) {
                // Стоимость работ
                const calculation = this.calculationModel.updateNewCalculation(target.dataset.field, target.value, 'work', 'amount');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('comment-work')) {
                // Комментарий работ
                const calculation = this.calculationModel.updateNewCalculation(target.dataset.field, target.value, 'work', 'comments');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('cost-subcontractor-work')) {
                // Стоимость работ подрядчика
                const calculation = this.calculationModel.updateNewCalculation(target.dataset.field, target.value, 'subcontractorWork', 'amount');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('comment-subcontractor-work')) {
                // Комментарий работ подрядчика
                const calculation = this.calculationModel.updateNewCalculation(target.dataset.field, target.value, 'subcontractorWork', 'comments');
                this.editModalView.render(calculation);
            } else if (target.classList.contains('common-comment')) {
                // Общий комментарий
                const calculation = this.calculationModel.updateGeneralCommentNewCalculation(target.dataset.field, target.value);
                this.editModalView.render(calculation);
            } else if (target.classList.contains('calculation-fixed')) {
                // Фиксация рассчитанного изделия
                const calculation = this.calculationModel.updateCalculationFixed(target.dataset.field, target.value);
                this.editModalView.render(calculation);
            }
            
        })
    }

    updateFabricPrice() {
        this.calculationModel.updateFabricPrice();
    }

    async updateCalculation() {
        await this.calculationModel.updateCalculation();
    }

    getFinallyCost() {
        return this.calculationModel.getFinallyCost();
    }

    getCopyDataCalculation(calculationId) {
        return this.calculationModel.getCopyCalculation(calculationId);
    }

    copyCalculationToNewProduct(productId) {
        return this.calculationModel.copyCalculationToNewProduct(productId);
    }

    initResizableWindow() {
        
        // const resizableContainer = document.getElementById('resizableContainer');
        let startX, startY, startWidth, startHeight;

        // Функция начала изменения размера
        function initResize(e) {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(this.window).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(this.window).height, 10);
            document.documentElement.addEventListener('mousemove', doResize);
            document.documentElement.addEventListener('mouseup', stopResize);
        }

        // Функция изменения размера
        function doResize(e) {
            this.window.style.width = (startWidth + e.clientX - startX) + 'px';
            this.window.style.height = (startHeight + e.clientY - startY) + 'px';
        }

        // Функция завершения изменения размера
        function stopResize() {
            document.documentElement.removeEventListener('mousemove', doResize);
            document.documentElement.removeEventListener('mouseup', stopResize);
        }

        // Добавляем событие нажатия мыши на заголовок окна для начала изменения размера
        const windowHeader = this.window.querySelector('.window-header');
        windowHeader.addEventListener('mousedown', initResize);
    }
}
