import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 字体粗体
 */
declare class Bold implements Effect {
    name: string;
    isHeadEffect: boolean;
    startIndex: number;
    weight: number;
    /**
     * 粗体
     * @param weight 字重
     * @param startIndex
     */
    constructor(weight: number, startIndex?: number);
    handler(text: Text): any;
    toString(): string;
    static parse(text: string): Bold;
}
export default Bold;
