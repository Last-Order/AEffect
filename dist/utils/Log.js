"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    static error(name, message) {
        console.error(`[AEffect] [${new Date().toString()}] [ERROR] Error Name: ${name}; Message: ${message}`);
        let error = new Error();
        error.name = name;
        error.message = message;
        //throw error;
    }
    static warning(message) {
        console.warn(`[AEffect] [${new Date().toString()}] [WARN] ${message}`);
    }
}
exports.default = Log;
//# sourceMappingURL=Log.js.map