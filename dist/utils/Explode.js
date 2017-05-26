"use strict";
String.prototype.explode = function (separator, limit) {
    let arr = this.split(separator);
    arr.push(arr.splice(limit - 1).join(separator));
    return arr;
};
//# sourceMappingURL=Explode.js.map