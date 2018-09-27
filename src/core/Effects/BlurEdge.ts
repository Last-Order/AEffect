import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 边框模糊
 */
class BlurEdge implements Effect {
    name = "be";
    isHeadEffect = false;
    startIndex: number;
    strength: number;
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength: number = 1, startIndex: number = 0){
        this.strength = Math.round(strength); // strength 只能为整数. 代表应用模糊的次数.
        this.startIndex = startIndex;
    }
    addTo(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\be${this.strength}`;
    }

    static parse(text: string): BlurEdge{
        let strength = +text.match(/(\d+)/ig)[0];
        return new BlurEdge(strength);
    }
}

export default BlurEdge;