import Color from './Color';
export declare enum BorderStyle {
    BorderAndShadow = 1,
    PureBackground = 3,
}
export declare enum Alignment {
    UndefinedAlignment = 0,
    LeftBottom = 1,
    Bottom = 2,
    RightBottom = 3,
    LeftMiddle = 4,
    Middle = 5,
    RightMiddle = 6,
    LeftTop = 7,
    Top = 8,
    RightTop = 9,
}
declare class Style {
    name: string;
    fontname: string;
    fontsize: number;
    primaryColour: Color;
    secondaryColour: Color;
    outlineColour: Color;
    backColour: Color;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikeOut: boolean;
    scaleX: number;
    scaleY: number;
    spacing: number;
    angle: number;
    borderStyle: BorderStyle;
    outline: number;
    shadow: string;
    alignment: Alignment;
    marginL: number;
    marginR: number;
    marginV: number;
    encoding: number;
    constructor(properties?: {});
    /**
    * @override
    */
    toString(): string;
    primaryColor: Color;
    SecondaryColor: Color;
    outlineColor: Color;
    backColor: Color;
}
export default Style;
