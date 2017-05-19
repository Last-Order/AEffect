class Time extends Number{
    static parse(time: string){
        let timeArr = time.split(":");
        if(timeArr.length !== 3){
            throw new TimeParseError("不是有效的时间标签。");
        }
    }
}

export class TimeParseError extends Error{}

export default Time;