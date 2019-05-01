export enum WarpStyle{
    SmartUp, // 智能换行，上行长
    WordBreak, // 只有行尾词处换行。
    NoBreak, // 不换行（只有\N可强制换行）
    SmartDown, // 智能换行，下行长
}

class MetaInfo{
    title: string = '';
    resolution: Resolution = {
        width: 1920,
        height: 1080,
    };
    warpStyle: WarpStyle = WarpStyle.SmartUp;
    originalScript: string = '';
    originalTranslation: string = '';
    originalEditing: string = '';
    originalTiming: string = '';
    synchPoint: string = '';
    scriptUpdatedBy: string = '';
}

export interface Resolution{
    width: number;
    height: number;
}

export default MetaInfo;
