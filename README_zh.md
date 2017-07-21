# text-flow-pfc-compiler

[中文文档](./README_zh.md)   [document](./README.md)

text embed pfc compiler
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i text-flow-pfc-compiler --save` 或者 `npm i text-flow-pfc-compiler --save-dev`

全局安装, 使用 `npm i text-flow-pfc-compiler -g`



## 使用方法








### API 快速运行



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
输出

    [ { type: 'text', text: 'today is \n' },
      { type: 'pfc', value: '2017.7.20' } ]

```


## 开发

### 文件结构

```
.    
│──README.md    
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


### 运行测试用例

`npm test`

## 许可证

MIT