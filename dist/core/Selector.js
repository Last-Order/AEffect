"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Selector {
    static select(AE, condition) {
        let dialogs = AE.dialogs;
        for (let key of Object.keys(condition)) {
            dialogs = dialogs.filter((dialog) => {
                return Selector[`selectBy${key[0].toUpperCase() + key.slice(1)}`](dialog, condition[key]);
            });
        }
        return dialogs;
    }
    static selectByStyle(dialog, style) {
        return dialog.style.name === style;
    }
    static selectByName(dialog, name) {
        return dialog.name === name;
    }
}
exports.default = Selector;
//# sourceMappingURL=Selector.js.map