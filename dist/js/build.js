var Posts = [
  {
    id:1,
    date:"2016-01-09T22:05:09",
    modified:"2016-01-09T22:05:09",
    slug:"hello-world",
    type:"post",
    title:"Hello world!",
    content:"Welcome to WordPress.\nThis is your first post.\nEdit or delete it, then start writing!",
  },
  {
    id:2,
    date:"2016-01-10T22:05:09",
    modified:"2016-01-10T22:05:09",
    slug:"learning-javascript",
    type:"post",
    title:"Learning JavaScript!",
    content:"<p>I'm learning JavaScript and super excited!!!</p> ",
  },
  {
    id:3,
    date:"2016-01-11T22:05:09",
    modified:"2016-01-11T22:05:09",
    slug:"rest-api",
    type:"post",
    title:"The REST API!",
    content:"<p>I've started working with the REST API in WordPress, what fun!</p> ",
  },
  {
    id:4,
    date:"2016-01-12T22:05:09",
    modified:"2016-01-12T22:05:09",
    slug:"json-data",
    type:"post",
    title:"JSON Data!",
    content:"<p>So, with the REST API it is posible to pull in WordPress data as pure JSON.  Now I'm figuring out what to do with the data</p> ",
  },
  {
    id:5,
    date:"2016-01-13T22:05:09",
    modified:"2016-01-13T22:05:09",
    slug:"javascript-project",
    type:"post",
    title:"JavaScript Project",
    content:"<p>I've started working with the REST API in WordPress, what fun!</p> ",
  }
];

var Pages = [
  {
    id:40,
    date:"2016-01-07T22:05:09",
    modified:"2016-01-07T22:05:09",
    slug:"home",
    type:"page",
    title:"Home",
    content:"<p>Welcome!</p><p>Reprehenderit sit sunt nisi excepteur deserunt officia ipsum eu reprehenderits deserunt aliqua incididunt cillum dolore.</p><p>Dolor sit amet, consectetur adipisicing elit. Makingsum Lorem look coolsum.</p><p>Sit temporibus sunt doloremque enim alias pariatur debitis dolorum excepturi fugiat assumenda at, totam delectus, possimus reprehenderit earum aliquid nihil, esse voluptatem.</p>",
  },
  {
    id:41,
    date:"2016-01-09T22:05:09",
    modified:"2016-01-09T22:05:09",
    slug:"about",
    type:"page",
    title:"About Me",
    content:"<p>Hi!  I'm me :)</p><p>Sisi excepteur deserunt officia ipsum eu reprehenderits deserunt aliqua incididunt cillum dolore.</p><p>Dolor sit amet, consectetur adipisicing elit. Makingsum Lorem look coolsum.</p><p>Sit temporibus sunt doloremque enim alias pariatur debitis dolorum excepturi fugiat assumenda at, totam delectus, possimus reprehenderit earum aliquid nihil, esse voluptatem.</p>",
  },
  {
    id:42,
    date:"2016-01-09T22:05:09",
    modified:"2016-01-09T22:05:09",
    slug:"blog",
    type:"page",
    title:"Blog",
    content:"<p>Welcome to my blog page, please enjoy!</p>",
  },
  {
    id:43,
    date:"2016-01-19T22:06:09",
    modified:"2016-01-19T22:06:09",
    slug:"contact",
    type:"page",
    title:"Contact",
    content:"<p>Please get in touch!</p><p>Sit temporibus sunt doloremque enim alias pariatur debitis dolorum excepturi fugiat assumenda at, totam delectus, possimus reprehenderit earum aliquid nihil, esse voluptatem.</p>",
  }
];

var Settings = [
  {
    id:991,
    date:"2016-01-09T22:05:09",
    modified:"2016-01-09T22:05:09",
    slug:"site-name",
    type:"setting",
    title:"Site Name",
    content:"My VanillaPress Site"
  },
  {
    id:992,
    date:"2016-01-09T22:05:09",
    modified:"2016-01-09T22:05:09",
    slug:"site-description",
    type:"setting",
    title:"Site Description",
    content:"Not Just Another WP Site"
  }
];
;/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		if (ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

}
;Array.prototype.isArray = true;

function getAfterHash(url) {
  url = url || null;
  var urlSegments = [""];
  if( url !== null ) {
    url = url.substring(url.indexOf('#')+1);
    urlSegments = url.split("/");
  } else {
    var pageUrl = window.location.hash.substr(1);
    urlSegments = pageUrl.split("/");
  }
  return urlSegments;
}

function addMenuItems(menuItems, contentType) {
  menuItems.forEach(function(item){
    var a = createLink(item.title, contentType, item.slug);
    addMenuItem(a);
  });
}
function addMenuItem(menuItem) {
  var ul = document.querySelector("#editor nav.secondary ul");
  var li = document.createElement("li");
  li.appendChild(menuItem);
  ul.appendChild(li);
}
function createLink(text, contentType, slug) {
  var a = document.createElement('a');
  var aText = document.createTextNode(text);
  a.appendChild(aText);
  a.href = "#edit/" + contentType + "/" + slug;
  return a;
}

function getEditorEl() {
  var el = document.getElementById("editor");
  return el;
}
function getEditorToggleEl() {
  var el = document.getElementById("editorToggle");
  return el;
}
function getCurrentContentObj() {

  var newPageSlugs = getAfterHash();  
  var pageContent;
  if( newPageSlugs.length > 1 ) {
    pageContent = getContentBySlug(newPageSlugs[1], 'posts');
  } else {
    if( newPageSlugs[0] === "") newPageSlugs[0] = "home";
    pageContent = getContentBySlug(newPageSlugs[0], 'pages');
  }
  return pageContent;
}
;var router = {
  init: function() {
    var mainNav = document.getElementById("mainNav");
    var links = mainNav.getElementsByTagName("a");
    for(var i = 0, len = links.length; i < len; i++) {
        links[i].addEventListener("click", view.update, false);
    }    
    //view.update();

  }
};
;
function getContent(type) {
  var content;
  switch (type) {
    case "posts":
      content = Posts;
      break;
    case "pages":
      content = Pages;
      break;
    case "settings":
      content = Settings;
      break;
    default:
      content =  [{type:"404",title:"404 Error"}];
  }
  return content;
}

