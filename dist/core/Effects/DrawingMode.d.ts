import Effect from './base/Effect';
import Text from '../Entities/Text';
declare class DrawingMode implements Effect {
    isHeadEffect: boolean;
    name: string;
    startIndex: number;
    enable: boolean;
    /**
     * 绘图模式
     * @param enable
     * @param startIndex
     */
    constructor(enable?: boolean, startIndex?: number);
    addTo(text: Text): any;
    toString(): string;
    static parse(text: string): DrawingMode;
}
export default DrawingMode;
