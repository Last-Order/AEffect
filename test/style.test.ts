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
    describe("HTML代码解析", ()=>{
        it("正常测试", ()=>{
            let color = Color.HTML("#C0FF00");
            expect([color.red, color.green, color.blue]).to.be.deep.equal([192, 255, 0]);
        });
    });
    describe("ASS代码解析", ()=>{
        it("正常测试", ()=>{
            let color = Color.ASS("&H004D4D9A");
            expect([color.red, color.green, color.blue, color.alpha]).to.be.deep.equal([154, 77, 77, 0]);
        });
        it("短代码", ()=>{
            let color = Color.ShortASS("&HD8DB54");
            expect([color.red, color.green, color.blue, color.alpha]).to.be.deep.equal([84, 219, 216, 0]);
        });
    });
    describe("生成ASS代码", ()=>{
        it("普通ass代码", ()=>{
            let color = new Color(51, 66, 109, 0);
            expect(color.toString()).to.be.equal("&H006D4233");
        });
        it("短ass代码", ()=>{
            let color = new Color(51, 66, 109, 0);
            expect(color.toShortString()).to.be.equal("&H6D4233");
        });
    });
});