import BaseApp from '../base.js';
import { ID_TABLE, FIELD_TABLE, } from '../../../configs/products/table.js';
import FabricManager from '../../components/fabric/products/table.js';
import TableView from '../../components/view/products/tableview.js';
import CalculationManager from '../../components/calculation/calcmanager.js';
import { CALC_ID_TABLE, CALC_FIELD_TABLE } from '../../../configs/calc/sp_table.js';
import CheckTableData from '../../components/validity/tablequestionvalidity.js'


// const MAIN_PHOTO_RATIO = (17.49/13.83);
const MAIN_PHOTO_RATIO = (17.46/10.15);


export default class TableApp extends BaseApp {
    constructor(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService) {
        super(apiClient, productService, fabricService, userService, mechanismService, callbackService, fileUploadService, ID_TABLE, FIELD_TABLE, MAIN_PHOTO_RATIO);

        this.productNameRus = 'Стол';
        this.fabricManager = new FabricManager(fabricService, productService, this.displayFabric.bind(this));
        this.viewMain = new TableView(productService, userService, callbackService, this.callbackProductItem.bind(this));
        this.checkData = new CheckTableData(productService, this.fabricManager, this.productNameRus);
        this.calculation = new CalculationManager(
            apiClient,
            CALC_ID_TABLE,
            CALC_FIELD_TABLE,
            ID_TABLE,
            this.productService.getValue('id'),
            this.productNameRus,
            this.checkData.getProductData.bind(this.checkData),
            false,
            this.handlerSaveChanges.bind(this),
            this.fotAccessManager,
            this.currentUserId
        );
    }

    getProperty553() {
        const materialTop = this.productService.getValue('materialTop');
        console.log('materialTop = ', materialTop);
        if (materialTop == 6711) {
            // Эмаль (акриловый лак)
            return 719;
        } else if (materialTop == 6713) {
            // Эмаль (ПУ лак)
            return 719;
        } else if (materialTop == 6715) {
            // Керамогранит
            return 795;
        } else if (materialTop == 6727) {
            // Микробетон
            return 831;
        } else if (materialTop == 6719) {
            // Кожа
            return 487;
        } else if (materialTop == 6717) {
            // Нат. шпон
            return 683;
        } else if (materialTop == 6721) {
            // Нат. камень
            return 485;
        }
    }

    getProperty547() {
        const filterSize = this.productService.getValue('filterSize') || '-';
        console.log('filterSize = ', filterSize);
        if (filterSize == 6057) {
            // XS
            return 713;
        } else if (filterSize == 6059) {
            // S
            return 473;
        } else if (filterSize == 6061) {
            // M
            return 475;
        } else if (filterSize == 6063) {
            // L
            return 477;
        } else if (filterSize == 6065) {
            // XL
            return 715;
        } else if (filterSize == 6067) {
            // XXL
            return 717;
        } else if (filterSize == 6679) {
            // XXXL
            return 819;
        }
    }

    async callbackProductItem(action, productId = null, detailText = null) {
        let fields = {};
        const property553 = this.getProperty553();
        console.log('property553 = ', property553);

        if (property553) {
            fields.property553 = { value: property553 };
        }

        const property547 = this.getProperty547();
        console.log('property547 = ', property547);

        if (property547) {
            fields.property547 = { value: property547 };
        }
        console.log('fields = ', fields);
        
        // action = 0 - создание главного товара и вариаций
        // action = 1 - обновление вариаций
        if (action == 0) {
            return await this.createProductItem(productId, detailText, fields);
        } else if (action == 1) {
            return await this.updateProductItem(fields);
        }
    }

    getMainProductItemTitle() {   
        const variantTable = this.productService.getValueText('filterVariantTable') || '-';       
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        return `${variantTable} ${collection}`;
    }

    getProductItemvariationTitle(fabric = null) {
        const variantTable = this.productService.getValueText('filterVariantTable') || '-';
        const collection = this.productService.getValueText('filterNameCollection') || '-';
        const tableSize = this.productService.getValueText('filterSize') || '-';

        const w = this.productService.getValue('commonDimensionsWidth') || '-';
        const d = this.productService.getValue('commonDimensionsDepth') || '-';
        const h = this.productService.getValue('commonDimensionsHeight') || '-';

        const countertopMaterial = this.productService.getValueText('countertopMaterial') || '-';
        const materialTop = this.productService.getValueText('materialTop') || '-';
        const materialOpora = this.productService.getValueText('material_2') || '-';
        
        
        let title = `${variantTable} ${collection} ${tableSize}.`;
        title += ` Общий размер: Ш-${w}*Г-${d}*В-${h} мм.`
        title += ` Столешница: ${countertopMaterial}.`;
        title += ` ТОП: ${materialTop}.`;
        title += ` Опора: ${materialOpora}`;
        return title;
    }
}
