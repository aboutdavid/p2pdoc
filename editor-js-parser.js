// Thanks Closure Compiler!
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(b){return b.raw=b};$jscomp.createTemplateTagFirstArgWithRaw=function(b,e){b.raw=e;return b};function xss(b){for(var e=[{regex:/"/gm,replace:"&quot;"},{regex:/&/gm,replace:"&amp;"},{regex:/</gm,replace:"&lt;"},{regex:/>/gm,replace:"&lt;"}],c=0;c<e.length;)b=b.replace(e[c].regex,e[c].replace),c++;return b}
var render=function(b){if("object"!=typeof b||!Array.isArray(b.blocks))throw Error("Please provide a valid editor.js object!");var e=0,c="";for(b=b.blocks;e<b.length;){var a=b[e],d=a.type;a=a.data;if("header"==d)c+="<h"+a.level+">"+a.text+"</h"+a.level+">";else if("paragraph"==d)c+="<p>"+a.text+"</p>";else if("list"==d){d="ordered"==a.style?"ol":"ul";for(var f=0,g="";f<a.items.length;)g+="<li>"+a.items[f]+"</li>",f++;c+="<"+d+">"+g+"</"+d+">"}else"delimiter"==d?c+='<div class="ce-delimiter"></div>':
"image"==d?c+='<img src="'+a.file.url+'" alt="'+(a.caption||"")+'">':"raw"==d?c+="<pre><code>"+window.filterXSS(a.html,{whiteList:[]})+"</code></pre>":"code"==d||"rawTool"==d?c+="<pre><code>"+xss(a.code||a.html)+"</code></pre>":"quote"==d&&(c+="<blockquote>"+a.text+"</blockquote> - "+a.caption);e++}return c},obj={render:render};"undefined"===typeof window?module.exports=obj:window.EditorJSParser=obj;