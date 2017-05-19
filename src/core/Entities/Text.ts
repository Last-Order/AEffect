import Effect from '../Effects/base/Effect'

class Text{
    groups: TextGroup[] = [];
    originalText: string;
    constructor(text: string){
        this.originalText = text;
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
        return '{' + this.effectGroup.map(i => i.toString()).join('') + '}' + this.content;
    }
}

export default Text;