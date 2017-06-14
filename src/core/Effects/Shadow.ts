import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 阴影距离
 */
class Shadow implements Effect{
    isHeadEffect = false;
    name = "shad";
    startIndex: number;
    depth: number;

    /**
     * 阴影距离
     * @param depth 距离(px)
     */
    constructor(depth: number){
        this.depth = depth;
    }
    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\shad${this.depth}`;
    }

    static parse(text: string){
        return new Shadow(parseInt(text.match(/(\d+)/ig)[0]));
    }
}