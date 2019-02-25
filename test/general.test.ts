import 'mocha'
import { expect } from 'chai'

import AEffect from '../src/AEffect';
import Blur from '../src/core/Effects/Blur';
import Animation from '../src/core/Effects/Animation';
import Text from '../src/core/Entities/Text';
import textent from 'textent';
import DrawingMode from "../src/core/Effects/DrawingMode";
import TimePoint from '../src/definitions/Timepoint';

describe("正在进行综合测试", () => {
    it("特效应用综合测试", () => {
        let AE = new AEffect();
        try {
            AE.loadFromFile("D:\\Project\\字幕\\奈奈甲子园\\starting now.ass");

            // 选择所有 Default 样式的字幕行
            let allDialogs = AE.select({
                styleName: "Default"
            });
            // 按音节分割为行，新起始时间为原音节开始时间，新结束时间为原行结束时间
            allDialogs.splitIntoSyllables("SyllableStart", "LineEnd")
                .forEachDialog((dialog) => {
                    // 初始blur20 在音节时间内变为blur0
                    dialog.addEffect([
                        new Blur(20),
                        new Animation(dialog.lineStart, dialog.lineStart + dialog.syllableDuration, new Blur(0))
                    ]);
                });
            // 注释原字幕
            allDialogs.commentOriginalDialogs();
            // 输出字幕
            AE.build();
        }
        catch (e) {
            console.log(e);
        }
    });
});