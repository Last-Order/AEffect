import Effect from './base/Effect';
import BaseEffect from './base/BaseEffect';
import Text from '../Entities/Text';

/**
 * 卡拉ok标签
 */
class K implements Effect{
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
        this.duration = duration * 10; // ass 字幕 k 标签实际上以百分之一秒表示
    }
    addTo(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }
    static parse(text: string){
        return new K(+text.match(/(\d+)/)[1]);
    }
    toString(){
        return `\\k${Math.round(this.duration / 10)}`
    }
}

export default K;