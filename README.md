# text-flow-pfc-compiler

[中文文档](./README_zh.md)   [document](./README.md)

text embed pfc compiler
- [install](#install)
- [usage](#usage)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i text-flow-pfc-compiler --save` or `npm i text-flow-pfc-compiler --save-dev`

Install on global, using `npm i text-flow-pfc-compiler -g`



## usage








### API quick run



```js
let textFlowPFCCompiler = require('text-flow-pfc-compiler')
let {parseStrToAst, checkASTWithContext, executeAST} = textFlowPFCCompiler;

let ast = parseStrToAst('today is \n{:date():}');

let sandboxer = () => {
  return {
     date: () => '2017.7.20'
  };
};

checkASTWithContext(ast, sandboxer); // you can check pfc code at development duration.

let ret = executeAST(ast, sandboxer);

console.log(ret);
```

```
output

    [ { type: 'text', text: 'today is \n' },
      { type: 'pfc', value: '2017.7.20', code: 'date()' } ]

```


## develop

### file structure

```
.    
│──README.md    
│──README_zh.md    
│──TODO.md    
│──apply    
│   └──contextText.js    
│──build    
│   └──index.js    
│──coverage    
│   │──coverage.json    
│   │──lcov-report    
│   │   │──base.css    
│   │   │──index.html    
│   │   │──prettify.css    
│   │   │──prettify.js    
│   │   │──sort-arrow-sprite.png    
│   │   │──sorter.js    
│   │   └──text-flow-pfc-compiler    
│   │       │──index.html    
│   │       └──index.js.html    
│   └──lcov.info    
│──grammer    
│   └──grammer.txt    
│──index.js    
│──package.json    
└──res    
    └──lr1Table.js     
```


### run tests

`npm test`

## license

MIT