"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 位置
 */
class Pos {
    /**
     * @param x 横坐标
     * @param y 纵坐标
     */
    constructor(x, y) {
        this.isHeadEffect = true;
        this.startIndex = 0;
        this.name = "Pos";
        this.x = x;
        this.y = y;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\pos(${this.x}, ${this.y})`;
    }
    static parse(text) {
        return new Pos(+text.match(/pos\((\d+?),[ ]+(\d+?)\)/)[1], +text.match(/pos\((\d+?),[ ]+(\d+?)\)/)[2]);
    }
}
exports.default = Pos;
//# sourceMappingURL=Position.js.map