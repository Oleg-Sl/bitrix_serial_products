import { FIELD_ECONOMY, FIELD_FABRICS } from '../../../import.js';


export default class EconomyService {
    constructor(economies, fieldParentId, fabrics) {
        this.arr = economies;
        this.fieldParentId = fieldParentId;
        this.fabrics = fabrics;
    }

    isValid() {
        return true;
    }

    add(item) {
        this.arr.push(item);
    }

    getFieldParent() {
        return this.fieldParentId;
    }

    getByParentId(parentId) {
        return this.arr.find(item => item[this.fieldParentId] == parentId);
    }

    getFabricAliases() {
        return Object.keys(FIELD_ECONOMY);
    }

    getMarginField(key) {
        return FIELD_ECONOMY[key]?.margin;
    }

    getPriceField(key) {
        return FIELD_ECONOMY[key]?.price;
    }

    getCategoryId(key) {
        return FIELD_ECONOMY[key]?.categoryId;
    }

    // getFabricSmartId(fabricAlias) {
    //     return FIELD_ECONOMY.find(item => item[this.fieldParentId] == parentId);
    // }

    getFabric(fabricAlias) {
        const fabricId = FIELD_ECONOMY[fabricAlias]?.smartId;
        return this.fabrics.find(item => item.id == fabricId);
    }

    getFabricPrice(fabricAlias) {
        const fabric = this.getFabric(fabricAlias);
        const fabricPrice = fabric?.[FIELD_FABRICS.price] || 0;
        return +fabricPrice;
    }

    getFabricName(fabricAlias) {
        const fabric = this.getFabric(fabricAlias);
        return fabric?.[FIELD_FABRICS.name] || '';
    }

    // getFabricId(fabricAlias) {
    //     const fabric = this.getFabric(fabricAlias);
    //     return fabric?.[FIELD_FABRICS.name] || '';
    // }
}
