"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
const Effects = require("../../Effects");
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
            case "blur": return Effects.Blur.parse(effectText);
            case "be": return Effects.BlurEdge.parse(effectText);
            case "k": return Effects.K.parse(effectText);
            case "pos": return Effects.Position.parse(effectText);
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