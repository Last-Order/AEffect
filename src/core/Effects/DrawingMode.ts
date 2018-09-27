import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';


class DrawingMode implements Effect{
    isHeadEffect = false;
    name = "p";
    startIndex: number;
    enable: boolean;

    /**
     * 绘图模式
     * @param enable
     * @param startIndex
     */
    constructor(enable: boolean = true, startIndex: number = 0){
        this.enable = enable;
        this.startIndex = startIndex;
    }

    addTo(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\p${this.enable ? 1 : 0}`;
    }

    static parse(text: string){
        return new DrawingMode(parseInt(text.match(/(\d+)/ig)[0]) === 1);
    }
}

export default DrawingMode;