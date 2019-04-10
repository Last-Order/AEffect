import 'mocha';

import AEffect from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Animation from '../src/core/Effects/Animation';
const path = require('path');

describe('正在进行综合测试', () => {
    it('特效应用综合测试', () => {
        const AE = new AEffect();
        try {
            AE.loadFromFile(path.resolve(__dirname, './test_ass/starting now.ass'));

            // 选择所有 Default 样式的字幕行
            const allDialogs = AE.select({
                styleName: 'Default',
            });
            // 按音节分割为行，新起始时间为原音节开始时间，新结束时间为原行结束时间
            allDialogs.splitIntoSyllables('SyllableStart', 'LineEnd')
                .forEach((dialog) => {
                    // 初始blur20 在音节时间内变为blur0
                    dialog.addEffect([
                        new Blur(20),
                        // tslint:disable-next-line:max-line-length
                        new Animation(dialog.lineStart, dialog.lineStart + dialog.syllableDuration, new Blur(0)),
                    ]);
                });
            // 注释原字幕
            allDialogs.commentOriginalDialogs();
            // 输出字幕
            AE.build();
        } catch (e) {
            console.log(e);
        }
    });
});
