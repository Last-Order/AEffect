import Effect from './base/Effect';
import Text from '../Entities/Text';
import BaseEffect from './base/BaseEffect';
/**
 * 淡入淡出
 */
class Fade implements Effect {
    name = "fade";
    isHeadEffect = false;
    startIndex: number;
    fadeIn: number;
    fadeOut: number;
    /**
     * @param fadeIn 淡入时间 单位毫秒
     * @param fadeOut 淡出时间 单位毫秒
     * @param startIndex 起始位置
     */
    constructor(fadeIn: number = 0, fadeOut: number = 0, startIndex: number = 0) {
        this.fadeIn = fadeIn;
        this.fadeOut = fadeOut;
        this.startIndex = startIndex;
    }
    addTo(text: Text) {
        return BaseEffect.defaultHandler(this, text);
    }

    toString() {
        return `\\fad(${this.fadeIn}, ${this.fadeOut})`;
    }

    static parse(text: string): Fade {
        return new Fade(parseInt(text.match(/fad\((\-*\d+?),[ ]*(\-*\d+?)\)/)[1]), parseInt(text.match(/fad\((\-*\d+?),[ ]*(\-*\d+?)\)/)[2]));
    }
}

export default Fade;