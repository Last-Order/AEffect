import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 边框宽度
 * \\bord<size>
 */
class Border implements Effect{
    isHeadEffect = false;
    name = 'bord';
    startIndex: number;
    size: number; // 边框宽度

    /**
     * 边框宽度
     * @param size 边框宽度(px)
     * @param startIndex
     */
    constructor(size: number = 0, startIndex: number = 0) {
        this.size = size;
        this.startIndex = startIndex;
    }

    addTo(text: Text) {
        return BaseEffect.defaultHandler(this, text);
    }

    toString() {
        return `\\bord${this.size}`;
    }

    static parse(text: string) {
        return new Border(parseInt(text.match(/(\d+)/ig)[0], 10));
    }
}

export default Border;
