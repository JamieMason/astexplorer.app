(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{"10rB":function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_TEXT,c=o.TOKEN_COMMENT_START,T=n("rCpH"),a=T.OPEN_TAG_START_CONTEXT,u=T.CLOSE_TAG_CONTEXT,s=T.DOCTYPE_START_CONTEXT,E=T.COMMENT_CONTENT_CONTEXT,_="\x3c!--";function generateTextToken(t){var e=r(t,{keepBuffer:!1});return{type:i,content:t.accumulatedContent,startPosition:e.startPosition,endPosition:e.endPosition}}var d=/^<\w/;t.exports={parseSyntax:function parseSyntax(t,e,n){if(d.test(t))return function openingCornerBraceWithText(t,e){0!==t.accumulatedContent.length&&e.push(generateTextToken(t)),t.accumulatedContent=t.decisionBuffer,t.decisionBuffer="",t.currentContext=a,t.caretPosition++}(e,n);if("</"===t)return function openingCornerBraceWithSlash(t,e){0!==t.accumulatedContent.length&&e.push(generateTextToken(t)),t.accumulatedContent=t.decisionBuffer,t.decisionBuffer="",t.currentContext=u,t.caretPosition++}(e,n);if("<"!==t&&"<!"!==t&&"<!-"!==t){if(t===_)return function commentStart(t,e){0!==t.accumulatedContent.length&&e.push(generateTextToken(t));var n={startPosition:t.caretPosition-(_.length-1),endPosition:t.caretPosition};e.push({type:c,content:t.decisionBuffer,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=E,t.caretPosition++}(e,n);if(function isIncompleteDoctype(t){var e=t.toUpperCase();return"<!"===e||"<!D"===e||"<!DO"===e||"<!DOC"===e||"<!DOCT"===e||"<!DOCTY"===e||"<!DOCTYP"===e}(t))e.caretPosition++;else{if("<!DOCTYPE"===t.toUpperCase())return function doctypeStart(t,e){0!==t.accumulatedContent.length&&e.push(generateTextToken(t)),t.accumulatedContent=t.decisionBuffer,t.decisionBuffer="",t.currentContext=s,t.caretPosition++}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}else e.caretPosition++},handleContentEnd:function handleContentEnd(t,e){var n=t.accumulatedContent+t.decisionBuffer;if(0!==n.length){var o=r(t,{keepBuffer:!1});e.push({type:i,content:n,startPosition:o.startPosition,endPosition:o.endPosition})}}}},"1n3C":function(t,e,n){"use strict";var r=n("9lpN").isWhitespace,o=n("rCpH"),i=o.DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,c=o.DOCTYPE_ATTRIBUTE_BARE_CONTEXT,T=o.DOCTYPE_END_CONTEXT,a=n("zKIE").TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START;t.exports={parseSyntax:function parseSyntax(t,e,n){return'"'===t||"'"===t?function wrapper(t,e){var n=t.decisionBuffer;e.push({type:a,content:n,startPosition:t.caretPosition,endPosition:t.caretPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=i,t.contextParams[i]={wrapper:n},t.caretPosition++}(e,n):">"===t?function closingCornerBrace(t){t.accumulatedContent="",t.decisionBuffer="",t.currentContext=T}(e):r(t)?(e.decisionBuffer="",void e.caretPosition++):function bare(t){t.accumulatedContent=t.decisionBuffer,t.decisionBuffer="",t.currentContext=c,t.caretPosition++}(e)}}},"32rH":function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_DOCTYPE_END,i=r.TOKEN_DOCTYPE_ATTRIBUTE,c=r.TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,T=r.TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END;function getLastAttribute(t){var e=t.currentNode.content.attributes;return e[e.length-1]}t.exports=function doctypeAttribute(t,e){return t.type===o?function handleDoctypeEnd(t){return t.currentContext=t.currentContext.parentRef,t}(e):t.type===c?function handleAttributeWrapperStart(t,e){var n=getLastAttribute(t);return void 0!==n.start||void 0!==n.value?(t.currentContext=t.currentContext.parentRef,t):(n.startWrapper=e,t.caretPosition++,t)}(e,t):t.type===T?function handleAttributeWrapperEnd(t,e){return getLastAttribute(t).endWrapper=e,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t}(e,t):t.type===i?function handleAttributeValue(t,e){var n=getLastAttribute(t);return void 0!==n.value?(t.currentContext=t.currentContext.parentRef,t):(n.value=e,t.caretPosition++,t)}(e,t):(e.caretPosition++,e)}},"6t0O":function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE").TOKEN_DOCTYPE_END,i=n("rCpH").DATA_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){return function closingCornerBrace(t,e){var n=r(t,{keepBuffer:!0});e.push({type:o,content:t.decisionBuffer,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=i,t.caretPosition++}(e,n)}}},"7QZC":function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_OPEN_TAG_END,i=r.TOKEN_OPEN_TAG_END_SCRIPT,c=r.TOKEN_OPEN_TAG_END_STYLE,T=r.TOKEN_ATTRIBUTE_KEY,a=r.TOKEN_ATTRIBUTE_ASSIGNMENT,u=r.TOKEN_ATTRIBUTE_VALUE,s=r.TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,E=r.TOKEN_ATTRIBUTE_VALUE_WRAPPER_END;function getLastAttribute(t){var e=t.currentNode.content.attributes;return e[e.length-1]}t.exports=function attributeValue(t,e){return-1!==[o,i,c,T,a].indexOf(t.type)?function handleValueEnd(t){return t.currentContext=t.currentContext.parentRef,t}(e):t.type===u?function handleAttributeValue(t,e){return getLastAttribute(t).value=e,t.caretPosition++,t}(e,t):t.type===s?function handleAttributeValueWrapperStart(t,e){return getLastAttribute(t).startWrapper=e,t.caretPosition++,t}(e,t):t.type===E?function handleAttributeValueWrapperEnd(t,e){return getLastAttribute(t).endWrapper=e,t.caretPosition++,t}(e,t):(e.caretPosition++,e)}},"9iyN":function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,c=o.TOKEN_DOCTYPE_ATTRIBUTE,T=n("rCpH"),a=T.DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,u=T.DOCTYPE_ATTRIBUTES_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){if(t===e.contextParams[a].wrapper)return function wrapper(t,e){var n=r(t,{keepBuffer:!1}),o=n.endPosition+1;e.push({type:c,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition}),e.push({type:i,content:t.decisionBuffer,startPosition:o,endPosition:o}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=u,t.caretPosition++,t.contextParams[a]=void 0}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},"9lpN":function(t,e,n){"use strict";var r=/^<(\S+)/,o=/^<\/((?:.|\n)*)>$/;t.exports={prettyJSON:function prettyJSON(t){return JSON.stringify(t,null,2)},clearAst:function clearAst(t){var e=t;return delete e.parentRef,Array.isArray(t.content.children)&&(e.content.children=t.content.children.map((function(t){return clearAst(t)}))),e},parseOpenTagName:function parseOpenTagName(t){var e=t.match(r);if(null===e)throw new Error("Unable to parse open tag name.\n"+"".concat(t," does not match pattern of opening tag."));return e[1].toLowerCase()},parseCloseTagName:function parseCloseTagName(t){var e=t.match(o);if(null===e)throw new Error("Unable to parse close tag name.\n"+"".concat(t," does not match pattern of closing tag."));return e[1].trim().toLowerCase()},calculateTokenCharactersRange:function calculateTokenCharactersRange(t,e){var n=e.keepBuffer;if(void 0===n)throw new Error('Unable to calculate characters range for token.\n"keepBuffer" parameter is not specified to decide if the decision buffer is a part of characters range.');return{startPosition:t.caretPosition-(t.accumulatedContent.length-1)-t.decisionBuffer.length,endPosition:n?t.caretPosition:t.caretPosition-t.decisionBuffer.length}},isWhitespace:function isWhitespace(t){return" "===t||"\n"===t||"\t"===t}}},A9CG:function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_ATTRIBUTE_VALUE,c=o.TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,T=n("rCpH"),a=T.ATTRIBUTES_CONTEXT,u=T.ATTRIBUTE_VALUE_WRAPPED_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){if(t===e.contextParams[u].wrapper)return function wrapper(t,e){var n=r(t,{keepBuffer:!1}),o=n.endPosition+1;e.push({type:i,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition},{type:c,content:t.decisionBuffer,startPosition:o,endPosition:o}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=a,t.caretPosition++,t.contextParams[u]=void 0}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},Ce2h:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_OPEN_TAG_START_STYLE,i=r.TOKEN_OPEN_TAG_END_STYLE,c=r.TOKEN_CLOSE_TAG_STYLE,T=r.TOKEN_ATTRIBUTE_KEY,a=r.TOKEN_ATTRIBUTE_ASSIGNMENT,u=r.TOKEN_STYLE_TAG_CONTENT,s=n("XH7q").ATTRIBUTES_CONTEXT;t.exports=function styleTag(t,e){return t.type===o?function handleOpenTagStartStyle(t,e){return t.currentNode.content.openStart=e,t.caretPosition++,t}(e,t):-1!==[T,a].indexOf(t.type)?function handleAttributeStartStyle(t){return t.currentContext={parentRef:t.currentContext,type:s},t}(e):t.type===i?function handleOpenTagEndStyle(t,e){return t.currentNode.content.openEnd=e,t.caretPosition++,t}(e,t):t.type===u?function handleStyleContent(t,e){return t.currentNode.content.value=e,t.caretPosition++,t}(e,t):t.type===c?function handleCloseTagStyle(t,e){return t.currentNode.content.close=e,t.currentNode=t.currentNode.parentRef,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t}(e,t):(e.caretPosition++,e)}},DfsX:function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_OPEN_TAG_END,c=o.TOKEN_OPEN_TAG_END_SCRIPT,T=o.TOKEN_OPEN_TAG_END_STYLE,a=n("rCpH"),u=a.OPEN_TAG_END_CONTEXT,s=a.DATA_CONTEXT,E=a.SCRIPT_CONTENT_CONTEXT,_=a.STYLE_CONTENT_CONTEXT,d={script:c,style:T,default:i},f={script:E,style:_,default:s};t.exports={parseSyntax:function parseSyntax(t,e,n){if(">"===t)return function closingCornerBrace(t,e){var n=r(t,{keepBuffer:!0}),o=t.contextParams[u].tagName;e.push({type:d[o]||d.default,content:t.accumulatedContent+t.decisionBuffer,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=f[o]||f.default,t.caretPosition++,t.contextParams[u]=void 0}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},ESIZ:function(t,e,n){"use strict";var r=n("9lpN"),o=r.isWhitespace,i=r.calculateTokenCharactersRange,c=n("zKIE").TOKEN_DOCTYPE_ATTRIBUTE,T=n("rCpH").DOCTYPE_ATTRIBUTES_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){if(o(t)||">"===t)return function attributeEnd(t,e){var n=i(t,{keepBuffer:!1});e.push({type:c,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=T}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},Gmcr:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_OPEN_TAG_START,i=r.TOKEN_OPEN_TAG_END,c=r.TOKEN_CLOSE_TAG,T=r.TOKEN_ATTRIBUTE_KEY,a=r.TOKEN_ATTRIBUTE_ASSIGNMENT,u=n("XH7q"),s=u.TAG_NAME_CONTEXT,E=u.ATTRIBUTES_CONTEXT,_=u.TAG_CONTENT_CONTEXT;t.exports=function tag(t,e){return t.type===o?function handleOpenTagStart(t,e){return t.currentNode.content.openStart=e,t.currentContext={parentRef:t.currentContext,type:s},t}(e,t):-1!==[T,a].indexOf(t.type)?function handleAttributeStart(t){return t.currentContext={parentRef:t.currentContext,type:E},t}(e):t.type===i?function handleOpenTagEnd(t,e){var n=t.currentNode.content.name;return t.currentNode.content.openEnd=e,-1!==["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"].indexOf(n)?(t.currentNode.content.selfClosing=!0,t.currentNode=t.currentNode.parentRef,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t):(t.currentNode.content.selfClosing=!1,t.currentContext={parentRef:t.currentContext,type:_},t.caretPosition++,t)}(e,t):t.type===c?function handleCloseTag(t,e){return t.currentNode.content.close=e,t.currentNode=t.currentNode.parentRef,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t}(e,t):(e.caretPosition++,e)}},H9GS:function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE").TOKEN_CLOSE_TAG,i=n("rCpH").DATA_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){if(">"===t)return function closingCornerBrace(t,e){var n=r(t,{keepBuffer:!0});e.push({type:o,content:t.accumulatedContent+t.decisionBuffer,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=i,t.caretPosition++}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},HRD1:function(t,e,n){"use strict";var r=n("9lpN"),o=r.calculateTokenCharactersRange,i=r.isWhitespace,c=n("zKIE").TOKEN_ATTRIBUTE_VALUE,T=n("rCpH").ATTRIBUTES_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){if(i(t)||">"===t||"/"===t)return function valueEnd(t,e){var n=o(t,{keepBuffer:!1});e.push({type:c,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=T}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},MSBH:function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE").TOKEN_ATTRIBUTE_KEY,i=n("rCpH").ATTRIBUTES_CONTEXT;t.exports={parseSyntax:function parseSyntax(t,e,n){if(function isKeyBreak(t){return"="===t||" "===t||"\n"===t||"\t"===t||"/"===t||">"===t}(t))return function keyEnd(t,e){var n=r(t,{keepBuffer:!1});e.push({type:o,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=i}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}},S9VL:function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_COMMENT_END,c=o.TOKEN_COMMENT_CONTENT,T=n("rCpH").DATA_CONTEXT,a="--\x3e";t.exports={parseSyntax:function parseSyntax(t,e,n){if("-"!==t&&"--"!==t){if(t===a)return function commentEnd(t,e){var n=r(t,{keepBuffer:!1}),o={startPosition:n.endPosition+1,endPosition:n.endPosition+a.length};e.push({type:c,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition}),e.push({type:i,content:t.decisionBuffer,startPosition:o.startPosition,endPosition:o.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=T,t.caretPosition++}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}else e.caretPosition++}}},SvNB:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_OPEN_TAG_END,i=r.TOKEN_OPEN_TAG_END_SCRIPT,c=r.TOKEN_OPEN_TAG_END_STYLE,T=r.TOKEN_ATTRIBUTE_KEY,a=r.TOKEN_ATTRIBUTE_ASSIGNMENT,u=n("XH7q").ATTRIBUTE_VALUE_CONTEXT;function getLastAttribute(t){var e=t.currentNode.content.attributes;return e[e.length-1]}t.exports=function attribute(t,e){return-1!==[o,i,c].indexOf(t.type)?function handleOpenTagEnd(t){return t.currentContext=t.currentContext.parentRef,t}(e):t.type===T?function handleAttributeKey(t,e){var n=getLastAttribute(t);return void 0!==n.key||void 0!==n.value?(t.currentContext=t.currentContext.parentRef,t):(n.key=e,t.caretPosition++,t)}(e,t):t.type===a?function handleAttributeAssignment(t){return void 0!==getLastAttribute(t).value?(t.currentContext=t.currentContext.parentRef,t):(t.currentContext={parentRef:t.currentContext,type:u},t.caretPosition++,t)}(e):(e.caretPosition++,e)}},TV3l:function(t,e,n){"use strict";var r=n("9lpN").parseOpenTagName,o=n("zKIE").TOKEN_OPEN_TAG_START;t.exports=function tagName(t,e){return t.type===o&&function handleTagOpenStart(t,e){return t.currentNode.content.name=r(e.content),t.currentContext=t.currentContext.parentRef,t}(e,t),e.caretPosition++,e}},UV3t:function(t,e,n){"use strict";var r=n("9lpN").parseCloseTagName,o=n("zKIE"),i=o.TOKEN_OPEN_TAG_START,c=o.TOKEN_CLOSE_TAG,T=o.TOKEN_COMMENT_START,a=o.TOKEN_DOCTYPE_START,u=o.TOKEN_TEXT,s=o.TOKEN_OPEN_TAG_START_SCRIPT,E=o.TOKEN_OPEN_TAG_START_STYLE,_=n("XH7q"),d=_.TAG_CONTEXT,f=_.COMMENT_CONTEXT,p=_.DOCTYPE_CONTEXT,N=_.SCRIPT_TAG_CONTEXT,C=_.STYLE_TAG_CONTEXT,O=n("n2Zu"),P=O.NODE_TAG,l=O.NODE_TEXT,A=O.NODE_DOCTYPE,R=O.NODE_COMMENT,x=O.NODE_SCRIPT,S=O.NODE_STYLE;t.exports=function tagContent(t,e){return t.type===i?function handleOpenTagStart(t){void 0===t.currentNode.content.children&&(t.currentNode.content.children=[]);var e={nodeType:P,parentRef:t.currentNode,content:{}};return t.currentNode.content.children.push(e),t.currentNode=e,t.currentContext={parentRef:t.currentContext,type:d},t}(e):t.type===u?function handleText(t,e){void 0===t.currentNode.content.children&&(t.currentNode.content.children=[]);var n={nodeType:l,parentRef:t.currentNode,content:{value:e}};return t.currentNode.content.children.push(n),t.caretPosition++,t}(e,t):t.type===c?function handleCloseTag(t,e){return r(e.content)!==t.currentNode.content.name?(t.caretPosition++,t):(t.currentContext=t.currentContext.parentRef,t)}(e,t):t.type===T?function handleCommentStart(t){void 0===t.currentNode.content.children&&(t.currentNode.content.children=[]);var e={nodeType:R,parentRef:t.currentNode,content:{}};return t.currentNode.content.children.push(e),t.currentNode=e,t.currentContext={parentRef:t.currentContext,type:f},t}(e):t.type===a?function handleDoctypeStart(t){void 0===t.currentNode.content.children&&(t.currentNode.content.children=[]);var e={nodeType:A,parentRef:t.currentNode,content:{}};return t.currentNode.content.children.push(e),t.currentNode=e,t.currentContext={parentRef:t.currentContext,type:p},t}(e):t.type===s?function handleOpenTagStartScript(t){void 0===t.currentNode.content.children&&(t.currentNode.content.children=[]);var e={nodeType:x,parentRef:t.currentNode,content:{}};return t.currentNode.content.children.push(e),t.currentNode=e,t.currentContext={type:N,parentRef:t.currentContext},t}(e):t.type===E?function handleOpenTagStartStyle(t){void 0===t.currentNode.content.children&&(t.currentNode.content.children=[]);var e={nodeType:S,parentRef:t.currentNode,content:{}};return t.currentNode.content.children.push(e),t.currentNode=e,t.currentContext={type:C,parentRef:t.currentContext},t}(e):(e.caretPosition++,e)}},VY7d:function(t,e,n){"use strict";var r=n("XH7q").DOCTYPE_ATTRIBUTE_CONTEXT,o=n("zKIE"),i=o.TOKEN_DOCTYPE_END,c=o.TOKEN_DOCTYPE_ATTRIBUTE,T=o.TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START;t.exports=function doctypeAttributes(t,e){return t.type===i?function handleDoctypeEnd(t){return t.currentContext=t.currentContext.parentRef,t}(e):-1!==[T,c].indexOf(t.type)?function handleAttribute(t){return void 0===t.currentNode.content.attributes&&(t.currentNode.content.attributes=[]),t.currentNode.content.attributes.push({}),t.currentContext={type:r,parentRef:t.currentContext},t}(e):(e.caretPosition++,e)}},VbjC:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_COMMENT_START,i=r.TOKEN_COMMENT_END,c=r.TOKEN_COMMENT_CONTENT;t.exports=function comment(t,e){return t.type===o?function handleCommentStart(t,e){return t.currentNode.content.start=e,t.caretPosition++,t}(e,t):t.type===c?function handleCommentContent(t,e){return t.currentNode.content.value=e,t.caretPosition++,t}(e,t):t.type===i?function handleCommentEnd(t,e){return t.currentNode.content.end=e,t.currentNode=t.currentNode.parentRef,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t}(e,t):(e.caretPosition++,e)}},"W0F/":function(t,e,n){"use strict";var r;function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=n("Gmcr"),i=n("UV3t"),c=n("TV3l"),T=n("tcDO"),a=n("SvNB"),u=n("7QZC"),s=n("VbjC"),E=n("oBaC"),_=n("VY7d"),d=n("32rH"),f=n("uAiu"),p=n("Ce2h"),N=n("XH7q"),C=N.TAG_CONTENT_CONTEXT,O=N.TAG_CONTEXT,P=N.TAG_NAME_CONTEXT,l=N.ATTRIBUTES_CONTEXT,A=N.ATTRIBUTE_CONTEXT,R=N.ATTRIBUTE_VALUE_CONTEXT,x=N.COMMENT_CONTEXT,S=N.DOCTYPE_CONTEXT,y=N.DOCTYPE_ATTRIBUTES_CONTEXT,B=N.DOCTYPE_ATTRIBUTE_CONTEXT,h=N.SCRIPT_TAG_CONTEXT,I=N.STYLE_TAG_CONTEXT,K=n("n2Zu").NODE_DOCUMENT,m=(_defineProperty(r={},C,i),_defineProperty(r,O,o),_defineProperty(r,P,c),_defineProperty(r,l,T),_defineProperty(r,A,a),_defineProperty(r,R,u),_defineProperty(r,x,s),_defineProperty(r,S,E),_defineProperty(r,y,_),_defineProperty(r,B,d),_defineProperty(r,h,f),_defineProperty(r,I,p),r);function processTokens(t,e,n){for(var r=e.caretPosition-n;r<t.length;){var o=t[r];r=(e=(0,m[e.currentContext.type])(o,e)).caretPosition-n}return e}t.exports=function constructTree(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0,n=e;if(void 0===e){var r={type:C,parentRef:void 0,content:[]},o={nodeType:K,parentRef:void 0,content:{}};n={caretPosition:0,currentContext:r,currentNode:o,rootNode:o}}var i=n.caretPosition;return processTokens(t,n,i),{state:n,ast:n.rootNode}}},"XA/F":function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_STYLE_TAG_CONTENT,c=o.TOKEN_CLOSE_TAG_STYLE,T=n("rCpH").DATA_CONTEXT;var a=/<\/[^>]+$/,u=/<\/style\s*>/i;t.exports={parseSyntax:function parseSyntax(t,e,n){if("<"===t||"</"===t||a.test(t))e.caretPosition++;else{if(u.test(t))return function closingStyleTag(t,e){if(""!==t.accumulatedContent){var n=r(t,{keepBuffer:!1});e.push({type:i,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition})}e.push({type:c,content:t.decisionBuffer,startPosition:t.caretPosition-(t.decisionBuffer.length-1),endPosition:t.caretPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=T,t.caretPosition++}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}}},XH7q:function(t,e,n){"use strict";t.exports={TAG_CONTENT_CONTEXT:"tree-constructor-context:tag-content",TAG_CONTEXT:"tree-constructor-context:tag",TAG_NAME_CONTEXT:"tree-constructor-context:tag-name",ATTRIBUTES_CONTEXT:"tree-constructor-context:attributes",ATTRIBUTE_CONTEXT:"tree-constructor-context:attribute",ATTRIBUTE_VALUE_CONTEXT:"tree-constructor-context:attribute-value",COMMENT_CONTEXT:"tree-constructor-context:comment",DOCTYPE_CONTEXT:"tree-constructor-context:doctype",DOCTYPE_ATTRIBUTES_CONTEXT:"tree-constructor-context:doctype-attributes",DOCTYPE_ATTRIBUTE_CONTEXT:"tree-constructor-context:doctype-attribute",SCRIPT_TAG_CONTEXT:"tree-constructor-context:script-tag",STYLE_TAG_CONTEXT:"tree-constructor-context:style-tag"}},aSGV:function(t,e,n){"use strict";var r=n("9lpN"),o=r.isWhitespace,i=r.calculateTokenCharactersRange,c=n("zKIE").TOKEN_DOCTYPE_START,T=n("rCpH"),a=T.DOCTYPE_END_CONTEXT,u=T.DOCTYPE_ATTRIBUTES_CONTEXT;function generateDoctypeStartToken(t){var e=i(t,{keepBuffer:!1});return{type:c,content:t.accumulatedContent,startPosition:e.startPosition,endPosition:e.endPosition}}t.exports={parseSyntax:function parseSyntax(t,e,n){return o(t)?function whitespace(t,e){e.push(generateDoctypeStartToken(t)),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=u}(e,n):">"===t?function closingCornerBrace(t,e){e.push(generateDoctypeStartToken(t)),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=a}(e,n):(e.decisionBuffer="",void e.caretPosition++)}}},dShj:function(t,e,n){"use strict";var r=n("9lpN"),o=r.isWhitespace,i=r.calculateTokenCharactersRange,c=n("rCpH"),T=c.ATTRIBUTES_CONTEXT,a=c.OPEN_TAG_END_CONTEXT,u=c.ATTRIBUTE_VALUE_CONTEXT,s=c.ATTRIBUTE_KEY_CONTEXT,E=n("zKIE").TOKEN_ATTRIBUTE_ASSIGNMENT;t.exports={parseSyntax:function parseSyntax(t,e,n){return">"===t||"/"===t?function tagEnd(t){var e=t.contextParams[T].tagName;t.accumulatedContent="",t.decisionBuffer="",t.currentContext=a,t.contextParams[a]={tagName:e},t.contextParams[T]=void 0}(e):"="===t?function equal(t,e){var n=i(t,{keepBuffer:!0});e.push({type:E,content:t.decisionBuffer,startPosition:n.startPosition,endPosition:n.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=u,t.caretPosition++}(e,n):o(t)?(e.decisionBuffer="",void e.caretPosition++):function noneWhitespace(t){t.accumulatedContent=t.decisionBuffer,t.decisionBuffer="",t.currentContext=s,t.caretPosition++}(e)}}},kfk7:function(t,e,n){"use strict";var r;function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=n("10rB"),i=n("s+00"),c=n("H9GS"),T=n("DfsX"),a=n("dShj"),u=n("MSBH"),s=n("mvoF"),E=n("HRD1"),_=n("A9CG"),d=n("wL7J"),f=n("XA/F"),p=n("aSGV"),N=n("6t0O"),C=n("1n3C"),O=n("9iyN"),P=n("ESIZ"),l=n("S9VL"),A=n("rCpH"),R=A.DATA_CONTEXT,x=A.OPEN_TAG_START_CONTEXT,S=A.CLOSE_TAG_CONTEXT,y=A.ATTRIBUTES_CONTEXT,B=A.OPEN_TAG_END_CONTEXT,h=A.ATTRIBUTE_KEY_CONTEXT,I=A.ATTRIBUTE_VALUE_CONTEXT,K=A.ATTRIBUTE_VALUE_BARE_CONTEXT,m=A.ATTRIBUTE_VALUE_WRAPPED_CONTEXT,v=A.SCRIPT_CONTENT_CONTEXT,g=A.STYLE_CONTENT_CONTEXT,D=A.DOCTYPE_START_CONTEXT,X=A.DOCTYPE_END_CONTEXT,U=A.DOCTYPE_ATTRIBUTES_CONTEXT,k=A.DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,Y=A.DOCTYPE_ATTRIBUTE_BARE_CONTEXT,G=A.COMMENT_CONTENT_CONTEXT,b=(_defineProperty(r={},R,o),_defineProperty(r,x,i),_defineProperty(r,S,c),_defineProperty(r,y,a),_defineProperty(r,B,T),_defineProperty(r,h,u),_defineProperty(r,I,s),_defineProperty(r,K,E),_defineProperty(r,m,_),_defineProperty(r,v,d),_defineProperty(r,g,f),_defineProperty(r,D,p),_defineProperty(r,X,N),_defineProperty(r,U,C),_defineProperty(r,k,O),_defineProperty(r,Y,P),_defineProperty(r,G,l),r);t.exports=function tokenize(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0,r=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).isFinalChunk;r=void 0===r||r;var o=[];return function tokenizeChars(t,e,n,r){for(var o=r.isFinalChunk,i=r.positionOffset,c=e.caretPosition-i;c<t.length;){var T=b[e.currentContext];e.decisionBuffer+=t[c],T.parseSyntax(e.decisionBuffer,e,n),c=e.caretPosition-i}if(o){var a=b[e.currentContext];e.caretPosition--,void 0!==a.handleContentEnd&&a.handleContentEnd(e,n)}}((t=void 0!==n?Object.assign({},n):{currentContext:R,contextParams:{},decisionBuffer:"",accumulatedContent:"",caretPosition:0}).decisionBuffer+e,t,o,{isFinalChunk:r,positionOffset:t.caretPosition-t.decisionBuffer.length}),{state:t,tokens:o}}},mvoF:function(t,e,n){"use strict";var r=n("9lpN").isWhitespace,o=n("rCpH"),i=o.ATTRIBUTE_VALUE_WRAPPED_CONTEXT,c=o.ATTRIBUTES_CONTEXT,T=o.ATTRIBUTE_VALUE_BARE_CONTEXT,a=n("zKIE").TOKEN_ATTRIBUTE_VALUE_WRAPPER_START;t.exports={parseSyntax:function parseSyntax(t,e,n){return'"'===t||"'"===t?function wrapper(t,e){var n=t.decisionBuffer;e.push({type:a,content:n,startPosition:t.caretPosition,endPosition:t.caretPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=i,t.contextParams[i]={wrapper:n},t.caretPosition++}(e,n):">"===t||"/"===t?function tagEnd(t){t.accumulatedContent="",t.decisionBuffer="",t.currentContext=c}(e):r(t)?(e.decisionBuffer="",void e.caretPosition++):function bare(t){t.accumulatedContent=t.decisionBuffer,t.decisionBuffer="",t.currentContext=T,t.caretPosition++}(e)}}},oBaC:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_DOCTYPE_END,i=r.TOKEN_DOCTYPE_ATTRIBUTE,c=r.TOKEN_DOCTYPE_START,T=r.TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,a=n("XH7q").DOCTYPE_ATTRIBUTES_CONTEXT;t.exports=function doctype(t,e){return t.type===c?function handleDoctypeStart(t,e){return t.currentNode.content.start=e,t.caretPosition++,t}(e,t):t.type===o?function handleDoctypeEnd(t,e){return t.currentNode.content.end=e,t.currentNode=t.currentNode.parentRef,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t}(e,t):-1!==[T,i].indexOf(t.type)?function handleDoctypeAttributes(t){return t.currentContext={parentRef:t.currentContext,type:a},t}(e):(e.caretPosition++,e)}},rCpH:function(t,e,n){"use strict";t.exports={DATA_CONTEXT:"tokenizer-context:data",OPEN_TAG_START_CONTEXT:"tokenizer-context:open-tag-start",CLOSE_TAG_CONTEXT:"tokenizer-context:close-tag",ATTRIBUTES_CONTEXT:"tokenizer-context:attributes",OPEN_TAG_END_CONTEXT:"tokenizer-context:open-tag-end",ATTRIBUTE_KEY_CONTEXT:"tokenizer-context:attribute-key",ATTRIBUTE_VALUE_CONTEXT:"tokenizer-context:attribute-value",ATTRIBUTE_VALUE_BARE_CONTEXT:"tokenizer-context:attribute-value-bare",ATTRIBUTE_VALUE_WRAPPED_CONTEXT:"tokenizer-context:attribute-value-wrapped",SCRIPT_CONTENT_CONTEXT:"tokenizer-context:script-content",STYLE_CONTENT_CONTEXT:"tokenizer-context:style-content",DOCTYPE_START_CONTEXT:"tokenizer-context:doctype-start",DOCTYPE_END_CONTEXT:"tokenizer-context:doctype-end",DOCTYPE_ATTRIBUTES_CONTEXT:"tokenizer-context:doctype-attributes",DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT:"tokenizer-context:doctype-attribute-wrapped",DOCTYPE_ATTRIBUTE_BARE_CONTEXT:"tokenizer-context:doctype-attribute-bare",COMMENT_START_CONTEXT:"tokenizer-context:comment-start",COMMENT_CONTENT_CONTEXT:"tokenizer-context:comment-content",COMMENT_END_CONTEXT:"tokenizer-context:comment-end"}},"s+00":function(t,e,n){"use strict";var r=n("9lpN"),o=r.parseOpenTagName,i=r.isWhitespace,c=r.calculateTokenCharactersRange,T=n("zKIE"),a=T.TOKEN_OPEN_TAG_START,u=T.TOKEN_OPEN_TAG_START_SCRIPT,s=T.TOKEN_OPEN_TAG_START_STYLE,E=n("rCpH"),_=E.OPEN_TAG_END_CONTEXT,d=E.ATTRIBUTES_CONTEXT,f={script:u,style:s,default:a};t.exports={parseSyntax:function parseSyntax(t,e,n){return">"===t||"/"===t?function tagEnd(t,e){var n=o(t.accumulatedContent),r=c(t,{keepBuffer:!1});e.push({type:f[n]||f.default,content:t.accumulatedContent,startPosition:r.startPosition,endPosition:r.endPosition}),t.decisionBuffer="",t.accumulatedContent="",t.currentContext=_,t.contextParams[_]={tagName:n}}(e,n):i(t)?function whitespace(t,e){var n=o(t.accumulatedContent),r=c(t,{keepBuffer:!1});e.push({type:f[n]||f.default,content:t.accumulatedContent,startPosition:r.startPosition,endPosition:r.endPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=d,t.contextParams[d]={tagName:n},t.caretPosition++}(e,n):(e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",void e.caretPosition++)}}},tcDO:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_ATTRIBUTE_KEY,i=r.TOKEN_ATTRIBUTE_ASSIGNMENT,c=r.TOKEN_OPEN_TAG_END,T=r.TOKEN_OPEN_TAG_END_SCRIPT,a=r.TOKEN_OPEN_TAG_END_STYLE,u=n("XH7q").ATTRIBUTE_CONTEXT;t.exports=function attributes(t,e){return-1!==[o,i].indexOf(t.type)?function handlerAttributeStart(t){return void 0===t.currentNode.content.attributes&&(t.currentNode.content.attributes=[]),t.currentNode.content.attributes.push({}),t.currentContext={parentRef:t.currentContext,type:u},t}(e):-1!==[c,T,a].indexOf(t.type)?function handleOpenTagEnd(t){return t.currentContext=t.currentContext.parentRef,t}(e):(e.caretPosition++,e)}},uAiu:function(t,e,n){"use strict";var r=n("zKIE"),o=r.TOKEN_OPEN_TAG_START_SCRIPT,i=r.TOKEN_OPEN_TAG_END_SCRIPT,c=r.TOKEN_CLOSE_TAG_SCRIPT,T=r.TOKEN_ATTRIBUTE_KEY,a=r.TOKEN_ATTRIBUTE_ASSIGNMENT,u=r.TOKEN_SCRIPT_TAG_CONTENT,s=n("XH7q").ATTRIBUTES_CONTEXT;t.exports=function scriptTag(t,e){return t.type===o?function handleOpenTagStartScript(t,e){return t.currentNode.content.openStart=e,t.caretPosition++,t}(e,t):-1!==[T,a].indexOf(t.type)?function handleAttributeStartScript(t){return t.currentContext={parentRef:t.currentContext,type:s},t}(e):t.type===i?function handleOpenTagEndScript(t,e){return t.currentNode.content.openEnd=e,t.caretPosition++,t}(e,t):t.type===u?function handleScriptContent(t,e){return t.currentNode.content.value=e,t.caretPosition++,t}(e,t):t.type===c?function handleCloseTagScript(t,e){return t.currentNode.content.close=e,t.currentNode=t.currentNode.parentRef,t.currentContext=t.currentContext.parentRef,t.caretPosition++,t}(e,t):(e.caretPosition++,e)}},wL7J:function(t,e,n){"use strict";var r=n("9lpN").calculateTokenCharactersRange,o=n("zKIE"),i=o.TOKEN_SCRIPT_TAG_CONTENT,c=o.TOKEN_CLOSE_TAG_SCRIPT,T=n("rCpH").DATA_CONTEXT;var a=/<\/[^>]+$/,u=/<\/script\s*>/i;t.exports={parseSyntax:function parseSyntax(t,e,n){if("<"===t||"</"===t||a.test(t))e.caretPosition++;else{if(u.test(t))return function closingScriptTag(t,e){if(""!==t.accumulatedContent){var n=r(t,{keepBuffer:!1});e.push({type:i,content:t.accumulatedContent,startPosition:n.startPosition,endPosition:n.endPosition})}e.push({type:c,content:t.decisionBuffer,startPosition:t.caretPosition-(t.decisionBuffer.length-1),endPosition:t.caretPosition}),t.accumulatedContent="",t.decisionBuffer="",t.currentContext=T,t.caretPosition++}(e,n);e.accumulatedContent+=e.decisionBuffer,e.decisionBuffer="",e.caretPosition++}}}},zKIE:function(t,e,n){"use strict";t.exports={TOKEN_TEXT:"token:text",TOKEN_OPEN_TAG_START:"token:open-tag-start",TOKEN_ATTRIBUTE_KEY:"token:attribute-key",TOKEN_ATTRIBUTE_ASSIGNMENT:"token:attribute-assignment",TOKEN_ATTRIBUTE_VALUE_WRAPPER_START:"token:attribute-value-wrapper-start",TOKEN_ATTRIBUTE_VALUE:"token:attribute-value",TOKEN_ATTRIBUTE_VALUE_WRAPPER_END:"token:attribute-value-wrapper-end",TOKEN_OPEN_TAG_END:"token:open-tag-end",TOKEN_CLOSE_TAG:"token:close-tag",TOKEN_OPEN_TAG_START_SCRIPT:"token:open-tag-start-script",TOKEN_SCRIPT_TAG_CONTENT:"token:script-tag-content",TOKEN_OPEN_TAG_END_SCRIPT:"token:open-tag-end-script",TOKEN_CLOSE_TAG_SCRIPT:"token:close-tag-script",TOKEN_OPEN_TAG_START_STYLE:"token:open-tag-start-style",TOKEN_STYLE_TAG_CONTENT:"token:style-tag-content",TOKEN_OPEN_TAG_END_STYLE:"token:open-tag-end-style",TOKEN_CLOSE_TAG_STYLE:"token:close-tag-style",TOKEN_DOCTYPE_START:"token:doctype-start",TOKEN_DOCTYPE_END:"token:doctype-end",TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START:"token:doctype-attribute-wrapper-start",TOKEN_DOCTYPE_ATTRIBUTE:"token:doctype-attribute",TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END:"token:doctype-attribute-wrapper-end",TOKEN_COMMENT_START:"token:comment-start",TOKEN_COMMENT_CONTENT:"token:comment-content",TOKEN_COMMENT_END:"token:comment-end"}}}]);