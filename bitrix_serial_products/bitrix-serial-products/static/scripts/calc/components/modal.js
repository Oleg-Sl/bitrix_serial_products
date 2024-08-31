import ModalMaterialsView from './modal/modal_materials.js';
import ModalQuestionsView from './modal/modal_questions.js';
import ModalFotView from './modal/modal_fot.js';
import ModalManagementView from './modal/modal_management.js';
import ModalRentView from './modal/modal_rent.js';
import ModalCostPriceView from './modal/modal_costprice.js';
import ModalSalesRangeView from './modal/modal_salesrange.js';
import ModalCommentView from './modal/modal_comment.js';
import ModalMetadataView from './modal/modal_metadata.js';
import ModalButtonsView from './modal/modal_buttons.js';


export default class ModalView {
    constructor(eventEmitter, isEditable) {
        this.createModal();

        this.eventEmitter = eventEmitter;
        this.isEditable = isEditable;

        this.modalView = new ModalMetadataView(this.eventEmitter);
        this.modalMaterialsView = new ModalMaterialsView(this.eventEmitter);
        this.modalQuestionsView = new ModalQuestionsView(this.eventEmitter);
        this.modalFotView = new ModalFotView(this.eventEmitter);
        this.modalManagementView = new ModalManagementView(this.eventEmitter);
        this.modalRentView = new ModalRentView(this.eventEmitter);
        this.modalCostPriceView = new ModalCostPriceView(this.eventEmitter);
        this.modalSalesRangeView = new ModalSalesRangeView(this.eventEmitter);
        this.modalCommentView = new ModalCommentView(this.eventEmitter);
        this.modalButtonsView = new ModalButtonsView(this.eventEmitter);

        this.initialize();
    }

    initialize() {
        this.eventEmitter.on('changeStateQuestion', this.changeStateButtons.bind(this));
        this.eventEmitter.on('redrawCalcualation', this.redrawCalcualation.bind(this));
    }

    redrawCalcualation(calculation) {
        this.render(calculation, true, calculation.isNewCalculation);
    }

    render(calculation, isEditable = true, isNewCalculation = true) {
        this.modalView.render(calculation.calculationId, calculation.dateOfCalculation)
        this.modalMaterialsView.render(calculation.materials, calculation.summaryMaterials, isEditable);
        this.modalQuestionsView.render(calculation.questions);
        this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
        this.modalFotView.render(calculation.fots, calculation.summaryFot, isEditable && calculation.isAllAnswered());
        this.modalManagementView.render(calculation.costManagement);
        this.modalRentView.render(calculation.costRent);
        this.modalCostPriceView.render(calculation.costPrice);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalCommentView.render(calculation.comment, isEditable);
        this.modalButtonsView.render(isEditable, isNewCalculation);
        this.modalButtonsView.updateStateButtonCalculate(calculation.isAllAnswered(), calculation.isFotValid());
        this.changeStateButtons(calculation);
    }

    changeStateButtons(calculation) {
        this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
        this.modalFotView.setActivateInputs(calculation.isAllAnswered(), calculation.isFotValid());
        this.modalButtonsView.updateStateButtonCalculate(calculation.isAllAnswered(), calculation.isFotValid());
    }

    show() {
        this.modalView.show();
    }

    hide() {
        this.modalView.hide();
    }

    createModal() {
        document.body.insertAdjacentHTML('beforeend', this.getCalculationHTML());
        const gridContainer = document.querySelector('.check-list-complexity');
        const toggleButton = document.getElementById('btnCheckListComplexity');

        const gridContainer2 = document.querySelector('#tableFot');
        const toggleButton2 = document.getElementById('btnFot');

        toggleButton.addEventListener('click', () => {
            gridContainer.classList.toggle('collapsed');
            if (gridContainer.classList.contains('collapsed')) {
                toggleButton.textContent = 'Развернуть';
            } else {
                toggleButton.textContent = 'Свернуть';
            }
        });

        toggleButton2.addEventListener('click', () => {
            gridContainer2.classList.toggle('collapsed');
            if (gridContainer2.classList.contains('collapsed')) {
                toggleButton2.textContent = 'Развернуть';
            } else {
                toggleButton2.textContent = 'Свернуть';
            }
        });



        document.addEventListener('DOMContentLoaded', function() {
            const draggableWindow = document.getElementById('calculationWindow');
            const draggie = new Draggabilly(draggableWindow, {
                handle: [ '.window-header', '.window-droptable', '.window-grip-left']
            });
        });
    }

