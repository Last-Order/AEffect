import 'mocha';
import { expect } from 'chai';
import BlurEdge from '../src/core/Effects/BlurEdge';
import Blur from '../src/core/Effects/Blur';
import Bold from '../src/core/Effects/Bold';
import Border from '../src/core/Effects/Border';
import DrawingMode from '../src/core/Effects/DrawingMode';
import FontScale from '../src/core/Effects/FontScale';
import K from '../src/core/Effects/K';
import Move, { StartWithoutEndError } from '../src/core/Effects/Move';
import { default as Pos } from '../src/core/Effects/Position';
import { Fade, FontRotateX, FontRotateY, FontRotateZ } from '../src/effects';

describe('正在测试特效标签类', () => {
    // !!请按字母序添加测试!!
    describe('边缘模糊 (\\blur)', () => {
        it('正常模糊强度', () => {
            const blur = new Blur(1);
            expect(blur.strength).to.be.eq(1);
        });
        it('标签解析', () => {
            const blur = Blur.parse('\\blur1');
            expect(blur.strength).to.be.eq(1);
        });
    });
    describe('边框模糊 (\\be)', () => {
        it('正常模糊强度', () => {
            const be = new BlurEdge(1);
            expect(be.strength).to.be.eq(1);
        });
        it('小数模糊强度', () => {
            const be = new BlurEdge(1.5);
            expect(be.strength).to.be.eq(2);
        });
        it('标签解析', () => {
            const be = BlurEdge.parse('\\be2');
            expect(be.strength).to.be.eq(2);
        });
    });
    describe('粗体 (\\bold)', () => {
        it('应用粗体', () => {
            const bold = new Bold();
            expect(bold.weight).to.be.eq(1);
        });
        it('标签解析', () => {
            const bold = Bold.parse('\\b1');
            expect(bold.weight).to.be.eq(1);
        });
    });
    describe('边框宽度 (\\bord)', () => {
        it('整数宽度', () => {
            const bord = new Border();
            expect(bord.size).to.be.eq(0);
        });
        it('小数宽度', () => {
            const bord = new Border(3.7);
            expect(bord.size).to.be.eq(3.7);
        });
        it('标签解析', () => {
            const bord = Border.parse('\\bord3');
            expect(bord.size).to.be.eq(3);
        });
    });

    describe('绘图模式标签 (\\p)', () => {
        it('开启绘图模式', () => {
            const p = new DrawingMode(true);
            expect(p.enable).to.be.eq(true);
        });
        it('关闭绘图模式', () => {
            const p = new DrawingMode(false);
            expect(p.enable).to.be.eq(false);
        });
        it('标签解析', () => {
            const p = DrawingMode.parse('\\p1');
            expect(p.enable).to.be.eq(true);
        });
    });

    describe('淡入淡出 (\\fad)', () => {
        it('应用淡入淡出', () => {
            const fad1 = new Fade(200, 200);
            expect(fad1.fadeIn).to.be.eq(200);
            expect(fad1.fadeOut).to.be.eq(200);
            const fad2 = new Fade(200);
            expect(fad2.fadeIn).to.be.eq(200);
            expect(fad2.fadeOut).to.be.eq(0);
        });
        it('标签解析', () => {
            const fad = Fade.parse('\\fad(200, 200)');
            expect(fad.fadeIn).to.be.eq(200);
            expect(fad.fadeOut).to.be.eq(200);
        });
    });

    describe('绕X轴旋转 (\\frx)', () => {
        it('应用绕X轴旋转', () => {
            const frx = new FontRotateX(200);
            expect(frx.amount).to.be.eq(200);
        });
        it('标签解析', () => {
            const frx = FontRotateX.parse('\\frx200');
            expect(frx.amount).to.be.eq(200);
        });
    });

    describe('绕Y轴旋转 (\\fry)', () => {
        it('应用绕Y轴旋转', () => {
            const fry = new FontRotateY(200);
            expect(fry.amount).to.be.eq(200);
        });
        it('标签解析', () => {
            const fry = FontRotateY.parse('\\fry200');
            expect(fry.amount).to.be.eq(200);
        });
    });

    describe('绕Z轴旋转 (\\frz)', () => {
        it('应用绕Z轴旋转', () => {
            const frz = new FontRotateZ(200);
            expect(frz.amount).to.be.eq(200);
        });
        it('标签解析', () => {
            const frz = FontRotateZ.parse('\\frz200');
            expect(frz.amount).to.be.eq(200);
            const frz2 = FontRotateZ.parse('\\fr200');
            expect(frz2.amount).to.be.eq(200);
        });
    });
    describe('字体缩放 (\\fsc)', () => {
        it('应用缩放', () => {
            const fsc = new FontScale(200);
            expect(fsc.scale).to.be.eq(200);
        });
        it('标签解析', () => {
            const fsc = FontScale.parse('\\fsc200');
            expect(fsc.scale).to.be.eq(200);
        });
    });

    describe('卡拉OK时间 (\\k)', () => {
        it('应用卡拉OK时间', () => {
            const k = new K(200);
            expect(k.duration).to.be.eq(200);
            expect(k.toString()).to.be.eq('\\k20');
        });
        it('标签解析', () => {
            const k = K.parse('\\k100');
            expect(k.duration).to.be.eq(1000);
        });
    });

    describe('移动 (\\move)', () => {
        it('应用移动', () => {
            const move1 = new Move(200, 200, 400, 400);
            expect(move1.startX).to.be.eq(200);
            expect(move1.startY).to.be.eq(200);
            expect(move1.endX).to.be.eq(400);
            expect(move1.endY).to.be.eq(400);
            expect(() => {
                new Move(200, 200, 400, 400, 100);
            }).to.throw(StartWithoutEndError);
            const move2 = new Move(200, 200, 400, 400, 100, 300);
            expect(move2.startX).to.be.eq(200);
            expect(move2.startY).to.be.eq(200);
            expect(move2.endX).to.be.eq(400);
            expect(move2.endY).to.be.eq(400);
            expect(move2.start).to.be.eq(100);
            expect(move2.end).to.be.eq(300);
        });
        it('标签解析', () => {
            const move1 = Move.parse('\\move(200, 200, 400, 400)');
            expect(move1.startX).to.be.eq(200);
            expect(move1.startY).to.be.eq(200);
            expect(move1.endX).to.be.eq(400);
            expect(move1.endY).to.be.eq(400);
            const move2 = Move.parse('\\move(200, 200, 400, 400, 100, 300)');
            expect(move2.startX).to.be.eq(200);
            expect(move2.startY).to.be.eq(200);
            expect(move2.endX).to.be.eq(400);
            expect(move2.endY).to.be.eq(400);
            expect(move2.start).to.be.eq(100);
            expect(move2.end).to.be.eq(300);
        });
    });

    describe('位置 (\\pos)', () => {
       it('应用位置标签', () => {
           const pos = new Pos(800, 800);
           expect(pos.x).to.be.eq(800);
           expect(pos.y).to.be.eq(800);
       });
       it('标签解析', () => {
           const pos = Pos.parse('\\pos(800, 800)');
           expect(pos.x).to.be.eq(800);
           expect(pos.y).to.be.eq(800);
       });
    });
});
