import '../../utils/Leftpad';
declare class Time {
    second: number;
    constructor(s: number);
    toString(): string;
    static parse(time: string): Time;
}
export declare class TimeParseError extends Error {
}
export default Time;
