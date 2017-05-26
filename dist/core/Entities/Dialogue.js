/**
 * Ass Dialogue 类
 */
"use strict";
const Style_1 = require("./Style");
const Layout_1 = require("../../utils/Layout");
class MissingAlignmentError extends Error {
}
exports.MissingAlignmentError = MissingAlignmentError;
class MissingResolutionError extends Error {
}
exports.MissingResolutionError = MissingResolutionError;
;
class Dialogue {
    constructor(properties, styleMap, metaInfo) {
        this.marginL = 0;
        this.marginR = 0;
        this.marginV = 0;
        this.isSyllabified = false;
        this.metaInfo = metaInfo;
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
     * 将每个音节独立成行
     * @param autoPosition
     */
    splitIntoSyllables(autoPosition = true) {
        this.isSyllabified = true;
        if (autoPosition) {
            if (!this.style.alignment) {
                throw new MissingAlignmentError("使用音节化功能，必须定义样式的对齐方式, 样式: " + this.style.name + ' 缺少相关定义');
            }
            if (!this.metaInfo.resolution.width || !this.metaInfo.resolution.height) {
                throw new MissingResolutionError("使用音节化功能，Ass 文件必须定义分辨率");
            }
            Layout_1.default.syllabify(this);
        }
    }
    /**
     * 获得行持续时间
     * @returns {number} 持续时间 毫秒
     */
    get duration() {
        return this.end.sub(this.start).second * 1000;
    }
    /**
     * 获得相对行开始时间
     * 永远返回0
     * @returns {number}
     */
    get lineStart() {
        return 0;
    }
    /**
     * 获得相对行结束时间
     * @returns {number}
     */
    get lineEnd() {
        return this.duration;
    }
    get middleTime() {
        return Math.round(this.duration / 2);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map