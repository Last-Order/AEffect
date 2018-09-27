import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 边缘模糊 (高斯模糊)
 */
declare class Blur implements Effect {
    name: string;
    isHeadEffect: boolean;
    startIndex: number;
    strength: number;
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength?: number, startIndex?: number);
    addTo(text: Text): any;
    toString(): string;
    static parse(text: string): Blur;
}
export default Blur;
