import '../../utils/Numberext';
import '../../utils/Leftpad';

class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    constructor(r: number, g: number, b: number, a: number) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    toString() {
        return [
            '&H',
            this.alpha.toString(16).leftpad(2, '0'),
            this.blue.toString(16).leftpad(2, '0'),
            this.green.toString(16).leftpad(2, '0'),
            this.red.toString(16).leftpad(2, '0'),
        ].join('').toUpperCase();
    }
    toShortString() {
        return [
            '&H',
            this.blue.toString(16).leftpad(2, '0'),
            this.green.toString(16).leftpad(2, '0'),
            this.red.toString(16).leftpad(2, '0'),
        ].join('').toUpperCase();
    }
    // tslint:disable-next-line:function-name
    static RGB(red: number, green: number, blue: number) {
        return new Color(
            red.checkBound(0, 255),
            green.checkBound(0, 255),
            blue.checkBound(0, 255),
            0,
        );
    }
    // tslint:disable-next-line:function-name
    static HTML(htmlColor: string) {
        if (htmlColor[0] !== '#') {
            throw new ColorParseError("HTML Color tag should start with '#'.");
        }
        const cHtmlColor = htmlColor.slice(1);
        if (cHtmlColor.length !== 6) {
            throw new ColorParseError('HTML Color tag is too loooooooooooooooog.');
        }
        const redHex = cHtmlColor.substr(0, 2);
        const greenHex = cHtmlColor.substr(2, 2);
        const blueHex = cHtmlColor.substr(4, 2);
        return new Color(parseInt(redHex, 16), parseInt(greenHex, 16), parseInt(blueHex, 16), 0);
    }
    // tslint:disable-next-line:function-name
    static ASS(assColor: string) {
        if (assColor.substr(0, 2) !== '&H') {
            throw new ColorParseError("ASS Color tag should start with '&H'");
        }
        const cAssColor = assColor.slice(2);
        if (cAssColor.length !== 8) {
            throw new ColorParseError('Ass Color tag is too loooooooooooooooog.');
        }
        const aHex = cAssColor.substr(0, 2);
        const bHex = cAssColor.substr(2, 2);
        const gHex = cAssColor.substr(4, 2);
        const rHex = cAssColor.substr(6, 2);
        return new Color(parseInt(rHex, 16),
                         parseInt(gHex, 16),
                         parseInt(bHex, 16),
                         parseInt(aHex, 16));

    }
    // tslint:disable-next-line:function-name
    static ShortASS(assColor: string) {
        if (assColor.substr(0, 2) !== '&H') {
            throw new ColorParseError("ASS Color tag should start with '&H'");
        }
        const cAssColor = assColor.slice(2);
        if (cAssColor.length !== 6) {
            throw new ColorParseError('Ass Color tag is too loooooooooooooooog.');
        }
        const bHex = cAssColor.substr(0, 2);
        const gHex = cAssColor.substr(2, 2);
        const rHex = cAssColor.substr(4, 2);
        return new Color(parseInt(rHex, 16),
                         parseInt(gHex, 16),
                         parseInt(bHex, 16),
                         0);

    }
}

export class ColorParseError extends Error {}

export default Color;
