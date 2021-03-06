'use strict';

let {
    parseStrToAst,
    executeAST,
    checkASTWithContext,
    astToSource
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
        value: 'world!',
        code: 'world'
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
        value: '2017.7.20',
        code: 'date()'
    }]
}];

describe('index', () => {
    testData.map(({
        code,
        result,
        sandboxer
    }) => {
        it(code, () => {
            let ast = parseStrToAst(code);
            checkASTWithContext(code, sandboxer);
            let ret = executeAST(ast, sandboxer);
            // check result
            assert.deepEqual(ret, result);

            // recovery
            assert.equal(astToSource(ast), code);
        });
    });
});
