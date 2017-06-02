import 'mocha'
import { expect } from 'chai'

import AEffect from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Text from '../src/core/Entities/Text';
import textent from 'textent';

describe("正在进行综合测试", () => {
    it("过了这个感觉很强", () => {
        let AE = new AEffect();
        AE.loadFromFile("./test/test_ass/headtest.ass");
        AE.select().splitIntoSyllables();
        AE.dialogs.forEach(dialog => {
            console.log(dialog.start, dialog.end, dialog.text);
        })
    });
    it("另外一个测试", () => {
        let a = new Text("{\\pos(1,1)\\blur2}1111{\\k12}11{\\k12}");
        let blur = new Blur(2);
        blur.handler(a);
        for (let textGroup of a.groups){
            console.log(textGroup);
        }
    });
});