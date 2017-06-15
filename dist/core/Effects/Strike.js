"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 删除线
 */
class Strike {
    /**
     * 删除线
     * @param isUnderline 是否加删除线
     * @param startIndex
     */
    constructor(isUnderline, startIndex = 0) {
        this.isHeadEffect = false;
        this.isStrike = isUnderline;
        this.startIndex = startIndex;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\s${this.isStrike ? '1' : '0'}`;
    }
    static parse(text) {
        return new Strike(text.match(/(\d+)/ig)[0] === '1');
    }
}
exports.default = Strike;
//# sourceMappingURL=Strike.js.map