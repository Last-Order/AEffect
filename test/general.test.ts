import 'mocha'
import { expect } from 'chai'

import AEffect from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Animation from '../src/core/Effects/Animation';
import {TimePoint} from '../src/core/Selector';
import Text from '../src/core/Entities/Text';
import textent from 'textent';

describe("正在进行综合测试", () => {
    it("过了这个感觉很强", () => {
        let AE = new AEffect();
        try{
            AE.loadFromFile("D:\\Project\\字幕\\奈奈甲子园\\starting now.ass");
            let allDialogs = AE.select();
            allDialogs.splitIntoSyllables(TimePoint.SyllableStart, TimePoint.LineEnd).forEachDialog((dialog) => {
                dialog.addEffect([
                    new Blur(20),
                    new Animation(dialog.lineStart, dialog.lineStart + dialog.duration, new Blur(0))
                ]);
            });
            allDialogs.comment();
            console.log(AE.build())
        }
        catch(e){

        }
    });
    it("另外一个测试", () => {
        console.log(textent.render("Noto Sans Mono CJK JP Regular", 55, "だけ"));
        console.log(textent.render("Noto Sans Mono CJK JP Regular", 55, "だ"));
        console.log(textent.render("Noto Sans Mono CJK JP Regular", 55, "け"));
    });
});