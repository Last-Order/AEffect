import Effect from './base/Effect';
import BaseEffect from './base/BaseEffect';
import Blur from './Blur'
import Text from '../Entities/Text';
import K from "./K";
import Pos from "./Position";

class UnknownEffect implements Effect{
    effectText: string;
    isHeadEffect: boolean = false;
    startIndex: number = 0;
    name = "UnknownEffect";
    constructor(effectText: string){
        this.effectText = effectText;
    }
    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText: string): Effect{
        let effectName = effectText.match(/^\\([a-zA-Z]+)/)[1];
        switch (effectName){
            case "blur": return Blur.parse(effectText);
            case "k": return K.parse(effectText);
            case "pos": return Pos.parse(effectText);
            default:
                return new UnknownEffect(effectText);
        }
    }
    toString(): string{
        return this.effectText;
    }
}

export default UnknownEffect;