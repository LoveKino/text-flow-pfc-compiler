'use strict';

let {
    compiler
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
        value: ['1234\nok!']
    }]
}, {
    code: 'text1{:beforeTexts:}text2{:beforeTexts:}{:forwardTexts:}',
    result: [{
        type: 'text',
        text: 'text1'
    }, {
        type: 'pfc',
        value: ['text1']
    }, {
        type: 'text',
        text: 'text2'
    }, {
        type: 'pfc',
        value: ['text1', 'text2']
    }, {
        type: 'pfc',
        value: ['text2', 'text1']
    }]
}, {
    code: 'text1{:afterTexts:}text2{:afterTexts:}text3',
    result: [{
        type: 'text',
        text: 'text1'
    }, {
        type: 'pfc',
        value: ['text2', 'text3']
    }, {
        type: 'text',
        text: 'text2'
    }, {
        type: 'pfc',
        value: ['text3']
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
        value: ['word1', 'word2']
    }]
}, {
    code: 'word1 word2{:forwardWords:}',
    result: [{
        type: 'text',
        text: 'word1 word2'
    }, {
        type: 'pfc',
        value: ['word2', 'word1']
    }]
}, {
    code: 'word1 {:forwardWords:}   word2  {:forwardWords:}',
    result: [{
        type: 'text',
        text: 'word1 '
    }, {
        type: 'pfc',
        value: ['word1']
    }, {
        type: 'text',
        text: '   word2  '
    }, {
        type: 'pfc',
        value: ['word2', 'word1']
    }]
}, {
    code: 'word1 {:beforeWords:}   word2  {:beforeWords:}',
    result: [{
        type: 'text',
        text: 'word1 '
    }, {
        type: 'pfc',
        value: ['word1']
    }, {
        type: 'text',
        text: '   word2  '
    }, {
        type: 'pfc',
        value: ['word1', 'word2']
    }]
}, {
    code: '{:afterWords:} word1{:afterWords:}word2',
    result: [{
        type: 'pfc',
        value: ['word1', 'word2']
    }, {
        type: 'text',
        text: ' word1'
    }, {
        type: 'pfc',
        value: ['word2']
    }, {
        type: 'text',
        text: 'word2'
    }]
}];

describe('contextText', () => {
    testData.map(({
        code, result
    }) => {
        it(code, () => {
            let ret = compiler(code)(contextText);
            assert.deepEqual(ret, result);
        });
    });
});
