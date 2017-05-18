"use strict";
/**
 * Ass Dialogue 类
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Dialogue {
    constructor(properties = {}) {
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            this[name[0].toLowerCase() + name.slice(1)] = properties[name];
        });
    }
    /**
     * @override
     */
    toString() {
        let ass = "Dialogue: ";
        let temp = [];
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            if (name === "Style") {
                temp.push(this.style.name);
            }
            else {
                temp.push(this[name[0].toLowerCase() + name.slice(1)]);
            }
        });
        ass += temp.join(',');
        return ass;
    }
    /**
     * 添加模糊
     * @param blur 模糊强度
     */
    addBlur(blur) {
        this.text = `{\\blur${blur}}` + this.text;
    }
}
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map