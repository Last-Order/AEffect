import '../../utils/Numberext';
import '../../utils/Leftpad';
declare class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    constructor(r: number, g: number, b: number, a: number);
    toString(): string;
    toShortString(): string;
    static RGB(red: number, green: number, blue: number): Color;
    static HTML(htmlColor: string): Color;
    static ASS(assColor: string): Color;
    static ShortASS(assColor: string): Color;
}
export declare class ColorParseError extends Error {
}
export default Color;
