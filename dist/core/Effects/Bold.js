"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 字体粗体
 */
class Bold {
    constructor(weight) {
        this.name = "b";
        this.isHeadEffect = false;
        this.weight = weight;
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
//# sourceMappingURL=Bold.js.map