import Dialogue from './core/Entities/Dialogue';
import Style from './core/Entities/Style';
import MetaInfo from './core/Entities/MetaInfo';
declare class AEffect {
    styles: Map<string, Style>;
    dialogs: Dialogue[];
    metaInfo: MetaInfo;
    constructor();
    /**
     * 从文件读取字幕
     * @param path 路径
     * @param encoding 编码
     */
    loadFromFile(path: any, encoding?: string): Promise<{}>;
    /**
     * 从文本读取字幕
     * @param text 文本
     */
    loadFromText(text: any): this;
    build(): string;
    /**
     * 字幕选择器
     */
    select(condition?: {}): Dialogue[];
}
export default AEffect;
