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
    name: string; // 样式名
    fontname: string; // 字体名
    fontsize: number; // 字号
    primaryColour: Color; // 主要颜色
    secondaryColour: Color; // 次要颜色
    outlineColour: Color; // 轮廓颜色
    backColour: Color; // 阴影颜色
    bold: boolean; // 是否粗体
    italic: boolean; // 是否斜体
    underline: boolean; // 是否下划线
    strikeOut: boolean; // 是否删除线
    scaleX: number; // 宽度缩放百分比
    scaleY: number; // 高度缩放百分比
    spacing: number; // 文字间距
    angle: number; // 旋转角度
    borderStyle: BorderStyle; // 阴影样式
    outline: number; // 轮廓宽度 （像素）
    shadow: number; // 阴影宽度 （像素）
    alignment: Alignment; // 对齐方式 （参考小键盘）
    marginL: number; // 左侧边距
    marginR: number; // 右侧边距
    marginV: number; // 垂直边距
    encoding: number; // Codepage Number （请使用Unicode编码来避免此字段 GBK:134）
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
