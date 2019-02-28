import 'mocha';
import { expect } from 'chai';

import Time, { TimeParseError } from '../src/core/Entities/Time';

describe('正在测试时间类', () => {
    describe('从字符串读取一个时间', () => {
        it('正常测试', () => {
            const t = Time.parse('0:12:34.56');
            expect(t.second).to.be.equal(754.56);
            expect(t.valueOf()).to.be.equal(754.56);
        });
        it('复制', () => {
            const t = new Time(11105.11058012);
            expect(t.clone().toString()).to.be.equal('3:05:05.11');
        });
        it('算数加', () => {
            const t = Time.parse('0:12:34.56');
            expect(t.add(new Time(2)).second).to.be.equal(756.56);
        });
        it('算数减', () => {
            const t = Time.parse('0:12:34.56');
            expect(t.sub(new Time(2)).second).to.be.equal(752.56);
        });
    });
    describe('从时间生成一个字符串', () => {
        it('正常测试', () => {
            const t = new Time(11111.11);
            expect(t.toString()).to.be.equal('3:05:11.11');
        });
        it('带有多余小数', () => {
            const t = new Time(11111.11058012);
            expect(t.toString()).to.be.equal('3:05:11.11');
        });
        it('秒位需要补0', () => {
            const t = new Time(11105.11058012);
            expect(t.toString()).to.be.equal('3:05:05.11');
        });
        it('格式错误', () => {
            expect(() => {
                Time.parse('11:11:11:11');
            }).to.throw(TimeParseError);
        });
    });
});

import Dialogue from '../src/core/Entities/Dialogue';
import Text from '../src/core/Entities/Text';
import Style from '../src/core/Entities/Style';
import MetaInfo from '../src/core/Entities/MetaInfo';
import K from '../src/core/Effects/K';

describe('正在测试 MetaInfo 类', () => {
   const metaInfo = new MetaInfo();
});

describe('正在测试 Style 类', () => {
    const style = new Style({

    });
});

describe('正在测试 Text 类', () => {
    it('不带特效标签的文本', () => {
        const text = new Text('Hello World!');
        expect(text.toString()).to.be.eq('Hello World!');
    });
    it('带特效标签的文本', () => {
        const text = new Text('{\\k123}Hello World!');
        expect(text.originalText).to.be.eq('Hello World!');
        expect(text.groups[0].content).to.be.eq('Hello World!');
        expect(text.groups[0].effectGroup[0].name).to.be.eq('k');
        expect((<K>text.groups[0].effectGroup[0]).duration).to.be.eq(1230);
    });
});

describe('正在测试对话行类', () => {
    const dialog = new Dialogue({
        layer: 0,
        start: Time.parse('00:00:00.00'),
        end: Time.parse('00:00:05.00'),
        styleName: 'Default',
        name: '',
        marginL: 0,
        marginR: 0,
        marginV: 0,
        effect: '',
        text: new Text('23232'),
        isComment: false,
    },                          {
        Default: new Style(),
    },                          new MetaInfo());

    it('测试 Dialogue 时间相关计算属性', () => {
        expect(dialog.duration).to.equal(5000);
        expect(dialog.lineStart).to.equal(0);
        expect(dialog.lineEnd).to.equal(5000);
        expect(dialog.middleTime).to.equal(2500);
    });
});
