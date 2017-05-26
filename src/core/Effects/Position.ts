import Effect from './base/Effect';

/**
 * 位置
 */
export default class Position extends Effect{
    isHeadEffect = true;
    name = "Position";
    x: number;
    y: number;

    /**
     * @param x 横坐标
     * @param y 纵坐标
     */
    constructor(x: number, y:number){
        super();
        this.x = x;
        this.y = y;
    }

    toString(){
        return `\\pos(${this.x}, ${this.y})`;
    }

    static parse(text: string){
        return new Position(+text.match(/pos\((\d+?),[ ]+(\d+?)\)/)[1], +text.match(/pos\((\d+?),[ ]+(\d+?)\)/)[2]);
    }
}