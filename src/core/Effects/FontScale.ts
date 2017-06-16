import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';

/**
 * 字符缩放 <VsfilterMod 标签>
 */
class FontScale implements Effect{
    isHeadEffect = false;
    name = "fsc";
    startIndex: number;
    scale: number;

    /**
     * 字体缩放
     * @param scale 缩放比例
     */
    constructor(scale: number = 100){
        this.scale = scale;
    }
    handler(text: Text){
        return BaseEffect.defaultHandler(this, text);
    }

    toString(){
        return `\\fsc${this.scale}`;
    }

    static parse(text: string){
        return new FontScale(parseInt(text.match(/(\d+)/ig)[0]));
    }
}