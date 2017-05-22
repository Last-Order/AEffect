/**
 * Ass Dialogue 类
 */

import Style from './Style'
import Time from './Time'
import Text from './Text'

import Effect from '../Effects/base/Effect';

import { StyleError } from './Style'

export interface DialogueConstructProperties{
    layer: number;
    start: Time;
    end: Time;
    styleName: string;
    name: string;
    marginL: number;
    marginR: number;
    marginV: number;
    effect: string;
    text: Text;
    isComment: boolean;
}

class Dialogue {
    layer: number;
    start: Time;
    end: Time;
    style: Style;
    name: string; // 说话人
    marginL: number = 0;
    marginR: number = 0;
    marginV: number = 0;
    effect: string;
    text: Text;
    isComment: boolean;
    constructor(properties: DialogueConstructProperties, styleMap: {[index: string]: Style}) {
        console.log(properties.styleName);
        ["layer", "start", "end", "styleName", "name", "marginL", "marginR", "marginV", "effect", "text", "isComment"].forEach((name, index) => {
            if (properties[name] !== undefined) {
                // 该属性存在
                if (name === "styleName") {
                    if (styleMap[properties[name]]) {
                        this.style = styleMap[properties[name]];
                    }
                    else {
                        throw new StyleError("Ass 存在对话行未指定样式");
                    }
                }
                else {
                    this[name[0].toLowerCase() + name.slice(1)] = properties[name];
                }
            }
        })
    }
    /**
     * 添加特效标签
     * @param effect 特效标签数组
     */
    addEffect(effect: Effect[]){
        for (let ef of effect){
            this.text = ef.handler(this.text);
        }
    }
    /**
     * @override
     */
    toString() {
        let ass = "Dialogue: ";
        if(this.isComment){
            ass = "Comment: ";
        }
        let temp: string[] = [];
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            if (name === "Style") {
                temp.push(this.style.name);
            }
            else {
                temp.push(this[name[0].toLowerCase() + name.slice(1)] && this[name[0].toLowerCase() + name.slice(1)].toString() || "");
            }
        });
        ass += temp.join(',');
        return ass;
    }
}

export default Dialogue;