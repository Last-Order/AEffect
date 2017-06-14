import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 边框宽度
 */
class Border implements Effect{
    isHeadEffect = false;
    name = "bord";
    startIndex: number;
    size: number; // 边框宽度

    /**
     * 边框宽度
     * @param size 边框宽度(px)
     */
    constructor(size: number){
        this.size = size;
    }

    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\bord${this.size}`;
    }

    static parse(text: string){
        return new Border(parseInt(text.match(/(\d+)/ig)[0]));
    }
}

export default Border;