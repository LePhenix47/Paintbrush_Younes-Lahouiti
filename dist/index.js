(()=>{"use strict";(()=>{class t{constructor(){}static set(t,e,...r){return this.id=setInterval((()=>{e(...r)}),t),this.arrayOfIds.push(this.id),this.id}static clear(t){const e=this.arrayOfIds.find((e=>e===t));clearInterval(e),this.arrayOfIds=this.arrayOfIds.filter((t=>t!==e))}}t.arrayOfIds=[];const{log:e,error:r,table:o,time:n,timeEnd:s,timeStamp:a,timeLog:c,assert:i,clear:u,count:l,countReset:d,group:f,groupCollapsed:p,groupEnd:m,trace:h,profile:g,profileEnd:w,warn:v,debug:y,info:b,dir:_,dirxml:C}=console;function E(t,e){var r;if(!e)return Array.from(document.getElementsByClassName(t));return(null===(r=null==e?void 0:e.tagName)||void 0===r?void 0:r.includes("-"))?Array.from(e.shadowRoot.getElementsByClassName(t)):Array.from(e.getElementsByClassName(t))}function k(t,e){var r;if(!e)return document.querySelector(t);return(null===(r=null==e?void 0:e.tagName)||void 0===r?void 0:r.includes("-"))?e.shadowRoot.querySelector(t):e.querySelector(t)}function S(t){return t.parentElement}function A(t,e){switch(e.toLowerCase().trim()){case"lowercase":return t.toLowerCase();case"uppercase":return t.toUpperCase();case"titlecase":{let e=t.split(" ");for(let t=0;t<e.length;t++){const r=e[t].substring(0,1).toUpperCase(),o=e[t].slice(1).toLowerCase();e[t]=r+o}return e=e.concat(),e.toString()}case"titlecase2":return t.substring(0,1).toUpperCase()+t.substring(1).toLowerCase();default:throw new Error("Formatting text error: unknown option passed in argument")}}const L={tool:"brush",fill:"#000000",stroke:"transparent",strokeWidth:0,size:5,isDrawing:!1,hasShadow:!1,shadow:"#000000",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,hasShape:!1,shape:"none",sides:3,innerRadius:1,globalCompositeOperation:"source-over"},N=(k("canvas.index__canvas"),k(".tools"));k(".colors"),k(".controls"),k(".shapes"),k(".miscellaneous");function x(t){const r=t.currentTarget;L.tool=r.id,e(L)}!function(){const t=E("tools__input",N);for(const e of t)e.addEventListener("change",x)}(),function(){const t=(e=".color__input--checkbox:not(input#fill-show, input#stroke-show)",r?r.tagName.includes("-")?Array.from(r.shadowRoot.querySelectorAll(e)):Array.from(r.querySelectorAll(e)):Array.from(document.querySelectorAll(e)));var e,r;o(t);for(const e of t);}(),function(){const t=E("controls__input--checkbox"),e=E("input--color"),r=E("controls__input--range");for(const e of t)e.addEventListener("change",I);for(const t of r)t.addEventListener("input",R);for(const t of e)t.addEventListener("input",B)}();const O={size:{id:0,direction:"forwards"},rotation:{id:0,direction:"forwards"}};function I(e){const r=e.currentTarget,o=r.name;r.checked?O[o].id=t.set(10,q,r):t.clear(O[o].id)}function q(t){const e=t.name,r=(o=".controls__brush-container",t.closest(o));var o;const n=k(".controls__input--range",r),s=Number(n.value),a=Number(n.max),c=Number(n.min);s>=a&&(O[e].direction="backwards");s<=c&&(O[e].direction="forwards");const i="forwards"===O[e].direction;n.value=i?s+1:s-1;T(r,`${n.value}`)}function R(t){const e=t.currentTarget,r=e.value;T(S(e),r)}function B(t){const r=t.currentTarget,o=A(r.value,"uppercase"),n=S(r);T(n,o);const s=k("div",S(n));e(s);const a=r.id,c=function(t){const e=k("input[type=checkbox]",t);return!e.checked}(s);L[a]=c?"transparent":o,e(L)}function T(t,e){k("span",t).textContent=e}})()})();