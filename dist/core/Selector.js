"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Text_1 = require("./Entities/Text");
const Time_1 = require("./Entities/Time");
class Selector {
    constructor(AE) {
        this.AE = AE;
    }
    /**
     * 选取特定行
     * @param condition 条件
     * @returns {Selector}
     */
    select(condition) {
        let dialogs = this.AE.dialogs;
        for (let key of Object.keys(condition)) {
            dialogs = dialogs.filter((dialog) => {
                return Selector[`selectBy${key[0].toUpperCase() + key.slice(1)}`](dialog, condition[key]);
            });
        }
        this.dialogs = dialogs;
        this.condition = condition; // 存档查询条件
        return this;
    }
    static selectByStyle(dialog, style) {
        return dialog.style.name === style;
    }
    static selectByName(dialog, name) {
        return dialog.name === name;
    }
    static selectByLayer(dialog, layer) {
        return dialog.layer === layer;
    }
    static selectByFontsize(dialog, fontSize) {
        return dialog.style.fontsize === fontSize;
    }
    static selectByText(dialog, regExp) {
        return regExp.test(dialog.text.originalText);
    }
    /**
     * 添加特效标签
     * @param effect 特效标签对象数组
     */
    addEffect(effect) {
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
        let newDialogs = [];
        this.dialogs.forEach((dialog, index) => {
            if (!dialog.isComment) {
                dialog.parseSyllables();
                let start = dialog.start;
                let end;
                for (let textGroup of dialog.text.groups) {
                    for (let effectIndex in textGroup.effectGroup) {
                        let effect = textGroup.effectGroup[effectIndex];
                        if (effect.name === "k") {
                            let _effect = effect;
                            end = new Time_1.default(start.second + _effect.duration / 100);
                            // 生成新 Dialog 对象
                            let newDialog = dialog.clone();
                            newDialog.start = start.clone();
                            newDialog.end = end.clone();
                            // 复制文字
                            newDialog.text.groups = (new Text_1.default(textGroup.toString())).groups;
                            // 去除时间标签
                            newDialog.text.groups[0].effectGroup = newDialog.text.groups[0].effectGroup.filter(e => e.name !== "k");
                            newDialogs.push(newDialog);
                            // 链接原句与新句
                            newDialog.parentDialog = dialog;
                            // 时间向后推移
                            start = new Time_1.default(start.second + _effect.duration / 100);
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
            }
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
    getDialogs() {
        return this.dialogs;
    }
    /**
     * 对 Dialog 批量应用函数
     */
    forEachDialog(handler) {
        this.dialogs.forEach((dialog, index, dialogArray) => {
            handler(dialog, index);
        });
    }
}
exports.default = Selector;
//# sourceMappingURL=Selector.js.map