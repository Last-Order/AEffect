import Effect from '../Effects/base/Effect';
declare class Text {
    groups: TextGroup[];
    originalText: string;
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
