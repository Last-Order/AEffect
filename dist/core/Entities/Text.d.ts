import Effect from '../Effects/base/Effect';
export declare class TextParseError extends Error {
}
declare class Text {
    groups: TextGroup[];
    readonly originalText: string;
    constructor(text: string);
    toString(): string;
}
export declare class TextGroup {
    effectGroup: Effect[];
    content: string;
    constructor(text: string);
    toString(): string;
    clone(): TextGroup;
}
export default Text;
