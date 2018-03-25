"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 下划线
 */
class Underline {
    /**
     * 下划线
     * @param isUnderline 是否加下划线
     * @param startIndex
     */
    constructor(isUnderline, startIndex = 0) {
        this.name = "u";
        this.isHeadEffect = false;
        this.isUnderline = isUnderline;
        this.startIndex = startIndex;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\u${this.isUnderline ? '1' : '0'}`;
    }
    static parse(text) {
        return new Underline(text.match(/(\d+)/ig)[0] === '1');
    }
}
exports.default = Underline;
//# sourceMappingURL=Underline.js.map