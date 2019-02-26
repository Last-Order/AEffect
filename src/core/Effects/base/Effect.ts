import Text from '../../Entities/Text';

interface Effect {
    isHeadEffect: boolean; // 是否为行首出现的特效标签
    startIndex: number;
    name: string;
    toString(): string;
    addTo(text: Text): Text;
}

export default Effect;
