"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WarpStyle;
(function (WarpStyle) {
    WarpStyle[WarpStyle["SmartUp"] = 0] = "SmartUp";
    WarpStyle[WarpStyle["WordBreak"] = 1] = "WordBreak";
    WarpStyle[WarpStyle["NoBreak"] = 2] = "NoBreak";
    WarpStyle[WarpStyle["SmartDown"] = 3] = "SmartDown";
})(WarpStyle = exports.WarpStyle || (exports.WarpStyle = {}));
class MetaInfo {
    constructor() {
        this.title = "";
        this.resolution = {
            width: 1920,
            height: 1080
        };
        this.warpStyle = WarpStyle.SmartUp;
        this.originalScript = "";
        this.originalTranslation = "";
        this.originalEditing = "";
        this.originalTiming = "";
        this.synchPoint = "";
        this.scriptUpdatedBy = "";
    }
}
exports.default = MetaInfo;
//# sourceMappingURL=MetaInfo.js.map