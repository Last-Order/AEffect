import Effect from './base/Effect';
import BaseEffect from './base/BaseEffect';
import Text from '../Entities/Text';

/**
 * 卡拉ok标签
 */
export default class K implements Effect{
    isHeadEffect = false;
    startIndex: number;
    duration: number; // 音节长度 毫秒
    name = "k";

    /**
     *
     * @param duration 音节时间长度 毫秒
     * @param startIndex 开始位置
     */
    constructor(duration: number = 0, startIndex:number = 0){
        this.startIndex = startIndex;
        this.duration = duration;
    }
    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }
    static parse(text: string){
        return new K(+text.match(/(\d+)/)[1]);
    }
    toString(){
        return `\\k${this.duration}`
    }
}