"use strict";
/**
 * 仅出现在行首的特效标签
 */
class HeadEffect extends Effect {
    constructor() {
        super();
        this.startIndex = 0;
        this.isHeadEffect = true;
    }
    handler(text) {
        text.groups[0].effectGroup.push(this);
        return text;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeadEffect;
//# sourceMappingURL=HeadEffect.js.map