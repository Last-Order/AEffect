"use strict";
const BaseEffect_1 = require("./base/BaseEffect");
const Blur_1 = require("./Blur");
class UnknownEffect {
    constructor(effectText) {
        this.isHeadEffect = false;
        this.startIndex = 0;
        this.name = "UnknownEffect";
        this.effectText = effectText;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText) {
        let effectName = effectText.match(/^\\([a-zA-Z]+)/)[1];
        switch (effectName) {
            case "blur": return Blur_1.default.parse(effectText);
            default:
                return new UnknownEffect(effectText);
        }
    }
    toString() {
        return this.effectText;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UnknownEffect;
//# sourceMappingURL=UnknownEffect.js.map