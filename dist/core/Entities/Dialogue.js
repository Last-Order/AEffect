"use strict";
/**
 * Ass Dialogue 类
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Style_1 = require("./Style");
class Dialogue {
    constructor(properties, styleMap) {
        this.marginL = 0;
        this.marginR = 0;
        this.marginV = 0;
        ["layer", "start", "end", "styleName", "name", "marginL", "marginR", "marginV", "effect", "text", "isComment"].forEach((name, index) => {
            if (properties[name]) {
                // 该属性存在
                if (name === "styleName") {
                    if (styleMap[properties[name]]) {
                        this.style = styleMap[properties[name]];
                    }
                    else {
                        throw new Style_1.StyleError("Ass 存在对话行未指定样式");
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
        if (this.isComment) {
            ass = "Comment: ";
        }
        let temp = [];
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            if (name === "Style") {
                temp.push(this.style.name);
            }
            else {
                temp.push(this[name[0].toLowerCase() + name.slice(1)].toString());
            }
        });
        ass += temp.join(',');
        return ass;
    }
}
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map