interface IText {
    originalText: string;
    toString(): string;
    clone(): IText;
}
export default IText;
