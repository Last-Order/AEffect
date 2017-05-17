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
    /**
     * 添加模糊
     * @param blur 模糊强度
     */
    addBlur(blur: number): void;
}
export default Dialogue;
