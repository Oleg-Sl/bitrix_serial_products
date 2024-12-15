

export default class ProductItemService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async removeImages(productIds) {
        let cmd = {};
        for (const productId of productIds) {
            cmd[productId] = `catalog.productImage.list?productId=${productId}&select[]=id`;
        }
        const responseGetImages = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        })
        console.log("responseGetImages = ", responseGetImages);
        let dataImages = [];

        for (const productId in responseGetImages?.result || {}) {
            const productImages = responseGetImages?.result[productId];
            for (const images of Object.values(productImages)) {
                for (const image of images) {
                    dataImages.push({
                        imageId: image.id,
                        productId: productId
                    });
                }
            }
        }
        cmd = {};
        let i = 0;
        for (const { imageId, productId } of dataImages) {
            i += 1;
            if (i > 45) break;
            cmd[`del_${imageId}`] = `catalog.productImage.delete?productId=${productId}&id=${imageId}`;
        }
        const responseRemoveImages = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        })
        console.log("responseRemoveImages = ", responseRemoveImages);
    }

    async createMainProduct(fileId, title, detailText, overallDimensions, fileContent) {
        let fields = {
            active: "Y",
            detailText: detailText,
            detailTextType: "html",
            iblockId: "24",
            iblockSectionId: fileId,
            name: title,
            previewText: title,
            previewTextType: "text",
            purchasingCurrency: "RUB",
            // purchasingPrice: 0,
            property611: [{ value: overallDimensions }],
            property615: [],
            quantity: 0,
            vatId: "11",
            vatIncluded: "Y",
        };
        if (fileContent && fileContent.length > 0) {
            fields.property615 = { value: { fileData: fileContent } };
        }
        console.log("fields = ", fields);
        const response = await this.apiClient.callMethod('catalog.product.sku.add', {
            fields: fields,
        });

        return response?.sku?.id;
    }

    async updateMainProduct(mainProductId, fileContent) {
        let fields = {
        };
        if (fileContent && fileContent.length > 0) {
            fields.property615 = { value: { fileData: fileContent } };
            const response = await this.apiClient.callMethod('catalog.product.sku.update', {
                id: mainProductId,
                fields: fields,
            });
            console.log("updateMainProduct response = ", response);
            return response?.sku?.id;
        }
    }

    // async createVariationProduct(parentProductId, title, fileContent, purchasingPrice, categoryId) {
    async createVariationProduct(fields) {
        // let fields = {
        //     iblockId: 25,
        //     productType: 3,
        //     parentId: parentProductId,
        //     name: title,
        //     purchasingCurrency: "RUB",
        //     measure: "9",
        //     quantity: 0,
        //     vatId: 11,
        //     vatIncluded: "Y",
        //     property347: [],
        //     property467: null,
        //     // purchasingPrice: purchasingPrice,
        // };

        // if (fileContent && fileContent.length > 0) {
        //     fields.property347.push({ value: { fileData: fileContent } });
        // }

        // if (categoryId) {
        //     fields.property467 = { value: categoryId };
        // }

        const response = await this.apiClient.callMethod('catalog.product.offer.add', {
            fields: fields,
        });

        return response?.offer?.id;
    }

    // async updateVariationProduct(variationId, title, fileContent, purchasingPrice, categoryId) {
    async updateVariationProduct(variationId, fields) {
        // let fields = {
        //     name: title,
        //     measure: "9",
        //     property347: [],
        //     property467: null,
        //     // purchasingPrice: purchasingPrice,
        // };

        // if (fileContent && fileContent.length > 0) {
        //     fields.property347.push({ value: { fileData: fileContent } });
        // }

        // if (categoryId) {
        //     fields.property467 = { value: categoryId };
        // }

        const response = await this.apiClient.callMethod('catalog.product.offer.update', {
            id: variationId,
            fields: fields,
        });

        return response;
    }

    async createRetailPrice(variationIds, retailPrices) {
        let cmd = {};
        for (let i = 0; i < variationIds.length; i++) {
            const variationId = variationIds[i];
            const retailPrice = retailPrices[i];
            cmd[`price${variationId}`] = `catalog.price.add?fields[catalogGroupId]=2&fields[currency]=RUB&fields[price]=${retailPrice}&fields[productId]=${variationId}`;
        }

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        })
        return response;
    }

    async saveRetailPrice(variationIds, retailPrices) {
        let cmd = {};
        for (let i = 0; i < variationIds.length; i++) {
            const variationId = variationIds[i];
            const retailPrice = retailPrices[i];
            cmd[`price${variationId}`] = `catalog.price.list?filter[productId]=${variationId}`;
            cmd[`update${variationId}`] = `catalog.price.update?id=$result[price${variationId}][prices][0][id]&fields[price]=${retailPrice}`;
        }

        const response = await this.apiClient.callMethod('batch', {
            halt: 0,
            cmd: cmd
        })
        return response;
    }

    async saveVariationIdsToProduct(entityTypeId, productId, fields) {
        const response = await this.apiClient.callMethod('crm.item.update', {
            entityTypeId: entityTypeId,
            id: productId,
            fields: fields,
        });
        return response;
    }

}
