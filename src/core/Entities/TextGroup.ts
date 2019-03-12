import Effect from '../Effects/base/Effect';

/**
 *
 */
export default class TextGroup{
    effectGroup: Effect[] = []; // 特效标签组
    content: string; // 文本内容
    x?: number; // 横坐标
    y?: number; // 纵坐标
    width?: number; // 宽度
    height?: number; // 高度
    constructor(text: string) {
        this.content = text;
    }
    /**
     * 转换为文本
     * @returns {string}
     */
    toString() {
        let effectTags = '';
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
        const clonedTextGroup = new TextGroup(this.content);
        clonedTextGroup.effectGroup = [...this.effectGroup];
        return clonedTextGroup;
    }
}
