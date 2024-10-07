import ModalMaterialsView from './modal/modal_materials.js';
// import ModalQuestionsView from './modal/modal_questions.js';
import ModalFotView from './modal/modal_fot.js';
import ModalServicePackedView from './modal/modal_servicepacked.js';
import ModalManagementView from './modal/modal_management.js';
import ModalRentView from './modal/modal_rent.js';
import ModalCostPriceView from './modal/modal_costprice.js';
import ModalSalesRangeView from './modal/modal_salesrange.js';
import ModalCommentView from './modal/modal_comment.js';
import ModalMetadataView from './modal/modal_metadata.js';
import ModalButtonsView from './modal/modal_buttons.js';
import ResizableWrapper from './resizable.js';


export default class ModalView {
    constructor(eventEmitter, isEditable) {
        this.createModal();

        this.eventEmitter = eventEmitter;
        this.isEditable = isEditable;

        this.openCalculationId = null;
        this.isNewCalculation = null;

        this.modalView = new ModalMetadataView(this.eventEmitter);
        this.modalMaterialsView = new ModalMaterialsView(this.eventEmitter);
        // this.modalQuestionsView = new ModalQuestionsView(this.eventEmitter);
        this.modalFotView = new ModalFotView(this.eventEmitter);
        this.modalServicePackedView = new ModalServicePackedView(this.eventEmitter);
        this.modalManagementView = new ModalManagementView(this.eventEmitter);
        this.modalRentView = new ModalRentView(this.eventEmitter);
        this.modalCostPriceView = new ModalCostPriceView(this.eventEmitter);
        this.modalSalesRangeView = new ModalSalesRangeView(this.eventEmitter);
        this.modalCommentView = new ModalCommentView(this.eventEmitter);
        this.modalButtonsView = new ModalButtonsView(this.eventEmitter);

        this.resizable = new ResizableWrapper('calculationWindow');

        this.initialize();
    }

    initialize() {
        // this.eventEmitter.on('changeStateQuestion', this.changeStateButtons.bind(this));
        this.eventEmitter.on('redrawCalcualation', this.redrawCalcualation.bind(this));

        // const gridContainer = document.querySelector('.check-list-complexity');
        // const toggleButton = document.getElementById('btnCheckListComplexity');

        // const gridContainer2 = document.querySelector('#containerFot');
        const gridContainer2 = document.querySelector('#tableFot');
        const toggleButton2 = document.getElementById('btnFot');

        // toggleButton.addEventListener('click', () => {
        //     gridContainer.classList.toggle('collapsed');
        //     if (gridContainer.classList.contains('collapsed')) {
        //         toggleButton.textContent = '+';
        //     } else {
        //         toggleButton.textContent = '-';
        //     }
        // });

        toggleButton2.addEventListener('click', () => {
            gridContainer2.classList.toggle('collapsed');
            if (gridContainer2.classList.contains('collapsed')) {
                toggleButton2.textContent = '+';
            } else {
                toggleButton2.textContent = '-';
            }
        });



        const draggableWindow = document.getElementById('calculationWindow');
        const draggie = new Draggabilly(draggableWindow, {
            handle: [ '.window-header', '.window-droptable', '.window-grip-left']
        });

        this.resizable.init();
    }

    getOpenCalculationId() {
        return this.openCalculationId;
    }

    getStateCaclulation() {
        return this.isNewCalculation;
    }

    redrawCalcualation(calculation) {
        console.log("Данные расчета для отрисовки: ", calculation);
        this.render(calculation, true, calculation.isNewCalculation);
    }

    render(calculation, isEditable = true, isNewCalculation = true) {
        console.log("Данные расчета для отрисовки: ", calculation);
        this.openCalculationId = calculation.calculationId;
        this.isNewCalculation = isNewCalculation;
        this.modalView.render(calculation.calculationId, calculation.dateOfCalculation)
        this.modalMaterialsView.render(calculation.materials, calculation.materialPacked, calculation.summaryMaterials, isEditable);
        // this.modalQuestionsView.render(calculation.questions);
        // this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
        this.modalFotView.render(calculation.fots, calculation.summaryFot, isEditable && calculation.isAllAnswered());
        this.modalServicePackedView.render(calculation.costServicePacked);
        this.modalManagementView.render(calculation.costManagement);
        this.modalRentView.render(calculation.costRent);
        this.modalCostPriceView.render(calculation.costPrice);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalSalesRangeView.render(calculation.salesRange);
        this.modalCommentView.render(calculation.comment, calculation.commentFixed, isEditable);
        this.modalButtonsView.render(isEditable, isNewCalculation);
        this.modalButtonsView.updateStateButtonCalculate(calculation.isAllAnswered(), calculation.isFotValid());
        this.changeStateButtons(calculation);
    }

