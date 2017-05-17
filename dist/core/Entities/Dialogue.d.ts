/**
 * Ass Dialogue 类
 */
import Style from './Style';
declare class Dialogue {
    style: Style;
    start: string;
    end: string;
    name: string;
    marginL: string;
    marginR: string;
    marginV: string;
    effect: string;
    text: string;
    constructor(properties?: {});
    /**
     * @override
     */
    toString(): string;
}
export default Dialogue;
