# AEffect

AEffect 是一个为 JavaScript 使用者准备的，ASS 特效字幕生成工具。

## Getting Started

### Installation
```
npm install aeffect
```

### Import to your script

```JavaScript
const AEffect = require("aeffect");
```

## Examples

### 为 Default 样式的字幕应用强度为 2 的模糊

**使用 Async/Await**

```JavaScript
(async () => {
    let AE = new AEffect();
    await AE.loadFromFile("path_to_your_ass_file");

    AE.select({
        "style": "Default"
    }).forEach(dialog => {
        dialog.addBlur(2);
    })

    console.log(AE.build());
})();

```

**使用 Promise**

```JavaScript
let AE = new AEffect();
AE.loadFromFile("path_to_your_ass_file").then(() => {
    AE.select({
        "style": "Default"
    }).forEach(dialog => {
        dialog.addBlur(2);
    })

    console.log(AE.build())
})
```

更多说明请参阅 API 文档。

## Contributing

### Setting up development environment
```bash
git clone https://github.com/Last-Order/AEffect
cd ./AEffect
npm install
npm install -g typescript # skip if typescript is already installed
```

### Starting watching source files
```bash
tsc
```

### Running Unit Tests
```bash
    npm run test
```