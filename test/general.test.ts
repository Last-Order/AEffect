import 'mocha'
import { expect } from 'chai'

import AEffect from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Text from '../src/core/Entities/Text';
import textent from 'textent';

describe("综合测试", () => {
    it("过了这个感觉很强", () => {
        let AE = new AEffect();
        AE.loadFromFile("D:\\1.ass");
        AE.select().getDialogs().forEach(dialog => {
            dialog.splitIntoSyllables();
            for (let textGroup of dialog.text.groups){
                console.log(textGroup.content, textGroup.effectGroup[1]);
            }
        });
    });
    it("另外一个测试", () => {
        console.log(textent.render("微软雅黑", 24, "好的"));

        // let a = new Text("{\\pos(1,1)\\blur2}1111{\\k12}11{\\k12}");
        // for (let textGroup of a.groups){
        //     console.log(textGroup.effectGroup);
        // }
    });
});