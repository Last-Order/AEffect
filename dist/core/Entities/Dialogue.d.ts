/**
 * Ass Dialogue 类
 */
import Style from './Style';
import Time from './Time';
import Text from './Text';
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
     * @override
     */
    toString(): string;
}
export default Dialogue;
