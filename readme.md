# AEffect

AEffect 是一个为 JavaScript 使用者准备的，ASS 特效字幕生成工具。

## Getting Started

### Installation
```
npm install aeffect
```

### Compatibility

由于部分功能涉及到字体渲染，目前只支持 Windows 平台。

对 Linux 的支持将于日后加入。

### Import to your script

```JavaScript
const AEffect = require("aeffect");
```

## Examples

### 为 Default 样式的字幕应用强度为 2 的模糊

```JavaScript
    let AE = new AEffect();
    AE.loadFromFile("path_to_your_ass_file");
    AE.select({
        "style": "Default"
    }).addEffect([
        new Blur(2)
    ])

    console.log(AE.build());

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