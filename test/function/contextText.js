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
