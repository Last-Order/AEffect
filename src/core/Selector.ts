import AEffect from '../AEffect';

import Dialogue from './Entities/Dialogue';
import Effect from './Effects/base/Effect';

class Selector{
    dialogs: Dialogue[];
    condition: {[index: string]: string};

    /**
     * 选取特定行
     * @param AE AEffect 对象
     * @param condition 条件
     * @returns {Selector}
     */
    select(AE: AEffect, condition: {[index: string]: string}): Selector{
        let dialogs = AE.dialogs;
        for (let key of Object.keys(condition)){
            dialogs = dialogs.filter((dialog) => {
                return Selector[`selectBy${key[0].toUpperCase() + key.slice(1)}`](dialog, condition[key])
            });
        }
        this.dialogs = dialogs;
        this.condition = condition; // 存档查询条件
        return this;
    }
    static selectByStyle(dialog: Dialogue, style){
        return dialog.style.name === style;
    }
    static selectByName(dialog: Dialogue, name){
        return dialog.name === name;
    }
    static selectByLayer(dialog: Dialogue, layer){
        return dialog.layer === layer;
    }
    static selectByFontsize(dialog: Dialogue, fontSize){
        return dialog.style.fontsize === fontSize;
    }
    static selectByText(dialog: Dialogue, regExp: RegExp){
        return regExp.test(dialog.text.originalText);
    }
    /**
     * 添加特效标签
     * @param effect 特效标签对象数组
     */
    addEffect(effect: Effect[]){
        // 对选择器添加标签，则视为给选中的所有行添加标签
        for (let dialog of this.dialogs){
            dialog.addEffect(effect);
        }
    }
}

export default Selector;