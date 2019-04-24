export interface Coordinate {
    x: number;
    y: number;
}
export type SubShape = Coordinate[];
class Shape {
    shapes: SubShape[] = [];
    constructor(base: Coordinate = { x: 0, y: 0 }) {
        this.shapes.push([base]);
        return this;
    }

    /**
     * 绘制直线到新的坐标
     * @param point 坐标
     */
    lineTo(point: Coordinate): Shape {
        this.shapes[this.shapes.length - 1].push(point);
        return this;
    }

    /**
     * 移动坐标到新的坐标（不绘制线）
     * @param point 坐标
     */
    moveTo(point: Coordinate): Shape {
        this.shapes.push([point]);
        return this;
    }

    /**
     * 转化为绘图代码
     */
    toString(): string {
        let result = '';
        for (const subshape of this.shapes) {
            result += `m ${subshape[0].x} ${subshape[0].y}`;
            for (let i = 1; i <= subshape.length - 1; i = i + 1) {
                result += `l ${subshape[i].x} ${subshape[i].y}`;
            }
        }
        return result;
    }
}

export default Shape;
