import 'mocha'
import { expect } from 'chai'

import AEffect, {TimePoint} from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Animation from '../src/core/Effects/Animation';
import Text from '../src/core/Entities/Text';
import textent from 'textent';
import DrawingMode from "../src/core/Effects/DrawingMode";

describe("正在进行综合测试", () => {
    it("过了这个感觉很强", () => {
        let AE = new AEffect();
        try{
            AE.loadFromFile("D:\\Project\\字幕\\奈奈甲子园\\starting now.ass");
            let allDialogs = AE.select();
            allDialogs.splitIntoSyllables(TimePoint.SyllableStart, TimePoint.LineEnd, 0, 0, {
                text: "m 1 0",
                drawingMode: true
            }).forEachDialog((dialog) => {
                dialog.addEffect([
                    new Blur(20),
                    new Animation(dialog.lineStart, dialog.lineStart + dialog.syllableDuration, new Blur(0))
                ]);
            });
            allDialogs.commentOriginalDialogs();
            //console.log(AE.build())
        }
        catch(e){
            console.log(e);
        }
    });
    it("另外一个测试", () => {
        //console.log(textent.render("Noto Sans Mono CJK JP Regular", 55, "だけ"));
        //console.log(textent.render("Noto Sans Mono CJK JP Regular", 55, "だ"));
        //console.log(textent.render("Noto Sans Mono CJK JP Regular", 55, "け"));
    });
});