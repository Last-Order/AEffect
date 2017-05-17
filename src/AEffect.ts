const fs = require('fs');
import Log from './utils/Log';
import AssParser from './core/AssParser';

import Dialogue from './core/Entities/Dialogue';
import Style from './core/Entities/Style';

class AEffect{
    styles: {
    };
    dialogs: Dialogue[];
    metaInfo: {
    };
    constructor() {
        this.metaInfo = {};
        this.dialogs = [];
        this.styles = {};
    }
    loadFromFile(path, encoding = 'utf-8'){
        fs.readFile(path, encoding, (error, data) => {
            if (error){
                Log.error("file_not_found", "找不到指定的文件");
                return false;
            }
            let result = AssParser.parse(data);
            this.metaInfo = result.metaInfo;
            this.dialogs = result.dialogs;
            this.styles = result.styles;
        })
    }
    loadFromText(text){
        let result = AssParser.parse(text);
    }
}
    
new AEffect().loadFromFile("D:\\Git\\AEffect\\test.ass");