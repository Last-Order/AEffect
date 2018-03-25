import 'mocha'
import { expect } from 'chai'
import BlurEdge from "../src/core/Effects/BlurEdge";
import Blur from "../src/core/Effects/Blur";
import Bold from "../src/core/Effects/Bold";
import Border from "../src/core/Effects/Border";
import DrawingMode from "../src/core/Effects/DrawingMode";
import FontScale from "../src/core/Effects/FontScale";
import Pos from "../src/core/Effects/Position";

describe("正在测试特效标签类", () => {
    // !!请按字幕顺序添加测试!!
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
    describe("粗体 (\\bold)", () => {
        it("应用粗体", () => {
            let bold = new Bold();
            expect(bold.weight).to.be.eq(1);
        });
        it("标签解析", () => {
            let bold = Bold.parse("\\b1");
            expect(bold.weight).to.be.eq(1);
        });
    });
    describe("边框宽度 (\\bord)", () => {
        it("整数宽度", () => {
            let bord = new Border();
            expect(bord.size).to.be.eq(0);
        });
        it("小数宽度", () => {
            let bord = new Border(3.7);
            expect(bord.size).to.be.eq(3.7);
        });
        it("标签解析", () => {
            let bord = Border.parse("\\bord3");
            expect(bord.size).to.be.eq(3);
        })
    });

    describe("绘图模式标签 (\\p)", () => {
        it("开启绘图模式", () => {
            let p = new DrawingMode(true);
            expect(p.enable).to.be.eq(true);
        });
        it("关闭绘图模式", () => {
            let p = new DrawingMode(false);
            expect(p.enable).to.be.eq(false);
        });
        it("标签解析", () => {
            let p = DrawingMode.parse("\\p1");
            expect(p.enable).to.be.eq(true);
        })
    });

    describe("字体缩放 (\\fsc)", () =>{
        it("应用缩放", () => {
            let fsc = new FontScale(200);
            expect(fsc.scale).to.be.eq(200);
        });
        it("标签解析", () => {
            let fsc = FontScale.parse("\\fsc200");
            expect(fsc.scale).to.be.eq(200);
        })
    });

    describe("位置 (\\pos)", () => {
       it("应用位置标签", () => {
           let pos = new Pos(800, 800);
           expect(pos.x).to.be.eq(800);
           expect(pos.y).to.be.eq(800);
       });
       it("标签解析", () => {
           let pos = Pos.parse("\\pos(800, 800)");
           expect(pos.x).to.be.eq(800);
           expect(pos.y).to.be.eq(800);
       })
    });
});