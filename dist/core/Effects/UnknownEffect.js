"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Effect_1 = require("./base/Effect");
const Effects = require(".");
class UnknownEffect extends Effect_1.default {
    constructor(effectText) {
        super();
        this.effectText = effectText;
    }
    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText) {
        let effectName = effectText.match(/^\\([a-zA-Z]+)/)[1];
        switch (effectName) {
            case "blur": return Effects.Blur.parse(effectText);
            default:
                return new UnknownEffect(effectText);
        }
    }
    toString() {
        return this.effectText;
    }
}
exports.default = UnknownEffect;
//# sourceMappingURL=UnknownEffect.js.map