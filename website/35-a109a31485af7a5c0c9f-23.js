(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"+Dzo":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={matchST_LOOKING_FOR_PROPERTY:function(){var t=this.input();if("-"===t){if(">"===(t=this.input()))return this.tok.T_OBJECT_OPERATOR;t&&this.unput(1)}else if(this.is_LABEL_START())return this.consume_LABEL(),this.popState(),this.tok.T_STRING;return this.popState(),t&&this.unput(1),!1},matchST_LOOKING_FOR_VARNAME:function(){var t=this.input();if(this.popState(),this.begin("ST_IN_SCRIPTING"),this.is_LABEL_START()){if(this.consume_LABEL(),"["===(t=this.input())||"}"===t)return this.unput(1),this.tok.T_STRING_VARNAME;this.unput(this.yytext.length)}else t&&this.unput(1);return!1},matchST_VAR_OFFSET:function(){var t=this.input();if(this.is_NUM())return this.consume_NUM(),this.tok.T_NUM_STRING;if("]"===t)return this.popState(),"]";if("$"===t){if(this.input(),this.is_LABEL_START())return this.consume_LABEL(),this.tok.T_VARIABLE;throw new Error("Unexpected terminal")}if(this.is_LABEL_START())return this.consume_LABEL(),this.tok.T_STRING;if(this.is_WHITESPACE()||"\\"===t||"'"===t||"#"===t)return this.tok.T_ENCAPSED_AND_WHITESPACE;if("["===t||"{"===t||"}"===t||'"'===t||"`"===t||this.is_TOKEN())return t;throw new Error("Unexpected terminal")}}},"+GD5":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={read_start:function(){return this.token==this.tok.T_NAMESPACE?this.read_namespace():this.read_top_statement()}}},"+Gi2":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("dgHh"),n=s.extends(function Method(){s.apply(this,arguments),this.kind="method"});t.exports=n},"+Ks/":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={matchST_IN_SCRIPTING:function(){var t=this.input();switch(t){case" ":case"\t":case"\n":case"\r":case"\r\n":return this.T_WHITESPACE();case"#":return this.T_COMMENT();case"/":return"/"===this._input[this.offset]?this.T_COMMENT():"*"===this._input[this.offset]?(this.input(),this.T_DOC_COMMENT()):this.consume_TOKEN();case"'":return this.T_CONSTANT_ENCAPSED_STRING();case'"':return this.ST_DOUBLE_QUOTES();case"`":return this.begin("ST_BACKQUOTE"),"`";case"?":if(!this.aspTagMode&&this.tryMatch(">")){this.input();var e=this._input[this.offset];return"\n"!==e&&"\r"!==e||this.input(),this.conditionStack.length>1&&this.begin("INITIAL"),this.tok.T_CLOSE_TAG}return this.consume_TOKEN();case"%":return this.aspTagMode&&">"===this._input[this.offset]?(this.input(),"\n"!==(t=this._input[this.offset])&&"\r"!==t||this.input(),this.aspTagMode=!1,this.conditionStack.length>1&&this.begin("INITIAL"),this.tok.T_CLOSE_TAG):this.consume_TOKEN();case"{":return this.begin("ST_IN_SCRIPTING"),"{";case"}":return this.conditionStack.length>2&&this.popState(),"}";default:if("."===t){if(t=this.input(),this.is_NUM())return this.consume_NUM();t&&this.unput(1)}if(this.is_NUM())return this.consume_NUM();if(this.is_LABEL_START())return this.consume_LABEL().T_STRING();if(this.is_TOKEN())return this.consume_TOKEN()}throw new Error('Bad terminal sequence "'+t+'" at line '+this.yylineno+" (offset "+this.offset+")")},T_WHITESPACE:function(){for(;this.offset<this.size;){var t=this.input();if(" "!==t&&"\t"!==t&&"\n"!==t&&"\r"!==t){t&&this.unput(1);break}}return this.tok.T_WHITESPACE}}},"+cyG":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("Qqj5"),n=s.extends(function StaticLookup(t,e,i){s.apply(this,["staticlookup",t,e,i])});t.exports=n},"0+dJ":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={read_namespace:function(){var t=this.node("namespace");if(this.expect(this.tok.T_NAMESPACE)&&this.next(),"{"==this.token){this.currentNamespace=[""];var e=this.nextWithComments().read_top_statements();return this.expect("}")&&this.nextWithComments(),t([""],e,!0)}var i=this.read_namespace_name();if(";"==this.token){this.currentNamespace=i;e=this.nextWithComments().read_top_statements();return this.expect(this.EOF),t(i.name,e,!1)}if("{"==this.token){this.currentNamespace=i;e=this.nextWithComments().read_top_statements();return this.expect("}")&&this.nextWithComments(),t(i.name,e,!0)}if("("===this.token)return i.resolution=this.ast.identifier.RELATIVE_NAME,i.name=i.name.substring(1),this.node("call")(i,this.read_function_argument_list());this.error(["{",";"]),this.currentNamespace=i;e=this.read_top_statements();return this.expect(this.EOF),t(i,e,!1)},read_namespace_name:function(){var t=this.node("identifier"),e=!1;return this.token===this.tok.T_NAMESPACE&&(this.next().expect(this.tok.T_NS_SEPARATOR)&&this.next(),e=!0),t(this.read_list(this.tok.T_STRING,this.tok.T_NS_SEPARATOR,!0),e)},read_use_statement:function(){var t,e=this.node("usegroup"),i=[],s=null;return this.expect(this.tok.T_USE)&&this.next(),t=this.read_use_type(),i.push(this.read_use_declaration(!1)),","===this.token?i=i.concat(this.next().read_use_declarations(!1)):"{"===this.token&&(s=i[0].name,i=this.next().read_use_declarations(null===t),this.expect("}")&&this.next()),this.expect(";")&&this.nextWithComments(),e(s,t,i)},read_use_declaration:function(t){var e=this.node("useitem"),i=null;t&&(i=this.read_use_type());var s=this.read_namespace_name(),n=this.read_use_alias();return e(s.name,n,i)},read_use_declarations:function(t){for(var e=[this.read_use_declaration(t)];","===this.token;)e.push(this.next().read_use_declaration(t));return e},read_use_alias:function(){var t=null;return this.token===this.tok.T_AS&&this.next().expect(this.tok.T_STRING)&&(t=this.text(),this.next()),t},read_use_type:function(){return this.token===this.tok.T_FUNCTION?(this.next(),this.ast.useitem.TYPE_FUNCTION):this.token===this.tok.T_CONST?(this.next(),this.ast.useitem.TYPE_CONST):null}}},"02vy":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function Inline(t,e){s.apply(this,["inline",t,e])});t.exports=n},"1FFk":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Do(t,e,i){s.apply(this,["do",i]),this.test=t,this.body=e});t.exports=n},"1z+4":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Halt(t,e){s.apply(this,["halt",e]),this.after=t});t.exports=n},"24Cj":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Global(t,e){s.apply(this,["global",e]),this.items=t});t.exports=n},"2MMa":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://gla*yzzle.com
 */
