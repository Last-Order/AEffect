import '../../utils/Leftpad';
declare class Time {
    second: number;
    constructor(s: number);
    toString(): string;
    add(time2: Time): Time;
    sub(time2: Time): Time;
    valueOf(): Number;
    static parse(time: string): Time;
}
export declare class TimeParseError extends Error {
}
export default Time;
