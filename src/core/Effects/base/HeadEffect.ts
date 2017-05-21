import Effect from './Effect';
/**
 * 仅出现在行首的特效标签
 */
class HeadEffect extends Effect{
    startIndex = 0;
    constructor(){
        super();
        this.isHeadEffect = true;
    }
}

export default HeadEffect