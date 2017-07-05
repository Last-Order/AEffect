"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
class DrawingMode {
    /**
     * 绘图模式
     * @param enable
     */
    constructor(enable = true) {
        this.isHeadEffect = false;
        this.name = "p";
        this.enable = enable;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\p${this.enable ? 1 : 0}`;
    }
    static parse(text) {
        return new DrawingMode(parseInt(text.match(/(\d+)/ig)[0]) === 1);
    }
}
exports.default = DrawingMode;
//# sourceMappingURL=DrawingMode.js.map