import '../../utils/Numberext';
declare class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    constructor(r: number, g: number, b: number, a: number);
    static RGB(red: number, green: number, blue: number): Color;
}
export default Color;
