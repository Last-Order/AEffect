"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const Log_1 = require("./utils/Log");
const AssParser_1 = require("./core/AssParser");
class AEffect {
    constructor() {
        this.metaInfo = {};
        this.dialogs = [];
        this.styles = {};
    }
    loadFromFile(path, encoding = 'utf-8') {
        fs.readFile(path, encoding, (error, data) => {
            if (error) {
                Log_1.default.error("file_not_found", "找不到指定的文件");
                return false;
            }
            let result = AssParser_1.default.parse(data);
            this.metaInfo = result.metaInfo;
            this.dialogs = result.dialogs;
            this.styles = result.styles;
        });
    }
    loadFromText(text) {
        let result = AssParser_1.default.parse(text);
    }
}
new AEffect().loadFromFile("D:\\Git\\AEffect\\test.ass");
