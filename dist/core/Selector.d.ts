import AEffect from '../AEffect';
import Dialogue from './Entities/Dialogue';
import Effect from './Effects/base/Effect';
export declare enum TimePoint {
    LineStart = 0,
    LineEnd = 1,
    LineMiddle = 2,
    SyllableStart = 3,
    SyllableEnd = 4,
    SyllableMiddle = 5,
}
export declare class EndBeforeStartError extends Error {
}
declare class Selector {
    dialogs: Dialogue[];
    generatedDialogs: Dialogue[];
    AE: AEffect;
    condition: {
        [index: string]: string;
    };
    constructor(AE: AEffect);
    /**
     * 选取特定行
     * @param condition 条件
     * @returns {Selector}
     */
    select(condition: {
        [index: string]: string;
    }): Selector;
    static selectByStyle(dialog: Dialogue, style: any): boolean;
    static selectByName(dialog: Dialogue, name: any): boolean;
    static selectByLayer(dialog: Dialogue, layer: any): boolean;
    static selectByFontsize(dialog: Dialogue, fontSize: any): boolean;
    static selectByText(dialog: Dialogue, regExp: RegExp): boolean;
    /**
     * 添加特效标签
     * @param effect 特效标签对象数组
     */
    addEffect(effect: Effect[]): this;
    /**
     * 对选择器所选择的所有行进行音节化操作
     * @param startPoint 时间起点
     * @param endPoint 时间结束点
     * @param startOffset 时间起始点偏移 毫秒
     * @param endOffset 时间结束点偏移 毫秒
     * @param autoComment 是否自动注释原句子
     * @returns {Selector}
     */
    splitIntoSyllables(startPoint?: TimePoint, endPoint?: TimePoint, startOffset?: number, endOffset?: number, autoComment?: boolean): this;
    /**
     * 获得选择器所选定的对话
     * @returns {Dialogue[]}
     */
    getOriginalDialogs(): Dialogue[];
    /**
     * 获得由本选择器生成的字幕
     * @returns {Dialogue[]}
     */
    getDialogs(): Dialogue[];
    /**
     * 对生成的 Dialog 批量应用函数
     * @param handler
     * @returns {Selector}
     */
    forEachDialog(handler: (dialog: Dialogue, index?: number) => any): Selector;
    /**
     * 对原始的 Dialog 批量应用函数
     * @param handler
     * @returns {Selector}
     */
    forEachOriginalDialogs(handler: (dialog: Dialogue, index?: number) => any): Selector;
    /**
     * 注释所有选中的 Dialog
     * @returns {Selector}
     */
    commentOriginalDialogs(): Selector;
    /**
     * (简易) 给每句话加上个伴随句
     * @param particle 伴随句内容
     * @param repeat 重复次数
     * @param drawingMode 是否开启绘图模式 默认为真
     * @returns {Selector}
     */
    addParticleEffect(particle: string, repeat?: number, drawingMode?: boolean): Selector;
}
export default Selector;
