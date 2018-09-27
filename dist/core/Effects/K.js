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
        this.duration = duration * 10; // ass 字幕 k 标签实际上以百分之一秒表示
    }
    addTo(text) {
        return BaseEffect_1.default.defaultHandler(this, text);
    }
    static parse(text) {
        return new K(+text.match(/(\d+)/)[1]);
    }
    toString() {
        return `\\k${Math.round(this.duration / 10)}`;
    }
}
exports.default = K;
//# sourceMappingURL=K.js.map