(function(e){var t={};function n(r){if(t[r]){return t[r].exports}var o=t[r]={i:r,l:false,exports:{}};e[r].call(o.exports,o,o.exports,n);o.l=true;return o.exports}n.m=e;n.c=t;n.d=function(e,t,r){if(!n.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:r})}};n.r=function(e){Object.defineProperty(e,"__esModule",{value:true})};n.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};n.d(t,"a",t);return t};n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};n.p=".";return n(n.s=0)})({"./src/fullHeight.js":function(e,t,n){"use strict";(function(){if(typeof window.vceResetFullHeightRows!=="undefined"){return}var e=undefined;function t(){e=Array.prototype.slice.call(document.querySelectorAll(".vce-row-full-height"));if(e.length){r()}}function n(e,t){var n;["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(e){if(typeof document.body[e]==="function"){n=e;return true}return false});var r;while(e){r=e.parentElement;if(r&&r[n](t)){return r}e=r}return null}function r(){if(!e.length){return}e.forEach(function(e){var t=window.innerHeight;var r=e.getBoundingClientRect().top+window.pageYOffset;var o=n(e,".vce-row-container");var i=o.previousElementSibling&&o.previousElementSibling.classList.contains("vce-row-container");if(r<t&&!i){var u=100-r/(t/100);if(u>100){u=100}e.style.minHeight=u+"vh"}else{e.style.minHeight=""}})}t();window.addEventListener("resize",r);window.vceResetFullHeightRows=t;window.vcv.on("ready",function(){window.vceResetFullHeightRows&&window.vceResetFullHeightRows()})})()},0:function(e,t,n){e.exports=n("./src/fullHeight.js")}});