"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.leftpad = function (length, fill) {
    if (fill.length !== 1) {
        throw new RangeError("fill key should be 1 character.");
    }
    return Array(Math.abs(("" + this).length - ((length || 2) + 1))).join(fill) + this;
};
//# sourceMappingURL=Leftpad.js.map