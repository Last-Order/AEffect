import Effect from './base/Effect';
import Text from '../Entities/Text';

export class StartWithoutEndError extends Error { }
export class InvalidEffectText extends Error { }

/**
 * 移动
 * \move(<x1>,<y1>,<x2>,<y2>)
 * \move(<x1>,<y1>,<x2>,<y2>,<t1>,<t2>)
 */
class Move implements Effect {
    isHeadEffect = true;
    startIndex = 0;
    name = 'move';
    // Pos 和 Move 是互斥的
    cantCoexistWith: ['pos'];
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
    constructor(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        start?: number,
        end?: number,
    ) {
        [this.startX, this.startY, this.endX, this.endY] = [startX, startY, endX, endY];
        if (start !== undefined && end === undefined) {
            throw new StartWithoutEndError('指定了移动开始时间却未指定结束时间');
        }
        if (start !== undefined) {
            [this.start, this.end] = [start, end];
        }
    }
    toString() {
        if (this.start) {
            // tslint:disable-next-line:max-line-length
            return `\\move(${this.startX}, ${this.startY}, ${this.endX}, ${this.endY}), ${this.start}, ${this.end}`;
        }
        return `\\move(${this.startX}, ${this.startY}, ${this.endX}, ${this.endY})`;
    }
    addTo(text: Text) {
        text.groups[0].effectGroup.push(this);
        return text;
    }

    static parse(text: string) {
        const values = text.slice(5).split(',').map(v => v.trim());
        // 首尾括号
        values[0] = values[0].slice(1);
        values[values.length - 1] =
            values[values.length - 1].slice(0, values[values.length - 1].length - 1);
        if (values.length !== 4 && values.length !== 6) {
            throw new InvalidEffectText();
        }
        if (values.length === 4) {
            return new Move(
                parseInt(values[0], 10),
                parseInt(values[1], 10),
                parseInt(values[2], 10),
                parseInt(values[3], 10),
            );
        }
        if (values.length === 6) {
            return new Move(
                parseInt(values[0], 10),
                parseInt(values[1], 10),
                parseInt(values[2], 10),
                parseInt(values[3], 10),
                parseInt(values[4], 10),
                parseInt(values[5], 10),
            );
        }
    }
}

export default Move;
