/**
 * Ass Dialogue 类
 */

import Style, { StyleError } from './Style';
import Time from './Time';
import Text from './Text';
import MetaInfo from './MetaInfo';

import Effect from '../Effects/base/Effect';

import Layout from '../Layout';
import { TimePoint } from '../../definitions/TimePoint';

export class MissingAlignmentError extends Error { }
export class MissingResolutionError extends Error { }

export interface DialogueConstructProperties {
    layer?: number;
    start?: Time;
    end?: Time;
    styleName?: string;
    name?: string;
    marginL?: number;
    marginR?: number;
    marginV?: number;
    effect?: string;
    text: Text;
    isComment?: boolean;
}

class Dialogue {
    /** 显示层 */
    layer: number;
    /** 开始时间 */
    start: Time;
    /** 结束时间 */
    end: Time;
    /** 行左边缘中点横坐标 */
    lineLeft?: number;
    /** 行右边缘中点横坐标 */
    lineRight?: number;
    /** 宽度 */
    width?: number;
    /** 高度 */
    height?: number;
    /** 行样式表 */
    style: Style;
    /** 说话人 */
    name: string;
    /** 左外边距 */
    marginL: number = 0;
    /** 右外边距 */
    marginR: number = 0;
    /** 垂直外边距 */
    marginV: number = 0;
    /** 特效 */
    effect: string;

    /** 文本 */
    text: Text;
    /** 视频基本信息 */
    metaInfo: MetaInfo;
    properties: DialogueConstructProperties;
    styleMap: { [index: string]: Style };

    /** 是否已经音节化 */
    isSyllabified: boolean = false;
    /** 是否为评论 */
    isComment: boolean;

    constructor(
        properties: DialogueConstructProperties,
        styleMap: { [index: string]: Style },
        metaInfo: MetaInfo,
    ) {
        this.properties = properties;
        this.styleMap = styleMap;
        this.metaInfo = metaInfo;
        this.isComment = properties.isComment;
        // tslint:disable-next-line:max-line-length
        ['layer', 'start', 'end', 'styleName', 'name', 'marginL', 'marginR', 'marginV', 'effect', 'text', 'isComment'].forEach((name, index) => {
            if (properties[name] !== undefined) {
                // 该属性存在
                if (name === 'styleName') {
                    if (styleMap[properties[name]]) {
                        this.style = styleMap[properties[name]];
                    } else {
                        throw new StyleError('Ass 存在对话行未指定样式');
                    }
                } else {
                    this[name[0].toLowerCase() + name.slice(1)] = properties[name];
                }
            }
        });
    }
    /**
     * 添加特效标签
     * @param effects 特效标签数组
     */
    addEffect(effects: Effect[]) {
        for (const effect of effects) {
            this.text = effect.addTo(this.text);
        }
    }

    /**
     * 解析音节。为每个音节赋予位置。
     * @param autoPosition
     */
    parseSyllables(autoPosition: boolean = true) {
        this.isSyllabified = true;
        if (autoPosition) {
            if (!this.style.alignment) {
                throw new MissingAlignmentError(
                    `使用音节化功能，必须定义样式的对齐方式, 样式: ${this.style.name} 缺少相关定义`,
                );
            }
            if (!this.metaInfo.resolution.width || !this.metaInfo.resolution.height) {
                throw new MissingResolutionError('使用音节化功能，Ass 文件必须定义分辨率');
            }
            Layout.syllabify(this);
        }
    }

    /**
     * 获得行持续时间
     * @returns {number} 持续时间 毫秒
     */
    get duration(): number {

        return Math.round(this.end.sub(this.start).second * 1000);
    }
    /**
     * 获得相对行开始时间
     * 永远返回0
     * @returns {number}
     */
    get lineStart(): number {
        return 0;
    }
    /**
     * 获得相对行结束时间
     * @returns {number}
     */
    get lineEnd(): number {
        return this.duration;
    }

    /**
     * 行中间时间 毫秒
     * @returns {number}
     */
    get middleTime(): number {
        return Math.round(this.duration / 2);
    }

    /**
     * 时间点转换为时间
     * @param timePoint 时间点
     * @param dialog 对话实例
     * @param syllableStart 音节起始
     * @param syllableEnd 音节结束
     * @param offset 偏移 单位毫秒
     */
    static getTimeFromTimePoint(
        timePoint: TimePoint,
        dialog: Dialogue,
        syllableStart: Time,
        syllableEnd: Time,
        offset: number = 0,
    ) {
        switch (timePoint) {
            case 'LineStart': {
                return dialog.start.clone().add(new Time(offset / 1000));
            }
            case 'LineEnd': {
                return dialog.end.clone().add(new Time(offset / 1000));
            }
            case 'LineMiddle': {
                return new Time(
                    dialog.start.add(dialog.end.sub(dialog.start)).second / 2,
                ).add(new Time(offset / 1000));
            }
            case 'SyllableStart': {
                return syllableStart.clone().add(new Time(offset / 1000));
            }
            case 'SyllableEnd': {
                return syllableEnd.clone().add(new Time(offset / 1000));
            }
            case 'SyllableMiddle': {
                return new Time(syllableStart.add(syllableEnd.sub(syllableStart)).second / 2)
                    .add(new Time(offset / 1000));
            }
        }
    }

    /**
     * @override
     */
    toString() {
        let ass = 'Dialogue: ';
        if (this.isComment) {
            ass = 'Comment: ';
        }
        const temp: string[] = [];
        // tslint:disable-next-line:max-line-length
        ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'].forEach((name, index) => {
            switch (name) {
                case 'Layer':
                    temp.push(this.layer && this.layer.toString() || '0'); break;
                case 'Start':
                    temp.push(this.start && this.start.toString()); break;
                case 'End':
                    temp.push(this.end && this.end.toString()); break;
                case 'Style':
                    temp.push(this.style.name); break;
                case 'Name':
                    temp.push(this.name || ''); break;
                case 'MarginL':
                    temp.push(this.marginL && this.marginL.toString() || '0'); break;
                case 'MarginR':
                    temp.push(this.marginR && this.marginR.toString() || '0'); break;
                case 'MarginV':
                    temp.push(this.marginV && this.marginV.toString() || '0'); break;
                case 'Effect':
                    temp.push(this.effect); break;
                case 'Text':
                    temp.push(this.text.toString()); break;

            }
        });
        ass += temp.join(',');
        return ass;
    }

    /**
     * 复制一个 Dialogue 实例
     * @returns {Dialogue}
     */
    clone(): Dialogue {
        const clonedDialog =
            new Dialogue({ ...this.properties }, { ...this.styleMap }, { ...this.metaInfo });
        clonedDialog.text = clonedDialog.text.clone();
        return clonedDialog;
    }
}

export default Dialogue;
