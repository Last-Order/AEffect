import Effect from './base/Effect';
import * as Effects from '.';

class UnknownEffect extends Effect{
    effectText: string;
    name = "UnknownEffect";
    constructor(effectText: string){
        super();
        this.effectText = effectText;
    }

    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText: string): Effect{
        let effectName = effectText.match(/^\\([a-zA-Z]+)/)[1];
        switch (effectName){
            case "blur": return Effects.Blur.parse(effectText);
            default:
                return new UnknownEffect(effectText);
        }
    }
    toString(): string{
        return this.effectText;
    }
}

export default UnknownEffect;