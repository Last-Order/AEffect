# AEffect
[![Build status](https://ci.appveyor.com/api/projects/status/yu0wdn5kge5fh4yy?svg=true)](https://ci.appveyor.com/project/Last-Order/aeffect)

AEffect is a tool to generate effect subtitles (.ass) files for JavaScript programmers.

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
