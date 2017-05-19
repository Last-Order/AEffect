"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Time extends Number {
    static parse(time) {
        let timeArr = time.split(":");
        if (timeArr.length !== 3) {
            throw new TimeParseError("不是有效的时间标签。");
        }
    }
}
class TimeParseError extends Error {
}
exports.TimeParseError = TimeParseError;
exports.default = Time;
//# sourceMappingURL=Time.js.map