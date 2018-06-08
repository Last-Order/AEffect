import * as fs from 'fs'

import Log from './utils/Log';
import AssParser from './core/AssParser';
import AssBuilder from './core/AssBuilder';
import Selector, { SelectorCondition } from './core/Selector';

import Dialogue from './core/Entities/Dialogue';
import Style from './core/Entities/Style';
import MetaInfo from './core/Entities/MetaInfo'

class AEffect {
    styles: { [index: string]: Style };
    dialogs: Dialogue[];
    generatedDialogs: Dialogue[];
    metaInfo: MetaInfo;

    constructor() {
        this.styles = {};
        this.dialogs = [];
        this.generatedDialogs = [];
        this.metaInfo = new MetaInfo();
    }

    /**
     * 从文件读取字幕
     * @param path 路径
     * @param encoding 编码 
     */
    loadFromFile(path, encoding = 'utf-8') {
        const data = fs.readFileSync(path, encoding);
        const result = AssParser.parse(data);
        this.metaInfo = result.metaInfo;
        this.dialogs = result.dialogs;
        this.styles = result.styles;
        return this;
    }

    /**
     * 从文本读取字幕
     * @param text 文本
     */
    loadFromText(text) {
        const result = AssParser.parse(text);
        this.metaInfo = result.metaInfo;
        this.dialogs = result.dialogs;
        this.styles = result.styles;
        return this;
    }

    build() {
        return AssBuilder.build(this);
    }

    /**
     * 字幕选择器
     * @return Selector 对象
     * @param condition 搜索条件
     */
    select(condition: SelectorCondition = {}): Selector {
        if (this.dialogs.length === 0) {
            Log.error("empty_ass", "请先载入含有对话句的 Ass 文件");
            return;
        }
        return new Selector(this).select(condition);
    }
}
export default AEffect;