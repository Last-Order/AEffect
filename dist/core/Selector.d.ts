import AEffect from '../AEffect';
import Dialogue from './Entities/Dialogue';
import Effect from './Effects/base/Effect';
import TimePoint from '../definitions/Timepoint';
export declare class EndBeforeStartError extends Error {
}
export interface SyllabifyOption {
    text?: string;
    autoComment?: boolean;
    drawingMode?: boolean;
}
export interface SelectorCondition {
    styleName?: string;
    name?: string;
    layer?: number;
    fontSize?: number;
    text?: string;
}
declare class Selector {
    dialogs: Dialogue[];
    generatedDialogs: Dialogue[];
    AE: AEffect;
    condition: SelectorCondition;
    constructor(AE: AEffect);
    /**
     * 选取特定行
     * @param condition 条件
     * @returns {Selector}
     */
    select(condition: SelectorCondition): Selector;
    static selectByStyleName(dialog: Dialogue, style: string): boolean;
    static selectByName(dialog: Dialogue, name: string): boolean;
    static selectByLayer(dialog: Dialogue, layer: number): boolean;
    static selectByFontsize(dialog: Dialogue, fontSize: number): boolean;
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
     * @param options
     * @returns {Selector}
     */
    splitIntoSyllables(startPoint?: TimePoint, endPoint?: TimePoint, startOffset?: number, endOffset?: number, options?: SyllabifyOption): this;
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
}
export default Selector;
