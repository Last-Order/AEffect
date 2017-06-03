/**
 * Ass Dialogue 类
 */

import Style from './Style'
import Time from './Time'
import Text from './Text'
import MetaInfo from './MetaInfo'

import Effect from '../Effects/base/Effect';

import { StyleError } from './Style'
import Log from "../../utils/Log";
import Layout from "../Layout";

export class MissingAlignmentError extends Error{}
export class MissingResolutionError extends Error{};

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
    metaInfo: MetaInfo;
    isComment: boolean;
    isSyllabified: boolean = false;
    properties: DialogueConstructProperties;
    styleMap: {[index: string]: Style};
    constructor(properties: DialogueConstructProperties, styleMap: {[index: string]: Style}, metaInfo: MetaInfo) {
        this.properties = properties;
        this.styleMap = styleMap;
        this.metaInfo = metaInfo;
        this.isComment = properties.isComment;
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
     * 解析音节。为每个音节赋予位置。
     * @param autoPosition
     */
    parseSyllables(autoPosition: boolean = true){
        if (this.isComment){
            // 不处理注释行
            return false;
        }
        this.isSyllabified = true;
        if (autoPosition){
            if (!this.style.alignment){
                throw new MissingAlignmentError("使用音节化功能，必须定义样式的对齐方式, 样式: " + this.style.name + ' 缺少相关定义');
            }
            if (!this.metaInfo.resolution.width || !this.metaInfo.resolution.height){
                throw new MissingResolutionError("使用音节化功能，Ass 文件必须定义分辨率");
            }
            Layout.syllabify(this);
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

    /**
     * 复制一个 Dialogue 实例
     * @returns {Dialogue}
     */
    clone(): Dialogue{
        return new Dialogue({
            ...this.properties,
            "text": new Text(this.properties.text.toString())
        }, {...this.styleMap}, {...this.metaInfo});
    }
}

export default Dialogue;