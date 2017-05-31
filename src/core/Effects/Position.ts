import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 位置
 */
class Pos implements Effect{
    isHeadEffect = true;
    startIndex: number = 0;
    name = "Pos";
    x: number;
    y: number;

    /**
     * @param x 横坐标
     * @param y 纵坐标
     */
    constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }
    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\pos(${this.x}, ${this.y})`;
    }

    static parse(text: string){
        return new Pos(+text.match(/pos\((\d+?),[ ]*(\d+?)\)/)[1], +text.match(/pos\((\d+?),[ ]*(\d+?)\)/)[2]);
    }
}

export default Pos;