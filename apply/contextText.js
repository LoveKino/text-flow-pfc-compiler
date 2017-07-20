'use strict';

/**
 * manipulate text around a pfc code
 */

module.exports = (item, index, array) => {
    let beforeTokens = array.slice(0, index);
    let afterTokens = array.slice(index + 1);
    let currentToken = item;

    let beforeTexts = [],
        forwardTexts = [],
        afterTexts = [];
    for (let i = 0; i < beforeTokens.length; i++) {
        let beforeToken = beforeTokens[i];
        if (beforeToken.type === 'text') {
            beforeTexts.push(beforeToken.text);
            forwardTexts.unshift(beforeToken.text);
        }
    }

    for (let i = 0; i < afterTokens.length; i++) {
        let afterToken = afterTokens[i];
        if (afterToken.type === 'text') {
            afterTexts.push(afterToken.text);
        }
    }

    return {
        beforeTokens,
        afterTokens,
        currentToken,
        beforeTexts,
        afterTexts,
        forwardTexts
    };
};
