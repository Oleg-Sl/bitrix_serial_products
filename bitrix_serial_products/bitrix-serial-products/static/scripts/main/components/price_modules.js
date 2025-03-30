

export default class PriceModules {
    constructor(productsList) {
        this.productsList = productsList;

        this.modal = null;
    }

    initialize() {
        this.createModalWindow();

        this.modal = document.getElementById('openPriceForModules')
        this.modal.addEventListener('show.bs.modal', this.calcPrice.bind(this));
    }

    calcPrice() {
        const products = this.productsList.calcModulesPrice();
        console.log('Данные для расчета стоимости суммы модулей: ', products);
        this.displayPriceModules(products);
    }

    displayPriceModules(products) {
        let modalBody = this.modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <table class="w-100">
                <thead>
                    <tr>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Серия</th>
                        <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Цена</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.getEconomiesListHTML(products)}
                </tbody>
            </table>
        `;
    }

    getEconomiesListHTML(products) {
        let contentHTML = '';
        if (!products) {
            return contentHTML;
        }

        let data = {};
        for (const product of products) {
            for (const fabricTitle in product.productPrices) {
                if (!(fabricTitle in data)) {
                    data[fabricTitle] = 0;
                }
                data[fabricTitle] += product.productPrices[fabricTitle] * product.productCount;
            }
        }

        for (const fabricTitle in data) {
            const price = data[fabricTitle];
            contentHTML += `
                <tr>
                    <td class="text-start" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${fabricTitle}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${price.toLocaleString()}</td>
                </tr>
            `;
        }
        // result.push({
        //     productId: productId,
        //     productTitle: mapKeys(product).title,
        //     productCount: countOfModules,
        //     productPrices: {fabric1: price1, fabric2: price2, ...}
        // });
        return contentHTML;
    }

    createModalWindow() {
        const modalHTML = `
            <!-- Модальное окно -->
            <div class="modal fade" id="openPriceForModules" tabindex="-1" aria-labelledby="openPriceForModulesLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="openPriceForModulesLabel">Расчет стоимости</h1>
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