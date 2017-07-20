'use strict';

/**
 * manipulate text around a pfc code
 */

module.exports = (item, index, array) => {
    let beforeTokens = array.slice(0, index);
    let afterTokens = array.slice(index + 1);
    let currentToken = item;

    let beforeTexts = [],
        beforeWords = [],
        forwardTexts = [],
        forwardWords = [],
        afterTexts = [],
        afterWords = [];

    for (let i = 0; i < beforeTokens.length; i++) {
        let beforeToken = beforeTokens[i];
        if (beforeToken.type === 'text') {
            let text = beforeToken.text;
            let words = text.split(' ');
            beforeTexts.push(text);
            forwardTexts.unshift(text);
            for (let j = 0; j < words.length; j++) {
                let word = words[j];
                word = word.trim();
                if (word) {
                    beforeWords.push(word);
                    forwardWords.unshift(word);
                }
            }
        }
    }

    for (let i = 0; i < afterTokens.length; i++) {
        let afterToken = afterTokens[i];
        if (afterToken.type === 'text') {
            let text = afterToken.text;
            afterTexts.push(text);
            let words = text.split(' ');
            for (let j = 0; j < words.length; j++) {
                let word = words[j];
                word = word.trim();
                if (word) {
                    afterWords.push(word);
                }
            }
        }
    }

    return {
        beforeTokens,
        afterTokens,
        currentToken,
        beforeTexts,
        afterTexts,
        forwardTexts,
        beforeWords,
        forwardWords,
        afterWords
    };
};
