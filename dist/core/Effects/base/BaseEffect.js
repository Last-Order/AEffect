"use strict";
const Text_1 = require("../../Entities/Text");
class EffectIndexOutOfBoundError extends Error {
}
exports.EffectIndexOutOfBoundError = EffectIndexOutOfBoundError;
class BaseEffect {
    static defaultHandler(applingEffect, text) {
        let start = applingEffect.startIndex;
        let newGroups = [];
        let insertedFlag = false;
        let pushToEffectArray = (effects, newEffect) => {
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
        text.groups.forEach((textGroup, index, groups) => {
            if (start < 0 && !insertedFlag) {
                // 到末尾了依旧没找到插入点
                throw new EffectIndexOutOfBoundError("特效起始位置超出行");
            }
            if (start <= textGroup.content.length - 1 && !insertedFlag) {
                insertedFlag = true;
                if (start === 0) {
                    let newTextGroup = textGroup.clone();
                    pushToEffectArray(newTextGroup.effectGroup, applingEffect);
                    newGroups.push(newTextGroup);
                }
                else {
                    // 拆分原 Group
                    let newTextGroup = new Text_1.TextGroup(textGroup.content.slice(0, start));
                    newTextGroup.effectGroup = [...textGroup.effectGroup];
                    newGroups.push(newTextGroup);
                    newTextGroup = new Text_1.TextGroup(textGroup.content.slice(start));
                    newTextGroup.effectGroup = [...textGroup.effectGroup];
                    pushToEffectArray(newTextGroup.effectGroup, applingEffect);
                    newGroups.push(newTextGroup);
                }
            }
            else {
                let clonedGroup = textGroup.clone();
                pushToEffectArray(clonedGroup.effectGroup, applingEffect);
                newGroups.push(clonedGroup);
                start -= textGroup.content.length;
            }
        });
        text.groups = newGroups;
        return text;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseEffect;
//# sourceMappingURL=BaseEffect.js.map