export default class Log{
    static error(name, message) {
        // tslint:disable-next-line:max-line-length
        console.error(`[AEffect] [${new Date().toString()}] [ERROR] Error Name: ${name}; Message: ${message}`);
    }
    static warning(message) {
        console.warn(`[AEffect] [${new Date().toString()}] [WARN] ${message}`);
    }
    static info(message) {
        console.log(`[AEffect] [${new Date().toString()}] [INFO] ${message}`);
    }
}
