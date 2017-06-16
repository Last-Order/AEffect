"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 字体粗体
 */
class Bold {
    /**
     * 粗体
     * @param weight 字重
     * @param startIndex
     */
    constructor(weight = 1, startIndex = 0) {
        this.name = "b";
        this.isHeadEffect = false;
        this.weight = weight;
        this.startIndex = startIndex;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\b${this.weight}`;
    }
    static parse(text) {
        return new Bold(parseInt(text.match(/(\d+)/ig)[0]));
    }
}
exports.default = Bold;
//# sourceMappingURL=Bold.js.map