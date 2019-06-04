import UnknownEffect from '../Effects/UnknownEffect';
import TextGroup from './TextGroup';
import Log from '../../utils/Log';

export class TextParseError extends Error {}

class Text{
    groups: TextGroup[] = [];

    /**
     * 获取不带特效标签的文本内容
     * @returns {string}
     */
    get originalText(): string {
        return this.groups.map(i => i.content).join('');
    }

    /**
     *
     * @param text Ass对话行内容
     * @param parseEffect 是否解析特效标签
     */
    constructor(text: string, parseEffect: boolean = true) {
        const matchResult = text.match(/({.*?})/ig);
        if (matchResult !== null && parseEffect) {
            // 原文本含有特效标签
            let offset = 0;
            let clonedText = text;
            const matchMap = [];
            const effectTags = [];
            const plainTexts = [];
            for (const match of matchResult) {
                const start = clonedText.indexOf(match);
                effectTags.push(match);
                matchMap.push([start + offset, match.length]);
                clonedText = clonedText.slice(start + match.length); // 从原文中删除已经匹配的标签，以免相同标签定位到同一处
                offset += start + match.length;
            }
            matchMap.forEach((match, index, matchMap) => {
                const plainText = text.slice(
                    // tslint:disable-next-line:max-line-length
                    match[0] + match[1], matchMap[index + 1] && matchMap[index + 1][0] || text.length,
                );
                plainTexts.push(plainText);
            });

            for (const i in effectTags) {
                const effects =
                    effectTags[i].slice(1, effectTags[i].length - 1)
                                 .split('\\')
                                 .filter(str => str !== '');
                const newTextGroup = new TextGroup(plainTexts[i]);
                for (const effect of effects) {
                    try {
                        newTextGroup.effectGroup.push(UnknownEffect.parse(`\\${effect}`));
                    } catch (e) {
                        Log.warning('特效标签语法错误: ');
                        Log.warning(text);
                        Log.warning(
                            // tslint:disable-next-line
                            new Array(text.indexOf(effect)).fill(' ').join('') + new Array(effect.length).fill('^').join('')
                        );
                        throw new TextParseError(`特效标签解析失败: ${e.message}`);
                    }
                }
                this.groups.push(newTextGroup);
            }
        } else {
            // 无特效标签
            this.groups.push(new TextGroup(text));
        }
    }

    /**
     * 生成带有特效标签的文本
     * @returns {string}
     */
    toString() {
        return this.groups.map(i => i.toString()).join('');
    }

    /**
     * 复制一个 Text
     * @returns {Text}
     */
    clone() {
        return new Text(this.toString());
    }
}

export default Text;
