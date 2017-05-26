"use strict";
require("../../utils/Numberext");
require("../../utils/Leftpad");
class Color {
    constructor(r, g, b, a) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    toString() {
        return [
            "&H",
            this.alpha.toString(16).leftpad(2, '0'),
            this.blue.toString(16).leftpad(2, '0'),
            this.green.toString(16).leftpad(2, '0'),
            this.red.toString(16).leftpad(2, '0')
        ].join("").toUpperCase();
    }
    toShortString() {
        return [
            "&H",
            this.blue.toString(16).leftpad(2, '0'),
            this.green.toString(16).leftpad(2, '0'),
            this.red.toString(16).leftpad(2, '0')
        ].join("").toUpperCase();
    }
    static RGB(red, green, blue) {
        red = red.checkBound(0, 255);
        green = green.checkBound(0, 255);
        blue = blue.checkBound(0, 255);
        return new Color(red, green, blue, 0);
    }
    static HTML(htmlColor) {
        if (htmlColor[0] !== '#') {
            throw new ColorParseError("HTML Color tag should start with '#'.");
        }
        let cHtmlColor = htmlColor.slice(1);
        if (cHtmlColor.length !== 6) {
            throw new ColorParseError("HTML Color tag is too loooooooooooooooog.");
        }
        let redHex = cHtmlColor.substr(0, 2);
        let greenHex = cHtmlColor.substr(2, 2);
        let blueHex = cHtmlColor.substr(4, 2);
        return new Color(parseInt(redHex, 16), parseInt(greenHex, 16), parseInt(blueHex, 16), 0);
    }
    static ASS(assColor) {
        if (assColor.substr(0, 2) !== "&H") {
            throw new ColorParseError("ASS Color tag should start with '&H'");
        }
        let cAssColor = assColor.slice(2);
        if (cAssColor.length !== 8) {
            throw new ColorParseError("Ass Color tag is too loooooooooooooooog.");
        }
        let aHex = cAssColor.substr(0, 2);
        let bHex = cAssColor.substr(2, 2);
        let gHex = cAssColor.substr(4, 2);
        let rHex = cAssColor.substr(6, 2);
        return new Color(parseInt(rHex, 16), parseInt(gHex, 16), parseInt(bHex, 16), parseInt(aHex, 16));
    }
    static ShortASS(assColor) {
        if (assColor.substr(0, 2) !== "&H") {
            throw new ColorParseError("ASS Color tag should start with '&H'");
        }
        let cAssColor = assColor.slice(2);
        if (cAssColor.length !== 6) {
            throw new ColorParseError("Ass Color tag is too loooooooooooooooog.");
        }
        let bHex = cAssColor.substr(0, 2);
        let gHex = cAssColor.substr(2, 2);
        let rHex = cAssColor.substr(4, 2);
        return new Color(parseInt(rHex, 16), parseInt(gHex, 16), parseInt(bHex, 16), 0);
    }
}
class ColorParseError extends Error {
}
exports.ColorParseError = ColorParseError;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Color;
//# sourceMappingURL=Color.js.map