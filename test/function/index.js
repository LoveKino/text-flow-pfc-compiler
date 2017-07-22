'use strict';

let {
    parseStrToAst,
    executeAST,
    checkASTWithContext
} = require('../..');

let assert = require('assert');

let testData = [{
    code: '',
    result: []
}, {
    code: '1234',
    result: [{
        type: 'text',
        text: '1234'
    }]
}, {
    code: 'hello {:world:}',
    sandboxer: () => {
        return {
            world: 'world!'
        };
    },
    result: [{
        type: 'text',
        text: 'hello '
    }, {
        type: 'pfc',
        value: 'world!'
    }]
}, {
    code: 'today is \n{:date():}',
    sandboxer: () => {
        return {
            date: () => '2017.7.20'
        };
    },
    result: [{
        type: 'text',
        text: 'today is \n'
    }, {
        type: 'pfc',
        value: '2017.7.20'
    }]
}];

describe('index', () => {
    testData.map(({
        code, result, sandboxer
    }) => {
        it(code, () => {
            let ast = parseStrToAst(code);
            checkASTWithContext(code, sandboxer);
            let ret = executeAST(ast, sandboxer);
            assert.deepEqual(ret, result);
        });
    });
});
