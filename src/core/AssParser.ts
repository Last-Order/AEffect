import Log from '../utils/Log'
// Entities
import Dialogue from './Entities/Dialogue';
import Style from './Entities/Style';
import MetaInfo from './Entities/MetaInfo'


export interface ParseResult {
    metaInfo: MetaInfo;
    dialogs: Dialogue[];
    styles: { [index: string]: Style };
}

export default {
    parse(content: string, options = {}): ParseResult {
        // 清除所有\r
        content = content.replace(/\r/g, "");
        // 按\n划分。
        let assArray = content.split(/\n/);

        // 将 Ass 分割为几个 Block
        if (assArray.indexOf("[Events]") === -1) {
            Log.error("event_block_not_found", "Ass 文件缺少 Events 块");
            return;
        }

        let metaInfoBlock: string[] = [];
        let styleBlock: string[] = [];
        let eventBlock: string[] = [];
        let nowBlock: string[];
        assArray.forEach(line => {
            if (line.trim().startsWith("[")) {
                try {
                    nowBlock = {
                        "[Script Info]": metaInfoBlock,
                        "[V4+ Styles]": styleBlock,
                        "[Events]": eventBlock
                    }[line.trim()];
                }
                catch (e) {
                    Log.error("invalid_ass", "Ass 文件不合法");
                }
            }
            if (nowBlock !== undefined && !line.trim().startsWith("[") && line.trim() !== "") {
                nowBlock.push(line);
            }
        });

        // 解析设置信息
        let metaInfo = new MetaInfo();

        let widthLine = metaInfoBlock.filter(line => line.startsWith("PlayResX"));
        if (widthLine.length === 1) {
            metaInfo.resolution.width = parseInt(widthLine[0].split("PlayResX:")[1].trim());
        }
        else {
            Log.warning("Ass 文件分辨率设定缺失或存在多个");
        }
        let heightLine = metaInfoBlock.filter(line => line.startsWith("PlayResY"));
        if (heightLine.length === 1) {
            metaInfo.resolution.height = parseInt(heightLine[0].split("PlayResY:")[1].trim());
        }
        else {
            Log.warning("Ass 文件分辨率设定缺失或存在多个");
        }

        // 解析样式
        let parsedAssStyles: { [value: string]: Style } = {};
        let validStyleFormatKeys = ["Name", "Fontname", "Fontsize", "PrimaryColour", "SecondaryColour", "OutlineColour", "BackColour", "Bold", "Italic", "Underline", "StrikeOut", "ScaleX", "ScaleY", "Spacing", "Angle", "BorderStyle", "Outline", "Shadow", "Alignment", "MarginL", "MarginR", "MarginV", "Encoding"];

        if (!styleBlock[0].trim().startsWith("Format:")) {
            Log.error("missing_style_format", "Ass 文件样式部分缺少格式定义");
            return;
        }

        // 解析样式格式定义
        let styleFormatLine = styleBlock[0].split("Format:")[1].trim().split(",");
        let styleFormat: string[] = [];
        for (let styleFormatKey of styleFormatLine) {
            if (validStyleFormatKeys.includes(styleFormatKey.trim())) {
                styleFormat.push(styleFormatKey.trim());
            }
            else {
                Log.error("invalid_style_format_definition", "Ass 样式部分格式定义不合法");
                return;
            }
        }

        styleBlock = styleBlock.slice(1);

        // 根据格式解析样式行
        styleBlock.forEach(line => {
            let parsedStyle = {
                Name: "___AEffect_unknown_style__B"
            };
            line.split('Style:')[1].trim().split(',').forEach((property, index, lineArray) => {
                if (index <= styleFormat.length - 1) {
                    parsedStyle[styleFormat[index]] = property.trim()
                }
                else {
                    Log.error("invalid_ass_style_definition", "Ass 样式定义与自身样式格式定义不符");
                }
            });
            parsedAssStyles[parsedStyle.Name] = new Style(parsedStyle);
        });

        // 解析对话行
        let parsedAssDialogs: Dialogue[] = [];
        let validDialogFormatKey = ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"];
        // 解析对话行格式
        if (!eventBlock[0].trim().startsWith("Format:")) {
            Log.error("missing_dialog_format", "缺少对话行格式定义");
        }

        let dialogFormatLine = eventBlock[0].split("Format:")[1].trim().split(",");
        let dialogFormat: string[] = [];
        for (let dialogFormatKey of dialogFormatLine) {
            if (validDialogFormatKey.includes(dialogFormatKey.trim())) {
                dialogFormat.push(dialogFormatKey.trim());
            }
            else {
                Log.error("invalid_dialog_format_definition", "对话行格式定义不合法");
                return;
            }
        }

        if (dialogFormat[dialogFormat.length - 1] !== "Text") {
            // Text 只能在最后 否则无法区分带有逗号的内容
            Log.error("invalid_dialog_format_definition", "对话行格式定义不合法，Text 只能在最末");
        }

        eventBlock = eventBlock.slice(1);

        // 根据样式格式解析对话行
        eventBlock.forEach(line => {
            let parsedDialog: { [index: string]: string } = {};
            let dialogBody: string;
            if (line.startsWith("Comment:")) {
                dialogBody = line.split("Comment:")[1].trim();
            }
            else {
                dialogBody = line.split("Dialogue:")[1].trim();
            }
            dialogBody.split(",").forEach((property, index, lineArray) => {
                try {
                    if (index <= dialogFormat.length - 2) {
                        parsedDialog[dialogFormat[index]] = property;
                    }
                    else {
                        parsedDialog['Text'] = lineArray.slice(dialogFormat.length - 1).join(',');
                        throw new Error(); // 停止遍历
                    }
                }
                catch (e) {

                }
            });
            try{
                parsedAssDialogs.push(new Dialogue(parsedDialog, parsedAssStyles));
            }
            catch(e){

            }
        });

        // 链接样式

        return {
            dialogs: parsedAssDialogs,
            styles: parsedAssStyles,
            metaInfo: metaInfo
        }
    }
}