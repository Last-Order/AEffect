import 'mocha'
import { expect } from 'chai'

import Time from '../src/core/Entities/Time'

describe("正在测试时间类", () => {
    describe("从字符串读取一个时间", ()=>{
        it("正常测试", ()=>{
            let t = Time.parse("0:12:34.56");
            expect(t.second).to.be.equal(754.56);
        });
    });
    describe("从时间生成一个字符串", ()=>{
        it("正常测试", ()=>{
            let t = new Time(11111.11);
            expect(t.toString()).to.be.equal("3:05:11.11")
        });
        it("带有多余小数", ()=>{
            let t = new Time(11111.11058012);
            expect(t.toString()).to.be.equal("3:05:11.11")
        });
        it("秒位需要补0", ()=>{
            let t = new Time(11105.11058012);
            expect(t.toString()).to.be.equal("3:05:05.11")
        });
    });
});