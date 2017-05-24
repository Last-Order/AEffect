import Effect from './base/Effect';
declare class UnknownEffect extends Effect {
    effectText: string;
    constructor(effectText: string);
    /**
     * 解析一个特效标签
     * @param effectText
     * @returns {Effect}
     */
    static parse(effectText: string): Effect;
    toString(): string;
}
export default UnknownEffect;
