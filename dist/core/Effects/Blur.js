"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur {
    /**
     * @param strength 模糊强度
     * @param start 起始位置
     */
    constructor(strength = 1, start = 0) {
        this.strength = strength;
        this.start = start;
    }
    toString() {
        return `\\blur${this.strength}`;
    }
}
exports.default = Blur;
//# sourceMappingURL=Blur.js.map