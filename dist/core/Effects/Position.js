"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Effect_1 = require("./base/Effect");
/**
 * 位置
 */
class Position extends Effect_1.default {
    /**
     * @param x 横坐标
     * @param y 纵坐标
     */
    constructor(x, y) {
        super();
        this.isHeadEffect = true;
        this.name = "Position";
        this.x = x;
        this.y = y;
    }
    toString() {
        return `\\pos(${this.x}, ${this.y})`;
    }
    static parse(text) {
        return new Position(+text.match(/pos\((\d+?),[ ]+(\d+?)\)/)[1], +text.match(/pos\((\d+?),[ ]+(\d+?)\)/)[2]);
    }
}
exports.default = Position;
//# sourceMappingURL=Position.js.map