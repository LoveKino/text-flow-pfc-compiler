'use strict';

let pfcCompiler = require('pfc-compiler');
let streamTokenSpliter = require('stream-token-parser');
let {
    LR
} = require('syntaxer');
let {
    ACTION, GOTO
} = require('../res/lr1Table');
let {
    buildFSM
} = require('stream-token-parser');
let FSM = require('cl-fsm');

let {
    stateGraphDSL
} = FSM;
let {
    g, c, left
} = stateGraphDSL;

const DEFAULT_START_DELIMITER = '{:';
const DEFAULT_END_DELIMITER = ':}';

let getTokenTypes = ({
    startDelimiter = DEFAULT_START_DELIMITER, endDelimiter = DEFAULT_END_DELIMITER
} = {}) => {
    if (!startDelimiter || typeof startDelimiter !== 'string') {
        throw new Error(`missing string start delimiter, check options. Current start delimiter is ${startDelimiter}`);
    }
    if (!endDelimiter || typeof endDelimiter !== 'string') {
        throw new Error(`missing string end delimiter, check options. Current end delimiter is ${endDelimiter}`);
    }

    if (startDelimiter === endDelimiter) {
        throw new Error('start delimiter should not equal to end delimiter');
    }

    return [{
        priority: 1,
        match: startDelimiter,
        name: 'startDelimiter'
    }, {
        priority: 1,
        match: endDelimiter,
        name: 'endDelimiter'
    }, {
        priority: 0,
        match: buildFSM(g(c(left()))),
        name: 'letter'
    }];
};

/**
 * parser: stream -> ast
 */
let parser = (options) => {
    let tokenTypes = getTokenTypes(options);
    let tokenSpliter = streamTokenSpliter.parser(tokenTypes);

    let lr1Parse = LR(ACTION, GOTO, {
        reduceHandler: (production, midNode) => {
            let productionId = getProductionId(production);
            if (productionId === 'ARTICLE := REGION') {
                midNode.value = [midNode.children[0].value];
            } else if (productionId === 'ARTICLE := REGION ARTICLE') {
                midNode.value = [midNode.children[0].value].concat(midNode.children[1].value);
            } else if (productionId === 'REGION := TEXT') {
                midNode.value = {
                    type: 'text',
                    text: midNode.children[0].value
                };
            } else if (productionId === 'REGION := startDelimiter TEXT endDelimiter') {
                midNode.value = {
                    type: 'pfc',
                    pfcAst: pfcCompiler.parseStrToAst(midNode.children[1].value)
                };
            } else if (productionId === 'TEXT := letter') {
                midNode.value = midNode.children[0].token.text;
            } else if (productionId === 'TEXT := letter TEXT') {
                midNode.value = midNode.children[0].token.text + midNode.children[1].value;
            }
        }
    });

    return (chunk) => {
        let str = chunk && chunk.toString();
        let tokens = tokenSpliter(str);

        for (let i = 0; i < tokens.length; i++) {
            lr1Parse(tokens[i]);
        }

        // means finished chunks
        if (chunk === null) {
            let ast = lr1Parse(null);
            return ast.children[0].value;
        }
    };
};

let executeAST = (mid, sandboxer = noop) => {
    let result = [];

    for (let i = 0; i < mid.length; i++) {
        let item = mid[i];
        let type = item.type;
        if (type === 'pfc') {
            let pfcAst = item.pfcAst;
            let variableMap = sandboxer(item, i, mid); // generate variableMap with current context [item, i, mid]
            result.push({
                type: 'pfc',
                value: pfcCompiler.executeAST(pfcAst, variableMap)
            });
        } else if (type === 'text') {
            result.push(item);
        }
    }

    return result;
};

let checkASTWithContext = (mid, sandboxer = noop) => {
    for (let i = 0; i < mid.length; i++) {
        let item = mid[i];
        let type = item.type;
        if (type === 'pfc') {
            let pfcAst = item.pfcAst;
            let variableMap = sandboxer(item, i, mid); // generate variableMap with current context [item, i, mid]
            pfcCompiler.checkASTWithContext(pfcAst, variableMap);
        }
    }
};

let parseStrToAst = (str, options) => {
    let handleChunk = parser(options);
    if (str) {
        handleChunk(str);
    }
    let mid = handleChunk(null);

    return mid;
};

let getProductionId = (production) => {
    return `${production[0]} := ${production[1].join(' ')}`;
};

const noop = () => {};

module.exports = {
    parser,
    parseStrToAst,
    executeAST,
    checkASTWithContext
};
