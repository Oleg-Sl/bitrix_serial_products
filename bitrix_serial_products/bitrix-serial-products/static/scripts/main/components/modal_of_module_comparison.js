import { CALC_FIELD_SOFA } from '../../configs/calc/sp_sofa.js';


export default class ModuleComparison {
    constructor(productsList) {
        this.productsList = productsList;

        this.modal = null;
    }

    initialize() {
        this.createModalWindow();

        this.modal = document.getElementById('openModalOfModuleComparison')
        this.modal.addEventListener('show.bs.modal', this.calc.bind(this));
    }

    calc() {
        const products = this.productsList.calcModulesPrice();
        const summaryProdcuctData = this.productsList.calcSummaryModulesPrice(products);
        console.log('Данные выбранных модулей: ', products);
        this.displayPriceModules(products, summaryProdcuctData);
    }

    displayPriceModules(products, summaryProdcuctData) {
        let modalBody = this.modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <table class="w-100">
                <colgroup>
                    <col style="width: 5%;">
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>

                    <col style="width: 8%;">
                    <col style="width: 8%;">
                    <col style="width: 8%;">
                    <col style="width: 8%;">
                    <col style="width: 8%;">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Номер</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Название</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Размер</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Кол-во модулей</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Кол-во ткани</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Материалы</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">ФОТ</th>
                        <th scope="col" class="text-center" rowspan="2" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Total себес</th>
                        <th scope="col" class="text-center" colspan="5" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Категория ткани</th>
                    </tr>
                    <tr>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Base</th>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Base+</th>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Premium</th>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Premium+</th>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Limited</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.getEconomiesListHTML(products)}
                </tbody>
                <tfoot>
                    ${this.getSummaryEconomiesListHTML(summaryProdcuctData)}
                </tfoot>
            </table>
        `;
    }

    getEconomiesListHTML(products) {
        let contentHTML = '';
        if (!products) {
            return contentHTML;
        }

        for (const i in products) {
            const product = products[i];
            // contentHTML += `
            //     <tr>
            //         <td class="text-start" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${+i + 1}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.freeTitle}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.width || '-'}*${product.depth || '-'}*${product.height || '-'}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productTotalMaterials ? product.productTotalMaterials.toLocaleString() : '-'}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productTotalFot ? product.productTotalFot.toLocaleString() : '-'}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productTotal ? product.productTotal.toLocaleString() : '-'}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Base'].toLocaleString()}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Base+'].toLocaleString()}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Premium'].toLocaleString()}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Premium+'].toLocaleString()}</td>
            //         <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Limited'].toLocaleString()}</td>
            //     </tr>
            // `;
            contentHTML += `
                <tr>
                    <td class="text-start" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${+i + 1}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.freeTitle}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.width || '-'}*${product.depth || '-'}*${product.height || '-'}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productCount}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.count_of_fabric1}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productTotalMaterials ? product.productTotalMaterials.toLocaleString() : '-'}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productTotalFot ? product.productTotalFot.toLocaleString() : '-'}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productTotal ? product.productTotal.toLocaleString() : '-'}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Base'].toLocaleString()}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Base+'].toLocaleString()}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Premium'].toLocaleString()}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Premium+'].toLocaleString()}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${product.productPrices['Limited'].toLocaleString()}</td>
                </tr>
            `;
        }
 
        return contentHTML;
    }

    getSummaryEconomiesListHTML(summaryProdcuctData) {
        return `
            <tr class="fw-bold">
                <td class="text-start text-uppercase text-center" colspan="3" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Итого</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productCount}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.count_of_fabric1.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productTotalMaterials.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productTotalFot.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productTotal.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productPrices.base.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productPrices.basePlus.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productPrices.premium.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productPrices.premiumPlus.toLocaleString()}</td>
                <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${summaryProdcuctData.productPrices.limited.toLocaleString()}</td>
            </tr>
        `;
    }

    createModalWindow() {
        const modalHTML = `
            <!-- Модальное окно -->
            <div class="modal modal-xl fade" id="openModalOfModuleComparison" tabindex="-1" aria-labelledby="openModalOfModuleComparisonLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="openModalOfModuleComparisonLabel">Сравнительная таблица модулей</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}