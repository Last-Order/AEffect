import Dialogue from './core/Entities/Dialogue';
interface AEffect {
    styles: object;
    dialogs: Dialogue[];
    metaInfo: {
        resolution: {
            width: number;
            height: number;
        };
    };
    loadFromFile(path: string, encoding?: string): any;
    loadFromText(text: string): any;
}
declare class AEffect implements AEffect {
    constructor();
    build(): string;
    /**
     * 字幕选择器
     */
    select(condition?: {}): Dialogue[];
}
export default AEffect;
