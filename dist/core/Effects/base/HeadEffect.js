"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Effect_1 = require("./Effect");
/**
 * 仅出现在行首的特效标签
 */
class HeadEffect extends Effect_1.default {
    constructor() {
        super();
        this.startIndex = 0;
        this.isHeadEffect = true;
    }
}
exports.default = HeadEffect;
//# sourceMappingURL=HeadEffect.js.map