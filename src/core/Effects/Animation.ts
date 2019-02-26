import Effect from './base/Effect';
import Text from '../Entities/Text';

class Animation implements Effect{
    isHeadEffect = false;
    startIndex = 0;
    name = 't';
    start: number;
    end: number;
    effect: Effect;

    /**
     *
     * @param start 开始时间(相对于行开始 毫秒)
     * @param end 结束时间(相对于行开始 毫秒)
     * @param effect 特效
     * @param autoAdjustment 是否自动调整句子时间 默认禁用
     */
    constructor(start: number, end: number, effect: Effect, autoAdjustment: boolean = false) {
        this.start = start;
        this.end = end;
        this.effect = effect;
    }
    toString() {
        return `\\t(${this.start}, ${this.end}, ${this.effect})`;
    }
    addTo(text: Text) {
        text.groups[0].effectGroup.push(this);
        return text;
    }
}

export default Animation;
