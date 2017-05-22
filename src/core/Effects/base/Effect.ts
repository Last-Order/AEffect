import Text, { TextGroup } from '../../Entities/Text';

export interface IEffect {
    isHeadEffect: boolean; // 是否为行首出现的特效标签
    startIndex: number;
    name: string;
    toString(): string;
    handler(text: Text): Text;
}
export class EffectIndexOutOfBoundError extends Error { }

abstract class Effect implements IEffect {
    isHeadEffect = false;
    name = "BaseEffect";
    startIndex = 0;
    handler(text: Text) {
        let start = this.startIndex;

        let newGroups: TextGroup[] = [];
        let insertedFlag = false;

        let pushToEffectArray = (effects: Effect[], newEffect: Effect) => {
            let duplicateFlag = false;
            effects.forEach((effect, index) => {
                if (effect.name === newEffect.name){
                    duplicateFlag = true;
                    effects[index] = newEffect;
                }
            });
            if (!duplicateFlag){
                effects.push(newEffect);
            }
        };

        text.groups.forEach((textGroup, index, groups) => {
            if (start < 0 && !insertedFlag) {
                // 到末尾了依旧没找到插入点
                throw new EffectIndexOutOfBoundError("特效起始位置超出行");
            }
            if (start <= textGroup.content.length - 1 && !insertedFlag) {
                insertedFlag = true;
                if (start === 0) {
                    let newTextGroup = textGroup.clone();
                    pushToEffectArray(newTextGroup.effectGroup, this);
                    newGroups.push(newTextGroup)
                }
                else {
                    // 拆分原 Group
                    let newTextGroup = new TextGroup(textGroup.content.slice(0, start));
                    newTextGroup.effectGroup = [...textGroup.effectGroup];
                    newGroups.push(newTextGroup);
                    
                    newTextGroup = new TextGroup(textGroup.content.slice(start));
                    newTextGroup.effectGroup = [...textGroup.effectGroup];
                    pushToEffectArray(newTextGroup.effectGroup, this);
                    newGroups.push(newTextGroup);
                }
                // 为后面的 groups 同样加上标签
            }
            else{
                let clonedGroup = textGroup.clone();
                pushToEffectArray(clonedGroup.effectGroup, this);
                newGroups.push(clonedGroup);
                start -= textGroup.content.length;
            }
        });
        
        text.groups = newGroups;
        return text;
    }
}

export default Effect;