"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./base/BaseEffect");
/**
 * 卡拉ok标签
 */
class K {
    /**
     *
     * @param duration 音节时间长度 毫秒
     * @param startIndex 开始位置
     */
    constructor(duration = 0, startIndex = 0) {
        this.isHeadEffect = false;
        this.name = "k";
        this.startIndex = startIndex;
        this.duration = duration;
    }
    handler(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    static parse(text) {
        return new K(+text.match(/(\d+)/)[1]);
    }
    toString() {
        return `\\k${this.duration}`;
    }
}
exports.default = K;
//# sourceMappingURL=K.js.map