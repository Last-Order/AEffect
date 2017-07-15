"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
const Effects = require("../../effects/index");
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
            case "p": return Effects.DrawingMode.parse(effectText);
            case "fsc": return Effects.FontScale.parse(effectText);
            case "k": return Effects.K.parse(effectText);
            case "pos": return Effects.Position.parse(effectText);
            case "shad": return Effects.Shadow.parse(effectText);
            case "s": return Effects.Strike.parse(effectText);
            case "u": return Effects.Underline.parse(effectText);
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