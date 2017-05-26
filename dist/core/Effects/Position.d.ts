import Effect from './base/Effect';
/**
 * 位置
 */
export default class Position extends Effect {
    isHeadEffect: boolean;
    name: string;
    x: number;
    y: number;
    /**
     * @param x 横坐标
     * @param y 纵坐标
     */
    constructor(x: number, y: number);
    toString(): string;
    static parse(text: string): Position;
}
