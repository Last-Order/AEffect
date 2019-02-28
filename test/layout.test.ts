import 'mocha';
import { expect } from 'chai';

import Dialogue from '../src/core/Entities/Dialogue';
import Style, { Alignment } from '../src/core/Entities/Style';
import Time from '../src/core/Entities/Time';
import Text from '../src/core/Entities/Text';
import MetaInfo from '../src/core/Entities/MetaInfo';

describe('布局渲染测试', () => {
    const style = new Style({
        Name: 'test_style',
        Fontname: '微软雅黑',
        Fontsize: 77,
        ScaleX: 100,
        ScaleY: 100,
        MarginL: 10,
        MarginR: 10,
        MarginV: 10,
        Alignment: 1,
    });
    const styleMap = {
        test_style: style,
    };
    const properties = {
        layer: 1,
        start: Time.parse('0:00:00.00'),
        end: Time.parse('0:00:05.00'),
        styleName: 'test_style',
        name: '',
        marginL: 0,
        marginR: 0,
        marginV: 0,
        effect: '',
        text: new Text('{\\k0}一{\\k0}行{\\k0}字'),
        isComment: false,
    };
    const metaInfo = new MetaInfo();
    metaInfo.resolution.width = 1920;
    metaInfo.resolution.height = 1080;
    const dialog = new Dialogue(properties, styleMap, metaInfo);
    describe('左对齐布局测试', () => {
        it('左下对齐', () => {
            dialog.style.alignment = Alignment.LeftBottom;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(10);
            expect(effect.y).to.be.equal(1070);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(68);
            expect(effect.y).to.be.equal(1070);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(126);
            expect(effect.y).to.be.equal(1070);
        });
        it('左中对齐', () => {
            dialog.style.alignment = Alignment.LeftMiddle;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(10);
            expect(effect.y).to.be.equal(540);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(68);
            expect(effect.y).to.be.equal(540);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(126);
            expect(effect.y).to.be.equal(540);
        });
        it('左上对齐', () => {
            dialog.style.alignment = Alignment.LeftTop;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(10);
            expect(effect.y).to.be.equal(10);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(68);
            expect(effect.y).to.be.equal(10);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(126);
            expect(effect.y).to.be.equal(10);
        });
    });
    describe('右对齐布局测试', () => {
        it('右下对齐', () => {
            dialog.style.alignment = Alignment.RightBottom;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1794);
            expect(effect.y).to.be.equal(1070);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1852);
            expect(effect.y).to.be.equal(1070);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1910);
            expect(effect.y).to.be.equal(1070);
        });
        it('右中对齐', () => {
            dialog.style.alignment = Alignment.RightMiddle;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1794);
            expect(effect.y).to.be.equal(540);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1852);
            expect(effect.y).to.be.equal(540);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1910);
            expect(effect.y).to.be.equal(540);
        });
        it('右上对齐', () => {
            dialog.style.alignment = Alignment.RightTop;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1794);
            expect(effect.y).to.be.equal(10);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1852);
            expect(effect.y).to.be.equal(10);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1910);
            expect(effect.y).to.be.equal(10);
        });
    });
    describe('居中对齐布局测试', () => {
        it('上方居中', () => {
            dialog.style.alignment = Alignment.Top;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(902);
            expect(effect.y).to.be.equal(10);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(960);
            expect(effect.y).to.be.equal(10);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1018);
            expect(effect.y).to.be.equal(10);
        });
        it('下方居中', () => {
            dialog.style.alignment = Alignment.Bottom;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(902);
            expect(effect.y).to.be.equal(1070);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(960);
            expect(effect.y).to.be.equal(1070);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1018);
            expect(effect.y).to.be.equal(1070);
        });
        it('下方居中', () => {
            dialog.style.alignment = Alignment.Middle;
            dialog.parseSyllables();
            let effect = <Pos> dialog.text.groups[0].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(902);
            expect(effect.y).to.be.equal(540);
            effect = <Pos> dialog.text.groups[1].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(960);
            expect(effect.y).to.be.equal(540);
            effect = <Pos> dialog.text.groups[2].effectGroup[dialog.text.groups[0].effectGroup.length - 1];
            expect(effect.x).to.be.equal(1018);
            expect(effect.y).to.be.equal(540);
        });
    });
});
