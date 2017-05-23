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
     * 获得行持续时间
     * @returns {number} 持续时间 毫秒
     */
    get duration(): number{
        return this.end.sub(this.start).second * 1000;
    }
    /**
     * 获得相对行开始时间
     * 永远返回0
     * @returns {number}
     */
    get lineStart(): number{
        return 0;
    }
    /**
     * 获得相对行结束时间
     * @returns {number}
     */
    get lineEnd(): number{
        return this.duration;
    }
    get middleTime(): number{
        return Math.round(this.duration / 2);
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
            switch (name){
                case "Layer":
                    temp.push("" + this.layer || "0"); break;
                case "Start":
                    temp.push(this.start.toString()); break;
                case "End":
                    temp.push(this.end.toString()); break;
                case "Style":
                    temp.push(this.style.name); break;
                case "Name":
                    temp.push(this.name || ""); break;
                case "MarginL":
                    temp.push("" + this.marginL || "0"); break;
                case "MarginR":
                    temp.push("" + this.marginR || "0"); break;
                case "MarginV":
                    temp.push("" + this.marginV || "0"); break;
                case "Text":
                    temp.push(this.text.toString()); break;

            }
        });
        ass += temp.join(',');
        return ass;
    }
}

export default Dialogue;