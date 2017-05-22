import Effect from './Effect';
import Text from '../../Entities/Text';
/**
 * 仅出现在行首的特效标签
 */
declare class HeadEffect extends Effect {
    startIndex: number;
    constructor();
    handler(text: Text): Text;
}
export default HeadEffect;
