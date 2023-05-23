(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};(()=>{e.d({},{a:()=>oe});class t{constructor(){}static set(e,t,...n){return this.id=setInterval((()=>{t(...n)}),e),this.arrayOfIds.push(this.id),this.id}static clear(e){const t=this.arrayOfIds.find((t=>t===e));clearInterval(t),this.arrayOfIds=this.arrayOfIds.filter((e=>e!==t))}}t.arrayOfIds=[];const{log:n,error:r,table:o,time:s,timeEnd:a,timeStamp:i,timeLog:u,assert:c,clear:l,count:d,countReset:h,group:f,groupCollapsed:p,groupEnd:m,trace:b,profile:g,profileEnd:v,warn:w,debug:N,info:_,dir:y,dirxml:A}=console;function E(e){return Number(`0x${e}`)}function I(e){return e.toString(16)}function S(e,t){switch(t.toLowerCase().trim()){case"lowercase":return e.toLowerCase();case"uppercase":return e.toUpperCase();case"titlecase":{let t=e.split(" ");for(let e=0;e<t.length;e++){const n=t[e].substring(0,1).toUpperCase(),r=t[e].slice(1).toLowerCase();t[e]=n+r}return t=t.concat(),t.toString()}case"titlecase2":return e.substring(0,1).toUpperCase()+e.substring(1).toLowerCase();default:throw new Error("Formatting text error: unknown option passed in argument")}}function x(e,t){return e.split(t)}function L(e,t,n){return e.substring(t,n)}function k(e){let t=x(e,"-");for(let e=1;e<t.length;e++)t[e]=S(t[e],"titlecase");const n=t.join();return r=",",o="",n.replaceAll(r,o);var r,o}function C(e){if((null==e?void 0:e.length)<6||(null==e?void 0:e.length)>7)throw`Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ${e.length}`;let t=e;var n,r;"#"===e.charAt(0)&&(n=1,t=e.slice(n,r));let o=[L(t,0,2),L(t,2,4),L(t,4,6)];for(let e=0;e<o.length;e++){let t=o[e];o[e]=E(t)}return{red:Number(o[0]),green:Number(o[1]),blue:Number(o[2])}}function M(e,t,n){const r=e/255,o=t/255,s=n/255,a=Math.max(r,o,s),i=Math.min(r,o,s),u=a-i,c=(a+i)/2;let l,d;if(a===i)d=0,l=0;else switch(l=c>.5?u/(2-a-i):u/(a+i),a){case r:d=((o-s)/u+(o<s?6:0))/6;break;case o:d=((s-r)/u+2)/6;break;case s:d=((r-o)/u+4)/6}return{hue:Math.round(360*d),saturation:Math.round(100*l),lightness:Math.round(100*c)}}function T(e,t=100,n=50){if(e<0||e>360||t<0||t>100||n<0||n>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const r=e/360,o=t/100,s=n/100,a=(1-Math.abs(2*s-1))*o,i=6*r,u=a*(1-Math.abs(i%2-1));let c,l,d;[c,l,d]=i>=0&&i<1?[a,u,0]:i>=1&&i<2?[u,a,0]:i>=2&&i<3?[0,a,u]:i>=3&&i<4?[0,u,a]:i>=4&&i<5?[u,0,a]:[a,0,u];const h=s-a/2,f=Math.round(255*(c+h)),p=Math.round(255*(l+h)),m=Math.round(255*(d+h));return`#${I(f).padStart(2,"0")}${I(p).padStart(2,"0")}${I(m).padStart(2,"0")}`}function O(e,t,n){let r;t=t.toLowerCase(),n=n.toLowerCase();const o=t.includes("hex")&&n.includes("rgb"),s=t.includes("rgb")&&n.includes("hsl"),a=t.includes("hsl")&&n.includes("hex"),i=t.includes("hsl")&&n.includes("hwb"),u=t.includes("hsl")&&n.includes("rgb"),c=t.includes("rgb")&&n.includes("hex"),l=t.includes("hex")&&n.includes("hsl");if(o)r=C(e);else if(s)r=M(e.red,e.green,e.blue);else if(a)r=T(e.hue,e.saturation,e.lightness);else if(i)r=function(e,t=100,n=50){if(e<0||e>360||t<0||t>100||n<0||n>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const r=t/100,o=n/100,s=e/360,a=1-Math.max(r,o),i=1-Math.min(r,o);return{hue:Math.round(360*s),whiteness:Math.round(100*a),blackness:Math.round(100*i)}}(e.hue,e.saturation,e.lightness);else if(u){r=C(T(e.hue,e.saturation,e.lightness))}else if(c){const t=M(e.red,e.green,e.blue);r=T(t.hue,t.saturation,t.lightness)}else{if(!l)throw new Error("Color model conversion error: Unsupported color model conversion");{const t=C(e);r=M(t.red,t.green,t.blue)}}return r}function R(e,t){var n;if(!t)return Array.from(document.getElementsByClassName(e));return(null===(n=null==t?void 0:t.tagName)||void 0===n?void 0:n.includes("-"))?Array.from(t.shadowRoot.getElementsByClassName(e)):Array.from(t.getElementsByClassName(e))}function q(e,t){var n;if(!t)return document.querySelector(e);return(null===(n=null==t?void 0:t.tagName)||void 0===n?void 0:n.includes("-"))?t.shadowRoot.querySelector(e):t.querySelector(e)}function $(e){return e.parentElement}function U(e,t){return e.closest(t)}function B(e,t){return t.getAttribute(e)}function F(e,t,n){e.removeAttribute(t),e.setAttribute(n,"")}function H(e){F(e,"disabled","enabled")}function P(e){F(e,"enabled","disabled")}const Y={fill:{animationId:0,hue:0,saturation:0,lightness:0,type:"fill"},stroke:{animationId:0,hue:0,saturation:0,lightness:0,type:"stroke"}};function j(e){const r=e.currentTarget,o=U(r,".colors__container"),s=q(".colors__input",o),a=s.value,i=s.id;n(o);const{hue:u,saturation:c,lightness:l}=O(a,"hex","hsl");if(ne(o)||(0===c||0===l||100===l))return;Y[i].type=i,Y[i].hue=u,Y[i].saturation=c,Y[i].lightness=l;r.checked?Y[i].animationId=t.set(50,V,s,Y[i]):t.clear(Y[i].animationId)}function V(e,t){t.hue+=2,t.hue%=360;let r=O(t,"hsl","hex");r=S(r,"uppercase");const o=$(e);e.value=r,re(o,r),oe[t.type]=r,n(oe)}function z(e){const t=e.currentTarget.value;oe.globalCompositeOperation=t,n(oe)}function D(e){const t=e.currentTarget;oe.tool=t.id,n(oe)}function G(e){const t=e.currentTarget,r=x(t.id,"-")[0];oe.shape=r;const o="polygon"!==r&&"star"!==r;oe.hasEditableShape=!o;const s=U(t,"fieldset"),a=q("input#shape-sides-amount",s),i=q("input#shape-star-inner-radius",s);!0===oe.hasEditableShape?H(a):P(a);"star"===r?H(i):P(i),n(oe)}function W(e){const t=e.currentTarget;if(isNaN(t.valueAsNumber))return;J(t,0,Number.POSITIVE_INFINITY);const r=k(B("for",$(t)));oe[r]=t.valueAsNumber,n(oe)}function X(e){const t=e.currentTarget;if(isNaN(t.valueAsNumber))return;J(t,Number(t.min),Number(t.max));const r=k(B("for",$(t)));switch(r){case"shapeSidesAmount":oe.sides=t.valueAsNumber;break;case"shapeStarInnerRadius":oe.innerRadius=t.valueAsNumber}n(r),n(oe)}function J(e,t=Number.NEGATIVE_INFINITY,n=Number.POSITIVE_INFINITY){const r=e.valueAsNumber;r>n&&(e.valueAsNumber=n);r<t&&(e.valueAsNumber=t)}const K={size:{id:0,direction:"forwards"},rotation:{id:0,direction:"forwards"}};function Q(e){const n=e.currentTarget,r=n.name;n.checked?K[r].id=t.set(10,Z,n):t.clear(K[r].id)}function Z(e){const t=e.name,n=U(e,".controls__brush-container"),r=q(".controls__input--range",n),o=r.valueAsNumber,s=Number(r.max),a=Number(r.min);o>=s&&(K[t].direction="backwards");o<=a&&(K[t].direction="forwards");const i="forwards"===K[t].direction;r.valueAsNumber=i?o+1:o-1;const u=`${r.valueAsNumber}`,c=r.name;oe[c]=r.valueAsNumber,re(n,u)}function ee(e){const t=e.currentTarget,r=t.valueAsNumber,o=$(t),s=t.name;oe[s]=r,n(oe),re(o,r)}function te(e){const t=e.currentTarget,r=S(t.value,"uppercase"),o=$(t);re(o,r);const s=q("div",$(o));n(s);const a=t.id,i=ne(s);oe[a]=i?"transparent":r,n(oe)}function ne(e){return!q("input[type=checkbox]",e).checked}function re(e,t){q("span",e).textContent=t}const oe={tool:"brush",fill:"#000000",stroke:"transparent",strokeWidth:0,size:5,angle:0,isDrawing:!1,shadow:"#000000",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,hasEditableShape:!1,shape:"line",sides:3,innerRadius:1,globalCompositeOperation:"source-over"},se=(q("canvas.index__canvas"),q(".tools")),ae=(q(".colors"),q(".controls"),q(".shapes"));q(".miscellaneous");!function(){const e=R("tools__input",se);for(const t of e)t.addEventListener("change",D)}(),function(){const e=(t=".color__input--checkbox:not(input#fill-show, input#stroke-show)",n?n.tagName.includes("-")?Array.from(n.shadowRoot.querySelectorAll(t)):Array.from(n.querySelectorAll(t)):Array.from(document.querySelectorAll(t)));var t,n;for(const t of e)t.addEventListener("change",j);q(".colors__input--stroke-width").addEventListener("input",W)}(),function(){const e=R("controls__input--checkbox");for(const t of e)t.addEventListener("change",Q);const t=R("input--color");for(const e of t)e.addEventListener("input",te);const n=R("controls__input--range");for(const e of n)e.addEventListener("input",ee);const r=R("controls__input--number");for(const e of r)e.addEventListener("input",W)}(),function(){const e=R("shapes__input--radio",ae);for(const t of e)t.addEventListener("change",G);const t=R("shapes__input--number",ae);for(const e of t)e.addEventListener("input",X)}(),q(".miscellaneous__select").addEventListener("change",z)})()})();