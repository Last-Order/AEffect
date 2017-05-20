import Effect from './Effect';
/**
 * 仅出现在行首的特效标签
 */
class HeadEffect extends Effect{
    isHeadEffect = true;
    constructor(){
        super();
        this.startIndex = 0;
    }
}

export default HeadEffect