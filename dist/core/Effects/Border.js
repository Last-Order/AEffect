"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 边框宽度
 */
class Border {
    /**
     * 边框宽度
     * @param size 边框宽度(px)
     */
    constructor(size) {
        this.isHeadEffect = false;
        this.name = "bord";
        this.size = size;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\bord${this.size}`;
    }
    static parse(text) {
        return new Border(parseInt(text.match(/(\d+)/ig)[0]));
    }
}
exports.default = Border;
//# sourceMappingURL=Border.js.map