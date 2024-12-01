

export default class ProductItemService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async createProductItem(data) {
        // создаем новый товар
        newItemId = await this.productService.createMainProduct(
            data.fileId,
            productTitle,
            productCost,
            data.quantity,
        );

        const photo = await data.cbGetMainPhoto();
        // создаем вариацию товара созанного товара
        variationItemId = await this.productService.createVariationProduct(
            newItemId,
            productTitle,
            0,
            photo,
            data.quantity,
            productCost
        );
    }

    async createMainProduct(fileId, title, fileContent) {
        let fields = {
            active: "Y",
            detailText: title,
            detailTextType: "html",
            iblockId: "24",
            iblockSectionId: fileId,
            name: title,
            previewText: title,
            previewTextType: "text",
            purchasingCurrency: "RUB",
            // purchasingPrice: 0,
            property611: [{ value: 'описание' }],
            property615: [],
            quantity: 0,
            vatId: "11",
            vatIncluded: "Y",
            // type: 3,
        };
        if (fileContent && fileContent.length > 0) {
            // fields.property615.push({ value: { fileData: fileContent } });
            fields.property615 = { value: { fileData: fileContent } };
        }
        console.log("fields = ", fields);
        const response = await this.apiClient.callMethod('catalog.product.sku.add', {
            fields: fields,
        });

        return response?.sku?.id;
    }

    async createVariationProduct(parentProductId, title, fileContent, purchasingPrice, categoryId) {
        let fields = {
            iblockId: 25,
            productType: 3,
            parentId: parentProductId,
            name: title,
            purchasingCurrency: "RUB",
            quantity: 0,
            vatId: 11,
            vatIncluded: "Y",
            property347: [],
            property467: null,
            purchasingPrice: purchasingPrice,
        };

        if (fileContent && fileContent.length > 0) {
            fields.property347.push({ value: { fileData: fileContent } });
        }

        if (categoryId) {
            fields.property467 = { value: categoryId };
        }

        const response = await this.apiClient.callMethod('catalog.product.offer.add', {
            fields: fields,
        });

        return response?.offer?.id;
    }
}
