import TextGroup from './TextGroup';
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
    /**
     * 复制一个 Text
     * @returns {Text}
     */
    clone(): Text;
}
export default Text;
