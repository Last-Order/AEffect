"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animation {
    /**
     *
     * @param start 开始时间(相对于行开始 毫秒)
     * @param end 结束时间(相对于行开始 毫秒)
     * @param effect 特效
     * @param autoAdjustment 是否自动调整句子时间 默认禁用
     */
    constructor(start, end, effect, autoAdjustment = false) {
        this.isHeadEffect = false;
        this.startIndex = 0;
        this.name = "t";
    }
    toString() {
        return `\\t(${this.start}, ${this.end}, ${this.effect})`;
    }
    handler(text) {
        return text;
    }
}
//# sourceMappingURL=Animation.js.map