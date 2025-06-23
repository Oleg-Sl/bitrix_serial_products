// import { DEAL_FIELDS } from '../config/dealFields';
import { mapKeys, mapAliases, getFieldInBx24 } from '../../configs/mapping/key_mapping.js';
import { FIELD_ECONOMY } from '../../configs/calc/economy.js';
import { ID_SOFA, FIELD_SOFA } from '../../configs/products/sofa.js';
import { CALC_FIELD_SOFA } from '../../configs/calc/sp_sofa.js';


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

    getFieldData(productType, fieldAlias) {
        const fieldInBx24 = getFieldInBx24(productType, fieldAlias);
        if (!fieldInBx24) {
            return {};
        }
        return this.productsFields[productType][fieldInBx24];
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

    displayProducts(products, economies, calculations, fots) {
        this.products = products;
        this.economies = economies;
        this.calculations = calculations;
        this.fots = fots;

        this.productsContainer.innerHTML = "";
        let contentHTML = "";
        if (products.length !== 0) {
            products.forEach(product => {
                // const economy = economies[product.id];
                const economy = economies.find(item => item[`parentId${product.entityTypeId}`] == product.id);
                const calculation = calculations.find(item => item[`parentId${product.entityTypeId}`] == product.id);
                const fot = fots.find(item => item[`parentId${product.entityTypeId}`] == product.id);
                
                // console.log('product.id = ', product.id);
                // console.log('economy = ', economy);
                // console.log('calculation = ', calculation);
                // console.log('fot = ', fot);
                contentHTML += this.getProductCardHTML(mapKeys(product), economy);
            });
            this.productsContainer.innerHTML = contentHTML;
        }
    }
    // BX24.openPath('/crm/type/145/details/287/', r => console.log(r))

    getProductCardHTML(product, economy) {
        return `
            <div class="app-products-card-container" data-id="${product.id}" data-smart-type-id="${product.entityTypeId}">
                <div class="col app-product-card">
                    <div class="product-card-header px-0">
                        <div class="dropdown">
                            <button class="btn p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">💲</button>
                            <div class="dropdown-menu p-0 dropdown-fabric-menu" id="" data-popper-placement="left-start">
                                <div class="dropdown-fabric-menu-content">
                                    <table class="w-100">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Серия</th>
                                                <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">Цена</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${this.getEconomiesListHTML(economy)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        ${this.getCountOfModulesHTML(product)}
                        <div class="product-card-header-title text-truncate d-flex align-items-center">
                            <div class="text-truncate align-middle w-100 text-center" title="${product.title}">${product.title}</div>
                        </div>
                        <div class="d-flex align-items-center product-card-header-comdirok" style="font-size: 24px;">${this.getMarkerIsComDirOk(product.isComDirOk)}</div>
                        <div class="d-flex align-items-center product-card-header-measure">${this.getMarkerIsTechOk(product.isTechOk)}</div>
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
                                    <table class="w-100">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="text-center" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">ID головного товара</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-start" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">
                                                    <a class="" data-path="/crm/catalog/24/product/${product?.productMainId || '-'}/" target="_blank" href="https://99frank.bitrix24.ru/crm/catalog/24/product/${product?.productMainId || '-'}/">
                                                        ${product?.productMainId || '-'}
                                                    </a>
                                                </td>
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
        if (value == 'Y') {
            return '✅';
        }
        return '';
    }

    getMarkerIsComDirOk(value) {
        if (value == 'Y') {
            return '💰';
        }
        return '';
    }

    getProductSize_(product) {
        if ('commonDimensionsDepth' in product) {
            return `${product.commonDimensionsWidth || "-"}x${product.commonDimensionsDepth || "-"}x${product.commonDimensionsHeight || "-"}`;
        }

        return `${product.commonDimensionsWidth || "-"}x${product.commonDimensionsHeight || "-"}`;
    }

    getEconomiesListHTML(economy) {
        let contentHTML = '';
        if (!economy) {
            return contentHTML;
        }
        for (const fabricAlias in FIELD_ECONOMY) {
            const title = FIELD_ECONOMY[fabricAlias].title;
            const fieldPrice = FIELD_ECONOMY[fabricAlias].price;
            const price = economy[fieldPrice] || 0;
            contentHTML += `
                <tr>
                    <td class="text-start" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${title}</td>
                    <td class="text-end" style="border: 1px solid #e3e3e3; padding: 4px; font-size: 14px;">${price.toLocaleString()}</td>
                </tr>
            `;
        }

        return contentHTML;
    }

    calcModulesPrice() {
        let result = [];
        const productCards = this.productsContainer.querySelectorAll('.product-card-header-count-of-modules input');
        for (const productCard of productCards) {
            const productId = productCard.dataset.id;
            const countOfModules = +productCard.value || 0;
            if (!productId || !countOfModules || countOfModules === 0) {
                continue;
            }

            const product = this.products.find(item => item.id == productId);
            if (!product) {
                console.error(`Не найдены данные изделия с id = ${productId}`);
                continue;
            }
            
            // const economy = this.economies[productId] || {};
            const economy = this.economies.find(item => item[`parentId${product.entityTypeId}`] == product.id) || {};
            let productPrices = {};
            for (const fabricAlias in FIELD_ECONOMY) {
                const title = FIELD_ECONOMY[fabricAlias].title;
                const fieldPrice = FIELD_ECONOMY[fabricAlias].price;
                productPrices[title] = economy[fieldPrice] || 0;
            }

            const calculation = this.calculations.find(item => item[`parentId${product.entityTypeId}`] == product.id) || {};
            const fot = this.fots.find(item => item[`parentId${product.entityTypeId}`] == product.id) || {};

            const productAliasesData = mapKeys(product);
            result.push({
                productId: productId,
                productTitle: productAliasesData.title,
                freeTitle: productAliasesData.freeTitle,
                width: productAliasesData.commonDimensionsWidth,
                height: productAliasesData.commonDimensionsHeight,
                depth: productAliasesData.commonDimensionsDepth,
                productCount: countOfModules,
                productPrices: productPrices,
                productTotalMaterials: calculation?.[CALC_FIELD_SOFA.totalMaterials],
                productTotal: calculation?.[CALC_FIELD_SOFA.total],
                productTotalFot: calculation?.[CALC_FIELD_SOFA.cost] - calculation?.[CALC_FIELD_SOFA.totalMaterials]
            });
        }

        return result;
    }

    getCountOfModulesHTML(product) {
        if (product.entityTypeId == ID_SOFA) {
            return `
                <div class="product-card-header-count-of-modules" style="width: 50px;">
                    <input class="form-control form-control-sm" type="number" data-id="${product.id}" min="0" max="99" step="1">
                </div>
            `;
        }
        return '';
    }
}

