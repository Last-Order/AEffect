import '../../utils/Leftpad'

class Time{
    second: number;
    constructor(s: number){
        this.second = s;
    }
    toString(): string {
        let hour = (~~(this.second / 3600)).toString();
        let minute = (~~(this.second / 60 % 60)).toString().leftpad(2, '0');
        let secondOriNum = this.second % 60;
        let second: string;
        if (secondOriNum < 10) {
            second = '0' + secondOriNum.toFixed(2);
        } else {
            second = secondOriNum.toFixed(2);
        }
        return [hour, minute, second].join(':');
    }
    static parse(time: string): Time {
        let timeArr = time.split(":");
        if (timeArr.length !== 3) {
            throw new TimeParseError("不是有效的时间标签。");
        }
        return new Time(timeArr.reverse().reduce((acc, val, ind) => +val * Math.pow(60, ind) + acc, 0))
    }
}

export class TimeParseError extends Error { }

export default Time;