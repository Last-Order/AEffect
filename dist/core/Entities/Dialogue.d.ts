/**
 * Ass Dialogue 类
 */
import Style from './Style';
import Time from './Time';
import Text from './Text';
import MetaInfo from './MetaInfo';
import Effect from '../Effects/base/Effect';
export declare class MissingAlignmentError extends Error {
}
export declare class MissingResolutionError extends Error {
}
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
    parentDialog: Dialogue;
    text: Text;
    metaInfo: MetaInfo;
    isComment: boolean;
    properties: DialogueConstructProperties;
    styleMap: {
        [index: string]: Style;
    };
    syllableIndex: number;
    syllableDuration: number;
    isSyllabified: boolean;
    constructor(properties: DialogueConstructProperties, styleMap: {
        [index: string]: Style;
    }, metaInfo: MetaInfo);
    /**
     * 添加特效标签
     * @param effect 特效标签数组
     */
    addEffect(effect: Effect[]): void;
    /**
     * 解析音节。为每个音节赋予位置。
     * @param autoPosition
     */
    parseSyllables(autoPosition?: boolean): void;
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
    /**
     * 复制一个 Dialogue 实例
     * @returns {Dialogue}
     */
    clone(): Dialogue;
}
export default Dialogue;
