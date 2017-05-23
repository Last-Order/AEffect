/**
 * Ass Dialogue 类
 */
import Style from './Style';
import Time from './Time';
import Text from './Text';
import Effect from '../Effects/base/Effect';
export interface DialogueConstructProperties {
    layer: number;
    start: Time;
    end: Time;
    styleName: string;
    name: string;
    marginL: number;
    marginR: number;
    marginV: number;
    effect: string;
    text: Text;
    isComment: boolean;
}
declare class Dialogue {
    layer: number;
    start: Time;
    end: Time;
    style: Style;
    name: string;
    marginL: number;
    marginR: number;
    marginV: number;
    effect: string;
    text: Text;
    isComment: boolean;
    constructor(properties: DialogueConstructProperties, styleMap: {
        [index: string]: Style;
    });
    /**
     * 添加特效标签
     * @param effect 特效标签数组
     */
    addEffect(effect: Effect[]): void;
    /**
     * 获得行持续时间
     * @returns {number} 持续时间 毫秒
     */
    readonly duration: number;
    /**
     * 获得相对行开始时间
     * 永远返回0
     * @returns {number}
     */
    readonly lineStart: number;
    /**
     * 获得相对行结束时间
     * @returns {number}
     */
    readonly lineEnd: number;
    readonly middleTime: number;
    /**
     * @override
     */
    toString(): string;
}
export default Dialogue;
