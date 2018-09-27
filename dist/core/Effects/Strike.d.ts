import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 删除线
 */
declare class Strike implements Effect {
    name: "s";
    isHeadEffect: boolean;
    startIndex: number;
    isStrike: boolean;
    /**
     * 删除线
     * @param isUnderline 是否加删除线
     * @param startIndex
     */
    constructor(isUnderline: boolean, startIndex?: number);
    addTo(text: Text): any;
    toString(): string;
    static parse(text: string): Strike;
}
export default Strike;
