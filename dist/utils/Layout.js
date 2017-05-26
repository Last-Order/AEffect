"use strict";
const Position_1 = require("../core/Effects/Position");
const textent_1 = require("textent");
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
        if ([1, 4, 7].includes(dialog.style.alignment)) {
            //左对齐
            base.x += dialog.style.marginL;
            if (dialog.style.alignment === 7) {
                base.y += dialog.style.marginV;
            }
            if (dialog.style.alignment === 4) {
                base.y += Math.round(resolution.height / 2);
            }
            if (dialog.style.alignment === 1) {
                base.y = resolution.height - dialog.style.marginV;
            }
            now = Object.assign({}, base);
            for (let textGroup of dialog.text.groups) {
                textGroup.effectGroup.push(new Position_1.default(now.x, now.y));
                now.x += textent_1.default.render(dialog.style.fontname, dialog.style.fontsize, textGroup.content).width * dialog.style.scaleX;
            }
        }
        else if ([2, 5, 8].includes(dialog.style.alignment)) {
        }
        else {
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
//# sourceMappingURL=Layout.js.map