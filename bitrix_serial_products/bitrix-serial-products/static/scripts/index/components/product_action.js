// import ProductModel from '../models/product_model.js';
// import ProductView from '../views/product_view.js';
// import { getProductDescription, getProductFields } from '../../parameters/common.js';
// import { SP_BZP_ID } from '../../parameters/bizprocgendocs.js'

// import { ID_MSP, FIELD_MSP } from '../../parameters/sp_msp.js';
// import { ID_SOFA, FIELD_SOFA } from '../../parameters/sp_sofa.js';
// import { ID_ARMCHAIR, FIELD_ARMCHAIR } from '../../parameters/sp_armchair.js';
// import { ID_BED, FIELD_BED } from '../../parameters/sp_bed.js';
// import { ID_POUF, FIELD_POUF } from '../../parameters/sp_pouf.js';
// import { ID_MELOCHEVKA, FIELD_MELOCHEVKA } from '../../parameters/sp_melochevka.js';
// import { ID_NIGHTSTAND, FIELD_NIGHTSTAND } from '../../parameters/sp_nightstands.js';
// import { ID_TABLE, FIELD_TABLE } from '../../parameters/sp_table.js';
// import { ID_CHAIR, FIELD_CHAIR } from '../../parameters/sp_chair.js';

// import { DeliveryCalculator } from '../../common/delivery_calculation/delivery_calculator.js';
// // import { DeliveryCalculation } from '../../common/delivery_calculation/delivery_calculation.js';
// import { DimensionsManager } from '../../common/delivery_calculation/dimensions_manager/manager.js';
// import { DocsPrinterManager } from '../../common/permission/docs/docsprinter_manager.js';
import { getProductConfig } from '../../configs/utils.js';


export default class ProductAction {
    constructor(bx24) {
        this.bx24 = bx24;

        this.addProductButtonsContainer = document.getElementById('addProductContainer');
        this.productCardsContainer = document.getElementById('productCardsContainer');
    }

    initialize() {
        // создание нового изделия
        this.addProductButtonsContainer.addEventListener('click', async (event) => {
            if (event.target.tagName === 'A') {
                const productType = event.target.getAttribute('data-type');
                console.log('productType = ', productType);
                const { title, smartTypeId, field } = getProductConfig(productType);
                const productId = 1;
                await this.bx24.openProductCard(smartTypeId, productId, title);
            }
        });

        // редактирование изделия
        this.productCardsContainer.addEventListener('dblclick', async (event) => {
            const target = event.target.closest('[data-id]');
            if (target) {
                const productId = target.dataset.id;
                const smartTypeId = target.dataset.smartTypeId;
                console.log('productId = ', productId);
                console.log('smartTypeId = ', smartTypeId);
                await this.bx24.openProductCard(smartTypeId, productId, smartTypeId);
            }
        });
    }

    


    // async handleCreateProduct(event, productFields) {
    //     const target = event.target;
    //     const productType = target.dataset.productType;
    //     const smartTypeId = target.dataset.smartTypeId;
    //     const title = target.textContent;
    //     const product = await this.model.createProduct(smartTypeId, title, productFields, this.currentUser.ID);
    //     console.log('product = ', product);
    //     if (!product) {
    //         alert('Не удалось создать изделие: ' + title);
    //         return;
    //     }
    //     await this.model.openProduct(productType, product?.id, title);
    //     await this.model.update();
    //     this.sketchController.setProducts(this.model.productsData);
    //     const isClientDocsPrinter = this.docsPrinterManager.isClientDocsPrinter(this.currentUser.ID);
    //     this.view.renderProductInfo(this.model.getProductsData(), isClientDocsPrinter, this.portalUrl);
    // }

    // async hadleOpenProduct(event) {
    //     const target = event.target.closest('[data-id]');
    //     if (target) {
    //         const productId = target.dataset.id;
    //         const smartTypeId = target.dataset.smartTypeId;
    //         const { code, title } = getProductDescription(smartTypeId);
    //         if (!code || !title) {
    //             console.log("Unknown product type");
    //             return;
    //         }
    //         await this.model.openProduct(code, productId, title);
    //         await this.model.update();
    //         this.sketchController.setProducts(this.model.productsData);
    //         const isClientDocsPrinter = this.docsPrinterManager.isClientDocsPrinter(this.currentUser.ID);
    //         this.view.renderProductInfo(this.model.getProductsData(), isClientDocsPrinter, this.portalUrl);
    //     }
    // }
}
