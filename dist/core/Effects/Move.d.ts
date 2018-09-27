import Effect from "./base/Effect";
import Text from '../Entities/Text';
export declare class StartWithoutEndError extends Error {
}
declare class Move implements Effect {
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    start: number;
    end: number;
    /**
     *
     * @param startX 开始横坐标
     * @param startY 开始纵坐标
     * @param endX 结束横坐标
     * @param endY 结束纵坐标
     */
    constructor(startX: number, startY: number, endX: number, endY: number, start?: number, end?: number);
    toString(): string;
    addTo(text: Text): Text;
}
export default Move;
