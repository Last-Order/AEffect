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
     * @param startIndex
     */
    constructor(depth: number, startIndex: number = 0){
        this.depth = depth;
        this.startIndex = startIndex;
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

export default Shadow;