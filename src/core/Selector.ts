import AEffect from '../AEffect';

import Dialogue from './Entities/Dialogue';
import Effect from './Effects/base/Effect';
import Time from "./Entities/Time";
import K from "./Effects/K";

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
        return this;
    }

    /**
     * 对选择器所选择的所有行进行音节化操作
     * @returns {Selector}
     */
    splitIntoSyllables(){
        let newDialogs: Dialogue[] = [];
        this.dialogs.forEach((dialog, index) => {
            if (!dialog.isComment){
                dialog.parseSyllables();
                let start: Time = dialog.start;
                let end: Time;
                for (let textGroup of dialog.text.groups){
                    for (let effectIndex in textGroup.effectGroup){
                        let effect = textGroup.effectGroup[effectIndex];
                        if (effect.name === "k"){
                            let _effect = <K> effect;
                            end = new Time(start.second + _effect.duration / 1000);
                            // 生成新 Dialog 对象
                            let newDialog = dialog.clone();
                            newDialog.start = start.clone();
                            newDialog.end = end.clone();
                            // 复制文字
                            newDialog.text.groups = [textGroup];
                            // 去除时间标签
                            newDialog.text.groups[0].effectGroup = newDialog.text.groups[0].effectGroup.filter(e => e.name !== "k");
                            newDialogs.push(newDialog);
                            // 时间向后推移
                            start = new Time(start.second + _effect.duration / 1000);
                            break;
                        }
                    }
                }
                // 移除原来的 Dialog
                this.dialogs = this.dialogs.slice(0, index).concat(this.dialogs.slice(index + 1));
            }
        });
        console.log(newDialogs);
        newDialogs.forEach((newDialog) => {
            this.dialogs.push(newDialog);
        });
        return this;
    }

    /**
     * 获得选择器所选定的对话
     * @returns {Dialogue[]}
     */
    getDialogs(): Dialogue[]{
        return this.dialogs;
    }

    /**
     * 对 Dialog 批量应用函数
     */
    forEachDialog(handler: (dialog: Dialogue) => Dialogue): void{
        for (let dialog of this.dialogs){
            handler(dialog);
        }
    }
}

export default Selector;