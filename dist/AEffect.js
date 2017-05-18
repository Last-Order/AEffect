"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Log_1 = require("./utils/Log");
const AssParser_1 = require("./core/AssParser");
const AssBuilder_1 = require("./core/AssBuilder");
const Selector_1 = require("./core/Selector");
const MetaInfo_1 = require("./core/Entities/MetaInfo");
class AEffect {
    constructor() {
        this.styles = new Map();
        this.dialogs = [];
        this.metaInfo = new MetaInfo_1.default();
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
                    Log_1.default.error("file_not_found", "找不到指定的文件");
                    reject(error);
                }
                let result = AssParser_1.default.parse(data);
                this.metaInfo = result.metaInfo;
                this.dialogs = result.dialogs;
                this.styles = result.styles;
                resolve(this);
            });
        });
    }
    /**
     * 从文本读取字幕
     * @param text 文本
     */
    loadFromText(text) {
        let result = AssParser_1.default.parse(text);
        this.metaInfo = result.metaInfo;
        this.dialogs = result.dialogs;
        this.styles = result.styles;
        return this;
    }
    build() {
        return AssBuilder_1.default.build(this);
    }
    /**
     * 字幕选择器
     */
    select(condition = {}) {
        if (this.dialogs.length === 0) {
            Log_1.default.error("empty_ass", "请先载入含有对话句的 Ass 文件");
            return;
        }
        return Selector_1.default.select(this, condition);
    }
}
(() => __awaiter(this, void 0, void 0, function* () {
    let AE = new AEffect();
    yield AE.loadFromFile("D:\\Git\\AEffect\\test.ass");
    AE.select().forEach(dialog => {
        dialog.addBlur(2);
    });
    console.log(AE.build());
}))();
exports.default = AEffect;
//# sourceMappingURL=AEffect.js.map