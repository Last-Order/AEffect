import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 卡拉ok标签
 */
declare class K implements Effect {
    isHeadEffect: boolean;
    startIndex: number;
    duration: number;
    name: string;
    /**
     *
     * @param duration 音节时间长度 毫秒
     * @param startIndex 开始位置
     */
    constructor(duration?: number, startIndex?: number);
    handler(text: Text): any;
    static parse(text: string): K;
    toString(): string;
}
export default K;
