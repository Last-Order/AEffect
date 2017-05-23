import 'mocha'
import { expect } from 'chai'

import AEffect from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Text from '../src/core/Entities/Text';

describe("综合测试", () => {
    it("过了这个感觉很强", () => {
        let AE = new AEffect();
        AE.loadFromFile("./test/test_ass/headtest.ass");
        AE.select().addEffect([
            new Blur(2, 1), new Blur(3)
        ]);
        console.log(AE.build());
    });
    it("另外一个测试", () => {
        let a = new Text("{\\pos(1,1)\\blur2}1111{\\k12}11{\\k12}");
    });
});