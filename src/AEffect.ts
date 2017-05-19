import * as fs from 'fs'

import Log from './utils/Log';
import AssParser from './core/AssParser';
import AssBuilder from './core/AssBuilder';
import Selector from './core/Selector';

import Dialogue from './core/Entities/Dialogue';
import Style from './core/Entities/Style';
import MetaInfo from './core/Entities/MetaInfo'

class AEffect{
    styles: {[index: string]: Style};
    dialogs: Dialogue[];
    metaInfo: MetaInfo;

    constructor() {
        this.styles = {};
        this.dialogs = [];
        this.metaInfo = new MetaInfo();
    }

    /**
     * 从文件读取字幕
     * @param path 路径
     * @param encoding 编码 
     */
    loadFromFile(path, encoding = 'utf-8') {
        return new Promise((resolve, reject) => {
            fs.readFile(path, encoding, (error, data) => {
                if (error) {
                    Log.error("file_not_found", "找不到指定的文件");
                    reject(error);
                }
                else{
                    let result = AssParser.parse(data);
                    this.metaInfo = result.metaInfo;
                    this.dialogs = result.dialogs;
                    this.styles = result.styles;
                    resolve(this)
                }
            })
        })
    }

    /**
     * 从文本读取字幕
     * @param text 文本
     */
    loadFromText(text) {
        let result = AssParser.parse(text);
        if (result){
            this.metaInfo = result.metaInfo;
            this.dialogs = result.dialogs;
            this.styles = result.styles;
        }
        return this;
    }

    build() {
        return AssBuilder.build(this);
    }

    /**
     * 字幕选择器
     */
    select(condition = {}) {
        if (this.dialogs.length === 0) {
            Log.error("empty_ass", "请先载入含有对话句的 Ass 文件");
            return;
        }
        return Selector.select(this, condition);
    }
}


export default AEffect;