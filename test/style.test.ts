import 'mocha'
import { expect } from 'chai'

import Color from '../src/core/Entities/Color'

describe("正在测试颜色类", () => {
    describe("RGB解析", ()=>{
        it("正常测试", ()=>{
            let color = Color.RGB(164, 234, 193);
            expect(color.red).to.be.equal(164);
            expect(color.blue).to.be.equal(193);
            expect(color.green).to.be.equal(234);
        });
        it("超过255", ()=>{
            let color = Color.RGB(1033, 44, 556);
            expect(color.red).to.be.equal(255);
            expect(color.blue).to.be.equal(255);
            expect(color.green).to.be.equal(44);
        });
        it("小于0", ()=>{
            let color = Color.RGB(0, 0, -500);
            expect(color.red).to.be.equal(0);
            expect(color.blue).to.be.equal(0);
            expect(color.green).to.be.equal(0);
        });
    });
});