import Text from '../../Entities/Text';
import Effect from './Effect';
export declare class EffectIndexOutOfBoundError extends Error {
}
declare class BaseEffect {
    static defaultHandler(applingEffect: Effect, text: Text): Text;
}
export default BaseEffect;
