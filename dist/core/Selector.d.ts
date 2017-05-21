import AEffect from '../AEffect';
import Dialogue from './Entities/Dialogue';
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
}
export default Selector;
