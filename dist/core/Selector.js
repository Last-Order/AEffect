"use strict";
class Selector {
    /**
     * 选取特定行
     * @param AE AEffect 对象
     * @param condition 条件
     * @returns {Selector}
     */
    select(AE, condition) {
        let dialogs = AE.dialogs;
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
        for (let dialog of this.dialogs) {
            dialog.splitIntoSyllables();
        }
        return this;
    }
    /**
     * 获得选择器所选定的对话
     * @returns {Dialogue[]}
     */
    getDialogs() {
        return this.dialogs;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Selector;
//# sourceMappingURL=Selector.js.map