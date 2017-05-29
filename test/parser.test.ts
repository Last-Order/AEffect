import 'mocha'
import {expect} from 'chai'

import AEffect from '../src/AEffect';
import * as AssParser from '../src/core/AssParser';

let AE = new AEffect();

describe("正在测试 Ass 解析", () => {
    describe("载入 Ass 部分测试", () => {
        it("正常文件",() => {
            AE.loadFromFile("./test/test_ass/headtest.ass");
        });

        it("不存在的文件", ()=>{
            expect(() => {
                AE.loadFromFile("./test/test_ass/headxxxtest.ass")
            }).to.throw(Error);
        });

        it("载入字符串", () => {
            //AE.loadFromText("");
        })
    });

    describe("解析 Ass 部分测试", () =>{
        it("正常的 Ass 文件", () => {
            AE.loadFromFile("./test/test_ass/headtest.ass");
            expect(AE.dialogs.length).to.be.equal(3);
            expect(Object.keys(AE.styles).length).to.be.equal(2);
        });
        it("缺少 Events 块的 Ass 文件", () => {
            expect(() => {
                AE.loadFromFile("./test/test_ass/ass_without_event_block.ass")
            }).to.throw(AssParser.MissingEventBlockError);
        });
        it("缺少 Style 格式定义的 Ass 文件", () => {
            expect(() => {
                AE.loadFromFile("./test/test_ass/ass_without_style_format_definition.ass");
            }).to.throw(AssParser.MissingStyleDefinitionError);
        });
        it("缺少 Dialog 格式定义的 Ass 文件", () => {
            expect(() => {
                AE.loadFromFile("./test/test_ass/ass_without_dialog_format_definition.ass");
            }).to.throw(AssParser.MissingDialogFormatDefinitionError);
        });
        it("Style 格式定义与实际不符的 Ass 文件", () => {
            expect(() => {
                AE.loadFromFile("./test/test_ass/style_format_definition_mismatch.ass");
            }).to.throw(AssParser.InvalidStyleDefinitionError);
        })
    })
});