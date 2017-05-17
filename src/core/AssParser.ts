import Log from '../utils/Log'
// Entities
import Dialogue from './Entities/Dialogue';
import Style from './Entities/Style';

interface parsedStyle {
    Name: string
}
interface ParseResult{
    metaInfo: object;
    dialogs: Dialogue[];
    styles: object;
}
export default {
    parse(content: string, options = {}) : any{
        // 按行划分。
        let assArray = content.split(/\r\n/);

        // 解析设置信息
        let metaInfo = {
            resolution: {
                width: undefined,
                height: undefined
            }
        };
        
        let widthLine = assArray.filter(line => line.startsWith("PlayResX"));
        if (widthLine.length === 1) {
            metaInfo.resolution.width = parseInt(widthLine[0].split("PlayResX:")[1].trim());
        }
        else {
            Log.warning("Ass 文件分辨率设定缺失或存在多个");
        }
        let heightLine = assArray.filter(line => line.startsWith("PlayResY"));
        if (heightLine.length === 1){
            metaInfo.resolution.height = parseInt(heightLine[0].split("PlayResY:")[1].trim());
        }
        else{
            Log.warning("Ass 文件分辨率设定缺失或存在多个");
        }

        // 解析样式
        let assStyles = assArray.filter(line => line.startsWith('Style'));
        let parsedAssStyles = {};
        assStyles.forEach(line => {
            let format = ["Name", "Fontname", "Fontsize", "PrimaryColour", "SecondaryColour", "OutlineColour", "BackColour", "Bold", "Italic", "Underline", "StrikeOut", "ScaleX", "ScaleY", "Spacing", "Angle", "BorderStyle", "Outline", "Shadow", "Alignment", "MarginL", "MarginR", "MarginV", "Encoding"];
            let parsedStyle: parsedStyle = {
                Name: ""
            };
            try {
                line.split('Style:')[1].trim().split(',').forEach((property, index, lineArray) => {
                    parsedStyle[format[index]] = property;
                })
            }
            catch (e) {
                Log.error("invalid_ass", "Ass 文件不合法");
            }
            parsedAssStyles[parsedStyle.Name] = new Style(parsedStyle);
        });

        // 解析对话行
        let assLines = assArray.filter(line => line.startsWith('Dialogue'));
        let parsedAssDialogs = [];
        assLines.forEach(line => {
            let format = ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect"];
            let parsedDialog = {};
            try {
                line.split('Dialogue:')[1].trim().split(',').forEach((property, index, lineArray) => {
                    if (index <= 8) {
                        parsedDialog[format[index]] = property;
                    }
                    else {
                        // 对文本可能含有逗号的特殊处理
                        parsedDialog['Text'] = lineArray.slice(9).join(',');
                        throw {}; // 停止遍历
                    }
                })
            }
            catch (e) {

            }
            parsedAssDialogs.push(new Dialogue(parsedDialog));


        });

        // 链接样式

        parsedAssDialogs.forEach((dialog, index) => {
            if (parsedAssStyles[dialog.style] !== undefined) {
                dialog.style = parsedAssStyles[dialog.style];
            }
            else {
                Log.error("unknown_style", `Ass 存在对话行未指定样式 Line:${index + 1}`);
            }
        })
        return {
            dialogs: parsedAssDialogs,
            styles: parsedAssStyles,
            metaInfo: metaInfo
        }
    }
}