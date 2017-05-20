"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Effect_1 = require("./Effect");
/**
 * 仅出现在行首的特效标签
 */
class HeadEffect extends Effect_1.default {
    constructor() {
        super();
        this.isHeadEffect = true;
        this.startIndex = 0;
    }
}
exports.default = HeadEffect;
//# sourceMappingURL=HeadEffect.js.map