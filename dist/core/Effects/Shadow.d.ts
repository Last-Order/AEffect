import Effect from './base/Effect';
import Text from '../Entities/Text';
/**
 * 阴影距离
 */
declare class Shadow implements Effect {
    isHeadEffect: boolean;
    name: string;
    startIndex: number;
    depth: number;
    /**
     * 阴影距离
     * @param depth 距离(px)
     * @param startIndex
     */
    constructor(depth: number, startIndex?: number);
    addTo(text: Text): any;
    toString(): string;
    static parse(text: string): Shadow;
}
export default Shadow;
