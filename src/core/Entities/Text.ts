import Effect from '../Effects/base/Effect'

class Text{
    groups: TextGroup[] = [];
    get originalText(): string{
        return this.groups.map(i => i.content).join('');
    }
    constructor(text: string){
        this.groups.push(new TextGroup(text));
    }
    toString(){
        return this.groups.map(i => i.toString()).join('');
    }
}

export class TextGroup{
    effectGroup: Effect[] = [];
    content: string;
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
    clone(){
        let clonedTextGroup = new TextGroup(this.content);
        clonedTextGroup.effectGroup = [...this.effectGroup];
        return clonedTextGroup;
    }
}

export default Text;