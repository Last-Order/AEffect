import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 边框模糊
 */
declare class BlurEdge implements Effect {
    name: string;
    isHeadEffect: boolean;
    startIndex: number;
    strength: number;
    /**
     * @param strength 模糊强度
     * @param startIndex 起始位置
     */
    constructor(strength?: number, startIndex?: number);
    handler(text: Text): any;
    toString(): string;
    static parse(text: string): BlurEdge;
}
export default BlurEdge;
