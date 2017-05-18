export declare enum WarpStyle {
    SmartUp = 0,
    WordBreak = 1,
    NoBreak = 2,
    SmartDown = 3,
}
declare class MetaInfo {
    title: string;
    resolution: IRectSize;
    warpStyle: WarpStyle;
    originalScript: string;
    originalTranslation: string;
    originalEditing: string;
    originalTiming: string;
    synchPoint: string;
    scriptUpdatedBy: string;
}
export interface IRectSize {
    width: number;
    height: number;
}
export default MetaInfo;
