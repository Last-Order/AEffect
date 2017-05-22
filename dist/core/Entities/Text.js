"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Text {
    constructor(text) {
        this.groups = [];
        this.originalText = text;
        this.groups.push(new TextGroup(text));
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