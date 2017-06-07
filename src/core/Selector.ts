import AEffect from '../AEffect';

import Dialogue from './Entities/Dialogue';
import Text from './Entities/Text';
import Effect from './Effects/base/Effect';
import Time from "./Entities/Time";
import K from "./Effects/K";

class Selector {
    dialogs: Dialogue[];
    AE: AEffect;
    condition: { [index: string]: string };

    constructor(AE: AEffect) {
        this.AE = AE;
    }

    /**
     * 选取特定行
     * @param condition 条件
     * @returns {Selector}
     */
    select(condition: { [index: string]: string }): Selector {
        let dialogs = this.AE.dialogs;
        for (let key of Object.keys(condition)) {
            dialogs = dialogs.filter((dialog) => {
                return Selector[`selectBy${key[0].toUpperCase() + key.slice(1)}`](dialog, condition[key])
            });
        }
        this.dialogs = dialogs.filter(dialog => !dialog.isComment); // 不选中注释行
        this.condition = condition; // 存档查询条件
        return this;
    }

    static selectByStyle(dialog: Dialogue, style) {
        return dialog.style.name === style;
    }

    static selectByName(dialog: Dialogue, name) {
        return dialog.name === name;
    }

    static selectByLayer(dialog: Dialogue, layer) {
        return dialog.layer === layer;
    }

    static selectByFontsize(dialog: Dialogue, fontSize) {
        return dialog.style.fontsize === fontSize;
    }

    static selectByText(dialog: Dialogue, regExp: RegExp) {
        return regExp.test(dialog.text.originalText);
    }

    /**
     * 添加特效标签
     * @param effect 特效标签对象数组
     */
    addEffect(effect: Effect[]) {
        // 对选择器添加标签，则视为给选中的所有行添加标签
        for (let dialog of this.dialogs) {
            dialog.addEffect(effect);
        }
        return this;
    }

    /**
     * 对选择器所选择的所有行进行音节化操作
     * @returns {Selector}
     */
    splitIntoSyllables() {
        let newDialogs: Dialogue[] = [];
        this.dialogs.forEach((dialog, index) => {
            dialog.parseSyllables();
            let start: Time = dialog.start;
            let end: Time;
            for (let textGroup of dialog.text.groups) {
                for (let effectIndex in textGroup.effectGroup) {
                    let effect = textGroup.effectGroup[effectIndex];
                    if (effect.name === "k") {
                        let _effect = <K> effect;
                        end = new Time(start.second + _effect.duration / 100);
                        // 生成新 Dialog 对象
                        let newDialog = dialog.clone();

                        // newDialog.start = start.clone();
                        // newDialog.end = end.clone();

                        newDialog.start = dialog.start;
                        newDialog.end = dialog.end;

                        // 复制文字
                        newDialog.text.groups = (new Text(textGroup.toString())).groups;
                        // 去除时间标签
                        newDialog.text.groups[0].effectGroup = newDialog.text.groups[0].effectGroup.filter(e => e.name !== "k");
                        newDialogs.push(newDialog);
                        // 链接原句与新句
                        newDialog.parentDialog = dialog;
                        // 时间向后推移
                        start = new Time(start.second + _effect.duration / 100);
                        break;
                    }
                }
            }
            // 去掉原 Dialog 的位置标签
            this.dialogs[index].text.groups.forEach(textGroup => {
                textGroup.effectGroup = textGroup.effectGroup.filter(e => e.name !== "pos");
            });
            // 注释原来的 Dialog
            this.dialogs[index].isComment = true;
        });
        newDialogs.forEach((newDialog) => {
            this.AE.dialogs.push(newDialog);
        });
        return this;
    }

    /**
     * 获得选择器所选定的对话
     * @returns {Dialogue[]}
     */
    getDialogs(): Dialogue[] {
        return this.dialogs;
    }

    /**
     * 对 Dialog 批量应用函数
     */
    forEachDialog(handler: (dialog: Dialogue, index?: number) => Dialogue): void {
        this.dialogs.forEach((dialog, index, dialogArray) => {
            handler(dialog, index);
        })
    }
}

export default Selector;