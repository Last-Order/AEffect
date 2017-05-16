const Log = require('../utils/Log.js')

module.exports = {
    parse(content, options = {}) {
        // 按行划分。
        let assArray = content.split(/\r\n/);

        // 解析样式
        let assStyles = assArray.filter(line => line.startsWith('Style'));
        let parsedAssStyles = {};
        assStyles.forEach(line => {
            try {
                let splitedStyleLine = line.split('Style:');
                let styleName = splitedStyleLine[1].trim().split(',')[0];
                parsedAssStyles[styleName] = line;
            }
            catch (e) {
                Log.error("invalid_ass", "ASS 文件格式不正确");
            }
        })

        // 解析一般行
        let assLines = assArray.filter(line => line.startsWith('Dialogue'));
        let parsedAssLines = [];
        assLines.forEach(line => {
            let format = ["Layer", "Start", "End", "Style", "Name", "MarginL", "MarginR", "MarginV", "Effect"];
            let parsedLine = {};
            try {
                line.split('Dialogue:')[1].trim().split(',').forEach((property, index, lineArray) => {
                    if (index <= 8) {
                        parsedLine[format[index]] = property;
                    }
                    else {
                        // 对文本可能含有逗号的特殊处理
                        parsedLine['Text'] = lineArray.slice(9).join(',');
                        throw {}; // 停止遍历
                    }
                })
            }
            catch (e) {
                
            }
            parsedAssLines.push(parsedLine);
        });

        console.log(parsedAssLines);
    }
}