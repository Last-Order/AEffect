import Dialogue from './Entities/Dialogue'
import {Alignment} from './Entities/Style';
import Position from './Effects/Position'

import textent from 'textent';

export class InvalidAlignmentError extends Error {
}
;

class Layout {
    /**
     * 为所有音节生成位置
     * @param dialog
     */
    static syllabify(dialog: Dialogue) {
        let resolution = dialog.metaInfo.resolution;
        let base = {
            x: 0,
            y: 0
        }; // 基准位置
        let now = {
            x: 0,
            y: 0
        };
        if ([Alignment.LeftBottom, Alignment.LeftMiddle, Alignment.LeftTop].includes(dialog.style.alignment)) {
            //左对齐
            base.x = dialog.style.marginL;
            if (dialog.style.alignment === Alignment.LeftTop) {
                base.y += dialog.style.marginV;
            }
            if (dialog.style.alignment === Alignment.LeftMiddle) {
                base.y += Math.round(resolution.height / 2);
            }
            if (dialog.style.alignment === Alignment.LeftBottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            now = {...base};
            for (let textGroup of dialog.text.groups) {
                let text = textent.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                textGroup.effectGroup.push(
                    new Position(now.x, now.y)
                );
                now.x += text.width * ((dialog.style.scaleX || 100) / 100) + (dialog.style.spacing || 0);
            }
        }
        else if ([Alignment.Bottom, Alignment.Middle, Alignment.Top].includes(dialog.style.alignment)) {
            // 居中
            // 计算基准位置
            base.x = Math.round(resolution.width / 2) + dialog.style.marginL - dialog.style.marginR;
            if (dialog.style.alignment === Alignment.Top) {
                base.y = dialog.style.marginV;
            }
            if (dialog.style.alignment === Alignment.Middle) {
                base.y = Math.round(resolution.height / 2);
            }
            if (dialog.style.alignment === Alignment.Bottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            // 计算左端点
            let content = dialog.text.originalText;
            let contentWidth = textent.render(dialog.style.fontname, dialog.style.fontsize, content).width;
            let leftEnd = base.x - Math.round(contentWidth / 2);
            now.x = leftEnd;
            now.y = base.y;
            for (let textGroup of dialog.text.groups) {
                let text = textent.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                textGroup.effectGroup.push(
                    new Position(now.x + Math.round(text.width / 2), now.y)
                );
                now.x += text.width * ( (dialog.style.scaleX || 100) / 100) + (dialog.style.spacing || 0);
            }
        }
        else if ([Alignment.RightBottom, Alignment.RightMiddle, Alignment.RightTop].includes(dialog.style.alignment)) {
            // 右对齐
            base.x = resolution.width - dialog.style.marginR;
            if (dialog.style.alignment === Alignment.RightTop) {
                base.y = dialog.style.marginV;
            }
            else if (dialog.style.alignment === Alignment.RightMiddle) {
                base.y += Math.round(resolution.height / 2);
            }
            else if (dialog.style.alignment === Alignment.RightBottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            now = {...base};
            for (let textGroup of dialog.text.groups.reverse()) {
                let text = textent.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                textGroup.effectGroup.push(
                    new Position(now.x, now.y)
                );
                now.x -= text.width * ( (dialog.style.scaleX || 100) / 100) + (dialog.style.spacing || 0);
            }
            dialog.text.groups.reverse();
        }
        else {
            throw new InvalidAlignmentError("对话行对齐方式不合法");
        }
    }
}

export default Layout;