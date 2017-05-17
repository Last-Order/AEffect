"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Style {
    constructor(properties = {}) {
        ["Name", "Fontname", "Fontsize", "PrimaryColour", "SecondaryColour", "OutlineColour", "BackColour", "Bold", "Italic", "Underline", "StrikeOut", "ScaleX", "ScaleY", "Spacing", "Angle", "BorderStyle", "Outline", "Shadow", "Alignment", "MarginL", "MarginR", "MarginV", "Encoding"]
            .forEach((name, index) => {
            this[name[0].toLowerCase() + name.slice(1)] = properties[name];
        });
    }
    /**
    * @override
    */
    toString() {
        let ass = "Style: ";
        let temp = [];
        ["Name", "Fontname", "Fontsize", "PrimaryColour", "SecondaryColour", "OutlineColour", "BackColour", "Bold", "Italic", "Underline", "StrikeOut", "ScaleX", "ScaleY", "Spacing", "Angle", "BorderStyle", "Outline", "Shadow", "Alignment", "MarginL", "MarginR", "MarginV", "Encoding"]
            .forEach(name => {
            temp.push(this[name[0].toLowerCase() + name.slice(1)]);
        });
        ass += temp.join(',');
        return ass;
    }
    // 别名
    get primaryColor() {
        return this.primaryColour;
    }
    set primaryColor(value) {
        this.primaryColour = value;
    }
    get SecondaryColor() {
        return this.secondaryColour;
    }
    set SecondaryColor(value) {
        this.secondaryColour = value;
    }
    get outlineColor() {
        return this.outlineColour;
    }
    set outlineColor(value) {
        this.outlineColour = value;
    }
    get backColor() {
        return this.backColour;
    }
    set backColor(value) {
        this.backColour = value;
    }
}
exports.default = Style;
