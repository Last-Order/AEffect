import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 绕X轴旋转
 */
class FontRotateX implements Effect {
    name = 'frx';
    isHeadEffect = false;
    startIndex: number;
    amount: number;
    /**
     * @param amount 绕X轴旋转角度
     * @param startIndex 起始位置
     */
    constructor(amount: number = 0, startIndex: number = 0) {
        this.amount = amount;
        this.startIndex = startIndex;
    }
    addTo(text: Text) {
        return BaseEffect.defaultHandler(this, text);
    }

    toString() {
        return `\\frx${this.amount}`;
    }

    static parse(text: string): FontRotateX {
        return new FontRotateX(
            parseInt(text.match(/frx(\d+)/)[1], 10),
        );
    }
}

export default FontRotateX;
