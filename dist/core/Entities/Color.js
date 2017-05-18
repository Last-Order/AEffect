"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/Numberext");
class Color {
    constructor(r, g, b, a) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    static RGB(red, green, blue) {
        red = red.checkBound(0, 255);
        green = green.checkBound(0, 255);
        blue = blue.checkBound(0, 255);
        return new Color(red, green, blue, 0);
    }
}
exports.default = Color;
//# sourceMappingURL=Color.js.map