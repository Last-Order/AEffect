"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class TextGroup {
    constructor(text) {
        this.effectGroup = []; // 特效标签组
        this.content = text;
    }
    toString() {
        let effectTags = "";
        if (this.effectGroup.length > 0) {
            effectTags = `{${this.effectGroup.map(i => i.toString()).join('')}}`;
        }
        return effectTags + this.content;
    }
    /**
     * 复制 TextGroup
     * @returns {TextGroup}
     */
    clone() {
        let clonedTextGroup = new TextGroup(this.content);
        clonedTextGroup.effectGroup = [...this.effectGroup];
        return clonedTextGroup;
    }
}
exports.default = TextGroup;
//# sourceMappingURL=TextGroup.js.map