import 'mocha'
import { expect } from 'chai'
import BlurEdge from "../src/core/Effects/BlurEdge";
import Blur from "../src/core/Effects/Blur";

describe("正在测试特效标签类", () => {
    // 请按字幕顺序添加测试
    describe("边缘模糊 (\\blur)", () => {
        it("正常模糊强度", () => {
            let blur = new Blur(1);
            expect(blur.strength).to.be.eq(1);
        });
        it("标签解析", () => {
            let blur = Blur.parse("\\blur1");
            expect(blur.strength).to.be.eq(1);
        })
    });
    describe("边框模糊 (\\be)", () => {
        it("正常模糊强度", () => {
            let be = new BlurEdge(1);
            expect(be.strength).to.be.eq(1);
        });
        it("小数模糊强度", () => {
            let be = new BlurEdge(1.5);
            expect(be.strength).to.be.eq(2);
        });
        it("标签解析", () => {
            let be = BlurEdge.parse("\\be2");
            expect(be.strength).to.be.eq(2);
        })
    });
});