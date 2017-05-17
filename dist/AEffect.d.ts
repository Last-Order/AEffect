import Dialogue from './core/Entities/Dialogue';
interface AEffect {
    styles: object;
    dialogs: Dialogue[];
    metaInfo: object;
    loadFromFile(path: string, encoding?: string): any;
    loadFromText(text: string): any;
}
declare class AEffect implements AEffect {
    constructor();
    build(): string;
    /**
     * 字幕选择器
     */
    select(condition?: {}): false | Dialogue[];
}
export default AEffect;
