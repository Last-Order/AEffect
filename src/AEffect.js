const fs = require('fs');
const Log = require('./utils/Log.js');
const AssParser = require('./core/AssParser.js');   

class AEffect{
    constructor(){
        this.subtitles = [];
        this.subtitleStyles = {};
        this.subtitlesGroupByStyle = {};
    }
    loadFromFile(path, encoding = 'utf-8'){
        fs.readFile(path, encoding, (error, data) => {
            if (error){
                Log.error("file_not_found", "找不到指定的文件");
                return false;
            }
            AssParser.parse(data);
        })
    }
}
    
new AEffect().loadFromFile("./test.ass");