    changeStateButtons(calculation) {
        // this.modalQuestionsView.updateStateButton(calculation.isAllAnswered());
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
    }

    getCalculationHTML() {
        return `
            <!-- Модальное окно с расчетами -->
            <div id="calculationWindow" class="draggable-window modal-calculation-new d-none">
                <div class="window-header">Дата актуальности цен: <span class="date-price-validity">01.01.2022</span></div>
                <div class="row m-0">
                    <div class="d-flex justify-content-center align-items-center p-2 flex-shrink-1 window-grip-left">
                        <i class="bi bi-grip-vertical"></i>
                    </div>
                    <div class="col p-0 window-content calculation-data">
                        <!-- МАТЕРИАЛЫ -->
                        <table class="table-materials-list materials-list">
                            <thead></thead>
                            <tbody class="table-materials-list-body"></tbody>
                            <tfoot>
                                <tr data-id="">
                                    <td class="d-flex justify-content-center" style="grid-column: 1 / span 4;"><div class="">Материалы ИТОГО</div></td>
                                    <td class=""><input type="number" class="border-0 bg-body-secondary material-summary-cost" value="0" disabled  data-field="0"></td>
                                    <td class="" style="grid-column: 6 / span 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="fixed-tfooter">
                            <!-- БЛОК ФОТ -->
                            <div>
                                <table class="fot-header">
                                    <thead>
                                        <tr data-id="">
                                            <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 8;">
                                                <div class="d-flex justify-content-center flex-grow-1 fw-bold"><div class="fw-bold">Блок ФОТ</div></div>
                                                <div id="btnFot" class="btn-chek-list text-danger" style="cursor: pointer;">+</div>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                                    <table id="tableFot" class="fot collapsed">
                                        <thead>
                                            <tr>
                                                <th>ФОТ отделы</th>
                                                <th>Расч. руб</th>
                                                <th>Расч. час</th>
                                                <th>Коэ-т, ч</th>
                                                <th>Сумма</th>
                                                <th>ПРОВЕРКА</th>
                                                <th style="grid-column: 7 / 9;">Комментарии</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table-fot-list-body"></tbody>

                                        <!-- РУКОВОДСТВО И АРЕНДА -->
                                        <tbody>
                                            <tr>
                                                <td placeholder="">Сервис - упаковка</td>
                                                <td><input type="number" class="border-0 bg-body-secondary service-packed-cost" min="0" value="0" disabled></td>
                                                <td><input type="number" class="border-0 bg-body-secondary service-packed-cost-hour" min="0" value="0" disabled></td>
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td class="text-end bg-body-secondary px-1 service-packed-total"></td>
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td style="grid-column: 7 / 9;"><input type="text" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                            </tr>
                                            <tr>
                                                <td placeholder="">Руководство</td>
                                                <td><input type="number" class="border-0 bg-body-secondary management-cost" min="0" value="0" disabled></td>
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td class="text-end bg-body-secondary px-1 management-total"></td>
                                                <!-- <td><input type="number" class="border-0 bg-body-secondary management-cost" min="0" value="0" disabled></td> -->
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td style="grid-column: 7 / 9;"><input type="text" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                            </tr>
                                            <tr>
                                                <td placeholder="">Аренда</td>
                                                <td><input type="number" class="border-0 bg-body-secondary rent-cost" min="0" value="0" disabled></td>
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                                <td class="text-end bg-body-secondary px-1 rent-total"></td>
                                                <!-- <td><input type="number" class="border-0 bg-body-secondary rent-cost" min="0" value="0" disabled></td> -->
                                                <td><input type="number" class="border-0 bg-body-secondary" min="0" value="0" disabled ></td>
                                                <td style="grid-column: 7 / 9;"><input type="text" class="border-0 bg-body-secondary" min="0" value="0" disabled></td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr data-id="">
                                                <td class="d-flex justify-content-center" style="grid-column: 1 / span 3;"><div class="fw-bold">ФОТ ИТОГО</div></td>
                                                <td class="text-end px-1 fot-summary-cost"></td>
                                                <td class="" style="grid-column: 5 / 8;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                            </div>
                            <!-- Себестоимость -->
                            <table class="">
                                <tfoot>
                                    <tr data-id="">
                                        <td class="d-flex justify-content-center" style="grid-column: 1 / span 4;"><div class="fw-bold">Себестоимость</div></td>
                                        <td class="text-end bg-body-secondary px-1 cost-price"></td>
                                        <!-- <td class=""><input type="number" class="border-0 bg-body-secondary cost-price updated-field " value="0" disabled></td> -->
                                        <td class="" style="grid-column: 6 / 9;"><input type="text" class="border-0 bg-body-secondary" min="0" value="" disabled></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <!-- ДИАПОЗОНПРОДАЖИ -->
                            <table class="sell-range">
                                <tbody class="">
                                    <tr>
                                        <td class="d-flex justify-content-center align-items-center" style="grid-row: 1 / 3; grid-column: 1 / span 2; border-top: 2px solid #c3c3c3; border-bottom: 3px solid #c3c3c3;" placeholder="">Диопозон продажи</td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-coefficient" style="border-top: 2px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-coefficient" style="border-top: 2px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-coefficient" style="border-top: 2px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-coefficient" style="border-top: 2px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-coefficient" style="border-top: 2px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-coefficient" style="border-top: 2px solid #c3c3c3; border-right: 2px solid #c3c3c3"></td>
                                    </tr>
                                    <tr>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost" style="border-bottom: 3px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost" style="border-bottom: 3px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost" style="border-bottom: 3px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost" style="border-bottom: 3px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost" style="border-bottom: 3px solid #c3c3c3;"></td>
                                        <td class="text-end bg-body-secondary px-1 pl-0 sell-range-cost" style="border-bottom: 3px solid #c3c3c3;"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- КОММЕНТАРИЙ -->
                            <table class="comment">
                                <tbody>
                                    <tr>
                                        <td class="d-flex justify-content-center align-items-center fixed-rows-bottom" style="grid-column: 1 / span 2;">Комментарий</td>
                                        <td class="fixed-rows-bottom" style="grid-column: 3 / 9;"><textarea class="border-0 text-start general-comment"rows="2"></textarea></td>
                                    </tr>
                                    <tr>
                                        <td class="d-flex justify-content-center fixed-rows-bottom" style="grid-column: 1 / span 8;"><input type="text" class="calculation-fixed border-0 text-center" min="0" value="" disabled></td>
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
        // <td class=""><button id="btnFot" type="button" class="btn btn-success btn-sm btn-chek-list">Развернуть</button></td>
        // <td class="fixed-rows"><button id="btnCheckListComplexity" type="button" class="btn btn-success btn-sm btn-chek-list">Развернуть</button></td>
        // <td class="fixed-rows-bottom" style="grid-column: 2 / 8;"><input type="text" class="border-0 text-start general-comment" min="0" value="0" data-field="0"></td>
    }
}

// <!-- ЧЕК-ЛИСТ ВОПРОСОВ -->
// <div>
//     <table class="check-list-complexity-header">
//         <tr data-id="">
//             <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 8;">
//                 <div class="d-flex justify-content-center flex-grow-1 fw-bold"><div class="fw-bold">Чек лист определения сложности изделия</div></div>
//                 <div id="btnCheckListComplexity" class="btn-chek-list text-danger" style="cursor: pointer;">&plus;</div>
//             </td>
//         </tr>
//     </table>
//     <table class="check-list-complexity collapsed">
//         <thead>
//             <tr data-id="">
//                 <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 6;"><div class="fw-bold">Вопросы, требующие ОТВЕТА</div></td>
//                 <td class="d-flex fixed-rows justify-content-center" style="grid-column: 7 / 9;"><div class="fw-bold">Блок ответов</div></td>
//             </tr>
//         </thead>
//         <tbody class="check-list-complexity-questions-answer"></tbody>
//         <thead>
//             <tr data-id="">
//                 <td class="d-flex justify-content-center fixed-rows" style="grid-column: 1 / span 6;"><div class="fw-bold">Вопросы, требующие УТРЕЖДЕНИЯ</div></td>
//                 <td class="d-flex fixed-rows justify-content-center" style="grid-column: 7 / 9;"><div class="fw-bold">Кликер</div></td>
//             </tr>
//         </thead>
//         <tbody class="check-list-complexity-questions-statement"></tbody>
//     </table>
// </div>
