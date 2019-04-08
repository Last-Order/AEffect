import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';

/**
 * 位置
 */
class Pos implements Effect {
    isHeadEffect = true;
    startIndex: number = 0;
    name = 'pos';
    // Pos 和 Move 是互斥的
    cantCoexistWith: ['move'];
    x: number;
    y: number;

    /**
     * @param x 横坐标
     * @param y 纵坐标
     * @param startIndex
     */
    constructor(x: number, y: number, startIndex: number = 0) {
        this.x = x;
        this.y = y;
        this.startIndex = startIndex;
    }
    addTo(text: Text) {
        return BaseEffect.defaultHandler(this, text);
    }

    toString() {
        return `\\pos(${this.x}, ${this.y})`;
    }

    static parse(text: string) {
        return new Pos(
            parseInt(text.match(/pos\((\-*\d+?),[ ]*(\-*\d+?)\)/)[1], 10),
            parseInt(text.match(/pos\((\-*\d+?),[ ]*(\-*\d+?)\)/)[2], 10),
            10,
        );
    }
}

export default Pos;
