import Log from '../utils/Log'
// Entities
import Dialogue from './Entities/Dialogue'
import { DialogueConstructProperties } from './Entities/Dialogue'
import Style from './Entities/Style'
import MetaInfo from './Entities/MetaInfo'
import Time from './Entities/Time'
import Text from './Entities/Text'

import '../utils/Explode'
import '../utils/ToFirstLowerCase'

export class MissingEventBlockError extends Error{}
export class InvalidAssError extends Error{}
export class InvalidStyleFormatDefinitionError extends Error{}
export class InvalidStyleDefinitionError extends Error{}
export class MissingStyleDefinitionError extends Error{}
export class MissingDialogFormatDefinitionError extends Error{}
export class InvalidDialogFormatDefinitionError extends Error{}

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
            throw new MissingEventBlockError();
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
                    throw new InvalidAssError();
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
            throw new MissingStyleDefinitionError();
        }

        // 解析样式格式定义
        let styleFormatLine = styleBlock[0].split("Format:")[1].trim().split(",");
        let styleFormat: string[] = [];
        for (let styleFormatKey of styleFormatLine) {
            if (validStyleFormatKeys.includes(styleFormatKey.trim())) {
                styleFormat.push(styleFormatKey.trim());
            }
            else {
                throw new InvalidStyleFormatDefinitionError();
            }
        }

        styleBlock = styleBlock.slice(1);

        // 根据格式解析样式行
        styleBlock.forEach(line => {
            let parsedStyle = {
                Name: "___AEffect_unknown_style__B"
            };
            let lineArray = line.split('Style:')[1].trim().split(',');
            if (lineArray.length !== styleFormat.length){
                throw new InvalidStyleDefinitionError();
            }
            lineArray.forEach((property, index) => {
                parsedStyle[styleFormat[index]] = property.trim()
            });
            parsedAssStyles[parsedStyle.Name] = new Style(parsedStyle);
        });

        // 解析对话行
        let parsedAssDialogs: Dialogue[] = [];
        let validDialogFormatKey = ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect", "Text"];
        // 解析对话行格式
        if (!eventBlock[0].trim().startsWith("Format:")) {
            throw new MissingDialogFormatDefinitionError();
        }

        let dialogFormatLine = eventBlock[0].split("Format:")[1].trim().split(",");
        let dialogFormat: string[] = [];
        for (let dialogFormatKey of dialogFormatLine) {
            if (validDialogFormatKey.includes(dialogFormatKey.trim())) {
                dialogFormat.push(dialogFormatKey.trim());
            }
            else {
                throw new InvalidDialogFormatDefinitionError();
            }
        }

        if (dialogFormat[dialogFormat.length - 1] !== "Text") {
            // Text 只能在最后 否则无法区分带有逗号的内容
            throw new InvalidDialogFormatDefinitionError();
        }

        eventBlock = eventBlock.slice(1);

        // 根据样式格式解析对话行
        eventBlock.forEach(line => {
            let parsedDialog: DialogueConstructProperties = {
                layer: 0,
                start: new Time(0),
                end: new Time(0),
                styleName: null,
                name: "",
                marginL: 0,
                marginR: 0,
                marginV: 0,
                effect: "",
                text: null,
                isComment: false
            };
            let dialogBody: string;
            if (line.startsWith("Comment:")) {
                dialogBody = line.split("Comment:")[1].trim();
                parsedDialog.isComment = true;
            }
            else {
                dialogBody = line.split("Dialogue:")[1].trim();
            }
            dialogBody.explode(",", dialogFormat.length).forEach((propertyValue, index) => {
                let propertyKey = dialogFormat[index].toFirstLowerCase();
                switch(propertyKey){
                    case 'layer': 
                    case 'marginL':
                    case 'marginR':
                    case 'marginV':
                        parsedDialog[propertyKey] = parseInt(propertyValue);
                        break;
                    case 'style':
                        parsedDialog.styleName = propertyValue;
                        break;
                    case 'name':
                    case 'effect':
                        parsedDialog[propertyKey] = propertyValue;
                        break;
                    case 'start':
                    case 'end':
                        parsedDialog[propertyKey] = Time.parse(propertyValue);
                        break;
                    case 'text':
                        parsedDialog[propertyKey] = new Text(propertyValue);
                        break;
                }
            });
            try {
                parsedAssDialogs.push(new Dialogue(parsedDialog, parsedAssStyles));
            }
            catch (e) {

            }
        });

        return {
            dialogs: parsedAssDialogs,
            styles: parsedAssStyles,
            metaInfo: metaInfo
        }
    }
}