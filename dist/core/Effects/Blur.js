"use strict";
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur {
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength = 1, startIndex = 0) {
        this.name = "Blur";
        this.isHeadEffect = false;
        this.strength = strength;
        this.startIndex = startIndex;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\blur${this.strength}`;
    }
    static parse(text) {
        let strength = +text.match(/(\d+)/ig)[0];
        return new Blur(strength);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blur;
//# sourceMappingURL=Blur.js.map