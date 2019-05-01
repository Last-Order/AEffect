import Color from './Color';

export enum BorderStyle {
    BorderAndShadow = 1, // 边框+阴影
    PureBackground = 3, // 纯色背景
}
export enum Alignment {
    UndefinedAlignment,
    LeftBottom,
    Bottom,
    RightBottom,
    LeftMiddle,
    Middle,
    RightMiddle,
    LeftTop,
    Top,
    RightTop,
}

class Style {
    /** 样式名 */
    name: string;
    /** 字体名 */
    fontname: string;
    /** 字号 */
    fontsize: number;
    /** 主要颜色 */
    primaryColour: Color;
    /** 次要颜色 */
    secondaryColour: Color;
    /** 边框颜色 */
    outlineColour: Color;
    /** 阴影颜色 */
    backColour: Color;
    /** 是否粗体 */
    bold: boolean;
    /** 是否斜体 */
    italic: boolean;
    /** 是否下划线 */
    underline: boolean;
    /** 是否删除线 */
    strikeOut: boolean;
    /** 横向缩放百分比 */
    scaleX: number;
    /** 纵向缩放百分比 */
    scaleY: number;
    /** 文字间距 */
    spacing: number;
    /** 旋转角度 */
    angle: number;
    /** 阴影样式 */
    borderStyle: BorderStyle;
    /** 边框宽度 单位像素 */
    outline: number;
    /** 阴影宽度 单位像素 */
    shadow: number;
    /** 对齐方式 */
    alignment: Alignment;
    /** 左外边距 */
    marginL: number;
    /** 右外边距 */
    marginR: number;
    /** 垂直边距 */
    marginV: number;
    /** Codepage Number （请使用Unicode编码来避免此字段 GBK:134）*/
    encoding: number;
    constructor(properties = {}) {
        // tslint:disable-next-line:max-line-length
        ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'StrikeOut', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding']
            .forEach((name, index) => {
                this[name[0].toLowerCase() + name.slice(1)] = properties[name];
            });
    }
    /**
    * @override
    */
    toString() {
        let ass = 'Style: ';
        const temp: string[] = [];
        // tslint:disable-next-line:max-line-length
        ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'StrikeOut', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding']
            .forEach((name) => {
                switch (name[0].toLowerCase() + name.slice(1)) {
                    case 'name':
                    case 'fontname':
                        temp.push(this[name[0].toLowerCase() + name.slice(1)]); break;
                    case 'fontsize':
                    case 'scaleX':
                    case 'scaleY':
                    case 'spacing':
                    case 'angle':
                    case 'outline':
                    case 'shadow':
                    case 'marginL':
                    case 'marginR':
                    case 'marginV':
                    case 'encoding':
                    case 'primaryColour':
                    case 'secondaryColour':
                    case 'outlineColour':
                    case 'backColour':
                    case 'alignment':
                    case 'borderStyle':
                        temp.push(this[name[0].toLowerCase() + name.slice(1)].toString()); break;
                    case 'bold':
                    case 'italic':
                    case 'underline':
                    case 'strikeOut':
                        temp.push(this[name[0].toLowerCase() + name.slice(1)] ? '-1' : '0'); break;
                }
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
    get secondaryColor() {
        return this.secondaryColour;
    }
    set secondaryColor(value) {
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

export class StyleError extends Error { }

export default Style;
