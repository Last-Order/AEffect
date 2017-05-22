"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Effect_1 = require("./base/Effect");
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur extends Effect_1.default {
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength = 1, startIndex = 0) {
        super();
        this.name = "Blur";
        this.strength = strength;
        this.startIndex = startIndex;
    }
    toString() {
        return `\\blur${this.strength}`;
    }
}
exports.default = Blur;
//# sourceMappingURL=Blur.js.map