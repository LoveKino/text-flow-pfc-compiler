'use strict';
let {
    compiler
} = require('../..');
let assert = require('assert');

describe('exception', () => {
    it('start delimiter is not string', () => {
        try {
            compiler('123', {
                startDelimiter: 123
            });
        } catch (err) {
            assert(err.toString().indexOf('missing string start delimiter') !== -1);
        }
    });

    it('end delimiter is not string', () => {
        try {
            compiler('123', {
                endDelimiter: 123
            });
        } catch (err) {
            assert(err.toString().indexOf('missing string end delimiter') !== -1);
        }
    });

    it('equal start and end delimiter', () => {
        try {
            compiler('123', {
                endDelimiter: '|',
                startDelimiter: '|'
            });
        } catch (err) {
            assert(err.toString().indexOf('start delimiter should not equal to end delimiter') !== -1);
        }
    });
});
