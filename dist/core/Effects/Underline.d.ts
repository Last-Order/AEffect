import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 下划线
 */
declare class Underline implements Effect {
    name: string;
    isHeadEffect: boolean;
    startIndex: number;
    isUnderline: boolean;
    /**
     * 下划线
     * @param isUnderline 是否加下划线
     * @param startIndex
     */
    constructor(isUnderline: boolean, startIndex?: number);
    addTo(text: Text): any;
    toString(): string;
    static parse(text: string): Underline;
}
export default Underline;
