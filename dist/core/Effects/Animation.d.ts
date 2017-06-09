import Effect from "./base/Effect";
import Text from '../Entities/Text';
declare class Animation implements Effect {
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
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
    constructor(start: number, end: number, effect: Effect, autoAdjustment?: boolean);
    toString(): string;
    handler(text: Text): Text;
}
export default Animation;
