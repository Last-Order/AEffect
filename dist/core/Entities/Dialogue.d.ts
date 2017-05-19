/**
 * Ass Dialogue 类
 */
import Style from './Style';
import Time from './Time';
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
    text: string;
    constructor(properties?: {}, styleMap?: {});
    /**
     * @override
     */
    toString(): string;
}
export default Dialogue;
