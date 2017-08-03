'use strict';

let {
    parseStrToAst,
    executeAST,
    checkASTWithContext
} = require('../..');
let assert = require('assert');
let contextText = require('../../apply/contextText');

let testData = [{
    code: '1234\nok!{:beforeTexts:}',
    result: [{
        type: 'text',
        text: '1234\nok!'
    }, {
        type: 'pfc',
        value: ['1234\nok!'],
        code: 'beforeTexts'
    }]
}, {
    code: 'text1{:beforeTexts:}text2{:beforeTexts:}{:forwardTexts:}',
    result: [{
        type: 'text',
        text: 'text1'
    }, {
        type: 'pfc',
        value: ['text1'],
        code: 'beforeTexts'
    }, {
        type: 'text',
        text: 'text2'
    }, {
        type: 'pfc',
        value: ['text1', 'text2'],
        code: 'beforeTexts'
    }, {
        type: 'pfc',
        value: ['text2', 'text1'],
        code: 'forwardTexts'
    }]
}, {
    code: 'text1{:afterTexts:}text2{:afterTexts:}text3',
    result: [{
        type: 'text',
        text: 'text1'
    }, {
        type: 'pfc',
        value: ['text2', 'text3'],
        code: 'afterTexts'
    }, {
        type: 'text',
        text: 'text2'
    }, {
        type: 'pfc',
        value: ['text3'],
        code: 'afterTexts'
    }, {
        type: 'text',
        text: 'text3'
    }]
}, {
    code: 'word1 word2{:beforeWords:}',
    result: [{
        type: 'text',
        text: 'word1 word2'
    }, {
        type: 'pfc',
        value: ['word1', 'word2'],
        code: 'beforeWords'
    }]
}, {
    code: 'word1 word2{:forwardWords:}',
    result: [{
        type: 'text',
        text: 'word1 word2'
    }, {
        type: 'pfc',
        value: ['word2', 'word1'],
        code: 'forwardWords'
    }]
}, {
    code: 'word1 {:forwardWords:}   word2  {:forwardWords:}',
    result: [{
        type: 'text',
        text: 'word1 '
    }, {
        type: 'pfc',
        value: ['word1'],
        code: 'forwardWords'
    }, {
        type: 'text',
        text: '   word2  '
    }, {
        type: 'pfc',
        value: ['word2', 'word1'],
        code: 'forwardWords'
    }]
}, {
    code: 'word1 {:beforeWords:}   word2  {:beforeWords:}',
    result: [{
        type: 'text',
        text: 'word1 '
    }, {
        type: 'pfc',
        value: ['word1'],
        code: 'beforeWords'
    }, {
        type: 'text',
        text: '   word2  '
    }, {
        type: 'pfc',
        value: ['word1', 'word2'],
        code: 'beforeWords'
    }]
}, {
    code: '{:afterWords:} word1{:afterWords:}word2',
    result: [{
        type: 'pfc',
        value: ['word1', 'word2'],
        code: 'afterWords'
    }, {
        type: 'text',
        text: ' word1'
    }, {
        type: 'pfc',
        value: ['word2'],
        code: 'afterWords'
    }, {
        type: 'text',
        text: 'word2'
    }]
}];

describe('contextText', () => {
    testData.map(({
        code,
        result
    }) => {
        it(code, () => {
            let ast = parseStrToAst(code);
            checkASTWithContext(code, contextText);
            let ret = executeAST(ast, contextText);
            assert.deepEqual(ret, result);
        });
    });
});
