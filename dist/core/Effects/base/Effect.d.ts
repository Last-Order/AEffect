import Text from '../../Entities/Text';
interface Effect {
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
    toString(): string;
    handler(text: Text): Text;
}
export default Effect;
