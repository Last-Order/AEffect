import Effect from './Effect';
import Text from '../../Entities/Text';

/**
 * 仅出现在行首的特效标签
 */
class HeadEffect extends Effect{
    startIndex = 0;
    constructor(){
        super();
        this.isHeadEffect = true;
    }
    handler(text: Text): Text{
        text.groups[0].effectGroup.push(this);
        return text;
    }
}

export default HeadEffect