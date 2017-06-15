import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 边框宽度
 */
declare class Border implements Effect {
    isHeadEffect: boolean;
    name: string;
    startIndex: number;
    size: number;
    /**
     * 边框宽度
     * @param size 边框宽度(px)
     * @param startIndex
     */
    constructor(size: number, startIndex?: number);
    handler(text: Text): any;
    toString(): string;
    static parse(text: string): Border;
}
export default Border;
