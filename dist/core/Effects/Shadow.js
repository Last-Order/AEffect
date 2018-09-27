"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 阴影距离
 */
class Shadow {
    /**
     * 阴影距离
     * @param depth 距离(px)
     * @param startIndex
     */
    constructor(depth, startIndex = 0) {
        this.isHeadEffect = false;
        this.name = "shad";
        this.depth = depth;
        this.startIndex = startIndex;
    }
    addTo(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    toString() {
        return `\\shad${this.depth}`;
    }
    static parse(text) {
        return new Shadow(parseInt(text.match(/(\d+)/ig)[0]));
    }
}
exports.default = Shadow;
//# sourceMappingURL=Shadow.js.map