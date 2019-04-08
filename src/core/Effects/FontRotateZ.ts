import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 绕Z轴旋转
 */
class FontRotateZ implements Effect {
    name = 'frz';
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
        return `\\frz${this.amount}`;
    }

    static parse(text: string): FontRotateZ {
        if (text.startsWith('\\frz')) {
            return new FontRotateZ(
                parseInt(text.match(/frz(\d+)/)[1], 10),
            );
        }
        return new FontRotateZ(
            parseInt(text.match(/fr(\d+)/)[1], 10),
        );
    }
}

export default FontRotateZ;
