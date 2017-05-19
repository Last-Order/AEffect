/**
 * Ass Dialogue 类
 */

import Style from './Style';

class Dialogue {
    style: Style;
    start: string;
    end: string;
    name: string;
    marginL: string;
    marginR: string;
    marginV: string;
    effect: string;
    text: string;
    constructor(properties = {}, styleMap = {}) {
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            if (properties[name]){
                // 该属性存在
                if (name === "Style"){
                    if (styleMap[properties[name]]){
                        this.style = styleMap[properties[name]];
                    }
                    else{
                        throw new Error("Ass 存在对话行未指定样式");
                    }
                }
                else{
                    this[name[0].toLowerCase() + name.slice(1)] = properties[name];
                }
            }
        })
    }
    /**
     * @override
     */
    toString() {
        let ass = "Dialogue: ";
        let temp = [];
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            if (name === "Style") {
                temp.push(this.style.name);
            }
            else {
                temp.push(this[name[0].toLowerCase() + name.slice(1)]);
            }
        })
        ass += temp.join(',');
        return ass;
    }

    /**
     * 添加模糊
     * @param blur 模糊强度
     */
    addBlur(blur: number){
        this.text = `{\\blur${blur}}` + this.text;
    }
}

export default Dialogue;