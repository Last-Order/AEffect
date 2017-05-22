import Text from '../../Entities/Text';
export interface IEffect {
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
    toString(): string;
    handler(text: Text): Text;
}
export declare class EffectIndexOutOfBoundError extends Error {
}
declare abstract class Effect implements IEffect {
    isHeadEffect: boolean;
    name: string;
    startIndex: number;
    handler(text: Text): Text;
}
export default Effect;
