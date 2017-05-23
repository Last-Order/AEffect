"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Text {
    constructor(text) {
        this.groups = [];
        let matchResult = text.match(/({.*?})/ig);
        if (matchResult !== null) {
            // 原文本含有特效标签
            let offset = 0;
            let clonedText = text;
            let matchMap = [];
            let effectTags = [];
            let plainTexts = [];
            for (let match of matchResult) {
                let start = clonedText.indexOf(match);
                effectTags.push(match);
                matchMap.push([start + offset, match.length]);
                clonedText = clonedText.slice(start + match.length); // 从原文中删除已经匹配的标签，以免相同标签定位到同一处
                offset += start + match.length;
            }
            matchMap.forEach((match, index, matchMap) => {
                let plainText = text.slice(match[0] + match[1], matchMap[index + 1] && matchMap[index + 1][0] || text.length);
                plainTexts.push(plainText);
            });
            for (let i in effectTags) {
                let effects = effectTags[i].slice(1, effectTags[i].length - 1).split("\\").filter(str => str !== "");
                for (let effect of effects) {
                    let newTextGroup = new TextGroup(plainTexts[i]);
                    // TODO: 解析特效标签
                }
            }
        }
        else {
            // 无特效标签
            this.groups.push(new TextGroup(text));
        }
    }
    toString() {
        return this.groups.map(i => i.toString()).join('');
    }
}
class TextGroup {
    constructor(text) {
        this.effectGroup = [];
        this.content = text;
    }
    toString() {
        let effectTags = "";
        if (this.effectGroup.length > 0) {
            effectTags = `{${this.effectGroup.map(i => i.toString()).join('')}}`;
        }
        return effectTags + this.content;
    }
    clone() {
        let clonedTextGroup = new TextGroup(this.content);
        clonedTextGroup.effectGroup = [...this.effectGroup];
        return clonedTextGroup;
    }
}
exports.TextGroup = TextGroup;
exports.default = Text;
//# sourceMappingURL=Text.js.map