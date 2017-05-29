import Effect from '../Effects/base/Effect'
import UnknownEffect from '../Effects/UnknownEffect';

export class TextParseError extends Error {};

class Text{
    groups: TextGroup[] = [];

    /**
     * 获取不带特效标签的文本内容
     * @returns {string}
     */
    get originalText(): string{
        return this.groups.map(i => i.content).join('');
    }

    /**
     *
     * @param text Ass对话行内容
     */
    constructor(text: string){
        let matchResult = text.match(/({.*?})/ig);
        if (matchResult !== null){
            // 原文本含有特效标签
            let offset = 0;
            let clonedText = text;
            let matchMap = [];
            let effectTags = [];
            let plainTexts = [];
            for (let match of matchResult){
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

            for (let i in effectTags){
                let effects = effectTags[i].slice(1, effectTags[i].length - 1).split("\\").filter(str => str !== "");
                for (let effect of effects){
                    let newTextGroup = new TextGroup(plainTexts[i]);
                    try{
                        newTextGroup.effectGroup.push(UnknownEffect.parse(`\\${effect}`))
                    }
                    catch (e){
                        throw new TextParseError();
                    }
                    finally {
                        this.groups.push(newTextGroup);
                    }
                }
            }
        }
        else{
            // 无特效标签
            this.groups.push(new TextGroup(text));
        }
    }

    /**
     * 生成带有特效标签的文本
     * @returns {string}
     */
    toString(){
        return this.groups.map(i => i.toString()).join('');
    }
}

/**
 *
 */
export class TextGroup{
    effectGroup: Effect[] = []; // 特效标签组
    content: string; // 文本内容
    constructor(text: string){
        this.content = text;
    }
    toString(){
        let effectTags = "";
        if (this.effectGroup.length > 0){
            effectTags = `{${this.effectGroup.map(i => i.toString()).join('')}}`;
        }
        return effectTags + this.content;
    }

    /**
     * 复制 TextGroup
     * @returns {TextGroup}
     */
    clone(){
        let clonedTextGroup = new TextGroup(this.content);
        clonedTextGroup.effectGroup = [...this.effectGroup];
        return clonedTextGroup;
    }
}

export default Text;