var s=i("srsH"),n=i("yeBA"),h=function(t,e){this.withPositions=t,this.withSource=e};h.prototype.position=function(t){return new n(t.lexer.yylloc.first_line,t.lexer.yylloc.first_column,t.lexer.yylloc.first_offset)},h.precedence={};[["or"],["xor"],["and"],["="],["?"],["??"],["||"],["&&"],["|"],["^"],["&"],["==","!=","===","!==","<=>"],["<","<=",">",">="],["<<",">>"],["+","-","."],["*","/","%"],["!"],["instanceof"]].forEach(function(t,e){t.forEach(function(t){h.precedence[t]=e+1})});h.prototype.resolvePrecedence=function(t){var e;if("bin"===t.kind){if(t.right)if("bin"===t.right.kind){var i=h.precedence[t.type],s=h.precedence[t.right.type];i&&s&&s<=i&&(e=t.right,t.right=t.right.left,e.left=this.resolvePrecedence(t),t=e)}else if("retif"===t.right.kind){i=h.precedence[t.type],s=h.precedence["?"];i&&s&&s<=i&&(e=t.right,t.right=t.right.test,e.test=this.resolvePrecedence(t),t=e)}}else if("unary"===t.kind)t.what&&("bin"===t.what.kind?(e=t.what,t.what=t.what.left,e.left=this.resolvePrecedence(t),t=e):"retif"===t.what.kind&&(e=t.what,t.what=t.what.test,e.test=this.resolvePrecedence(t),t=e));else if("retif"===t.kind)t.falseExpr&&"retif"===t.falseExpr.kind&&(e=t.falseExpr,t.falseExpr=e.test,e.test=this.resolvePrecedence(t),t=e);else if("assign"===t.kind&&t.right&&"bin"===t.right.kind){i=h.precedence["="],s=h.precedence[t.right.type];i&&s&&s<i&&(e=t.right,t.right=t.right.left,e.left=t,t=e)}return t},h.prototype.prepare=function(t,e){var i=null;(this.withPositions||this.withSource)&&(i=this.position(e));var h=this;return function(){var r=null,o=Array.prototype.slice.call(arguments);if(h.withPositions||h.withSource){var _=null;h.withSource&&(_=e.lexer._input.substring(i.offset,e.lexer.yylloc.prev_offset)),r=h.withPositions?new s(_,i,new n(e.lexer.yylloc.prev_line,e.lexer.yylloc.prev_column,e.lexer.yylloc.prev_offset)):new s(_,null,null),o.push(r)}t||(t=o.shift());var a=h[t];if("function"!=typeof a)throw new Error('Undefined node "'+t+'"');var T=Object.create(a.prototype);return a.apply(T,o),h.resolvePrecedence(T)}},[i("Z7QH"),i("X6mU"),i("s1Hm"),i("2Oh0"),i("H1MR"),i("pP5F"),i("YlxZ"),i("p/f8"),i("c0hq"),i("nhwT"),i("BYOC"),i("nnHk"),i("HA9o"),i("p880"),i("dQhk"),i("nMsE"),i("kFt3"),i("jhm9"),i("2P2h"),i("1FFk"),i("aiae"),i("Ntad"),i("i6Ck"),i("e3Qi"),i("W+hA"),i("VPxp"),i("karW"),i("Y/FX"),i("OUof"),i("8EzM"),i("zuZZ"),i("dgHh"),i("24Cj"),i("FGo8"),i("1z+4"),i("NNv3"),i("rxQz"),i("Vwml"),i("02vy"),i("srtY"),i("ykJL"),i("eWrd"),i("6XwI"),i("eK7t"),i("Qqj5"),i("5txh"),i("+Gi2"),i("DkyT"),i("407n"),i("udbD"),i("Zki9"),i("CDYh"),i("7rVg"),i("H/kz"),i("zZTU"),i("8EZF"),i("vK0v"),i("hlET"),i("51JS"),i("bd7Q"),i("xbji"),i("FzPa"),i("ITLs"),i("E3JN"),i("Dp1J"),i("bBK1"),i("qR2B"),i("+cyG"),i("MJLC"),i("47iM"),i("Oa93"),i("sRrQ"),i("CxH9"),i("jgGf"),i("QR8L"),i("n1bU"),i("dLKy"),i("XkJ9"),i("THeq"),i("BDkN"),i("S15G"),i("hJk2"),i("qtjX"),i("doC9"),i("sNwU"),i("ROox")].forEach(function(t){var e=t.prototype.constructor.name.toLowerCase();"_"===e[0]&&(e=e.substring(1)),h.prototype[e]=t}),t.exports=h},"2Oh0":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Block(t,e,i){s.apply(this,[t||"block",i]),this.children=e.filter(Boolean)});t.exports=n},"2P2h":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("2Oh0"),n=s.extends(function Declare(t,e,i,n){s.apply(this,["declare",e,n]),this.what=t,this.mode=i});n.MODE_SHORT="short",n.MODE_BLOCK="block",n.MODE_NONE="none",t.exports=n},"3OJz":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var i={"\\r":"\r","\\n":"\n","\\t":"\t","\\v":String.fromCharCode(11),"\\e":String.fromCharCode(27),"\\f":String.fromCharCode(12),"\\\\":"\\","\\$":"$",'\\"':'"',"\\'":"'"};t.exports={resolve_special_chars:function(t){return t.replace(/\\[rntvef"'\\\$]/g,function(t){return i[t]})},read_scalar:function(){if(this.is("T_MAGIC_CONST"))return this.get_magic_constant();switch(this.token){case this.tok.T_CONSTANT_ENCAPSED_STRING:var t=this.node("string"),e=this.text(),i='"'===e[0];return e=e.substring(1,e.length-1),this.next(),t=t(i,this.resolve_special_chars(e)),this.token===this.tok.T_DOUBLE_COLON?this.read_static_getter(t):t;case this.tok.T_START_HEREDOC:if("ST_NOWDOC"===this.lexer.curCondition){var s=this.node("nowdoc"),n=(t=this.next().text())[t.length-1];return"\n"===n?t="\r"===t[t.length-2]?t.substring(0,t.length-2):t.substring(0,t.length-1):"\r"===n&&(t=t.substring(0,t.length-1)),this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE)&&this.next(),s=s(t,this.lexer.heredoc_label),this.expect(this.tok.T_END_HEREDOC)&&this.next(),s}return this.next().read_encapsed_string(this.tok.T_END_HEREDOC);case'"':return this.next().read_encapsed_string('"');case'b"':case'B"':return(s=this.node("cast"))("binary",this.next().read_encapsed_string('"'));case this.tok.T_LNUMBER:case this.tok.T_DNUMBER:var h=this.node("number");t=this.text();return this.next(),h=h(t);case this.tok.T_ARRAY:case"[":return this.read_array();default:var r=this.error("SCALAR");return this.next(),r}},read_dereferencable:function(t){var e,i=this.node("offsetlookup");if("["===this.token){var s=this.next().read_expr();this.expect("]")&&this.next(),e=i(t,s)}else if(this.token===this.tok.T_DOLLAR_OPEN_CURLY_BRACES){e=i(t,s=this.read_encapsed_string_item())}return e},read_encapsed_string_item:function(){var t=this.node();if(this.token===this.tok.T_ENCAPSED_AND_WHITESPACE){var e=this.text();this.next(),t=t("string",!1,this.resolve_special_chars(e))}else if(this.token===this.tok.T_DOLLAR_OPEN_CURLY_BRACES){var i=null;if(this.next().token===this.tok.T_STRING_VARNAME){var s=this.text();if(i=this.node("variable"),this.next(),"["===this.token){i=i(s,!1);var n=this.node("offsetlookup"),h=this.next().read_expr();this.expect("]")&&this.next(),i=n(i,h)}else i=s}else i=this.read_expr();this.expect("}")&&this.next(),t=t("variable",i,!1,!0)}else if(this.token===this.tok.T_CURLY_OPEN)t=this.next().read_variable(!1,!1,!1),this.expect("}")&&this.next();else if(this.token===this.tok.T_VARIABLE){if(t=this.read_simple_variable(!1),"["===this.token){n=this.node("offsetlookup"),h=this.next().read_encaps_var_offset();this.expect("]")&&this.next(),t=n(t,h)}if(this.token===this.tok.T_OBJECT_OPERATOR){n=this.node("propertylookup");var r=this.node("constref");this.next().expect(this.tok.T_STRING);i=this.text();this.next(),t=n(t,r(i))}}else{this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE);var o=this.text();this.next(),t=t("string",!1,o)}return t},read_encapsed_string:function(t){var e=this.node("encapsed"),i=[],s=null;for(s="`"===t?this.ast.encapsed.TYPE_SHELL:'"'===t?this.ast.encapsed.TYPE_STRING:this.ast.encapsed.TYPE_HEREDOC;this.token!==t&&this.token!==this.EOF;)i.push(this.read_encapsed_string_item());return this.expect(t)&&this.next(),e=e(i,s),t===this.tok.T_END_HEREDOC&&(e.label=this.lexer.heredoc_label),e},get_magic_constant:function(){var t=this.node("magic"),e=this.text();return this.next(),t(e)}}},"407n":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function New(t,e,i){s.apply(this,["new",i]),this.what=t,this.arguments=e});t.exports=n},"47iM":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Switch(t,e,i,n){s.apply(this,["switch",n]),this.test=t,this.body=e,this.shortForm=i});t.exports=n},"51JS":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("Oa93"),n=s.extends(function Print(t,e){s.apply(this,["print",t,e])});t.exports=n},"58+V":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={read_while:function(){var t,e=this.node("while"),i=null,s=!1;return this.expect("(")&&this.next(),t=this.read_expr(),this.expect(")")&&this.next(),":"===this.token?(s=!0,i=this.read_short_form(this.tok.T_ENDWHILE)):i=this.read_statement(),e(t,i,s)},read_do:function(){var t,e=this.node("do"),i=null;return t=this.read_statement(),this.ignoreComments().expect(this.tok.T_WHILE)&&(this.next().expect("(")&&this.next(),i=this.read_expr(),this.expect(")")&&this.next(),this.expect(";")&&this.next()),e(i,t)},read_for:function(){var t=this.node("for"),e=[],i=[],s=[],n=null,h=!1;return this.expect("(")&&this.next(),";"!==this.token?(e=this.read_list(this.read_expr,","),this.expect(";")&&this.next()):this.next(),";"!==this.token?(i=this.read_list(this.read_expr,","),this.expect(";")&&this.next()):this.next(),")"!==this.token?(s=this.read_list(this.read_expr,","),this.expect(")")&&this.next()):this.next(),":"===this.token?(h=!0,n=this.read_short_form(this.tok.T_ENDFOR)):n=this.read_statement(),t(e,i,s,n,h)},read_foreach:function(){var t,e=this.node("foreach"),i=null,s=null,n=null,h=!1;return this.expect("(")&&this.next(),t=this.read_expr(),this.ignoreComments().expect(this.tok.T_AS)&&(this.next(),s=this.read_foreach_variable(),this.token===this.tok.T_DOUBLE_ARROW&&(i=s,s=this.next().read_foreach_variable())),this.expect(")")&&this.next(),":"===this.token?(h=!0,n=this.read_short_form(this.tok.T_ENDFOREACH)):n=this.read_statement(),e(t,i,s,n,h)},read_foreach_variable:function(){if(this.token===this.tok.T_LIST){var t=this.node("list");this.next().expect("(")&&this.next();var e=this.read_assignment_list();return this.expect(")")&&this.next(),t(e)}return"["===this.token||this.token===this.tok.T_ARRAY?this.read_array():this.read_variable(!1,!1,!1)}}},"5txh":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function Magic(t,e){s.apply(this,["magic",t,e])});t.exports=n},"6XwI":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("Oa93"),n=s.extends(function List(t,e){s.apply(this,["list",t,e])});t.exports=n},"7+Vf":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var i=/^(\s*\*[ \t]*|[ \t]*)(.*)$/gm;t.exports={read_comment:function(){var t=this.node("doc"),e=[];do{var i=this.text();"#"===i[0]?i=i.substring(1):"*/"===(i=i.substring(2)).substring(i.length-2)&&(i=i.substring(0,i.length-2)),e.push(i.trim())}while(this.nextWithComments().token===this.tok.T_COMMENT);return t(!1,e)},read_doc_comment:function(){var t=this.node("doc"),e=this.text(),s=[];e=(e=e.substring(2,e.length-2)).split(i);for(var n=2;n<e.length;n+=3)s.push(e[n].trim());return this.nextWithComments(),t(!0,s)}}},"7a2z":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={read_class:function(t){var e=this.node("class");this.expect(this.tok.T_CLASS),this.next().expect(this.tok.T_STRING);var i=this.text(),s=null,n=null;return this.next().token==this.tok.T_EXTENDS&&(s=this.next().read_namespace_name()),this.token==this.tok.T_IMPLEMENTS&&(n=this.next().read_name_list()),this.expect("{"),e(i,s,n,this.nextWithComments().read_class_body(),t)},read_class_scope:function(){var t=this.token;return t==this.tok.T_FINAL?(this.next(),[0,0,2]):t==this.tok.T_ABSTRACT?(this.next(),[0,0,1]):[0,0,0]},read_class_body:function(){for(var t=[];this.token!==this.EOF&&"}"!==this.token;)if(this.token!==this.tok.T_COMMENT)if(this.token!==this.tok.T_DOC_COMMENT)if(this.token!==this.tok.T_USE){var e=this.read_member_flags(!1);if(this.token!==this.tok.T_CONST)if(this.token===this.tok.T_VAR&&(this.next().expect(this.tok.T_VARIABLE),e[0]=e[1]=0),this.token===this.tok.T_VARIABLE){var i=this.read_variable_list(e);this.expect(";"),this.nextWithComments(),t=t.concat(i)}else this.token===this.tok.T_FUNCTION?t.push(this.read_function(!1,e)):(this.error([this.tok.T_CONST,this.tok.T_VARIABLE,this.tok.T_FUNCTION]),this.next());else{var s=this.read_constant_list(e);this.expect(";"),this.nextWithComments(),t=t.concat(s)}}else t=t.concat(this.next().read_trait_use_statement());else t.push(this.read_doc_comment());else t.push(this.read_comment());return this.expect("}"),this.nextWithComments(),t},read_variable_list:function(t){return this.read_list(function read_variable_declaration(){var e=this.node("property");this.expect(this.tok.T_VARIABLE);var i=this.text().substring(1);return this.next(),";"===this.token||","===this.token?e(i,null,t):"="===this.token?e(i,this.next().read_expr(),t):(this.expect([",",";","="]),e(i,null,t))},",")},read_constant_list:function(t){return this.expect(this.tok.T_CONST)&&this.next(),this.read_list(function read_constant_declaration(){var e=this.node("classconstant"),i=null,s=null;return this.token===this.tok.T_STRING||this.php7&&this.is("IDENTIFIER")?(i=this.text(),this.next()):this.expect("IDENTIFIER"),this.expect("=")&&(s=this.next().read_expr()),e(i,s,t)},",")},read_member_flags:function(t){var e=[-1,-1,-1];if(this.is("T_MEMBER_FLAGS")){var i=0,s=0;do{switch(this.token){case this.tok.T_PUBLIC:i=0,s=0;break;case this.tok.T_PROTECTED:i=0,s=1;break;case this.tok.T_PRIVATE:i=0,s=2;break;case this.tok.T_STATIC:i=1,s=1;break;case this.tok.T_ABSTRACT:i=2,s=1;break;case this.tok.T_FINAL:i=2,s=2}t&&(0==i&&2==s?(this.expect([this.tok.T_PUBLIC,this.tok.T_PROTECTED]),s=-1):2==i&&1==s&&(this.error(),s=-1)),-1!==e[i]?this.error():-1!==s&&(e[i]=s)}while(this.next().is("T_MEMBER_FLAGS"))}return-1==e[0]&&(e[0]=0),-1==e[1]&&(e[1]=0),-1==e[2]&&(e[2]=0),e},read_interface:function(){var t=this.node("interface"),e=null,i=null,s=null;return this.expect(this.tok.T_INTERFACE)&&this.next(),this.expect(this.tok.T_STRING)&&(e=this.text(),this.next()),this.token===this.tok.T_EXTENDS&&(s=this.next().read_name_list()),this.expect("{")&&(i=this.next().read_interface_body()),t(e,s,i)},read_interface_body:function(){for(var t=[];this.token!==this.EOF&&"}"!==this.token;)if(this.token!==this.tok.T_COMMENT)if(this.token!==this.tok.T_DOC_COMMENT){var e=this.read_member_flags(!0);if(this.token==this.tok.T_CONST){var i=this.read_constant_list(e);this.expect(";")&&this.nextWithComments(),t=t.concat(i)}else if(this.token===this.tok.T_FUNCTION){var s=this.read_function_declaration(2,e);s.parseFlags(e),t.push(s),this.expect(";")&&this.nextWithComments()}else this.error([this.tok.T_CONST,this.tok.T_FUNCTION]),this.next()}else t.push(this.read_doc_comment());else t.push(this.read_comment());return this.expect("}")&&this.next(),t},read_trait:function(t){var e=this.node("trait"),i=null,s=null,n=null,h=null;return this.expect(this.tok.T_TRAIT)&&this.next(),this.expect(this.tok.T_STRING)&&(i=this.text()),this.next().token==this.tok.T_EXTENDS&&(s=this.next().read_namespace_name()),this.token==this.tok.T_IMPLEMENTS&&(n=this.next().read_name_list()),this.expect("{")&&(h=this.next().read_class_body()),e(i,s,n,h)},read_trait_use_statement:function(){for(var t=this.node("traituse"),e=[this.read_namespace_name()],i=null;","===this.token;)e.push(this.next().read_namespace_name());if("{"===this.token){for(i=[];this.next().token!==this.EOF&&"}"!==this.token;)i.push(this.read_trait_use_alias()),this.expect(";");this.expect("}")&&this.nextWithComments()}else this.expect(";")&&this.nextWithComments();return t(e,i)},read_trait_use_alias:function(){var t,e=this.node(),i=null;if(this.is("IDENTIFIER")?(t=this.text(),this.next()):(t=this.read_namespace_name(),this.token===this.tok.T_DOUBLE_COLON?(this.next(),this.token===this.tok.T_STRING||this.php7&&this.is("IDENTIFIER")?(i=t,t=this.text(),this.next()):this.expect(this.tok.T_STRING)):t=t.name),this.token===this.tok.T_INSTEADOF)return e("traitprecedence",i,t,this.next().read_name_list());if(this.token===this.tok.T_AS){var s=!1,n=null;return this.next().is("T_MEMBER_FLAGS")&&(s=this.read_member_flags()),this.token===this.tok.T_STRING||this.php7&&this.is("IDENTIFIER")?(n=this.text(),this.next()):!1===s&&this.expect(this.tok.T_STRING),e("traitalias",i,t,n,s)}return this.expect([this.tok.T_AS,this.tok.T_INSTEADOF]),e("traitalias",i,t,null,null)}}},"7rVg":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("Qqj5"),n=s.extends(function OffsetLookup(t,e,i){s.apply(this,["offsetlookup",t,e,i])});t.exports=n},"8EZF":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("H/kz"),n=s.extends(function Parenthesis(t,e){s.apply(this,["parenthesis",e]),this.inner=t});t.exports=n},"8EzM":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function For(t,e,i,n,h,r){s.apply(this,["for",r]),this.init=t,this.test=e,this.increment=i,this.shortForm=h,this.body=n});t.exports=n},BDkN:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function UseGroup(t,e,i,n){s.apply(this,["usegroup",n]),this.name=t,this.type=e,this.items=i});t.exports=n},BYOC:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function Class(t,e,i,n,h,r){s.apply(this,["class",t,r]),this.isAnonymous=!t,this.extends=e,this.implements=i,this.body=n,this.parseFlags(h)});t.exports=n},CDYh:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function Number(t,e){s.apply(this,["number",t,e])});t.exports=n},CxH9:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function Trait(t,e,i,n,h){s.apply(this,["trait",t,h]),this.extends=e,this.implements=i,this.body=n});t.exports=n},DkyT:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("2Oh0"),n=(i("NNv3"),s.extends(function Namespace(t,e,i,n){s.apply(this,["namespace",e,n]),this.name=t,this.withBrackets=i||!1}));t.exports=n},Dp1J:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Silent(t,e){s.apply(this,["silent",e]),this.expr=t});t.exports=n},E3JN:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("udbD"),n=s.extends(function Return(t,e){s.apply(this,["return",e]),this.expr=t});t.exports=n},FGo8:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Goto(t,e){s.apply(this,["goto",e]),this.label=t});t.exports=n},FzPa:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("Qqj5"),n=s.extends(function PropertyLookup(t,e,i){s.apply(this,["propertylookup",t,e,i])});t.exports=n},GwKh:function(t,e,i){"use strict";
/*!
 * Defines a list of helper functions for parsing
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={read_short_form:function(t){var e=this.node("block"),i=[];for(this.expect(":")&&this.next();this.token!=this.EOF&&this.token!==t;)i.push(this.read_inner_statement());return this.expect(t)&&this.next(),this.expectEndOfStatement(),e(null,i)},read_list:function(t,e,i){var s=[];if(this.token==e&&(i&&s.push(""),this.next()),"function"==typeof t){do{if(s.push(t.apply(this,[])),this.token!=e)break}while(this.next().token!=this.EOF)}else{if(!this.expect(t))return[];for(s.push(this.text());this.next().token!=this.EOF&&this.token==e&&this.next().token==t;)s.push(this.text())}return s},read_name_list:function(){return this.read_list(this.read_namespace_name,",",!1)},read_variable_declarations:function(){return this.read_list(function(){var t=this.node("assign"),e=this.node("variable");if(this.expect(this.tok.T_VARIABLE)){var i=this.text().substring(1);this.next(),e=e(i,!1,!1)}else e=e("#ERR",!1,!1);return"="===this.token?t(e,this.next().read_expr()):e},",")}}},"H/SV":function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={T_CONSTANT_ENCAPSED_STRING:function(){for(var t;this.offset<this.size;)if("\\"==(t=this.input()))this.input();else if("'"==t)break;return this.tok.T_CONSTANT_ENCAPSED_STRING},is_HEREDOC:function(){var t=this.offset;if("<"===this._input[this.offset-1]&&"<"===this._input[this.offset]&&"<"===this._input[this.offset+1]){if(this.offset+=3,this.is_TABSPACE())for(;this.offset<this.size&&(this.offset++,this.is_TABSPACE()););var e=this._input[this.offset-1];if("'"===e||'"'===e?this.offset++:e=null,this.is_LABEL_START()){for(var i=this.offset-1;this.offset<this.size&&(this.offset++,this.is_LABEL()););var s=this._input.substring(i,this.offset-1);if((!e||e===this._input[this.offset-1])&&(e&&this.offset++,"\r"===this._input[this.offset-1]||"\n"===this._input[this.offset-1]))return this.heredoc_label=s,i=this.offset-t,this.offset=t,this.consume(i),"'"===e?this.begin("ST_NOWDOC"):this.begin("ST_HEREDOC"),this.tok.T_START_HEREDOC}}return this.offset=t,!1},ST_DOUBLE_QUOTES:function(){for(var t;this.offset<this.size;)if("\\"==(t=this.input()))this.input();else{if('"'==t)break;if("$"==t){if("{"==(t=this.input())||this.is_LABEL_START()){this.unput(2);break}t&&this.unput(1)}else if("{"==t){if("$"==(t=this.input())){this.unput(2);break}t&&this.unput(1)}}if('"'==t)return this.tok.T_CONSTANT_ENCAPSED_STRING;var e=1;return"b"!==this.yytext[0]&&"B"!==this.yytext[0]||(e=2),this.yytext.length>2&&this.appendToken(this.tok.T_ENCAPSED_AND_WHITESPACE,this.yytext.length-e),this.unput(this.yytext.length-e),this.begin("ST_DOUBLE_QUOTES"),this.yytext},isDOC_MATCH:function(){if(this._input.substring(this.offset-1,this.offset-1+this.heredoc_label.length)===this.heredoc_label){var t=this._input[this.offset-1+this.heredoc_label.length];if("\n"===t||"\r"===t||";"===t)return!0}return!1},matchST_NOWDOC:function(){if(this.isDOC_MATCH())return this.consume(this.heredoc_label.length),this.popState(),this.tok.T_END_HEREDOC;for(var t=this._input[this.offset-1];this.offset<this.size;)if("\n"===t||"\r"===t){if(t=this.input(),this.isDOC_MATCH())return this.unput(1).popState(),this.appendToken(this.tok.T_END_HEREDOC,this.heredoc_label.length),this.tok.T_ENCAPSED_AND_WHITESPACE}else t=this.input();return this.tok.T_ENCAPSED_AND_WHITESPACE},matchST_HEREDOC:function(){var t=this.input();if(this.isDOC_MATCH())return this.consume(this.heredoc_label.length-1),this.popState(),this.tok.T_END_HEREDOC;for(;this.offset<this.size;)if("\\"===t&&"\n"!==(t=this.input())&&"\r"!==t&&(t=this.input()),"\n"===t||"\r"===t){if(t=this.input(),this.isDOC_MATCH())return this.unput(1).popState(),this.appendToken(this.tok.T_END_HEREDOC,this.heredoc_label.length),this.tok.T_ENCAPSED_AND_WHITESPACE}else if("$"===t){if("{"===(t=this.input()))return this.begin("ST_LOOKING_FOR_VARNAME"),this.yytext.length>2?(this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES,2),this.unput(2),this.tok.T_ENCAPSED_AND_WHITESPACE):this.tok.T_DOLLAR_OPEN_CURLY_BRACES;if(this.is_LABEL_START()){var e=this.offset,i=this.consume_VARIABLE();return this.yytext.length>this.offset-e+2?(this.appendToken(i,this.offset-e+2),this.unput(this.offset-e+2),this.tok.T_ENCAPSED_AND_WHITESPACE):i}}else if("{"===t){if("$"===(t=this.input()))return this.begin("ST_IN_SCRIPTING"),this.yytext.length>2?(this.appendToken(this.tok.T_CURLY_OPEN,1),this.unput(2),this.tok.T_ENCAPSED_AND_WHITESPACE):(this.unput(1),this.tok.T_CURLY_OPEN)}else t=this.input();return this.tok.T_ENCAPSED_AND_WHITESPACE},consume_VARIABLE:function(){if(this.consume_LABEL(),ch=this.input(),"["==ch)return this.unput(1),this.begin("ST_VAR_OFFSET"),this.tok.T_VARIABLE;if("-"===ch){if(">"===this.input())return this.input(),this.is_LABEL_START()&&this.begin("ST_LOOKING_FOR_PROPERTY"),this.unput(3),this.tok.T_VARIABLE;this.unput(2)}else ch&&this.unput(1);return this.tok.T_VARIABLE},matchST_BACKQUOTE:function(){var t=this.input();if("$"===t){if("{"===(t=this.input()))return this.begin("ST_LOOKING_FOR_VARNAME"),this.tok.T_DOLLAR_OPEN_CURLY_BRACES;if(this.is_LABEL_START())return this.consume_VARIABLE()}else if("{"===t){if("$"===this._input[this.offset])return this.begin("ST_IN_SCRIPTING"),this.tok.T_CURLY_OPEN}else if("`"===t)return this.popState(),"`";for(;this.offset<this.size;){if("\\"===t)this.input();else{if("`"===t){this.unput(1),this.popState(),this.appendToken("`",1);break}if("$"===t){if("{"===(t=this.input()))return this.begin("ST_LOOKING_FOR_VARNAME"),this.yytext.length>2?(this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES,2),this.unput(2),this.tok.T_ENCAPSED_AND_WHITESPACE):this.tok.T_DOLLAR_OPEN_CURLY_BRACES;if(this.is_LABEL_START()){var e=this.offset,i=this.consume_VARIABLE();return this.yytext.length>this.offset-e+2?(this.appendToken(i,this.offset-e+2),this.unput(this.offset-e+2),this.tok.T_ENCAPSED_AND_WHITESPACE):i}continue}if("{"===t){if("$"===(t=this.input()))return this.begin("ST_IN_SCRIPTING"),this.yytext.length>2?(this.appendToken(this.tok.T_CURLY_OPEN,1),this.unput(2),this.tok.T_ENCAPSED_AND_WHITESPACE):(this.unput(1),this.tok.T_CURLY_OPEN);continue}}t=this.input()}return this.tok.T_ENCAPSED_AND_WHITESPACE},matchST_DOUBLE_QUOTES:function(){var t=this.input();if("$"===t){if("{"===(t=this.input()))return this.begin("ST_LOOKING_FOR_VARNAME"),this.tok.T_DOLLAR_OPEN_CURLY_BRACES;if(this.is_LABEL_START())return this.consume_VARIABLE()}else if("{"===t){if("$"===this._input[this.offset])return this.begin("ST_IN_SCRIPTING"),this.tok.T_CURLY_OPEN}else if('"'===t)return this.popState(),'"';for(;this.offset<this.size;){if("\\"===t)this.input();else{if('"'===t){this.unput(1),this.popState(),this.appendToken('"',1);break}if("$"===t){if("{"===(t=this.input()))return this.begin("ST_LOOKING_FOR_VARNAME"),this.yytext.length>2?(this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES,2),this.unput(2),this.tok.T_ENCAPSED_AND_WHITESPACE):this.tok.T_DOLLAR_OPEN_CURLY_BRACES;if(this.is_LABEL_START()){var e=this.offset,i=this.consume_VARIABLE();return this.yytext.length>this.offset-e+2?(this.appendToken(i,this.offset-e+2),this.unput(this.offset-e+2),this.tok.T_ENCAPSED_AND_WHITESPACE):i}t&&this.unput(1)}else if("{"===t){if("$"===(t=this.input()))return this.begin("ST_IN_SCRIPTING"),this.yytext.length>2?(this.appendToken(this.tok.T_CURLY_OPEN,1),this.unput(2),this.tok.T_ENCAPSED_AND_WHITESPACE):(this.unput(1),this.tok.T_CURLY_OPEN);t&&this.unput(1)}}t=this.input()}return this.tok.T_ENCAPSED_AND_WHITESPACE}}},"H/kz":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("OUof"),n=s.extends(function Operation(t,e){s.apply(this,[t||"operation",e])});t.exports=n},H1MR:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function Boolean(t,e){s.apply(this,["boolean",t,e])});t.exports=n},HA9o:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Clone(t,e){s.apply(this,["clone",e]),this.what=t});t.exports=n},ITLs:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function RetIf(t,e,i,n){s.apply(this,["retif",n]),this.test=t,this.trueExpr=e,this.falseExpr=i});t.exports=n},JF3E:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={read_switch:function(){this.expect(this.tok.T_SWITCH)&&this.next();var t,e,i=this.node("switch");return this.expect("(")&&this.next(),t=this.read_expr(),this.expect(")")&&this.next(),e=":"===this.token,i(t,this.read_switch_case_list(),e)},read_switch_case_list:function(){var t=null,e=this.node("block"),i=[];for("{"===this.token?t="}":":"===this.token?t=this.tok.T_ENDSWITCH:this.expect(["{",":"]),";"===this.next().token&&this.next(),this.token===this.tok.T_CLOSE_TAG&&this.next();this.token!==this.EOF&&this.token!==t;)i.push(this.read_case_list(t));return this.expect(t)&&this.next(),t===this.tok.T_ENDSWITCH&&this.expectEndOfStatement(),e(null,i)},read_case_list:function(t){var e=this.node("case"),i=null,s=null,n=[];for(this.token===this.tok.T_CASE?i=this.next().read_expr():this.token===this.tok.T_DEFAULT?this.next():this.expect([this.tok.T_CASE,this.tok.T_DEFAULT]),this.expect([":",";"])&&this.next(),s=this.node("block");this.token!=this.EOF&&this.token!==t&&this.token!==this.tok.T_CASE&&this.token!==this.tok.T_DEFAULT;)n.push(this.read_inner_statement());return e(i,n.length>0?s(null,n):null)}}},LYHe:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={T_STRING:function(){var t=this.yytext.toLowerCase(),e=this.keywords[t];if("number"!=typeof e)if("yield"===t)this.php7&&this.tryMatch(" from")?(this.consume(5),e=this.tok.T_YIELD_FROM):e=this.tok.T_YIELD;else if(e=this.tok.T_STRING,"b"===t||"B"===t){var i=this.input(1);if('"'===i)return this.ST_DOUBLE_QUOTES();if("'"===i)return this.T_CONSTANT_ENCAPSED_STRING();i&&this.unput(1)}return e},consume_TOKEN:function(){var t=this._input[this.offset-1],e=this.tokenTerminals[t];return e?e.apply(this,[]):this.yytext},tokenTerminals:{$:function(){return this.offset++,this.is_LABEL_START()?(this.offset--,this.consume_LABEL(),this.tok.T_VARIABLE):(this.offset--,"$")},"-":function(){var t=this._input[this.offset];return">"===t?(this.begin("ST_LOOKING_FOR_PROPERTY").input(),this.tok.T_OBJECT_OPERATOR):"-"===t?(this.input(),this.tok.T_DEC):"="===t?(this.input(),this.tok.T_MINUS_EQUAL):"-"},"\\":function(){return this.tok.T_NS_SEPARATOR},"/":function(){return"="===this._input[this.offset]?(this.input(),this.tok.T_DIV_EQUAL):"/"},":":function(){return":"===this._input[this.offset]?(this.input(),this.tok.T_DOUBLE_COLON):":"},"(":function(){var t=this.offset;if(this.input(),this.is_TABSPACE()&&this.consume_TABSPACE().input(),this.is_LABEL_START()){var e=this.yytext.length;this.consume_LABEL();var i=this.yytext.substring(e-1).toLowerCase(),s=this.castKeywords[i];if("number"==typeof s&&(this.input(),this.is_TABSPACE()&&this.consume_TABSPACE().input(),")"===this._input[this.offset-1]))return s}return this.unput(this.offset-t),"("},"=":function(){var t=this._input[this.offset];return">"===t?(this.input(),this.tok.T_DOUBLE_ARROW):"="===t?"="===this._input[this.offset+1]?(this.consume(2),this.tok.T_IS_IDENTICAL):(this.input(),this.tok.T_IS_EQUAL):"="},"+":function(){var t=this._input[this.offset];return"+"===t?(this.input(),this.tok.T_INC):"="===t?(this.input(),this.tok.T_PLUS_EQUAL):"+"},"!":function(){return"="===this._input[this.offset]?"="===this._input[this.offset+1]?(this.consume(2),this.tok.T_IS_NOT_IDENTICAL):(this.input(),this.tok.T_IS_NOT_EQUAL):"!"},"?":function(){return this.php7&&"?"===this._input[this.offset]?(this.input(),this.tok.T_COALESCE):"?"},"<":function(){var t=this._input[this.offset];return"<"===t?"="===(t=this._input[this.offset+1])?(this.consume(2),this.tok.T_SL_EQUAL):"<"===t&&this.is_HEREDOC()?this.tok.T_START_HEREDOC:(this.input(),this.tok.T_SL):"="===t?(this.input(),this.php7&&">"===this._input[this.offset]?(this.input(),this.tok.T_SPACESHIP):this.tok.T_IS_SMALLER_OR_EQUAL):">"===t?(this.input(),this.tok.T_IS_NOT_EQUAL):"<"},">":function(){var t=this._input[this.offset];return"="===t?(this.input(),this.tok.T_IS_GREATER_OR_EQUAL):">"===t?"="===(t=this._input[this.offset+1])?(this.consume(2),this.tok.T_SR_EQUAL):(this.input(),this.tok.T_SR):">"},"*":function(){var t=this._input[this.offset];return"="===t?(this.input(),this.tok.T_MUL_EQUAL):"*"===t?(this.input(),"="===this._input[this.offset]?(this.input(),this.tok.T_POW_EQUAL):this.tok.T_POW):"*"},".":function(){var t=this._input[this.offset];return"="===t?(this.input(),this.tok.T_CONCAT_EQUAL):"."===t&&"."===this._input[this.offset+1]?(this.consume(2),this.tok.T_ELLIPSIS):"."},"%":function(){return"="===this._input[this.offset]?(this.input(),this.tok.T_MOD_EQUAL):"%"},"&":function(){var t=this._input[this.offset];return"="===t?(this.input(),this.tok.T_AND_EQUAL):"&"===t?(this.input(),this.tok.T_BOOLEAN_AND):"&"},"|":function(){var t=this._input[this.offset];return"="===t?(this.input(),this.tok.T_OR_EQUAL):"|"===t?(this.input(),this.tok.T_BOOLEAN_OR):"|"},"^":function(){return"="===this._input[this.offset]?(this.input(),this.tok.T_XOR_EQUAL):"^"}}}},MJLC:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function String(t,e,i){s.apply(this,["string",e,i]),this.isDoubleQuote=t});t.exports=n},MMSx:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={read_if:function(){var t,e=this.node("if"),i=null,s=null,n=!1;if(t=this.read_if_expr(),":"===this.token){n=!0,this.next(),i=this.node("block");for(var h=[];this.token!==this.EOF&&this.token!==this.tok.T_ENDIF;){if(this.token===this.tok.T_ELSEIF){s=this.next().read_elseif_short();break}if(this.token===this.tok.T_ELSE){s=this.next().read_else_short();break}h.push(this.read_inner_statement())}i=i(null,h),this.expect(this.tok.T_ENDIF)&&this.next(),this.expectEndOfStatement()}else i=this.read_statement(),this.ignoreComments(),this.token===this.tok.T_ELSEIF?s=this.next().read_if():this.token===this.tok.T_ELSE&&(s=this.next().read_statement());return e(t,i,s,n)},read_if_expr:function(){this.expect("(")&&this.next();var t=this.read_expr();return this.expect(")")&&this.next(),t},read_elseif_short:function(){var t,e=this.node("if"),i=null,s=null,n=[];for(t=this.read_if_expr(),this.expect(":")&&this.next(),s=this.node("block");this.token!=this.EOF&&this.token!==this.tok.T_ENDIF;){if(this.token===this.tok.T_ELSEIF){i=this.next().read_elseif_short();break}if(this.token===this.tok.T_ELSE){i=this.next().read_else_short();break}n.push(this.read_inner_statement())}return e(t,s=s(null,n),i,!0)},read_else_short:function(){this.expect(":")&&this.next();for(var t=this.node("block"),e=[];this.token!=this.EOF&&this.token!==this.tok.T_ENDIF;)e.push(this.read_inner_statement());return t(null,e)}}},Mrvx:function(t,e){t.exports={read_array:function(){var t=null,e=!1,i=[],s=this.node("array");if(this.token===this.tok.T_ARRAY?(this.next().expect("("),t=")"):(e=!0,t="]"),this.next().token!=t)for(;this.token!=this.EOF&&(i.push(this.read_array_pair_list()),","==this.token)&&(this.next(),this.token!==t););return this.expect(t),this.next(),s(e,i)},read_array_pair_list:function(){var t=this.node("entry"),e=null,i=null;if("&"===this.token)i=this.next().read_variable(!0,!1,!0);else{var s=this.read_expr();this.token===this.tok.T_DOUBLE_ARROW?(e=s,i="&"===this.next().token?this.next().read_variable(!0,!1,!0):this.read_expr()):i=s}return t(e,i)},read_dim_offset:function(){return"]"!=this.token&&this.read_expr()}}},NNv3:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function Identifier(t,e,i){s.apply(this,["identifier",i]),e?this.resolution=Identifier.RELATIVE_NAME:1===t.length?this.resolution=Identifier.UNQUALIFIED_NAME:""===t[0]?this.resolution=Identifier.FULL_QUALIFIED_NAME:this.resolution=Identifier.QUALIFIED_NAME,this.name=t.join("\\")});n.UNQUALIFIED_NAME="uqn",n.QUALIFIED_NAME="qn",n.FULL_QUALIFIED_NAME="fqn",n.RELATIVE_NAME="rn",t.exports=n},Ntad:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("Oa93"),n=s.extends(function Echo(t,e){s.apply(this,["echo",t,e])});t.exports=n},OUof:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function Expression(t,e){s.apply(this,[t||"expression",e])});t.exports=n},Oa93:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Sys(t,e,i){s.apply(this,[t||"sys",i]),this.arguments=e});t.exports=n},QR8L:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function TraitPrecedence(t,e,i,n){s.apply(this,["traitprecedence",n]),this.trait=t,this.method=e,this.instead=i});t.exports=n},QpOs:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={read_try:function(){this.expect(this.tok.T_TRY);var t,e=this.node("try"),i=null,s=[];for(t=this.next().read_statement();this.ignoreComments().token===this.tok.T_CATCH;){var n,h,r=this.node("catch");this.next().expect("(")&&this.next(),n=this.read_list(this.read_namespace_name,"|",!1),h=this.read_variable(!0,!1,!1),this.expect(")"),s.push(r(this.next().read_statement(),n,h))}return this.token===this.tok.T_FINALLY&&(i=this.next().read_statement()),e(t,s,i)}}},Qqj5:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("OUof"),n=s.extends(function Lookup(t,e,i,n){s.apply(this,[t||"lookup",n]),this.what=e,this.offset=i});t.exports=n},ROox:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("OUof"),n=s.extends(function YieldFrom(t,e){s.apply(this,["yieldfrom",e]),this.value=t});t.exports=n},S15G:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function UseItem(t,e,i,n){s.apply(this,["useitem",n]),this.name=t,this.alias=e,this.type=i});n.TYPE_CONST="const",n.TYPE_FUNCTION="function",t.exports=n},THeq:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("Oa93"),n=s.extends(function Unset(t,e){s.apply(this,["unset",t,e])});t.exports=n},VPxp:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function Error(t,e,i,n,h){s.apply(this,["error",h]),this.message=t,this.token=e,this.line=i,this.expected=n});t.exports=n},Vppz:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={read_variable:function(t,e,i){var s;if(i||"&"!==this.token||(i=!0,this.next()),this.is([this.tok.T_VARIABLE,"$"]))s=this.read_reference_variable(e,i);else if(this.is([this.tok.T_NS_SEPARATOR,this.tok.T_STRING,this.tok.T_NAMESPACE])){s=this.node();var n=this.read_namespace_name();if(this.token!=this.tok.T_DOUBLE_COLON&&"("!=this.token){var h=n.name.toLowerCase();s="true"===h?s("boolean",!0):"false"===h?s("boolean",!1):s("constref",n)}else s=n}else this.token===this.tok.T_STATIC?(s=this.node("constref"),this.next(),s=s("static")):this.expect("VARIABLE");return this.token===this.tok.T_DOUBLE_COLON&&(s=this.read_static_getter(s,e)),this.recursive_variable_chain_scan(s,t,e)},read_static_getter:function(t,e){var i=this.node("staticlookup"),s=null;if(this.next().is([this.tok.T_VARIABLE,"$"]))s=this.read_reference_variable(e,!1);else if(this.token===this.tok.T_STRING||this.token===this.tok.T_CLASS||this.php7&&this.is("IDENTIFIER")){s=this.node("constref");var n=this.text();this.next(),s=s(n)}else{this.error([this.tok.T_VARIABLE,this.tok.T_STRING]),s=this.node("constref");n=this.text();this.next(),s=s(n)}return i(t,s)},recursive_variable_chain_scan:function(t,e,i){t:for(;this.token!=this.EOF;)switch(this.token){case"(":if(e)return t;t=this.node("call")(t,this.read_function_argument_list());break;case"[":var s=this.node("offsetlookup");this.next();var n=!1;i?(n=this.read_encaps_var_offset(),this.expect("]")&&this.next()):"]"!==this.token?(n=this.read_expr(),this.expect("]")&&this.next()):this.next(),t=s(t,n);break;case this.tok.T_DOUBLE_COLON:"staticlookup"===t.kind&&this.error();s=this.node("staticlookup");if(this.next().token===this.tok.T_STRING||this.php7&&this.is("IDENTIFIER")){n=this.node("constref");var h=this.text();this.next(),n=n(h),this.token===this.tok.T_OBJECT_OPERATOR&&this.error()}else{this.error(this.tok.T_STRING);n=this.node("constref")(this.text());this.next()}t=s(t,n);break;case this.tok.T_OBJECT_OPERATOR:s=this.node("propertylookup");var r=null;switch(this.next().token){case this.tok.T_STRING:r=this.node("constref");h=this.text();if(this.next(),r=r(h),this.token===this.tok.T_VARIABLE){var o=this.node("variable");h=this.text().substring(1),this.next(),(r=this.node("encapsed")([r,o(h,!1,!1)],"offset")).loc&&r.value[0].loc&&(r.loc.start=r.value[0].loc.start)}else if("{"===this.token){var _=this.next().read_expr();this.expect("}")&&this.next(),(r=this.node("encapsed")([r,_],"offset")).loc&&r.value[0].loc&&(r.loc.start=r.value[0].loc.start)}break;case this.tok.T_VARIABLE:r=this.node("variable");h=this.text().substring(1);this.next(),r=r(h,!1,!1);break;case"$":this.next().expect(["{",this.tok.T_VARIABLE]),"{"===this.token?(r=this.next().read_expr(),this.expect("}")&&this.next()):r=this.read_expr();break;case"{":r=this.next().read_expr(),this.expect("}")&&this.next();break;default:this.error([this.tok.T_STRING,this.tok.T_VARIABLE]),r=this.node("constref");h=this.text();this.next(),r=r(h)}t=s(t,r);break;default:break t}return t},read_encaps_var_offset:function(){var t=this.node();if(this.token===this.tok.T_STRING){var e='"'===(n=this.text())[0];n=n.substring(1,n.length-1),this.next(),t=t("string",e,this.resolve_special_chars(n))}else if(this.token===this.tok.T_NUM_STRING){var i=this.text();this.next(),t=t("number",i)}else if(this.token===this.tok.T_VARIABLE){var s=this.text().substring(1);this.next(),t=t("variable",s,!1,!1)}else{this.expect([this.tok.T_STRING,this.tok.T_NUM_STRING,this.tok.T_VARIABLE]);var n=this.text();this.next(),t=t("string",!1,n)}return t},read_reference_variable:function(t,e){for(var i=this.read_simple_variable(e);this.token!=this.EOF;){var s=this.node();if("["==this.token){var n=null;n=t?this.next().read_encaps_var_offset():"]"===this.next().token?null:this.read_dim_offset(),this.expect("]")&&this.next(),i=s("offsetlookup",i,n)}else{if("{"!=this.token||t)break;n=this.next().read_expr();this.expect("}")&&this.next(),i=s("offsetlookup",i,n)}}return i},read_simple_variable:function(t){var e=this.node("variable");if(this.expect([this.tok.T_VARIABLE,"$"])&&this.token===this.tok.T_VARIABLE){var i=this.text().substring(1);this.next(),e=e(i,t,!1)}else switch("$"===this.token&&this.next(),this.token){case"{":var s=this.next().read_expr();this.expect("}")&&this.next(),e=e(s,t,!0);break;case"$":e=e(this.read_simple_variable(!1),t);break;case this.tok.T_VARIABLE:i=this.text().substring(1);var n=this.node("variable");this.next(),e=e(n(i,!1,!1),t,!1);break;default:this.error(["{","$",this.tok.T_VARIABLE]);i=this.text();this.next(),e=e(i,t,!1)}return e}}},Vwml:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Include(t,e,i,n){s.apply(this,["include",n]),this.once=t,this.require=e,this.target=i});t.exports=n},"W+hA":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function Entry(t,e,i){s.apply(this,["entry",i]),this.key=t,this.value=e});t.exports=n},X6mU:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Assign(t,e,i,n){s.apply(this,["assign",n]),this.operator=i,this.left=t,this.right=e});t.exports=n},XkJ9:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("H/kz"),n=s.extends(function Unary(t,e,i){s.apply(this,["unary",i]),this.type=t,this.what=e});t.exports=n},"Y/FX":function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Exit(t,e){s.apply(this,["exit",e]),this.status=t});t.exports=n},YlxZ:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Call(t,e,i){s.apply(this,["call",i]),this.what=t,this.arguments=e});t.exports=n},Z7QH:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("OUof"),n=s.extends(function Array(t,e,i){s.apply(this,["array",i]),this.items=e,this.shortForm=t});t.exports=n},Zj23:function(t,e){t.exports={is_NUM:function(){var t=this._input.charCodeAt(this.offset-1);return t>47&&t<58},is_LABEL:function(){var t=this._input.charCodeAt(this.offset-1);return t>96&&t<123||t>64&&t<91||95===t||t>47&&t<58||t>126},is_LABEL_START:function(){var t=this._input.charCodeAt(this.offset-1);return t>96&&t<123||t>64&&t<91||95===t||t>126},consume_LABEL:function(){for(;this.offset<this.size;){var t=this.input();if(!this.is_LABEL()){t&&this.unput(1);break}}return this},is_TOKEN:function(){var t=this._input[this.offset-1];return-1!==";:,.\\[]()|^&+-/*=%!~$<>?@".indexOf(t)},is_WHITESPACE:function(){var t=this._input[this.offset-1];return" "===t||"\t"===t||"\n"===t||"\r"===t},is_TABSPACE:function(){var t=this._input[this.offset-1];return" "===t||"\t"===t},consume_TABSPACE:function(){for(;this.offset<this.size;){var t=this.input();if(!this.is_TABSPACE()){t&&this.unput(1);break}}return this},is_HEX:function(){var t=this._input.charCodeAt(this.offset-1);return t>47&&t<58||t>64&&t<71||t>96&&t<103}}},Zki9:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function Nowdoc(t,e,i){s.apply(this,["nowdoc",t,i]),this.label=e});t.exports=n},"aH+v":function(t,e,i){"use strict";(function(e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
if("x64"==e.arch)var i=19,s="9223372036854775808";else i=10,s="2147483648";t.exports={consume_NUM:function(){var t=this.yytext[0],e="."===this.yytext[0];if("0"===t)if("x"===(t=this.input())||"X"===t){if(t=this.input(),this.is_HEX())return this.consume_HNUM();this.unput(t?2:1)}else if("b"===t||"B"===t){if("0"===(t=this.input())||"1"===t)return this.consume_BNUM();this.unput(t?2:1)}else this.is_NUM()||t&&this.unput(1);for(;this.offset<this.size;)if(t=this.input(),!this.is_NUM()){if("."!==t||e){if("e"===t||"E"===t){if("+"===(t=this.input())||"-"===t){if(t=this.input(),this.is_NUM())return this.consume_LNUM(),this.tok.T_DNUMBER;this.unput(t?3:2);break}if(this.is_NUM())return this.consume_LNUM(),this.tok.T_DNUMBER;this.unput(t?2:1);break}t&&this.unput(1);break}e=!0}return e?this.tok.T_DNUMBER:this.yytext.length<i-1?this.tok.T_LNUMBER:this.yytext.length<i||this.yytext.length==i&&this.yytext<s?this.tok.T_LNUMBER:this.tok.T_DNUMBER},consume_HNUM:function(){for(;this.offset<this.size;){var t=this.input();if(!this.is_HEX()){t&&this.unput(1);break}}return this.tok.T_LNUMBER},consume_LNUM:function(){for(;this.offset<this.size;){var t=this.input();if(!this.is_NUM()){t&&this.unput(1);break}}return this.tok.T_LNUMBER},consume_BNUM:function(){for(var t;this.offset<this.size;)if("0"!==(t=this.input())&&"1"!==t){t&&this.unput(1);break}return this.tok.T_LNUMBER}}}).call(this,i("8oxB"))},aiae:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function Doc(t,e,i){s.apply(this,["doc",i]),this.isDoc=t,this.lines=e});t.exports=n},bBK1:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function Statement(t,e){s.apply(this,[t||"statement",e])});t.exports=n},bd7Q:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("2Oh0"),n=s.extends(function Program(t,e,i){s.apply(this,["program",t,i]),this.errors=e});t.exports=n},c0hq:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("H/kz"),n=s.extends(function Cast(t,e,i){s.apply(this,["cast",i]),this.type=t,this.what=e});t.exports=n},dLKy:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Try(t,e,i,n){s.apply(this,["try",n]),this.body=t,this.catches=e,this.always=i});t.exports=n},dQhk:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function Constant(t,e,i){s.apply(this,["constant",t,i]),this.value=e});t.exports=n},dgHh:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function _Function(t,e,i,n,h,r){s.apply(this,["function",t,r]),this.arguments=e,this.byref=i,this.type=n,this.nullable=h,this.body=null});t.exports=n},doC9:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function While(t,e,i,n){s.apply(this,["while",n]),this.test=t,this.body=e,this.shortForm=i});t.exports=n},e3Qi:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("eK7t"),n=s.extends(function Encapsed(t,e,i){s.apply(this,["encapsed",t,i]),this.type=e});n.TYPE_STRING="string",n.TYPE_SHELL="shell",n.TYPE_HEREDOC="heredoc",n.TYPE_OFFSET="offset",t.exports=n},eK7t:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("OUof"),n=s.extends(function Literal(t,e,i){s.apply(this,[t||"literal",i]),this.value=e});t.exports=n},eWrd:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("udbD"),n=s.extends(function Label(t,e){s.apply(this,["label",e]),this.name=t});t.exports=n},"fz+3":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={T_COMMENT:function(){for(;this.offset<this.size;){var t=this.input();if("\n"===t||"\r"===t)return this.tok.T_COMMENT;if("?"===t&&!this.aspTagMode&&">"===this._input[this.offset])return this.unput(1),this.tok.T_COMMENT;if("%"===t&&this.aspTagMode&&">"===this._input[this.offset])return this.unput(1),this.tok.T_COMMENT}return this.tok.T_COMMENT},T_DOC_COMMENT:function(){var t=this.input(),e=this.tok.T_COMMENT;if("*"===t){if(t=this.input(),this.is_WHITESPACE()&&(e=this.tok.T_DOC_COMMENT),"/"===t)return e;this.unput(1)}for(;this.offset<this.size;)if("*"===(t=this.input())&&"/"===this._input[this.offset]){this.input();break}return e}}},hJk2:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("OUof"),n=s.extends(function Variable(t,e,i,n){s.apply(this,["variable",n]),this.name=t,this.byref=e||!1,this.curly=i||!1});t.exports=n},hWlC:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={values:{101:"T_HALT_COMPILER",102:"T_USE",103:"T_ENCAPSED_AND_WHITESPACE",104:"T_OBJECT_OPERATOR",105:"T_STRING",106:"T_DOLLAR_OPEN_CURLY_BRACES",107:"T_STRING_VARNAME",108:"T_CURLY_OPEN",109:"T_NUM_STRING",110:"T_ISSET",111:"T_EMPTY",112:"T_INCLUDE",113:"T_INCLUDE_ONCE",114:"T_EVAL",115:"T_REQUIRE",116:"T_REQUIRE_ONCE",117:"T_NAMESPACE",118:"T_NS_SEPARATOR",119:"T_AS",120:"T_IF",121:"T_ENDIF",122:"T_WHILE",123:"T_DO",124:"T_FOR",125:"T_SWITCH",126:"T_BREAK",127:"T_CONTINUE",128:"T_RETURN",129:"T_GLOBAL",130:"T_STATIC",131:"T_ECHO",132:"T_INLINE_HTML",133:"T_UNSET",134:"T_FOREACH",135:"T_DECLARE",136:"T_TRY",137:"T_THROW",138:"T_GOTO",139:"T_FINALLY",140:"T_CATCH",141:"T_ENDDECLARE",142:"T_LIST",143:"T_CLONE",144:"T_PLUS_EQUAL",145:"T_MINUS_EQUAL",146:"T_MUL_EQUAL",147:"T_DIV_EQUAL",148:"T_CONCAT_EQUAL",149:"T_MOD_EQUAL",150:"T_AND_EQUAL",151:"T_OR_EQUAL",152:"T_XOR_EQUAL",153:"T_SL_EQUAL",154:"T_SR_EQUAL",155:"T_INC",156:"T_DEC",157:"T_BOOLEAN_OR",158:"T_BOOLEAN_AND",159:"T_LOGICAL_OR",160:"T_LOGICAL_AND",161:"T_LOGICAL_XOR",162:"T_SL",163:"T_SR",164:"T_IS_IDENTICAL",165:"T_IS_NOT_IDENTICAL",166:"T_IS_EQUAL",167:"T_IS_NOT_EQUAL",168:"T_IS_SMALLER_OR_EQUAL",169:"T_IS_GREATER_OR_EQUAL",170:"T_INSTANCEOF",171:"T_INT_CAST",172:"T_DOUBLE_CAST",173:"T_STRING_CAST",174:"T_ARRAY_CAST",175:"T_OBJECT_CAST",176:"T_BOOL_CAST",177:"T_UNSET_CAST",178:"T_EXIT",179:"T_PRINT",180:"T_YIELD",181:"T_YIELD_FROM",182:"T_FUNCTION",183:"T_DOUBLE_ARROW",184:"T_DOUBLE_COLON",185:"T_ARRAY",186:"T_CALLABLE",187:"T_CLASS",188:"T_ABSTRACT",189:"T_TRAIT",190:"T_FINAL",191:"T_EXTENDS",192:"T_INTERFACE",193:"T_IMPLEMENTS",194:"T_VAR",195:"T_PUBLIC",196:"T_PROTECTED",197:"T_PRIVATE",198:"T_CONST",199:"T_NEW",200:"T_INSTEADOF",201:"T_ELSEIF",202:"T_ELSE",203:"T_ENDSWITCH",204:"T_CASE",205:"T_DEFAULT",206:"T_ENDFOR",207:"T_ENDFOREACH",208:"T_ENDWHILE",209:"T_CONSTANT_ENCAPSED_STRING",210:"T_LNUMBER",211:"T_DNUMBER",212:"T_LINE",213:"T_FILE",214:"T_DIR",215:"T_TRAIT_C",216:"T_METHOD_C",217:"T_FUNC_C",218:"T_NS_C",219:"T_START_HEREDOC",220:"T_END_HEREDOC",221:"T_CLASS_C",222:"T_VARIABLE",223:"T_OPEN_TAG",224:"T_OPEN_TAG_WITH_ECHO",225:"T_CLOSE_TAG",226:"T_WHITESPACE",227:"T_COMMENT",228:"T_DOC_COMMENT",229:"T_ELLIPSIS",230:"T_COALESCE",231:"T_POW",232:"T_POW_EQUAL",233:"T_SPACESHIP"},names:{T_HALT_COMPILER:101,T_USE:102,T_ENCAPSED_AND_WHITESPACE:103,T_OBJECT_OPERATOR:104,T_STRING:105,T_DOLLAR_OPEN_CURLY_BRACES:106,T_STRING_VARNAME:107,T_CURLY_OPEN:108,T_NUM_STRING:109,T_ISSET:110,T_EMPTY:111,T_INCLUDE:112,T_INCLUDE_ONCE:113,T_EVAL:114,T_REQUIRE:115,T_REQUIRE_ONCE:116,T_NAMESPACE:117,T_NS_SEPARATOR:118,T_AS:119,T_IF:120,T_ENDIF:121,T_WHILE:122,T_DO:123,T_FOR:124,T_SWITCH:125,T_BREAK:126,T_CONTINUE:127,T_RETURN:128,T_GLOBAL:129,T_STATIC:130,T_ECHO:131,T_INLINE_HTML:132,T_UNSET:133,T_FOREACH:134,T_DECLARE:135,T_TRY:136,T_THROW:137,T_GOTO:138,T_FINALLY:139,T_CATCH:140,T_ENDDECLARE:141,T_LIST:142,T_CLONE:143,T_PLUS_EQUAL:144,T_MINUS_EQUAL:145,T_MUL_EQUAL:146,T_DIV_EQUAL:147,T_CONCAT_EQUAL:148,T_MOD_EQUAL:149,T_AND_EQUAL:150,T_OR_EQUAL:151,T_XOR_EQUAL:152,T_SL_EQUAL:153,T_SR_EQUAL:154,T_INC:155,T_DEC:156,T_BOOLEAN_OR:157,T_BOOLEAN_AND:158,T_LOGICAL_OR:159,T_LOGICAL_AND:160,T_LOGICAL_XOR:161,T_SL:162,T_SR:163,T_IS_IDENTICAL:164,T_IS_NOT_IDENTICAL:165,T_IS_EQUAL:166,T_IS_NOT_EQUAL:167,T_IS_SMALLER_OR_EQUAL:168,T_IS_GREATER_OR_EQUAL:169,T_INSTANCEOF:170,T_INT_CAST:171,T_DOUBLE_CAST:172,T_STRING_CAST:173,T_ARRAY_CAST:174,T_OBJECT_CAST:175,T_BOOL_CAST:176,T_UNSET_CAST:177,T_EXIT:178,T_PRINT:179,T_YIELD:180,T_YIELD_FROM:181,T_FUNCTION:182,T_DOUBLE_ARROW:183,T_DOUBLE_COLON:184,T_ARRAY:185,T_CALLABLE:186,T_CLASS:187,T_ABSTRACT:188,T_TRAIT:189,T_FINAL:190,T_EXTENDS:191,T_INTERFACE:192,T_IMPLEMENTS:193,T_VAR:194,T_PUBLIC:195,T_PROTECTED:196,T_PRIVATE:197,T_CONST:198,T_NEW:199,T_INSTEADOF:200,T_ELSEIF:201,T_ELSE:202,T_ENDSWITCH:203,T_CASE:204,T_DEFAULT:205,T_ENDFOR:206,T_ENDFOREACH:207,T_ENDWHILE:208,T_CONSTANT_ENCAPSED_STRING:209,T_LNUMBER:210,T_DNUMBER:211,T_LINE:212,T_FILE:213,T_DIR:214,T_TRAIT_C:215,T_METHOD_C:216,T_FUNC_C:217,T_NS_C:218,T_START_HEREDOC:219,T_END_HEREDOC:220,T_CLASS_C:221,T_VARIABLE:222,T_OPEN_TAG:223,T_OPEN_TAG_WITH_ECHO:224,T_CLOSE_TAG:225,T_WHITESPACE:226,T_COMMENT:227,T_DOC_COMMENT:228,T_ELLIPSIS:229,T_COALESCE:230,T_POW:231,T_POW_EQUAL:232,T_SPACESHIP:233}}},hlET:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("H/kz"),n=s.extends(function Pre(t,e,i){s.apply(this,["pre",i]),this.type=t,this.what=e});t.exports=n},i6Ck:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("Oa93"),n=s.extends(function Empty(t,e){s.apply(this,["empty",t,e])});t.exports=n},j8Ut:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={is_reference:function(){return"&"==this.token&&(this.next().ignoreComments(),!0)},is_variadic:function(){return this.token===this.tok.T_ELLIPSIS&&(this.next().ignoreComments(),!0)},read_function:function(t,e){var i=this.read_function_declaration(t?1:e?2:0,e&&1===e[1]);return e&&1==e[2]?(i.parseFlags(e),this.expect(";")&&this.nextWithComments()):(this.expect("{")&&(i.body=this.read_code_block(!1),i.loc&&i.body.loc&&(i.loc.end=i.body.loc.end)),!t&&e&&i.parseFlags(e)),i},read_function_declaration:function(t,e){var i="function";1===t?i="closure":2===t&&(i="method");var s=this.node(i);this.expect(this.tok.T_FUNCTION)&&this.next().ignoreComments();var n=this.is_reference(),h=!1,r=[],o=null,_=!1;1!==t&&(2===t?this.token===this.tok.T_STRING||this.php7&&this.is("IDENTIFIER")?(h=this.text(),this.next()):this.error("IDENTIFIER"):(this.expect(this.tok.T_STRING)&&(h=this.text()),this.next())),this.expect("(")&&this.next();var a=this.read_parameter_list();return this.expect(")")&&this.next(),1===t&&this.token===this.tok.T_USE&&(this.next().expect("(")&&this.next(),r=this.read_list(this.read_lexical_var,","),this.expect(")")&&this.next()),":"===this.token&&("?"===this.next().token&&(_=!0,this.next()),o=this.read_type()),1===t?s(a,n,r,o,_,e):s(h,a,n,o,_)},read_lexical_var:function(){var t=this.node("variable"),e=!1;"&"===this.token&&(e=!0,this.next()),this.expect(this.tok.T_VARIABLE);var i=this.text().substring(1);return this.next(),t(i,e,!1)},read_parameter_list:function(){var t=[];if(")"!=this.token)for(;this.token!=this.EOF;){if(t.push(this.read_parameter()),","!=this.token){if(")"==this.token)break;this.error([",",")"]);break}this.next()}return t},read_parameter:function(){var t,e=this.node("parameter"),i=null,s=null,n=!1;"?"===this.token&&(this.next(),n=!0),t=this.read_type(),n&&!t&&this.raiseError("Expecting a type definition combined with nullable operator");var h=this.is_reference(),r=this.is_variadic();return this.expect(this.tok.T_VARIABLE)&&(i=this.text().substring(1),this.next()),"="==this.token&&(s=this.next().read_expr()),e(i,t,s,h,r,n)},read_function_argument_list:function(){var t=[],e=!1;if(this.expect("(")&&this.next(),")"!==this.token)for(;this.token!=this.EOF;){var i=this.read_argument_list();if(i&&(t.push(i),"variadic"===i.kind?e=!0:e&&this.raiseError("Unexpected argument after a variadic argument")),","!==this.token)break;this.next()}return this.expect(")")&&this.next(),t},read_argument_list:function(){return this.token===this.tok.T_ELLIPSIS?this.node("variadic")(this.next().read_expr()):this.read_expr()},read_type:function(){var t=this.node("identifier");switch(this.token){case this.tok.T_ARRAY:return this.next(),t(["","array"],!1);case this.tok.T_NAMESPACE:case this.tok.T_NS_SEPARATOR:case this.tok.T_STRING:return this.read_namespace_name();case this.tok.T_CALLABLE:return this.next(),t(["","callable"],!1);default:return null}}}},jgGf:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function TraitAlias(t,e,i,n,h){s.apply(this,["traitalias",h]),this.trait=t,this.method=e,this.as=i,n?0===n[0]?this.visibility="public":1===n[0]?this.visibility="protected":this.visibility="private":this.visibility=null});t.exports=n},jhm9:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Declaration(t,e,i){s.apply(this,[t||"declaration",i]),this.name=e});n.prototype.parseFlags=function(t){this.isAbstract=1===t[2],this.isFinal=2===t[2],"class"!==this.kind&&(0===t[0]?this.visibility="public":1===t[0]?this.visibility="protected":2===t[0]&&(this.visibility="private"),this.isStatic=1===t[1])},t.exports=n},kFt3:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("udbD"),n=s.extends(function Continue(t,e){s.apply(this,["continue",e]),this.level=t});t.exports=n},karW:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("bBK1"),n=s.extends(function Eval(t,e){s.apply(this,["eval",e]),this.source=t});t.exports=n},"l4U+":function(t,e,i){(function(e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("rvII"),n=i("tHF3"),h=i("hWlC"),r=i("2MMa");var o=function(t){if("function"==typeof this)return new this(t);this.tokens=h,this.lexer=new s(this),this.ast=new r,this.parser=new n(this.lexer,this.ast),t&&"object"==typeof t&&(t.parser&&!1===t.parser.php7&&(t.lexer||(t.lexer={}),t.lexer.php7=!1),function combine(t,e){for(var i=Object.keys(t),s=i.length;s--;){var n=i[s],h=t[n];null===h?delete e[n]:"function"==typeof h?e[n]=h.bind(e):Array.isArray(h)?e[n]=Array.isArray(e[n])?e[n].concat(h):h:e[n]="object"==typeof h&&"object"==typeof e[n]?combine(h,e[n]):h}return e}(t,this))},_=function(t){return e.isBuffer(t)?t.toString():t};o.create=function(t){return new o(t)},o.parseEval=function(t,e){return new o(e).parseEval(t)},o.prototype.parseEval=function(t){return this.lexer.mode_eval=!0,this.lexer.all_tokens=!1,t=_(t),this.parser.parse(t,"eval")},o.parseCode=function(t,e,i){return"object"==typeof e&&(i=e,e="unknown"),new o(i).parseCode(t,e)},o.prototype.parseCode=function(t,e){return this.lexer.mode_eval=!1,this.lexer.all_tokens=!1,t=_(t),this.parser.parse(t,e)},o.tokenGetAll=function(t,e){return new o(e).tokenGetAll(t)},o.prototype.tokenGetAll=function(t){this.lexer.mode_eval=!1,this.lexer.all_tokens=!0,t=_(t);var e=this.lexer.EOF,i=this.tokens.values;this.lexer.setInput(t);for(var s=this.lexer.lex()||e,n=[];s!=e;){var h=this.lexer.yytext;i.hasOwnProperty(s)&&(h=[i[s],h,this.lexer.yylloc.first_line]),n.push(h),s=this.lexer.lex()||e}return n},t.exports=o}).call(this,i("tjlA").Buffer)},n1bU:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("udbD"),n=s.extends(function TraitUse(t,e,i){s.apply(this,["traituse",i]),this.traits=t,this.adaptations=e});t.exports=n},nMsE:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("OUof"),n=s.extends(function ConstRef(t,e){s.apply(this,["constref",e]),this.name=t});t.exports=n},nhwT:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Catch(t,e,i,n){s.apply(this,["catch",n]),this.body=t,this.what=e,this.variable=i});t.exports=n},nnHk:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("dQhk"),n=s.extends(function ClassConstant(t,e,i,n){s.apply(this,[t,e,n]),this.kind="classconstant",this.parseFlags(i)});t.exports=n},"p/f8":function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("udbD"),n=s.extends(function Case(t,e,i){s.apply(this,["case",i]),this.test=t,this.body=e});t.exports=n},p880:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Closure(t,e,i,n,h,r,o){s.apply(this,["closure",o]),this.uses=i,this.arguments=t,this.byref=e,this.type=n,this.nullable=h,this.isStatic=r||!1,this.body=null});t.exports=n},pP5F:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("udbD"),n=s.extends(function Break(t,e){s.apply(this,["break",e]),this.level=t});t.exports=n},qR2B:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Static(t,e){s.apply(this,["static",e]),this.items=t});t.exports=n},qtjX:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("OUof"),n=s.extends(function Variadic(t,e){s.apply(this,["variadic",e]),this.what=t});t.exports=n},rvII:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=function(t){this.engine=t,this.tok=this.engine.tokens.names,this.EOF=1,this.debug=!1,this.all_tokens=!0,this.comment_tokens=!1,this.mode_eval=!1,this.asp_tags=!1,this.short_tags=!0,this.php7=!0,this.yyprevcol=0,this.keywords={__class__:this.tok.T_CLASS_C,__trait__:this.tok.T_TRAIT_C,__function__:this.tok.T_FUNC_C,__method__:this.tok.T_METHOD_C,__line__:this.tok.T_LINE,__file__:this.tok.T_FILE,__dir__:this.tok.T_DIR,__namespace__:this.tok.T_NS_C,exit:this.tok.T_EXIT,die:this.tok.T_EXIT,function:this.tok.T_FUNCTION,const:this.tok.T_CONST,return:this.tok.T_RETURN,try:this.tok.T_TRY,catch:this.tok.T_CATCH,finally:this.tok.T_FINALLY,throw:this.tok.T_THROW,if:this.tok.T_IF,elseif:this.tok.T_ELSEIF,endif:this.tok.T_ENDIF,else:this.tok.T_ELSE,while:this.tok.T_WHILE,endwhile:this.tok.T_ENDWHILE,do:this.tok.T_DO,for:this.tok.T_FOR,endfor:this.tok.T_ENDFOR,foreach:this.tok.T_FOREACH,endforeach:this.tok.T_ENDFOREACH,declare:this.tok.T_DECLARE,enddeclare:this.tok.T_ENDDECLARE,instanceof:this.tok.T_INSTANCEOF,as:this.tok.T_AS,switch:this.tok.T_SWITCH,endswitch:this.tok.T_ENDSWITCH,case:this.tok.T_CASE,default:this.tok.T_DEFAULT,break:this.tok.T_BREAK,continue:this.tok.T_CONTINUE,goto:this.tok.T_GOTO,echo:this.tok.T_ECHO,print:this.tok.T_PRINT,class:this.tok.T_CLASS,interface:this.tok.T_INTERFACE,trait:this.tok.T_TRAIT,extends:this.tok.T_EXTENDS,implements:this.tok.T_IMPLEMENTS,new:this.tok.T_NEW,clone:this.tok.T_CLONE,var:this.tok.T_VAR,eval:this.tok.T_EVAL,include:this.tok.T_INCLUDE,include_once:this.tok.T_INCLUDE_ONCE,require:this.tok.T_REQUIRE,require_once:this.tok.T_REQUIRE_ONCE,namespace:this.tok.T_NAMESPACE,use:this.tok.T_USE,insteadof:this.tok.T_INSTEADOF,global:this.tok.T_GLOBAL,isset:this.tok.T_ISSET,empty:this.tok.T_EMPTY,__halt_compiler:this.tok.T_HALT_COMPILER,static:this.tok.T_STATIC,abstract:this.tok.T_ABSTRACT,final:this.tok.T_FINAL,private:this.tok.T_PRIVATE,protected:this.tok.T_PROTECTED,public:this.tok.T_PUBLIC,unset:this.tok.T_UNSET,list:this.tok.T_LIST,array:this.tok.T_ARRAY,callable:this.tok.T_CALLABLE,or:this.tok.T_LOGICAL_OR,and:this.tok.T_LOGICAL_AND,xor:this.tok.T_LOGICAL_XOR},this.castKeywords={int:this.tok.T_INT_CAST,integer:this.tok.T_INT_CAST,real:this.tok.T_DOUBLE_CAST,double:this.tok.T_DOUBLE_CAST,float:this.tok.T_DOUBLE_CAST,string:this.tok.T_STRING_CAST,binary:this.tok.T_STRING_CAST,array:this.tok.T_ARRAY_CAST,object:this.tok.T_OBJECT_CAST,bool:this.tok.T_BOOL_CAST,boolean:this.tok.T_BOOL_CAST,unset:this.tok.T_UNSET_CAST}};s.prototype.setInput=function(t){return this._input=t,this.size=t.length,this.yylineno=1,this.offset=0,this.yyprevcol=0,this.yytext="",this.yylloc={first_offset:0,first_line:1,first_column:0,prev_offset:0,prev_line:1,prev_column:0,last_line:1,last_column:0},this.tokens=[],this.conditionStack=[],this.done=this.offset>=this.size,!this.all_tokens&&this.mode_eval?this.begin("ST_IN_SCRIPTING"):this.begin("INITIAL"),this},s.prototype.input=function(t){var e=this._input[this.offset];return e?(this.yytext+=e,this.offset++,"\r"===e&&"\n"===this._input[this.offset]&&(this.yytext+="\n",this.offset++),"\n"===e||"\r"===e?(this.yylloc.last_line=++this.yylineno,this.yyprevcol=this.yylloc.last_column,this.yylloc.last_column=0):this.yylloc.last_column++,e):""},s.prototype.unput=function(t){if(1===t)this.offset--,"\n"===this._input[this.offset]&&"\r"===this._input[this.offset-1]&&(this.offset--,t++),"\r"===this._input[this.offset]||"\n"===this._input[this.offset]?(this.yylloc.last_line--,this.yylineno--,this.yylloc.last_column=this.yyprevcol):this.yylloc.last_column--,this.yytext=this.yytext.substring(0,this.yytext.length-t);else if(t>0)if(this.offset-=t,t<this.yytext.length){this.yytext=this.yytext.substring(0,this.yytext.length-t),this.yylloc.last_line=this.yylloc.first_line,this.yylloc.last_column=this.yyprevcol=this.yylloc.first_column;for(var e=0;e<this.yytext.length;e++){var i=this.yytext[e];"\r"===i?(i=this.yytext[++e],this.yyprevcol=this.yylloc.last_column,this.yylloc.last_line++,this.yylloc.last_column=0,"\n"!==i&&("\r"===i?this.yylloc.last_line++:this.yylloc.last_column++)):"\n"===i?(this.yyprevcol=this.yylloc.last_column,this.yylloc.last_line++,this.yylloc.last_column=0):this.yylloc.last_column++}this.yylineno=this.yylloc.last_line}else this.yytext="",this.yylloc.last_line=this.yylineno=this.yylloc.first_line,this.yylloc.last_column=this.yylloc.first_column;return this},s.prototype.tryMatch=function(t){return t===this.ahead(t.length)},s.prototype.tryMatchCaseless=function(t){return t===this.ahead(t.length).toLowerCase()},s.prototype.ahead=function(t){var e=this._input.substring(this.offset,this.offset+t);return"\r"===e[e.length-1]&&"\n"===this._input[this.offset+t+1]&&(e+="\n"),e},s.prototype.consume=function(t){for(var e=0;e<t;e++){var i=this._input[this.offset];if(!i)break;this.yytext+=i,this.offset++,"\r"===i&&"\n"===this._input[this.offset]&&(this.yytext+="\n",this.offset++,e++),"\n"===i||"\r"===i?(this.yylloc.last_line=++this.yylineno,this.yyprevcol=this.yylloc.last_column,this.yylloc.last_column=0):this.yylloc.last_column++}return this},s.prototype.getState=function(){return{yytext:this.yytext,offset:this.offset,yylineno:this.yylineno,yyprevcol:this.yyprevcol,yylloc:{first_offset:this.yylloc.first_offset,first_line:this.yylloc.first_line,first_column:this.yylloc.first_column,last_line:this.yylloc.last_line,last_column:this.yylloc.last_column}}},s.prototype.setState=function(t){return this.yytext=t.yytext,this.offset=t.offset,this.yylineno=t.yylineno,this.yyprevcol=t.yyprevcol,this.yylloc=t.yylloc,this},s.prototype.appendToken=function(t,e){return this.tokens.push([t,e]),this},s.prototype.lex=function(){this.yylloc.prev_offset=this.offset,this.yylloc.prev_line=this.yylloc.last_line,this.yylloc.prev_column=this.yylloc.last_column;var t=this.next()||this.lex();if(!this.all_tokens){for(;t===this.tok.T_WHITESPACE||!this.comment_tokens&&(t===this.tok.T_COMMENT||t===this.tok.T_DOC_COMMENT)||t===this.tok.T_OPEN_TAG;)t=this.next()||this.lex();if(!this.mode_eval&&t==this.tok.T_OPEN_TAG_WITH_ECHO)return this.tok.T_ECHO}return this.yylloc.prev_offset||(this.yylloc.prev_offset=this.yylloc.first_offset,this.yylloc.prev_line=this.yylloc.first_line,this.yylloc.prev_column=this.yylloc.first_column),t},s.prototype.begin=function(t){if(this.conditionStack.push(t),this.curCondition=t,this.stateCb=this["match"+t],"function"!=typeof this.stateCb)throw new Error('Undefined condition state "'+t+'"');return this},s.prototype.popState=function(){var t=this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0];if(this.curCondition=this.conditionStack[this.conditionStack.length-1],this.stateCb=this["match"+this.curCondition],"function"!=typeof this.stateCb)throw new Error('Undefined condition state "'+this.curCondition+'"');return t},s.prototype.next=function(){var t;if(this._input||(this.done=!0),this.yylloc.first_offset=this.offset,this.yylloc.first_line=this.yylloc.last_line,this.yylloc.first_column=this.yylloc.last_column,this.yytext="",this.done)return this.yylloc.prev_offset=this.yylloc.first_offset,this.yylloc.prev_line=this.yylloc.first_line,this.yylloc.prev_column=this.yylloc.first_column,this.EOF;if(this.tokens.length>0?("object"==typeof(t=this.tokens.shift())[1]?this.setState(t[1]):this.consume(t[1]),t=t[0]):t=this.stateCb.apply(this,[]),this.offset>=this.size&&0===this.tokens.length&&(this.done=!0),this.debug){var e=t;e="number"==typeof e?this.engine.tokens.values[e]:'"'+e+'"';var i=new Error(e+"\tfrom "+this.yylloc.first_line+","+this.yylloc.first_column+"\t - to "+this.yylloc.last_line+","+this.yylloc.last_column+'\t"'+this.yytext+'"');console.log(i.stack)}return t},[i("fz+3"),i("sSlA"),i("aH+v"),i("+Dzo"),i("+Ks/"),i("H/SV"),i("LYHe"),i("Zj23")].forEach(function(t){for(var e in t)s.prototype[e]=t[e]}),t.exports=s},rxQz:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function If(t,e,i,n,h){s.apply(this,["if",h]),this.test=t,this.body=e,this.alternate=i,this.shortForm=n});t.exports=n},s1Hm:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("H/kz"),n=s.extends(function Bin(t,e,i,n){s.apply(this,["bin",n]),this.type=t,this.left=e,this.right=i});t.exports=n},sNwU:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("OUof"),n=s.extends(function Yield(t,e,i){s.apply(this,["yield",i]),this.value=t,this.key=e});t.exports=n},sRrQ:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Throw(t,e){s.apply(this,["throw",e]),this.what=t});t.exports=n},sSlA:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={nextINITIAL:function(){return this.conditionStack.length>1&&"INITIAL"===this.conditionStack[this.conditionStack.length-1]?this.popState():this.begin("ST_IN_SCRIPTING"),this},matchINITIAL:function(){for(;this.offset<this.size;){var t=this.input();if("<"==t)if("?"==(t=this.ahead(1))){if(this.tryMatch("?=")){this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO,3).nextINITIAL();break}if(this.tryMatchCaseless("?php")&&(" "===(t=this._input[this.offset+4])||"\t"===t||"\n"===t||"\r"===t)){this.unput(1).appendToken(this.tok.T_OPEN_TAG,6).nextINITIAL();break}if(this.short_tags){this.unput(1).appendToken(this.tok.T_OPEN_TAG,2).nextINITIAL();break}}else if(this.asp_tags&&"%"==t){if(this.tryMatch("%=")){this.aspTagMode=!0,this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO,3).nextINITIAL();break}this.aspTagMode=!0,this.unput(1).appendToken(this.tok.T_OPEN_TAG,2).nextINITIAL();break}}return this.yytext.length>0&&this.tok.T_INLINE_HTML}}},srsH:function(t,e){t.exports=function(t,e,i){this.source=t,this.start=e,this.end=i}},srtY:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function Interface(t,e,i,n){s.apply(this,["interface",t,n]),this.extends=e,this.body=i});t.exports=n},t3sD:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
t.exports={read_top_statements:function(){for(var t=[];this.token!==this.EOF&&"}"!==this.token;){var e=this.read_top_statement();e&&(Array.isArray(e)?t=t.concat(e):t.push(e))}return t},read_top_statement:function(){switch(this.token){case this.tok.T_FUNCTION:return this.read_function(!1,!1);case this.tok.T_ABSTRACT:case this.tok.T_FINAL:var t=this.read_class_scope();return this.token===this.tok.T_CLASS?this.read_class(t):(this.error(this.tok.T_CLASS),this.next(),null);case this.tok.T_CLASS:return this.read_class([0,0,0]);case this.tok.T_INTERFACE:return this.read_interface();case this.tok.T_TRAIT:return this.read_trait();case this.tok.T_USE:return this.read_use_statement();case this.tok.T_CONST:return this.next().read_const_list();case this.tok.T_NAMESPACE:return this.read_namespace();case this.tok.T_HALT_COMPILER:var e=this.node("halt");return this.next().expect("(")&&this.next(),this.expect(")")&&this.next(),this.expect(";"),this.lexer.done=!0,e(this.lexer._input.substring(this.lexer.offset));default:return this.read_statement()}},read_inner_statements:function(){for(var t=[];this.token!=this.EOF&&"}"!==this.token;){var e=this.read_inner_statement();e&&(Array.isArray(e)?t=t.concat(e):t.push(e))}return t},read_const_list:function(){var t=this.read_list(function(){this.expect(this.tok.T_STRING);var t=this.node("constant"),e=this.text();return this.next().expect("=")?t(e,this.next().read_expr()):t(e,null)},",",!1);return this.expectEndOfStatement(),t},read_declare_list:function(){for(var t={};this.token!=this.EOF&&")"!==this.token;){this.expect(this.tok.T_STRING);var e=this.text().toLowerCase();if(this.next().expect("=")?t[e]=this.next().read_expr():t[e]=null,","!==this.token)break;this.next()}return t},read_inner_statement:function(){switch(this.token){case this.tok.T_FUNCTION:return this.read_function(!1,!1);case this.tok.T_ABSTRACT:case this.tok.T_FINAL:var t=this.read_class_scope();return this.token===this.tok.T_CLASS?this.read_class(t):(this.error(this.tok.T_CLASS),this.next(),null);case this.tok.T_CLASS:return this.read_class([0,0,0]);case this.tok.T_INTERFACE:return this.read_interface();case this.tok.T_TRAIT:return this.read_trait();case this.tok.T_HALT_COMPILER:this.raiseError("__HALT_COMPILER() can only be used from the outermost scope");var e=this.node("halt");return this.next().expect("(")&&this.next(),this.expect(")")&&this.next(),e=e(this.lexer._input.substring(this.lexer.offset)),this.expect(";")&&this.next(),e;default:return this.read_statement()}},read_statement:function(){switch(this.token){case"{":return this.read_code_block(!1);case this.tok.T_IF:return this.next().read_if();case this.tok.T_SWITCH:return this.read_switch();case this.tok.T_FOR:return this.next().read_for();case this.tok.T_FOREACH:return this.next().read_foreach();case this.tok.T_WHILE:return this.next().read_while();case this.tok.T_DO:return this.next().read_do();case this.tok.T_COMMENT:return this.read_comment();case this.tok.T_DOC_COMMENT:return this.read_doc_comment();case this.tok.T_RETURN:var t=this.node("return"),e=null;return this.next().is("EOS")||(e=this.read_expr()),this.expectEndOfStatement(),t(e);case this.tok.T_BREAK:case this.tok.T_CONTINUE:t=this.node(this.token===this.tok.T_CONTINUE?"continue":"break");var i=null;return this.next(),";"!==this.token&&this.token!==this.tok.T_CLOSE_TAG&&(i=this.read_expr()),this.expectEndOfStatement(),t(i);case this.tok.T_GLOBAL:t=this.node("global");var s=this.next().read_list(this.read_simple_variable,",");return this.expectEndOfStatement(),t(s);case this.tok.T_STATIC:var n=[this.token,this.lexer.getState()];t=this.node("static");if(this.next().token===this.tok.T_DOUBLE_COLON){this.lexer.tokens.push(n);e=this.next().read_expr();return this.expect(";")&&this.nextWithComments(),e}if(this.token===this.tok.T_FUNCTION)return this.read_function(!0,[0,1,0]);s=this.read_variable_declarations();return this.expectEndOfStatement(),t(s);case this.tok.T_ECHO:t=this.node("echo");var h=this.next().read_list(this.read_expr,",");return this.expectEndOfStatement(),t(h);case this.tok.T_INLINE_HTML:t=this.node("inline");var r=this.text();return this.next(),t(r);case this.tok.T_UNSET:t=this.node("unset");this.next().expect("(")&&this.next();s=this.read_list(this.read_variable,",");return this.expect(")")&&this.next(),this.expect(";")&&this.nextWithComments(),t(s);case this.tok.T_DECLARE:t=this.node("declare");var o,_,a=[];if(this.next().expect("(")&&this.next(),o=this.read_declare_list(),this.expect(")")&&this.next(),":"===this.token){for(this.nextWithComments();this.token!=this.EOF&&this.token!==this.tok.T_ENDDECLARE;)a.push(this.read_top_statement());this.expect(this.tok.T_ENDDECLARE)&&this.next(),this.expectEndOfStatement(),_=this.ast.declare.MODE_SHORT}else if("{"===this.token){for(this.nextWithComments();this.token!=this.EOF&&"}"!==this.token;)a.push(this.read_top_statement());this.expect("}")&&this.next(),_=this.ast.declare.MODE_BLOCK}else{for(this.expect(";")&&this.nextWithComments();this.token!=this.EOF&&this.token!==this.tok.T_DECLARE;)a.push(this.read_top_statement());_=this.ast.declare.MODE_NONE}return t(o,a,_);case this.tok.T_TRY:return this.read_try();case this.tok.T_THROW:t=this.node("throw"),e=this.next().read_expr();return this.expectEndOfStatement(),t(e);case";":case this.tok.T_CLOSE_TAG:return this.next(),null;case this.tok.T_STRING:n=[this.token,this.lexer.getState()];var T=this.text();if(":"===this.next().token){t=this.node("label");return this.next(),t(T)}this.lexer.tokens.push(n);e=this.next().read_expr();return this.expectEndOfStatement(),e;case this.tok.T_GOTO:t=this.node("goto"),T=null;return this.next().expect(this.tok.T_STRING)&&(T=this.text(),this.next().expectEndOfStatement()),t(T);default:e=this.read_expr();return this.expectEndOfStatement(),e}},read_code_block:function(t){var e=this.node("block");this.expect("{")&&this.nextWithComments();var i=t?this.read_top_statements():this.read_inner_statements();return this.expect("}")&&this.nextWithComments(),e(null,i)}}},tHF3:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
function isNumber(t){return"."!=t&&","!=t&&!isNaN(parseFloat(t))&&isFinite(t)}var s=function(t,e){this.lexer=t,this.ast=e,this.tok=t.tok,this.EOF=t.EOF,this.token=null,this.prev=null,this.debug=!1,this.php7=!0,this.extractDoc=!1,this.suppressErrors=!1;var i=function(t){return[t,null]};this.entries={IDENTIFIER:new Map([this.tok.T_ABSTRACT,this.tok.T_ARRAY,this.tok.T_AS,this.tok.T_BREAK,this.tok.T_CALLABLE,this.tok.T_CASE,this.tok.T_CATCH,this.tok.T_CLASS,this.tok.T_CLASS_C,this.tok.T_CLONE,this.tok.T_CONST,this.tok.T_CONTINUE,this.tok.T_DECLARE,this.tok.T_DEFAULT,this.tok.T_DIR,this.tok.T_DO,this.tok.T_ECHO,this.tok.T_ELSE,this.tok.T_ELSEIF,this.tok.T_EMPTY,this.tok.T_ENDDECLARE,this.tok.T_ENDFOR,this.tok.T_ENDFOREACH,this.tok.T_ENDIF,this.tok.T_ENDSWITCH,this.tok.T_ENDWHILE,this.tok.T_EVAL,this.tok.T_EXIT,this.tok.T_EXTENDS,this.tok.T_FILE,this.tok.T_FINAL,this.tok.T_FINALLY,this.tok.T_FUNC_C,this.tok.T_FOR,this.tok.T_FOREACH,this.tok.T_FUNCTION,this.tok.T_GLOBAL,this.tok.T_GOTO,this.tok.T_IF,this.tok.T_IMPLEMENTS,this.tok.T_INCLUDE,this.tok.T_INCLUDE_ONCE,this.tok.T_INSTANCEOF,this.tok.T_INSTEADOF,this.tok.T_INTERFACE,this.tok.T_ISSET,this.tok.T_LINE,this.tok.T_LIST,this.tok.T_LOGICAL_AND,this.tok.T_LOGICAL_OR,this.tok.T_LOGICAL_XOR,this.tok.T_METHOD_C,this.tok.T_NAMESPACE,this.tok.T_NEW,this.tok.T_NS_C,this.tok.T_PRINT,this.tok.T_PRIVATE,this.tok.T_PROTECTED,this.tok.T_PUBLIC,this.tok.T_REQUIRE,this.tok.T_REQUIRE_ONCE,this.tok.T_RETURN,this.tok.T_STATIC,this.tok.T_SWITCH,this.tok.T_THROW,this.tok.T_TRAIT,this.tok.T_TRY,this.tok.T_UNSET,this.tok.T_USE,this.tok.T_VAR,this.tok.T_WHILE,this.tok.T_YIELD].map(i)),VARIABLE:new Map([this.tok.T_VARIABLE,"$","&",this.tok.T_NS_SEPARATOR,this.tok.T_STRING,this.tok.T_NAMESPACE,this.tok.T_STATIC].map(i)),SCALAR:new Map([this.tok.T_CONSTANT_ENCAPSED_STRING,this.tok.T_START_HEREDOC,this.tok.T_LNUMBER,this.tok.T_DNUMBER,this.tok.T_ARRAY,"[",this.tok.T_CLASS_C,this.tok.T_TRAIT_C,this.tok.T_FUNC_C,this.tok.T_METHOD_C,this.tok.T_LINE,this.tok.T_FILE,this.tok.T_DIR,this.tok.T_NS_C,'"','b"','B"',"-",this.tok.T_NS_SEPARATOR].map(i)),T_MAGIC_CONST:new Map([this.tok.T_CLASS_C,this.tok.T_TRAIT_C,this.tok.T_FUNC_C,this.tok.T_METHOD_C,this.tok.T_LINE,this.tok.T_FILE,this.tok.T_DIR,this.tok.T_NS_C].map(i)),T_MEMBER_FLAGS:new Map([this.tok.T_PUBLIC,this.tok.T_PRIVATE,this.tok.T_PROTECTED,this.tok.T_STATIC,this.tok.T_ABSTRACT,this.tok.T_FINAL].map(i)),EOS:new Map([";",this.tok.T_CLOSE_TAG,this.EOF,this.tok.T_INLINE_HTML].map(i)),EXPR:new Map(["@","-","+","!","~","(","`",this.tok.T_LIST,this.tok.T_CLONE,this.tok.T_INC,this.tok.T_DEC,this.tok.T_NEW,this.tok.T_ISSET,this.tok.T_EMPTY,this.tok.T_INCLUDE,this.tok.T_INCLUDE_ONCE,this.tok.T_REQUIRE,this.tok.T_REQUIRE_ONCE,this.tok.T_EVAL,this.tok.T_INT_CAST,this.tok.T_DOUBLE_CAST,this.tok.T_STRING_CAST,this.tok.T_ARRAY_CAST,this.tok.T_OBJECT_CAST,this.tok.T_BOOL_CAST,this.tok.T_UNSET_CAST,this.tok.T_EXIT,this.tok.T_PRINT,this.tok.T_YIELD,this.tok.T_STATIC,this.tok.T_FUNCTION,this.tok.T_VARIABLE,"$",this.tok.T_NS_SEPARATOR,this.tok.T_STRING,this.tok.T_STRING,this.tok.T_CONSTANT_ENCAPSED_STRING,this.tok.T_START_HEREDOC,this.tok.T_LNUMBER,this.tok.T_DNUMBER,this.tok.T_ARRAY,"[",this.tok.T_CLASS_C,this.tok.T_TRAIT_C,this.tok.T_FUNC_C,this.tok.T_METHOD_C,this.tok.T_LINE,this.tok.T_FILE,this.tok.T_DIR,this.tok.T_NS_C].map(i))}};s.prototype.getTokenName=function(t){return isNumber(t)?t==this.EOF?"the end of file (EOF)":this.lexer.engine.tokens.values[t]:"'"+t+"'"},s.prototype.parse=function(t,e){this._errors=[],this.filename=e||"eval",this.currentNamespace=[""],this.lexer.setInput(t),this.lexer.comment_tokens=this.extractDoc,this.length=this.lexer._input.length,this.innerList=!1;var i=this.ast.prepare("program",this),s=[];for(this.nextWithComments();this.token!=this.EOF;){var n=this.read_start();null!==n&&void 0!==n&&(Array.isArray(n)?s=s.concat(n):s.push(n))}return i(s,this._errors)},s.prototype.raiseError=function(t,e,i,s){if(t+=" on line "+this.lexer.yylloc.first_line,!this.suppressErrors){var n=new SyntaxError(t,this.filename,this.lexer.yylloc.first_line);throw n.lineNumber=this.lexer.yylloc.first_line,n.fileName=this.filename,n.columnNumber=this.lexer.yylloc.first_column,n}var h=this.ast.prepare("error",this)(t,s,this.lexer.yylloc.first_line,i);return this._errors.push(h),h},s.prototype.error=function(t){var e="Parse Error : syntax error";if(token=this.getTokenName(this.token),this.token!==this.EOF){if(isNumber(this.token)){var i=this.text();i.length>10&&(i=i.substring(0,7)+"..."),token="'"+i+"' ("+token+")"}e+=", unexpected "+token}var s="";return t&&!Array.isArray(t)&&((isNumber(t)||1===t.length)&&(s=", expecting "+this.getTokenName(t)),e+=s),this.token,this.EOF,this.raiseError(e,s,t,token)},s.prototype.node=function(t){return this.ast.prepare(t,this)},s.prototype.expectEndOfStatement=function(){if(";"===this.token)this.nextWithComments(),this.token===this.tok.T_CLOSE_TAG&&this.nextWithComments();else if(this.token===this.tok.T_CLOSE_TAG)this.nextWithComments();else if(this.token!==this.tok.T_INLINE_HTML&&this.token!==this.EOF)return this.error(";"),!1;return!0};var n=["parser.next","parser.ignoreComments","parser.nextWithComments"];s.prototype.showlog=function(){for(var t,e=(new Error).stack.split("\n"),i=2;i<e.length;i++){t=e[i].trim();for(var s=!1,h=0;h<n.length;h++)if(t.substring(3,3+n[h].length)===n[h]){s=!0;break}if(!s)break}return console.log("Line "+this.lexer.yylloc.first_line+" : "+this.getTokenName(this.token)+">"+this.lexer.yytext+"< @--\x3e"+t),this},s.prototype.expect=function(t){if(Array.isArray(t)){if(-1===t.indexOf(this.token))return this.error(t),!1}else if(this.token!=t)return this.error(t),!1;return!0},s.prototype.text=function(){return this.lexer.yytext},s.prototype.next=function(){return this.debug?(this.showlog(),this.debug=!1,this.nextWithComments().ignoreComments(),this.debug=!0):this.nextWithComments().ignoreComments(),this},s.prototype.ignoreComments=function(){for(this.debug&&this.showlog();this.token===this.tok.T_COMMENT||this.token===this.tok.T_DOC_COMMENT;)this.nextWithComments();return this},s.prototype.nextWithComments=function(){return this.prev=[this.lexer.yylloc.first_line,this.lexer.yylloc.first_column,this.lexer.offset],this.token=this.lexer.lex()||this.EOF,this.debug&&this.showlog(),this},s.prototype.is=function(t){return Array.isArray(t)?-1!==t.indexOf(this.token):this.entries[t].has(this.token)},[i("Mrvx"),i("7a2z"),i("7+Vf"),i("ysxf"),i("j8Ut"),i("MMSx"),i("58+V"),i("+GD5"),i("0+dJ"),i("3OJz"),i("t3sD"),i("JF3E"),i("QpOs"),i("GwKh"),i("Vppz")].forEach(function(t){for(var e in t)s.prototype[e]=t[e]}),t.exports=s},udbD:function(t,e){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var i=function Node(t,e){this.kind=t,e&&(this.loc=e)};i.extends=function(t){return t.prototype=Object.create(this.prototype),t.extends=this.extends,t.prototype.constructor=t,t},t.exports=i},vK0v:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("H/kz"),n=s.extends(function Post(t,e,i){s.apply(this,["post",i]),this.type=t,this.what=e});t.exports=n},xbji:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function Property(t,e,i,n){s.apply(this,["property",t,n]),this.value=e,this.parseFlags(i)});t.exports=n},yeBA:function(t,e){t.exports=function(t,e,i){this.line=t,this.column=e,this.offset=i}},ykJL:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("Oa93"),n=s.extends(function Isset(t,e){s.apply(this,["isset",t,e])});t.exports=n},ysxf:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */t.exports={read_expr:function(){var t=this.node(),e=this.read_expr_item();if("|"===this.token)return t("bin","|",e,this.next().read_expr());if("&"===this.token)return t("bin","&",e,this.next().read_expr());if("^"===this.token)return t("bin","^",e,this.next().read_expr());if("."===this.token)return t("bin",".",e,this.next().read_expr());if("+"===this.token)return t("bin","+",e,this.next().read_expr());if("-"===this.token)return t("bin","-",e,this.next().read_expr());if("*"===this.token)return t("bin","*",e,this.next().read_expr());if("/"===this.token)return t("bin","/",e,this.next().read_expr());if("%"===this.token)return t("bin","%",e,this.next().read_expr());if(this.token===this.tok.T_POW)return t("bin","**",e,this.next().read_expr());if(this.token===this.tok.T_SL)return t("bin","<<",e,this.next().read_expr());if(this.token===this.tok.T_SR)return t("bin",">>",e,this.next().read_expr());if(this.token===this.tok.T_BOOLEAN_OR)return t("bin","||",e,this.next().read_expr());if(this.token===this.tok.T_LOGICAL_OR)return t("bin","or",e,this.next().read_expr());if(this.token===this.tok.T_BOOLEAN_AND)return t("bin","&&",e,this.next().read_expr());if(this.token===this.tok.T_LOGICAL_AND)return t("bin","and",e,this.next().read_expr());if(this.token===this.tok.T_LOGICAL_XOR)return t("bin","xor",e,this.next().read_expr());if(this.token===this.tok.T_IS_IDENTICAL)return t("bin","===",e,this.next().read_expr());if(this.token===this.tok.T_IS_NOT_IDENTICAL)return t("bin","!==",e,this.next().read_expr());if(this.token===this.tok.T_IS_EQUAL)return t("bin","==",e,this.next().read_expr());if(this.token===this.tok.T_IS_NOT_EQUAL)return t("bin","!=",e,this.next().read_expr());if("<"===this.token)return t("bin","<",e,this.next().read_expr());if(">"===this.token)return t("bin",">",e,this.next().read_expr());if(this.token===this.tok.T_IS_SMALLER_OR_EQUAL)return t("bin","<=",e,this.next().read_expr());if(this.token===this.tok.T_IS_GREATER_OR_EQUAL)return t("bin",">=",e,this.next().read_expr());if(this.token===this.tok.T_SPACESHIP)return t("bin","<=>",e,this.next().read_expr());if(this.token===this.tok.T_INSTANCEOF)return t("bin","instanceof",e,this.next().read_expr());if(this.token===this.tok.T_COALESCE)return t("bin","??",e,this.next().read_expr());if("?"===this.token){var i=null;return":"!==this.next().token&&(i=this.read_expr()),this.expect(":")&&this.next(),t("retif",e,i,this.read_expr())}return e},read_expr_item:function(){if("@"===this.token)return this.node("silent")(this.next().read_expr());if("+"===this.token)return this.node("unary")("+",this.next().read_expr());if("!"===this.token)return this.node("unary")("!",this.next().read_expr());if("~"===this.token)return this.node("unary")("~",this.next().read_expr());if("-"===this.token){var t=this.node();return this.next(),this.token===this.tok.T_LNUMBER||this.token===this.tok.T_DNUMBER?(t=t("number","-"+this.text()),this.next(),t):t("unary","-",this.read_expr())}if("("===this.token){var e=this.node("parenthesis"),i=this.next().read_expr();return this.expect(")")&&this.next(),i=e(i),this.token===this.tok.T_OBJECT_OPERATOR?this.recursive_variable_chain_scan(i,!1):this.token===this.tok.T_CURLY_OPEN||"["===this.token?this.read_dereferencable(i):"("===this.token?this.node("call")(i,this.read_function_argument_list()):i}if("`"===this.token)return this.next().read_encapsed_string("`");if(this.token===this.tok.T_LIST){t=this.node("list");var s=null,n=this.innerList;n||(s=this.node("assign")),this.next().expect("(")&&this.next(),this.innerList||(this.innerList=!0);for(var h=this.read_assignment_list(),r=!1,o=0;o<h.length;o++)if(null!==h[o]){r=!0;break}return r||this.raiseError("Fatal Error :  Cannot use empty list on line "+this.lexer.yylloc.first_line),this.expect(")")&&this.next(),n?t(h):(this.innerList=!1,this.expect("=")?s(t(h),this.next().read_expr(),"="):t(h))}if(this.token===this.tok.T_CLONE)return this.node("clone")(this.next().read_expr());switch(this.token){case this.tok.T_INC:return this.node("pre")("+",this.next().read_variable(!1,!1,!1));case this.tok.T_DEC:return this.node("pre")("-",this.next().read_variable(!1,!1,!1));case this.tok.T_NEW:return this.next().read_new_expr();case this.tok.T_ISSET:t=this.node("isset");this.next().expect("(")&&this.next();var _=this.read_list(this.read_expr,",");return this.expect(")")&&this.next(),t(_);case this.tok.T_EMPTY:t=this.node("empty");this.next().expect("(")&&this.next();var a=this.read_expr();return this.expect(")")&&this.next(),t([a]);case this.tok.T_INCLUDE:return this.node("include")(!1,!1,this.next().read_expr());case this.tok.T_INCLUDE_ONCE:return this.node("include")(!0,!1,this.next().read_expr());case this.tok.T_REQUIRE:return this.node("include")(!1,!0,this.next().read_expr());case this.tok.T_REQUIRE_ONCE:return this.node("include")(!0,!0,this.next().read_expr());case this.tok.T_EVAL:t=this.node("eval");this.next().expect("(")&&this.next();i=this.read_expr();return this.expect(")")&&this.next(),t(i);case this.tok.T_INT_CAST:return this.node("cast")("int",this.next().read_expr());case this.tok.T_DOUBLE_CAST:return this.node("cast")("float",this.next().read_expr());case this.tok.T_STRING_CAST:return this.node("cast")("string",this.next().read_expr());case this.tok.T_ARRAY_CAST:return this.node("cast")("array",this.next().read_expr());case this.tok.T_OBJECT_CAST:return this.node("cast")("object",this.next().read_expr());case this.tok.T_BOOL_CAST:return this.node("cast")("bool",this.next().read_expr());case this.tok.T_UNSET_CAST:return this.node("cast")("unset",this.next().read_expr());case this.tok.T_EXIT:t=this.node("exit");var T=null;return"("===this.next().token&&(")"!==this.next().token?(T=this.read_expr(),this.expect(")")&&this.next()):this.next()),t(T);case this.tok.T_PRINT:return this.node("print")(this.next().read_expr());case this.tok.T_YIELD:t=this.node("yield");var u=null,c=null;return this.next().is("EXPR")&&(u=this.read_expr(),this.token===this.tok.T_DOUBLE_ARROW&&(c=u,u=this.next().read_expr())),t(u,c);case this.tok.T_YIELD_FROM:return(t=this.node("yieldfrom"))(i=this.next().read_expr());case this.tok.T_FUNCTION:return this.read_function(!0);case this.tok.T_STATIC:var p=[this.token,this.lexer.getState()];if(this.next().token===this.tok.T_FUNCTION)return this.read_function(!0,[0,1,0]);this.lexer.tokens.push(p),this.next()}if(this.is("VARIABLE")){t=this.node();var f="constref"===(i=this.read_variable(!1,!1,!1)).kind||"staticlookup"===i.kind&&"constref"===i.offset.kind;switch(this.token){case"=":return f&&this.error("VARIABLE"),t("assign",i,"&"==this.next().token?this.next().token===this.tok.T_NEW?this.next().read_new_expr():this.read_variable(!1,!1,!0):this.read_expr(),"=");case this.tok.T_PLUS_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"+=");case this.tok.T_MINUS_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"-=");case this.tok.T_MUL_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"*=");case this.tok.T_POW_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"**=");case this.tok.T_DIV_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"/=");case this.tok.T_CONCAT_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),".=");case this.tok.T_MOD_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"%=");case this.tok.T_AND_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"&=");case this.tok.T_OR_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"|=");case this.tok.T_XOR_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"^=");case this.tok.T_SL_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),"<<=");case this.tok.T_SR_EQUAL:return f&&this.error("VARIABLE"),t("assign",i,this.next().read_expr(),">>=");case this.tok.T_INC:return f&&this.error("VARIABLE"),this.next(),t("post","+",i);case this.tok.T_DEC:return f&&this.error("VARIABLE"),this.next(),t("post","-",i)}}else if(this.is("SCALAR"))for(i=this.read_scalar();this.token!==this.EOF;)if(this.token===this.tok.T_OBJECT_OPERATOR)i=this.recursive_variable_chain_scan(i,!1);else if(this.token===this.tok.T_CURLY_OPEN||"["===this.token)i=this.read_dereferencable(i);else{if("("!==this.token)return i;i=this.node("call")(i,this.read_function_argument_list())}else this.error("EXPR"),this.next();return i},read_new_expr:function(){var t=this.node("new");if(this.token===this.tok.T_CLASS){var e=this.node("class"),i=null,s=null,n=null,h=[];return"("===this.next().token&&(h=this.read_function_argument_list()),this.token==this.tok.T_EXTENDS&&(i=this.next().read_namespace_name()),this.token==this.tok.T_IMPLEMENTS&&(s=this.next().read_name_list()),this.expect("{")&&(n=this.next().read_class_body()),t(e(null,i,s,n,[0,0,0]),h)}var r=this.read_class_name_reference();h=[];return"("===this.token&&(h=this.read_function_argument_list()),t(r,h)},read_class_name_reference:function(){if(this.token===this.tok.T_NS_SEPARATOR||this.token===this.tok.T_STRING||this.token===this.tok.T_NAMESPACE){var t=this.read_namespace_name();return this.token===this.tok.T_DOUBLE_COLON&&(t=this.read_static_getter(t)),t}if(this.is("VARIABLE"))return this.read_variable(!0,!1,!1);this.expect([this.tok.T_STRING,"VARIABLE"])},read_assignment_list:function(){return this.read_list(this.read_assignment_list_element,",")},read_assignment_list_element:function(){if(","===this.token||")"===this.token)return null;var t=this.read_expr_item();return this.token===this.tok.T_DOUBLE_ARROW&&(t=["key",t,this.next().read_expr_item()]),t}}},zZTU:function(t,e,i){
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */
var s=i("jhm9"),n=s.extends(function Parameter(t,e,i,n,h,r,o){s.apply(this,["parameter",t,o]),this.value=i,this.type=e,this.byref=n,this.variadic=h,this.nullable=r});t.exports=n},zuZZ:function(t,e,i){"use strict";
/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
 * @url http://glayzzle.com
 */var s=i("bBK1"),n=s.extends(function Foreach(t,e,i,n,h,r){s.apply(this,["foreach",r]),this.source=t,this.key=e,this.value=i,this.shortForm=h,this.body=n});t.exports=n}}]);