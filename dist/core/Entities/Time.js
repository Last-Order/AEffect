"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/Leftpad");
class Time {
    constructor(s) {
        this.second = s;
    }
    toString() {
        let hour = (~~(this.second / 3600)).toString();
        let minute = (~~(this.second / 60 % 60)).toString().leftpad(2, '0');
        let secondOriNum = this.second % 60;
        let second;
        if (secondOriNum < 10) {
            second = '0' + secondOriNum.toFixed(2);
        }
        else {
            second = secondOriNum.toFixed(2);
        }
        return [hour, minute, second].join(':');
    }
    static parse(time) {
        let timeArr = time.split(":");
        if (timeArr.length !== 3) {
            throw new TimeParseError("不是有效的时间标签。");
        }
        return new Time(timeArr.reverse().reduce((acc, val, ind) => +val * Math.pow(60, ind) + acc, 0));
    }
}
class TimeParseError extends Error {
}
exports.TimeParseError = TimeParseError;
exports.default = Time;
//# sourceMappingURL=Time.js.map