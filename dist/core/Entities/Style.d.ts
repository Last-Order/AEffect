declare class Style {
    name: string;
    fontname: string;
    primaryColour: string;
    secondaryColour: string;
    outlineColour: string;
    backColour: string;
    bold: string;
    italic: string;
    underline: string;
    strikeOut: string;
    scaleX: string;
    scaleY: string;
    spacing: string;
    angle: string;
    borderStyle: string;
    outline: string;
    shadow: string;
    alignment: string;
    marginL: string;
    marginR: string;
    marginV: string;
    encoding: string;
    constructor(properties?: {});
    /**
    * @override
    */
    toString(): string;
    primaryColor: string;
    SecondaryColor: string;
    outlineColor: string;
    backColor: string;
}
export default Style;
