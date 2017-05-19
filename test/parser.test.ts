import 'mocha'
import {expect} from 'chai'

import AEffect from '../src/AEffect';

let AE = new AEffect();

describe("正在测试 Ass 解析", () => {
    describe("载入 Ass 部分测试", () => {
        it("正常文件",(done) => {
            AE.loadFromFile("./test/test_ass/headtest.ass").then(() => {
                done()
            }).catch(e => {
                done(e);
            })
        });

        it("不存在的文件", (done)=>{
            AE.loadFromFile("./test/test_ass/headxxxtest.ass").then(() => {
                done(new Error());
            }).catch(() => {
                done()
            })
        });

        it("载入字符串", () => {
            AE.loadFromText("");
        })
    });

    describe("解析 Ass 部分测试", () =>{
        it("正常的 Ass 文件", (done) => {
            AE.loadFromFile("./test/test_ass/headtest.ass").then(() => {
                expect(AE.dialogs.length).to.be.equal(2);
                expect(Object.keys(AE.styles).length).to.be.equal(1);
                done();
            }).catch(e => {
                done(e);
            })
        })
    })
});