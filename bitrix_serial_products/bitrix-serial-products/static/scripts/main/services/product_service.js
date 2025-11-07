import { getProductConfig, getProductConfigById } from '../../configs/utils.js';

import { ID_MSP } from "../../configs/products/msp.js";
import { ID_SOFA, BP_RECALCULATE_SOFA_COMBINATION } from "../../configs/products/sofa.js";
import { ID_BED } from "../../configs/products/bed.js";
import { ID_ARMCHAIR } from "../../configs/products/armchair.js";
import { ID_POUF } from "../../configs/products/pouf.js";
import { ID_MELOCHEVKA } from "../../configs/products/melochevka.js";
import { ID_NIGHTSTAND } from "../../configs/products/nightstand.js";
import { ID_TABLE } from "../../configs/products/table.js";
import { ID_CHAIR } from "../../configs/products/chair.js";
import { ID_SPECIFIC_WEIGHT } from "../../configs/smart_process/specific_weight.js";
import { ID_ECONOMY } from "../../configs/calc/economy.js";
import { ID_FOT } from "../../configs/calc/fot.js";
import { CALC_ID_SOFA } from "../../configs/calc/sp_sofa.js";
import { ID_COEFFICIENTS_FOT, FIELD_COEFFICIENTS_FOT, PRODUCT_TYPES_COEFFICIENTS_FOT } from "../../configs/calc/coefficientsfot.js"


export default class ProductService {
    constructor(apiClient) {
        this.apiClient = apiClient;

        // this.paginator = new Paginator();
        this.cbSavePagination = null;

        this.specificWeights = null;
        this.coefficientsfot = null;
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
        // const { title, smartId, field, calcTypeId } = getProductConfig(productType);
        const { title, smartId, field, calcTypeId } = getProductConfigById(productType);
        
        console.log({
            productType,
            title,
            smartId,
            field,
            params,
            page
        });
        try {
            let commandProducts = `crm.item.list?entityTypeId=${smartId}&filter[${field.isTemplatePotochka}]=1&order[id]=DESC&order[${field.isActive}]=DESC&order[${field.isMeasured}]=DESC&start=${(page - 1) * 50}`;
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
            this.getDataEconomies(products);
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

    async getDataEconomies(products) {
        let cmd = {};
        for (const product of products) {
            cmd[product.id] = `crm.item.list?entityTypeId=${ID_ECONOMY}&filter[parentId${product.entityTypeId}]=${product.id}`;
        }

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        if (!response || !response.result) {
            throw new Error('Invalid response from batch call');
        }

        const economies = {};
        for (const [productId, economyData] of Object.entries(response.result)) {
            economies[productId] = economyData?.items?.[0];
            // economies.push(economyData?.items?.[0]);
        }

        return economies;
    }

    async getCalculationData(products) {
        if (!products || products.length === 0) {
            return [];
        }

        let cmd = {};
        cmd['fots'] = `crm.item.list?entityTypeId=${ID_FOT}`;
        cmd['calculations'] = `crm.item.list?entityTypeId=${CALC_ID_SOFA}`;
        cmd['economies'] = `crm.item.list?entityTypeId=${ID_ECONOMY}`;

        for (const product of products) {
            cmd['fots'] += `&filter[@parentId${product.entityTypeId}][]=${product.id}`;
            cmd['calculations'] += `&filter[@parentId${product.entityTypeId}][]=${product.id}`;
            cmd['economies'] += `&filter[@parentId${product.entityTypeId}][]=${product.id}`;
        }

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        if (!response || !response?.result) {
            throw new Error('Invalid response from batch call');
        }

        return {
            fots: response.result?.fots?.items || [],
            calculations: response.result?.calculations?.items || [],
            economies: response.result?.economies?.items || []
        };
    }

    async getProductsFields() {
        const coefficientFotProductType = PRODUCT_TYPES_COEFFICIENTS_FOT[this.productTypeId];
        
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
            coefficientsfot: `crm.item.list?entityTypeId=${ID_COEFFICIENTS_FOT}`,

        };

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        });

        this.specificWeights = response?.result?.specificWeights?.items;
        this.coefficientsfot = response?.result?.coefficientsfot?.items;

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

    async runRecaculateCombinationBP(productTypeId, productId) {
        if (productTypeId != ID_SOFA) {
            return;
        }

        const result = await this.apiClient.runSmartProcessBP(
            BP_RECALCULATE_SOFA_COMBINATION,
            productTypeId,
            productId
        );
        return result;
    }
}
