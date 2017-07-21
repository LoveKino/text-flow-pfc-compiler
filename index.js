module.exports = require('./src');

/**
 *
 * @readme-quick-run
 *
 * ## test tar=js r_c=textFlowPFCCompiler
 *
 * let {parseStrToAst, checkASTWithContext, executeAST} = textFlowPFCCompiler;
 *
 * let ast = parseStrToAst('today is \n{:date():}');
 *
 * let sandboxer = () => {
 *   return {
 *      date: () => '2017.7.20'
 *   };
 * };
 *
 * checkASTWithContext(ast, sandboxer); // you can check pfc code at development duration.
 *
 * let ret = executeAST(ast, sandboxer);
 *
 * console.log(ret);
 */
