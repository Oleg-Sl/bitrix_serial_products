// import { DEAL_FIELDS } from '../config/dealFields';
import { mapKeys, mapAliases } from '../../configs/mapping/key_mapping.js';


export default class ProductsList {
    constructor(productsContainer, productsFields, currentUser, packed) {
        this.productsContainer = productsContainer;
        this.productsFields = productsFields;
        this.currentUser = currentUser;
        this.packed = packed;
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

    getProductCardHTML(product) {
        console.log(product.isTemplatePotochka);
        return `
            <div class="app-products-card-container" data-id="${product.id}" data-smart-type-id="${product.entityTypeId}">
                <div class="col app-product-card">
                    <div class="product-card-header">
                        <div class="product-card-header-title text-truncate d-flex align-items-center">
                            <div class="text-truncate align-middle w-100 text-center" title="${product.title}">${product.title}</div>
                        </div>
                    </div>
                    <div class="product-card-body-img">
                        <div class="overlay d-none"></div>
                        <img src="${this.getPhotoUrl_(product.canvasScreenMain?.urlMachine, portalUrl)}" class="card-img-top" alt="...">
                    </div>
                    <div class="product-card-body-freetitle">
                        <p class="text-nowrap text-truncate card-text" title="${product.freeTitle || "-"}">${product.freeTitle || "-"}</p>
                    </div>
                    <div class="product-card-body-footer" style="display: flex;">
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

    getProductSize_(product) {
        if ('commonDimensionsDepth' in product) {
            return `${product.commonDimensionsWidth || "-"}x${product.commonDimensionsDepth || "-"}x${product.commonDimensionsHeight || "-"}`;
        }

        return `${product.commonDimensionsWidth || "-"}x${product.commonDimensionsHeight || "-"}`;
    }
}

