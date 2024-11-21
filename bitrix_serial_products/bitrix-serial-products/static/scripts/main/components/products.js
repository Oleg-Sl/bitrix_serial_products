// import { DEAL_FIELDS } from '../config/dealFields';
import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';


export default class ProductsList {
    constructor(productsContainer, productsFields, currentUser, packed) {
        this.productsContainer = productsContainer;
        this.productsFields = productsFields;
        this.currentUser = currentUser;
        this.packed = packed;

        this.init();
    }
    

    init() {
        this.productsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('path-to-smart-process') && event.target.dataset.path) {
                BX24.openPath(event.target.dataset.path, r => console.log(r));
            }
        });
    }

    displaySpinner() {
        this.productsContainer.innerHTML = `
            <div class="d-flex justify-content-center w-100">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
            </div>
        `;
    }

    displayProducts(products) {
        this.productsContainer.innerHTML = "";
        let contentHTML = "";
        if (products.length !== 0) {
            products.forEach(product => {
                contentHTML += this.getProductCardHTML(mapKeys(product));
            });
            this.productsContainer.innerHTML = contentHTML;
        }
    }
    // BX24.openPath('/crm/type/145/details/287/', r => console.log(r))

    getProductCardHTML(product) {
        // console.log(product);
        return `
            <div class="app-products-card-container" data-id="${product.id}" data-smart-type-id="${product.entityTypeId}">
                <div class="col app-product-card">
                    <div class="product-card-header">
                        <div class="product-card-header-title text-truncate d-flex align-items-center">
                            <div class="text-truncate align-middle w-100 text-center" title="${product.title}">${product.title}</div>
                        </div>
                        <div class="product-card-header-measure">${this.getMarkerIsTechOk(product.isTechOk)}</div>
                    </div>
                    <div class="product-card-body-img">
                        <div class="overlay d-none"></div>
                        <img src="${this.getPhotoUrl_(product.canvasScreenMain?.urlMachine, portalUrl)}" class="card-img-top" alt="...">
                    </div>
                    <div class="product-card-body-freetitle">
                        <p class="text-nowrap text-truncate card-text" title="${product.freeTitle || "-"}">${product.freeTitle || "-"}</p>
                    </div>
                    <div class="px-0 product-card-body-footer" style="display: flex;">
                        <div>
                            <small class="mx-1 text-secondary" data-bs-toggle="dropdown" data-bs-custom-class="custom-popover" data-bs-auto-close="outside"  aria-expanded="false" class="text-body-secondary">info</small>
                            <div class="dropdown-menu p-0 dropdown-fabric-menu" id="fabric-info-1">
                                <div class="dropdown-header bg-secondary-subtle text-center dropdown-fabric-menu-header">Связанные СП</div>
                                <div class="dropdown-fabric-menu-content">
                                    <table class="table table-bordered table-sm mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Карточка:</td>
                                                <td class="text-end path-to-smart-process" data-path="/crm/type/${product.entityTypeId}/details/${product.id}/" style="cursor: pointer; text-decoration: underline; color: blue;">${product.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Расчет:</td>
                                                <td class="text-end path-to-smart-process" data-path="/crm/type/${product.calcTypeId}/details/${product.calculationId}/" style="cursor: pointer; text-decoration: underline; color: blue;">${product.calculationId}</td>
                                            </tr>
                                            <tr>
                                                <td>ФОТ:</td>
                                                <td class="text-end path-to-smart-process" data-path="/crm/type/1048/details/${product.parentId1048}/" style="cursor: pointer; text-decoration: underline; color: blue;">${product.parentId1048}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <small class="text-body-secondary">Размеры: ${this.getProductSize_(product) || "-"}</small>
                        </div>
                        <div>
                            <small class="mx-1 text-secondary" data-bs-toggle="dropdown" data-bs-custom-class="custom-popover" aria-expanded="false" class="text-body-secondary">Вес</small>
                            <div class="dropdown-menu p-0 dropdown-fabric-menu" id="fabric-info-1">
                                <div class="dropdown-header bg-secondary-subtle text-center dropdown-fabric-menu-header">Вес изделия</div>
                                <div class="dropdown-fabric-menu-content">
                                    <table class="table table-bordered table-sm mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Кв.м:</td>
                                                <td class="fabric-provider text-end">${this.packed.calcSquareMeters(product).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Пог.м:</td>
                                                <td class="fabric-collection text-end">${this.packed.calcLinearMeters(product).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Куб:</td>
                                                <td class="fabric-collection text-end">${this.packed.calcCubicCapacity(product).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Вес:</td>
                                                <td class="fabric-collection text-end">${this.packed.calcWeight(product).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Мест:</td>
                                                <td class="fabric-collection text-end">${this.packed.calcPlaces(product).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Доставка до МСК:</td>
                                                <td class="fabric-collection text-end">${product?.deliveryToMSK || '-'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPhotoUrl_(url, portalUrl) {
        return url || 'https://database.tamamm.ru/bitrix-crm-card/static/images/default.jpeg';
    }

    getMarkerIsTechOk(value) {
        // console.log('getMarkerIsTechOk value = ', value);
        if (value == 'Y') {
            return '✅';
        }
        return '';
    }


    getProductSize_(product) {
        if ('commonDimensionsDepth' in product) {
            return `${product.commonDimensionsWidth || "-"}x${product.commonDimensionsDepth || "-"}x${product.commonDimensionsHeight || "-"}`;
        }

        return `${product.commonDimensionsWidth || "-"}x${product.commonDimensionsHeight || "-"}`;
    }
}

