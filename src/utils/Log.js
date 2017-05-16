module.exports = class Log{
    static error(name, message){
        console.log(`[AEffect] [${new Date().toString()}] Error Name: ${name}; Message: ${message}`);
        let error = new Error();
        error.name = name;
        error.message = message;
        //throw error;
    }
}