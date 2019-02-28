import '../../utils/Leftpad';

class Time {
    second: number;
    constructor(s: number) {
        this.second = s;
    }
    toString(): string {
        const hour = (~~(this.second / 3600)).toString();
        const minute = (~~(this.second / 60 % 60)).toString().leftpad(2, '0');
        const secondOriNum = this.second % 60;
        let second: string;
        if (secondOriNum < 10) {
            second = `0${secondOriNum.toFixed(2).toString()}`;
        } else {
            second = secondOriNum.toFixed(2);
        }
        return [hour, minute, second].join(':');
    }
    /**
     * 时间加运算
     * @param time2
     */
    add(time2: Time): Time {
        return new Time(this.second + time2.second);
    }
    /**
     * 与数字加运算
     * @param time
     */
    addSeconds(time: number): Time {
        return new Time(this.second + time);
    }
    /**
     * 与数字加运算（毫秒）
     * @param time
     */
    addMilliseconds(time: number): Time {
        return new Time(this.second + time / 1000);
    }
    /**
     * 时间减运算
     * @param time2
     */
    sub(time2: Time): Time {
        return new Time(this.second - time2.second);
    }
    /**
     * 与数字减运算
     * @param time
     */
    subSeconds(time: number): Time {
        return new Time(this.second - time);
    }
    /**
     * 与数字加运算（毫秒）
     * @param time
     */
    subMilliseconds(time: number): Time {
        return new Time(this.second - time / 1000);
    }
    /**
     * 获得时间秒数
     */
    valueOf(): Number {
        return this.second;
    }
    /**
     * 复制
     */
    clone() {
        return new Time(this.second);
    }

    static parse(time: string): Time {
        const timeArr = time.split(':');
        if (timeArr.length !== 3) {
            throw new TimeParseError('不是有效的时间标签。');
        }
        return new Time(
            timeArr.reverse().reduce((acc, val, ind) => +val * Math.pow(60, ind) + acc, 0),
        );
    }

}

export class TimeParseError extends Error { }

export default Time;