function getContentBySlug(slug, contentType){
  var content;
  switch (contentType) {
    case "posts":
      content = Posts;
      break;
    case "pages":
      content = Pages;
      break;
    case "settings":
      content = Settings;
      break;
    default:
      content =  [{type:"404",title:"404 Error"}];
  }
  var item = content.filter( function( obj ) {
    return obj.slug == slug;
  });
  return item[0];
}
;/**
 * simplemde v1.9.0
 * Copyright Next Step Webs, Inc.
 * @link https://github.com/NextStepWebs/simplemde-markdown-editor
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.SimpleMDE=e()}}(function(){var e;return function t(e,n,r){function i(l,a){if(!n[l]){if(!e[l]){var s="function"==typeof require&&require;if(!a&&s)return s(l,!0);if(o)return o(l,!0);var c=new Error("Cannot find module '"+l+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[l]={exports:{}};e[l][0].call(u.exports,function(t){var n=e[l][1][t];return i(n?n:t)},u,u.exports,t,e,n,r)}return n[l].exports}for(var o="function"==typeof require&&require,l=0;l<r.length;l++)i(r[l]);return i}({1:[function(e,t,n){(function(n){Typo=n.Typo=e("D:\\My Web Sites\\simplemde-markdown-editor\\node_modules\\codemirror-spell-checker\\src\\js\\typo.js"),CodeMirror=n.CodeMirror=e("codemirror");(function(e,t,n){var r,i=0,o=!1,l=!1,a="",s="";CodeMirror.defineMode("spell-checker",function(e,t){if(!o){o=!0;var n=new XMLHttpRequest;n.open("GET","https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff",!0),n.onload=function(e){4===n.readyState&&200===n.status&&(a=n.responseText,i++,2==i&&(r=new Typo("en_US",a,s,{platform:"any"})))},n.send(null)}if(!l){l=!0;var c=new XMLHttpRequest;c.open("GET","https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic",!0),c.onload=function(e){4===c.readyState&&200===c.status&&(s=c.responseText,i++,2==i&&(r=new Typo("en_US",a,s,{platform:"any"})))},c.send(null)}var u='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',d={token:function(e,t){var n=e.peek(),i="";if(u.includes(n))return e.next(),null;for(;null!=(n=e.peek())&&!u.includes(n);)i+=n,e.next();return r&&!r.check(i)?"spell-error":null}},h=CodeMirror.getMode(e,e.backdrop||"text/plain");return CodeMirror.overlayMode(h,d,!0)}),String.prototype.includes||(String.prototype.includes=function(){"use strict";return-1!==String.prototype.indexOf.apply(this,arguments)})}).call(n,t,void 0,void 0)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"D:\\My Web Sites\\simplemde-markdown-editor\\node_modules\\codemirror-spell-checker\\src\\js\\typo.js":2,codemirror:6}],2:[function(e,t,n){(function(e){(function(e,t,n,r,i){"use strict";var o=function(e,t,n,r){if(r=r||{},this.platform=r.platform||"chrome",this.dictionary=null,this.rules={},this.dictionaryTable={},this.compoundRules=[],this.compoundRuleCodes={},this.replacementTable=[],this.flags=r.flags||{},e){if(this.dictionary=e,"chrome"==this.platform)t||(t=this._readFile(chrome.extension.getURL("lib/typo/dictionaries/"+e+"/"+e+".aff"))),n||(n=this._readFile(chrome.extension.getURL("lib/typo/dictionaries/"+e+"/"+e+".dic")));else{var i=r.dictionaryPath||"";t||(t=this._readFile(i+"/"+e+"/"+e+".aff")),n||(n=this._readFile(i+"/"+e+"/"+e+".dic"))}this.rules=this._parseAFF(t),this.compoundRuleCodes={};for(var o=0,l=this.compoundRules.length;l>o;o++)for(var a=this.compoundRules[o],s=0,c=a.length;c>s;s++)this.compoundRuleCodes[a[s]]=[];"ONLYINCOMPOUND"in this.flags&&(this.compoundRuleCodes[this.flags.ONLYINCOMPOUND]=[]),this.dictionaryTable=this._parseDIC(n);for(var o in this.compoundRuleCodes)0==this.compoundRuleCodes[o].length&&delete this.compoundRuleCodes[o];for(var o=0,l=this.compoundRules.length;l>o;o++){for(var u=this.compoundRules[o],d="",s=0,c=u.length;c>s;s++){var h=u[s];d+=h in this.compoundRuleCodes?"("+this.compoundRuleCodes[h].join("|")+")":h}this.compoundRules[o]=new RegExp(d,"i")}}return this};o.prototype={load:function(e){for(var t in e)this[t]=e[t];return this},_readFile:function(e,t){t||(t="ISO8859-1");var n=new XMLHttpRequest;return n.open("GET",e,!1),n.overrideMimeType&&n.overrideMimeType("text/plain; charset="+t),n.send(null),n.responseText},_parseAFF:function(e){var t={};e=this._removeAffixComments(e);for(var n=e.split("\n"),r=0,i=n.length;i>r;r++){var o=n[r],l=o.split(/\s+/),a=l[0];if("PFX"==a||"SFX"==a){for(var s=l[1],c=l[2],u=parseInt(l[3],10),d=[],h=r+1,f=r+1+u;f>h;h++){var o=n[h],p=o.split(/\s+/),m=p[2],g=p[3].split("/"),v=g[0];"0"===v&&(v="");var y=this.parseRuleCodes(g[1]),x=p[4],b={};b.add=v,y.length>0&&(b.continuationClasses=y),"."!==x&&("SFX"===a?b.match=new RegExp(x+"$"):b.match=new RegExp("^"+x)),"0"!=m&&("SFX"===a?b.remove=new RegExp(m+"$"):b.remove=m),d.push(b)}t[s]={type:a,combineable:"Y"==c,entries:d},r+=u}else if("COMPOUNDRULE"===a){for(var u=parseInt(l[1],10),h=r+1,f=r+1+u;f>h;h++){var o=n[h],p=o.split(/\s+/);this.compoundRules.push(p[1])}r+=u}else if("REP"===a){var p=o.split(/\s+/);3===p.length&&this.replacementTable.push([p[1],p[2]])}else this.flags[a]=l[1]}return t},_removeAffixComments:function(e){return e=e.replace(/#.*$/gm,""),e=e.replace(/^\s\s*/m,"").replace(/\s\s*$/m,""),e=e.replace(/\n{2,}/g,"\n"),e=e.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},_parseDIC:function(e){function t(e,t){e in r&&"object"==typeof r[e]||(r[e]=[]),r[e].push(t)}e=this._removeDicComments(e);for(var n=e.split("\n"),r={},i=1,o=n.length;o>i;i++){var l=n[i],a=l.split("/",2),s=a[0];if(a.length>1){var c=this.parseRuleCodes(a[1]);"NEEDAFFIX"in this.flags&&-1!=c.indexOf(this.flags.NEEDAFFIX)||t(s,c);for(var u=0,d=c.length;d>u;u++){var h=c[u],f=this.rules[h];if(f)for(var p=this._applyRule(s,f),m=0,g=p.length;g>m;m++){var v=p[m];if(t(v,[]),f.combineable)for(var y=u+1;d>y;y++){var x=c[y],b=this.rules[x];if(b&&b.combineable&&f.type!=b.type)for(var w=this._applyRule(v,b),k=0,C=w.length;C>k;k++){var S=w[k];t(S,[])}}}h in this.compoundRuleCodes&&this.compoundRuleCodes[h].push(s)}}else t(s.trim(),[])}return r},_removeDicComments:function(e){return e=e.replace(/^\t.*$/gm,"")},parseRuleCodes:function(e){if(!e)return[];if(!("FLAG"in this.flags))return e.split("");if("long"===this.flags.FLAG){for(var t=[],n=0,r=e.length;r>n;n+=2)t.push(e.substr(n,2));return t}return"num"===this.flags.FLAG?textCode.split(","):void 0},_applyRule:function(e,t){for(var n=t.entries,r=[],i=0,o=n.length;o>i;i++){var l=n[i];if(!l.match||e.match(l.match)){var a=e;if(l.remove&&(a=a.replace(l.remove,"")),"SFX"===t.type?a+=l.add:a=l.add+a,r.push(a),"continuationClasses"in l)for(var s=0,c=l.continuationClasses.length;c>s;s++){var u=this.rules[l.continuationClasses[s]];u&&(r=r.concat(this._applyRule(a,u)))}}}return r},check:function(e){var t=e.replace(/^\s\s*/,"").replace(/\s\s*$/,"");if(this.checkExact(t))return!0;if(t.toUpperCase()===t){var n=t[0]+t.substring(1).toLowerCase();if(this.hasFlag(n,"KEEPCASE"))return!1;if(this.checkExact(n))return!0}var r=t.toLowerCase();if(r!==t){if(this.hasFlag(r,"KEEPCASE"))return!1;if(this.checkExact(r))return!0}return!1},checkExact:function(e){var t=this.dictionaryTable[e];if("undefined"==typeof t){if("COMPOUNDMIN"in this.flags&&e.length>=this.flags.COMPOUNDMIN)for(var n=0,r=this.compoundRules.length;r>n;n++)if(e.match(this.compoundRules[n]))return!0;return!1}for(var n=0,r=t.length;r>n;n++)if(!this.hasFlag(e,"ONLYINCOMPOUND",t[n]))return!0;return!1},hasFlag:function(e,t,n){if(t in this.flags){if("undefined"==typeof n)var n=Array.prototype.concat.apply([],this.dictionaryTable[e]);if(n&&-1!==n.indexOf(this.flags[t]))return!0}return!1},alphabet:"",suggest:function(e,t){function n(e){for(var t=[],n=0,r=e.length;r>n;n++){for(var i=e[n],o=[],l=0,a=i.length+1;a>l;l++)o.push([i.substring(0,l),i.substring(l,i.length)]);for(var s=[],l=0,a=o.length;a>l;l++){var u=o[l];u[1]&&s.push(u[0]+u[1].substring(1))}for(var d=[],l=0,a=o.length;a>l;l++){var u=o[l];u[1].length>1&&d.push(u[0]+u[1][1]+u[1][0]+u[1].substring(2))}for(var h=[],l=0,a=o.length;a>l;l++){var u=o[l];if(u[1])for(var f=0,p=c.alphabet.length;p>f;f++)h.push(u[0]+c.alphabet[f]+u[1].substring(1))}for(var m=[],l=0,a=o.length;a>l;l++){var u=o[l];if(u[1])for(var f=0,p=c.alphabet.length;p>f;f++)h.push(u[0]+c.alphabet[f]+u[1])}t=t.concat(s),t=t.concat(d),t=t.concat(h),t=t.concat(m)}return t}function r(e){for(var t=[],n=0;n<e.length;n++)c.check(e[n])&&t.push(e[n]);return t}function i(e){function i(e,t){return e[1]<t[1]?-1:1}for(var o=n([e]),l=n(o),a=r(o).concat(r(l)),s={},u=0,d=a.length;d>u;u++)a[u]in s?s[a[u]]+=1:s[a[u]]=1;var h=[];for(var u in s)h.push([u,s[u]]);h.sort(i).reverse();for(var f=[],u=0,d=Math.min(t,h.length);d>u;u++)c.hasFlag(h[u][0],"NOSUGGEST")||f.push(h[u][0]);return f}if(t||(t=5),this.check(e))return[];for(var o=0,l=this.replacementTable.length;l>o;o++){var a=this.replacementTable[o];if(-1!==e.indexOf(a[0])){var s=e.replace(a[0],a[1]);if(this.check(s))return[s]}}var c=this;return c.alphabet="abcdefghijklmnopqrstuvwxyz",i(e)}},i("undefined"!=typeof o?o:window.Typo)}).call(e,void 0,void 0,void 0,void 0,function(e){t.exports=e})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../../lib/codemirror")):"function"==typeof e&&e.amd?e(["../../lib/codemirror"],i):i(CodeMirror)}(function(e){"use strict";function t(e){var t=e.getWrapperElement();e.state.fullScreenRestore={scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,width:t.style.width,height:t.style.height},t.style.width="",t.style.height="auto",t.className+=" CodeMirror-fullscreen",document.documentElement.style.overflow="hidden",e.refresh()}function n(e){var t=e.getWrapperElement();t.className=t.className.replace(/\s*CodeMirror-fullscreen\b/,""),document.documentElement.style.overflow="";var n=e.state.fullScreenRestore;t.style.width=n.width,t.style.height=n.height,window.scrollTo(n.scrollLeft,n.scrollTop),e.refresh()}e.defineOption("fullScreen",!1,function(r,i,o){o==e.Init&&(o=!1),!o!=!i&&(i?t(r):n(r))})})},{"../../lib/codemirror":6}],4:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../../lib/codemirror")):"function"==typeof e&&e.amd?e(["../../lib/codemirror"],i):i(CodeMirror)}(function(e){"use strict";var t=/^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))(\s*)/,n=/^(\s*)(>[> ]*|[*+-]|(\d+)[.)])(\s*)$/,r=/[*+-]\s/;e.commands.newlineAndIndentContinueMarkdownList=function(i){if(i.getOption("disableInput"))return e.Pass;for(var o=i.listSelections(),l=[],a=0;a<o.length;a++){var s=o[a].head,c=i.getStateAfter(s.line),u=c.list!==!1,d=0!==c.quote,h=i.getLine(s.line),f=t.exec(h);if(!o[a].empty()||!u&&!d||!f)return void i.execCommand("newlineAndIndent");if(n.test(h))i.replaceRange("",{line:s.line,ch:0},{line:s.line,ch:s.ch+1}),l[a]="\n";else{var p=f[1],m=f[5],g=r.test(f[2])||f[2].indexOf(">")>=0?f[2]:parseInt(f[3],10)+1+f[4];l[a]="\n"+p+g+m}}i.replaceSelections(l)}})},{"../../lib/codemirror":6}],5:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../../lib/codemirror")):"function"==typeof e&&e.amd?e(["../../lib/codemirror"],i):i(CodeMirror)}(function(e){"use strict";e.overlayMode=function(t,n,r){return{startState:function(){return{base:e.startState(t),overlay:e.startState(n),basePos:0,baseCur:null,overlayPos:0,overlayCur:null,streamSeen:null}},copyState:function(r){return{base:e.copyState(t,r.base),overlay:e.copyState(n,r.overlay),basePos:r.basePos,baseCur:null,overlayPos:r.overlayPos,overlayCur:null}},token:function(e,i){return(e!=i.streamSeen||Math.min(i.basePos,i.overlayPos)<e.start)&&(i.streamSeen=e,i.basePos=i.overlayPos=e.start),e.start==i.basePos&&(i.baseCur=t.token(e,i.base),i.basePos=e.pos),e.start==i.overlayPos&&(e.pos=e.start,i.overlayCur=n.token(e,i.overlay),i.overlayPos=e.pos),e.pos=Math.min(i.basePos,i.overlayPos),null==i.overlayCur?i.baseCur:null!=i.baseCur&&i.overlay.combineTokens||r&&null==i.overlay.combineTokens?i.baseCur+" "+i.overlayCur:i.overlayCur},indent:t.indent&&function(e,n){return t.indent(e.base,n)},electricChars:t.electricChars,innerMode:function(e){return{state:e.base,mode:t}},blankLine:function(e){t.blankLine&&t.blankLine(e.base),n.blankLine&&n.blankLine(e.overlay)}}}})},{"../../lib/codemirror":6}],6:[function(t,n,r){!function(t){if("object"==typeof r&&"object"==typeof n)n.exports=t();else{if("function"==typeof e&&e.amd)return e([],t);this.CodeMirror=t()}}(function(){"use strict";function e(n,r){if(!(this instanceof e))return new e(n,r);this.options=r=r?Fi(r):{},Fi(el,r,!1),f(r);var i=r.value;"string"==typeof i&&(i=new Sl(i,r.mode,null,r.lineSeparator)),this.doc=i;var o=new e.inputStyles[r.inputStyle](this),l=this.display=new t(n,i,o);l.wrapper.CodeMirror=this,c(this),a(this),r.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),r.autofocus&&!Oo&&l.input.focus(),v(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new Wi,keySeq:null,specialChars:null};var s=this;bo&&11>wo&&setTimeout(function(){s.display.input.reset(!0)},20),qt(this),Yi(),wt(this),this.curOp.forceUpdate=!0,Zr(this,i),r.autofocus&&!Oo||s.hasFocus()?setTimeout(Ri(yn,this),20):xn(this);for(var u in tl)tl.hasOwnProperty(u)&&tl[u](this,r[u],nl);k(this),r.finishInit&&r.finishInit(this);for(var d=0;d<ll.length;++d)ll[d](this);Ct(this),ko&&r.lineWrapping&&"optimizelegibility"==getComputedStyle(l.lineDiv).textRendering&&(l.lineDiv.style.textRendering="auto")}function t(e,t,n){var r=this;this.input=n,r.scrollbarFiller=qi("div",null,"CodeMirror-scrollbar-filler"),r.scrollbarFiller.setAttribute("cm-not-content","true"),r.gutterFiller=qi("div",null,"CodeMirror-gutter-filler"),r.gutterFiller.setAttribute("cm-not-content","true"),r.lineDiv=qi("div",null,"CodeMirror-code"),r.selectionDiv=qi("div",null,null,"position: relative; z-index: 1"),r.cursorDiv=qi("div",null,"CodeMirror-cursors"),r.measure=qi("div",null,"CodeMirror-measure"),r.lineMeasure=qi("div",null,"CodeMirror-measure"),r.lineSpace=qi("div",[r.measure,r.lineMeasure,r.selectionDiv,r.cursorDiv,r.lineDiv],null,"position: relative; outline: none"),r.mover=qi("div",[qi("div",[r.lineSpace],"CodeMirror-lines")],null,"position: relative"),r.sizer=qi("div",[r.mover],"CodeMirror-sizer"),r.sizerWidth=null,r.heightForcer=qi("div",null,null,"position: absolute; height: "+Il+"px; width: 1px;"),r.gutters=qi("div",null,"CodeMirror-gutters"),r.lineGutter=null,r.scroller=qi("div",[r.sizer,r.heightForcer,r.gutters],"CodeMirror-scroll"),r.scroller.setAttribute("tabIndex","-1"),r.wrapper=qi("div",[r.scrollbarFiller,r.gutterFiller,r.scroller],"CodeMirror"),bo&&8>wo&&(r.gutters.style.zIndex=-1,r.scroller.style.paddingRight=0),ko||vo&&Oo||(r.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(r.wrapper):e(r.wrapper)),r.viewFrom=r.viewTo=t.first,r.reportedViewFrom=r.reportedViewTo=t.first,r.view=[],r.renderedView=null,r.externalMeasured=null,r.viewOffset=0,r.lastWrapHeight=r.lastWrapWidth=0,r.updateLineNumbers=null,r.nativeBarWidth=r.barHeight=r.barWidth=0,r.scrollbarsClipped=!1,r.lineNumWidth=r.lineNumInnerWidth=r.lineNumChars=null,r.alignWidgets=!1,r.cachedCharWidth=r.cachedTextHeight=r.cachedPaddingH=null,r.maxLine=null,r.maxLineLength=0,r.maxLineChanged=!1,r.wheelDX=r.wheelDY=r.wheelStartX=r.wheelStartY=null,r.shift=!1,r.selForContextMenu=null,r.activeTouch=null,n.init(r)}function n(t){t.doc.mode=e.getMode(t.options,t.doc.modeOption),r(t)}function r(e){e.doc.iter(function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)}),e.doc.frontier=e.doc.first,Be(e,100),e.state.modeGen++,e.curOp&&Pt(e)}function i(e){e.options.lineWrapping?(Ql(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(Zl(e.display.wrapper,"CodeMirror-wrap"),h(e)),l(e),Pt(e),st(e),setTimeout(function(){y(e)},100)}function o(e){var t=xt(e.display),n=e.options.lineWrapping,r=n&&Math.max(5,e.display.scroller.clientWidth/bt(e.display)-3);return function(i){if(Cr(e.doc,i))return 0;var o=0;if(i.widgets)for(var l=0;l<i.widgets.length;l++)i.widgets[l].height&&(o+=i.widgets[l].height);return n?o+(Math.ceil(i.text.length/r)||1)*t:o+t}}function l(e){var t=e.doc,n=o(e);t.iter(function(e){var t=n(e);t!=e.height&&ti(e,t)})}function a(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),st(e)}function s(e){c(e),Pt(e),setTimeout(function(){w(e)},20)}function c(e){var t=e.display.gutters,n=e.options.gutters;Gi(t);for(var r=0;r<n.length;++r){var i=n[r],o=t.appendChild(qi("div",null,"CodeMirror-gutter "+i));"CodeMirror-linenumbers"==i&&(e.display.lineGutter=o,o.style.width=(e.display.lineNumWidth||1)+"px")}t.style.display=r?"":"none",u(e)}function u(e){var t=e.display.gutters.offsetWidth;e.display.sizer.style.marginLeft=t+"px"}function d(e){if(0==e.height)return 0;for(var t,n=e.text.length,r=e;t=gr(r);){var i=t.find(0,!0);r=i.from.line,n+=i.from.ch-i.to.ch}for(r=e;t=vr(r);){var i=t.find(0,!0);n-=r.text.length-i.from.ch,r=i.to.line,n+=r.text.length-i.to.ch}return n}function h(e){var t=e.display,n=e.doc;t.maxLine=Qr(n,n.first),t.maxLineLength=d(t.maxLine),t.maxLineChanged=!0,n.iter(function(e){var n=d(e);n>t.maxLineLength&&(t.maxLineLength=n,t.maxLine=e)})}function f(e){var t=Ei(e.gutters,"CodeMirror-linenumbers");-1==t&&e.lineNumbers?e.gutters=e.gutters.concat(["CodeMirror-linenumbers"]):t>-1&&!e.lineNumbers&&(e.gutters=e.gutters.slice(0),e.gutters.splice(t,1))}function p(e){var t=e.display,n=t.gutters.offsetWidth,r=Math.round(e.doc.height+Ue(e.display));return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?n:0,docHeight:r,scrollHeight:r+Ve(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:n}}function m(e,t,n){this.cm=n;var r=this.vert=qi("div",[qi("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),i=this.horiz=qi("div",[qi("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");e(r),e(i),Ol(r,"scroll",function(){r.clientHeight&&t(r.scrollTop,"vertical")}),Ol(i,"scroll",function(){i.clientWidth&&t(i.scrollLeft,"horizontal")}),this.checkedZeroWidth=!1,bo&&8>wo&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")}function g(){}function v(t){t.display.scrollbars&&(t.display.scrollbars.clear(),t.display.scrollbars.addClass&&Zl(t.display.wrapper,t.display.scrollbars.addClass)),t.display.scrollbars=new e.scrollbarModel[t.options.scrollbarStyle](function(e){t.display.wrapper.insertBefore(e,t.display.scrollbarFiller),Ol(e,"mousedown",function(){t.state.focused&&setTimeout(function(){t.display.input.focus()},0)}),e.setAttribute("cm-not-content","true")},function(e,n){"horizontal"==n?ln(t,e):on(t,e)},t),t.display.scrollbars.addClass&&Ql(t.display.wrapper,t.display.scrollbars.addClass)}function y(e,t){t||(t=p(e));var n=e.display.barWidth,r=e.display.barHeight;x(e,t);for(var i=0;4>i&&n!=e.display.barWidth||r!=e.display.barHeight;i++)n!=e.display.barWidth&&e.options.lineWrapping&&W(e),x(e,p(e)),n=e.display.barWidth,r=e.display.barHeight}function x(e,t){var n=e.display,r=n.scrollbars.update(t);n.sizer.style.paddingRight=(n.barWidth=r.right)+"px",n.sizer.style.paddingBottom=(n.barHeight=r.bottom)+"px",r.right&&r.bottom?(n.scrollbarFiller.style.display="block",n.scrollbarFiller.style.height=r.bottom+"px",n.scrollbarFiller.style.width=r.right+"px"):n.scrollbarFiller.style.display="",r.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(n.gutterFiller.style.display="block",n.gutterFiller.style.height=r.bottom+"px",n.gutterFiller.style.width=t.gutterWidth+"px"):n.gutterFiller.style.display=""}function b(e,t,n){var r=n&&null!=n.top?Math.max(0,n.top):e.scroller.scrollTop;r=Math.floor(r-Ge(e));var i=n&&null!=n.bottom?n.bottom:r+e.wrapper.clientHeight,o=ri(t,r),l=ri(t,i);if(n&&n.ensure){var a=n.ensure.from.line,s=n.ensure.to.line;o>a?(o=a,l=ri(t,ii(Qr(t,a))+e.wrapper.clientHeight)):Math.min(s,t.lastLine())>=l&&(o=ri(t,ii(Qr(t,s))-e.wrapper.clientHeight),l=s)}return{from:o,to:Math.max(l,o+1)}}function w(e){var t=e.display,n=t.view;if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var r=S(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,o=r+"px",l=0;l<n.length;l++)if(!n[l].hidden){e.options.fixedGutter&&n[l].gutter&&(n[l].gutter.style.left=o);var a=n[l].alignable;if(a)for(var s=0;s<a.length;s++)a[s].style.left=o}e.options.fixedGutter&&(t.gutters.style.left=r+i+"px")}}function k(e){if(!e.options.lineNumbers)return!1;var t=e.doc,n=C(e.options,t.first+t.size-1),r=e.display;if(n.length!=r.lineNumChars){var i=r.measure.appendChild(qi("div",[qi("div",n)],"CodeMirror-linenumber CodeMirror-gutter-elt")),o=i.firstChild.offsetWidth,l=i.offsetWidth-o;return r.lineGutter.style.width="",r.lineNumInnerWidth=Math.max(o,r.lineGutter.offsetWidth-l)+1,r.lineNumWidth=r.lineNumInnerWidth+l,r.lineNumChars=r.lineNumInnerWidth?n.length:-1,r.lineGutter.style.width=r.lineNumWidth+"px",u(e),!0}return!1}function C(e,t){return String(e.lineNumberFormatter(t+e.firstLineNumber))}function S(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function L(e,t,n){var r=e.display;this.viewport=t,this.visible=b(r,e.doc,t),this.editorIsHidden=!r.wrapper.offsetWidth,this.wrapperHeight=r.wrapper.clientHeight,this.wrapperWidth=r.wrapper.clientWidth,this.oldDisplayWidth=Ke(e),this.force=n,this.dims=D(e),this.events=[]}function T(e){var t=e.display;!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=Ve(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=Ve(e)+"px",t.scrollbarsClipped=!0)}function M(e,t){var n=e.display,r=e.doc;if(t.editorIsHidden)return Ft(e),!1;if(!t.force&&t.visible.from>=n.viewFrom&&t.visible.to<=n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)&&n.renderedView==n.view&&0==jt(e))return!1;k(e)&&(Ft(e),t.dims=D(e));var i=r.first+r.size,o=Math.max(t.visible.from-e.options.viewportMargin,r.first),l=Math.min(i,t.visible.to+e.options.viewportMargin);n.viewFrom<o&&o-n.viewFrom<20&&(o=Math.max(r.first,n.viewFrom)),n.viewTo>l&&n.viewTo-l<20&&(l=Math.min(i,n.viewTo)),zo&&(o=wr(e.doc,o),l=kr(e.doc,l));var a=o!=n.viewFrom||l!=n.viewTo||n.lastWrapHeight!=t.wrapperHeight||n.lastWrapWidth!=t.wrapperWidth;_t(e,o,l),n.viewOffset=ii(Qr(e.doc,n.viewFrom)),e.display.mover.style.top=n.viewOffset+"px";var s=jt(e);if(!a&&0==s&&!t.force&&n.renderedView==n.view&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo))return!1;var c=$i();return s>4&&(n.lineDiv.style.display="none"),E(e,n.updateLineNumbers,t.dims),s>4&&(n.lineDiv.style.display=""),n.renderedView=n.view,c&&$i()!=c&&c.offsetHeight&&c.focus(),Gi(n.cursorDiv),Gi(n.selectionDiv),n.gutters.style.height=n.sizer.style.minHeight=0,a&&(n.lastWrapHeight=t.wrapperHeight,n.lastWrapWidth=t.wrapperWidth,Be(e,400)),n.updateLineNumbers=null,!0}function N(e,t){for(var n=t.viewport,r=!0;(r&&e.options.lineWrapping&&t.oldDisplayWidth!=Ke(e)||(n&&null!=n.top&&(n={top:Math.min(e.doc.height+Ue(e.display)-Xe(e),n.top)}),t.visible=b(e.display,e.doc,n),!(t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)))&&M(e,t);r=!1){W(e);var i=p(e);Ie(e),O(e,i),y(e,i)}t.signal(e,"update",e),(e.display.viewFrom!=e.display.reportedViewFrom||e.display.viewTo!=e.display.reportedViewTo)&&(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function A(e,t){var n=new L(e,t);if(M(e,n)){W(e),N(e,n);var r=p(e);Ie(e),O(e,r),y(e,r),n.finish()}}function O(e,t){e.display.sizer.style.minHeight=t.docHeight+"px";var n=t.docHeight+e.display.barHeight;e.display.heightForcer.style.top=n+"px",e.display.gutters.style.height=Math.max(n+Ve(e),t.clientHeight)+"px"}function W(e){for(var t=e.display,n=t.lineDiv.offsetTop,r=0;r<t.view.length;r++){var i,o=t.view[r];if(!o.hidden){if(bo&&8>wo){var l=o.node.offsetTop+o.node.offsetHeight;i=l-n,n=l}else{var a=o.node.getBoundingClientRect();i=a.bottom-a.top}var s=o.line.height-i;if(2>i&&(i=xt(t)),(s>.001||-.001>s)&&(ti(o.line,i),H(o.line),o.rest))for(var c=0;c<o.rest.length;c++)H(o.rest[c])}}}function H(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t)e.widgets[t].height=e.widgets[t].node.parentNode.offsetHeight}function D(e){for(var t=e.display,n={},r={},i=t.gutters.clientLeft,o=t.gutters.firstChild,l=0;o;o=o.nextSibling,++l)n[e.options.gutters[l]]=o.offsetLeft+o.clientLeft+i,r[e.options.gutters[l]]=o.clientWidth;return{fixedPos:S(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:n,gutterWidth:r,wrapperWidth:t.wrapper.clientWidth}}function E(e,t,n){function r(t){var n=t.nextSibling;return ko&&Wo&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),n}for(var i=e.display,o=e.options.lineNumbers,l=i.lineDiv,a=l.firstChild,s=i.view,c=i.viewFrom,u=0;u<s.length;u++){var d=s[u];if(d.hidden);else if(d.node&&d.node.parentNode==l){for(;a!=d.node;)a=r(a);var h=o&&null!=t&&c>=t&&d.lineNumber;d.changes&&(Ei(d.changes,"gutter")>-1&&(h=!1),I(e,d,c,n)),h&&(Gi(d.lineNumber),d.lineNumber.appendChild(document.createTextNode(C(e.options,c)))),a=d.node.nextSibling}else{var f=q(e,d,c,n);l.insertBefore(f,a)}c+=d.size}for(;a;)a=r(a)}function I(e,t,n,r){for(var i=0;i<t.changes.length;i++){var o=t.changes[i];"text"==o?R(e,t):"gutter"==o?_(e,t,n,r):"class"==o?B(t):"widget"==o&&j(e,t,r)}t.changes=null}function P(e){return e.node==e.text&&(e.node=qi("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),bo&&8>wo&&(e.node.style.zIndex=2)),e.node}function z(e){var t=e.bgClass?e.bgClass+" "+(e.line.bgClass||""):e.line.bgClass;if(t&&(t+=" CodeMirror-linebackground"),e.background)t?e.background.className=t:(e.background.parentNode.removeChild(e.background),e.background=null);else if(t){var n=P(e);e.background=n.insertBefore(qi("div",null,t),n.firstChild)}}function F(e,t){var n=e.display.externalMeasured;return n&&n.line==t.line?(e.display.externalMeasured=null,t.measure=n.measure,n.built):Rr(e,t)}function R(e,t){var n=t.text.className,r=F(e,t);t.text==t.node&&(t.node=r.pre),t.text.parentNode.replaceChild(r.pre,t.text),t.text=r.pre,r.bgClass!=t.bgClass||r.textClass!=t.textClass?(t.bgClass=r.bgClass,t.textClass=r.textClass,B(t)):n&&(t.text.className=n)}function B(e){z(e),e.line.wrapClass?P(e).className=e.line.wrapClass:e.node!=e.text&&(e.node.className="");var t=e.textClass?e.textClass+" "+(e.line.textClass||""):e.line.textClass;e.text.className=t||""}function _(e,t,n,r){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var i=P(t);t.gutterBackground=qi("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+"px; width: "+r.gutterTotalWidth+"px"),i.insertBefore(t.gutterBackground,t.text)}var o=t.line.gutterMarkers;if(e.options.lineNumbers||o){var i=P(t),l=t.gutter=qi("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+"px");if(e.display.input.setUneditable(l),i.insertBefore(l,t.text),t.line.gutterClass&&(l.className+=" "+t.line.gutterClass),!e.options.lineNumbers||o&&o["CodeMirror-linenumbers"]||(t.lineNumber=l.appendChild(qi("div",C(e.options,n),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+r.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),o)for(var a=0;a<e.options.gutters.length;++a){var s=e.options.gutters[a],c=o.hasOwnProperty(s)&&o[s];c&&l.appendChild(qi("div",[c],"CodeMirror-gutter-elt","left: "+r.gutterLeft[s]+"px; width: "+r.gutterWidth[s]+"px"))}}}function j(e,t,n){t.alignable&&(t.alignable=null);for(var r,i=t.node.firstChild;i;i=r){var r=i.nextSibling;"CodeMirror-linewidget"==i.className&&t.node.removeChild(i)}G(e,t,n)}function q(e,t,n,r){var i=F(e,t);return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),B(t),_(e,t,n,r),G(e,t,r),t.node}function G(e,t,n){if(U(e,t.line,t,n,!0),t.rest)for(var r=0;r<t.rest.length;r++)U(e,t.rest[r],t,n,!1)}function U(e,t,n,r,i){if(t.widgets)for(var o=P(n),l=0,a=t.widgets;l<a.length;++l){var s=a[l],c=qi("div",[s.node],"CodeMirror-linewidget");s.handleMouseEvents||c.setAttribute("cm-ignore-events","true"),$(s,c,n,r),e.display.input.setUneditable(c),i&&s.above?o.insertBefore(c,n.gutter||n.text):o.appendChild(c),Li(s,"redraw")}}function $(e,t,n,r){if(e.noHScroll){(n.alignable||(n.alignable=[])).push(t);var i=r.wrapperWidth;t.style.left=r.fixedPos+"px",e.coverGutter||(i-=r.gutterTotalWidth,t.style.paddingLeft=r.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-r.gutterTotalWidth+"px"))}function V(e){return Fo(e.line,e.ch)}function K(e,t){return Ro(e,t)<0?t:e}function X(e,t){return Ro(e,t)<0?e:t}function Y(e){e.state.focused||(e.display.input.focus(),yn(e))}function Z(e){return e.options.readOnly||e.doc.cantEdit}function Q(e,t,n,r,i){var o=e.doc;e.display.shift=!1,r||(r=o.sel);var l=e.state.pasteIncoming||"paste"==i,a=o.splitLines(t),s=null;if(l&&r.ranges.length>1)if(Bo&&Bo.join("\n")==t){if(r.ranges.length%Bo.length==0){s=[];for(var c=0;c<Bo.length;c++)s.push(o.splitLines(Bo[c]))}}else a.length==r.ranges.length&&(s=Ii(a,function(e){return[e]}));for(var c=r.ranges.length-1;c>=0;c--){var u=r.ranges[c],d=u.from(),h=u.to();u.empty()&&(n&&n>0?d=Fo(d.line,d.ch-n):e.state.overwrite&&!l&&(h=Fo(h.line,Math.min(Qr(o,h.line).text.length,h.ch+Di(a).length))));var f=e.curOp.updateInput,p={from:d,to:h,text:s?s[c%s.length]:a,origin:i||(l?"paste":e.state.cutIncoming?"cut":"+input")};Mn(e.doc,p),Li(e,"inputRead",e,p)}t&&!l&&ee(e,t),Rn(e),e.curOp.updateInput=f,e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=!1}function J(e,t){var n=e.clipboardData&&e.clipboardData.getData("text/plain");return n?(e.preventDefault(),Z(t)||t.options.disableInput||Ot(t,function(){Q(t,n,0,null,"paste")}),!0):void 0}function ee(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var n=e.doc.sel,r=n.ranges.length-1;r>=0;r--){var i=n.ranges[r];if(!(i.head.ch>100||r&&n.ranges[r-1].head.line==i.head.line)){var o=e.getModeAt(i.head),l=!1;if(o.electricChars){for(var a=0;a<o.electricChars.length;a++)if(t.indexOf(o.electricChars.charAt(a))>-1){l=_n(e,i.head.line,"smart");break}}else o.electricInput&&o.electricInput.test(Qr(e.doc,i.head.line).text.slice(0,i.head.ch))&&(l=_n(e,i.head.line,"smart"));l&&Li(e,"electricInput",e,i.head.line)}}}function te(e){for(var t=[],n=[],r=0;r<e.doc.sel.ranges.length;r++){var i=e.doc.sel.ranges[r].head.line,o={anchor:Fo(i,0),head:Fo(i+1,0)};n.push(o),t.push(e.getRange(o.anchor,o.head))}return{text:t,ranges:n}}function ne(e){e.setAttribute("autocorrect","off"),e.setAttribute("autocapitalize","off"),e.setAttribute("spellcheck","false")}function re(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new Wi,this.inaccurateSelection=!1,this.hasSelection=!1,this.composing=null}function ie(){var e=qi("textarea",null,null,"position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),t=qi("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return ko?e.style.width="1000px":e.setAttribute("wrap","off"),Ao&&(e.style.border="1px solid black"),ne(e),t}function oe(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new Wi,this.gracePeriod=!1}function le(e,t){var n=et(e,t.line);if(!n||n.hidden)return null;var r=Qr(e.doc,t.line),i=Ze(n,r,t.line),o=oi(r),l="left";if(o){var a=uo(o,t.ch);l=a%2?"right":"left"}var s=rt(i.map,t.ch,l);return s.offset="right"==s.collapse?s.end:s.start,s}function ae(e,t){return t&&(e.bad=!0),e}function se(e,t,n){var r;if(t==e.display.lineDiv){if(r=e.display.lineDiv.childNodes[n],!r)return ae(e.clipPos(Fo(e.display.viewTo-1)),!0);t=null,n=0}else for(r=t;;r=r.parentNode){if(!r||r==e.display.lineDiv)return null;if(r.parentNode&&r.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){
var o=e.display.view[i];if(o.node==r)return ce(o,t,n)}}function ce(e,t,n){function r(t,n,r){for(var i=-1;i<(u?u.length:0);i++)for(var o=0>i?c.map:u[i],l=0;l<o.length;l+=3){var a=o[l+2];if(a==t||a==n){var s=ni(0>i?e.line:e.rest[i]),d=o[l]+r;return(0>r||a!=t)&&(d=o[l+(r?1:0)]),Fo(s,d)}}}var i=e.text.firstChild,o=!1;if(!t||!Kl(i,t))return ae(Fo(ni(e.line),0),!0);if(t==i&&(o=!0,t=i.childNodes[n],n=0,!t)){var l=e.rest?Di(e.rest):e.line;return ae(Fo(ni(l),l.text.length),o)}var a=3==t.nodeType?t:null,s=t;for(a||1!=t.childNodes.length||3!=t.firstChild.nodeType||(a=t.firstChild,n&&(n=a.nodeValue.length));s.parentNode!=i;)s=s.parentNode;var c=e.measure,u=c.maps,d=r(a,s,n);if(d)return ae(d,o);for(var h=s.nextSibling,f=a?a.nodeValue.length-n:0;h;h=h.nextSibling){if(d=r(h,h.firstChild,0))return ae(Fo(d.line,d.ch-f),o);f+=h.textContent.length}for(var p=s.previousSibling,f=n;p;p=p.previousSibling){if(d=r(p,p.firstChild,-1))return ae(Fo(d.line,d.ch+f),o);f+=h.textContent.length}}function ue(e,t,n,r,i){function o(e){return function(t){return t.id==e}}function l(t){if(1==t.nodeType){var n=t.getAttribute("cm-text");if(null!=n)return""==n&&(n=t.textContent.replace(/\u200b/g,"")),void(a+=n);var u,d=t.getAttribute("cm-marker");if(d){var h=e.findMarks(Fo(r,0),Fo(i+1,0),o(+d));return void(h.length&&(u=h[0].find())&&(a+=Jr(e.doc,u.from,u.to).join(c)))}if("false"==t.getAttribute("contenteditable"))return;for(var f=0;f<t.childNodes.length;f++)l(t.childNodes[f]);/^(pre|div|p)$/i.test(t.nodeName)&&(s=!0)}else if(3==t.nodeType){var p=t.nodeValue;if(!p)return;s&&(a+=c,s=!1),a+=p}}for(var a="",s=!1,c=e.doc.lineSeparator();l(t),t!=n;)t=t.nextSibling;return a}function de(e,t){this.ranges=e,this.primIndex=t}function he(e,t){this.anchor=e,this.head=t}function fe(e,t){var n=e[t];e.sort(function(e,t){return Ro(e.from(),t.from())}),t=Ei(e,n);for(var r=1;r<e.length;r++){var i=e[r],o=e[r-1];if(Ro(o.to(),i.from())>=0){var l=X(o.from(),i.from()),a=K(o.to(),i.to()),s=o.empty()?i.from()==i.head:o.from()==o.head;t>=r&&--t,e.splice(--r,2,new he(s?a:l,s?l:a))}}return new de(e,t)}function pe(e,t){return new de([new he(e,t||e)],0)}function me(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function ge(e,t){if(t.line<e.first)return Fo(e.first,0);var n=e.first+e.size-1;return t.line>n?Fo(n,Qr(e,n).text.length):ve(t,Qr(e,t.line).text.length)}function ve(e,t){var n=e.ch;return null==n||n>t?Fo(e.line,t):0>n?Fo(e.line,0):e}function ye(e,t){return t>=e.first&&t<e.first+e.size}function xe(e,t){for(var n=[],r=0;r<t.length;r++)n[r]=ge(e,t[r]);return n}function be(e,t,n,r){if(e.cm&&e.cm.display.shift||e.extend){var i=t.anchor;if(r){var o=Ro(n,i)<0;o!=Ro(r,i)<0?(i=n,n=r):o!=Ro(n,r)<0&&(n=r)}return new he(i,n)}return new he(r||n,n)}function we(e,t,n,r){Me(e,new de([be(e,e.sel.primary(),t,n)],0),r)}function ke(e,t,n){for(var r=[],i=0;i<e.sel.ranges.length;i++)r[i]=be(e,e.sel.ranges[i],t[i],null);var o=fe(r,e.sel.primIndex);Me(e,o,n)}function Ce(e,t,n,r){var i=e.sel.ranges.slice(0);i[t]=n,Me(e,fe(i,e.sel.primIndex),r)}function Se(e,t,n,r){Me(e,pe(t,n),r)}function Le(e,t){var n={ranges:t.ranges,update:function(t){this.ranges=[];for(var n=0;n<t.length;n++)this.ranges[n]=new he(ge(e,t[n].anchor),ge(e,t[n].head))}};return Dl(e,"beforeSelectionChange",e,n),e.cm&&Dl(e.cm,"beforeSelectionChange",e.cm,n),n.ranges!=t.ranges?fe(n.ranges,n.ranges.length-1):t}function Te(e,t,n){var r=e.history.done,i=Di(r);i&&i.ranges?(r[r.length-1]=t,Ne(e,t,n)):Me(e,t,n)}function Me(e,t,n){Ne(e,t,n),hi(e,e.sel,e.cm?e.cm.curOp.id:NaN,n)}function Ne(e,t,n){(Ai(e,"beforeSelectionChange")||e.cm&&Ai(e.cm,"beforeSelectionChange"))&&(t=Le(e,t));var r=n&&n.bias||(Ro(t.primary().head,e.sel.primary().head)<0?-1:1);Ae(e,We(e,t,r,!0)),n&&n.scroll===!1||!e.cm||Rn(e.cm)}function Ae(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=e.cm.curOp.selectionChanged=!0,Ni(e.cm)),Li(e,"cursorActivity",e))}function Oe(e){Ae(e,We(e,e.sel,null,!1),zl)}function We(e,t,n,r){for(var i,o=0;o<t.ranges.length;o++){var l=t.ranges[o],a=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[o],s=De(e,l.anchor,a&&a.anchor,n,r),c=De(e,l.head,a&&a.head,n,r);(i||s!=l.anchor||c!=l.head)&&(i||(i=t.ranges.slice(0,o)),i[o]=new he(s,c))}return i?fe(i,t.primIndex):t}function He(e,t,n,r,i){var o=Qr(e,t.line);if(o.markedSpans)for(var l=0;l<o.markedSpans.length;++l){var a=o.markedSpans[l],s=a.marker;if((null==a.from||(s.inclusiveLeft?a.from<=t.ch:a.from<t.ch))&&(null==a.to||(s.inclusiveRight?a.to>=t.ch:a.to>t.ch))){if(i&&(Dl(s,"beforeCursorEnter"),s.explicitlyCleared)){if(o.markedSpans){--l;continue}break}if(!s.atomic)continue;if(n){var c,u=s.find(0>r?1:-1);if((0>r?s.inclusiveRight:s.inclusiveLeft)&&(u=Ee(e,u,-r,o)),u&&u.line==t.line&&(c=Ro(u,n))&&(0>r?0>c:c>0))return He(e,u,t,r,i)}var d=s.find(0>r?-1:1);return(0>r?s.inclusiveLeft:s.inclusiveRight)&&(d=Ee(e,d,r,o)),d?He(e,d,t,r,i):null}}return t}function De(e,t,n,r,i){var o=r||1,l=He(e,t,n,o,i)||!i&&He(e,t,n,o,!0)||He(e,t,n,-o,i)||!i&&He(e,t,n,-o,!0);return l?l:(e.cantEdit=!0,Fo(e.first,0))}function Ee(e,t,n,r){return 0>n&&0==t.ch?t.line>e.first?ge(e,Fo(t.line-1)):null:n>0&&t.ch==(r||Qr(e,t.line)).text.length?t.line<e.first+e.size-1?Fo(t.line+1,0):null:new Fo(t.line,t.ch+n)}function Ie(e){e.display.input.showSelection(e.display.input.prepareSelection())}function Pe(e,t){for(var n=e.doc,r={},i=r.cursors=document.createDocumentFragment(),o=r.selection=document.createDocumentFragment(),l=0;l<n.sel.ranges.length;l++)if(t!==!1||l!=n.sel.primIndex){var a=n.sel.ranges[l],s=a.empty();(s||e.options.showCursorWhenSelecting)&&ze(e,a.head,i),s||Fe(e,a,o)}return r}function ze(e,t,n){var r=pt(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),i=n.appendChild(qi("div"," ","CodeMirror-cursor"));if(i.style.left=r.left+"px",i.style.top=r.top+"px",i.style.height=Math.max(0,r.bottom-r.top)*e.options.cursorHeight+"px",r.other){var o=n.appendChild(qi("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));o.style.display="",o.style.left=r.other.left+"px",o.style.top=r.other.top+"px",o.style.height=.85*(r.other.bottom-r.other.top)+"px"}}function Fe(e,t,n){function r(e,t,n,r){0>t&&(t=0),t=Math.round(t),r=Math.round(r),a.appendChild(qi("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px; top: "+t+"px; width: "+(null==n?u-e:n)+"px; height: "+(r-t)+"px"))}function i(t,n,i){function o(n,r){return ft(e,Fo(t,n),"div",d,r)}var a,s,d=Qr(l,t),h=d.text.length;return to(oi(d),n||0,null==i?h:i,function(e,t,l){var d,f,p,m=o(e,"left");if(e==t)d=m,f=p=m.left;else{if(d=o(t-1,"right"),"rtl"==l){var g=m;m=d,d=g}f=m.left,p=d.right}null==n&&0==e&&(f=c),d.top-m.top>3&&(r(f,m.top,null,m.bottom),f=c,m.bottom<d.top&&r(f,m.bottom,null,d.top)),null==i&&t==h&&(p=u),(!a||m.top<a.top||m.top==a.top&&m.left<a.left)&&(a=m),(!s||d.bottom>s.bottom||d.bottom==s.bottom&&d.right>s.right)&&(s=d),c+1>f&&(f=c),r(f,d.top,p-f,d.bottom)}),{start:a,end:s}}var o=e.display,l=e.doc,a=document.createDocumentFragment(),s=$e(e.display),c=s.left,u=Math.max(o.sizerWidth,Ke(e)-o.sizer.offsetLeft)-s.right,d=t.from(),h=t.to();if(d.line==h.line)i(d.line,d.ch,h.ch);else{var f=Qr(l,d.line),p=Qr(l,h.line),m=xr(f)==xr(p),g=i(d.line,d.ch,m?f.text.length+1:null).end,v=i(h.line,m?0:null,h.ch).start;m&&(g.top<v.top-2?(r(g.right,g.top,null,g.bottom),r(c,v.top,v.left,v.bottom)):r(g.right,g.top,v.left-g.right,g.bottom)),g.bottom<v.top&&r(c,g.bottom,null,v.top)}n.appendChild(a)}function Re(e){if(e.state.focused){var t=e.display;clearInterval(t.blinker);var n=!0;t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval(function(){t.cursorDiv.style.visibility=(n=!n)?"":"hidden"},e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function Be(e,t){e.doc.mode.startState&&e.doc.frontier<e.display.viewTo&&e.state.highlight.set(t,Ri(_e,e))}function _e(e){var t=e.doc;if(t.frontier<t.first&&(t.frontier=t.first),!(t.frontier>=e.display.viewTo)){var n=+new Date+e.options.workTime,r=sl(t.mode,qe(e,t.frontier)),i=[];t.iter(t.frontier,Math.min(t.first+t.size,e.display.viewTo+500),function(o){if(t.frontier>=e.display.viewFrom){var l=o.styles,a=o.text.length>e.options.maxHighlightLength,s=Ir(e,o,a?sl(t.mode,r):r,!0);o.styles=s.styles;var c=o.styleClasses,u=s.classes;u?o.styleClasses=u:c&&(o.styleClasses=null);for(var d=!l||l.length!=o.styles.length||c!=u&&(!c||!u||c.bgClass!=u.bgClass||c.textClass!=u.textClass),h=0;!d&&h<l.length;++h)d=l[h]!=o.styles[h];d&&i.push(t.frontier),o.stateAfter=a?r:sl(t.mode,r)}else o.text.length<=e.options.maxHighlightLength&&zr(e,o.text,r),o.stateAfter=t.frontier%5==0?sl(t.mode,r):null;return++t.frontier,+new Date>n?(Be(e,e.options.workDelay),!0):void 0}),i.length&&Ot(e,function(){for(var t=0;t<i.length;t++)zt(e,i[t],"text")})}}function je(e,t,n){for(var r,i,o=e.doc,l=n?-1:t-(e.doc.mode.innerMode?1e3:100),a=t;a>l;--a){if(a<=o.first)return o.first;var s=Qr(o,a-1);if(s.stateAfter&&(!n||a<=o.frontier))return a;var c=Bl(s.text,null,e.options.tabSize);(null==i||r>c)&&(i=a-1,r=c)}return i}function qe(e,t,n){var r=e.doc,i=e.display;if(!r.mode.startState)return!0;var o=je(e,t,n),l=o>r.first&&Qr(r,o-1).stateAfter;return l=l?sl(r.mode,l):cl(r.mode),r.iter(o,t,function(n){zr(e,n.text,l);var a=o==t-1||o%5==0||o>=i.viewFrom&&o<i.viewTo;n.stateAfter=a?sl(r.mode,l):null,++o}),n&&(r.frontier=o),l}function Ge(e){return e.lineSpace.offsetTop}function Ue(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function $e(e){if(e.cachedPaddingH)return e.cachedPaddingH;var t=Ui(e.measure,qi("pre","x")),n=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,r={left:parseInt(n.paddingLeft),right:parseInt(n.paddingRight)};return isNaN(r.left)||isNaN(r.right)||(e.cachedPaddingH=r),r}function Ve(e){return Il-e.display.nativeBarWidth}function Ke(e){return e.display.scroller.clientWidth-Ve(e)-e.display.barWidth}function Xe(e){return e.display.scroller.clientHeight-Ve(e)-e.display.barHeight}function Ye(e,t,n){var r=e.options.lineWrapping,i=r&&Ke(e);if(!t.measure.heights||r&&t.measure.width!=i){var o=t.measure.heights=[];if(r){t.measure.width=i;for(var l=t.text.firstChild.getClientRects(),a=0;a<l.length-1;a++){var s=l[a],c=l[a+1];Math.abs(s.bottom-c.bottom)>2&&o.push((s.bottom+c.top)/2-n.top)}}o.push(n.bottom-n.top)}}function Ze(e,t,n){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache};for(var r=0;r<e.rest.length;r++)if(e.rest[r]==t)return{map:e.measure.maps[r],cache:e.measure.caches[r]};for(var r=0;r<e.rest.length;r++)if(ni(e.rest[r])>n)return{map:e.measure.maps[r],cache:e.measure.caches[r],before:!0}}function Qe(e,t){t=xr(t);var n=ni(t),r=e.display.externalMeasured=new Et(e.doc,t,n);r.lineN=n;var i=r.built=Rr(e,r);return r.text=i.pre,Ui(e.display.lineMeasure,i.pre),r}function Je(e,t,n,r){return nt(e,tt(e,t),n,r)}function et(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[Rt(e,t)];var n=e.display.externalMeasured;return n&&t>=n.lineN&&t<n.lineN+n.size?n:void 0}function tt(e,t){var n=ni(t),r=et(e,n);r&&!r.text?r=null:r&&r.changes&&(I(e,r,n,D(e)),e.curOp.forceUpdate=!0),r||(r=Qe(e,t));var i=Ze(r,t,n);return{line:t,view:r,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function nt(e,t,n,r,i){t.before&&(n=-1);var o,l=n+(r||"");return t.cache.hasOwnProperty(l)?o=t.cache[l]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(Ye(e,t.view,t.rect),t.hasHeights=!0),o=it(e,t,n,r),o.bogus||(t.cache[l]=o)),{left:o.left,right:o.right,top:i?o.rtop:o.top,bottom:i?o.rbottom:o.bottom}}function rt(e,t,n){for(var r,i,o,l,a=0;a<e.length;a+=3){var s=e[a],c=e[a+1];if(s>t?(i=0,o=1,l="left"):c>t?(i=t-s,o=i+1):(a==e.length-3||t==c&&e[a+3]>t)&&(o=c-s,i=o-1,t>=c&&(l="right")),null!=i){if(r=e[a+2],s==c&&n==(r.insertLeft?"left":"right")&&(l=n),"left"==n&&0==i)for(;a&&e[a-2]==e[a-3]&&e[a-1].insertLeft;)r=e[(a-=3)+2],l="left";if("right"==n&&i==c-s)for(;a<e.length-3&&e[a+3]==e[a+4]&&!e[a+5].insertLeft;)r=e[(a+=3)+2],l="right";break}}return{node:r,start:i,end:o,collapse:l,coverStart:s,coverEnd:c}}function it(e,t,n,r){var i,o=rt(t.map,n,r),l=o.node,a=o.start,s=o.end,c=o.collapse;if(3==l.nodeType){for(var u=0;4>u;u++){for(;a&&ji(t.line.text.charAt(o.coverStart+a));)--a;for(;o.coverStart+s<o.coverEnd&&ji(t.line.text.charAt(o.coverStart+s));)++s;if(bo&&9>wo&&0==a&&s==o.coverEnd-o.coverStart)i=l.parentNode.getBoundingClientRect();else if(bo&&e.options.lineWrapping){var d=Gl(l,a,s).getClientRects();i=d.length?d["right"==r?d.length-1:0]:Go}else i=Gl(l,a,s).getBoundingClientRect()||Go;if(i.left||i.right||0==a)break;s=a,a-=1,c="right"}bo&&11>wo&&(i=ot(e.display.measure,i))}else{a>0&&(c=r="right");var d;i=e.options.lineWrapping&&(d=l.getClientRects()).length>1?d["right"==r?d.length-1:0]:l.getBoundingClientRect()}if(bo&&9>wo&&!a&&(!i||!i.left&&!i.right)){var h=l.parentNode.getClientRects()[0];i=h?{left:h.left,right:h.left+bt(e.display),top:h.top,bottom:h.bottom}:Go}for(var f=i.top-t.rect.top,p=i.bottom-t.rect.top,m=(f+p)/2,g=t.view.measure.heights,u=0;u<g.length-1&&!(m<g[u]);u++);var v=u?g[u-1]:0,y=g[u],x={left:("right"==c?i.right:i.left)-t.rect.left,right:("left"==c?i.left:i.right)-t.rect.left,top:v,bottom:y};return i.left||i.right||(x.bogus=!0),e.options.singleCursorHeightPerLine||(x.rtop=f,x.rbottom=p),x}function ot(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!eo(e))return t;var n=screen.logicalXDPI/screen.deviceXDPI,r=screen.logicalYDPI/screen.deviceYDPI;return{left:t.left*n,right:t.right*n,top:t.top*r,bottom:t.bottom*r}}function lt(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function at(e){e.display.externalMeasure=null,Gi(e.display.lineMeasure);for(var t=0;t<e.display.view.length;t++)lt(e.display.view[t])}function st(e){at(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function ct(){return window.pageXOffset||(document.documentElement||document.body).scrollLeft}function ut(){return window.pageYOffset||(document.documentElement||document.body).scrollTop}function dt(e,t,n,r){if(t.widgets)for(var i=0;i<t.widgets.length;++i)if(t.widgets[i].above){var o=Tr(t.widgets[i]);n.top+=o,n.bottom+=o}if("line"==r)return n;r||(r="local");var l=ii(t);if("local"==r?l+=Ge(e.display):l-=e.display.viewOffset,"page"==r||"window"==r){var a=e.display.lineSpace.getBoundingClientRect();l+=a.top+("window"==r?0:ut());var s=a.left+("window"==r?0:ct());n.left+=s,n.right+=s}return n.top+=l,n.bottom+=l,n}function ht(e,t,n){if("div"==n)return t;var r=t.left,i=t.top;if("page"==n)r-=ct(),i-=ut();else if("local"==n||!n){var o=e.display.sizer.getBoundingClientRect();r+=o.left,i+=o.top}var l=e.display.lineSpace.getBoundingClientRect();return{left:r-l.left,top:i-l.top}}function ft(e,t,n,r,i){return r||(r=Qr(e.doc,t.line)),dt(e,r,Je(e,r,t.ch,i),n)}function pt(e,t,n,r,i,o){function l(t,l){var a=nt(e,i,t,l?"right":"left",o);return l?a.left=a.right:a.right=a.left,dt(e,r,a,n)}function a(e,t){var n=s[t],r=n.level%2;return e==no(n)&&t&&n.level<s[t-1].level?(n=s[--t],e=ro(n)-(n.level%2?0:1),r=!0):e==ro(n)&&t<s.length-1&&n.level<s[t+1].level&&(n=s[++t],e=no(n)-n.level%2,r=!1),r&&e==n.to&&e>n.from?l(e-1):l(e,r)}r=r||Qr(e.doc,t.line),i||(i=tt(e,r));var s=oi(r),c=t.ch;if(!s)return l(c);var u=uo(s,c),d=a(c,u);return null!=la&&(d.other=a(c,la)),d}function mt(e,t){var n=0,t=ge(e.doc,t);e.options.lineWrapping||(n=bt(e.display)*t.ch);var r=Qr(e.doc,t.line),i=ii(r)+Ge(e.display);return{left:n,right:n,top:i,bottom:i+r.height}}function gt(e,t,n,r){var i=Fo(e,t);return i.xRel=r,n&&(i.outside=!0),i}function vt(e,t,n){var r=e.doc;if(n+=e.display.viewOffset,0>n)return gt(r.first,0,!0,-1);var i=ri(r,n),o=r.first+r.size-1;if(i>o)return gt(r.first+r.size-1,Qr(r,o).text.length,!0,1);0>t&&(t=0);for(var l=Qr(r,i);;){var a=yt(e,l,i,t,n),s=vr(l),c=s&&s.find(0,!0);if(!s||!(a.ch>c.from.ch||a.ch==c.from.ch&&a.xRel>0))return a;i=ni(l=c.to.line)}}function yt(e,t,n,r,i){function o(r){var i=pt(e,Fo(n,r),"line",t,c);return a=!0,l>i.bottom?i.left-s:l<i.top?i.left+s:(a=!1,i.left)}var l=i-ii(t),a=!1,s=2*e.display.wrapper.clientWidth,c=tt(e,t),u=oi(t),d=t.text.length,h=io(t),f=oo(t),p=o(h),m=a,g=o(f),v=a;if(r>g)return gt(n,f,v,1);for(;;){if(u?f==h||f==fo(t,h,1):1>=f-h){for(var y=p>r||g-r>=r-p?h:f,x=r-(y==h?p:g);ji(t.text.charAt(y));)++y;var b=gt(n,y,y==h?m:v,-1>x?-1:x>1?1:0);return b}var w=Math.ceil(d/2),k=h+w;if(u){k=h;for(var C=0;w>C;++C)k=fo(t,k,1)}var S=o(k);S>r?(f=k,g=S,(v=a)&&(g+=1e3),d=w):(h=k,p=S,m=a,d-=w)}}function xt(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight;if(null==_o){_o=qi("pre");for(var t=0;49>t;++t)_o.appendChild(document.createTextNode("x")),_o.appendChild(qi("br"));_o.appendChild(document.createTextNode("x"))}Ui(e.measure,_o);var n=_o.offsetHeight/50;return n>3&&(e.cachedTextHeight=n),Gi(e.measure),n||1}function bt(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth;var t=qi("span","xxxxxxxxxx"),n=qi("pre",[t]);Ui(e.measure,n);var r=t.getBoundingClientRect(),i=(r.right-r.left)/10;return i>2&&(e.cachedCharWidth=i),i||10}function wt(e){e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:null,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++$o},Uo?Uo.ops.push(e.curOp):e.curOp.ownsGroup=Uo={ops:[e.curOp],delayedCallbacks:[]}}function kt(e){var t=e.delayedCallbacks,n=0;do{for(;n<t.length;n++)t[n].call(null);for(var r=0;r<e.ops.length;r++){var i=e.ops[r];if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(n<t.length)}function Ct(e){var t=e.curOp,n=t.ownsGroup;if(n)try{kt(n)}finally{Uo=null;for(var r=0;r<n.ops.length;r++)n.ops[r].cm.curOp=null;St(n)}}function St(e){for(var t=e.ops,n=0;n<t.length;n++)Lt(t[n]);for(var n=0;n<t.length;n++)Tt(t[n]);for(var n=0;n<t.length;n++)Mt(t[n]);for(var n=0;n<t.length;n++)Nt(t[n]);for(var n=0;n<t.length;n++)At(t[n])}function Lt(e){var t=e.cm,n=t.display;T(t),e.updateMaxLine&&h(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<n.viewFrom||e.scrollToPos.to.line>=n.viewTo)||n.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new L(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function Tt(e){e.updatedDisplay=e.mustUpdate&&M(e.cm,e.update)}function Mt(e){var t=e.cm,n=t.display;e.updatedDisplay&&W(t),e.barMeasure=p(t),n.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Je(t,n.maxLine,n.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(n.scroller.clientWidth,n.sizer.offsetLeft+e.adjustWidthTo+Ve(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,n.sizer.offsetLeft+e.adjustWidthTo-Ke(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=n.input.prepareSelection())}function Nt(e){var t=e.cm;null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&ln(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1),e.preparedSelection&&t.display.input.showSelection(e.preparedSelection),e.updatedDisplay&&O(t,e.barMeasure),(e.updatedDisplay||e.startHeight!=t.doc.height)&&y(t,e.barMeasure),e.selectionChanged&&Re(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),!e.focus||e.focus!=$i()||document.hasFocus&&!document.hasFocus()||Y(e.cm)}function At(e){var t=e.cm,n=t.display,r=t.doc;if(e.updatedDisplay&&N(t,e.update),null==n.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(n.wheelStartX=n.wheelStartY=null),null==e.scrollTop||n.scroller.scrollTop==e.scrollTop&&!e.forceScroll||(r.scrollTop=Math.max(0,Math.min(n.scroller.scrollHeight-n.scroller.clientHeight,e.scrollTop)),n.scrollbars.setScrollTop(r.scrollTop),n.scroller.scrollTop=r.scrollTop),null==e.scrollLeft||n.scroller.scrollLeft==e.scrollLeft&&!e.forceScroll||(r.scrollLeft=Math.max(0,Math.min(n.scroller.scrollWidth-Ke(t),e.scrollLeft)),n.scrollbars.setScrollLeft(r.scrollLeft),n.scroller.scrollLeft=r.scrollLeft,w(t)),e.scrollToPos){var i=In(t,ge(r,e.scrollToPos.from),ge(r,e.scrollToPos.to),e.scrollToPos.margin);e.scrollToPos.isCursor&&t.state.focused&&En(t,i)}var o=e.maybeHiddenMarkers,l=e.maybeUnhiddenMarkers;if(o)for(var a=0;a<o.length;++a)o[a].lines.length||Dl(o[a],"hide");if(l)for(var a=0;a<l.length;++a)l[a].lines.length&&Dl(l[a],"unhide");n.wrapper.offsetHeight&&(r.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&Dl(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function Ot(e,t){if(e.curOp)return t();wt(e);try{return t()}finally{Ct(e)}}function Wt(e,t){return function(){if(e.curOp)return t.apply(e,arguments);wt(e);try{return t.apply(e,arguments)}finally{Ct(e)}}}function Ht(e){return function(){if(this.curOp)return e.apply(this,arguments);wt(this);try{return e.apply(this,arguments)}finally{Ct(this)}}}function Dt(e){return function(){var t=this.cm;if(!t||t.curOp)return e.apply(this,arguments);wt(t);try{return e.apply(this,arguments)}finally{Ct(t)}}}function Et(e,t,n){this.line=t,this.rest=br(t),this.size=this.rest?ni(Di(this.rest))-n+1:1,this.node=this.text=null,this.hidden=Cr(e,t)}function It(e,t,n){for(var r,i=[],o=t;n>o;o=r){var l=new Et(e.doc,Qr(e.doc,o),o);r=o+l.size,i.push(l)}return i}function Pt(e,t,n,r){null==t&&(t=e.doc.first),null==n&&(n=e.doc.first+e.doc.size),r||(r=0);var i=e.display;if(r&&n<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)zo&&wr(e.doc,t)<i.viewTo&&Ft(e);else if(n<=i.viewFrom)zo&&kr(e.doc,n+r)>i.viewFrom?Ft(e):(i.viewFrom+=r,i.viewTo+=r);else if(t<=i.viewFrom&&n>=i.viewTo)Ft(e);else if(t<=i.viewFrom){var o=Bt(e,n,n+r,1);o?(i.view=i.view.slice(o.index),i.viewFrom=o.lineN,i.viewTo+=r):Ft(e)}else if(n>=i.viewTo){var o=Bt(e,t,t,-1);o?(i.view=i.view.slice(0,o.index),i.viewTo=o.lineN):Ft(e)}else{var l=Bt(e,t,t,-1),a=Bt(e,n,n+r,1);l&&a?(i.view=i.view.slice(0,l.index).concat(It(e,l.lineN,a.lineN)).concat(i.view.slice(a.index)),i.viewTo+=r):Ft(e)}var s=i.externalMeasured;s&&(n<s.lineN?s.lineN+=r:t<s.lineN+s.size&&(i.externalMeasured=null))}function zt(e,t,n){e.curOp.viewChanged=!0;var r=e.display,i=e.display.externalMeasured;if(i&&t>=i.lineN&&t<i.lineN+i.size&&(r.externalMeasured=null),!(t<r.viewFrom||t>=r.viewTo)){var o=r.view[Rt(e,t)];if(null!=o.node){var l=o.changes||(o.changes=[]);-1==Ei(l,n)&&l.push(n)}}}function Ft(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function Rt(e,t){if(t>=e.display.viewTo)return null;if(t-=e.display.viewFrom,0>t)return null;for(var n=e.display.view,r=0;r<n.length;r++)if(t-=n[r].size,0>t)return r}function Bt(e,t,n,r){var i,o=Rt(e,t),l=e.display.view;if(!zo||n==e.doc.first+e.doc.size)return{index:o,lineN:n};for(var a=0,s=e.display.viewFrom;o>a;a++)s+=l[a].size;if(s!=t){if(r>0){if(o==l.length-1)return null;i=s+l[o].size-t,o++}else i=s-t;t+=i,n+=i}for(;wr(e.doc,n)!=n;){if(o==(0>r?0:l.length-1))return null;n+=r*l[o-(0>r?1:0)].size,o+=r}return{index:o,lineN:n}}function _t(e,t,n){var r=e.display,i=r.view;0==i.length||t>=r.viewTo||n<=r.viewFrom?(r.view=It(e,t,n),r.viewFrom=t):(r.viewFrom>t?r.view=It(e,t,r.viewFrom).concat(r.view):r.viewFrom<t&&(r.view=r.view.slice(Rt(e,t))),r.viewFrom=t,r.viewTo<n?r.view=r.view.concat(It(e,r.viewTo,n)):r.viewTo>n&&(r.view=r.view.slice(0,Rt(e,n)))),r.viewTo=n}function jt(e){for(var t=e.display.view,n=0,r=0;r<t.length;r++){var i=t[r];i.hidden||i.node&&!i.changes||++n}return n}function qt(e){function t(){i.activeTouch&&(o=setTimeout(function(){i.activeTouch=null},1e3),l=i.activeTouch,l.end=+new Date)}function n(e){if(1!=e.touches.length)return!1;var t=e.touches[0];return t.radiusX<=1&&t.radiusY<=1}function r(e,t){if(null==t.left)return!0;var n=t.left-e.left,r=t.top-e.top;return n*n+r*r>400}var i=e.display;Ol(i.scroller,"mousedown",Wt(e,Kt)),bo&&11>wo?Ol(i.scroller,"dblclick",Wt(e,function(t){if(!Mi(e,t)){var n=Vt(e,t);if(n&&!Jt(e,t)&&!$t(e.display,t)){Ml(t);var r=e.findWordAt(n);we(e.doc,r.anchor,r.head)}}})):Ol(i.scroller,"dblclick",function(t){Mi(e,t)||Ml(t)}),Io||Ol(i.scroller,"contextmenu",function(t){bn(e,t)});var o,l={end:0};Ol(i.scroller,"touchstart",function(e){if(!n(e)){clearTimeout(o);var t=+new Date;i.activeTouch={start:t,moved:!1,prev:t-l.end<=300?l:null},1==e.touches.length&&(i.activeTouch.left=e.touches[0].pageX,i.activeTouch.top=e.touches[0].pageY)}}),Ol(i.scroller,"touchmove",function(){i.activeTouch&&(i.activeTouch.moved=!0)}),Ol(i.scroller,"touchend",function(n){var o=i.activeTouch;if(o&&!$t(i,n)&&null!=o.left&&!o.moved&&new Date-o.start<300){var l,a=e.coordsChar(i.activeTouch,"page");l=!o.prev||r(o,o.prev)?new he(a,a):!o.prev.prev||r(o,o.prev.prev)?e.findWordAt(a):new he(Fo(a.line,0),ge(e.doc,Fo(a.line+1,0))),e.setSelection(l.anchor,l.head),e.focus(),Ml(n)}t()}),Ol(i.scroller,"touchcancel",t),Ol(i.scroller,"scroll",function(){i.scroller.clientHeight&&(on(e,i.scroller.scrollTop),ln(e,i.scroller.scrollLeft,!0),Dl(e,"scroll",e))}),Ol(i.scroller,"mousewheel",function(t){an(e,t)}),Ol(i.scroller,"DOMMouseScroll",function(t){an(e,t)}),Ol(i.wrapper,"scroll",function(){i.wrapper.scrollTop=i.wrapper.scrollLeft=0}),i.dragFunctions={enter:function(t){Mi(e,t)||Al(t)},over:function(t){Mi(e,t)||(nn(e,t),Al(t))},start:function(t){tn(e,t)},drop:Wt(e,en),leave:function(){rn(e)}};var a=i.input.getField();Ol(a,"keyup",function(t){mn.call(e,t)}),Ol(a,"keydown",Wt(e,fn)),Ol(a,"keypress",Wt(e,gn)),Ol(a,"focus",Ri(yn,e)),Ol(a,"blur",Ri(xn,e))}function Gt(t,n,r){var i=r&&r!=e.Init;if(!n!=!i){var o=t.display.dragFunctions,l=n?Ol:Hl;l(t.display.scroller,"dragstart",o.start),l(t.display.scroller,"dragenter",o.enter),l(t.display.scroller,"dragover",o.over),l(t.display.scroller,"dragleave",o.leave),l(t.display.scroller,"drop",o.drop)}}function Ut(e){var t=e.display;(t.lastWrapHeight!=t.wrapper.clientHeight||t.lastWrapWidth!=t.wrapper.clientWidth)&&(t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize())}function $t(e,t){for(var n=ki(t);n!=e.wrapper;n=n.parentNode)if(!n||1==n.nodeType&&"true"==n.getAttribute("cm-ignore-events")||n.parentNode==e.sizer&&n!=e.mover)return!0}function Vt(e,t,n,r){var i=e.display;if(!n&&"true"==ki(t).getAttribute("cm-not-content"))return null;var o,l,a=i.lineSpace.getBoundingClientRect();try{o=t.clientX-a.left,l=t.clientY-a.top}catch(t){return null}var s,c=vt(e,o,l);if(r&&1==c.xRel&&(s=Qr(e.doc,c.line).text).length==c.ch){var u=Bl(s,s.length,e.options.tabSize)-s.length;c=Fo(c.line,Math.max(0,Math.round((o-$e(e.display).left)/bt(e.display))-u))}return c}function Kt(e){var t=this,n=t.display;if(!(n.activeTouch&&n.input.supportsTouch()||Mi(t,e))){if(n.shift=e.shiftKey,$t(n,e))return void(ko||(n.scroller.draggable=!1,setTimeout(function(){n.scroller.draggable=!0},100)));if(!Jt(t,e)){var r=Vt(t,e);switch(window.focus(),Ci(e)){case 1:t.state.selectingText?t.state.selectingText(e):r?Xt(t,e,r):ki(e)==n.scroller&&Ml(e);break;case 2:ko&&(t.state.lastMiddleDown=+new Date),r&&we(t.doc,r),setTimeout(function(){n.input.focus()},20),Ml(e);break;case 3:Io?bn(t,e):vn(t)}}}}function Xt(e,t,n){bo?setTimeout(Ri(Y,e),0):e.curOp.focus=$i();var r,i=+new Date;qo&&qo.time>i-400&&0==Ro(qo.pos,n)?r="triple":jo&&jo.time>i-400&&0==Ro(jo.pos,n)?(r="double",qo={time:i,pos:n}):(r="single",jo={time:i,pos:n});var o,l=e.doc.sel,a=Wo?t.metaKey:t.ctrlKey;e.options.dragDrop&&ea&&!Z(e)&&"single"==r&&(o=l.contains(n))>-1&&(Ro((o=l.ranges[o]).from(),n)<0||n.xRel>0)&&(Ro(o.to(),n)>0||n.xRel<0)?Yt(e,t,n,a):Zt(e,t,n,r,a)}function Yt(e,t,n,r){var i=e.display,o=+new Date,l=Wt(e,function(a){ko&&(i.scroller.draggable=!1),e.state.draggingText=!1,Hl(document,"mouseup",l),Hl(i.scroller,"drop",l),Math.abs(t.clientX-a.clientX)+Math.abs(t.clientY-a.clientY)<10&&(Ml(a),!r&&+new Date-200<o&&we(e.doc,n),ko||bo&&9==wo?setTimeout(function(){document.body.focus(),i.input.focus()},20):i.input.focus())});ko&&(i.scroller.draggable=!0),e.state.draggingText=l,i.scroller.dragDrop&&i.scroller.dragDrop(),Ol(document,"mouseup",l),Ol(i.scroller,"drop",l)}function Zt(e,t,n,r,i){function o(t){if(0!=Ro(g,t))if(g=t,"rect"==r){for(var i=[],o=e.options.tabSize,l=Bl(Qr(c,n.line).text,n.ch,o),a=Bl(Qr(c,t.line).text,t.ch,o),s=Math.min(l,a),f=Math.max(l,a),p=Math.min(n.line,t.line),m=Math.min(e.lastLine(),Math.max(n.line,t.line));m>=p;p++){var v=Qr(c,p).text,y=_l(v,s,o);s==f?i.push(new he(Fo(p,y),Fo(p,y))):v.length>y&&i.push(new he(Fo(p,y),Fo(p,_l(v,f,o))))}i.length||i.push(new he(n,n)),Me(c,fe(h.ranges.slice(0,d).concat(i),d),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var x=u,b=x.anchor,w=t;if("single"!=r){if("double"==r)var k=e.findWordAt(t);else var k=new he(Fo(t.line,0),ge(c,Fo(t.line+1,0)));Ro(k.anchor,b)>0?(w=k.head,b=X(x.from(),k.anchor)):(w=k.anchor,b=K(x.to(),k.head))}var i=h.ranges.slice(0);i[d]=new he(ge(c,b),w),Me(c,fe(i,d),Fl)}}function l(t){var n=++y,i=Vt(e,t,!0,"rect"==r);if(i)if(0!=Ro(i,g)){e.curOp.focus=$i(),o(i);var a=b(s,c);(i.line>=a.to||i.line<a.from)&&setTimeout(Wt(e,function(){y==n&&l(t)}),150)}else{var u=t.clientY<v.top?-20:t.clientY>v.bottom?20:0;u&&setTimeout(Wt(e,function(){y==n&&(s.scroller.scrollTop+=u,l(t))}),50)}}function a(t){e.state.selectingText=!1,y=1/0,Ml(t),s.input.focus(),Hl(document,"mousemove",x),Hl(document,"mouseup",w),c.history.lastSelOrigin=null}var s=e.display,c=e.doc;Ml(t);var u,d,h=c.sel,f=h.ranges;if(i&&!t.shiftKey?(d=c.sel.contains(n),u=d>-1?f[d]:new he(n,n)):(u=c.sel.primary(),d=c.sel.primIndex),t.altKey)r="rect",i||(u=new he(n,n)),n=Vt(e,t,!0,!0),d=-1;else if("double"==r){var p=e.findWordAt(n);u=e.display.shift||c.extend?be(c,u,p.anchor,p.head):p}else if("triple"==r){var m=new he(Fo(n.line,0),ge(c,Fo(n.line+1,0)));u=e.display.shift||c.extend?be(c,u,m.anchor,m.head):m}else u=be(c,u,n);i?-1==d?(d=f.length,Me(c,fe(f.concat([u]),d),{scroll:!1,origin:"*mouse"})):f.length>1&&f[d].empty()&&"single"==r&&!t.shiftKey?(Me(c,fe(f.slice(0,d).concat(f.slice(d+1)),0),{scroll:!1,origin:"*mouse"}),h=c.sel):Ce(c,d,u,Fl):(d=0,Me(c,new de([u],0),Fl),h=c.sel);var g=n,v=s.wrapper.getBoundingClientRect(),y=0,x=Wt(e,function(e){Ci(e)?l(e):a(e)}),w=Wt(e,a);e.state.selectingText=w,Ol(document,"mousemove",x),Ol(document,"mouseup",w)}function Qt(e,t,n,r){try{var i=t.clientX,o=t.clientY}catch(t){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1;r&&Ml(t);var l=e.display,a=l.lineDiv.getBoundingClientRect();if(o>a.bottom||!Ai(e,n))return wi(t);o-=a.top-l.viewOffset;for(var s=0;s<e.options.gutters.length;++s){var c=l.gutters.childNodes[s];if(c&&c.getBoundingClientRect().right>=i){var u=ri(e.doc,o),d=e.options.gutters[s];return Dl(e,n,e,u,d,t),wi(t)}}}function Jt(e,t){return Qt(e,t,"gutterClick",!0)}function en(e){var t=this;if(rn(t),!Mi(t,e)&&!$t(t.display,e)){Ml(e),bo&&(Vo=+new Date);var n=Vt(t,e,!0),r=e.dataTransfer.files;if(n&&!Z(t))if(r&&r.length&&window.FileReader&&window.File)for(var i=r.length,o=Array(i),l=0,a=function(e,r){if(!t.options.allowDropFileTypes||-1!=Ei(t.options.allowDropFileTypes,e.type)){var a=new FileReader;a.onload=Wt(t,function(){var e=a.result;if(/[\x00-\x08\x0e-\x1f]{2}/.test(e)&&(e=""),o[r]=e,++l==i){n=ge(t.doc,n);var s={from:n,to:n,text:t.doc.splitLines(o.join(t.doc.lineSeparator())),origin:"paste"};Mn(t.doc,s),Te(t.doc,pe(n,Jo(s)))}}),a.readAsText(e)}},s=0;i>s;++s)a(r[s],s);else{if(t.state.draggingText&&t.doc.sel.contains(n)>-1)return t.state.draggingText(e),void setTimeout(function(){t.display.input.focus()},20);try{var o=e.dataTransfer.getData("Text");if(o){if(t.state.draggingText&&!(Wo?e.altKey:e.ctrlKey))var c=t.listSelections();if(Ne(t.doc,pe(n,n)),c)for(var s=0;s<c.length;++s)Dn(t.doc,"",c[s].anchor,c[s].head,"drag");t.replaceSelection(o,"around","paste"),t.display.input.focus()}}catch(e){}}}}function tn(e,t){if(bo&&(!e.state.draggingText||+new Date-Vo<100))return void Al(t);
if(!Mi(e,t)&&!$t(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.setDragImage&&!To)){var n=qi("img",null,null,"position: fixed; left: 0; top: 0;");n.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",Lo&&(n.width=n.height=1,e.display.wrapper.appendChild(n),n._top=n.offsetTop),t.dataTransfer.setDragImage(n,0,0),Lo&&n.parentNode.removeChild(n)}}function nn(e,t){var n=Vt(e,t);if(n){var r=document.createDocumentFragment();ze(e,n,r),e.display.dragCursor||(e.display.dragCursor=qi("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),Ui(e.display.dragCursor,r)}}function rn(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function on(e,t){Math.abs(e.doc.scrollTop-t)<2||(e.doc.scrollTop=t,vo||A(e,{top:t}),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t),e.display.scrollbars.setScrollTop(t),vo&&A(e),Be(e,100))}function ln(e,t,n){(n?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)||(t=Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth),e.doc.scrollLeft=t,w(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function an(e,t){var n=Yo(t),r=n.x,i=n.y,o=e.display,l=o.scroller,a=l.scrollWidth>l.clientWidth,s=l.scrollHeight>l.clientHeight;if(r&&a||i&&s){if(i&&Wo&&ko)e:for(var c=t.target,u=o.view;c!=l;c=c.parentNode)for(var d=0;d<u.length;d++)if(u[d].node==c){e.display.currentWheelTarget=c;break e}if(r&&!vo&&!Lo&&null!=Xo)return i&&s&&on(e,Math.max(0,Math.min(l.scrollTop+i*Xo,l.scrollHeight-l.clientHeight))),ln(e,Math.max(0,Math.min(l.scrollLeft+r*Xo,l.scrollWidth-l.clientWidth))),(!i||i&&s)&&Ml(t),void(o.wheelStartX=null);if(i&&null!=Xo){var h=i*Xo,f=e.doc.scrollTop,p=f+o.wrapper.clientHeight;0>h?f=Math.max(0,f+h-50):p=Math.min(e.doc.height,p+h+50),A(e,{top:f,bottom:p})}20>Ko&&(null==o.wheelStartX?(o.wheelStartX=l.scrollLeft,o.wheelStartY=l.scrollTop,o.wheelDX=r,o.wheelDY=i,setTimeout(function(){if(null!=o.wheelStartX){var e=l.scrollLeft-o.wheelStartX,t=l.scrollTop-o.wheelStartY,n=t&&o.wheelDY&&t/o.wheelDY||e&&o.wheelDX&&e/o.wheelDX;o.wheelStartX=o.wheelStartY=null,n&&(Xo=(Xo*Ko+n)/(Ko+1),++Ko)}},200)):(o.wheelDX+=r,o.wheelDY+=i))}}function sn(e,t,n){if("string"==typeof t&&(t=ul[t],!t))return!1;e.display.input.ensurePolled();var r=e.display.shift,i=!1;try{Z(e)&&(e.state.suppressEdits=!0),n&&(e.display.shift=!1),i=t(e)!=Pl}finally{e.display.shift=r,e.state.suppressEdits=!1}return i}function cn(e,t,n){for(var r=0;r<e.state.keyMaps.length;r++){var i=hl(t,e.state.keyMaps[r],n,e);if(i)return i}return e.options.extraKeys&&hl(t,e.options.extraKeys,n,e)||hl(t,e.options.keyMap,n,e)}function un(e,t,n,r){var i=e.state.keySeq;if(i){if(fl(t))return"handled";Zo.set(50,function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())}),t=i+" "+t}var o=cn(e,t,r);return"multi"==o&&(e.state.keySeq=t),"handled"==o&&Li(e,"keyHandled",e,t,n),("handled"==o||"multi"==o)&&(Ml(n),Re(e)),i&&!o&&/\'$/.test(t)?(Ml(n),!0):!!o}function dn(e,t){var n=pl(t,!0);return n?t.shiftKey&&!e.state.keySeq?un(e,"Shift-"+n,t,function(t){return sn(e,t,!0)})||un(e,n,t,function(t){return("string"==typeof t?/^go[A-Z]/.test(t):t.motion)?sn(e,t):void 0}):un(e,n,t,function(t){return sn(e,t)}):!1}function hn(e,t,n){return un(e,"'"+n+"'",t,function(t){return sn(e,t,!0)})}function fn(e){var t=this;if(t.curOp.focus=$i(),!Mi(t,e)){bo&&11>wo&&27==e.keyCode&&(e.returnValue=!1);var n=e.keyCode;t.display.shift=16==n||e.shiftKey;var r=dn(t,e);Lo&&(Qo=r?n:null,!r&&88==n&&!ra&&(Wo?e.metaKey:e.ctrlKey)&&t.replaceSelection("",null,"cut")),18!=n||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||pn(t)}}function pn(e){function t(e){18!=e.keyCode&&e.altKey||(Zl(n,"CodeMirror-crosshair"),Hl(document,"keyup",t),Hl(document,"mouseover",t))}var n=e.display.lineDiv;Ql(n,"CodeMirror-crosshair"),Ol(document,"keyup",t),Ol(document,"mouseover",t)}function mn(e){16==e.keyCode&&(this.doc.sel.shift=!1),Mi(this,e)}function gn(e){var t=this;if(!($t(t.display,e)||Mi(t,e)||e.ctrlKey&&!e.altKey||Wo&&e.metaKey)){var n=e.keyCode,r=e.charCode;if(Lo&&n==Qo)return Qo=null,void Ml(e);if(!Lo||e.which&&!(e.which<10)||!dn(t,e)){var i=String.fromCharCode(null==r?n:r);hn(t,e,i)||t.display.input.onKeyPress(e)}}}function vn(e){e.state.delayingBlurEvent=!0,setTimeout(function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,xn(e))},100)}function yn(e){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(Dl(e,"focus",e),e.state.focused=!0,Ql(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),ko&&setTimeout(function(){e.display.input.reset(!0)},20)),e.display.input.receivedFocus()),Re(e))}function xn(e){e.state.delayingBlurEvent||(e.state.focused&&(Dl(e,"blur",e),e.state.focused=!1,Zl(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout(function(){e.state.focused||(e.display.shift=!1)},150))}function bn(e,t){$t(e.display,t)||wn(e,t)||Mi(e,t,"contextmenu")||e.display.input.onContextMenu(t)}function wn(e,t){return Ai(e,"gutterContextMenu")?Qt(e,t,"gutterContextMenu",!1):!1}function kn(e,t){if(Ro(e,t.from)<0)return e;if(Ro(e,t.to)<=0)return Jo(t);var n=e.line+t.text.length-(t.to.line-t.from.line)-1,r=e.ch;return e.line==t.to.line&&(r+=Jo(t).ch-t.to.ch),Fo(n,r)}function Cn(e,t){for(var n=[],r=0;r<e.sel.ranges.length;r++){var i=e.sel.ranges[r];n.push(new he(kn(i.anchor,t),kn(i.head,t)))}return fe(n,e.sel.primIndex)}function Sn(e,t,n){return e.line==t.line?Fo(n.line,e.ch-t.ch+n.ch):Fo(n.line+(e.line-t.line),e.ch)}function Ln(e,t,n){for(var r=[],i=Fo(e.first,0),o=i,l=0;l<t.length;l++){var a=t[l],s=Sn(a.from,i,o),c=Sn(Jo(a),i,o);if(i=a.to,o=c,"around"==n){var u=e.sel.ranges[l],d=Ro(u.head,u.anchor)<0;r[l]=new he(d?c:s,d?s:c)}else r[l]=new he(s,s)}return new de(r,e.sel.primIndex)}function Tn(e,t,n){var r={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){this.canceled=!0}};return n&&(r.update=function(t,n,r,i){t&&(this.from=ge(e,t)),n&&(this.to=ge(e,n)),r&&(this.text=r),void 0!==i&&(this.origin=i)}),Dl(e,"beforeChange",e,r),e.cm&&Dl(e.cm,"beforeChange",e.cm,r),r.canceled?null:{from:r.from,to:r.to,text:r.text,origin:r.origin}}function Mn(e,t,n){if(e.cm){if(!e.cm.curOp)return Wt(e.cm,Mn)(e,t,n);if(e.cm.state.suppressEdits)return}if(!(Ai(e,"beforeChange")||e.cm&&Ai(e.cm,"beforeChange"))||(t=Tn(e,t,!0))){var r=Po&&!n&&cr(e,t.from,t.to);if(r)for(var i=r.length-1;i>=0;--i)Nn(e,{from:r[i].from,to:r[i].to,text:i?[""]:t.text});else Nn(e,t)}}function Nn(e,t){if(1!=t.text.length||""!=t.text[0]||0!=Ro(t.from,t.to)){var n=Cn(e,t);ui(e,t,n,e.cm?e.cm.curOp.id:NaN),Wn(e,t,n,lr(e,t));var r=[];Yr(e,function(e,n){n||-1!=Ei(r,e.history)||(bi(e.history,t),r.push(e.history)),Wn(e,t,null,lr(e,t))})}}function An(e,t,n){if(!e.cm||!e.cm.state.suppressEdits){for(var r,i=e.history,o=e.sel,l="undo"==t?i.done:i.undone,a="undo"==t?i.undone:i.done,s=0;s<l.length&&(r=l[s],n?!r.ranges||r.equals(e.sel):r.ranges);s++);if(s!=l.length){for(i.lastOrigin=i.lastSelOrigin=null;r=l.pop(),r.ranges;){if(fi(r,a),n&&!r.equals(e.sel))return void Me(e,r,{clearRedo:!1});o=r}var c=[];fi(o,a),a.push({changes:c,generation:i.generation}),i.generation=r.generation||++i.maxGeneration;for(var u=Ai(e,"beforeChange")||e.cm&&Ai(e.cm,"beforeChange"),s=r.changes.length-1;s>=0;--s){var d=r.changes[s];if(d.origin=t,u&&!Tn(e,d,!1))return void(l.length=0);c.push(ai(e,d));var h=s?Cn(e,d):Di(l);Wn(e,d,h,sr(e,d)),!s&&e.cm&&e.cm.scrollIntoView({from:d.from,to:Jo(d)});var f=[];Yr(e,function(e,t){t||-1!=Ei(f,e.history)||(bi(e.history,d),f.push(e.history)),Wn(e,d,null,sr(e,d))})}}}}function On(e,t){if(0!=t&&(e.first+=t,e.sel=new de(Ii(e.sel.ranges,function(e){return new he(Fo(e.anchor.line+t,e.anchor.ch),Fo(e.head.line+t,e.head.ch))}),e.sel.primIndex),e.cm)){Pt(e.cm,e.first,e.first-t,t);for(var n=e.cm.display,r=n.viewFrom;r<n.viewTo;r++)zt(e.cm,r,"gutter")}}function Wn(e,t,n,r){if(e.cm&&!e.cm.curOp)return Wt(e.cm,Wn)(e,t,n,r);if(t.to.line<e.first)return void On(e,t.text.length-1-(t.to.line-t.from.line));if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line);On(e,i),t={from:Fo(e.first,0),to:Fo(t.to.line+i,t.to.ch),text:[Di(t.text)],origin:t.origin}}var o=e.lastLine();t.to.line>o&&(t={from:t.from,to:Fo(o,Qr(e,o).text.length),text:[t.text[0]],origin:t.origin}),t.removed=Jr(e,t.from,t.to),n||(n=Cn(e,t)),e.cm?Hn(e.cm,t,r):Vr(e,t,r),Ne(e,n,zl)}}function Hn(e,t,n){var r=e.doc,i=e.display,l=t.from,a=t.to,s=!1,c=l.line;e.options.lineWrapping||(c=ni(xr(Qr(r,l.line))),r.iter(c,a.line+1,function(e){return e==i.maxLine?(s=!0,!0):void 0})),r.sel.contains(t.from,t.to)>-1&&Ni(e),Vr(r,t,n,o(e)),e.options.lineWrapping||(r.iter(c,l.line+t.text.length,function(e){var t=d(e);t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,s=!1)}),s&&(e.curOp.updateMaxLine=!0)),r.frontier=Math.min(r.frontier,l.line),Be(e,400);var u=t.text.length-(a.line-l.line)-1;t.full?Pt(e):l.line!=a.line||1!=t.text.length||$r(e.doc,t)?Pt(e,l.line,a.line+1,u):zt(e,l.line,"text");var h=Ai(e,"changes"),f=Ai(e,"change");if(f||h){var p={from:l,to:a,text:t.text,removed:t.removed,origin:t.origin};f&&Li(e,"change",e,p),h&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(p)}e.display.selForContextMenu=null}function Dn(e,t,n,r,i){if(r||(r=n),Ro(r,n)<0){var o=r;r=n,n=o}"string"==typeof t&&(t=e.splitLines(t)),Mn(e,{from:n,to:r,text:t,origin:i})}function En(e,t){if(!Mi(e,"scrollCursorIntoView")){var n=e.display,r=n.sizer.getBoundingClientRect(),i=null;if(t.top+r.top<0?i=!0:t.bottom+r.top>(window.innerHeight||document.documentElement.clientHeight)&&(i=!1),null!=i&&!No){var o=qi("div","​",null,"position: absolute; top: "+(t.top-n.viewOffset-Ge(e.display))+"px; height: "+(t.bottom-t.top+Ve(e)+n.barHeight)+"px; left: "+t.left+"px; width: 2px;");e.display.lineSpace.appendChild(o),o.scrollIntoView(i),e.display.lineSpace.removeChild(o)}}}function In(e,t,n,r){null==r&&(r=0);for(var i=0;5>i;i++){var o=!1,l=pt(e,t),a=n&&n!=t?pt(e,n):l,s=zn(e,Math.min(l.left,a.left),Math.min(l.top,a.top)-r,Math.max(l.left,a.left),Math.max(l.bottom,a.bottom)+r),c=e.doc.scrollTop,u=e.doc.scrollLeft;if(null!=s.scrollTop&&(on(e,s.scrollTop),Math.abs(e.doc.scrollTop-c)>1&&(o=!0)),null!=s.scrollLeft&&(ln(e,s.scrollLeft),Math.abs(e.doc.scrollLeft-u)>1&&(o=!0)),!o)break}return l}function Pn(e,t,n,r,i){var o=zn(e,t,n,r,i);null!=o.scrollTop&&on(e,o.scrollTop),null!=o.scrollLeft&&ln(e,o.scrollLeft)}function zn(e,t,n,r,i){var o=e.display,l=xt(e.display);0>n&&(n=0);var a=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:o.scroller.scrollTop,s=Xe(e),c={};i-n>s&&(i=n+s);var u=e.doc.height+Ue(o),d=l>n,h=i>u-l;if(a>n)c.scrollTop=d?0:n;else if(i>a+s){var f=Math.min(n,(h?u:i)-s);f!=a&&(c.scrollTop=f)}var p=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:o.scroller.scrollLeft,m=Ke(e)-(e.options.fixedGutter?o.gutters.offsetWidth:0),g=r-t>m;return g&&(r=t+m),10>t?c.scrollLeft=0:p>t?c.scrollLeft=Math.max(0,t-(g?0:10)):r>m+p-3&&(c.scrollLeft=r+(g?0:10)-m),c}function Fn(e,t,n){(null!=t||null!=n)&&Bn(e),null!=t&&(e.curOp.scrollLeft=(null==e.curOp.scrollLeft?e.doc.scrollLeft:e.curOp.scrollLeft)+t),null!=n&&(e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+n)}function Rn(e){Bn(e);var t=e.getCursor(),n=t,r=t;e.options.lineWrapping||(n=t.ch?Fo(t.line,t.ch-1):t,r=Fo(t.line,t.ch+1)),e.curOp.scrollToPos={from:n,to:r,margin:e.options.cursorScrollMargin,isCursor:!0}}function Bn(e){var t=e.curOp.scrollToPos;if(t){e.curOp.scrollToPos=null;var n=mt(e,t.from),r=mt(e,t.to),i=zn(e,Math.min(n.left,r.left),Math.min(n.top,r.top)-t.margin,Math.max(n.right,r.right),Math.max(n.bottom,r.bottom)+t.margin);e.scrollTo(i.scrollLeft,i.scrollTop)}}function _n(e,t,n,r){var i,o=e.doc;null==n&&(n="add"),"smart"==n&&(o.mode.indent?i=qe(e,t):n="prev");var l=e.options.tabSize,a=Qr(o,t),s=Bl(a.text,null,l);a.stateAfter&&(a.stateAfter=null);var c,u=a.text.match(/^\s*/)[0];if(r||/\S/.test(a.text)){if("smart"==n&&(c=o.mode.indent(i,a.text.slice(u.length),a.text),c==Pl||c>150)){if(!r)return;n="prev"}}else c=0,n="not";"prev"==n?c=t>o.first?Bl(Qr(o,t-1).text,null,l):0:"add"==n?c=s+e.options.indentUnit:"subtract"==n?c=s-e.options.indentUnit:"number"==typeof n&&(c=s+n),c=Math.max(0,c);var d="",h=0;if(e.options.indentWithTabs)for(var f=Math.floor(c/l);f;--f)h+=l,d+="	";if(c>h&&(d+=Hi(c-h)),d!=u)return Dn(o,d,Fo(t,0),Fo(t,u.length),"+input"),a.stateAfter=null,!0;for(var f=0;f<o.sel.ranges.length;f++){var p=o.sel.ranges[f];if(p.head.line==t&&p.head.ch<u.length){var h=Fo(t,u.length);Ce(o,f,new he(h,h));break}}}function jn(e,t,n,r){var i=t,o=t;return"number"==typeof t?o=Qr(e,me(e,t)):i=ni(t),null==i?null:(r(o,i)&&e.cm&&zt(e.cm,i,n),o)}function qn(e,t){for(var n=e.doc.sel.ranges,r=[],i=0;i<n.length;i++){for(var o=t(n[i]);r.length&&Ro(o.from,Di(r).to)<=0;){var l=r.pop();if(Ro(l.from,o.from)<0){o.from=l.from;break}}r.push(o)}Ot(e,function(){for(var t=r.length-1;t>=0;t--)Dn(e.doc,"",r[t].from,r[t].to,"+delete");Rn(e)})}function Gn(e,t,n,r,i){function o(){var t=a+n;return t<e.first||t>=e.first+e.size?d=!1:(a=t,u=Qr(e,t))}function l(e){var t=(i?fo:po)(u,s,n,!0);if(null==t){if(e||!o())return d=!1;s=i?(0>n?oo:io)(u):0>n?u.text.length:0}else s=t;return!0}var a=t.line,s=t.ch,c=n,u=Qr(e,a),d=!0;if("char"==r)l();else if("column"==r)l(!0);else if("word"==r||"group"==r)for(var h=null,f="group"==r,p=e.cm&&e.cm.getHelper(t,"wordChars"),m=!0;!(0>n)||l(!m);m=!1){var g=u.text.charAt(s)||"\n",v=Bi(g,p)?"w":f&&"\n"==g?"n":!f||/\s/.test(g)?null:"p";if(!f||m||v||(v="s"),h&&h!=v){0>n&&(n=1,l());break}if(v&&(h=v),n>0&&!l(!m))break}var y=De(e,Fo(a,s),t,c,!0);return d||(y.hitSide=!0),y}function Un(e,t,n,r){var i,o=e.doc,l=t.left;if("page"==r){var a=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight);i=t.top+n*(a-(0>n?1.5:.5)*xt(e.display))}else"line"==r&&(i=n>0?t.bottom+3:t.top-3);for(;;){var s=vt(e,l,i);if(!s.outside)break;if(0>n?0>=i:i>=o.height){s.hitSide=!0;break}i+=5*n}return s}function $n(t,n,r,i){e.defaults[t]=n,r&&(tl[t]=i?function(e,t,n){n!=nl&&r(e,t,n)}:r)}function Vn(e){for(var t,n,r,i,o=e.split(/-(?!$)/),e=o[o.length-1],l=0;l<o.length-1;l++){var a=o[l];if(/^(cmd|meta|m)$/i.test(a))i=!0;else if(/^a(lt)?$/i.test(a))t=!0;else if(/^(c|ctrl|control)$/i.test(a))n=!0;else{if(!/^s(hift)$/i.test(a))throw new Error("Unrecognized modifier name: "+a);r=!0}}return t&&(e="Alt-"+e),n&&(e="Ctrl-"+e),i&&(e="Cmd-"+e),r&&(e="Shift-"+e),e}function Kn(e){return"string"==typeof e?dl[e]:e}function Xn(e,t,n,r,i){if(r&&r.shared)return Yn(e,t,n,r,i);if(e.cm&&!e.cm.curOp)return Wt(e.cm,Xn)(e,t,n,r,i);var o=new vl(e,i),l=Ro(t,n);if(r&&Fi(r,o,!1),l>0||0==l&&o.clearWhenEmpty!==!1)return o;if(o.replacedWith&&(o.collapsed=!0,o.widgetNode=qi("span",[o.replacedWith],"CodeMirror-widget"),r.handleMouseEvents||o.widgetNode.setAttribute("cm-ignore-events","true"),r.insertLeft&&(o.widgetNode.insertLeft=!0)),o.collapsed){if(yr(e,t.line,t,n,o)||t.line!=n.line&&yr(e,n.line,t,n,o))throw new Error("Inserting collapsed marker partially overlapping an existing one");zo=!0}o.addToHistory&&ui(e,{from:t,to:n,origin:"markText"},e.sel,NaN);var a,s=t.line,c=e.cm;if(e.iter(s,n.line+1,function(e){c&&o.collapsed&&!c.options.lineWrapping&&xr(e)==c.display.maxLine&&(a=!0),o.collapsed&&s!=t.line&&ti(e,0),rr(e,new er(o,s==t.line?t.ch:null,s==n.line?n.ch:null)),++s}),o.collapsed&&e.iter(t.line,n.line+1,function(t){Cr(e,t)&&ti(t,0)}),o.clearOnEnter&&Ol(o,"beforeCursorEnter",function(){o.clear()}),o.readOnly&&(Po=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),o.collapsed&&(o.id=++gl,o.atomic=!0),c){if(a&&(c.curOp.updateMaxLine=!0),o.collapsed)Pt(c,t.line,n.line+1);else if(o.className||o.title||o.startStyle||o.endStyle||o.css)for(var u=t.line;u<=n.line;u++)zt(c,u,"text");o.atomic&&Oe(c.doc),Li(c,"markerAdded",c,o)}return o}function Yn(e,t,n,r,i){r=Fi(r),r.shared=!1;var o=[Xn(e,t,n,r,i)],l=o[0],a=r.widgetNode;return Yr(e,function(e){a&&(r.widgetNode=a.cloneNode(!0)),o.push(Xn(e,ge(e,t),ge(e,n),r,i));for(var s=0;s<e.linked.length;++s)if(e.linked[s].isParent)return;l=Di(o)}),new yl(o,l)}function Zn(e){return e.findMarks(Fo(e.first,0),e.clipPos(Fo(e.lastLine())),function(e){return e.parent})}function Qn(e,t){for(var n=0;n<t.length;n++){var r=t[n],i=r.find(),o=e.clipPos(i.from),l=e.clipPos(i.to);if(Ro(o,l)){var a=Xn(e,o,l,r.primary,r.primary.type);r.markers.push(a),a.parent=r}}}function Jn(e){for(var t=0;t<e.length;t++){var n=e[t],r=[n.primary.doc];Yr(n.primary.doc,function(e){r.push(e)});for(var i=0;i<n.markers.length;i++){var o=n.markers[i];-1==Ei(r,o.doc)&&(o.parent=null,n.markers.splice(i--,1))}}}function er(e,t,n){this.marker=e,this.from=t,this.to=n}function tr(e,t){if(e)for(var n=0;n<e.length;++n){var r=e[n];if(r.marker==t)return r}}function nr(e,t){for(var n,r=0;r<e.length;++r)e[r]!=t&&(n||(n=[])).push(e[r]);return n}function rr(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}function ir(e,t,n){if(e)for(var r,i=0;i<e.length;++i){var o=e[i],l=o.marker,a=null==o.from||(l.inclusiveLeft?o.from<=t:o.from<t);if(a||o.from==t&&"bookmark"==l.type&&(!n||!o.marker.insertLeft)){var s=null==o.to||(l.inclusiveRight?o.to>=t:o.to>t);(r||(r=[])).push(new er(l,o.from,s?null:o.to))}}return r}function or(e,t,n){if(e)for(var r,i=0;i<e.length;++i){var o=e[i],l=o.marker,a=null==o.to||(l.inclusiveRight?o.to>=t:o.to>t);if(a||o.from==t&&"bookmark"==l.type&&(!n||o.marker.insertLeft)){var s=null==o.from||(l.inclusiveLeft?o.from<=t:o.from<t);(r||(r=[])).push(new er(l,s?null:o.from-t,null==o.to?null:o.to-t))}}return r}function lr(e,t){if(t.full)return null;var n=ye(e,t.from.line)&&Qr(e,t.from.line).markedSpans,r=ye(e,t.to.line)&&Qr(e,t.to.line).markedSpans;if(!n&&!r)return null;var i=t.from.ch,o=t.to.ch,l=0==Ro(t.from,t.to),a=ir(n,i,l),s=or(r,o,l),c=1==t.text.length,u=Di(t.text).length+(c?i:0);if(a)for(var d=0;d<a.length;++d){var h=a[d];if(null==h.to){var f=tr(s,h.marker);f?c&&(h.to=null==f.to?null:f.to+u):h.to=i}}if(s)for(var d=0;d<s.length;++d){var h=s[d];if(null!=h.to&&(h.to+=u),null==h.from){var f=tr(a,h.marker);f||(h.from=u,c&&(a||(a=[])).push(h))}else h.from+=u,c&&(a||(a=[])).push(h)}a&&(a=ar(a)),s&&s!=a&&(s=ar(s));var p=[a];if(!c){var m,g=t.text.length-2;if(g>0&&a)for(var d=0;d<a.length;++d)null==a[d].to&&(m||(m=[])).push(new er(a[d].marker,null,null));for(var d=0;g>d;++d)p.push(m);p.push(s)}return p}function ar(e){for(var t=0;t<e.length;++t){var n=e[t];null!=n.from&&n.from==n.to&&n.marker.clearWhenEmpty!==!1&&e.splice(t--,1)}return e.length?e:null}function sr(e,t){var n=gi(e,t),r=lr(e,t);if(!n)return r;if(!r)return n;for(var i=0;i<n.length;++i){var o=n[i],l=r[i];if(o&&l)e:for(var a=0;a<l.length;++a){for(var s=l[a],c=0;c<o.length;++c)if(o[c].marker==s.marker)continue e;o.push(s)}else l&&(n[i]=l)}return n}function cr(e,t,n){var r=null;if(e.iter(t.line,n.line+1,function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var n=e.markedSpans[t].marker;!n.readOnly||r&&-1!=Ei(r,n)||(r||(r=[])).push(n)}}),!r)return null;for(var i=[{from:t,to:n}],o=0;o<r.length;++o)for(var l=r[o],a=l.find(0),s=0;s<i.length;++s){var c=i[s];if(!(Ro(c.to,a.from)<0||Ro(c.from,a.to)>0)){var u=[s,1],d=Ro(c.from,a.from),h=Ro(c.to,a.to);(0>d||!l.inclusiveLeft&&!d)&&u.push({from:c.from,to:a.from}),(h>0||!l.inclusiveRight&&!h)&&u.push({from:a.to,to:c.to}),i.splice.apply(i,u),s+=u.length-1}}return i}function ur(e){var t=e.markedSpans;if(t){for(var n=0;n<t.length;++n)t[n].marker.detachLine(e);e.markedSpans=null}}function dr(e,t){if(t){for(var n=0;n<t.length;++n)t[n].marker.attachLine(e);e.markedSpans=t}}function hr(e){return e.inclusiveLeft?-1:0}function fr(e){return e.inclusiveRight?1:0}function pr(e,t){var n=e.lines.length-t.lines.length;if(0!=n)return n;var r=e.find(),i=t.find(),o=Ro(r.from,i.from)||hr(e)-hr(t);if(o)return-o;var l=Ro(r.to,i.to)||fr(e)-fr(t);return l?l:t.id-e.id}function mr(e,t){var n,r=zo&&e.markedSpans;if(r)for(var i,o=0;o<r.length;++o)i=r[o],i.marker.collapsed&&null==(t?i.from:i.to)&&(!n||pr(n,i.marker)<0)&&(n=i.marker);return n}function gr(e){return mr(e,!0)}function vr(e){return mr(e,!1)}function yr(e,t,n,r,i){var o=Qr(e,t),l=zo&&o.markedSpans;if(l)for(var a=0;a<l.length;++a){var s=l[a];if(s.marker.collapsed){var c=s.marker.find(0),u=Ro(c.from,n)||hr(s.marker)-hr(i),d=Ro(c.to,r)||fr(s.marker)-fr(i);if(!(u>=0&&0>=d||0>=u&&d>=0)&&(0>=u&&(Ro(c.to,n)>0||s.marker.inclusiveRight&&i.inclusiveLeft)||u>=0&&(Ro(c.from,r)<0||s.marker.inclusiveLeft&&i.inclusiveRight)))return!0}}}function xr(e){for(var t;t=gr(e);)e=t.find(-1,!0).line;return e}function br(e){for(var t,n;t=vr(e);)e=t.find(1,!0).line,(n||(n=[])).push(e);return n}function wr(e,t){var n=Qr(e,t),r=xr(n);return n==r?t:ni(r)}function kr(e,t){if(t>e.lastLine())return t;var n,r=Qr(e,t);if(!Cr(e,r))return t;for(;n=vr(r);)r=n.find(1,!0).line;return ni(r)+1}function Cr(e,t){var n=zo&&t.markedSpans;if(n)for(var r,i=0;i<n.length;++i)if(r=n[i],r.marker.collapsed){if(null==r.from)return!0;if(!r.marker.widgetNode&&0==r.from&&r.marker.inclusiveLeft&&Sr(e,t,r))return!0}}function Sr(e,t,n){if(null==n.to){var r=n.marker.find(1,!0);return Sr(e,r.line,tr(r.line.markedSpans,n.marker))}if(n.marker.inclusiveRight&&n.to==t.text.length)return!0;for(var i,o=0;o<t.markedSpans.length;++o)if(i=t.markedSpans[o],i.marker.collapsed&&!i.marker.widgetNode&&i.from==n.to&&(null==i.to||i.to!=n.from)&&(i.marker.inclusiveLeft||n.marker.inclusiveRight)&&Sr(e,t,i))return!0}function Lr(e,t,n){ii(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&Fn(e,null,n)}function Tr(e){if(null!=e.height)return e.height;var t=e.doc.cm;if(!t)return 0;if(!Kl(document.body,e.node)){var n="position: relative;";e.coverGutter&&(n+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(n+="width: "+t.display.wrapper.clientWidth+"px;"),Ui(t.display.measure,qi("div",[e.node],null,n))}return e.height=e.node.parentNode.offsetHeight}function Mr(e,t,n,r){var i=new xl(e,n,r),o=e.cm;return o&&i.noHScroll&&(o.display.alignWidgets=!0),jn(e,t,"widget",function(t){var n=t.widgets||(t.widgets=[]);if(null==i.insertAt?n.push(i):n.splice(Math.min(n.length-1,Math.max(0,i.insertAt)),0,i),i.line=t,o&&!Cr(e,t)){var r=ii(t)<e.scrollTop;ti(t,t.height+Tr(i)),r&&Fn(o,null,i.height),o.curOp.forceUpdate=!0}return!0}),i}function Nr(e,t,n,r){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),ur(e),dr(e,n);var i=r?r(e):1;i!=e.height&&ti(e,i)}function Ar(e){e.parent=null,ur(e)}function Or(e,t){if(e)for(;;){var n=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!n)break;e=e.slice(0,n.index)+e.slice(n.index+n[0].length);var r=n[1]?"bgClass":"textClass";null==t[r]?t[r]=n[2]:new RegExp("(?:^|s)"+n[2]+"(?:$|s)").test(t[r])||(t[r]+=" "+n[2])}return e}function Wr(t,n){if(t.blankLine)return t.blankLine(n);if(t.innerMode){var r=e.innerMode(t,n);return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function Hr(t,n,r,i){for(var o=0;10>o;o++){i&&(i[0]=e.innerMode(t,r).mode);var l=t.token(n,r);if(n.pos>n.start)return l}throw new Error("Mode "+t.name+" failed to advance stream.")}function Dr(e,t,n,r){function i(e){return{start:d.start,end:d.pos,string:d.current(),type:o||null,state:e?sl(l.mode,u):u}}var o,l=e.doc,a=l.mode;t=ge(l,t);var s,c=Qr(l,t.line),u=qe(e,t.line,n),d=new ml(c.text,e.options.tabSize);for(r&&(s=[]);(r||d.pos<t.ch)&&!d.eol();)d.start=d.pos,o=Hr(a,d,u),r&&s.push(i(!0));return r?s:i()}function Er(e,t,n,r,i,o,l){var a=n.flattenSpans;null==a&&(a=e.options.flattenSpans);var s,c=0,u=null,d=new ml(t,e.options.tabSize),h=e.options.addModeClass&&[null];for(""==t&&Or(Wr(n,r),o);!d.eol();){if(d.pos>e.options.maxHighlightLength?(a=!1,l&&zr(e,t,r,d.pos),d.pos=t.length,s=null):s=Or(Hr(n,d,r,h),o),h){var f=h[0].name;f&&(s="m-"+(s?f+" "+s:f))}if(!a||u!=s){for(;c<d.start;)c=Math.min(d.start,c+5e4),i(c,u);u=s}d.start=d.pos}for(;c<d.pos;){var p=Math.min(d.pos,c+5e4);i(p,u),c=p}}function Ir(e,t,n,r){var i=[e.state.modeGen],o={};Er(e,t.text,e.doc.mode,n,function(e,t){i.push(e,t)},o,r);for(var l=0;l<e.state.overlays.length;++l){var a=e.state.overlays[l],s=1,c=0;Er(e,t.text,a.mode,!0,function(e,t){for(var n=s;e>c;){var r=i[s];r>e&&i.splice(s,1,e,i[s+1],r),s+=2,c=Math.min(e,r)}if(t)if(a.opaque)i.splice(n,s-n,e,"cm-overlay "+t),s=n+2;else for(;s>n;n+=2){var o=i[n+1];i[n+1]=(o?o+" ":"")+"cm-overlay "+t}},o)}return{styles:i,classes:o.bgClass||o.textClass?o:null}}function Pr(e,t,n){if(!t.styles||t.styles[0]!=e.state.modeGen){var r=qe(e,ni(t)),i=Ir(e,t,t.text.length>e.options.maxHighlightLength?sl(e.doc.mode,r):r);t.stateAfter=r,t.styles=i.styles,i.classes?t.styleClasses=i.classes:t.styleClasses&&(t.styleClasses=null),n===e.doc.frontier&&e.doc.frontier++}return t.styles}function zr(e,t,n,r){var i=e.doc.mode,o=new ml(t,e.options.tabSize);for(o.start=o.pos=r||0,""==t&&Wr(i,n);!o.eol();)Hr(i,o,n),o.start=o.pos}function Fr(e,t){if(!e||/^\s*$/.test(e))return null;var n=t.addModeClass?kl:wl;return n[e]||(n[e]=e.replace(/\S+/g,"cm-$&"))}function Rr(e,t){var n=qi("span",null,null,ko?"padding-right: .1px":null),r={pre:qi("pre",[n],"CodeMirror-line"),content:n,col:0,pos:0,cm:e,splitSpaces:(bo||ko)&&e.getOption("lineWrapping")};t.measure={};for(var i=0;i<=(t.rest?t.rest.length:0);i++){var o,l=i?t.rest[i-1]:t.line;r.pos=0,r.addToken=_r,Ji(e.display.measure)&&(o=oi(l))&&(r.addToken=qr(r.addToken,o)),r.map=[];var a=t!=e.display.externalMeasured&&ni(l);Ur(l,r,Pr(e,l,a)),l.styleClasses&&(l.styleClasses.bgClass&&(r.bgClass=Ki(l.styleClasses.bgClass,r.bgClass||"")),l.styleClasses.textClass&&(r.textClass=Ki(l.styleClasses.textClass,r.textClass||""))),0==r.map.length&&r.map.push(0,0,r.content.appendChild(Qi(e.display.measure))),0==i?(t.measure.map=r.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(r.map),(t.measure.caches||(t.measure.caches=[])).push({}))}return ko&&/\bcm-tab\b/.test(r.content.lastChild.className)&&(r.content.className="cm-tab-wrap-hack"),Dl(e,"renderLine",e,t.line,r.pre),r.pre.className&&(r.textClass=Ki(r.pre.className,r.textClass||"")),r}function Br(e){var t=qi("span","•","cm-invalidchar");return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function _r(e,t,n,r,i,o,l){if(t){var a=e.splitSpaces?t.replace(/ {3,}/g,jr):t,s=e.cm.state.specialChars,c=!1;if(s.test(t))for(var u=document.createDocumentFragment(),d=0;;){s.lastIndex=d;var h=s.exec(t),f=h?h.index-d:t.length-d;if(f){var p=document.createTextNode(a.slice(d,d+f));bo&&9>wo?u.appendChild(qi("span",[p])):u.appendChild(p),e.map.push(e.pos,e.pos+f,p),e.col+=f,e.pos+=f}if(!h)break;if(d+=f+1,"	"==h[0]){var m=e.cm.options.tabSize,g=m-e.col%m,p=u.appendChild(qi("span",Hi(g),"cm-tab"));p.setAttribute("role","presentation"),p.setAttribute("cm-text","	"),e.col+=g}else if("\r"==h[0]||"\n"==h[0]){var p=u.appendChild(qi("span","\r"==h[0]?"␍":"␤","cm-invalidchar"));p.setAttribute("cm-text",h[0]),e.col+=1}else{var p=e.cm.options.specialCharPlaceholder(h[0]);p.setAttribute("cm-text",h[0]),bo&&9>wo?u.appendChild(qi("span",[p])):u.appendChild(p),e.col+=1}e.map.push(e.pos,e.pos+1,p),e.pos++}else{e.col+=t.length;var u=document.createTextNode(a);e.map.push(e.pos,e.pos+t.length,u),bo&&9>wo&&(c=!0),e.pos+=t.length}if(n||r||i||c||l){var v=n||"";r&&(v+=r),i&&(v+=i);var y=qi("span",[u],v,l);return o&&(y.title=o),e.content.appendChild(y)}e.content.appendChild(u)}}function jr(e){for(var t=" ",n=0;n<e.length-2;++n)t+=n%2?" ":" ";return t+=" "}function qr(e,t){return function(n,r,i,o,l,a,s){i=i?i+" cm-force-border":"cm-force-border";for(var c=n.pos,u=c+r.length;;){for(var d=0;d<t.length;d++){var h=t[d];if(h.to>c&&h.from<=c)break}if(h.to>=u)return e(n,r,i,o,l,a,s);e(n,r.slice(0,h.to-c),i,o,null,a,s),o=null,r=r.slice(h.to-c),c=h.to}}}function Gr(e,t,n,r){var i=!r&&n.widgetNode;i&&e.map.push(e.pos,e.pos+t,i),!r&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",n.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t}function Ur(e,t,n){var r=e.markedSpans,i=e.text,o=0;if(r)for(var l,a,s,c,u,d,h,f=i.length,p=0,m=1,g="",v=0;;){if(v==p){s=c=u=d=a="",h=null,v=1/0;for(var y=[],x=0;x<r.length;++x){var b=r[x],w=b.marker;"bookmark"==w.type&&b.from==p&&w.widgetNode?y.push(w):b.from<=p&&(null==b.to||b.to>p||w.collapsed&&b.to==p&&b.from==p)?(null!=b.to&&b.to!=p&&v>b.to&&(v=b.to,c=""),w.className&&(s+=" "+w.className),w.css&&(a=(a?a+";":"")+w.css),w.startStyle&&b.from==p&&(u+=" "+w.startStyle),w.endStyle&&b.to==v&&(c+=" "+w.endStyle),w.title&&!d&&(d=w.title),w.collapsed&&(!h||pr(h.marker,w)<0)&&(h=b)):b.from>p&&v>b.from&&(v=b.from)}if(h&&(h.from||0)==p){if(Gr(t,(null==h.to?f+1:h.to)-p,h.marker,null==h.from),null==h.to)return;h.to==p&&(h=!1)}if(!h&&y.length)for(var x=0;x<y.length;++x)Gr(t,0,y[x])}if(p>=f)break;for(var k=Math.min(f,v);;){if(g){var C=p+g.length;if(!h){var S=C>k?g.slice(0,k-p):g;t.addToken(t,S,l?l+s:s,u,p+S.length==v?c:"",d,a)}if(C>=k){g=g.slice(k-p),p=k;break}p=C,u=""}g=i.slice(o,o=n[m++]),l=Fr(n[m++],t.cm.options)}}else for(var m=1;m<n.length;m+=2)t.addToken(t,i.slice(o,o=n[m]),Fr(n[m+1],t.cm.options))}function $r(e,t){return 0==t.from.ch&&0==t.to.ch&&""==Di(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Vr(e,t,n,r){function i(e){return n?n[e]:null}function o(e,n,i){Nr(e,n,i,r),Li(e,"change",e,t)}function l(e,t){for(var n=e,o=[];t>n;++n)o.push(new bl(c[n],i(n),r));return o}var a=t.from,s=t.to,c=t.text,u=Qr(e,a.line),d=Qr(e,s.line),h=Di(c),f=i(c.length-1),p=s.line-a.line;if(t.full)e.insert(0,l(0,c.length)),e.remove(c.length,e.size-c.length);else if($r(e,t)){var m=l(0,c.length-1);o(d,d.text,f),p&&e.remove(a.line,p),m.length&&e.insert(a.line,m)}else if(u==d)if(1==c.length)o(u,u.text.slice(0,a.ch)+h+u.text.slice(s.ch),f);else{var m=l(1,c.length-1);m.push(new bl(h+u.text.slice(s.ch),f,r)),o(u,u.text.slice(0,a.ch)+c[0],i(0)),e.insert(a.line+1,m)}else if(1==c.length)o(u,u.text.slice(0,a.ch)+c[0]+d.text.slice(s.ch),i(0)),e.remove(a.line+1,p);else{o(u,u.text.slice(0,a.ch)+c[0],i(0)),o(d,h+d.text.slice(s.ch),f);var m=l(1,c.length-1);p>1&&e.remove(a.line+1,p-1),e.insert(a.line+1,m)}Li(e,"change",e,t)}function Kr(e){this.lines=e,this.parent=null;for(var t=0,n=0;t<e.length;++t)e[t].parent=this,n+=e[t].height;this.height=n}function Xr(e){this.children=e;for(var t=0,n=0,r=0;r<e.length;++r){var i=e[r];t+=i.chunkSize(),n+=i.height,i.parent=this}this.size=t,this.height=n,this.parent=null}function Yr(e,t,n){function r(e,i,o){if(e.linked)for(var l=0;l<e.linked.length;++l){var a=e.linked[l];if(a.doc!=i){var s=o&&a.sharedHist;(!n||s)&&(t(a.doc,s),r(a.doc,e,s))}}}r(e,null,!0)}function Zr(e,t){if(t.cm)throw new Error("This document is already in use.");e.doc=t,t.cm=e,l(e),n(e),e.options.lineWrapping||h(e),e.options.mode=t.modeOption,Pt(e)}function Qr(e,t){if(t-=e.first,0>t||t>=e.size)throw new Error("There is no line "+(t+e.first)+" in the document.");for(var n=e;!n.lines;)for(var r=0;;++r){var i=n.children[r],o=i.chunkSize();if(o>t){n=i;break}t-=o}return n.lines[t]}function Jr(e,t,n){var r=[],i=t.line;return e.iter(t.line,n.line+1,function(e){var o=e.text;i==n.line&&(o=o.slice(0,n.ch)),i==t.line&&(o=o.slice(t.ch)),r.push(o),++i}),r}function ei(e,t,n){var r=[];return e.iter(t,n,function(e){r.push(e.text)}),r}function ti(e,t){var n=t-e.height;if(n)for(var r=e;r;r=r.parent)r.height+=n}function ni(e){if(null==e.parent)return null;for(var t=e.parent,n=Ei(t.lines,e),r=t.parent;r;t=r,r=r.parent)for(var i=0;r.children[i]!=t;++i)n+=r.children[i].chunkSize();return n+t.first}function ri(e,t){var n=e.first;e:do{for(var r=0;r<e.children.length;++r){var i=e.children[r],o=i.height;if(o>t){e=i;continue e}t-=o,n+=i.chunkSize()}return n}while(!e.lines);for(var r=0;r<e.lines.length;++r){var l=e.lines[r],a=l.height;if(a>t)break;t-=a}return n+r}function ii(e){e=xr(e);for(var t=0,n=e.parent,r=0;r<n.lines.length;++r){
var i=n.lines[r];if(i==e)break;t+=i.height}for(var o=n.parent;o;n=o,o=n.parent)for(var r=0;r<o.children.length;++r){var l=o.children[r];if(l==n)break;t+=l.height}return t}function oi(e){var t=e.order;return null==t&&(t=e.order=aa(e.text)),t}function li(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function ai(e,t){var n={from:V(t.from),to:Jo(t),text:Jr(e,t.from,t.to)};return pi(e,n,t.from.line,t.to.line+1),Yr(e,function(e){pi(e,n,t.from.line,t.to.line+1)},!0),n}function si(e){for(;e.length;){var t=Di(e);if(!t.ranges)break;e.pop()}}function ci(e,t){return t?(si(e.done),Di(e.done)):e.done.length&&!Di(e.done).ranges?Di(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),Di(e.done)):void 0}function ui(e,t,n,r){var i=e.history;i.undone.length=0;var o,l=+new Date;if((i.lastOp==r||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&e.cm&&i.lastModTime>l-e.cm.options.historyEventDelay||"*"==t.origin.charAt(0)))&&(o=ci(i,i.lastOp==r))){var a=Di(o.changes);0==Ro(t.from,t.to)&&0==Ro(t.from,a.to)?a.to=Jo(t):o.changes.push(ai(e,t))}else{var s=Di(i.done);for(s&&s.ranges||fi(e.sel,i.done),o={changes:[ai(e,t)],generation:i.generation},i.done.push(o);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(n),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=l,i.lastOp=i.lastSelOp=r,i.lastOrigin=i.lastSelOrigin=t.origin,a||Dl(e,"historyAdded")}function di(e,t,n,r){var i=t.charAt(0);return"*"==i||"+"==i&&n.ranges.length==r.ranges.length&&n.somethingSelected()==r.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}function hi(e,t,n,r){var i=e.history,o=r&&r.origin;n==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||di(e,o,Di(i.done),t))?i.done[i.done.length-1]=t:fi(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=o,i.lastSelOp=n,r&&r.clearRedo!==!1&&si(i.undone)}function fi(e,t){var n=Di(t);n&&n.ranges&&n.equals(e)||t.push(e)}function pi(e,t,n,r){var i=t["spans_"+e.id],o=0;e.iter(Math.max(e.first,n),Math.min(e.first+e.size,r),function(n){n.markedSpans&&((i||(i=t["spans_"+e.id]={}))[o]=n.markedSpans),++o})}function mi(e){if(!e)return null;for(var t,n=0;n<e.length;++n)e[n].marker.explicitlyCleared?t||(t=e.slice(0,n)):t&&t.push(e[n]);return t?t.length?t:null:e}function gi(e,t){var n=t["spans_"+e.id];if(!n)return null;for(var r=0,i=[];r<t.text.length;++r)i.push(mi(n[r]));return i}function vi(e,t,n){for(var r=0,i=[];r<e.length;++r){var o=e[r];if(o.ranges)i.push(n?de.prototype.deepCopy.call(o):o);else{var l=o.changes,a=[];i.push({changes:a});for(var s=0;s<l.length;++s){var c,u=l[s];if(a.push({from:u.from,to:u.to,text:u.text}),t)for(var d in u)(c=d.match(/^spans_(\d+)$/))&&Ei(t,Number(c[1]))>-1&&(Di(a)[d]=u[d],delete u[d])}}}return i}function yi(e,t,n,r){n<e.line?e.line+=r:t<e.line&&(e.line=t,e.ch=0)}function xi(e,t,n,r){for(var i=0;i<e.length;++i){var o=e[i],l=!0;if(o.ranges){o.copied||(o=e[i]=o.deepCopy(),o.copied=!0);for(var a=0;a<o.ranges.length;a++)yi(o.ranges[a].anchor,t,n,r),yi(o.ranges[a].head,t,n,r)}else{for(var a=0;a<o.changes.length;++a){var s=o.changes[a];if(n<s.from.line)s.from=Fo(s.from.line+r,s.from.ch),s.to=Fo(s.to.line+r,s.to.ch);else if(t<=s.to.line){l=!1;break}}l||(e.splice(0,i+1),i=0)}}}function bi(e,t){var n=t.from.line,r=t.to.line,i=t.text.length-(r-n)-1;xi(e.done,n,r,i),xi(e.undone,n,r,i)}function wi(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function ki(e){return e.target||e.srcElement}function Ci(e){var t=e.which;return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),Wo&&e.ctrlKey&&1==t&&(t=3),t}function Si(e,t,n){var r=e._handlers&&e._handlers[t];return n?r&&r.length>0?r.slice():Wl:r||Wl}function Li(e,t){function n(e){return function(){e.apply(null,o)}}var r=Si(e,t,!1);if(r.length){var i,o=Array.prototype.slice.call(arguments,2);Uo?i=Uo.delayedCallbacks:El?i=El:(i=El=[],setTimeout(Ti,0));for(var l=0;l<r.length;++l)i.push(n(r[l]))}}function Ti(){var e=El;El=null;for(var t=0;t<e.length;++t)e[t]()}function Mi(e,t,n){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),Dl(e,n||t.type,e,t),wi(t)||t.codemirrorIgnore}function Ni(e){var t=e._handlers&&e._handlers.cursorActivity;if(t)for(var n=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),r=0;r<t.length;++r)-1==Ei(n,t[r])&&n.push(t[r])}function Ai(e,t){return Si(e,t).length>0}function Oi(e){e.prototype.on=function(e,t){Ol(this,e,t)},e.prototype.off=function(e,t){Hl(this,e,t)}}function Wi(){this.id=null}function Hi(e){for(;jl.length<=e;)jl.push(Di(jl)+" ");return jl[e]}function Di(e){return e[e.length-1]}function Ei(e,t){for(var n=0;n<e.length;++n)if(e[n]==t)return n;return-1}function Ii(e,t){for(var n=[],r=0;r<e.length;r++)n[r]=t(e[r],r);return n}function Pi(){}function zi(e,t){var n;return Object.create?n=Object.create(e):(Pi.prototype=e,n=new Pi),t&&Fi(t,n),n}function Fi(e,t,n){t||(t={});for(var r in e)!e.hasOwnProperty(r)||n===!1&&t.hasOwnProperty(r)||(t[r]=e[r]);return t}function Ri(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t)}}function Bi(e,t){return t?t.source.indexOf("\\w")>-1&&$l(e)?!0:t.test(e):$l(e)}function _i(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;return!0}function ji(e){return e.charCodeAt(0)>=768&&Vl.test(e)}function qi(e,t,n,r){var i=document.createElement(e);if(n&&(i.className=n),r&&(i.style.cssText=r),"string"==typeof t)i.appendChild(document.createTextNode(t));else if(t)for(var o=0;o<t.length;++o)i.appendChild(t[o]);return i}function Gi(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild);return e}function Ui(e,t){return Gi(e).appendChild(t)}function $i(){for(var e=document.activeElement;e&&e.root&&e.root.activeElement;)e=e.root.activeElement;return e}function Vi(e){return new RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}function Ki(e,t){for(var n=e.split(" "),r=0;r<n.length;r++)n[r]&&!Vi(n[r]).test(t)&&(t+=" "+n[r]);return t}function Xi(e){if(document.body.getElementsByClassName)for(var t=document.body.getElementsByClassName("CodeMirror"),n=0;n<t.length;n++){var r=t[n].CodeMirror;r&&e(r)}}function Yi(){Jl||(Zi(),Jl=!0)}function Zi(){var e;Ol(window,"resize",function(){null==e&&(e=setTimeout(function(){e=null,Xi(Ut)},100))}),Ol(window,"blur",function(){Xi(xn)})}function Qi(e){if(null==Xl){var t=qi("span","​");Ui(e,qi("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Xl=t.offsetWidth<=1&&t.offsetHeight>2&&!(bo&&8>wo))}var n=Xl?qi("span","​"):qi("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return n.setAttribute("cm-text",""),n}function Ji(e){if(null!=Yl)return Yl;var t=Ui(e,document.createTextNode("AخA")),n=Gl(t,0,1).getBoundingClientRect();if(!n||n.left==n.right)return!1;var r=Gl(t,1,2).getBoundingClientRect();return Yl=r.right-n.right<3}function eo(e){if(null!=ia)return ia;var t=Ui(e,qi("span","x")),n=t.getBoundingClientRect(),r=Gl(t,0,1).getBoundingClientRect();return ia=Math.abs(n.left-r.left)>1}function to(e,t,n,r){if(!e)return r(t,n,"ltr");for(var i=!1,o=0;o<e.length;++o){var l=e[o];(l.from<n&&l.to>t||t==n&&l.to==t)&&(r(Math.max(l.from,t),Math.min(l.to,n),1==l.level?"rtl":"ltr"),i=!0)}i||r(t,n,"ltr")}function no(e){return e.level%2?e.to:e.from}function ro(e){return e.level%2?e.from:e.to}function io(e){var t=oi(e);return t?no(t[0]):0}function oo(e){var t=oi(e);return t?ro(Di(t)):e.text.length}function lo(e,t){var n=Qr(e.doc,t),r=xr(n);r!=n&&(t=ni(r));var i=oi(r),o=i?i[0].level%2?oo(r):io(r):0;return Fo(t,o)}function ao(e,t){for(var n,r=Qr(e.doc,t);n=vr(r);)r=n.find(1,!0).line,t=null;var i=oi(r),o=i?i[0].level%2?io(r):oo(r):r.text.length;return Fo(null==t?ni(r):t,o)}function so(e,t){var n=lo(e,t.line),r=Qr(e.doc,n.line),i=oi(r);if(!i||0==i[0].level){var o=Math.max(0,r.text.search(/\S/)),l=t.line==n.line&&t.ch<=o&&t.ch;return Fo(n.line,l?0:o)}return n}function co(e,t,n){var r=e[0].level;return t==r?!0:n==r?!1:n>t}function uo(e,t){la=null;for(var n,r=0;r<e.length;++r){var i=e[r];if(i.from<t&&i.to>t)return r;if(i.from==t||i.to==t){if(null!=n)return co(e,i.level,e[n].level)?(i.from!=i.to&&(la=n),r):(i.from!=i.to&&(la=r),n);n=r}}return n}function ho(e,t,n,r){if(!r)return t+n;do t+=n;while(t>0&&ji(e.text.charAt(t)));return t}function fo(e,t,n,r){var i=oi(e);if(!i)return po(e,t,n,r);for(var o=uo(i,t),l=i[o],a=ho(e,t,l.level%2?-n:n,r);;){if(a>l.from&&a<l.to)return a;if(a==l.from||a==l.to)return uo(i,a)==o?a:(l=i[o+=n],n>0==l.level%2?l.to:l.from);if(l=i[o+=n],!l)return null;a=n>0==l.level%2?ho(e,l.to,-1,r):ho(e,l.from,1,r)}}function po(e,t,n,r){var i=t+n;if(r)for(;i>0&&ji(e.text.charAt(i));)i+=n;return 0>i||i>e.text.length?null:i}var mo=navigator.userAgent,go=navigator.platform,vo=/gecko\/\d/i.test(mo),yo=/MSIE \d/.test(mo),xo=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(mo),bo=yo||xo,wo=bo&&(yo?document.documentMode||6:xo[1]),ko=/WebKit\//.test(mo),Co=ko&&/Qt\/\d+\.\d+/.test(mo),So=/Chrome\//.test(mo),Lo=/Opera\//.test(mo),To=/Apple Computer/.test(navigator.vendor),Mo=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(mo),No=/PhantomJS/.test(mo),Ao=/AppleWebKit/.test(mo)&&/Mobile\/\w+/.test(mo),Oo=Ao||/Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(mo),Wo=Ao||/Mac/.test(go),Ho=/win/i.test(go),Do=Lo&&mo.match(/Version\/(\d*\.\d*)/);Do&&(Do=Number(Do[1])),Do&&Do>=15&&(Lo=!1,ko=!0);var Eo=Wo&&(Co||Lo&&(null==Do||12.11>Do)),Io=vo||bo&&wo>=9,Po=!1,zo=!1;m.prototype=Fi({update:function(e){var t=e.scrollWidth>e.clientWidth+1,n=e.scrollHeight>e.clientHeight+1,r=e.nativeBarWidth;if(n){this.vert.style.display="block",this.vert.style.bottom=t?r+"px":"0";var i=e.viewHeight-(t?r:0);this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0";if(t){this.horiz.style.display="block",this.horiz.style.right=n?r+"px":"0",this.horiz.style.left=e.barLeft+"px";var o=e.viewWidth-e.barLeft-(n?r:0);this.horiz.firstChild.style.width=e.scrollWidth-e.clientWidth+o+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&e.clientHeight>0&&(0==r&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:n?r:0,bottom:t?r:0}},setScrollLeft:function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz)},setScrollTop:function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert)},zeroWidthHack:function(){var e=Wo&&!Mo?"12px":"18px";this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new Wi,this.disableVert=new Wi},enableZeroWidthBar:function(e,t){function n(){var r=e.getBoundingClientRect(),i=document.elementFromPoint(r.left+1,r.bottom-1);i!=e?e.style.pointerEvents="none":t.set(1e3,n)}e.style.pointerEvents="auto",t.set(1e3,n)},clear:function(){var e=this.horiz.parentNode;e.removeChild(this.horiz),e.removeChild(this.vert)}},m.prototype),g.prototype=Fi({update:function(){return{bottom:0,right:0}},setScrollLeft:function(){},setScrollTop:function(){},clear:function(){}},g.prototype),e.scrollbarModel={"native":m,"null":g},L.prototype.signal=function(e,t){Ai(e,t)&&this.events.push(arguments)},L.prototype.finish=function(){for(var e=0;e<this.events.length;e++)Dl.apply(null,this.events[e])};var Fo=e.Pos=function(e,t){return this instanceof Fo?(this.line=e,void(this.ch=t)):new Fo(e,t)},Ro=e.cmpPos=function(e,t){return e.line-t.line||e.ch-t.ch},Bo=null;re.prototype=Fi({init:function(e){function t(e){if(r.somethingSelected())Bo=r.getSelections(),n.inaccurateSelection&&(n.prevInput="",n.inaccurateSelection=!1,o.value=Bo.join("\n"),ql(o));else{if(!r.options.lineWiseCopyCut)return;var t=te(r);Bo=t.text,"cut"==e.type?r.setSelections(t.ranges,null,zl):(n.prevInput="",o.value=t.text.join("\n"),ql(o))}"cut"==e.type&&(r.state.cutIncoming=!0)}var n=this,r=this.cm,i=this.wrapper=ie(),o=this.textarea=i.firstChild;e.wrapper.insertBefore(i,e.wrapper.firstChild),Ao&&(o.style.width="0px"),Ol(o,"input",function(){bo&&wo>=9&&n.hasSelection&&(n.hasSelection=null),n.poll()}),Ol(o,"paste",function(e){return J(e,r)?!0:(r.state.pasteIncoming=!0,void n.fastPoll())}),Ol(o,"cut",t),Ol(o,"copy",t),Ol(e.scroller,"paste",function(t){$t(e,t)||(r.state.pasteIncoming=!0,n.focus())}),Ol(e.lineSpace,"selectstart",function(t){$t(e,t)||Ml(t)}),Ol(o,"compositionstart",function(){var e=r.getCursor("from");n.composing&&n.composing.range.clear(),n.composing={start:e,range:r.markText(e,r.getCursor("to"),{className:"CodeMirror-composing"})}}),Ol(o,"compositionend",function(){n.composing&&(n.poll(),n.composing.range.clear(),n.composing=null)})},prepareSelection:function(){var e=this.cm,t=e.display,n=e.doc,r=Pe(e);if(e.options.moveInputWithCursor){var i=pt(e,n.sel.primary().head,"div"),o=t.wrapper.getBoundingClientRect(),l=t.lineDiv.getBoundingClientRect();r.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+l.top-o.top)),r.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+l.left-o.left))}return r},showSelection:function(e){var t=this.cm,n=t.display;Ui(n.cursorDiv,e.cursors),Ui(n.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},reset:function(e){if(!this.contextMenuPending){var t,n,r=this.cm,i=r.doc;if(r.somethingSelected()){this.prevInput="";var o=i.sel.primary();t=ra&&(o.to().line-o.from().line>100||(n=r.getSelection()).length>1e3);var l=t?"-":n||r.getSelection();this.textarea.value=l,r.state.focused&&ql(this.textarea),bo&&wo>=9&&(this.hasSelection=l)}else e||(this.prevInput=this.textarea.value="",bo&&wo>=9&&(this.hasSelection=null));this.inaccurateSelection=t}},getField:function(){return this.textarea},supportsTouch:function(){return!1},focus:function(){if("nocursor"!=this.cm.options.readOnly&&(!Oo||$i()!=this.textarea))try{this.textarea.focus()}catch(e){}},blur:function(){this.textarea.blur()},resetPosition:function(){this.wrapper.style.top=this.wrapper.style.left=0},receivedFocus:function(){this.slowPoll()},slowPoll:function(){var e=this;e.pollingFast||e.polling.set(this.cm.options.pollInterval,function(){e.poll(),e.cm.state.focused&&e.slowPoll()})},fastPoll:function(){function e(){var r=n.poll();r||t?(n.pollingFast=!1,n.slowPoll()):(t=!0,n.polling.set(60,e))}var t=!1,n=this;n.pollingFast=!0,n.polling.set(20,e)},poll:function(){var e=this.cm,t=this.textarea,n=this.prevInput;if(this.contextMenuPending||!e.state.focused||na(t)&&!n&&!this.composing||Z(e)||e.options.disableInput||e.state.keySeq)return!1;var r=t.value;if(r==n&&!e.somethingSelected())return!1;if(bo&&wo>=9&&this.hasSelection===r||Wo&&/[\uf700-\uf7ff]/.test(r))return e.display.input.reset(),!1;if(e.doc.sel==e.display.selForContextMenu){var i=r.charCodeAt(0);if(8203!=i||n||(n="​"),8666==i)return this.reset(),this.cm.execCommand("undo")}for(var o=0,l=Math.min(n.length,r.length);l>o&&n.charCodeAt(o)==r.charCodeAt(o);)++o;var a=this;return Ot(e,function(){Q(e,r.slice(o),n.length-o,null,a.composing?"*compose":null),r.length>1e3||r.indexOf("\n")>-1?t.value=a.prevInput="":a.prevInput=r,a.composing&&(a.composing.range.clear(),a.composing.range=e.markText(a.composing.start,e.getCursor("to"),{className:"CodeMirror-composing"}))}),!0},ensurePolled:function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},onKeyPress:function(){bo&&wo>=9&&(this.hasSelection=null),this.fastPoll()},onContextMenu:function(e){function t(){if(null!=l.selectionStart){var e=i.somethingSelected(),t="​"+(e?l.value:"");l.value="⇚",l.value=t,r.prevInput=e?"":"​",l.selectionStart=1,l.selectionEnd=t.length,o.selForContextMenu=i.doc.sel}}function n(){if(r.contextMenuPending=!1,r.wrapper.style.position="relative",l.style.cssText=u,bo&&9>wo&&o.scrollbars.setScrollTop(o.scroller.scrollTop=s),null!=l.selectionStart){(!bo||bo&&9>wo)&&t();var e=0,n=function(){o.selForContextMenu==i.doc.sel&&0==l.selectionStart&&l.selectionEnd>0&&"​"==r.prevInput?Wt(i,ul.selectAll)(i):e++<10?o.detectingSelectAll=setTimeout(n,500):o.input.reset()};o.detectingSelectAll=setTimeout(n,200)}}var r=this,i=r.cm,o=i.display,l=r.textarea,a=Vt(i,e),s=o.scroller.scrollTop;if(a&&!Lo){var c=i.options.resetSelectionOnContextMenu;c&&-1==i.doc.sel.contains(a)&&Wt(i,Me)(i.doc,pe(a),zl);var u=l.style.cssText;if(r.wrapper.style.position="absolute",l.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(e.clientY-5)+"px; left: "+(e.clientX-5)+"px; z-index: 1000; background: "+(bo?"rgba(255, 255, 255, .05)":"transparent")+"; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",ko)var d=window.scrollY;if(o.input.focus(),ko&&window.scrollTo(null,d),o.input.reset(),i.somethingSelected()||(l.value=r.prevInput=" "),r.contextMenuPending=!0,o.selForContextMenu=i.doc.sel,clearTimeout(o.detectingSelectAll),bo&&wo>=9&&t(),Io){Al(e);var h=function(){Hl(window,"mouseup",h),setTimeout(n,20)};Ol(window,"mouseup",h)}else setTimeout(n,50)}},readOnlyChanged:function(e){e||this.reset()},setUneditable:Pi,needsContentAttribute:!1},re.prototype),oe.prototype=Fi({init:function(e){function t(e){if(r.somethingSelected())Bo=r.getSelections(),"cut"==e.type&&r.replaceSelection("",null,"cut");else{if(!r.options.lineWiseCopyCut)return;var t=te(r);Bo=t.text,"cut"==e.type&&r.operation(function(){r.setSelections(t.ranges,0,zl),r.replaceSelection("",null,"cut")})}if(e.clipboardData&&!Ao)e.preventDefault(),e.clipboardData.clearData(),e.clipboardData.setData("text/plain",Bo.join("\n"));else{var n=ie(),i=n.firstChild;r.display.lineSpace.insertBefore(n,r.display.lineSpace.firstChild),i.value=Bo.join("\n");var o=document.activeElement;ql(i),setTimeout(function(){r.display.lineSpace.removeChild(n),o.focus()},50)}}var n=this,r=n.cm,i=n.div=e.lineDiv;ne(i),Ol(i,"paste",function(e){J(e,r)}),Ol(i,"compositionstart",function(e){var t=e.data;if(n.composing={sel:r.doc.sel,data:t,startData:t},t){var i=r.doc.sel.primary(),o=r.getLine(i.head.line),l=o.indexOf(t,Math.max(0,i.head.ch-t.length));l>-1&&l<=i.head.ch&&(n.composing.sel=pe(Fo(i.head.line,l),Fo(i.head.line,l+t.length)))}}),Ol(i,"compositionupdate",function(e){n.composing.data=e.data}),Ol(i,"compositionend",function(e){var t=n.composing;t&&(e.data==t.startData||/\u200b/.test(e.data)||(t.data=e.data),setTimeout(function(){t.handled||n.applyComposition(t),n.composing==t&&(n.composing=null)},50))}),Ol(i,"touchstart",function(){n.forceCompositionEnd()}),Ol(i,"input",function(){n.composing||(Z(r)||!n.pollContent())&&Ot(n.cm,function(){Pt(r)})}),Ol(i,"copy",t),Ol(i,"cut",t)},prepareSelection:function(){var e=Pe(this.cm,!1);return e.focus=this.cm.state.focused,e},showSelection:function(e){e&&this.cm.display.view.length&&(e.focus&&this.showPrimarySelection(),this.showMultipleSelections(e))},showPrimarySelection:function(){var e=window.getSelection(),t=this.cm.doc.sel.primary(),n=se(this.cm,e.anchorNode,e.anchorOffset),r=se(this.cm,e.focusNode,e.focusOffset);if(!n||n.bad||!r||r.bad||0!=Ro(X(n,r),t.from())||0!=Ro(K(n,r),t.to())){var i=le(this.cm,t.from()),o=le(this.cm,t.to());if(i||o){var l=this.cm.display.view,a=e.rangeCount&&e.getRangeAt(0);if(i){if(!o){var s=l[l.length-1].measure,c=s.maps?s.maps[s.maps.length-1]:s.map;o={node:c[c.length-1],offset:c[c.length-2]-c[c.length-3]}}}else i={node:l[0].measure.map[2],offset:0};try{var u=Gl(i.node,i.offset,o.offset,o.node)}catch(d){}u&&(e.removeAllRanges(),e.addRange(u),a&&null==e.anchorNode?e.addRange(a):vo&&this.startGracePeriod()),this.rememberSelection()}}},startGracePeriod:function(){var e=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout(function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation(function(){e.cm.curOp.selectionChanged=!0})},20)},showMultipleSelections:function(e){Ui(this.cm.display.cursorDiv,e.cursors),Ui(this.cm.display.selectionDiv,e.selection)},rememberSelection:function(){var e=window.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},selectionInEditor:function(){var e=window.getSelection();if(!e.rangeCount)return!1;var t=e.getRangeAt(0).commonAncestorContainer;return Kl(this.div,t)},focus:function(){"nocursor"!=this.cm.options.readOnly&&this.div.focus()},blur:function(){this.div.blur()},getField:function(){return this.div},supportsTouch:function(){return!0},receivedFocus:function(){function e(){t.cm.state.focused&&(t.pollSelection(),t.polling.set(t.cm.options.pollInterval,e))}var t=this;this.selectionInEditor()?this.pollSelection():Ot(this.cm,function(){t.cm.curOp.selectionChanged=!0}),this.polling.set(this.cm.options.pollInterval,e)},selectionChanged:function(){var e=window.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},pollSelection:function(){if(!this.composing&&!this.gracePeriod&&this.selectionChanged()){var e=window.getSelection(),t=this.cm;this.rememberSelection();var n=se(t,e.anchorNode,e.anchorOffset),r=se(t,e.focusNode,e.focusOffset);n&&r&&Ot(t,function(){Me(t.doc,pe(n,r),zl),(n.bad||r.bad)&&(t.curOp.selectionChanged=!0)})}},pollContent:function(){var e=this.cm,t=e.display,n=e.doc.sel.primary(),r=n.from(),i=n.to();if(r.line<t.viewFrom||i.line>t.viewTo-1)return!1;var o;if(r.line==t.viewFrom||0==(o=Rt(e,r.line)))var l=ni(t.view[0].line),a=t.view[0].node;else var l=ni(t.view[o].line),a=t.view[o-1].node.nextSibling;var s=Rt(e,i.line);if(s==t.view.length-1)var c=t.viewTo-1,u=t.lineDiv.lastChild;else var c=ni(t.view[s+1].line)-1,u=t.view[s+1].node.previousSibling;for(var d=e.doc.splitLines(ue(e,a,u,l,c)),h=Jr(e.doc,Fo(l,0),Fo(c,Qr(e.doc,c).text.length));d.length>1&&h.length>1;)if(Di(d)==Di(h))d.pop(),h.pop(),c--;else{if(d[0]!=h[0])break;d.shift(),h.shift(),l++}for(var f=0,p=0,m=d[0],g=h[0],v=Math.min(m.length,g.length);v>f&&m.charCodeAt(f)==g.charCodeAt(f);)++f;for(var y=Di(d),x=Di(h),b=Math.min(y.length-(1==d.length?f:0),x.length-(1==h.length?f:0));b>p&&y.charCodeAt(y.length-p-1)==x.charCodeAt(x.length-p-1);)++p;d[d.length-1]=y.slice(0,y.length-p),d[0]=d[0].slice(f);var w=Fo(l,f),k=Fo(c,h.length?Di(h).length-p:0);return d.length>1||d[0]||Ro(w,k)?(Dn(e.doc,d,w,k,"+input"),!0):void 0},ensurePolled:function(){this.forceCompositionEnd()},reset:function(){this.forceCompositionEnd()},forceCompositionEnd:function(){this.composing&&!this.composing.handled&&(this.applyComposition(this.composing),this.composing.handled=!0,this.div.blur(),this.div.focus())},applyComposition:function(e){Z(this.cm)?Wt(this.cm,Pt)(this.cm):e.data&&e.data!=e.startData&&Wt(this.cm,Q)(this.cm,e.data,0,e.sel)},setUneditable:function(e){e.contentEditable="false"},onKeyPress:function(e){e.preventDefault(),Z(this.cm)||Wt(this.cm,Q)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0)},readOnlyChanged:function(e){this.div.contentEditable=String("nocursor"!=e)},onContextMenu:Pi,resetPosition:Pi,needsContentAttribute:!0},oe.prototype),e.inputStyles={textarea:re,contenteditable:oe},de.prototype={primary:function(){return this.ranges[this.primIndex]},equals:function(e){if(e==this)return!0;if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1;for(var t=0;t<this.ranges.length;t++){var n=this.ranges[t],r=e.ranges[t];if(0!=Ro(n.anchor,r.anchor)||0!=Ro(n.head,r.head))return!1}return!0},deepCopy:function(){for(var e=[],t=0;t<this.ranges.length;t++)e[t]=new he(V(this.ranges[t].anchor),V(this.ranges[t].head));return new de(e,this.primIndex)},somethingSelected:function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0;return!1},contains:function(e,t){t||(t=e);for(var n=0;n<this.ranges.length;n++){var r=this.ranges[n];if(Ro(t,r.from())>=0&&Ro(e,r.to())<=0)return n}return-1}},he.prototype={from:function(){return X(this.anchor,this.head)},to:function(){return K(this.anchor,this.head)},empty:function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch}};var _o,jo,qo,Go={left:0,right:0,top:0,bottom:0},Uo=null,$o=0,Vo=0,Ko=0,Xo=null;bo?Xo=-.53:vo?Xo=15:So?Xo=-.7:To&&(Xo=-1/3);var Yo=function(e){var t=e.wheelDeltaX,n=e.wheelDeltaY;return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==n&&e.detail&&e.axis==e.VERTICAL_AXIS?n=e.detail:null==n&&(n=e.wheelDelta),{x:t,y:n}};e.wheelEventPixels=function(e){var t=Yo(e);return t.x*=Xo,t.y*=Xo,t};var Zo=new Wi,Qo=null,Jo=e.changeEnd=function(e){return e.text?Fo(e.from.line+e.text.length-1,Di(e.text).length+(1==e.text.length?e.from.ch:0)):e.to};e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,t){var n=this.options,r=n[e];(n[e]!=t||"mode"==e)&&(n[e]=t,tl.hasOwnProperty(e)&&Wt(this,tl[e])(this,t,r))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](Kn(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,n=0;n<t.length;++n)if(t[n]==e||t[n].name==e)return t.splice(n,1),!0},addOverlay:Ht(function(t,n){var r=t.token?t:e.getMode(this.options,t);if(r.startState)throw new Error("Overlays may not be stateful.");this.state.overlays.push({mode:r,modeSpec:t,opaque:n&&n.opaque}),this.state.modeGen++,Pt(this)}),removeOverlay:Ht(function(e){for(var t=this.state.overlays,n=0;n<t.length;++n){var r=t[n].modeSpec;if(r==e||"string"==typeof e&&r.name==e)return t.splice(n,1),this.state.modeGen++,void Pt(this)}}),indentLine:Ht(function(e,t,n){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),ye(this.doc,e)&&_n(this,e,t,n)}),indentSelection:Ht(function(e){for(var t=this.doc.sel.ranges,n=-1,r=0;r<t.length;r++){var i=t[r];if(i.empty())i.head.line>n&&(_n(this,i.head.line,e,!0),n=i.head.line,r==this.doc.sel.primIndex&&Rn(this));else{var o=i.from(),l=i.to(),a=Math.max(n,o.line);n=Math.min(this.lastLine(),l.line-(l.ch?0:1))+1;for(var s=a;n>s;++s)_n(this,s,e);var c=this.doc.sel.ranges;0==o.ch&&t.length==c.length&&c[r].from().ch>0&&Ce(this.doc,r,new he(o,c[r].to()),zl)}}}),getTokenAt:function(e,t){return Dr(this,e,t)},getLineTokens:function(e,t){return Dr(this,Fo(e),t,!0)},getTokenTypeAt:function(e){e=ge(this.doc,e);var t,n=Pr(this,Qr(this.doc,e.line)),r=0,i=(n.length-1)/2,o=e.ch;if(0==o)t=n[2];else for(;;){var l=r+i>>1;if((l?n[2*l-1]:0)>=o)i=l;else{if(!(n[2*l+1]<o)){t=n[2*l+2];break}r=l+1}}var a=t?t.indexOf("cm-overlay "):-1;return 0>a?t:0==a?null:t.slice(0,a-1)},getModeAt:function(t){var n=this.doc.mode;return n.innerMode?e.innerMode(n,this.getTokenAt(t).state).mode:n},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var n=[];if(!al.hasOwnProperty(t))return n;var r=al[t],i=this.getModeAt(e);if("string"==typeof i[t])r[i[t]]&&n.push(r[i[t]]);else if(i[t])for(var o=0;o<i[t].length;o++){var l=r[i[t][o]];l&&n.push(l)}else i.helperType&&r[i.helperType]?n.push(r[i.helperType]):r[i.name]&&n.push(r[i.name]);for(var o=0;o<r._global.length;o++){var a=r._global[o];a.pred(i,this)&&-1==Ei(n,a.val)&&n.push(a.val)}return n},getStateAfter:function(e,t){var n=this.doc;return e=me(n,null==e?n.first+n.size-1:e),qe(this,e+1,t)},cursorCoords:function(e,t){var n,r=this.doc.sel.primary();return n=null==e?r.head:"object"==typeof e?ge(this.doc,e):e?r.from():r.to(),pt(this,n,t||"page")},charCoords:function(e,t){return ft(this,ge(this.doc,e),t||"page")},coordsChar:function(e,t){return e=ht(this,e,t||"page"),vt(this,e.left,e.top)},lineAtHeight:function(e,t){return e=ht(this,{top:e,left:0},t||"page").top,ri(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t){var n,r=!1;if("number"==typeof e){var i=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>i&&(e=i,r=!0),n=Qr(this.doc,e)}else n=e;return dt(this,n,{top:0,left:0},t||"page").top+(r?this.doc.height-ii(n):0)},defaultTextHeight:function(){return xt(this.display)},defaultCharWidth:function(){return bt(this.display)},setGutterMarker:Ht(function(e,t,n){return jn(this.doc,e,"gutter",function(e){var r=e.gutterMarkers||(e.gutterMarkers={});return r[t]=n,!n&&_i(r)&&(e.gutterMarkers=null),!0})}),clearGutter:Ht(function(e){var t=this,n=t.doc,r=n.first;n.iter(function(n){n.gutterMarkers&&n.gutterMarkers[e]&&(n.gutterMarkers[e]=null,zt(t,r,"gutter"),_i(n.gutterMarkers)&&(n.gutterMarkers=null)),++r})}),lineInfo:function(e){if("number"==typeof e){if(!ye(this.doc,e))return null;var t=e;if(e=Qr(this.doc,e),!e)return null}else{var t=ni(e);if(null==t)return null}return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,n,r,i){var o=this.display;e=pt(this,ge(this.doc,e));var l=e.bottom,a=e.left;if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),o.sizer.appendChild(t),"over"==r)l=e.top;else if("above"==r||"near"==r){var s=Math.max(o.wrapper.clientHeight,this.doc.height),c=Math.max(o.sizer.clientWidth,o.lineSpace.clientWidth);("above"==r||e.bottom+t.offsetHeight>s)&&e.top>t.offsetHeight?l=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=s&&(l=e.bottom),a+t.offsetWidth>c&&(a=c-t.offsetWidth)}t.style.top=l+"px",t.style.left=t.style.right="","right"==i?(a=o.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?a=0:"middle"==i&&(a=(o.sizer.clientWidth-t.offsetWidth)/2),t.style.left=a+"px"),n&&Pn(this,a,l,a+t.offsetWidth,l+t.offsetHeight)},triggerOnKeyDown:Ht(fn),triggerOnKeyPress:Ht(gn),triggerOnKeyUp:mn,execCommand:function(e){return ul.hasOwnProperty(e)?ul[e].call(null,this):void 0},triggerElectric:Ht(function(e){ee(this,e)}),findPosH:function(e,t,n,r){var i=1;0>t&&(i=-1,t=-t);for(var o=0,l=ge(this.doc,e);t>o&&(l=Gn(this.doc,l,i,n,r),!l.hitSide);++o);return l},moveH:Ht(function(e,t){var n=this;n.extendSelectionsBy(function(r){return n.display.shift||n.doc.extend||r.empty()?Gn(n.doc,r.head,e,t,n.options.rtlMoveVisually):0>e?r.from():r.to()},Rl)}),deleteH:Ht(function(e,t){var n=this.doc.sel,r=this.doc;n.somethingSelected()?r.replaceSelection("",null,"+delete"):qn(this,function(n){var i=Gn(r,n.head,e,t,!1);return 0>e?{from:i,to:n.head}:{from:n.head,to:i}})}),findPosV:function(e,t,n,r){var i=1,o=r;0>t&&(i=-1,t=-t);for(var l=0,a=ge(this.doc,e);t>l;++l){var s=pt(this,a,"div");if(null==o?o=s.left:s.left=o,a=Un(this,s,i,n),a.hitSide)break}return a},moveV:Ht(function(e,t){var n=this,r=this.doc,i=[],o=!n.display.shift&&!r.extend&&r.sel.somethingSelected();if(r.extendSelectionsBy(function(l){if(o)return 0>e?l.from():l.to();var a=pt(n,l.head,"div");null!=l.goalColumn&&(a.left=l.goalColumn),i.push(a.left);var s=Un(n,a,e,t);return"page"==t&&l==r.sel.primary()&&Fn(n,null,ft(n,s,"div").top-a.top),s},Rl),i.length)for(var l=0;l<r.sel.ranges.length;l++)r.sel.ranges[l].goalColumn=i[l]}),findWordAt:function(e){var t=this.doc,n=Qr(t,e.line).text,r=e.ch,i=e.ch;if(n){var o=this.getHelper(e,"wordChars");(e.xRel<0||i==n.length)&&r?--r:++i;for(var l=n.charAt(r),a=Bi(l,o)?function(e){return Bi(e,o)}:/\s/.test(l)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!Bi(e)};r>0&&a(n.charAt(r-1));)--r;for(;i<n.length&&a(n.charAt(i));)++i}return new he(Fo(e.line,r),Fo(e.line,i))},toggleOverwrite:function(e){(null==e||e!=this.state.overwrite)&&((this.state.overwrite=!this.state.overwrite)?Ql(this.display.cursorDiv,"CodeMirror-overwrite"):Zl(this.display.cursorDiv,"CodeMirror-overwrite"),Dl(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==$i()},scrollTo:Ht(function(e,t){(null!=e||null!=t)&&Bn(this),null!=e&&(this.curOp.scrollLeft=e),null!=t&&(this.curOp.scrollTop=t)}),getScrollInfo:function(){var e=this.display.scroller;
return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-Ve(this)-this.display.barHeight,width:e.scrollWidth-Ve(this)-this.display.barWidth,clientHeight:Xe(this),clientWidth:Ke(this)}},scrollIntoView:Ht(function(e,t){if(null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:Fo(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line)Bn(this),this.curOp.scrollToPos=e;else{var n=zn(this,Math.min(e.from.left,e.to.left),Math.min(e.from.top,e.to.top)-e.margin,Math.max(e.from.right,e.to.right),Math.max(e.from.bottom,e.to.bottom)+e.margin);this.scrollTo(n.scrollLeft,n.scrollTop)}}),setSize:Ht(function(e,t){function n(e){return"number"==typeof e||/^\d+$/.test(String(e))?e+"px":e}var r=this;null!=e&&(r.display.wrapper.style.width=n(e)),null!=t&&(r.display.wrapper.style.height=n(t)),r.options.lineWrapping&&at(this);var i=r.display.viewFrom;r.doc.iter(i,r.display.viewTo,function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){zt(r,i,"widget");break}++i}),r.curOp.forceUpdate=!0,Dl(r,"refresh",this)}),operation:function(e){return Ot(this,e)},refresh:Ht(function(){var e=this.display.cachedTextHeight;Pt(this),this.curOp.forceUpdate=!0,st(this),this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop),u(this),(null==e||Math.abs(e-xt(this.display))>.5)&&l(this),Dl(this,"refresh",this)}),swapDoc:Ht(function(e){var t=this.doc;return t.cm=null,Zr(this,e),st(this),this.display.input.reset(),this.scrollTo(e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,Li(this,"swapDoc",this,t),t}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},Oi(e);var el=e.defaults={},tl=e.optionHandlers={},nl=e.Init={toString:function(){return"CodeMirror.Init"}};$n("value","",function(e,t){e.setValue(t)},!0),$n("mode",null,function(e,t){e.doc.modeOption=t,n(e)},!0),$n("indentUnit",2,n,!0),$n("indentWithTabs",!1),$n("smartIndent",!0),$n("tabSize",4,function(e){r(e),st(e),Pt(e)},!0),$n("lineSeparator",null,function(e,t){if(e.doc.lineSep=t,t){var n=[],r=e.doc.first;e.doc.iter(function(e){for(var i=0;;){var o=e.text.indexOf(t,i);if(-1==o)break;i=o+t.length,n.push(Fo(r,o))}r++});for(var i=n.length-1;i>=0;i--)Dn(e.doc,t,n[i],Fo(n[i].line,n[i].ch+t.length))}}),$n("specialChars",/[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,function(t,n,r){t.state.specialChars=new RegExp(n.source+(n.test("	")?"":"|	"),"g"),r!=e.Init&&t.refresh()}),$n("specialCharPlaceholder",Br,function(e){e.refresh()},!0),$n("electricChars",!0),$n("inputStyle",Oo?"contenteditable":"textarea",function(){throw new Error("inputStyle can not (yet) be changed in a running editor")},!0),$n("rtlMoveVisually",!Ho),$n("wholeLineUpdateBefore",!0),$n("theme","default",function(e){a(e),s(e)},!0),$n("keyMap","default",function(t,n,r){var i=Kn(n),o=r!=e.Init&&Kn(r);o&&o.detach&&o.detach(t,i),i.attach&&i.attach(t,o||null)}),$n("extraKeys",null),$n("lineWrapping",!1,i,!0),$n("gutters",[],function(e){f(e.options),s(e)},!0),$n("fixedGutter",!0,function(e,t){e.display.gutters.style.left=t?S(e.display)+"px":"0",e.refresh()},!0),$n("coverGutterNextToScrollbar",!1,function(e){y(e)},!0),$n("scrollbarStyle","native",function(e){v(e),y(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)},!0),$n("lineNumbers",!1,function(e){f(e.options),s(e)},!0),$n("firstLineNumber",1,s,!0),$n("lineNumberFormatter",function(e){return e},s,!0),$n("showCursorWhenSelecting",!1,Ie,!0),$n("resetSelectionOnContextMenu",!0),$n("lineWiseCopyCut",!0),$n("readOnly",!1,function(e,t){"nocursor"==t?(xn(e),e.display.input.blur(),e.display.disabled=!0):e.display.disabled=!1,e.display.input.readOnlyChanged(t)}),$n("disableInput",!1,function(e,t){t||e.display.input.reset()},!0),$n("dragDrop",!0,Gt),$n("allowDropFileTypes",null),$n("cursorBlinkRate",530),$n("cursorScrollMargin",0),$n("cursorHeight",1,Ie,!0),$n("singleCursorHeightPerLine",!0,Ie,!0),$n("workTime",100),$n("workDelay",100),$n("flattenSpans",!0,r,!0),$n("addModeClass",!1,r,!0),$n("pollInterval",100),$n("undoDepth",200,function(e,t){e.doc.history.undoDepth=t}),$n("historyEventDelay",1250),$n("viewportMargin",10,function(e){e.refresh()},!0),$n("maxHighlightLength",1e4,r,!0),$n("moveInputWithCursor",!0,function(e,t){t||e.display.input.resetPosition()}),$n("tabindex",null,function(e,t){e.display.input.getField().tabIndex=t||""}),$n("autofocus",null);var rl=e.modes={},il=e.mimeModes={};e.defineMode=function(t,n){e.defaults.mode||"null"==t||(e.defaults.mode=t),arguments.length>2&&(n.dependencies=Array.prototype.slice.call(arguments,2)),rl[t]=n},e.defineMIME=function(e,t){il[e]=t},e.resolveMode=function(t){if("string"==typeof t&&il.hasOwnProperty(t))t=il[t];else if(t&&"string"==typeof t.name&&il.hasOwnProperty(t.name)){var n=il[t.name];"string"==typeof n&&(n={name:n}),t=zi(n,t),t.name=n.name}else if("string"==typeof t&&/^[\w\-]+\/[\w\-]+\+xml$/.test(t))return e.resolveMode("application/xml");return"string"==typeof t?{name:t}:t||{name:"null"}},e.getMode=function(t,n){var n=e.resolveMode(n),r=rl[n.name];if(!r)return e.getMode(t,"text/plain");var i=r(t,n);if(ol.hasOwnProperty(n.name)){var o=ol[n.name];for(var l in o)o.hasOwnProperty(l)&&(i.hasOwnProperty(l)&&(i["_"+l]=i[l]),i[l]=o[l])}if(i.name=n.name,n.helperType&&(i.helperType=n.helperType),n.modeProps)for(var l in n.modeProps)i[l]=n.modeProps[l];return i},e.defineMode("null",function(){return{token:function(e){e.skipToEnd()}}}),e.defineMIME("text/plain","null");var ol=e.modeExtensions={};e.extendMode=function(e,t){var n=ol.hasOwnProperty(e)?ol[e]:ol[e]={};Fi(t,n)},e.defineExtension=function(t,n){e.prototype[t]=n},e.defineDocExtension=function(e,t){Sl.prototype[e]=t},e.defineOption=$n;var ll=[];e.defineInitHook=function(e){ll.push(e)};var al=e.helpers={};e.registerHelper=function(t,n,r){al.hasOwnProperty(t)||(al[t]=e[t]={_global:[]}),al[t][n]=r},e.registerGlobalHelper=function(t,n,r,i){e.registerHelper(t,n,i),al[t]._global.push({pred:r,val:i})};var sl=e.copyState=function(e,t){if(t===!0)return t;if(e.copyState)return e.copyState(t);var n={};for(var r in t){var i=t[r];i instanceof Array&&(i=i.concat([])),n[r]=i}return n},cl=e.startState=function(e,t,n){return e.startState?e.startState(t,n):!0};e.innerMode=function(e,t){for(;e.innerMode;){var n=e.innerMode(t);if(!n||n.mode==e)break;t=n.state,e=n.mode}return n||{mode:e,state:t}};var ul=e.commands={selectAll:function(e){e.setSelection(Fo(e.firstLine(),0),Fo(e.lastLine()),zl)},singleSelection:function(e){e.setSelection(e.getCursor("anchor"),e.getCursor("head"),zl)},killLine:function(e){qn(e,function(t){if(t.empty()){var n=Qr(e.doc,t.head.line).text.length;return t.head.ch==n&&t.head.line<e.lastLine()?{from:t.head,to:Fo(t.head.line+1,0)}:{from:t.head,to:Fo(t.head.line,n)}}return{from:t.from(),to:t.to()}})},deleteLine:function(e){qn(e,function(t){return{from:Fo(t.from().line,0),to:ge(e.doc,Fo(t.to().line+1,0))}})},delLineLeft:function(e){qn(e,function(e){return{from:Fo(e.from().line,0),to:e.from()}})},delWrappedLineLeft:function(e){qn(e,function(t){var n=e.charCoords(t.head,"div").top+5,r=e.coordsChar({left:0,top:n},"div");return{from:r,to:t.from()}})},delWrappedLineRight:function(e){qn(e,function(t){var n=e.charCoords(t.head,"div").top+5,r=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:n},"div");return{from:t.from(),to:r}})},undo:function(e){e.undo()},redo:function(e){e.redo()},undoSelection:function(e){e.undoSelection()},redoSelection:function(e){e.redoSelection()},goDocStart:function(e){e.extendSelection(Fo(e.firstLine(),0))},goDocEnd:function(e){e.extendSelection(Fo(e.lastLine()))},goLineStart:function(e){e.extendSelectionsBy(function(t){return lo(e,t.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(e){e.extendSelectionsBy(function(t){return so(e,t.head)},{origin:"+move",bias:1})},goLineEnd:function(e){e.extendSelectionsBy(function(t){return ao(e,t.head.line)},{origin:"+move",bias:-1})},goLineRight:function(e){e.extendSelectionsBy(function(t){var n=e.charCoords(t.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:n},"div")},Rl)},goLineLeft:function(e){e.extendSelectionsBy(function(t){var n=e.charCoords(t.head,"div").top+5;return e.coordsChar({left:0,top:n},"div")},Rl)},goLineLeftSmart:function(e){e.extendSelectionsBy(function(t){var n=e.charCoords(t.head,"div").top+5,r=e.coordsChar({left:0,top:n},"div");return r.ch<e.getLine(r.line).search(/\S/)?so(e,t.head):r},Rl)},goLineUp:function(e){e.moveV(-1,"line")},goLineDown:function(e){e.moveV(1,"line")},goPageUp:function(e){e.moveV(-1,"page")},goPageDown:function(e){e.moveV(1,"page")},goCharLeft:function(e){e.moveH(-1,"char")},goCharRight:function(e){e.moveH(1,"char")},goColumnLeft:function(e){e.moveH(-1,"column")},goColumnRight:function(e){e.moveH(1,"column")},goWordLeft:function(e){e.moveH(-1,"word")},goGroupRight:function(e){e.moveH(1,"group")},goGroupLeft:function(e){e.moveH(-1,"group")},goWordRight:function(e){e.moveH(1,"word")},delCharBefore:function(e){e.deleteH(-1,"char")},delCharAfter:function(e){e.deleteH(1,"char")},delWordBefore:function(e){e.deleteH(-1,"word")},delWordAfter:function(e){e.deleteH(1,"word")},delGroupBefore:function(e){e.deleteH(-1,"group")},delGroupAfter:function(e){e.deleteH(1,"group")},indentAuto:function(e){e.indentSelection("smart")},indentMore:function(e){e.indentSelection("add")},indentLess:function(e){e.indentSelection("subtract")},insertTab:function(e){e.replaceSelection("	")},insertSoftTab:function(e){for(var t=[],n=e.listSelections(),r=e.options.tabSize,i=0;i<n.length;i++){var o=n[i].from(),l=Bl(e.getLine(o.line),o.ch,r);t.push(new Array(r-l%r+1).join(" "))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){Ot(e,function(){for(var t=e.listSelections(),n=[],r=0;r<t.length;r++){var i=t[r].head,o=Qr(e.doc,i.line).text;if(o)if(i.ch==o.length&&(i=new Fo(i.line,i.ch-1)),i.ch>0)i=new Fo(i.line,i.ch+1),e.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2),Fo(i.line,i.ch-2),i,"+transpose");else if(i.line>e.doc.first){var l=Qr(e.doc,i.line-1).text;l&&e.replaceRange(o.charAt(0)+e.doc.lineSeparator()+l.charAt(l.length-1),Fo(i.line-1,l.length-1),Fo(i.line,1),"+transpose")}n.push(new he(i,i))}e.setSelections(n)})},newlineAndIndent:function(e){Ot(e,function(){for(var t=e.listSelections().length,n=0;t>n;n++){var r=e.listSelections()[n];e.replaceRange(e.doc.lineSeparator(),r.anchor,r.head,"+input"),e.indentLine(r.from().line+1,null,!0)}Rn(e)})},toggleOverwrite:function(e){e.toggleOverwrite()}},dl=e.keyMap={};dl.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},dl.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},dl.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars"},dl.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},dl["default"]=Wo?dl.macDefault:dl.pcDefault,e.normalizeKeyMap=function(e){var t={};for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];if(/^(name|fallthrough|(de|at)tach)$/.test(n))continue;if("..."==r){delete e[n];continue}for(var i=Ii(n.split(" "),Vn),o=0;o<i.length;o++){var l,a;o==i.length-1?(a=i.join(" "),l=r):(a=i.slice(0,o+1).join(" "),l="...");var s=t[a];if(s){if(s!=l)throw new Error("Inconsistent bindings for "+a)}else t[a]=l}delete e[n]}for(var c in t)e[c]=t[c];return e};var hl=e.lookupKey=function(e,t,n,r){t=Kn(t);var i=t.call?t.call(e,r):t[e];if(i===!1)return"nothing";if("..."===i)return"multi";if(null!=i&&n(i))return"handled";if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return hl(e,t.fallthrough,n,r);for(var o=0;o<t.fallthrough.length;o++){var l=hl(e,t.fallthrough[o],n,r);if(l)return l}}},fl=e.isModifierKey=function(e){var t="string"==typeof e?e:oa[e.keyCode];return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t},pl=e.keyName=function(e,t){if(Lo&&34==e.keyCode&&e["char"])return!1;var n=oa[e.keyCode],r=n;return null==r||e.altGraphKey?!1:(e.altKey&&"Alt"!=n&&(r="Alt-"+r),(Eo?e.metaKey:e.ctrlKey)&&"Ctrl"!=n&&(r="Ctrl-"+r),(Eo?e.ctrlKey:e.metaKey)&&"Cmd"!=n&&(r="Cmd-"+r),!t&&e.shiftKey&&"Shift"!=n&&(r="Shift-"+r),r)};e.fromTextArea=function(t,n){function r(){t.value=c.getValue()}if(n=n?Fi(n):{},n.value=t.value,!n.tabindex&&t.tabIndex&&(n.tabindex=t.tabIndex),!n.placeholder&&t.placeholder&&(n.placeholder=t.placeholder),null==n.autofocus){var i=$i();n.autofocus=i==t||null!=t.getAttribute("autofocus")&&i==document.body}if(t.form&&(Ol(t.form,"submit",r),!n.leaveSubmitMethodAlone)){var o=t.form,l=o.submit;try{var a=o.submit=function(){r(),o.submit=l,o.submit(),o.submit=a}}catch(s){}}n.finishInit=function(e){e.save=r,e.getTextArea=function(){return t},e.toTextArea=function(){e.toTextArea=isNaN,r(),t.parentNode.removeChild(e.getWrapperElement()),t.style.display="",t.form&&(Hl(t.form,"submit",r),"function"==typeof t.form.submit&&(t.form.submit=l))}},t.style.display="none";var c=e(function(e){t.parentNode.insertBefore(e,t.nextSibling)},n);return c};var ml=e.StringStream=function(e,t){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0};ml.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==this.lineStart},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(e){var t=this.string.charAt(this.pos);if("string"==typeof e)var n=t==e;else var n=t&&(e.test?e.test(t):e(t));return n?(++this.pos,t):void 0},eatWhile:function(e){for(var t=this.pos;this.eat(e););return this.pos>t},eatSpace:function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e},skipToEnd:function(){this.pos=this.string.length},skipTo:function(e){var t=this.string.indexOf(e,this.pos);return t>-1?(this.pos=t,!0):void 0},backUp:function(e){this.pos-=e},column:function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=Bl(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?Bl(this.string,this.lineStart,this.tabSize):0)},indentation:function(){return Bl(this.string,null,this.tabSize)-(this.lineStart?Bl(this.string,this.lineStart,this.tabSize):0)},match:function(e,t,n){if("string"!=typeof e){var r=this.string.slice(this.pos).match(e);return r&&r.index>0?null:(r&&t!==!1&&(this.pos+=r[0].length),r)}var i=function(e){return n?e.toLowerCase():e},o=this.string.substr(this.pos,e.length);return i(o)==i(e)?(t!==!1&&(this.pos+=e.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(e,t){this.lineStart+=e;try{return t()}finally{this.lineStart-=e}}};var gl=0,vl=e.TextMarker=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++gl};Oi(vl),vl.prototype.clear=function(){if(!this.explicitlyCleared){var e=this.doc.cm,t=e&&!e.curOp;if(t&&wt(e),Ai(this,"clear")){var n=this.find();n&&Li(this,"clear",n.from,n.to)}for(var r=null,i=null,o=0;o<this.lines.length;++o){var l=this.lines[o],a=tr(l.markedSpans,this);e&&!this.collapsed?zt(e,ni(l),"text"):e&&(null!=a.to&&(i=ni(l)),null!=a.from&&(r=ni(l))),l.markedSpans=nr(l.markedSpans,a),null==a.from&&this.collapsed&&!Cr(this.doc,l)&&e&&ti(l,xt(e.display))}if(e&&this.collapsed&&!e.options.lineWrapping)for(var o=0;o<this.lines.length;++o){var s=xr(this.lines[o]),c=d(s);c>e.display.maxLineLength&&(e.display.maxLine=s,e.display.maxLineLength=c,e.display.maxLineChanged=!0)}null!=r&&e&&this.collapsed&&Pt(e,r,i+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,e&&Oe(e.doc)),e&&Li(e,"markerCleared",e,this),t&&Ct(e),this.parent&&this.parent.clear()}},vl.prototype.find=function(e,t){null==e&&"bookmark"==this.type&&(e=1);for(var n,r,i=0;i<this.lines.length;++i){var o=this.lines[i],l=tr(o.markedSpans,this);if(null!=l.from&&(n=Fo(t?o:ni(o),l.from),-1==e))return n;if(null!=l.to&&(r=Fo(t?o:ni(o),l.to),1==e))return r}return n&&{from:n,to:r}},vl.prototype.changed=function(){var e=this.find(-1,!0),t=this,n=this.doc.cm;e&&n&&Ot(n,function(){var r=e.line,i=ni(e.line),o=et(n,i);if(o&&(lt(o),n.curOp.selectionChanged=n.curOp.forceUpdate=!0),n.curOp.updateMaxLine=!0,!Cr(t.doc,r)&&null!=t.height){var l=t.height;t.height=null;var a=Tr(t)-l;a&&ti(r,r.height+a)}})},vl.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;t.maybeHiddenMarkers&&-1!=Ei(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},vl.prototype.detachLine=function(e){if(this.lines.splice(Ei(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}};var gl=0,yl=e.SharedTextMarker=function(e,t){this.markers=e,this.primary=t;for(var n=0;n<e.length;++n)e[n].parent=this};Oi(yl),yl.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var e=0;e<this.markers.length;++e)this.markers[e].clear();Li(this,"clear")}},yl.prototype.find=function(e,t){return this.primary.find(e,t)};var xl=e.LineWidget=function(e,t,n){if(n)for(var r in n)n.hasOwnProperty(r)&&(this[r]=n[r]);this.doc=e,this.node=t};Oi(xl),xl.prototype.clear=function(){var e=this.doc.cm,t=this.line.widgets,n=this.line,r=ni(n);if(null!=r&&t){for(var i=0;i<t.length;++i)t[i]==this&&t.splice(i--,1);t.length||(n.widgets=null);var o=Tr(this);ti(n,Math.max(0,n.height-o)),e&&Ot(e,function(){Lr(e,n,-o),zt(e,r,"widget")})}},xl.prototype.changed=function(){var e=this.height,t=this.doc.cm,n=this.line;this.height=null;var r=Tr(this)-e;r&&(ti(n,n.height+r),t&&Ot(t,function(){t.curOp.forceUpdate=!0,Lr(t,n,r)}))};var bl=e.Line=function(e,t,n){this.text=e,dr(this,t),this.height=n?n(this):1};Oi(bl),bl.prototype.lineNo=function(){return ni(this)};var wl={},kl={};Kr.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var n=e,r=e+t;r>n;++n){var i=this.lines[n];this.height-=i.height,Ar(i),Li(i,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,n){this.height+=n,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e));for(var r=0;r<t.length;++r)t[r].parent=this},iterN:function(e,t,n){for(var r=e+t;r>e;++e)if(n(this.lines[e]))return!0}},Xr.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){this.size-=t;for(var n=0;n<this.children.length;++n){var r=this.children[n],i=r.chunkSize();if(i>e){var o=Math.min(t,i-e),l=r.height;if(r.removeInner(e,o),this.height-=l-r.height,i==o&&(this.children.splice(n--,1),r.parent=null),0==(t-=o))break;e=0}else e-=i}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof Kr))){var a=[];this.collapse(a),this.children=[new Kr(a)],this.children[0].parent=this}},collapse:function(e){for(var t=0;t<this.children.length;++t)this.children[t].collapse(e)},insertInner:function(e,t,n){this.size+=t.length,this.height+=n;for(var r=0;r<this.children.length;++r){var i=this.children[r],o=i.chunkSize();if(o>=e){if(i.insertInner(e,t,n),i.lines&&i.lines.length>50){for(;i.lines.length>50;){var l=i.lines.splice(i.lines.length-25,25),a=new Kr(l);i.height-=a.height,this.children.splice(r+1,0,a),a.parent=this}this.maybeSpill()}break}e-=o}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this;do{var t=e.children.splice(e.children.length-5,5),n=new Xr(t);if(e.parent){e.size-=n.size,e.height-=n.height;var r=Ei(e.parent.children,e);e.parent.children.splice(r+1,0,n)}else{var i=new Xr(e.children);i.parent=e,e.children=[i,n],e=i}n.parent=e.parent}while(e.children.length>10);e.parent.maybeSpill()}},iterN:function(e,t,n){for(var r=0;r<this.children.length;++r){var i=this.children[r],o=i.chunkSize();if(o>e){var l=Math.min(t,o-e);if(i.iterN(e,l,n))return!0;if(0==(t-=l))break;e=0}else e-=o}}};var Cl=0,Sl=e.Doc=function(e,t,n,r){if(!(this instanceof Sl))return new Sl(e,t,n,r);null==n&&(n=0),Xr.call(this,[new Kr([new bl("",null)])]),this.first=n,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.frontier=n;var i=Fo(n,0);this.sel=pe(i),this.history=new li(null),this.id=++Cl,this.modeOption=t,this.lineSep=r,this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Vr(this,{from:i,to:i,text:e}),Me(this,pe(i),zl)};Sl.prototype=zi(Xr.prototype,{constructor:Sl,iter:function(e,t,n){n?this.iterN(e-this.first,t-e,n):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var n=0,r=0;r<t.length;++r)n+=t[r].height;this.insertInner(e-this.first,t,n)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=ei(this,this.first,this.first+this.size);return e===!1?t:t.join(e||this.lineSeparator())},setValue:Dt(function(e){var t=Fo(this.first,0),n=this.first+this.size-1;Mn(this,{from:t,to:Fo(n,Qr(this,n).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),Me(this,pe(t))}),replaceRange:function(e,t,n,r){t=ge(this,t),n=n?ge(this,n):t,Dn(this,e,t,n,r)},getRange:function(e,t,n){var r=Jr(this,ge(this,e),ge(this,t));return n===!1?r:r.join(n||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e);return t&&t.text},getLineHandle:function(e){return ye(this,e)?Qr(this,e):void 0},getLineNumber:function(e){return ni(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=Qr(this,e)),xr(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return ge(this,e)},getCursor:function(e){var t,n=this.sel.primary();return t=null==e||"head"==e?n.head:"anchor"==e?n.anchor:"end"==e||"to"==e||e===!1?n.to():n.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:Dt(function(e,t,n){Se(this,ge(this,"number"==typeof e?Fo(e,t||0):e),null,n)}),setSelection:Dt(function(e,t,n){Se(this,ge(this,e),ge(this,t||e),n)}),extendSelection:Dt(function(e,t,n){we(this,ge(this,e),t&&ge(this,t),n)}),extendSelections:Dt(function(e,t){ke(this,xe(this,e,t))}),extendSelectionsBy:Dt(function(e,t){ke(this,Ii(this.sel.ranges,e),t)}),setSelections:Dt(function(e,t,n){if(e.length){for(var r=0,i=[];r<e.length;r++)i[r]=new he(ge(this,e[r].anchor),ge(this,e[r].head));null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),Me(this,fe(i,t),n)}}),addSelection:Dt(function(e,t,n){var r=this.sel.ranges.slice(0);r.push(new he(ge(this,e),ge(this,t||e))),Me(this,fe(r,r.length-1),n)}),getSelection:function(e){for(var t,n=this.sel.ranges,r=0;r<n.length;r++){var i=Jr(this,n[r].from(),n[r].to());t=t?t.concat(i):i}return e===!1?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=[],n=this.sel.ranges,r=0;r<n.length;r++){var i=Jr(this,n[r].from(),n[r].to());e!==!1&&(i=i.join(e||this.lineSeparator())),t[r]=i}return t},replaceSelection:function(e,t,n){for(var r=[],i=0;i<this.sel.ranges.length;i++)r[i]=e;this.replaceSelections(r,t,n||"+input")},replaceSelections:Dt(function(e,t,n){for(var r=[],i=this.sel,o=0;o<i.ranges.length;o++){var l=i.ranges[o];r[o]={from:l.from(),to:l.to(),text:this.splitLines(e[o]),origin:n}}for(var a=t&&"end"!=t&&Ln(this,r,t),o=r.length-1;o>=0;o--)Mn(this,r[o]);a?Te(this,a):this.cm&&Rn(this.cm)}),undo:Dt(function(){An(this,"undo")}),redo:Dt(function(){An(this,"redo")}),undoSelection:Dt(function(){An(this,"undo",!0)}),redoSelection:Dt(function(){An(this,"redo",!0)}),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,n=0,r=0;r<e.done.length;r++)e.done[r].ranges||++t;for(var r=0;r<e.undone.length;r++)e.undone[r].ranges||++n;return{undo:t,redo:n}},clearHistory:function(){this.history=new li(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:vi(this.history.done),undone:vi(this.history.undone)}},setHistory:function(e){var t=this.history=new li(this.history.maxGeneration);t.done=vi(e.done.slice(0),null,!0),t.undone=vi(e.undone.slice(0),null,!0)},addLineClass:Dt(function(e,t,n){return jn(this,e,"gutter"==t?"gutter":"class",function(e){var r="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass";if(e[r]){if(Vi(n).test(e[r]))return!1;e[r]+=" "+n}else e[r]=n;return!0})}),removeLineClass:Dt(function(e,t,n){return jn(this,e,"gutter"==t?"gutter":"class",function(e){var r="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass",i=e[r];if(!i)return!1;if(null==n)e[r]=null;else{var o=i.match(Vi(n));if(!o)return!1;var l=o.index+o[0].length;e[r]=i.slice(0,o.index)+(o.index&&l!=i.length?" ":"")+i.slice(l)||null}return!0})}),addLineWidget:Dt(function(e,t,n){return Mr(this,e,t,n)}),removeLineWidget:function(e){e.clear()},markText:function(e,t,n){return Xn(this,ge(this,e),ge(this,t),n,n&&n.type||"range")},setBookmark:function(e,t){var n={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents};return e=ge(this,e),Xn(this,e,e,n,"bookmark")},findMarksAt:function(e){e=ge(this,e);var t=[],n=Qr(this,e.line).markedSpans;if(n)for(var r=0;r<n.length;++r){var i=n[r];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,n){e=ge(this,e),t=ge(this,t);var r=[],i=e.line;return this.iter(e.line,t.line+1,function(o){var l=o.markedSpans;if(l)for(var a=0;a<l.length;a++){var s=l[a];i==e.line&&e.ch>s.to||null==s.from&&i!=e.line||i==t.line&&s.from>t.ch||n&&!n(s.marker)||r.push(s.marker.parent||s.marker)}++i}),r},getAllMarks:function(){var e=[];return this.iter(function(t){var n=t.markedSpans;if(n)for(var r=0;r<n.length;++r)null!=n[r].from&&e.push(n[r].marker)}),e},posFromIndex:function(e){var t,n=this.first;return this.iter(function(r){var i=r.text.length+1;return i>e?(t=e,!0):(e-=i,void++n)}),ge(this,Fo(n,t))},indexFromPos:function(e){e=ge(this,e);var t=e.ch;return e.line<this.first||e.ch<0?0:(this.iter(this.first,e.line,function(e){t+=e.text.length+1}),t)},copy:function(e){var t=new Sl(ei(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep);return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={});var t=this.first,n=this.first+this.size;null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<n&&(n=e.to);var r=new Sl(ei(this,t,n),e.mode||this.modeOption,t,this.lineSep);return e.sharedHist&&(r.history=this.history),(this.linked||(this.linked=[])).push({doc:r,sharedHist:e.sharedHist}),r.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],Qn(r,Zn(this)),r},unlinkDoc:function(t){if(t instanceof e&&(t=t.doc),this.linked)for(var n=0;n<this.linked.length;++n){var r=this.linked[n];if(r.doc==t){this.linked.splice(n,1),t.unlinkDoc(this),Jn(Zn(this));break}}if(t.history==this.history){var i=[t.id];Yr(t,function(e){i.push(e.id)},!0),t.history=new li(null),t.history.done=vi(this.history.done,i),t.history.undone=vi(this.history.undone,i)}},iterLinkedDocs:function(e){Yr(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):ta(e)},lineSeparator:function(){return this.lineSep||"\n"}}),Sl.prototype.eachLine=Sl.prototype.iter;var Ll="iter insert remove copy getEditor constructor".split(" ");for(var Tl in Sl.prototype)Sl.prototype.hasOwnProperty(Tl)&&Ei(Ll,Tl)<0&&(e.prototype[Tl]=function(e){return function(){return e.apply(this.doc,arguments)}}(Sl.prototype[Tl]));Oi(Sl);var Ml=e.e_preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},Nl=e.e_stopPropagation=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},Al=e.e_stop=function(e){Ml(e),Nl(e)},Ol=e.on=function(e,t,n){if(e.addEventListener)e.addEventListener(t,n,!1);else if(e.attachEvent)e.attachEvent("on"+t,n);else{var r=e._handlers||(e._handlers={}),i=r[t]||(r[t]=[]);i.push(n)}},Wl=[],Hl=e.off=function(e,t,n){if(e.removeEventListener)e.removeEventListener(t,n,!1);else if(e.detachEvent)e.detachEvent("on"+t,n);else for(var r=Si(e,t,!1),i=0;i<r.length;++i)if(r[i]==n){r.splice(i,1);break}},Dl=e.signal=function(e,t){var n=Si(e,t,!0);if(n.length)for(var r=Array.prototype.slice.call(arguments,2),i=0;i<n.length;++i)n[i].apply(null,r)},El=null,Il=30,Pl=e.Pass={toString:function(){return"CodeMirror.Pass"}},zl={scroll:!1},Fl={origin:"*mouse"},Rl={origin:"+move"};Wi.prototype.set=function(e,t){clearTimeout(this.id),this.id=setTimeout(t,e)};var Bl=e.countColumn=function(e,t,n,r,i){null==t&&(t=e.search(/[^\s\u00a0]/),-1==t&&(t=e.length));for(var o=r||0,l=i||0;;){var a=e.indexOf("	",o);if(0>a||a>=t)return l+(t-o);l+=a-o,l+=n-l%n,o=a+1}},_l=e.findColumn=function(e,t,n){for(var r=0,i=0;;){var o=e.indexOf("	",r);-1==o&&(o=e.length);var l=o-r;if(o==e.length||i+l>=t)return r+Math.min(l,t-i);if(i+=o-r,i+=n-i%n,r=o+1,i>=t)return r}},jl=[""],ql=function(e){e.select()};Ao?ql=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:bo&&(ql=function(e){try{e.select()}catch(t){}});var Gl,Ul=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,$l=e.isWordChar=function(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||Ul.test(e))},Vl=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
Gl=document.createRange?function(e,t,n,r){var i=document.createRange();return i.setEnd(r||e,n),i.setStart(e,t),i}:function(e,t,n){var r=document.body.createTextRange();try{r.moveToElementText(e.parentNode)}catch(i){return r}return r.collapse(!0),r.moveEnd("character",n),r.moveStart("character",t),r};var Kl=e.contains=function(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t);do if(11==t.nodeType&&(t=t.host),t==e)return!0;while(t=t.parentNode)};bo&&11>wo&&($i=function(){try{return document.activeElement}catch(e){return document.body}});var Xl,Yl,Zl=e.rmClass=function(e,t){var n=e.className,r=Vi(t).exec(n);if(r){var i=n.slice(r.index+r[0].length);e.className=n.slice(0,r.index)+(i?r[1]+i:"")}},Ql=e.addClass=function(e,t){var n=e.className;Vi(t).test(n)||(e.className+=(n?" ":"")+t)},Jl=!1,ea=function(){if(bo&&9>wo)return!1;var e=qi("div");return"draggable"in e||"dragDrop"in e}(),ta=e.splitLines=3!="\n\nb".split(/\n/).length?function(e){for(var t=0,n=[],r=e.length;r>=t;){var i=e.indexOf("\n",t);-1==i&&(i=e.length);var o=e.slice(t,"\r"==e.charAt(i-1)?i-1:i),l=o.indexOf("\r");-1!=l?(n.push(o.slice(0,l)),t+=l+1):(n.push(o),t=i+1)}return n}:function(e){return e.split(/\r\n?|\n/)},na=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(t){return!1}}:function(e){try{var t=e.ownerDocument.selection.createRange()}catch(n){}return t&&t.parentElement()==e?0!=t.compareEndPoints("StartToEnd",t):!1},ra=function(){var e=qi("div");return"oncopy"in e?!0:(e.setAttribute("oncopy","return;"),"function"==typeof e.oncopy)}(),ia=null,oa=e.keyNames={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",127:"Delete",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"};!function(){for(var e=0;10>e;e++)oa[e+48]=oa[e+96]=String(e);for(var e=65;90>=e;e++)oa[e]=String.fromCharCode(e);for(var e=1;12>=e;e++)oa[e+111]=oa[e+63235]="F"+e}();var la,aa=function(){function e(e){return 247>=e?n.charAt(e):e>=1424&&1524>=e?"R":e>=1536&&1773>=e?r.charAt(e-1536):e>=1774&&2220>=e?"r":e>=8192&&8203>=e?"w":8204==e?"b":"L"}function t(e,t,n){this.level=e,this.from=t,this.to=n}var n="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",r="rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",i=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,o=/[stwN]/,l=/[LRr]/,a=/[Lb1n]/,s=/[1n]/,c="L";return function(n){if(!i.test(n))return!1;for(var r,u=n.length,d=[],h=0;u>h;++h)d.push(r=e(n.charCodeAt(h)));for(var h=0,f=c;u>h;++h){var r=d[h];"m"==r?d[h]=f:f=r}for(var h=0,p=c;u>h;++h){var r=d[h];"1"==r&&"r"==p?d[h]="n":l.test(r)&&(p=r,"r"==r&&(d[h]="R"))}for(var h=1,f=d[0];u-1>h;++h){var r=d[h];"+"==r&&"1"==f&&"1"==d[h+1]?d[h]="1":","!=r||f!=d[h+1]||"1"!=f&&"n"!=f||(d[h]=f),f=r}for(var h=0;u>h;++h){var r=d[h];if(","==r)d[h]="N";else if("%"==r){for(var m=h+1;u>m&&"%"==d[m];++m);for(var g=h&&"!"==d[h-1]||u>m&&"1"==d[m]?"1":"N",v=h;m>v;++v)d[v]=g;h=m-1}}for(var h=0,p=c;u>h;++h){var r=d[h];"L"==p&&"1"==r?d[h]="L":l.test(r)&&(p=r)}for(var h=0;u>h;++h)if(o.test(d[h])){for(var m=h+1;u>m&&o.test(d[m]);++m);for(var y="L"==(h?d[h-1]:c),x="L"==(u>m?d[m]:c),g=y||x?"L":"R",v=h;m>v;++v)d[v]=g;h=m-1}for(var b,w=[],h=0;u>h;)if(a.test(d[h])){var k=h;for(++h;u>h&&a.test(d[h]);++h);w.push(new t(0,k,h))}else{var C=h,S=w.length;for(++h;u>h&&"L"!=d[h];++h);for(var v=C;h>v;)if(s.test(d[v])){v>C&&w.splice(S,0,new t(1,C,v));var L=v;for(++v;h>v&&s.test(d[v]);++v);w.splice(S,0,new t(2,L,v)),C=v}else++v;h>C&&w.splice(S,0,new t(1,C,h))}return 1==w[0].level&&(b=n.match(/^\s+/))&&(w[0].from=b[0].length,w.unshift(new t(0,0,b[0].length))),1==Di(w).level&&(b=n.match(/\s+$/))&&(Di(w).to-=b[0].length,w.push(new t(0,u-b[0].length,u))),2==w[0].level&&w.unshift(new t(1,w[0].to,w[0].to)),w[0].level!=Di(w).level&&w.push(new t(w[0].level,u,u)),w}}();return e.version="5.9.1",e})},{}],7:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../../lib/codemirror"),t("../markdown/markdown"),t("../../addon/mode/overlay")):"function"==typeof e&&e.amd?e(["../../lib/codemirror","../markdown/markdown","../../addon/mode/overlay"],i):i(CodeMirror)}(function(e){"use strict";var t=/^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;e.defineMode("gfm",function(n,r){function i(e){return e.code=!1,null}var o=0,l={startState:function(){return{code:!1,codeBlock:!1,ateSpace:!1}},copyState:function(e){return{code:e.code,codeBlock:e.codeBlock,ateSpace:e.ateSpace}},token:function(e,n){if(n.combineTokens=null,n.codeBlock)return e.match(/^```+/)?(n.codeBlock=!1,null):(e.skipToEnd(),null);if(e.sol()&&(n.code=!1),e.sol()&&e.match(/^```+/))return e.skipToEnd(),n.codeBlock=!0,null;if("`"===e.peek()){e.next();var i=e.pos;e.eatWhile("`");var l=1+e.pos-i;return n.code?l===o&&(n.code=!1):(o=l,n.code=!0),null}if(n.code)return e.next(),null;if(e.eatSpace())return n.ateSpace=!0,null;if((e.sol()||n.ateSpace)&&(n.ateSpace=!1,r.gitHubSpice!==!1)){if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/))return n.combineTokens=!0,"link";if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/))return n.combineTokens=!0,"link"}return e.match(t)&&"]("!=e.string.slice(e.start-2,e.start)&&(0==e.start||/\W/.test(e.string.charAt(e.start-1)))?(n.combineTokens=!0,"link"):(e.next(),null)},blankLine:i},a={underscoresBreakWords:!1,taskLists:!0,fencedCodeBlocks:"```",strikethrough:!0};for(var s in r)a[s]=r[s];return a.name="markdown",e.overlayMode(e.getMode(n,a),l)},"markdown"),e.defineMIME("text/x-gfm","gfm")})},{"../../addon/mode/overlay":5,"../../lib/codemirror":6,"../markdown/markdown":8}],8:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../../lib/codemirror"),t("../xml/xml"),t("../meta")):"function"==typeof e&&e.amd?e(["../../lib/codemirror","../xml/xml","../meta"],i):i(CodeMirror)}(function(e){"use strict";e.defineMode("markdown",function(t,n){function r(n){if(e.findModeByName){var r=e.findModeByName(n);r&&(n=r.mime||r.mimes[0])}var i=e.getMode(t,n);return"null"==i.name?null:i}function i(e,t,n){return t.f=t.inline=n,n(e,t)}function o(e,t,n){return t.f=t.block=n,n(e,t)}function l(e){return!e||!/\S/.test(e.string)}function a(e){return e.linkTitle=!1,e.em=!1,e.strong=!1,e.strikethrough=!1,e.quote=0,e.indentedCode=!1,k||e.f!=c||(e.f=p,e.block=s),e.trailingSpace=0,e.trailingSpaceNewLine=!1,e.prevLine=e.thisLine,e.thisLine=null,null}function s(e,t){var o=e.sol(),a=t.list!==!1,s=t.indentedCode;t.indentedCode=!1,a&&(t.indentationDiff>=0?(t.indentationDiff<4&&(t.indentation-=t.indentationDiff),t.list=null):t.indentation>0?(t.list=null,t.listDepth=Math.floor(t.indentation/4)):(t.list=!1,t.listDepth=0));var c=null;if(t.indentationDiff>=4)return e.skipToEnd(),s||l(t.prevLine)?(t.indentation-=4,t.indentedCode=!0,L.code):null;if(e.eatSpace())return null;if((c=e.match(W))&&c[1].length<=6)return t.header=c[1].length,n.highlightFormatting&&(t.formatting="header"),t.f=t.inline,h(t);if(!(l(t.prevLine)||t.quote||a||s)&&(c=e.match(H)))return t.header="="==c[0].charAt(0)?1:2,n.highlightFormatting&&(t.formatting="header"),t.f=t.inline,h(t);if(e.eat(">"))return t.quote=o?1:t.quote+1,n.highlightFormatting&&(t.formatting="quote"),e.eatSpace(),h(t);if("["===e.peek())return i(e,t,y);if(e.match(M,!0))return t.hr=!0,L.hr;if((l(t.prevLine)||a)&&(e.match(N,!1)||e.match(A,!1))){var d=null;return e.match(N,!0)?d="ul":(e.match(A,!0),d="ol"),t.indentation=e.column()+e.current().length,t.list=!0,t.listDepth++,n.taskLists&&e.match(O,!1)&&(t.taskList=!0),t.f=t.inline,n.highlightFormatting&&(t.formatting=["list","list-"+d]),h(t)}return n.fencedCodeBlocks&&(c=e.match(E,!0))?(t.fencedChars=c[1],t.localMode=r(c[2]),t.localMode&&(t.localState=t.localMode.startState()),t.f=t.block=u,n.highlightFormatting&&(t.formatting="code-block"),t.code=!0,h(t)):i(e,t,t.inline)}function c(e,t){var n=C.token(e,t.htmlState);return(k&&null===t.htmlState.tagStart&&!t.htmlState.context&&t.htmlState.tokenize.isInText||t.md_inside&&e.current().indexOf(">")>-1)&&(t.f=p,t.block=s,t.htmlState=null),n}function u(e,t){return e.sol()&&t.fencedChars&&e.match(t.fencedChars,!1)?(t.localMode=t.localState=null,t.f=t.block=d,null):t.localMode?t.localMode.token(e,t.localState):(e.skipToEnd(),L.code)}function d(e,t){e.match(t.fencedChars),t.block=s,t.f=p,t.fencedChars=null,n.highlightFormatting&&(t.formatting="code-block"),t.code=!0;var r=h(t);return t.code=!1,r}function h(e){var t=[];if(e.formatting){t.push(L.formatting),"string"==typeof e.formatting&&(e.formatting=[e.formatting]);for(var r=0;r<e.formatting.length;r++)t.push(L.formatting+"-"+e.formatting[r]),"header"===e.formatting[r]&&t.push(L.formatting+"-"+e.formatting[r]+"-"+e.header),"quote"===e.formatting[r]&&(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote?t.push(L.formatting+"-"+e.formatting[r]+"-"+e.quote):t.push("error"))}if(e.taskOpen)return t.push("meta"),t.length?t.join(" "):null;if(e.taskClosed)return t.push("property"),t.length?t.join(" "):null;if(e.linkHref?t.push(L.linkHref,"url"):(e.strong&&t.push(L.strong),e.em&&t.push(L.em),e.strikethrough&&t.push(L.strikethrough),e.linkText&&t.push(L.linkText),e.code&&t.push(L.code)),e.header&&t.push(L.header,L.header+"-"+e.header),e.quote&&(t.push(L.quote),!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote?t.push(L.quote+"-"+e.quote):t.push(L.quote+"-"+n.maxBlockquoteDepth)),e.list!==!1){var i=(e.listDepth-1)%3;i?1===i?t.push(L.list2):t.push(L.list3):t.push(L.list1)}return e.trailingSpaceNewLine?t.push("trailing-space-new-line"):e.trailingSpace&&t.push("trailing-space-"+(e.trailingSpace%2?"a":"b")),t.length?t.join(" "):null}function f(e,t){return e.match(D,!0)?h(t):void 0}function p(t,r){var i=r.text(t,r);if("undefined"!=typeof i)return i;if(r.list)return r.list=null,h(r);if(r.taskList){var l="x"!==t.match(O,!0)[1];return l?r.taskOpen=!0:r.taskClosed=!0,n.highlightFormatting&&(r.formatting="task"),r.taskList=!1,h(r)}if(r.taskOpen=!1,r.taskClosed=!1,r.header&&t.match(/^#+$/,!0))return n.highlightFormatting&&(r.formatting="header"),h(r);var a=t.sol(),s=t.next();if("\\"===s&&(t.next(),n.highlightFormatting)){var u=h(r),d=L.formatting+"-escape";return u?u+" "+d:d}if(r.linkTitle){r.linkTitle=!1;var f=s;"("===s&&(f=")"),f=(f+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var p="^\\s*(?:[^"+f+"\\\\]+|\\\\\\\\|\\\\.)"+f;if(t.match(new RegExp(p),!0))return L.linkHref}if("`"===s){var v=r.formatting;n.highlightFormatting&&(r.formatting="code");var y=h(r),x=t.pos;t.eatWhile("`");var b=1+t.pos-x;return r.code?b===S?(r.code=!1,y):(r.formatting=v,h(r)):(S=b,r.code=!0,h(r))}if(r.code)return h(r);if("!"===s&&t.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return t.match(/\[[^\]]*\]/),r.inline=r.f=g,L.image;if("["===s&&t.match(/.*\](\(.*\)| ?\[.*\])/,!1))return r.linkText=!0,n.highlightFormatting&&(r.formatting="link"),h(r);if("]"===s&&r.linkText&&t.match(/\(.*\)| ?\[.*\]/,!1)){n.highlightFormatting&&(r.formatting="link");var u=h(r);return r.linkText=!1,r.inline=r.f=g,u}if("<"===s&&t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1)){r.f=r.inline=m,n.highlightFormatting&&(r.formatting="link");var u=h(r);return u?u+=" ":u="",u+L.linkInline}if("<"===s&&t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1)){r.f=r.inline=m,n.highlightFormatting&&(r.formatting="link");var u=h(r);return u?u+=" ":u="",u+L.linkEmail}if("<"===s&&t.match(/^(!--|\w)/,!1)){var w=t.string.indexOf(">",t.pos);if(-1!=w){var k=t.string.substring(t.start,w);/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(k)&&(r.md_inside=!0)}return t.backUp(1),r.htmlState=e.startState(C),o(t,r,c)}if("<"===s&&t.match(/^\/\w*?>/))return r.md_inside=!1,"tag";var T=!1;if(!n.underscoresBreakWords&&"_"===s&&"_"!==t.peek()&&t.match(/(\w)/,!1)){var M=t.pos-2;if(M>=0){var N=t.string.charAt(M);"_"!==N&&N.match(/(\w)/,!1)&&(T=!0)}}if("*"===s||"_"===s&&!T)if(a&&" "===t.peek());else{if(r.strong===s&&t.eat(s)){n.highlightFormatting&&(r.formatting="strong");var y=h(r);return r.strong=!1,y}if(!r.strong&&t.eat(s))return r.strong=s,n.highlightFormatting&&(r.formatting="strong"),h(r);if(r.em===s){n.highlightFormatting&&(r.formatting="em");var y=h(r);return r.em=!1,y}if(!r.em)return r.em=s,n.highlightFormatting&&(r.formatting="em"),h(r)}else if(" "===s&&(t.eat("*")||t.eat("_"))){if(" "===t.peek())return h(r);t.backUp(1)}if(n.strikethrough)if("~"===s&&t.eatWhile(s)){if(r.strikethrough){n.highlightFormatting&&(r.formatting="strikethrough");var y=h(r);return r.strikethrough=!1,y}if(t.match(/^[^\s]/,!1))return r.strikethrough=!0,n.highlightFormatting&&(r.formatting="strikethrough"),h(r)}else if(" "===s&&t.match(/^~~/,!0)){if(" "===t.peek())return h(r);t.backUp(2)}return" "===s&&(t.match(/ +$/,!1)?r.trailingSpace++:r.trailingSpace&&(r.trailingSpaceNewLine=!0)),h(r)}function m(e,t){var r=e.next();if(">"===r){t.f=t.inline=p,n.highlightFormatting&&(t.formatting="link");var i=h(t);return i?i+=" ":i="",i+L.linkInline}return e.match(/^[^>]+/,!0),L.linkInline}function g(e,t){if(e.eatSpace())return null;var r=e.next();return"("===r||"["===r?(t.f=t.inline=v("("===r?")":"]"),n.highlightFormatting&&(t.formatting="link-string"),t.linkHref=!0,h(t)):"error"}function v(e){return function(t,r){var i=t.next();if(i===e){r.f=r.inline=p,n.highlightFormatting&&(r.formatting="link-string");var o=h(r);return r.linkHref=!1,o}return t.match(w(e),!0)&&t.backUp(1),r.linkHref=!0,h(r)}}function y(e,t){return e.match(/^[^\]]*\]:/,!1)?(t.f=x,e.next(),n.highlightFormatting&&(t.formatting="link"),t.linkText=!0,h(t)):i(e,t,p)}function x(e,t){if(e.match(/^\]:/,!0)){t.f=t.inline=b,n.highlightFormatting&&(t.formatting="link");var r=h(t);return t.linkText=!1,r}return e.match(/^[^\]]+/,!0),L.linkText}function b(e,t){return e.eatSpace()?null:(e.match(/^[^\s]+/,!0),void 0===e.peek()?t.linkTitle=!0:e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),t.f=t.inline=p,L.linkHref+" url")}function w(e){return I[e]||(e=(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),I[e]=new RegExp("^(?:[^\\\\]|\\\\.)*?("+e+")")),I[e]}var k=e.modes.hasOwnProperty("xml"),C=e.getMode(t,k?{name:"xml",htmlMode:!0}:"text/plain");void 0===n.highlightFormatting&&(n.highlightFormatting=!1),void 0===n.maxBlockquoteDepth&&(n.maxBlockquoteDepth=0),void 0===n.underscoresBreakWords&&(n.underscoresBreakWords=!0),void 0===n.taskLists&&(n.taskLists=!1),void 0===n.strikethrough&&(n.strikethrough=!1),void 0===n.tokenTypeOverrides&&(n.tokenTypeOverrides={});var S=0,L={header:"header",code:"comment",quote:"quote",list1:"variable-2",list2:"variable-3",list3:"keyword",hr:"hr",image:"tag",formatting:"formatting",linkInline:"link",linkEmail:"link",linkText:"link",linkHref:"string",em:"em",strong:"strong",strikethrough:"strikethrough"};for(var T in L)L.hasOwnProperty(T)&&n.tokenTypeOverrides[T]&&(L[T]=n.tokenTypeOverrides[T]);var M=/^([*\-_])(?:\s*\1){2,}\s*$/,N=/^[*\-+]\s+/,A=/^[0-9]+([.)])\s+/,O=/^\[(x| )\](?=\s)/,W=n.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/,H=/^ *(?:\={1,}|-{1,})\s*$/,D=/^[^#!\[\]*_\\<>` "'(~]+/,E=new RegExp("^("+(n.fencedCodeBlocks===!0?"~~~+|```+":n.fencedCodeBlocks)+")[ \\t]*([\\w+#]*)"),I=[],P={startState:function(){return{f:s,prevLine:null,thisLine:null,block:s,htmlState:null,indentation:0,inline:p,text:f,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,em:!1,strong:!1,header:0,hr:!1,taskList:!1,list:!1,listDepth:0,quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1,fencedChars:null}},copyState:function(t){return{f:t.f,prevLine:t.prevLine,thisLine:t.thisLine,block:t.block,htmlState:t.htmlState&&e.copyState(C,t.htmlState),indentation:t.indentation,localMode:t.localMode,localState:t.localMode?e.copyState(t.localMode,t.localState):null,inline:t.inline,text:t.text,formatting:!1,linkTitle:t.linkTitle,code:t.code,em:t.em,strong:t.strong,strikethrough:t.strikethrough,header:t.header,hr:t.hr,taskList:t.taskList,list:t.list,listDepth:t.listDepth,quote:t.quote,indentedCode:t.indentedCode,trailingSpace:t.trailingSpace,trailingSpaceNewLine:t.trailingSpaceNewLine,md_inside:t.md_inside,fencedChars:t.fencedChars}},token:function(e,t){if(t.formatting=!1,e!=t.thisLine){var n=t.header||t.hr;if(t.header=0,t.hr=!1,e.match(/^\s*$/,!0)||n){if(a(t),!n)return null;t.prevLine=null}t.prevLine=t.thisLine,t.thisLine=e,t.taskList=!1,t.trailingSpace=0,t.trailingSpaceNewLine=!1,t.f=t.block;var r=e.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length,i=4*Math.floor((r-t.indentation)/4);i>4&&(i=4);var o=t.indentation+i;if(t.indentationDiff=o-t.indentation,t.indentation=o,r>0)return null}return t.f(e,t)},innerMode:function(e){return e.block==c?{state:e.htmlState,mode:C}:e.localState?{state:e.localState,mode:e.localMode}:{state:e,mode:P}},blankLine:a,getType:h,fold:"markdown"};return P},"xml"),e.defineMIME("text/x-markdown","markdown")})},{"../../lib/codemirror":6,"../meta":9,"../xml/xml":10}],9:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../lib/codemirror")):"function"==typeof e&&e.amd?e(["../lib/codemirror"],i):i(CodeMirror)}(function(e){"use strict";e.modeInfo=[{name:"APL",mime:"text/apl",mode:"apl",ext:["dyalog","apl"]},{name:"PGP",mimes:["application/pgp","application/pgp-keys","application/pgp-signature"],mode:"asciiarmor",ext:["pgp"]},{name:"ASN.1",mime:"text/x-ttcn-asn",mode:"asn.1",ext:["asn","asn1"]},{name:"Asterisk",mime:"text/x-asterisk",mode:"asterisk",file:/^extensions\.conf$/i},{name:"Brainfuck",mime:"text/x-brainfuck",mode:"brainfuck",ext:["b","bf"]},{name:"C",mime:"text/x-csrc",mode:"clike",ext:["c","h"]},{name:"C++",mime:"text/x-c++src",mode:"clike",ext:["cpp","c++","cc","cxx","hpp","h++","hh","hxx"],alias:["cpp"]},{name:"Cobol",mime:"text/x-cobol",mode:"cobol",ext:["cob","cpy"]},{name:"C#",mime:"text/x-csharp",mode:"clike",ext:["cs"],alias:["csharp"]},{name:"Clojure",mime:"text/x-clojure",mode:"clojure",ext:["clj"]},{name:"Closure Stylesheets (GSS)",mime:"text/x-gss",mode:"css",ext:["gss"]},{name:"CMake",mime:"text/x-cmake",mode:"cmake",ext:["cmake","cmake.in"],file:/^CMakeLists.txt$/},{name:"CoffeeScript",mime:"text/x-coffeescript",mode:"coffeescript",ext:["coffee"],alias:["coffee","coffee-script"]},{name:"Common Lisp",mime:"text/x-common-lisp",mode:"commonlisp",ext:["cl","lisp","el"],alias:["lisp"]},{name:"Cypher",mime:"application/x-cypher-query",mode:"cypher",ext:["cyp","cypher"]},{name:"Cython",mime:"text/x-cython",mode:"python",ext:["pyx","pxd","pxi"]},{name:"CSS",mime:"text/css",mode:"css",ext:["css"]},{name:"CQL",mime:"text/x-cassandra",mode:"sql",ext:["cql"]},{name:"D",mime:"text/x-d",mode:"d",ext:["d"]},{name:"Dart",mimes:["application/dart","text/x-dart"],mode:"dart",ext:["dart"]},{name:"diff",mime:"text/x-diff",mode:"diff",ext:["diff","patch"]},{name:"Django",mime:"text/x-django",mode:"django"},{name:"Dockerfile",mime:"text/x-dockerfile",mode:"dockerfile",file:/^Dockerfile$/},{name:"DTD",mime:"application/xml-dtd",mode:"dtd",ext:["dtd"]},{name:"Dylan",mime:"text/x-dylan",mode:"dylan",ext:["dylan","dyl","intr"]},{name:"EBNF",mime:"text/x-ebnf",mode:"ebnf"},{name:"ECL",mime:"text/x-ecl",mode:"ecl",ext:["ecl"]},{name:"Eiffel",mime:"text/x-eiffel",mode:"eiffel",ext:["e"]},{name:"Elm",mime:"text/x-elm",mode:"elm",ext:["elm"]},{name:"Embedded Javascript",mime:"application/x-ejs",mode:"htmlembedded",ext:["ejs"]},{name:"Embedded Ruby",mime:"application/x-erb",mode:"htmlembedded",ext:["erb"]},{name:"Erlang",mime:"text/x-erlang",mode:"erlang",ext:["erl"]},{name:"Factor",mime:"text/x-factor",mode:"factor",ext:["factor"]},{name:"Forth",mime:"text/x-forth",mode:"forth",ext:["forth","fth","4th"]},{name:"Fortran",mime:"text/x-fortran",mode:"fortran",ext:["f","for","f77","f90"]},{name:"F#",mime:"text/x-fsharp",mode:"mllike",ext:["fs"],alias:["fsharp"]},{name:"Gas",mime:"text/x-gas",mode:"gas",ext:["s"]},{name:"Gherkin",mime:"text/x-feature",mode:"gherkin",ext:["feature"]},{name:"GitHub Flavored Markdown",mime:"text/x-gfm",mode:"gfm",file:/^(readme|contributing|history).md$/i},{name:"Go",mime:"text/x-go",mode:"go",ext:["go"]},{name:"Groovy",mime:"text/x-groovy",mode:"groovy",ext:["groovy"]},{name:"HAML",mime:"text/x-haml",mode:"haml",ext:["haml"]},{name:"Haskell",mime:"text/x-haskell",mode:"haskell",ext:["hs"]},{name:"Haxe",mime:"text/x-haxe",mode:"haxe",ext:["hx"]},{name:"HXML",mime:"text/x-hxml",mode:"haxe",ext:["hxml"]},{name:"ASP.NET",mime:"application/x-aspx",mode:"htmlembedded",ext:["aspx"],alias:["asp","aspx"]},{name:"HTML",mime:"text/html",mode:"htmlmixed",ext:["html","htm"],alias:["xhtml"]},{name:"HTTP",mime:"message/http",mode:"http"},{name:"IDL",mime:"text/x-idl",mode:"idl",ext:["pro"]},{name:"Jade",mime:"text/x-jade",mode:"jade",ext:["jade"]},{name:"Java",mime:"text/x-java",mode:"clike",ext:["java"]},{name:"Java Server Pages",mime:"application/x-jsp",mode:"htmlembedded",ext:["jsp"],alias:["jsp"]},{name:"JavaScript",mimes:["text/javascript","text/ecmascript","application/javascript","application/x-javascript","application/ecmascript"],mode:"javascript",ext:["js"],alias:["ecmascript","js","node"]},{name:"JSON",mimes:["application/json","application/x-json"],mode:"javascript",ext:["json","map"],alias:["json5"]},{name:"JSON-LD",mime:"application/ld+json",mode:"javascript",ext:["jsonld"],alias:["jsonld"]},{name:"Jinja2",mime:"null",mode:"jinja2"},{name:"Julia",mime:"text/x-julia",mode:"julia",ext:["jl"]},{name:"Kotlin",mime:"text/x-kotlin",mode:"clike",ext:["kt"]},{name:"LESS",mime:"text/x-less",mode:"css",ext:["less"]},{name:"LiveScript",mime:"text/x-livescript",mode:"livescript",ext:["ls"],alias:["ls"]},{name:"Lua",mime:"text/x-lua",mode:"lua",ext:["lua"]},{name:"Markdown",mime:"text/x-markdown",mode:"markdown",ext:["markdown","md","mkd"]},{name:"mIRC",mime:"text/mirc",mode:"mirc"},{name:"MariaDB SQL",mime:"text/x-mariadb",mode:"sql"},{name:"Mathematica",mime:"text/x-mathematica",mode:"mathematica",ext:["m","nb"]},{name:"Modelica",mime:"text/x-modelica",mode:"modelica",ext:["mo"]},{name:"MUMPS",mime:"text/x-mumps",mode:"mumps"},{name:"MS SQL",mime:"text/x-mssql",mode:"sql"},{name:"MySQL",mime:"text/x-mysql",mode:"sql"},{name:"Nginx",mime:"text/x-nginx-conf",mode:"nginx",file:/nginx.*\.conf$/i},{name:"NSIS",mime:"text/x-nsis",mode:"nsis",ext:["nsh","nsi"]},{name:"NTriples",mime:"text/n-triples",mode:"ntriples",ext:["nt"]},{name:"Objective C",mime:"text/x-objectivec",mode:"clike",ext:["m","mm"]},{name:"OCaml",mime:"text/x-ocaml",mode:"mllike",ext:["ml","mli","mll","mly"]},{name:"Octave",mime:"text/x-octave",mode:"octave",ext:["m"]},{name:"Oz",mime:"text/x-oz",mode:"oz",ext:["oz"]},{name:"Pascal",mime:"text/x-pascal",mode:"pascal",ext:["p","pas"]},{name:"PEG.js",mime:"null",mode:"pegjs",ext:["jsonld"]},{name:"Perl",mime:"text/x-perl",mode:"perl",ext:["pl","pm"]},{name:"PHP",mime:"application/x-httpd-php",mode:"php",ext:["php","php3","php4","php5","phtml"]},{name:"Pig",mime:"text/x-pig",mode:"pig",ext:["pig"]},{name:"Plain Text",mime:"text/plain",mode:"null",ext:["txt","text","conf","def","list","log"]},{name:"PLSQL",mime:"text/x-plsql",mode:"sql",ext:["pls"]},{name:"Properties files",mime:"text/x-properties",mode:"properties",ext:["properties","ini","in"],alias:["ini","properties"]},{name:"Python",mime:"text/x-python",mode:"python",ext:["py","pyw"]},{name:"Puppet",mime:"text/x-puppet",mode:"puppet",ext:["pp"]},{name:"Q",mime:"text/x-q",mode:"q",ext:["q"]},{name:"R",mime:"text/x-rsrc",mode:"r",ext:["r"],alias:["rscript"]},{name:"reStructuredText",mime:"text/x-rst",mode:"rst",ext:["rst"],alias:["rst"]},{name:"RPM Changes",mime:"text/x-rpm-changes",mode:"rpm"},{name:"RPM Spec",mime:"text/x-rpm-spec",mode:"rpm",ext:["spec"]},{name:"Ruby",mime:"text/x-ruby",mode:"ruby",ext:["rb"],alias:["jruby","macruby","rake","rb","rbx"]},{name:"Rust",mime:"text/x-rustsrc",mode:"rust",ext:["rs"]},{name:"Sass",mime:"text/x-sass",mode:"sass",ext:["sass"]},{name:"Scala",mime:"text/x-scala",mode:"clike",ext:["scala"]},{name:"Scheme",mime:"text/x-scheme",mode:"scheme",ext:["scm","ss"]},{name:"SCSS",mime:"text/x-scss",mode:"css",ext:["scss"]},{name:"Shell",mime:"text/x-sh",mode:"shell",ext:["sh","ksh","bash"],alias:["bash","sh","zsh"],file:/^PKGBUILD$/},{name:"Sieve",mime:"application/sieve",mode:"sieve",ext:["siv","sieve"]},{name:"Slim",mimes:["text/x-slim","application/x-slim"],mode:"slim",ext:["slim"]},{name:"Smalltalk",mime:"text/x-stsrc",mode:"smalltalk",ext:["st"]},{name:"Smarty",mime:"text/x-smarty",mode:"smarty",ext:["tpl"]},{name:"Solr",mime:"text/x-solr",mode:"solr"},{name:"Soy",mime:"text/x-soy",mode:"soy",ext:["soy"],alias:["closure template"]},{name:"SPARQL",mime:"application/sparql-query",mode:"sparql",ext:["rq","sparql"],alias:["sparul"]},{name:"Spreadsheet",mime:"text/x-spreadsheet",mode:"spreadsheet",alias:["excel","formula"]},{name:"SQL",mime:"text/x-sql",mode:"sql",ext:["sql"]},{name:"Squirrel",mime:"text/x-squirrel",mode:"clike",ext:["nut"]},{name:"Swift",mime:"text/x-swift",mode:"swift",ext:["swift"]},{name:"MariaDB",mime:"text/x-mariadb",mode:"sql"},{name:"sTeX",mime:"text/x-stex",mode:"stex"},{name:"LaTeX",mime:"text/x-latex",mode:"stex",ext:["text","ltx"],alias:["tex"]},{name:"SystemVerilog",mime:"text/x-systemverilog",mode:"verilog",ext:["v"]},{name:"Tcl",mime:"text/x-tcl",mode:"tcl",ext:["tcl"]},{name:"Textile",mime:"text/x-textile",mode:"textile",ext:["textile"]},{name:"TiddlyWiki ",mime:"text/x-tiddlywiki",mode:"tiddlywiki"},{name:"Tiki wiki",mime:"text/tiki",mode:"tiki"},{name:"TOML",mime:"text/x-toml",mode:"toml",ext:["toml"]},{name:"Tornado",mime:"text/x-tornado",mode:"tornado"},{name:"troff",mime:"troff",mode:"troff",ext:["1","2","3","4","5","6","7","8","9"]},{name:"TTCN",mime:"text/x-ttcn",mode:"ttcn",ext:["ttcn","ttcn3","ttcnpp"]},{name:"TTCN_CFG",mime:"text/x-ttcn-cfg",mode:"ttcn-cfg",ext:["cfg"]},{name:"Turtle",mime:"text/turtle",mode:"turtle",ext:["ttl"]},{name:"TypeScript",mime:"application/typescript",mode:"javascript",ext:["ts"],alias:["ts"]},{name:"Twig",mime:"text/x-twig",mode:"twig"},{name:"VB.NET",mime:"text/x-vb",mode:"vb",ext:["vb"]},{name:"VBScript",mime:"text/vbscript",mode:"vbscript",ext:["vbs"]},{name:"Velocity",mime:"text/velocity",mode:"velocity",ext:["vtl"]},{name:"Verilog",mime:"text/x-verilog",mode:"verilog",ext:["v"]},{name:"VHDL",mime:"text/x-vhdl",mode:"vhdl",ext:["vhd","vhdl"]},{name:"XML",mimes:["application/xml","text/xml"],mode:"xml",ext:["xml","xsl","xsd"],alias:["rss","wsdl","xsd"]},{name:"XQuery",mime:"application/xquery",mode:"xquery",ext:["xy","xquery"]},{name:"YAML",mime:"text/x-yaml",mode:"yaml",ext:["yaml","yml"],alias:["yml"]},{name:"Z80",mime:"text/x-z80",mode:"z80",ext:["z80"]},{name:"mscgen",mime:"text/x-mscgen",mode:"mscgen",ext:["mscgen","mscin","msc"]},{name:"xu",mime:"text/x-xu",mode:"mscgen",ext:["xu"]},{name:"msgenny",mime:"text/x-msgenny",mode:"mscgen",ext:["msgenny"]}];for(var t=0;t<e.modeInfo.length;t++){var n=e.modeInfo[t];n.mimes&&(n.mime=n.mimes[0])}e.findModeByMIME=function(t){t=t.toLowerCase();for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n];if(r.mime==t)return r;if(r.mimes)for(var i=0;i<r.mimes.length;i++)if(r.mimes[i]==t)return r}},e.findModeByExtension=function(t){for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n];if(r.ext)for(var i=0;i<r.ext.length;i++)if(r.ext[i]==t)return r}},e.findModeByFileName=function(t){for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n];if(r.file&&r.file.test(t))return r}var i=t.lastIndexOf("."),o=i>-1&&t.substring(i+1,t.length);return o?e.findModeByExtension(o):void 0},e.findModeByName=function(t){t=t.toLowerCase();for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n];if(r.name.toLowerCase()==t)return r;if(r.alias)for(var i=0;i<r.alias.length;i++)if(r.alias[i].toLowerCase()==t)return r}}})},{"../lib/codemirror":6}],10:[function(t,n,r){!function(i){"object"==typeof r&&"object"==typeof n?i(t("../../lib/codemirror")):"function"==typeof e&&e.amd?e(["../../lib/codemirror"],i):i(CodeMirror)}(function(e){"use strict";e.defineMode("xml",function(t,n){function r(e,t){function n(n){return t.tokenize=n,n(e,t)}var r=e.next();if("<"==r)return e.eat("!")?e.eat("[")?e.match("CDATA[")?n(l("atom","]]>")):null:e.match("--")?n(l("comment","-->")):e.match("DOCTYPE",!0,!0)?(e.eatWhile(/[\w\._\-]/),n(a(1))):null:e.eat("?")?(e.eatWhile(/[\w\._\-]/),t.tokenize=l("meta","?>"),"meta"):(C=e.eat("/")?"closeTag":"openTag",t.tokenize=i,"tag bracket");if("&"==r){var o;return o=e.eat("#")?e.eat("x")?e.eatWhile(/[a-fA-F\d]/)&&e.eat(";"):e.eatWhile(/[\d]/)&&e.eat(";"):e.eatWhile(/[\w\.\-:]/)&&e.eat(";"),o?"atom":"error"}return e.eatWhile(/[^&<]/),null}function i(e,t){var n=e.next();if(">"==n||"/"==n&&e.eat(">"))return t.tokenize=r,C=">"==n?"endTag":"selfcloseTag","tag bracket";if("="==n)return C="equals",null;if("<"==n){t.tokenize=r,t.state=d,t.tagName=t.tagStart=null;var i=t.tokenize(e,t);return i?i+" tag error":"tag error"}return/[\'\"]/.test(n)?(t.tokenize=o(n),t.stringStartCol=e.column(),t.tokenize(e,t)):(e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function o(e){var t=function(t,n){for(;!t.eol();)if(t.next()==e){n.tokenize=i;break}return"string"};return t.isInAttribute=!0,t}function l(e,t){return function(n,i){for(;!n.eol();){if(n.match(t)){i.tokenize=r;break}n.next()}return e}}function a(e){return function(t,n){for(var i;null!=(i=t.next());){if("<"==i)return n.tokenize=a(e+1),n.tokenize(t,n);if(">"==i){if(1==e){n.tokenize=r;break}return n.tokenize=a(e-1),n.tokenize(t,n)}}return"meta"}}function s(e,t,n){this.prev=e.context,this.tagName=t,this.indent=e.indented,this.startOfLine=n,(L.doNotIndent.hasOwnProperty(t)||e.context&&e.context.noIndent)&&(this.noIndent=!0)}function c(e){e.context&&(e.context=e.context.prev)}function u(e,t){for(var n;;){if(!e.context)return;if(n=e.context.tagName,!L.contextGrabbers.hasOwnProperty(n)||!L.contextGrabbers[n].hasOwnProperty(t))return;c(e)}}function d(e,t,n){return"openTag"==e?(n.tagStart=t.column(),h):"closeTag"==e?f:d}function h(e,t,n){return"word"==e?(n.tagName=t.current(),S="tag",g):(S="error",h)}function f(e,t,n){if("word"==e){var r=t.current();return n.context&&n.context.tagName!=r&&L.implicitlyClosed.hasOwnProperty(n.context.tagName)&&c(n),n.context&&n.context.tagName==r?(S="tag",p):(S="tag error",m)}return S="error",m}function p(e,t,n){return"endTag"!=e?(S="error",p):(c(n),d)}function m(e,t,n){return S="error",p(e,t,n)}function g(e,t,n){if("word"==e)return S="attribute",
v;if("endTag"==e||"selfcloseTag"==e){var r=n.tagName,i=n.tagStart;return n.tagName=n.tagStart=null,"selfcloseTag"==e||L.autoSelfClosers.hasOwnProperty(r)?u(n,r):(u(n,r),n.context=new s(n,r,i==n.indented)),d}return S="error",g}function v(e,t,n){return"equals"==e?y:(L.allowMissing||(S="error"),g(e,t,n))}function y(e,t,n){return"string"==e?x:"word"==e&&L.allowUnquoted?(S="string",g):(S="error",g(e,t,n))}function x(e,t,n){return"string"==e?x:g(e,t,n)}var b=t.indentUnit,w=n.multilineTagIndentFactor||1,k=n.multilineTagIndentPastTag;null==k&&(k=!0);var C,S,L=n.htmlMode?{autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0}:{autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,caseFold:!1},T=n.alignCDATA;return r.isInText=!0,{startState:function(){return{tokenize:r,state:d,indented:0,tagName:null,tagStart:null,context:null}},token:function(e,t){if(!t.tagName&&e.sol()&&(t.indented=e.indentation()),e.eatSpace())return null;C=null;var n=t.tokenize(e,t);return(n||C)&&"comment"!=n&&(S=null,t.state=t.state(C||n,e,t),S&&(n="error"==S?n+" error":S)),n},indent:function(t,n,o){var l=t.context;if(t.tokenize.isInAttribute)return t.tagStart==t.indented?t.stringStartCol+1:t.indented+b;if(l&&l.noIndent)return e.Pass;if(t.tokenize!=i&&t.tokenize!=r)return o?o.match(/^(\s*)/)[0].length:0;if(t.tagName)return k?t.tagStart+t.tagName.length+2:t.tagStart+b*w;if(T&&/<!\[CDATA\[/.test(n))return 0;var a=n&&/^<(\/)?([\w_:\.-]*)/.exec(n);if(a&&a[1])for(;l;){if(l.tagName==a[2]){l=l.prev;break}if(!L.implicitlyClosed.hasOwnProperty(l.tagName))break;l=l.prev}else if(a)for(;l;){var s=L.contextGrabbers[l.tagName];if(!s||!s.hasOwnProperty(a[2]))break;l=l.prev}for(;l&&!l.startOfLine;)l=l.prev;return l?l.indent+b:0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"<!--",blockCommentEnd:"-->",configuration:n.htmlMode?"html":"xml",helperType:n.htmlMode?"html":"xml"}}),e.defineMIME("text/xml","xml"),e.defineMIME("application/xml","xml"),e.mimeModes.hasOwnProperty("text/html")||e.defineMIME("text/html",{name:"xml",htmlMode:!0})})},{"../../lib/codemirror":6}],11:[function(t,n,r){(function(t){(function(){function t(e){this.tokens=[],this.tokens.links={},this.options=e||h.defaults,this.rules=f.normal,this.options.gfm&&(this.options.tables?this.rules=f.tables:this.rules=f.gfm)}function i(e,t){if(this.options=t||h.defaults,this.links=e,this.rules=p.normal,this.renderer=this.options.renderer||new o,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=p.breaks:this.rules=p.gfm:this.options.pedantic&&(this.rules=p.pedantic)}function o(e){this.options=e||{}}function l(e){this.tokens=[],this.token=null,this.options=e||h.defaults,this.options.renderer=this.options.renderer||new o,this.renderer=this.options.renderer,this.renderer.options=this.options}function a(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s(e){return e.replace(/&([#\w]+);/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function c(e,t){return e=e.source,t=t||"",function n(r,i){return r?(i=i.source||i,i=i.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,i),n):new RegExp(e,t)}}function u(){}function d(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function h(e,n,r){if(r||"function"==typeof n){r||(r=n,n=null),n=d({},h.defaults,n||{});var i,o,s=n.highlight,c=0;try{i=t.lex(e,n)}catch(u){return r(u)}o=i.length;var f=function(e){if(e)return n.highlight=s,r(e);var t;try{t=l.parse(i,n)}catch(o){e=o}return n.highlight=s,e?r(e):r(null,t)};if(!s||s.length<3)return f();if(delete n.highlight,!o)return f();for(;c<i.length;c++)!function(e){return"code"!==e.type?--o||f():s(e.text,e.lang,function(t,n){return t?f(t):null==n||n===e.text?--o||f():(e.text=n,e.escaped=!0,void(--o||f()))})}(i[c])}else try{return n&&(n=d({},h.defaults,n)),l.parse(t.lex(e,n),n)}catch(u){if(u.message+="\nPlease report this to https://github.com/chjj/marked.",(n||h.defaults).silent)return"<p>An error occured:</p><pre>"+a(u.message+"",!0)+"</pre>";throw u}}var f={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:u,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:u,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:u,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};f.bullet=/(?:[*+-]|\d+\.)/,f.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,f.item=c(f.item,"gm")(/bull/g,f.bullet)(),f.list=c(f.list)(/bull/g,f.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+f.def.source+")")(),f.blockquote=c(f.blockquote)("def",f.def)(),f._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",f.html=c(f.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,f._tag)(),f.paragraph=c(f.paragraph)("hr",f.hr)("heading",f.heading)("lheading",f.lheading)("blockquote",f.blockquote)("tag","<"+f._tag)("def",f.def)(),f.normal=d({},f),f.gfm=d({},f.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),f.gfm.paragraph=c(f.paragraph)("(?!","(?!"+f.gfm.fences.source.replace("\\1","\\2")+"|"+f.list.source.replace("\\1","\\3")+"|")(),f.tables=d({},f.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=f,t.lex=function(e,n){var r=new t(n);return r.lex(e)},t.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},t.prototype.token=function(e,t,n){for(var r,i,o,l,a,s,c,u,d,e=e.replace(/^ +$/gm,"");e;)if((o=this.rules.newline.exec(e))&&(e=e.substring(o[0].length),o[0].length>1&&this.tokens.push({type:"space"})),o=this.rules.code.exec(e))e=e.substring(o[0].length),o=o[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?o:o.replace(/\n+$/,"")});else if(o=this.rules.fences.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"code",lang:o[2],text:o[3]||""});else if(o=this.rules.heading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:o[1].length,text:o[2]});else if(t&&(o=this.rules.nptable.exec(e))){for(e=e.substring(o[0].length),s={type:"table",header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3].replace(/\n$/,"").split("\n")},u=0;u<s.align.length;u++)/^ *-+: *$/.test(s.align[u])?s.align[u]="right":/^ *:-+: *$/.test(s.align[u])?s.align[u]="center":/^ *:-+ *$/.test(s.align[u])?s.align[u]="left":s.align[u]=null;for(u=0;u<s.cells.length;u++)s.cells[u]=s.cells[u].split(/ *\| */);this.tokens.push(s)}else if(o=this.rules.lheading.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"heading",depth:"="===o[2]?1:2,text:o[1]});else if(o=this.rules.hr.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"hr"});else if(o=this.rules.blockquote.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"blockquote_start"}),o=o[0].replace(/^ *> ?/gm,""),this.token(o,t,!0),this.tokens.push({type:"blockquote_end"});else if(o=this.rules.list.exec(e)){for(e=e.substring(o[0].length),l=o[2],this.tokens.push({type:"list_start",ordered:l.length>1}),o=o[0].match(this.rules.item),r=!1,d=o.length,u=0;d>u;u++)s=o[u],c=s.length,s=s.replace(/^ *([*+-]|\d+\.) +/,""),~s.indexOf("\n ")&&(c-=s.length,s=this.options.pedantic?s.replace(/^ {1,4}/gm,""):s.replace(new RegExp("^ {1,"+c+"}","gm"),"")),this.options.smartLists&&u!==d-1&&(a=f.bullet.exec(o[u+1])[0],l===a||l.length>1&&a.length>1||(e=o.slice(u+1).join("\n")+e,u=d-1)),i=r||/\n\n(?!\s*$)/.test(s),u!==d-1&&(r="\n"===s.charAt(s.length-1),i||(i=r)),this.tokens.push({type:i?"loose_item_start":"list_item_start"}),this.token(s,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(o=this.rules.html.exec(e))e=e.substring(o[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===o[1]||"script"===o[1]||"style"===o[1]),text:o[0]});else if(!n&&t&&(o=this.rules.def.exec(e)))e=e.substring(o[0].length),this.tokens.links[o[1].toLowerCase()]={href:o[2],title:o[3]};else if(t&&(o=this.rules.table.exec(e))){for(e=e.substring(o[0].length),s={type:"table",header:o[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:o[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:o[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<s.align.length;u++)/^ *-+: *$/.test(s.align[u])?s.align[u]="right":/^ *:-+: *$/.test(s.align[u])?s.align[u]="center":/^ *:-+ *$/.test(s.align[u])?s.align[u]="left":s.align[u]=null;for(u=0;u<s.cells.length;u++)s.cells[u]=s.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(s)}else if(t&&(o=this.rules.paragraph.exec(e)))e=e.substring(o[0].length),this.tokens.push({type:"paragraph",text:"\n"===o[1].charAt(o[1].length-1)?o[1].slice(0,-1):o[1]});else if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.tokens.push({type:"text",text:o[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var p={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:u,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:u,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};p._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,p._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,p.link=c(p.link)("inside",p._inside)("href",p._href)(),p.reflink=c(p.reflink)("inside",p._inside)(),p.normal=d({},p),p.pedantic=d({},p.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),p.gfm=d({},p.normal,{escape:c(p.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:c(p.text)("]|","~]|")("|","|https?://|")()}),p.breaks=d({},p.gfm,{br:c(p.br)("{2,}","*")(),text:c(p.gfm.text)("{2,}","*")()}),i.rules=p,i.output=function(e,t,n){var r=new i(t,n);return r.output(e)},i.prototype.output=function(e){for(var t,n,r,i,o="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),o+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=":"===i[1].charAt(6)?this.mangle(i[1].substring(7)):this.mangle(i[1]),r=this.mangle("mailto:")+n):(n=a(i[1]),r=n),o+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),o+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):a(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,o+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){o+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),o+=this.renderer.strong(this.output(i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),o+=this.renderer.em(this.output(i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),o+=this.renderer.codespan(a(i[2],!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),o+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),o+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),o+=this.renderer.text(a(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(i[0].length),n=a(i[1]),r=n,o+=this.renderer.link(r,null,n);return o},i.prototype.outputLink=function(e,t){var n=a(t.href),r=t.title?a(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,a(e[1]))},i.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},i.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,i=0;r>i;i++)t=e.charCodeAt(i),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},o.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+a(t,!0)+'">'+(n?e:a(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:a(e,!0))+"\n</code></pre>"},o.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},o.prototype.html=function(e){return e},o.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},o.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},o.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},o.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},o.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},o.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},o.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},o.prototype.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},o.prototype.strong=function(e){return"<strong>"+e+"</strong>"},o.prototype.em=function(e){return"<em>"+e+"</em>"},o.prototype.codespan=function(e){return"<code>"+e+"</code>"},o.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},o.prototype.del=function(e){return"<del>"+e+"</del>"},o.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(s(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(i){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:"))return""}var o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+n+"</a>"},o.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},o.prototype.text=function(e){return e},l.parse=function(e,t,n){var r=new l(t,n);return r.parse(e)},l.prototype.parse=function(e){this.inline=new i(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},l.prototype.next=function(){return this.token=this.tokens.pop()},l.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},l.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},l.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,i,o="",l="";for(n="",e=0;e<this.token.header.length;e++)r={header:!0,align:this.token.align[e]},n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(o+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",i=0;i<t.length;i++)n+=this.renderer.tablecell(this.inline.output(t[i]),{header:!1,align:this.token.align[i]});l+=this.renderer.tablerow(n)}return this.renderer.table(o,l);case"blockquote_start":for(var l="";"blockquote_end"!==this.next().type;)l+=this.tok();return this.renderer.blockquote(l);case"list_start":for(var l="",a=this.token.ordered;"list_end"!==this.next().type;)l+=this.tok();return this.renderer.list(l,a);case"list_item_start":for(var l="";"list_item_end"!==this.next().type;)l+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(l);case"loose_item_start":for(var l="";"list_item_end"!==this.next().type;)l+=this.tok();return this.renderer.listitem(l);case"html":var s=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(s);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},u.exec=u,h.options=h.setOptions=function(e){return d(h.defaults,e),h},h.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new o,xhtml:!1},h.Parser=l,h.parser=l.parse,h.Renderer=o,h.Lexer=t,h.lexer=t.lex,h.InlineLexer=i,h.inlineLexer=i.output,h.parse=h,"undefined"!=typeof n&&"object"==typeof r?n.exports=h:"function"==typeof e&&e.amd?e(function(){return h}):this.marked=h}).call(function(){return this||("undefined"!=typeof window?window:t)}())}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],12:[function(e,t,n){var r=e("codemirror");r.commands.tabAndIndentMarkdownList=function(e){var t=e.listSelections(),n=t[0].head,r=e.getStateAfter(n.line),i=r.list!==!1;if(i)return void e.execCommand("indentMore");if(e.options.indentWithTabs)e.execCommand("insertTab");else{var o=Array(e.options.tabSize+1).join(" ");e.replaceSelection(o)}},r.commands.shiftTabAndUnindentMarkdownList=function(e){var t=e.listSelections(),n=t[0].head,r=e.getStateAfter(n.line),i=r.list!==!1;if(i)return void e.execCommand("indentLess");if(e.options.indentWithTabs)e.execCommand("insertTab");else{var o=Array(e.options.tabSize+1).join(" ");e.replaceSelection(o)}}},{codemirror:6}],13:[function(e,t,n){"use strict";function r(e){return e=F?e.replace("Ctrl","Cmd"):e.replace("Cmd","Ctrl")}function i(e,t){e=e||{};var n=document.createElement("a");return t=void 0==t?!0:t,e.title&&t&&(n.title=e.title,F&&(n.title=n.title.replace("Ctrl","⌘"),n.title=n.title.replace("Alt","⌥"))),n.tabIndex=-1,n.className=e.className,n}function o(){var e=document.createElement("i");return e.className="separator",e.innerHTML="|",e}function l(e,t){t=t||e.getCursor("start");var n=e.getTokenAt(t);if(!n.type)return{};for(var r,i,o=n.type.split(" "),l={},a=0;a<o.length;a++)r=o[a],"strong"===r?l.bold=!0:"variable-2"===r?(i=e.getLine(t.line),/^\s*\d+\.\s/.test(i)?l["ordered-list"]=!0:l["unordered-list"]=!0):"atom"===r?l.quote=!0:"em"===r?l.italic=!0:"quote"===r?l.quote=!0:"strikethrough"===r?l.strikethrough=!0:"comment"===r&&(l.code=!0);return l}function a(e){var t=e.codemirror;t.setOption("fullScreen",!t.getOption("fullScreen")),t.getOption("fullScreen")?(_=document.body.style.overflow,document.body.style.overflow="hidden"):document.body.style.overflow=_;var n=t.getWrapperElement();/fullscreen/.test(n.previousSibling.className)?n.previousSibling.className=n.previousSibling.className.replace(/\s*fullscreen\b/,""):n.previousSibling.className+=" fullscreen";var r=e.toolbarElements.fullscreen;/active/.test(r.className)?r.className=r.className.replace(/\s*active\s*/g,""):r.className+=" active";var i=t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(i.className)&&T(e)}function s(e){W(e,"bold",e.options.blockStyles.bold)}function c(e){W(e,"italic",e.options.blockStyles.italic)}function u(e){W(e,"strikethrough","~~")}function d(e){W(e,"code","```\r\n","\r\n```")}function h(e){var t=e.codemirror;O(t,"quote")}function f(e){var t=e.codemirror;A(t,"smaller")}function p(e){var t=e.codemirror;A(t,"bigger")}function m(e){var t=e.codemirror;A(t,void 0,1)}function g(e){var t=e.codemirror;A(t,void 0,2)}function v(e){var t=e.codemirror;A(t,void 0,3)}function y(e){var t=e.codemirror;O(t,"unordered-list")}function x(e){var t=e.codemirror;O(t,"ordered-list")}function b(e){var t=e.codemirror,n=l(t),r=e.options;N(t,n.link,r.insertTexts.link)}function w(e){var t=e.codemirror,n=l(t),r=e.options;N(t,n.image,r.insertTexts.image)}function k(e){var t=e.codemirror,n=l(t),r=e.options;N(t,n.table,r.insertTexts.table)}function C(e){var t=e.codemirror,n=l(t),r=e.options;N(t,n.image,r.insertTexts.horizontalRule)}function S(e){var t=e.codemirror;t.undo(),t.focus()}function L(e){var t=e.codemirror;t.redo(),t.focus()}function T(e){var t=e.codemirror,n=t.getWrapperElement(),r=n.nextSibling,i=e.toolbarElements["side-by-side"];/editor-preview-active-side/.test(r.className)?(r.className=r.className.replace(/\s*editor-preview-active-side\s*/g,""),i.className=i.className.replace(/\s*active\s*/g,""),n.className=n.className.replace(/\s*CodeMirror-sided\s*/g," ")):(setTimeout(function(){t.getOption("fullScreen")||a(e),r.className+=" editor-preview-active-side"},1),i.className+=" active",n.className+=" CodeMirror-sided");var o=n.lastChild;if(/editor-preview-active/.test(o.className)){o.className=o.className.replace(/\s*editor-preview-active\s*/g,"");var l=e.toolbarElements.preview,s=n.previousSibling;l.className=l.className.replace(/\s*active\s*/g,""),s.className=s.className.replace(/\s*disabled-for-preview*/g,"")}r.innerHTML=e.options.previewRender(e.value(),r),t.on("update",function(){r.innerHTML=e.options.previewRender(e.value(),r)})}function M(e){var t=e.codemirror,n=t.getWrapperElement(),r=n.previousSibling,i=e.toolbarElements.preview,o=n.lastChild;o&&/editor-preview/.test(o.className)||(o=document.createElement("div"),o.className="editor-preview",n.appendChild(o)),/editor-preview-active/.test(o.className)?(o.className=o.className.replace(/\s*editor-preview-active\s*/g,""),i.className=i.className.replace(/\s*active\s*/g,""),r.className=r.className.replace(/\s*disabled-for-preview*/g,"")):(setTimeout(function(){o.className+=" editor-preview-active"},1),i.className+=" active",r.className+=" disabled-for-preview"),o.innerHTML=e.options.previewRender(e.value(),o);var l=t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(l.className)&&T(e)}function N(e,t,n){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){var r,i=n[0],o=n[1],l=e.getCursor("start"),a=e.getCursor("end");t?(r=e.getLine(l.line),i=r.slice(0,l.ch),o=r.slice(l.ch),e.replaceRange(i+o,{line:l.line,ch:0})):(r=e.getSelection(),e.replaceSelection(i+r+o),l.ch+=i.length,l!==a&&(a.ch+=i.length)),e.setSelection(l,a),e.focus()}}function A(e,t,n){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var r=e.getCursor("start"),i=e.getCursor("end"),o=r.line;o<=i.line;o++)!function(r){var i=e.getLine(r),o=i.search(/[^#]/);i=void 0!==t?0>=o?"bigger"==t?"###### "+i:"# "+i:6==o&&"smaller"==t?i.substr(7):1==o&&"bigger"==t?i.substr(2):"bigger"==t?i.substr(1):"#"+i:1==n?0>=o?"# "+i:o==n?i.substr(o+1):"# "+i.substr(o+1):2==n?0>=o?"## "+i:o==n?i.substr(o+1):"## "+i.substr(o+1):0>=o?"### "+i:o==n?i.substr(o+1):"### "+i.substr(o+1),e.replaceRange(i,{line:r,ch:0},{line:r,ch:99999999999999})}(o);e.focus()}}function O(e,t){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var n=l(e),r=e.getCursor("start"),i=e.getCursor("end"),o={quote:/^(\s*)\>\s+/,"unordered-list":/^(\s*)(\*|\-|\+)\s+/,"ordered-list":/^(\s*)\d+\.\s+/},a={quote:"> ","unordered-list":"* ","ordered-list":"1. "},s=r.line;s<=i.line;s++)!function(r){var i=e.getLine(r);i=n[t]?i.replace(o[t],"$1"):a[t]+i,e.replaceRange(i,{line:r,ch:0},{line:r,ch:99999999999999})}(s);e.focus()}}function W(e,t,n,r){if(!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)){r="undefined"==typeof r?n:r;var i,o=e.codemirror,a=l(o),s=n,c=r,u=o.getCursor("start"),d=o.getCursor("end");a[t]?(i=o.getLine(u.line),s=i.slice(0,u.ch),c=i.slice(u.ch),"bold"==t?(s=s.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/,""),c=c.replace(/(\*\*|__)/,"")):"italic"==t?(s=s.replace(/(\*|_)(?![\s\S]*(\*|_))/,""),c=c.replace(/(\*|_)/,"")):"strikethrough"==t&&(s=s.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/,""),c=c.replace(/(\*\*|~~)/,"")),o.replaceRange(s+c,{line:u.line,ch:0},{line:u.line,ch:99999999999999}),"bold"==t||"strikethrough"==t?(u.ch-=2,u!==d&&(d.ch-=2)):"italic"==t&&(u.ch-=1,u!==d&&(d.ch-=1))):(i=o.getSelection(),"bold"==t?(i=i.split("**").join(""),i=i.split("__").join("")):"italic"==t?(i=i.split("*").join(""),i=i.split("_").join("")):"strikethrough"==t&&(i=i.split("~~").join("")),o.replaceSelection(s+i+c),u.ch+=n.length,d.ch=u.ch+i.length),o.setSelection(u,d),o.focus()}}function H(e,t){for(var n in t)t.hasOwnProperty(n)&&(t[n]instanceof Array?e[n]=t[n].concat(e[n]instanceof Array?e[n]:[]):null!==t[n]&&"object"==typeof t[n]&&t[n].constructor===Object?e[n]=H(e[n]||{},t[n]):e[n]=t[n]);return e}function D(e){for(var t=1;t<arguments.length;t++)e=H(e,arguments[t]);return e}function E(e){var t=/[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,n=e.match(t),r=0;if(null===n)return r;for(var i=0;i<n.length;i++)r+=n[i].charCodeAt(0)>=19968?n[i].length:1;return r}function I(e){e=e||{},e.parent=this;var t=!0;if(e.autoDownloadFontAwesome===!1&&(t=!1),e.autoDownloadFontAwesome!==!0)for(var n=document.styleSheets,r=0;r<n.length;r++)n[r].href&&n[r].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/")>-1&&(t=!1);if(t){var i=document.createElement("link");i.rel="stylesheet",i.href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css",document.getElementsByTagName("head")[0].appendChild(i)}if(e.element)this.element=e.element;else if(null===e.element)return void console.log("SimpleMDE: Error. No element was found.");if(void 0===e.toolbar){e.toolbar=[];for(var o in j)j.hasOwnProperty(o)&&(-1!=o.indexOf("separator-")&&e.toolbar.push("|"),(j[o]["default"]===!0||e.showIcons&&e.showIcons.constructor===Array&&-1!=e.showIcons.indexOf(o))&&e.toolbar.push(o))}e.hasOwnProperty("status")||(e.status=["autosave","lines","words","cursor"]),e.previewRender||(e.previewRender=function(e){return this.parent.markdown(e)}),e.parsingConfig=e.parsingConfig||{},e.insertTexts=D({},q,e.insertTexts||{}),e.blockStyles=D({},G,e.blockStyles||{}),void 0!=e.autosave&&void 0!=e.autosave.unique_id&&""!=e.autosave.unique_id&&(e.autosave.uniqueId=e.autosave.unique_id),this.options=e,this.render(),!e.initialValue||this.options.autosave&&this.options.autosave.foundSavedValue===!0||this.value(e.initialValue)}var P=e("codemirror");e("codemirror/addon/edit/continuelist.js"),e("./codemirror/tablist"),e("codemirror/addon/display/fullscreen.js"),e("codemirror/mode/markdown/markdown.js"),e("codemirror/addon/mode/overlay.js"),e("codemirror/mode/gfm/gfm.js"),e("codemirror/mode/xml/xml.js"),e("spell-checker");var z=e("marked"),F=/Mac/.test(navigator.platform),R={"Cmd-B":s,"Cmd-I":c,"Cmd-K":b,"Cmd-H":f,"Shift-Cmd-H":p,"Cmd-Alt-I":w,"Cmd-'":h,"Cmd-Alt-L":x,"Cmd-L":y,"Cmd-Alt-C":d,"Cmd-P":M},B=function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e},_="",j={bold:{name:"bold",action:s,className:"fa fa-bold",title:"Bold (Ctrl+B)","default":!0},italic:{name:"italic",action:c,className:"fa fa-italic",title:"Italic (Ctrl+I)","default":!0},strikethrough:{name:"strikethrough",action:u,className:"fa fa-strikethrough",title:"Strikethrough"},heading:{name:"heading",action:f,className:"fa fa-header",title:"Heading (Ctrl+H)","default":!0},"heading-smaller":{name:"heading-smaller",action:f,className:"fa fa-header fa-header-x fa-header-smaller",title:"Smaller Heading (Ctrl+H)"},"heading-bigger":{name:"heading-bigger",action:p,className:"fa fa-header fa-header-x fa-header-bigger",title:"Bigger Heading (Shift+Ctrl+H)"},"heading-1":{name:"heading-1",action:m,className:"fa fa-header fa-header-x fa-header-1",title:"Big Heading"},"heading-2":{name:"heading-2",action:g,className:"fa fa-header fa-header-x fa-header-2",title:"Medium Heading"},"heading-3":{name:"heading-3",action:v,className:"fa fa-header fa-header-x fa-header-3",title:"Small Heading"},"separator-1":{name:"separator-1"},code:{name:"code",action:d,className:"fa fa-code",title:"Code (Ctrl+Alt+C)"},quote:{name:"quote",action:h,className:"fa fa-quote-left",title:"Quote (Ctrl+')","default":!0},"unordered-list":{name:"unordered-list",action:y,
className:"fa fa-list-ul",title:"Generic List (Ctrl+L)","default":!0},"ordered-list":{name:"ordered-list",action:x,className:"fa fa-list-ol",title:"Numbered List (Ctrl+Alt+L)","default":!0},"separator-2":{name:"separator-2"},link:{name:"link",action:b,className:"fa fa-link",title:"Create Link (Ctrl+K)","default":!0},image:{name:"image",action:w,className:"fa fa-picture-o",title:"Insert Image (Ctrl+Alt+I)","default":!0},table:{name:"table",action:k,className:"fa fa-table",title:"Insert Table"},"horizontal-rule":{name:"horizontal-rule",action:C,className:"fa fa-minus",title:"Insert Horizontal Line"},"separator-3":{name:"separator-3"},preview:{name:"preview",action:M,className:"fa fa-eye no-disable",title:"Toggle Preview (Ctrl+P)","default":!0},"side-by-side":{name:"side-by-side",action:T,className:"fa fa-columns no-disable no-mobile",title:"Toggle Side by Side (F9)","default":!0},fullscreen:{name:"fullscreen",action:a,className:"fa fa-arrows-alt no-disable no-mobile",title:"Toggle Fullscreen (F11)","default":!0},guide:{name:"guide",action:"http://nextstepwebs.github.io/simplemde-markdown-editor/markdown-guide",className:"fa fa-question-circle",title:"Markdown Guide","default":!0}},q={link:["[","](http://)"],image:["![](http://",")"],table:["","\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],horizontalRule:["","\n\n-----\n\n"]},G={bold:"**",italic:"*"};I.prototype.markdown=function(e){if(z){var t={};return this.options&&this.options.renderingConfig&&this.options.renderingConfig.singleLineBreaks!==!1&&(t.breaks=!0),this.options&&this.options.renderingConfig&&this.options.renderingConfig.codeSyntaxHighlighting===!0&&window.hljs&&(t.highlight=function(e){return window.hljs.highlightAuto(e).value}),z.setOptions(t),z(e)}},I.prototype.render=function(e){if(e||(e=this.element||document.getElementsByTagName("textarea")[0]),!this._rendered||this._rendered!==e){this.element=e;var t=this.options,n=this,i={};for(var o in R)!function(e){i[r(e)]=function(){R[e](n)}}(o);i.Enter="newlineAndIndentContinueMarkdownList",i.Tab="tabAndIndentMarkdownList",i["Shift-Tab"]="shiftTabAndUnindentMarkdownList",i.F11=function(){a(n)},i.F9=function(){T(n)},i.Esc=function(e){e.getOption("fullScreen")&&a(n)},document.addEventListener("keydown",function(e){e=e||window.event,27==e.keyCode&&n.codemirror.getOption("fullScreen")&&a(n)},!1);var l,s;t.spellChecker!==!1?(l="spell-checker",s=t.parsingConfig,s.name="gfm",s.gitHubSpice=!1):(l=t.parsingConfig,l.name="gfm",l.gitHubSpice=!1),this.codemirror=P.fromTextArea(e,{mode:l,backdrop:s,theme:"paper",tabSize:void 0!=t.tabSize?t.tabSize:2,indentUnit:void 0!=t.tabSize?t.tabSize:2,indentWithTabs:t.indentWithTabs===!1?!1:!0,lineNumbers:!1,autofocus:t.autofocus===!0?!0:!1,extraKeys:i,lineWrapping:t.lineWrapping===!1?!1:!0,allowDropFileTypes:["text/plain"]}),t.toolbar!==!1&&this.createToolbar(),t.status!==!1&&this.createStatusbar(),void 0!=t.autosave&&t.autosave.enabled===!0&&this.autosave(),this.createSideBySide(),this._rendered=this.element}},I.prototype.autosave=function(){if(localStorage){var e=this;if(void 0==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");null!=e.element.form&&void 0!=e.element.form&&e.element.form.addEventListener("submit",function(){localStorage.removeItem("smde_"+e.options.autosave.uniqueId)}),this.options.autosave.loaded!==!0&&("string"==typeof localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&""!=localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&(this.codemirror.setValue(localStorage.getItem("smde_"+this.options.autosave.uniqueId)),this.options.autosave.foundSavedValue=!0),this.options.autosave.loaded=!0),localStorage.setItem("smde_"+this.options.autosave.uniqueId,e.value());var t=document.getElementById("autosaved");if(null!=t&&void 0!=t&&""!=t){var n=new Date,r=n.getHours(),i=n.getMinutes(),o="am",l=r;l>=12&&(l=r-12,o="pm"),0==l&&(l=12),i=10>i?"0"+i:i,t.innerHTML="Autosaved: "+l+":"+i+" "+o}setTimeout(function(){e.autosave()},this.options.autosave.delay||1e4)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},I.prototype.clearAutosavedValue=function(){if(localStorage){if(void 0==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");localStorage.removeItem("smde_"+this.options.autosave.uniqueId)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},I.prototype.createSideBySide=function(){var e=this.codemirror,t=e.getWrapperElement(),n=t.nextSibling;n&&/editor-preview-side/.test(n.className)||(n=document.createElement("div"),n.className="editor-preview-side",t.parentNode.insertBefore(n,t.nextSibling));var r=!1,i=!1;return e.on("scroll",function(e){if(r)return void(r=!1);i=!0;var t=e.getScrollInfo().height-e.getScrollInfo().clientHeight,o=parseFloat(e.getScrollInfo().top)/t,l=(n.scrollHeight-n.clientHeight)*o;n.scrollTop=l}),n.onscroll=function(){if(i)return void(i=!1);r=!0;var t=n.scrollHeight-n.clientHeight,o=parseFloat(n.scrollTop)/t,l=(e.getScrollInfo().height-e.getScrollInfo().clientHeight)*o;e.scrollTo(0,l)},!0},I.prototype.createToolbar=function(e){if(e=e||this.options.toolbar,e&&0!==e.length){var t;for(t=0;t<e.length;t++)void 0!=j[e[t]]&&(e[t]=j[e[t]]);var n=document.createElement("div");n.className="editor-toolbar";var r=this,a={};for(r.toolbar=e,t=0;t<e.length;t++)("guide"!=e[t].name||r.options.toolbarGuideIcon!==!1)&&(r.options.hideIcons&&-1!=r.options.hideIcons.indexOf(e[t].name)||("fullscreen"!=e[t].name&&"side-by-side"!=e[t].name||!B())&&!function(e){var t;t="|"===e?o():i(e,r.options.toolbarTips),e.action&&("function"==typeof e.action?t.onclick=function(){e.action(r)}:"string"==typeof e.action&&(t.href=e.action,t.target="_blank")),a[e.name||e]=t,n.appendChild(t)}(e[t]));r.toolbarElements=a;var s=this.codemirror;s.on("cursorActivity",function(){var e=l(s);for(var t in a)!function(t){var n=a[t];e[t]?n.className+=" active":"fullscreen"!=t&&"side-by-side"!=t&&(n.className=n.className.replace(/\s*active\s*/g,""))}(t)});var c=s.getWrapperElement();return c.parentNode.insertBefore(n,c),n}},I.prototype.createStatusbar=function(e){e=e||this.options.status;var t=this.options;if(e&&0!==e.length){var n=document.createElement("div");n.className="editor-statusbar";for(var r,i=this.codemirror,o=0;o<e.length;o++)!function(e){var o=document.createElement("span");o.className=e,"words"===e?(o.innerHTML="0",i.on("update",function(){o.innerHTML=E(i.getValue())})):"lines"===e?(o.innerHTML="0",i.on("update",function(){o.innerHTML=i.lineCount()})):"cursor"===e?(o.innerHTML="0:0",i.on("cursorActivity",function(){r=i.getCursor(),o.innerHTML=r.line+":"+r.ch})):"autosave"===e&&void 0!=t.autosave&&t.autosave.enabled===!0&&o.setAttribute("id","autosaved"),n.appendChild(o)}(e[o]);var l=this.codemirror.getWrapperElement();return l.parentNode.insertBefore(n,l.nextSibling),n}},I.prototype.value=function(e){return void 0===e?this.codemirror.getValue():(this.codemirror.getDoc().setValue(e),this)},I.toggleBold=s,I.toggleItalic=c,I.toggleStrikethrough=u,I.toggleBlockquote=h,I.toggleHeadingSmaller=f,I.toggleHeadingBigger=p,I.toggleHeading1=m,I.toggleHeading2=g,I.toggleHeading3=v,I.toggleCodeBlock=d,I.toggleUnorderedList=y,I.toggleOrderedList=x,I.drawLink=b,I.drawImage=w,I.drawTable=k,I.drawHorizontalRule=C,I.undo=S,I.redo=L,I.togglePreview=M,I.toggleSideBySide=T,I.toggleFullScreen=a,I.prototype.toggleBold=function(){s(this)},I.prototype.toggleItalic=function(){c(this)},I.prototype.toggleStrikethrough=function(){u(this)},I.prototype.toggleBlockquote=function(){h(this)},I.prototype.toggleHeadingSmaller=function(){f(this)},I.prototype.toggleHeadingBigger=function(){p(this)},I.prototype.toggleHeading1=function(){m(this)},I.prototype.toggleHeading2=function(){g(this)},I.prototype.toggleHeading3=function(){v(this)},I.prototype.toggleCodeBlock=function(){d(this)},I.prototype.toggleUnorderedList=function(){y(this)},I.prototype.toggleOrderedList=function(){x(this)},I.prototype.drawLink=function(){b(this)},I.prototype.drawImage=function(){w(this)},I.prototype.drawTable=function(){k(this)},I.prototype.drawHorizontalRule=function(){C(this)},I.prototype.undo=function(){S(this)},I.prototype.redo=function(){L(this)},I.prototype.togglePreview=function(){M(this)},I.prototype.toggleSideBySide=function(){T(this)},I.prototype.toggleFullScreen=function(){a(this)},I.prototype.isPreviewActive=function(){var e=this.codemirror,t=e.getWrapperElement(),n=t.lastChild;return/editor-preview-active/.test(n.className)},I.prototype.isSideBySideActive=function(){var e=this.codemirror,t=e.getWrapperElement(),n=t.nextSibling;return/editor-preview-active-side/.test(n.className)},I.prototype.isFullscreenActive=function(){var e=this.codemirror;return e.getOption("fullScreen")},t.exports=I},{"./codemirror/tablist":12,codemirror:6,"codemirror/addon/display/fullscreen.js":3,"codemirror/addon/edit/continuelist.js":4,"codemirror/addon/mode/overlay.js":5,"codemirror/mode/gfm/gfm.js":7,"codemirror/mode/markdown/markdown.js":8,"codemirror/mode/xml/xml.js":10,marked:11,"spell-checker":1}]},{},[13])(13)});
;/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());
;var wysiwyg;
var editor = {
  init: function() {
    //var contentwysiwyg = wysiwyg(document.querySelector('#editContent'));
    wysiwyg = new SimpleMDE({
      element: document.getElementById("editContent"),
      toolbar: false,
      spellChecker: false,
      status: false,
    });
    wysiwyg.codemirror.on( "change", function() {
      view.updateContent( wysiwyg.value() );
      console.log( wysiwyg.value() );
    });
    editor.loadMenu();
    editor.setupToggle();
  },
  //posts: get_posts(),
  loadMenu: function(){
    editor.clearMenus();
    editor.showCurrentMenu();
  },
  showCurrentMenu: function() {

    var urlSegments = getAfterHash();
    var currentMenu;

    //if url #edit/
    if( urlSegments[0] == "edit" && urlSegments.length == 1  ) {
      currentMenu = "primary";
      this.showPrimaryMenu();
    }
    //if url #edit/secondary
    else if( urlSegments[0] == "edit" && urlSegments.length == 2 ) {
      currentMenu = "secondary";
      this.showSecondaryMenu();
    }
    //if editing content
    else {//( urlSegments[0] == "edit" && urlSegments.length == 3 ) {
      currentMenu = "edit";
      this.showEditPanel(urlSegments[2], urlSegments[1]);
    }

    var queryCurrentNav = "#editor nav." + currentMenu;
    var currentNav = document.querySelector(queryCurrentNav);
    currentNav.classList.add("active");

    // var currentUl = document.querySelector(queryStr + " ul");
    // var currentLinks = currentUl.getElementsByTagName("a");
    // for (var i = 0; i < currentLinks.length; i++) {
    //   currentLinks[i].addEventListener("click", refreshMenu(), false);
    // }

  },
  showPrimaryMenu: function(){

  },
  showSecondaryMenu: function(){
    this.updateMenuTitle();
    //figure out what secondary navigation we're loading
    var currentSecondaryMenu = getAfterHash()[1];
    var menuItems = getContent(currentSecondaryMenu);
    addMenuItems(menuItems, currentSecondaryMenu);
  },
  showEditPanel: function(slug, contentType){
    this.updateMenuTitle();
    var itt;
    var post = getContentBySlug(slug, contentType);
    if( contentType == "posts" || contentType == "pages" ) {
        this.fillEditForm(post);
    }
  },
  fillEditForm: function(post) {
    editor.clearEditForm();
    var editTitle = document.getElementById("editTitle");
    editTitle.value = post.title;
    //console.log(wysiwyg.value());
    wysiwyg.value( markdown.toHTML(post.content) );
    //editContent.value = post.content;
  },
  clearEditForm: function() {
    editTitle.value = "";
    editContent.value = "";
  },
  clearMenus: function(){
    var editorEl = getEditorEl();
    //remove active class from all navs
    var navs = editorEl.getElementsByTagName("nav");
    for (var j = 0; j < navs.length; j++) {
      var nav = navs[j];
      nav.classList.remove("active");
    }
    //remove all children from #editor nav.secondary ul
    var navUl = document.querySelector("#editor nav.secondary ul");
    while(navUl.firstChild) navUl.removeChild(navUl.firstChild);

    var navlinks = navUl.getElementsByTagName("a");
    for (var i = 0; i < navlinks.length; i++) {
      editorLinks[i].removeEventListener("click", refreshMenu, false);
    }
  },
  setupToggle: function() {
    var editorToggleEl = document.querySelector("#editorToggle a");
    editorToggleEl.addEventListener("click", editor.toggleView, false);
  },
  toggleView: function() {
    var editorEl = getEditorEl();
    editorEl.classList.toggle("hidden");
    var toggleBtn = document.querySelector("#editorToggle");
    toggleBtn.classList.toggle("hidden");
    if( toggleBtn.classList.contains("hidden") === false ) {
      var viewContent = getCurrentContentObj();
      editor.fillEditForm(viewContent);
    }
  },
  updateMenuTitle: function() {
    var title = null,
        titleEl,
        urlSegments = getAfterHash();
    if(urlSegments.length == 2 && urlSegments[0] == "edit") {
      title = urlSegments[urlSegments.length-1];
      titleEl = document.querySelector("#editor nav.secondary h3 span");
    }
    if(urlSegments.length == 3 && urlSegments[0] == "edit") {
      title = urlSegments[urlSegments.length-2];
      titleEl = document.querySelector("#editor nav.edit h3 span a");
      titleEl.href = "#edit/" + title;
      //titleEl.addEventListener("click", refreshMenu, false);
    }

    var homeLink = document.querySelector("#editor nav.edit h3 .go-home");
    //if( homeLink ) addEventListener("click", refreshMenu, false);

    //titleEl.textContent = title;
  }
};
;var view = {
  init: function() {
    var viewContent = getCurrentContentObj();
    view.updateTitle( viewContent.title );
    view.updateContent( viewContent.content );

  },
  update: function() {
    var newPageSlugs = getAfterHash(this.href);
    var viewContent;
    if( newPageSlugs.length > 1 ) {
      viewContent = getContentBySlug(newPageSlugs[1], 'posts');
    } else {
      if( newPageSlugs[0] === "") newPageSlugs[0] = "home";
      viewContent = getContentBySlug(newPageSlugs[0], 'pages');
    }

    view.updateTitle( viewContent.title );
    view.updateContent( viewContent.content );
  },
  updateTitle: function(title) {
    var titleEl = document.getElementById("pageTitle");
    titleEl.innerHTML = title;
  },
  updateContent: function(content) {
    var contentEl = document.getElementById("pageContent");
    contentEl.innerHTML = markdown.toHTML( content );
  }
};
;var vanillaPress = {
  init: function() {
    router.init();
    view.init();
    editor.init();    
  }
};
vanillaPress.init();
