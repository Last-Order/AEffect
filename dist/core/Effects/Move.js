"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StartWithoutEndError extends Error {
}
exports.StartWithoutEndError = StartWithoutEndError;
;
class Move {
    /**
     *
     * @param startX 开始横坐标
     * @param startY 开始纵坐标
     * @param endX 结束横坐标
     * @param endY 结束纵坐标
     */
    constructor(startX, startY, endX, endY, start, end) {
        this.isHeadEffect = true;
        this.startIndex = 0;
        this.name = "move";
        [this.startX, this.startY, this.endX, this.endY] = [startX, startY, endX, endY];
        if (start !== undefined && end === undefined) {
            throw new StartWithoutEndError("指定了移动开始时间却未指定结束时间");
        }
        if (start !== undefined) {
            [this.start, this.end] = [start, end];
        }
    }
    toString() {
        if (this.start) {
            return `\\move(${this.startX}, ${this.startY}, ${this.endX}, ${this.endY}), ${this.start}, ${this.end}`;
        }
        else {
            return `\\move(${this.startX}, ${this.startY}, ${this.endX}, ${this.endY})`;
        }
    }
    addTo(text) {
        text.groups[0].effectGroup.push(this);
        return text;
    }
}
exports.default = Move;
//# sourceMappingURL=Move.js.map