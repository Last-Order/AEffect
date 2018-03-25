import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';

/**
 * 下划线
 */
class Underline implements Effect{
    name = "u";
    isHeadEffect = false;
    startIndex: number;
    isUnderline: boolean;

    /**
     * 下划线
     * @param isUnderline 是否加下划线
     * @param startIndex
     */
    constructor(isUnderline: boolean, startIndex: number = 0){
        this.isUnderline = isUnderline;
        this.startIndex = startIndex;
    }

    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\u${this.isUnderline ?  '1' : '0'}`;
    }

    static parse(text: string): Underline {
        return new Underline(text.match(/(\d+)/ig)[0] === '1');
    }
}

export default Underline;