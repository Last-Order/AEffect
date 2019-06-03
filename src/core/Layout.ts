import Dialogue from './Entities/Dialogue';
import { Alignment } from './Entities/Style';
import Position from './Effects/Position';

import textent from 'textent';

export class InvalidAlignmentError extends Error { }

class Layout {
    /**
     * 为所有音节生成位置
     * @param dialog
     */
    static syllabify(dialog: Dialogue) {
        const resolution = dialog.metaInfo.resolution;
        const base = {
            x: 0,
            y: 0,
        }; // 基准位置
        let now = {
            x: 0,
            y: 0,
        };
        // tslint:disable-next-line:max-line-length
        if ([Alignment.LeftBottom, Alignment.LeftMiddle, Alignment.LeftTop].includes(dialog.style.alignment)) {
            // 左对齐
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
            now = { ...base };
            for (const textGroup of dialog.text.groups) {
                const text = textent.render(
                    dialog.style.fontname, +dialog.style.fontsize, textGroup.content,
                );
                textGroup.effectGroup.push(
                    new Position(now.x, now.y),
                );
                textGroup.x = now.x;
                textGroup.y = now.y;
                textGroup.width = text.width;
                textGroup.height = text.height;
                textGroup.left = now.x;
                textGroup.right = now.x + text.width;
                if (dialog.style.alignment === Alignment.LeftTop) {
                    textGroup.top = textGroup.y;
                    textGroup.buttom = textGroup.y + text.height;
                }
                if (dialog.style.alignment === Alignment.LeftMiddle) {
                    textGroup.top = textGroup.y - Math.round(text.height / 2);
                    textGroup.buttom = textGroup.y + Math.round(text.height / 2);
                }
                if (dialog.style.alignment === Alignment.LeftBottom) {
                    textGroup.top = textGroup.y - text.height;
                    textGroup.buttom = textGroup.y;
                }
                dialog.width = text.width;
                dialog.height = text.height;
                now.x +=
                    text.width *
                    ((dialog.style.scaleX || 100) / 100) +
                    (dialog.style.spacing * (textGroup.content.length - 1) || 0);
            }
            dialog.left = base.x; // 行左边缘
            dialog.right = now.x; // 行右边缘
        // tslint:disable-next-line:max-line-length
        } else if ([Alignment.Bottom, Alignment.Middle, Alignment.Top].includes(dialog.style.alignment)) {
            // 居中
            // 计算基准位置
            base.x = Math.round(resolution.width / 2) + dialog.style.marginL - dialog.style.marginR;
            if (dialog.style.alignment === Alignment.Top) {
                base.y = dialog.style.marginV;
            }
            if (dialog.style.alignment === Alignment.Middle) {
                base.y = Math.round(resolution.height / 2); // 垂直偏移对该情况无效 勿加
            }
            if (dialog.style.alignment === Alignment.Bottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            // 计算左端点
            const content = dialog.text.originalText;
            const contentWidth = textent.render(
                dialog.style.fontname, dialog.style.fontsize, content,
            ).width;
            const leftEnd = base.x - Math.round(contentWidth / 2);
            now.x = leftEnd;
            now.y = base.y;
            for (const textGroup of dialog.text.groups) {
                const text = textent.render(
                    dialog.style.fontname, dialog.style.fontsize, textGroup.content,
                );
                textGroup.effectGroup.push(
                    new Position(now.x + Math.round(text.width / 2), now.y),
                );
                textGroup.x = now.x + Math.round(text.width / 2);
                textGroup.y = now.y;
                textGroup.width = text.width;
                textGroup.height = text.height;
                textGroup.left = now.x;
                textGroup.right = now.x + text.width;
                if (dialog.style.alignment === Alignment.Top) {
                    textGroup.top = textGroup.y;
                    textGroup.buttom = textGroup.y + text.height;
                }
                if (dialog.style.alignment === Alignment.Middle) {
                    textGroup.top = textGroup.y - Math.round(text.height / 2);
                    textGroup.buttom = textGroup.y + Math.round(text.height / 2);
                }
                if (dialog.style.alignment === Alignment.Bottom) {
                    textGroup.top = textGroup.y - text.height;
                    textGroup.buttom = textGroup.y;
                }
                dialog.width = text.width;
                dialog.height = text.height;
                now.x +=
                    text.width *
                    ((dialog.style.scaleX || 100) / 100) +
                    (dialog.style.spacing * (textGroup.content.length - 1) || 0);
            }
            dialog.left = leftEnd;
            dialog.right = leftEnd + contentWidth;
        // tslint:disable-next-line:max-line-length
        } else if ([Alignment.RightBottom, Alignment.RightMiddle, Alignment.RightTop].includes(dialog.style.alignment)) {
            // 右对齐
            base.x = resolution.width - dialog.style.marginR;
            if (dialog.style.alignment === Alignment.RightTop) {
                base.y = dialog.style.marginV;
            } else if (dialog.style.alignment === Alignment.RightMiddle) {
                base.y += Math.round(resolution.height / 2);
            } else if (dialog.style.alignment === Alignment.RightBottom) {
                base.y = resolution.height - dialog.style.marginV;
            }
            now = { ...base };
            for (const textGroup of dialog.text.groups.reverse()) {
                const text = textent.render(
                    dialog.style.fontname, +dialog.style.fontsize, textGroup.content,
                );
                textGroup.effectGroup.push(
                    new Position(now.x, now.y),
                );
                textGroup.x = now.x;
                textGroup.y = now.y;
                textGroup.width = text.width;
                textGroup.height = text.height;
                textGroup.left = textGroup.x - text.width;
                textGroup.right = textGroup.x;
                if (dialog.style.alignment === Alignment.RightBottom) {
                    textGroup.top = textGroup.y - text.height;
                    textGroup.buttom = textGroup.y;
                }
                if (dialog.style.alignment === Alignment.RightMiddle) {
                    textGroup.top = textGroup.y - Math.round(text.height / 2);
                    textGroup.buttom = textGroup.y + Math.round(text.height / 2);
                }
                if (dialog.style.alignment === Alignment.RightTop) {
                    textGroup.top = textGroup.y;
                    textGroup.buttom = textGroup.y + text.height;
                }
                dialog.width = text.width;
                dialog.height = text.height;
                now.x -=
                    text.width *
                    ((dialog.style.scaleX || 100) / 100) +
                    (dialog.style.spacing * (textGroup.content.length - 1) || 0);
            }
            dialog.text.groups.reverse();
            dialog.left = now.x; // 行左边缘
            dialog.right = base.x; // 行右边缘
        } else {
            throw new InvalidAlignmentError('对话行对齐方式不合法');
        }
    }
}

export default Layout;
