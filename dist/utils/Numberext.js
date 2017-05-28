"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Number.prototype.checkBound = function (min, max) {
    if (min > max) {
        throw new RangeError("min number should small than max number.");
    }
    if (this.valueOf() >= max) {
        return max;
    }
    else if (this.valueOf() <= min) {
        return min;
    }
    else {
        return this.valueOf();
    }
};
//# sourceMappingURL=Numberext.js.map