/**
 * Ass Dialogue 类
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dialogue {
    constructor(properties = {}, styleMap = {}) {
        this.marginL = 0;
        this.marginR = 0;
        this.marginV = 0;
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            if (properties[name]) {
                // 该属性存在
                if (name === "Style") {
                    if (styleMap[properties[name]]) {
                        this.style = styleMap[properties[name]];
                    }
                    else {
                        throw new Error("Ass 存在对话行未指定样式");
                    }
                }
                else {
                    this[name[0].toLowerCase() + name.slice(1)] = properties[name];
                }
            }
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
}
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map