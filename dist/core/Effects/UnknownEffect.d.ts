import Effect from './base/Effect';
import Text from '../Entities/Text';
declare class UnknownEffect implements Effect {
    effectText: string;
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
    constructor(effectText: string);
    handler(text: Text): any;
    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText: string): Effect;
    toString(): string;
}
export default UnknownEffect;
