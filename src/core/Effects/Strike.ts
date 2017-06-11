import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';

/**
 * 删除线
 */
class Strike implements Effect{
    name: "s";
    isHeadEffect = false;
    startIndex: number;
    isStrike: boolean;

    /**
     * 删除线
     * @param isUnderline 是否加删除线
     */
    constructor(isUnderline: boolean){
        this.isStrike = isUnderline;
    }

    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\s${this.isStrike ?  '1' : '0'}`;
    }

    static parse(text: string): Strike {
        return new Strike(text.match(/(\d+)/ig)[0] === '1');
    }
}

export default Strike;