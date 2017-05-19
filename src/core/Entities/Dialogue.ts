/**
 * Ass Dialogue 类
 */

import Style from './Style'
import Time from './Time'

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
    text: string;
    constructor(properties = {}) {
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            this[name[0].toLowerCase() + name.slice(1)] = properties[name];
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