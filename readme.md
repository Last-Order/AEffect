# AEffect

AEffect 是一个为 JavaScript 使用者准备的，ASS 特效字幕生成工具。

## Getting Started

### Installation
```shell
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
(async ()=>{
    let AE = new AEffect();
    await AE.loadFromFile("path_to_your_ass_file");

    AE.select({
        "style": "Default"
    }).forEach(dialog => {
        dialog.addBlur(2);
    })

    console.log(AE.build());
})

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