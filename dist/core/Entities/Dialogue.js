/**
 * Ass Dialogue 类
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dialogue {
    constructor(properties = {}) {
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            this[name[0].toLowerCase() + name.slice(1)] = properties[name];
        });
    }
    /**
     * @override
     */
    toString() {
        let ass = "Dialogue: ";
        let temp = [];
        ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"].forEach((name, index) => {
            temp.push(this[name[0].toLowerCase() + name.slice(1)]);
        });
        ass += temp.join(',');
        return ass;
    }
}
exports.default = Dialogue;
