import Dialogue from '../core/Entities/Dialogue'
import {Alignment} from '../core/Entities/Style';
import Position from '../core/Effects/Position'

import textent from 'textent';

class Layout{
    /**
     * 为所有音节生成位置
     * @param dialog
     */
    static syllabify(dialog: Dialogue){
        let resolution = dialog.metaInfo.resolution;
        let base = {
            x: 0,
            y: 0
        }; // 基准位置
        let now = {
            x: 0,
            y: 0
        };
        if ([Alignment.LeftBottom, Alignment.LeftMiddle, Alignment.LeftTop].includes(dialog.style.alignment)){
            //左对齐
            base.x += dialog.style.marginL;
            if (dialog.style.alignment === 7){
                base.y += dialog.style.marginV;
            }
            if (dialog.style.alignment === 4){
                base.y += Math.round(resolution.height / 2);
            }
            if (dialog.style.alignment === 1){
                base.y = resolution.height - dialog.style.marginV;
            }
            now = {... base};
            for (let textGroup of dialog.text.groups){
                textGroup.effectGroup.push(
                    new Position(now.x, now.y)
                );
                let text = textent.render(dialog.style.fontname, +dialog.style.fontsize, textGroup.content);
                console.log(text);
                now.x += text.width * ( dialog.style.scaleX / 100);
            }
        }
        else if ([2, 5, 8].includes(dialog.style.alignment)){
            // 居中
        }
        else{
            // 右对齐
        }
    }
}

export default Layout;