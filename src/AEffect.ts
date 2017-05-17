const fs = require('fs');
import Log from './utils/Log';
import AssParser from './core/AssParser';
import AssBuilder from './core/AssBuilder';
import Selector from './core/Selector';

import Dialogue from './core/Entities/Dialogue';
import Style from './core/Entities/Style';

interface AEffect {
    styles: object;
    dialogs: Dialogue[];
    metaInfo: {
        resolution: {
            width: number;
            height: number;
        }
    };

    loadFromFile(path: string, encoding?: string);
    loadFromText(text: string);
}

class AEffect implements AEffect {
    constructor() {
        this.metaInfo = {
            resolution: {
                width: undefined,
                height: undefined
            }
        };
        this.dialogs = [];
        this.styles = {};
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
                    reject();
                }
                let result = AssParser.parse(data);
                this.metaInfo = result.metaInfo;
                this.dialogs = result.dialogs;
                this.styles = result.styles;
                resolve(this)
            })
        })
    }

    /**
     * 从文本读取字幕
     * @param text 文本
     */
    loadFromText(text) {
        let result = AssParser.parse(text);
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
     */
    select(condition = {}) {
        if (this.dialogs.length === 0) {
            Log.error("empty_ass", "请先载入含有对话句的 Ass 文件");
            return;
        }
        return Selector.select(this, condition);
    }
}

(async () => {
    let AE = new AEffect()
    await AE.loadFromFile("D:\\Git\\AEffect\\test.ass");
    
    AE.select({
        "style": "Default",
        "name": "actor"
    }).forEach(dialog => {
        dialog.addBlur(2);
    })

    console.log(AE.build());
})()


export default AEffect;