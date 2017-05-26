import AEffect from '../AEffect';
import Dialogue from './Entities/Dialogue';
import Effect from './Effects/base/Effect';
declare class Selector {
    dialogs: Dialogue[];
    condition: {
        [index: string]: string;
    };
    /**
     * 选取特定行
     * @param AE AEffect 对象
     * @param condition 条件
     * @returns {Selector}
     */
    select(AE: AEffect, condition: {
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
     * @returns {Selector}
     */
    splitIntoSyllables(): this;
    /**
     * 获得选择器所选定的对话
     * @returns {Dialogue[]}
     */
    getDialogs(): Dialogue[];
}
export default Selector;
