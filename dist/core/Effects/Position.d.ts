import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 位置
 */
declare class Pos implements Effect {
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
    x: number;
    y: number;
    /**
     * @param x 横坐标
     * @param y 纵坐标
     * @param startIndex
     */
    constructor(x: number, y: number, startIndex?: number);
    handler(text: Text): any;
    toString(): string;
    static parse(text: string): Pos;
}
export default Pos;
