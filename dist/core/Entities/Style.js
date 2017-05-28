"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BorderStyle;
(function (BorderStyle) {
    BorderStyle[BorderStyle["BorderAndShadow"] = 1] = "BorderAndShadow";
    BorderStyle[BorderStyle["PureBackground"] = 3] = "PureBackground"; // 纯色背景
})(BorderStyle = exports.BorderStyle || (exports.BorderStyle = {}));
var Alignment;
(function (Alignment) {
    Alignment[Alignment["UndefinedAlignment"] = 0] = "UndefinedAlignment";
    Alignment[Alignment["LeftBottom"] = 1] = "LeftBottom";
    Alignment[Alignment["Bottom"] = 2] = "Bottom";
    Alignment[Alignment["RightBottom"] = 3] = "RightBottom";
    Alignment[Alignment["LeftMiddle"] = 4] = "LeftMiddle";
    Alignment[Alignment["Middle"] = 5] = "Middle";
    Alignment[Alignment["RightMiddle"] = 6] = "RightMiddle";
    Alignment[Alignment["LeftTop"] = 7] = "LeftTop";
    Alignment[Alignment["Top"] = 8] = "Top";
    Alignment[Alignment["RightTop"] = 9] = "RightTop";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
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
class StyleError extends Error {
}
exports.StyleError = StyleError;
exports.default = Style;
//# sourceMappingURL=Style.js.map