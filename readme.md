# AEffect
[![Build status](https://ci.appveyor.com/api/projects/status/pm59thc0bjg7vc9m?svg=true)](https://ci.appveyor.com/project/Last-Order/aeffect-9f7jt)
[![codecov](https://codecov.io/gh/Last-Order/AEffect/branch/master/graph/badge.svg)](https://codecov.io/gh/Last-Order/AEffect)

AEffect is a tool to generate effect subtitles (.ass) files for JavaScript programmers.

**This project is now under development.**

## Getting Started

### Installation
```
npm install aeffect
```

### Compatibility

Because that functions related to rendering are based on Win32 API, AEffect can only support Windows platform now.


### Importing to your script

```JavaScript
const AEffect = require("aeffect");
```

## Examples

### Adding blur effect to all dialogs with "Default" style

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

### Syllables fade in

```javascript
import * as Effects from 'aeffect/effects';

AE.loadFromFile("path_to_file");

// 选择所有 Default 样式的字幕行
let allDialogs = AE.select({
    styleName: "Default"
});
// 按音节分割为行，新起始时间为原音节开始时间，新结束时间为原行结束时间
allDialogs.splitIntoSyllables('SyllableStart', 'LineEnd')
    .forEach((dialog) => {
        // 初始blur20 在音节时间内变为blur0
        dialog.addEffect([
            new Effects.Blur(20),
            new Effects.Animation(dialog.lineStart, dialog.lineStart + dialog.syllableDuration, new Effects.Blur(0))
        ]);
    });
// 注释原字幕
allDialogs.commentOriginalDialogs();

console.log(AE.build())
```

More examples and complete API documentation will be available soon.

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