    getCalculationHTML() {
        return `
            <!-- Модальное окно с расчетами -->
            <div id="calculationWindow" class="draggable-window d-none">
                <div class="window-header">Дата актуальности цен: <span class="date-price-validity">01.01.2022</span></div>
                <div class="row m-0">
                    <div class="d-flex justify-content-center align-items-center p-2 flex-shrink-1 window-grip-left">
                        <i class="bi bi-grip-vertical"></i>
                    </div>
                    <div class="col p-0 window-content calculation-data">
                        <!-- МАТЕРИАЛЫ -->
                        <table class="table-materials-list materials-list">
                            <thead>
                                <tr>
                                    <th class="fixed-rows-top">Материал</th>
                                    <th class="fixed-rows-top">Стоимость</th>
                                    <th class="fixed-rows-top">Значение</th>
                                    <th class="fixed-rows-top">Сумма</th>
                                    <th class="fixed-rows-top" style="grid-column: 5 / span 8;">Комментарий</th>
                                </tr>
                            </thead>
                            <tbody class="table-materials-list-body">
                                <tr>
                                    <td placeholder="">Материал 1</td>
                                    <td><input type="number" class="border-0 material-price  bg-body-secondary" min="0" value="0" disabled></td>
                                    <td><input type="number" class="border-0 material-value updated-field" min="0" value="0" data-field="0" data-coefficient="0"></td>
                                    <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="0" disabled data-field="0"></td>
                                    <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="0" data-field="0"></td>
                                </tr>
                                <tr>
                                    <td placeholder="">Материал 2</td>
                                    <td><input type="number" class="border-0 material-price updated-field" min="0" value="0" data-field="0"></td>
                                    <td><input type="number" class="border-0 material-value updated-field" min="0" value="0" data-field="0" data-coefficient="1"></td>
                                    <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="0" disabled data-field="0"></td>
                                    <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="0" data-field="0"></td>
                                </tr>
                                <tr>
                                    <td placeholder="">Материал 3</td>
                                    <td><input type="number" class="border-0 material-price  bg-body-secondary" min="0" value="0" disabled></td>
                                    <td><input type="number" class="border-0 material-value updated-field" min="0" value="0" data-field="0" data-coefficient="0"></td>
                                    <td><input type="number" class="border-0 material-amount updated-field bg-body-secondary" min="0" value="0" disabled data-field="0"></td>
                                    <td style="grid-column: 5 / span 8;"><input type="text" class="border-0 material-comment updated-field" min="0" value="0" data-field="0"></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr data-id="">
                                    <td class="d-flex justify-content-center" style="grid-column: 1 / span 3;"><div class="">Материалы ИТОГО</div></td>
                                    <td class=""><input type="number" class="border-0 bg-body-secondary material-summary-cost" value="0" disabled  data-field="0"></td>
                                    <td class="" style="grid-column: 5 / span 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="fixed-tfooter">
                            <!-- ЧЕК-ЛИСТ ВОПРОСОВ -->
                            <div>
                                <table class="check-list-complexity-header">
                                    <tr data-id="">
                                        <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 6;"><div class="fw-bold">Чек лист определения сложности изделия</div></td>
                                        <td class="fixed-rows"><button id="btnCheckListComplexity" type="button" class="btn btn-success btn-sm btn-chek-list">Развернуть</button></td>
                                    </tr>
                                </table>
                                <table class="check-list-complexity collapsed">
                                    <thead>
                                        <tr data-id="">
                                            <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 5;"><div class="fw-bold">Вопросы, требующие ОТВЕТА</div></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;"><div class="fw-bold">Блок ответов</div></td>
                                        </tr>
                                    </thead>
                                    <tbody class="check-list-complexity-questions-answer">
                                        <tr data-id="" class="form-check">
                                            <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="">Есть ли столярка? (посмотри на опоры и не только)</div></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 6 / 7;"><input class="" type="radio" name="radioButtonsGroup1" id=""></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 7 / 8;"><input class="" type="radio" name="radioButtonsGroup1" id=""></td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr data-id="">
                                            <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 5;"><div class="fw-bold">Вопросы, требующие УТРЕЖДЕНИЯ</div></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;"><div class="fw-bold">Кликер</div></td>
                                        </tr>
                                    </thead>
                                    <tbody class="check-list-complexity-questions-statement">
                                        <tr data-id="" class="form-check">
                                            <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="">Слажность ткани</div></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;"><input class="" type="radio" name="radioButtonsGroup2" id=""></td>
                                            <!-- <td class="fixed-rows justify-content-center" style="grid-column: 7 / 8;"><input class="" type="radio" name="radioButtonsGroup2" id=""></td> -->
                                        </tr>
                                        <tr data-id="" class="form-check">
                                            <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="">Швы сложные</div></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;">
                                                <!-- <div class="form-check form-switch"> -->
                                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                                    <!-- <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label> -->
                                                <!-- </div> -->
                                            </td>
                                            <!-- <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;"><input class="" type="radio" name="radioButtonsGroup3" id=""></td> -->
                                            <!-- <td class="fixed-rows justify-content-center" style="grid-column: 7 / 8;"><input class="" type="radio" name="radioButtonsGroup3" id=""></td> -->
                                        </tr>
                                        <tr data-id="" class="form-check">
                                            <td class="d-flex justify-content-center" style="grid-column: 1 / span 5;"><div class="">Кол-во модуей</div></td>
                                            <td class="fixed-rows justify-content-center" style="grid-column: 6 / 8;">
                                                <div class="form-check form-switch justify-content-center">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="" checked>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- БЛОК ФОТ -->
                            <div>
                                <table class="fot-header">
                                    <thead>
                                        <tr data-id="">
                                            <td class="d-flex justify-content-center" style="grid-column: 1 / span 6;"><div class="fw-bold">Блок ФОТ</div></td>
                                            <td class=""><button id="btnFot" type="button" class="btn btn-success btn-sm btn-chek-list">Развернуть</button></td>
                                        </tr>
                                    </thead>
                                </table>
                                <table id="tableFot" class="fot collapsed">
                                    <thead>
                                        <tr>
                                            <th class="">ФОТ отделы</th>
                                            <th class="">Расчетная</th>
                                            <th class="">Коэ-т</th>
                                            <th class="">Сумма</th>
                                            <th class="">ПРОВЕРКА</th>
                                            <th class="" style="grid-column: 6 / 8;">Комментарии</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-fot-list-body">
                                        <tr>
                                            <td placeholder="">Разработка</td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" disabled></td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" data-field="0" disabled data-coefficient="0"></td>
                                            <td><input type="number" class="" min="0" value="0" data-field="0"></td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" disabled data-field="0"></td>
                                            <td style="grid-column: 6 / 8;"><input type="text" class="" min="0" value="0" data-field="0"></td>
                                        </tr>
                                        <tr>
                                            <td placeholder="">Пилка</td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" disabled></td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" data-field="0" disabled data-coefficient="0"></td>
                                            <td><input type="number" class="" min="0" value="0" data-field="0"></td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" disabled data-field="0"></td>
                                            <td style="grid-column: 6 / 8;"><input type="text" class="" min="0" value="0" data-field="0"></td>
                                        </tr>
                                        <tr>
                                            <td placeholder="">Сборка</td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" disabled></td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" data-field="0" disabled data-coefficient="0"></td>
                                            <td><input type="number" class="" min="0" value="0" data-field="0"></td>
                                            <td><input type="number" class="bg-body-secondary" min="0" value="0" disabled data-field="0"></td>
                                            <td style="grid-column: 6 / 8;"><input type="text" class="" min="0" value="0" data-field="0"></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr data-id="">
                                            <td class="d-flex justify-content-center" style="grid-column: 1 / span 3;"><div class="">ФОТ ИТОГО</div></td>
                                            <td class=""><input type="number" class="border-0 fot-summary-cost" value="0" disabled  data-field="0"></td>
                                            <td class="" style="grid-column: 5 / 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <!-- РУКОВОДСТВО И АРЕНДА -->
                            <table class="other">
                                <tbody>
                                    <tr>
                                        <td placeholder="">Руководство</td>
                                        <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                        <td class="text-end bg-body-secondary px-1 management-cost"></td>
                                        <!-- <td><input type="number" class="border-0 bg-body-secondary management-cost" min="0" value="0" disabled></td> -->
                                        <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                        <td style="grid-column: 6 / 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                    </tr>
                                    <tr>
                                        <td placeholder="">Аренда</td>
                                        <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                        <td class="text-end bg-body-secondary px-1 rent-cost"></td>
                                        <!-- <td><input type="number" class="border-0 bg-body-secondary rent-cost" min="0" value="0" disabled></td> -->
                                        <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled ></td>
                                        <td style="grid-column: 6 / 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr data-id="">
                                        <td class="d-flex justify-content-center" style="grid-column: 1 / span 3;"><div class="">Себестоимость</div></td>
                                        <td class="text-end bg-body-secondary px-1 cost-price"></td>
                                        <!-- <td class=""><input type="number" class="border-0 bg-body-secondary cost-price updated-field " value="0" disabled></td> -->
                                        <td class="" style="grid-column: 5 / 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <!-- ДИАПОЗОНПРОДАЖИ -->
                            <table class="sell-range">
                                <tbody>
                                    <tr>
                                        <td class="d-flex justify-content-center align-items-center" style="grid-row: 1 / 3;" placeholder="">Диопозон продажи</td>
                                        <td><input type="number" class="border-0 bg-body-secondary sell-range-coefficient" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary sell-range-coefficient" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary sell-range-coefficient" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary sell-range-coefficient" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary sell-range-coefficient" min="0" value="0" disabled></td>
                                        <td><input type="number" class="border-0 bg-body-secondary sell-range-coefficient" min="0" value="0" disabled></td>
                                    </tr>
                                    <tr>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost"></td>
                                        <!-- <td><input type="number" class="border-0 bg-body-secondary sell-range-cost" min="0" value="0" disabled></td> -->
                                    </tr>
                                </tbody>
                            </table>
                            <!-- КОММЕНТАРИЙ -->
                            <table class="comment">
                                <tbody>
                                    <tr>
                                        <td class="d-flex justify-content-center fixed-rows-bottom">Комментарий</td>
                                        <td class="fixed-rows-bottom" style="grid-column: 2 / 8;"><input type="text" class="border-0 general-comment" min="0" value="0" data-field="0"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
        
                </div>
                <div class="d-flex flex-column">
                    <button id="btnCalculate" type="button" class="btn btn-primary btn-sm">РАССЧИТАТЬ</button>
                </div>
                <div class="window-footer">
                    <button id="copyCalculation" type="button" class="btn btn-success btn-sm">Копировать</button>
                    <button id="createCalculation" type="button" class="btn btn-success btn-sm d-none">Создать</button>
                    <button id="saveCalculation" type="button" class="btn btn-success btn-sm d-none">Сохранить</button>
                    <button id="closeCalculation" type="button" class="btn btn-danger btn-sm">Закрыть</button>
                </div>
            </div>
        `;
    }
}
