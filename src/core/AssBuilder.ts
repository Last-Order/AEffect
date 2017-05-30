import Dialogue from "./Entities/Dialogue";
import AEffect from  '../AEffect'

const headerTemplate = `[Script Info]\r\n\
; Script generated by AEffect\r\n\
; https://github.com/Last-Order/AEffect\r\n\
; ${new Date()}\r\n\
ScriptType: v4.00+\r\n\
WrapStyle: 0\r\n\
ScaledBorderAndShadow: yes\r\n\
YCbCr Matrix: None\r\n\
`;

class AssBuilder {
    /**
     * @param AEffect
     */
    static build(AEffect: AEffect){
        let ass = headerTemplate;
        if (AEffect.metaInfo.resolution.width && AEffect.metaInfo.resolution.height){
            ass += `PlayResX: ${AEffect.metaInfo.resolution.width}\r\n`;
            ass += `PlayResY: ${AEffect.metaInfo.resolution.height}\r\n`;
        }

        ass += "\r\n[V4+ Styles]\r\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\r\n";

        // 拼接样式
        for (let key of Object.keys(AEffect.styles)){
            ass += `${AEffect.styles[key].toString()}\r\n`;
        }

        ass += "\r\n[Events]\r\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\r\n"

        // 拼接对话行
        for (let line of AEffect.dialogs){
            if (!line.isComment){
                if (!line.isSyllabified){
                    ass += `${line}\r\n`;
                }
                else{
                    // 将音节转换为行
                    let now = line.start.second;

                }
            }

        }
        return ass;
    }
}


export default AssBuilder;