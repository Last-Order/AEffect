import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';

/**
 * 字体粗体
 */
class Bold implements Effect{
    name = "b";
    isHeadEffect = false;
    startIndex: number;
    weight: number;

    /**
     * 粗体
     * @param weight 字重
     */
    constructor(weight: number){
        this.weight = weight;
    }
    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }
    toString(){
        return `\\b${this.weight}`;
    }

    static parse(text: string): Bold{
        return new Bold(parseInt(text.match(/(\d+)/ig)[0]));
    }
}

export default Bold