"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.default = Selector;
//# sourceMappingURL=Selector.js.map