"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 字符缩放 <VsfilterMod 标签>
 */
class FontScale {
    /**
     * 字体缩放
     * @param scale 缩放比例
     * @param startIndex
     */
    constructor(scale = 100, startIndex = 0) {
        this.isHeadEffect = false;
        this.name = "fsc";
        this.scale = scale;
        this.startIndex = startIndex;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\fsc${this.scale}`;
    }
    static parse(text) {
        return new FontScale(parseInt(text.match(/(\d+)/ig)[0]));
    }
}
exports.default = FontScale;
//# sourceMappingURL=FontScale.js.map