import Effect from "../Effects/base/Effect";
/**
 *
 */
export default class TextGroup {
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
