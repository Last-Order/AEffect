"use strict";
const fs = require("fs");
const Log_1 = require("./utils/Log");
const AssParser_1 = require("./core/AssParser");
const AssBuilder_1 = require("./core/AssBuilder");
const Selector_1 = require("./core/Selector");
const MetaInfo_1 = require("./core/Entities/MetaInfo");
class AEffect {
    constructor() {
        //Log.info("AEffect 初始化中喵");
        this.styles = {};
        this.dialogs = [];
        this.metaInfo = new MetaInfo_1.default();
    }
    /**
     * 从文件读取字幕
     * @param path 路径
     * @param encoding 编码
     */
    loadFromFile(path, encoding = 'utf-8') {
        let data = fs.readFileSync(path, encoding);
        let result = AssParser_1.default.parse(data);
        this.metaInfo = result.metaInfo;
        this.dialogs = result.dialogs;
        this.styles = result.styles;
    }
    /**
     * 从文本读取字幕
     * @param text 文本
     */
    loadFromText(text) {
        let result = AssParser_1.default.parse(text);
        if (result) {
            this.metaInfo = result.metaInfo;
            this.dialogs = result.dialogs;
            this.styles = result.styles;
        }
        return this;
    }
    build() {
        return AssBuilder_1.default.build(this);
    }
    /**
     * 字幕选择器
     * @return Selector 对象
     * @param condition 搜索条件
     */
    select(condition = {}) {
        if (this.dialogs.length === 0) {
            Log_1.default.error("empty_ass", "请先载入含有对话句的 Ass 文件");
            return;
        }
        return new Selector_1.default().select(this, condition);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AEffect;
//# sourceMappingURL=AEffect.js.map