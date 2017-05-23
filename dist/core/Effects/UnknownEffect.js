"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Effect_1 = require("./base/Effect");
class UnknownEffect extends Effect_1.default {
    constructor(effectText) {
        super();
        let effectName = effectText.match(/([a-zA-Z]+)/ig)[0];
    }
}
//# sourceMappingURL=UnknownEffect.js.map