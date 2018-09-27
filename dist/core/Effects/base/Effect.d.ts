import Text from '../../Entities/Text';
interface Effect {
    isHeadEffect: boolean;
    startIndex: number;
    name: string;
    toString(): string;
    addTo(text: Text): Text;
}
export default Effect;
