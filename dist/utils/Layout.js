"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Style_1 = require("../core/Entities/Style");
const Position_1 = require("../core/Effects/Position");
const textent_1 = require("textent");
class InvalidAlignmentError extends Error {
}
exports.InvalidAlignmentError = InvalidAlignmentError;
;
class Layout {
    /**
     * 为所有音节生成位置
     * @param dialog
     */
    static syllabify(dialog) {
        let resolution = dialog.metaInfo.resolution;
        let base = {
            x: 0,
            y: 0
        }; // 基准位置
        let now = {
            x: 0,
            y: 0
        };
        if ([Style_1.Alignment.LeftBottom, Style_1.Alignment.LeftMiddle, Style_1.Alignment.LeftTop].includes(dialog.style.alignment)) {
            //左对齐
            base.x = dialog.style.marginL;
            if (dialog.style.alignment === Style_1.Alignment.LeftTop) {
                base.y += dialog.style.marginV;
            }
            if (dialog.style.alignment === Style_1.Alignment.LeftMiddle) {
                base.y += Math.round(resolution.height / 2);
            }
            if (dialog.style.alignment === Style_1.Alignment.LeftBottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            now = Object.assign({}, base);
            for (let textGroup of dialog.text.groups) {
                let text = textent_1.default.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                textGroup.effectGroup.push(new Position_1.default(now.x, now.y));
                now.x += text.width * (dialog.style.scaleX / 100) + dialog.style.spacing;
            }
        }
        else if ([Style_1.Alignment.Bottom, Style_1.Alignment.Middle, Style_1.Alignment.Top].includes(dialog.style.alignment)) {
            // 居中
            // 计算基准位置
            base.x = Math.round(resolution.width / 2) + dialog.style.marginL - dialog.style.marginR;
            if (dialog.style.alignment === Style_1.Alignment.Top) {
                base.y = dialog.style.marginV;
            }
            if (dialog.style.alignment === Style_1.Alignment.Middle) {
                base.y = Math.round(resolution.height / 2);
            }
            if (dialog.style.alignment === Style_1.Alignment.Bottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            // 计算左端点
            let content = dialog.text.originalText;
            let contentWidth = textent_1.default.render(dialog.style.fontname, dialog.style.fontsize, content).width;
            let leftEnd = base.x - Math.round(contentWidth / 2);
            now.x = leftEnd;
            now.y = base.y;
            for (let textGroup of dialog.text.groups) {
                let text = textent_1.default.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                textGroup.effectGroup.push(new Position_1.default(now.x + Math.round(text.width / 2), now.y));
                now.x += text.width * (dialog.style.scaleX / 100) + dialog.style.spacing;
            }
        }
        else if ([Style_1.Alignment.RightBottom, Style_1.Alignment.RightMiddle, Style_1.Alignment.RightTop].includes(dialog.style.alignment)) {
            // 右对齐
            base.x = resolution.width - dialog.style.marginR;
            if (dialog.style.alignment === Style_1.Alignment.RightTop) {
                base.y = dialog.style.marginV;
            }
            else if (dialog.style.alignment === Style_1.Alignment.RightMiddle) {
                base.y += Math.round(resolution.height / 2);
            }
            else if (dialog.style.alignment === Style_1.Alignment.RightBottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            now = Object.assign({}, base);
            for (let textGroup of dialog.text.groups.reverse()) {
                let text = textent_1.default.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                textGroup.effectGroup.push(new Position_1.default(now.x, now.y));
                now.x -= text.width * (dialog.style.scaleX / 100) + dialog.style.spacing;
            }
        }
        else {
            throw new InvalidAlignmentError("对话行对齐方式不合法");
        }
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map