import Effect from './base/Effect';
/**
 * 边缘模糊 (高斯模糊)
 */
declare class Blur extends Effect {
    name: string;
    strength: number;
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength?: number, startIndex?: number);
    toString(): string;
    static parse(text: string): Blur;
}
export default Blur;
