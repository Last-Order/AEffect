import Effect from '../Effects/base/Effect';
export declare class TextParseError extends Error {
}
declare class Text {
    groups: TextGroup[];
    /**
     * 获取不带特效标签的文本内容
     * @returns {string}
     */
    readonly originalText: string;
    /**
     *
     * @param text Ass对话行内容
     * @param parseEffect 是否解析特效标签
     */
    constructor(text: string, parseEffect?: boolean);
    /**
     * 生成带有特效标签的文本
     * @returns {string}
     */
    toString(): string;
}
/**
 *
 */
export declare class TextGroup {
    effectGroup: Effect[];
    content: string;
    constructor(text: string);
    toString(): string;
    /**
     * 复制 TextGroup
     * @returns {TextGroup}
     */
    clone(): TextGroup;
}
export default Text;
