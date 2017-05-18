import '../../utils/Numberext'

class Color{
    red: number;
    green: number;
    blue: number;
    alpha: number;
    constructor(r: number, g: number, b: number, a: number){
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    static RGB(red: number, green: number, blue: number){
        red = red.checkBound(0, 255);
        green = green.checkBound(0, 255);
        blue = blue.checkBound(0, 255);
        return new Color(red, green, blue, 0);
    }
}

export default Color;