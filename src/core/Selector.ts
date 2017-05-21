import AEffect from '../AEffect';

import Dialogue from './Entities/Dialogue';

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
}

export default Selector;