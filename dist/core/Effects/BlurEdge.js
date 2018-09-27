"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 边框模糊
 */
class BlurEdge {
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength = 1, startIndex = 0) {
        this.name = "be";
        this.isHeadEffect = false;
        this.strength = Math.round(strength); // strength 只能为整数. 代表应用模糊的次数.
        this.startIndex = startIndex;
    }
    addTo(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\be${this.strength}`;
    }
    static parse(text) {
        let strength = +text.match(/(\d+)/ig)[0];
        return new BlurEdge(strength);
    }
}
exports.default = BlurEdge;
//# sourceMappingURL=BlurEdge.js.map