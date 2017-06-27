import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 字符缩放 <VsfilterMod 标签>
 */
declare class FontScale implements Effect {
    isHeadEffect: boolean;
    name: string;
    startIndex: number;
    scale: number;
    /**
     * 字体缩放
     * @param scale 缩放比例
     */
    constructor(scale?: number);
    handler(text: Text): any;
    toString(): string;
    static parse(text: string): FontScale;
}
export default FontScale;
