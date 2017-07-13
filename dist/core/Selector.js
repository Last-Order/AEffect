"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Text_1 = require("./Entities/Text");
const Time_1 = require("./Entities/Time");
const DrawingMode_1 = require("./Effects/DrawingMode");
var TimePoint;
(function (TimePoint) {
    TimePoint[TimePoint["LineStart"] = 0] = "LineStart";
    TimePoint[TimePoint["LineEnd"] = 1] = "LineEnd";
    TimePoint[TimePoint["LineMiddle"] = 2] = "LineMiddle";
    TimePoint[TimePoint["SyllableStart"] = 3] = "SyllableStart";
    TimePoint[TimePoint["SyllableEnd"] = 4] = "SyllableEnd";
    TimePoint[TimePoint["SyllableMiddle"] = 5] = "SyllableMiddle";
})(TimePoint = exports.TimePoint || (exports.TimePoint = {}));
class EndBeforeStartError extends Error {
}
exports.EndBeforeStartError = EndBeforeStartError;
class Selector {
    constructor(AE) {
        this.dialogs = [];
        this.generatedDialogs = [];
        this.AE = AE;
    }
    /**
     * 选取特定行
     * @param condition 条件
     * @returns {Selector}
     */
    select(condition) {
        let dialogs = this.AE.dialogs;
        for (let key of Object.keys(condition)) {
            dialogs = dialogs.filter((dialog) => {
                return Selector[`selectBy${key[0].toUpperCase() + key.slice(1)}`](dialog, condition[key]);
            });
        }
        this.dialogs = dialogs.filter(dialog => !dialog.isComment); // 不选中注释行
        this.condition = condition; // 存档查询条件
        return this;
    }
    static selectByStyle(dialog, style) {
        return dialog.style.name === style;
    }
    static selectByName(dialog, name) {
        return dialog.name === name;
    }
    static selectByLayer(dialog, layer) {
        return dialog.layer === layer;
    }
    static selectByFontsize(dialog, fontSize) {
        return dialog.style.fontsize === fontSize;
    }
    static selectByText(dialog, regExp) {
        return regExp.test(dialog.text.originalText);
    }
    /**
     * 添加特效标签
     * @param effect 特效标签对象数组
     */
    addEffect(effect) {
        // 对选择器添加标签，则视为给选中的所有行添加标签
        for (let dialog of this.dialogs) {
            dialog.addEffect(effect);
        }
        return this;
    }
    /**
     * 对选择器所选择的所有行进行音节化操作
     * @param startPoint 时间起点
     * @param endPoint 时间结束点
     * @param startOffset 时间起始点偏移 毫秒
     * @param endOffset 时间结束点偏移 毫秒
     * @param options
     * @returns {Selector}
     */
    splitIntoSyllables(startPoint = TimePoint.LineStart, endPoint = TimePoint.LineEnd, startOffset = 0, endOffset = 0, options = {}) {
        let newDialogs = [];
        // 默认值赋予
        let _options;
        _options = {
            autoComment: options.autoComment || false,
            text: options.text || "",
            drawingMode: options.drawingMode || false
        };
        this.dialogs.forEach((dialog, index) => {
            dialog.parseSyllables();
            let start = dialog.start;
            let end;
            let syllableIndex = 0;
            for (let textGroup of dialog.text.groups) {
                for (let effectIndex in textGroup.effectGroup) {
                    let effect = textGroup.effectGroup[effectIndex];
                    if (effect.name === "k") {
                        let _effect = effect; // 你问我为什么强制类型转换 我只能说无可奉告
                        end = new Time_1.default(start.second + _effect.duration / 1000);
                        // 生成新 Dialog 对象
                        let newDialog = dialog.clone();
                        newDialog.start = new Time_1.default(startOffset).add({
                            [TimePoint.LineStart]: dialog.start.clone(),
                            [TimePoint.LineEnd]: dialog.end.clone(),
                            [TimePoint.LineMiddle]: new Time_1.default(dialog.start.add(dialog.end.sub(dialog.start)).second),
                            [TimePoint.SyllableStart]: start.clone(),
                            [TimePoint.SyllableEnd]: end.clone(),
                            [TimePoint.SyllableMiddle]: new Time_1.default(start.add(end.sub(start)).second)
                        }[startPoint]);
                        newDialog.end = new Time_1.default(endOffset).add({
                            [TimePoint.LineStart]: dialog.start.clone(),
                            [TimePoint.LineEnd]: dialog.end.clone(),
                            [TimePoint.LineMiddle]: new Time_1.default(dialog.start.add(dialog.end.sub(dialog.start)).second),
                            [TimePoint.SyllableStart]: start.clone(),
                            [TimePoint.SyllableEnd]: end.clone(),
                            [TimePoint.SyllableMiddle]: new Time_1.default(start.add(end.sub(start)).second)
                        }[endPoint]);
                        newDialog.syllableDuration = _effect.duration;
                        if (newDialog.end.sub(newDialog.start).second < 0) {
                            // 结束时间小于开始时间
                            throw new EndBeforeStartError("指定的结束时间小于开始时间");
                        }
                        // 复制文字
                        newDialog.text.groups = (new Text_1.default(_options.text || textGroup.toString())).groups;
                        // 去除时间标签
                        newDialog.text.groups[0].effectGroup = newDialog.text.groups[0].effectGroup.filter(e => e.name !== "k");
                        if (_options.drawingMode) {
                            newDialog.addEffect([
                                new DrawingMode_1.default(true)
                            ]);
                        }
                        newDialogs.push(newDialog);
                        // 链接原句与新句
                        newDialog.parentDialog = dialog;
                        newDialog.syllableIndex = syllableIndex;
                        newDialog.isSyllabified = true;
                        syllableIndex++;
                        // 时间向后推移
                        start = new Time_1.default(start.second + _effect.duration / 1000);
                        break;
                    }
                }
            }
            // 去掉原 Dialog 的位置标签
            this.dialogs[index].text.groups.forEach(textGroup => {
                textGroup.effectGroup = textGroup.effectGroup.filter(e => e.name !== "pos");
            });
            if (_options.autoComment) {
                // 注释原句
                this.dialogs[index].isComment = true;
            }
        });
        newDialogs.forEach((newDialog) => {
            this.AE.generatedDialogs.push(newDialog);
            this.generatedDialogs.push(newDialog);
        });
        return this;
    }
    /**
     * 获得选择器所选定的对话
     * @returns {Dialogue[]}
     */
    getOriginalDialogs() {
        return this.dialogs;
    }
    /**
     * 获得由本选择器生成的字幕
     * @returns {Dialogue[]}
     */
    getDialogs() {
        return this.generatedDialogs;
    }
    /**
     * 对生成的 Dialog 批量应用函数
     * @param handler
     * @returns {Selector}
     */
    forEachDialog(handler) {
        this.generatedDialogs.forEach((dialog, index, dialogArray) => {
            handler(dialog, index);
        });
        return this;
    }
    /**
     * 对原始的 Dialog 批量应用函数
     * @param handler
     * @returns {Selector}
     */
    forEachOriginalDialogs(handler) {
        this.dialogs.forEach((dialog, index, dialogArray) => {
            handler(dialog, index);
        });
        return this;
    }
    /**
     * 注释所有选中的 Dialog
     * @returns {Selector}
     */
    commentOriginalDialogs() {
        this.dialogs.forEach(dialog => {
            dialog.isComment = true;
        });
        return this;
    }
}
exports.default = Selector;
//# sourceMappingURL=Selector.js.map