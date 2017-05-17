export default class Log{
    static error(name, message){
        console.log(`[AEffect] [${new Date().toString()}] [ERROR] Error Name: ${name}; Message: ${message}`);
        let error = new Error();
        error.name = name;
        error.message = message;
        //throw error;
    }
    static warning(message){
        console.log(`[AEffect] [${new Date().toString()}] [WARN] ${message}`);
    }
}