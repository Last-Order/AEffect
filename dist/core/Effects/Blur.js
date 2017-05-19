"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class Blur {
    constructor(strength = 1) {
        this.strength = strength;
    }
    toString() {
        return `\\blur${this.strength}`;
    }
}
//# sourceMappingURL=Blur.js.map