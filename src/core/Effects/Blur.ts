import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 边缘模糊 (高斯模糊)
 */
class Blur implements Effect {
    name = "blur";
    isHeadEffect = false;
    startIndex: number;
    strength: number; 
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength: number = 1, startIndex: number = 0){
        this.strength = strength;
        this.startIndex = startIndex;
    }
    addTo(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }
    
    toString(){
        return `\\blur${this.strength}`;
    }

    static parse(text: string): Blur{
        let strength = +text.match(/(\d+)/ig)[0];
        return new Blur(strength);
    }
}

export default Blur;