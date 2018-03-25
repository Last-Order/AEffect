import Text from '../../Entities/Text';
import Effect from './Effect'
import TextGroup from '../../Entities/TextGroup';

export class EffectIndexOutOfBoundError extends Error { }

class BaseEffect {
    static defaultHandler(applyingEffect: Effect, text: Text): Text {
        let start = applyingEffect.startIndex;

        let newGroups: TextGroup[] = [];
        let insertedFlag = false;

        /**
         * 向 effects 数组加入新 effect 并防止重复
         * @param effects
         * @param newEffect
         */
        let pushToEffectArray = (effects: Effect[], newEffect: Effect) => {
            let duplicateFlag = false;
            effects.forEach((effect, index) => {
                if (effect.name === newEffect.name) {
                    duplicateFlag = true;
                    effects[index] = newEffect;
                }
            });
            if (!duplicateFlag) {
                effects.push(newEffect);
            }
        };

        text.groups.forEach((textGroup) => {
            if (start < 0 && !insertedFlag) {
                // 到末尾了依旧没找到插入点
                throw new EffectIndexOutOfBoundError("特效起始位置超出行");
            }
            if (start <= textGroup.content.length - 1 && !insertedFlag) {
                insertedFlag = true;
                if (start === 0) {
                    let newTextGroup = textGroup.clone();
                    pushToEffectArray(newTextGroup.effectGroup, applyingEffect);
                    newGroups.push(newTextGroup)
                }
                else {
                    // 拆分原 Group
                    let newTextGroup = new TextGroup(textGroup.content.slice(0, start));
                    newTextGroup.effectGroup = [...textGroup.effectGroup];
                    newGroups.push(newTextGroup);

                    newTextGroup = new TextGroup(textGroup.content.slice(start));
                    newTextGroup.effectGroup = [...textGroup.effectGroup];
                    pushToEffectArray(newTextGroup.effectGroup, applyingEffect);
                    newGroups.push(newTextGroup);
                }
                // 为后面的 groups 同样加上标签
            }
            else {
                let clonedGroup = textGroup.clone();
                newGroups.push(clonedGroup);
                start -= textGroup.content.length;
            }
        });

        text.groups = newGroups;
        return text;
    }
}

export default BaseEffect;