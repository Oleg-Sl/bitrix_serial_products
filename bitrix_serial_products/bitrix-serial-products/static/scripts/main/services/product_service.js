import { getProductConfig } from '../../configs/utils.js';

// import Paginator from '../components/paginator.js';

import { ID_MSP } from "../../configs/products/msp.js";
import { ID_SOFA } from "../../configs/products/sofa.js";
import { ID_BED } from "../../configs/products/bed.js";
import { ID_ARMCHAIR } from "../../configs/products/armchair.js";
import { ID_POUF } from "../../configs/products/pouf.js";
import { ID_MELOCHEVKA } from "../../configs/products/melochevka.js";
import { ID_NIGHTSTAND } from "../../configs/products/nightstand.js";
import { ID_TABLE } from "../../configs/products/table.js";
import { ID_CHAIR } from "../../configs/products/chair.js";
import { ID_SPECIFIC_WEIGHT } from "../../configs/smart_process/specific_weight.js";


export default class ProductService {
    constructor(apiClient) {
        this.apiClient = apiClient;

        // this.paginator = new Paginator();
        this.cbSavePagination = null;

        this.specificWeights = null;
    }

    setPagination(cbSavePagination) {
        this.cbSavePagination = cbSavePagination;
    }

    createProduct(productType) {
        const { title, smartId, field, potochkaId } = getProductConfig(productType);

        const cmd = {
            products: `crm.item.add?entityTypeId=${smartId}&fields[title]=${title}&fields[${field?.isPotochka}]=${potochkaId}&fields[${field?.isTemplatePotochka}]=Y`,
        };

        return this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });
    }

    async getFilterProducts(productType, params, page = 1) {
        const { title, smartId, field, calcTypeId } = getProductConfig(productType);
        console.log({
            productType,
            title,
            smartId,
            field,
            params,
            page
        });
        try {
            let commandProducts = `crm.item.list?entityTypeId=${smartId}&filter[${field.isTemplatePotochka}]=1&order[${field.isActive}]=DESC&order[${field.isMeasured}]=DESC&start=${(page - 1) * 50}`;
            for (const [key, value] of Object.entries(params)) {
                commandProducts += `&filter[${field[key]}]=${value}`;
            }

            const response = await this.apiClient.callMethod('batch', {
                halt: 0,
                cmd: {
                    products: commandProducts
                }
            });
            console.log('response', response);

            if (!response || !response.result?.products?.items) {
                throw new Error('Invalid response from batch call');
            }

            this.cbSavePagination(page, response?.result_total?.products || 0);

            const products = response?.result?.products?.items || [];
            return products.map(product => {
                product.calcTypeId = calcTypeId;
                return product;
            });
            // self.paginator.setPagination(1, totalItems, pageSize);
        } catch (error) {
            console.error('Error in getProducts:', error);
            throw error;
        }
    }

    async getProducts(productType, page = 1) {
        const { title, smartId, field } = getProductConfig(productType);
        console.log({
            productType,
            title,
            smartId,
            field
        });
        try {
            const cmd = {
                products: `crm.item.list?entityTypeId=${smartId}&filter[${field.isTemplatePotochka}]=1&order[${field.isActive}]=DESC&order[${field.isMeasured}]=DESC&start=${(page - 1) * 50}`,
            };

            const response = await this.apiClient.callMethod('batch', {
                halt: 0,
                cmd: cmd
            });
            console.log('response', response);

            if (!response || !response.result?.products?.items) {
                throw new Error('Invalid response from batch call');
            }

            this.cbSavePagination(page, response?.result_total?.products || 0);

            return response?.result?.products?.items || [];
        } catch (error) {
            console.error('Error in getProducts:', error);
            throw error;
        }
    }

    async getProductsFields() {
        const cmd = {
            fieldsMsp: `crm.item.fields?entityTypeId=${ID_MSP}`,
            fieldsSofa: `crm.item.fields?entityTypeId=${ID_SOFA}`,
            fieldsBed: `crm.item.fields?entityTypeId=${ID_BED}`,
            fieldsArmchair: `crm.item.fields?entityTypeId=${ID_ARMCHAIR}`,
            fieldsPouf: `crm.item.fields?entityTypeId=${ID_POUF}`,
            fieldsMelochevka: `crm.item.fields?entityTypeId=${ID_MELOCHEVKA}`,
            fieldsNightstand: `crm.item.fields?entityTypeId=${ID_NIGHTSTAND}`,
            fieldsTable: `crm.item.fields?entityTypeId=${ID_TABLE}`,
            fieldsChair: `crm.item.fields?entityTypeId=${ID_CHAIR}`,

            specificWeights: `crm.item.list?entityTypeId=${ID_SPECIFIC_WEIGHT}`,

        };

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        this.specificWeights = response?.result?.specificWeights?.items;

        return {
            [ID_MSP]: response?.result?.fieldsMsp?.fields,
            [ID_SOFA]: response?.result?.fieldsSofa?.fields,
            [ID_BED]: response?.result?.fieldsBed?.fields,
            [ID_ARMCHAIR]: response?.result?.fieldsArmchair?.fields,
            [ID_POUF]: response?.result?.fieldsPouf?.fields,
            [ID_MELOCHEVKA]: response?.result?.fieldsMelochevka?.fields,
            [ID_NIGHTSTAND]: response?.result?.fieldsNightstand?.fields,
            [ID_TABLE]: response?.result?.fieldsTable?.fields,
            [ID_CHAIR]: response?.result?.fieldsChair?.fields
        };
    }

    async getSpecificWeights() {
        if (!this.specificWeights) {
            const response = await this.apiClient.callMethod('crm.item.list', {
                entityTypeId: ID_SPECIFIC_WEIGHT
            });

            if (!response || !response.items) {
                throw new Error('Invalid response from batch call');
            }

            this.specificWeights = response?.items;
        }

        return this.specificWeights;
    }

    async openProductCard(productTypeId, productId, title) {
        console.log('openProductCard', productTypeId, productId, title);
        await new Promise((resolve, reject) => {
            BX24.openApplication(
                {
                    'opened': true,
                    'bx24_leftBoundary': 100,
                    'bx24_label': {
                        'bgColor':'pink',
                        'text': 'my task',
                        'color': '#07ff0e',
                    },
                    'bx24_title': title,
                    'parameters': {
                        'productTypeId': productTypeId,
                        'productId': productId,
                    }
                },
                function(response) {
                    if (response && response.error) {
                        reject(response.error);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    }
}
