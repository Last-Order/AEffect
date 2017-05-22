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
            if (properties[name] !== undefined) {
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
     * 添加特效标签
     * @param effect 特效标签数组
     */
    addEffect(effect) {
        for (let ef of effect) {
            this.text = ef.handler(this.text);
        }
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
            switch (name) {
                case "Layer":
                    temp.push("" + this.layer || "0");
                    break;
                case "Start":
                    temp.push(this.start.toString());
                    break;
                case "End":
                    temp.push(this.end.toString());
                    break;
                case "Style":
                    temp.push(this.style.name);
                    break;
                case "Name":
                    temp.push(this.name || "");
                    break;
                case "MarginL":
                    temp.push("" + this.marginL || "0");
                    break;
                case "MarginR":
                    temp.push("" + this.marginR || "0");
                    break;
                case "MarginV":
                    temp.push("" + this.marginV || "0");
                    break;
                case "Text":
                    temp.push(this.text.toString());
                    break;
            }
        });
        ass += temp.join(',');
        return ass;
    }
}
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map