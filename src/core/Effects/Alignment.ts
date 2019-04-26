import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 对齐方式
 * \\an<alignment>
 */
class Alignment implements Effect {
    name = 'an';
    isHeadEffect = true;
    startIndex: number;
    alignmentType: number;
    /**
     * @param alignment 对齐方式
     */
    constructor(alignmentType: number, startIndex: number = 0) {
        this.alignmentType = alignmentType;
        this.startIndex = startIndex;
    }
    addTo(text: Text) {
        return BaseEffect.defaultHandler(this, text);
    }

    toString() {
        return `\\an${this.alignmentType}`;
    }

    static parse(text: string): Alignment {
        const alignmentType = +text.match(/(\d+)/ig)[0];
        return new Alignment(alignmentType);
    }
}

export default Alignment;
