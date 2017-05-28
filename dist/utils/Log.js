"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    static error(name, message) {
        console.error(`[AEffect] [${new Date().toString()}] [ERROR] Error Name: ${name}; Message: ${message}`);
    }
    static warning(message) {
        console.warn(`[AEffect] [${new Date().toString()}] [WARN] ${message}`);
    }
    static info(message) {
        console.log(`[AEffect] [${new Date().toString()}] [INFO] ${message}`);
    }
}
exports.default = Log;
//# sourceMappingURL=Log.js.map