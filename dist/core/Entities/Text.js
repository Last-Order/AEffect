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
        return '{' + this.effectGroup.map(i => i.toString()).join('') + '}' + this.content;
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