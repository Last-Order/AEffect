import Effect from './base/Effect';
import BaseEffect from './base/BaseEffect';
import Text from '../Entities/Text';
import * as Effects from '../../effects/index';

export class EffectTagParsingError extends Error { }

class UnknownEffect implements Effect{
    effectText: string;
    isHeadEffect: boolean = false;
    startIndex: number = 0;
    name = 'UnknownEffect';
    constructor(effectText: string) {
        this.effectText = effectText;
    }
    addTo(text: Text) {
        return BaseEffect.defaultHandler(this, text);
    }

    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText: string): Effect {
        const effectName = effectText.match(/^\\([a-zA-Z]+)/)[1];
        try {
            switch (effectName){
                case 'an': return Effects.Alignment.parse(effectText);
                case 'blur': return Effects.Blur.parse(effectText);
                case 'be': return Effects.BlurEdge.parse(effectText);
                case 'b': return Effects.Bold.parse(effectText);
                case 'bord': return Effects.Border.parse(effectText);
                case 'p': return Effects.DrawingMode.parse(effectText);
                case 'fad': return Effects.Fade.parse(effectText);
                case 'frx': return Effects.FontRotateX.parse(effectText);
                case 'fry': return Effects.FontRotateY.parse(effectText);
                case 'frz': return Effects.FontRotateZ.parse(effectText);
                // \\fr 是 \\frz 的别名
                case 'fr': return Effects.FontRotateZ.parse(effectText);
                case 'fsc': return Effects.FontScale.parse(effectText);
                case 'k': return Effects.K.parse(effectText);
                case 'move': return Effects.Move.parse(effectText);
                case 'pos': return Effects.Position.parse(effectText);
                case 'shad': return Effects.Shadow.parse(effectText);
                case 's': return Effects.Strike.parse(effectText);
                case 'u': return Effects.Underline.parse(effectText);

                default:
                    return new UnknownEffect(effectText);
            }
        } catch (e) {
            throw new EffectTagParsingError(`标签 ${effectName} 无法被正确解析`);
        }
    }
    toString(): string {
        return this.effectText;
    }
}

export default UnknownEffect;
