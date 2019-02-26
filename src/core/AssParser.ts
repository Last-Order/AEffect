import Log from '../utils/Log';
// Entities
import Dialogue, { DialogueConstructProperties } from './Entities/Dialogue';
import Style from './Entities/Style';
import MetaInfo from './Entities/MetaInfo';
import Time from './Entities/Time';
import Text from './Entities/Text';

import '../utils/Explode';
import '../utils/ToFirstLowerCase';
import Color from './Entities/Color';

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
        // 按\n划分。
        const assArray = content.replace(/\r/g, '').split(/\n/);

        // 将 Ass 分割为几个 Block
        if (assArray.indexOf('[Events]') === -1) {
            throw new MissingEventBlockError('Ass 文件缺少 Event 块');
        }

        const metaInfoBlock: string[] = [];
        let styleBlock: string[] = [];
        let eventBlock: string[] = [];
        let nowBlock: string[];
        assArray.forEach((line) => {
            if (line.trim().startsWith('[')) {
                try {
                    nowBlock = {
                        '[Script Info]': metaInfoBlock,
                        '[V4+ Styles]': styleBlock,
                        '[Events]': eventBlock,
                    }[line.trim()];
                } catch (e) {
                    throw new InvalidAssError('Ass 文件不合法');
                }
            }
            if (nowBlock !== undefined && !line.trim().startsWith('[') && line.trim() !== '') {
                nowBlock.push(line);
            }
        });

        // 解析设置信息
        const metaInfo = new MetaInfo();

        const widthLine = metaInfoBlock.filter(line => line.startsWith('PlayResX'));
        if (widthLine.length === 1) {
            metaInfo.resolution.width = parseInt(widthLine[0].split('PlayResX:')[1].trim(), 10);
        } else {
            Log.warning('Ass 文件分辨率设定缺失或存在多个');
        }
        const heightLine = metaInfoBlock.filter(line => line.startsWith('PlayResY'));
        if (heightLine.length === 1) {
            metaInfo.resolution.height = parseInt(heightLine[0].split('PlayResY:')[1].trim(), 10);
        } else {
            Log.warning('Ass 文件分辨率设定缺失或存在多个');
        }

        // 解析样式
        const parsedAssStyles: { [value: string]: Style } = {};
        // tslint:disable-next-line:max-line-length
        const validStyleFormatKeys = ['Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour', 'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY', 'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL', 'MarginR', 'MarginV', 'Encoding'];

        if (!styleBlock[0].trim().startsWith('Format:')) {
            throw new MissingStyleDefinitionError('Ass 文件缺少 Style 格式定义');
        }

        // 解析样式格式定义
        const styleFormatLine = styleBlock[0].split('Format:')[1].trim().split(',');
        const styleFormat: string[] = [];
        for (const styleFormatKey of styleFormatLine) {
            if (validStyleFormatKeys.includes(styleFormatKey.trim())) {
                styleFormat.push(styleFormatKey.trim());
            }
            else {
                console.log(styleFormatKey);
                throw new InvalidStyleFormatDefinitionError('Ass 文件 Style 格式定义不合法');
            }
        }

        styleBlock = styleBlock.slice(1);

        // 根据格式解析样式行
        styleBlock.forEach(line => {
            const parsedStyle = {
                Name: '___AEffect_unknown_style__B',
            };
            const lineArray = line.split('Style:')[1].trim().split(',');
            if (lineArray.length !== styleFormat.length) {
                throw new InvalidStyleDefinitionError('Ass 文件 Style 格式定义与实际不符');
            }
            lineArray.forEach((property, index) => {
                const key = styleFormat[index].toFirstLowerCase();
                switch (key){
                case 'name':
                case 'fontname':
                    parsedStyle[styleFormat[index]] = property.trim();
                    break;
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
                    parsedStyle[styleFormat[index]] = parseInt(property.trim(), 10);
                    break;
                case 'primaryColour':
                case 'secondaryColour':
                case 'outlineColour':
                case 'backColour':
                    parsedStyle[styleFormat[index]] = Color.ASS(property.trim());
                    break;
                case 'bold':
                case 'italic':
                case 'underline':
                case 'strikeOut':
                    parsedStyle[styleFormat[index]] = property.trim() === '-1';
                    break;
                case 'alignment':
                    parsedStyle[styleFormat[index]] = parseInt(property.trim(), 10);
                    break;
                case 'borderStyle':
                    parsedStyle[styleFormat[index]] = parseInt(property.trim(), 10);
                    break;
                }
            });
            parsedAssStyles[parsedStyle.Name] = new Style(parsedStyle);
        });

        // 解析对话行
        const parsedAssDialogs: Dialogue[] = [];
        // tslint:disable-next-line:max-line-length
        const validDialogFormatKey = ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'];
        // 解析对话行格式
        if (!eventBlock[0].trim().startsWith('Format:')) {
            throw new MissingDialogFormatDefinitionError('Ass 文件缺少 Dialog 格式定义');
        }

        const dialogFormatLine = eventBlock[0].split('Format:')[1].trim().split(',');
        const dialogFormat: string[] = [];
        for (const dialogFormatKey of dialogFormatLine) {
            if (validDialogFormatKey.includes(dialogFormatKey.trim())) {
                dialogFormat.push(dialogFormatKey.trim());
            }
            else {
                throw new InvalidDialogFormatDefinitionError('Ass 文件 Dialog 格式定义不合法');
            }
        }

        if (dialogFormat[dialogFormat.length - 1] !== 'Text') {
            // Text 只能在最后 否则无法区分带有逗号的内容
            throw new InvalidDialogFormatDefinitionError('Ass 文件 Dialog 格式定义不合法：Text 只能在最末');
        }

        eventBlock = eventBlock.slice(1);

        // 根据样式格式解析对话行
        eventBlock.forEach((line) => {
            const parsedDialog: DialogueConstructProperties = {
                layer: 0,
                start: new Time(0),
                end: new Time(0),
                styleName: null,
                name: '',
                marginL: 0,
                marginR: 0,
                marginV: 0,
                effect: '',
                text: null,
                isComment: false,
            };
            let dialogBody: string;
            if (line.startsWith('Comment:')) {
                dialogBody = line.split('Comment:')[1].trim();
                parsedDialog.isComment = true;
            } else {
                dialogBody = line.split('Dialogue:')[1].trim();
                parsedDialog.isComment = false;
            }
            dialogBody.explode(',', dialogFormat.length).forEach((propertyValue, index) => {
                const propertyKey = dialogFormat[index].toFirstLowerCase();
                switch (propertyKey){
                case 'layer':
                case 'marginL':
                case 'marginR':
                case 'marginV':
                    parsedDialog[propertyKey] = parseInt(propertyValue, 10);
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
                    parsedDialog[propertyKey] =
                        // tslint:disable-next-line:max-line-length
                        !parsedDialog.isComment ? new Text(propertyValue) : new Text(propertyValue, false);
                    break;
                }
            });
            try {
                parsedAssDialogs.push(new Dialogue(parsedDialog, parsedAssStyles, metaInfo));
            } catch (e) {

            }
        });
        return {
            metaInfo,
            dialogs: parsedAssDialogs,
            styles: parsedAssStyles,
        };
    },
};
