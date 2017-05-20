import Effect from './base/Effect';
/**
 * 边缘模糊 (高斯模糊)
 */
declare class Blur implements Effect {
    strength: number;
    start: number;
    /**
     * @param strength 模糊强度
     * @param start 起始位置
     */
    constructor(strength?: number, start?: number);
    toString(): string;
}
export default Blur;
