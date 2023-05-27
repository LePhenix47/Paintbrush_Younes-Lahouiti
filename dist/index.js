(()=>{"use strict";(()=>{function t(t,e){var n;if(!e)return Array.from(document.getElementsByClassName(t));return(null===(n=null==e?void 0:e.tagName)||void 0===n?void 0:n.includes("-"))?Array.from(e.shadowRoot.getElementsByClassName(t)):Array.from(e.getElementsByClassName(t))}function e(t,e){var n;if(!e)return document.querySelector(t);return(null===(n=null==e?void 0:e.tagName)||void 0===n?void 0:n.includes("-"))?e.shadowRoot.querySelector(t):e.querySelector(t)}function n(t,e){if(!e)return Array.from(document.querySelectorAll(t));return e.tagName.includes("-")?Array.from(e.shadowRoot.querySelectorAll(t)):Array.from(e.querySelectorAll(t))}function s(t){return t.parentElement}function o(t,e){return t.closest(e)}function i(t,e,n=document.body){const s=e.toString();return n.style.setProperty(t,s)}function r(t,e){return e.appendChild(t)}function a(t,e,n){t.setAttribute(e,n.toString())}function l(t,e){return e.getAttribute(t)}function c(t,e,n){t.removeAttribute(e),t.setAttribute(n,"")}function h(t){c(t,"disabled","enabled")}function u(t){c(t,"enabled","disabled")}function d(t,e=!1){if("SELECT"!==t.tagName)throw"Error: Elmeent passed in argument is not a <select multiple>";let n=Array.from(t.selectedOptions);return e&&(n=n.map((t=>t.value))),n}const f={tool:"pen",fill:"#000000",stroke:"transparent",strokeWidth:0,size:25,angle:0,shadow:"transparent",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,hasEditableShape:!1,shape:"square",sides:5,innerRadius:45,globalCompositeOperation:"source-over",filters:[]};let p={filters:[]};const b={x:NaN,y:NaN,isDrawing:!1},m={fill:{animationId:0,hue:0,saturation:0,lightness:0,type:"fill"},stroke:{animationId:0,hue:0,saturation:0,lightness:0,type:"stroke"}},v={size:{id:0,direction:"forwards"},rotation:{id:0,direction:"forwards"}};function g(t){t.preventDefault();const n=e("canvas.index__canvas"),{x:s,y:o}=n.getBoundingClientRect();b.x=t.clientX-s,b.y=t.clientY-o}function w(t){t.preventDefault();const e="mouse"===t.pointerType&&0===t.button,n="touch"===t.pointerType;(e||n)&&(b.isDrawing=!0)}function x(t){t.preventDefault();const e="mouse"===t.pointerType&&0===t.button,n="touch"===t.pointerType;(e||n)&&(b.isDrawing=!1)}class y{constructor(){}static set(t,e,...n){return this.id=setInterval((()=>{e(...n)}),t),this.arrayOfIds.push(this.id),this.id}static clear(t){const e=this.arrayOfIds.find((e=>e===t));clearInterval(e),this.arrayOfIds=this.arrayOfIds.filter((t=>t!==e))}}y.arrayOfIds=[];const{log:k,error:C,table:_,time:E,timeEnd:T,timeStamp:S,timeLog:W,assert:N,clear:L,count:A,countReset:R,group:I,groupCollapsed:O,groupEnd:P,trace:M,profile:z,profileEnd:$,warn:B,debug:V,info:U,dir:q,dirxml:D}=console;function H(t){return Number(`0x${t}`)}function Y(t){return t.toString(16)}function X(t,e){switch(e.toLowerCase().trim()){case"lowercase":return t.toLowerCase();case"uppercase":return t.toUpperCase();case"titlecase":{let e=t.split(" ");for(let t=0;t<e.length;t++){const n=e[t].substring(0,1).toUpperCase(),s=e[t].slice(1).toLowerCase();e[t]=n+s}return e=e.concat(),e.toString()}case"titlecase2":return t.substring(0,1).toUpperCase()+t.substring(1).toLowerCase();default:throw new Error("Formatting text error: unknown option passed in argument")}}function F(t,e){return t.split(e)}function j(t,e,n){return t.substring(e,n)}function Z(t){let e=F(t,"-");for(let t=1;t<e.length;t++)e[t]=X(e[t],"titlecase");const n=e.join();return s=",",o="",n.replaceAll(s,o);var s,o}function G(t){if((null==t?void 0:t.length)<6||(null==t?void 0:t.length)>7)throw`Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ${t.length}`;let e=t;var n,s;"#"===t.charAt(0)&&(n=1,e=t.slice(n,s));let o=[j(e,0,2),j(e,2,4),j(e,4,6)];for(let t=0;t<o.length;t++){let e=o[t];o[t]=H(e)}return{red:Number(o[0]),green:Number(o[1]),blue:Number(o[2])}}function J(t,e,n){const s=t/255,o=e/255,i=n/255,r=Math.max(s,o,i),a=Math.min(s,o,i),l=r-a,c=(r+a)/2;let h,u;if(r===a)u=0,h=0;else switch(h=c>.5?l/(2-r-a):l/(r+a),r){case s:u=((o-i)/l+(o<i?6:0))/6;break;case o:u=((i-s)/l+2)/6;break;case i:u=((s-o)/l+4)/6}return{hue:Math.round(360*u),saturation:Math.round(100*h),lightness:Math.round(100*c)}}function K(t,e=100,n=50){if(t<0||t>360||e<0||e>100||n<0||n>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const s=t/360,o=e/100,i=n/100,r=(1-Math.abs(2*i-1))*o,a=6*s,l=r*(1-Math.abs(a%2-1));let c,h,u;[c,h,u]=a>=0&&a<1?[r,l,0]:a>=1&&a<2?[l,r,0]:a>=2&&a<3?[0,r,l]:a>=3&&a<4?[0,l,r]:a>=4&&a<5?[l,0,r]:[r,0,l];const d=i-r/2,f=Math.round(255*(c+d)),p=Math.round(255*(h+d)),b=Math.round(255*(u+d));return`#${Y(f).padStart(2,"0")}${Y(p).padStart(2,"0")}${Y(b).padStart(2,"0")}`}function Q(t,e,n){let s;e=e.toLowerCase(),n=n.toLowerCase();const o=e.includes("hex")&&n.includes("rgb"),i=e.includes("rgb")&&n.includes("hsl"),r=e.includes("hsl")&&n.includes("hex"),a=e.includes("hsl")&&n.includes("hwb"),l=e.includes("hsl")&&n.includes("rgb"),c=e.includes("rgb")&&n.includes("hex"),h=e.includes("hex")&&n.includes("hsl");if(o)s=G(t);else if(i)s=J(t.red,t.green,t.blue);else if(r)s=K(t.hue,t.saturation,t.lightness);else if(a)s=function(t,e=100,n=50){if(t<0||t>360||e<0||e>100||n<0||n>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const s=e/100,o=n/100,i=t/360,r=1-Math.max(s,o),a=1-Math.min(s,o);return{hue:Math.round(360*i),whiteness:Math.round(100*r),blackness:Math.round(100*a)}}(t.hue,t.saturation,t.lightness);else if(l){s=G(K(t.hue,t.saturation,t.lightness))}else if(c){const e=J(t.red,t.green,t.blue);s=K(e.hue,e.saturation,e.lightness)}else{if(!h)throw new Error("Color model conversion error: Unsupported wanted color model");{const e=G(t);s=J(e.red,e.green,e.blue)}}return s}function tt(t){const n=t.currentTarget,s=o(n,".colors__container"),i=e(".colors__input",s),r=i.value,a=i.id,{hue:l,saturation:c,lightness:h}=Q(r,"hex","hsl"),u=mt(s);if(k("Before",{mustBeTransparent:u}),u)return void y.clear(m[a].animationId);k("After IF condition",{mustBeTransparent:u});if(0===c||0===h||100===h)return void y.clear(m[a].animationId);m[a].type=a,m[a].hue=l,m[a].saturation=c,m[a].lightness=h;n.checked?m[a].animationId=y.set(50,et,i,m[a]):y.clear(m[a].animationId)}function et(t,e){e.hue+=2,e.hue%=360;let n=Q(e,"hsl","hex");n=X(n,"uppercase");const o=s(t);t.value=n,vt(o,n),f[e.type]=n}function nt(t){const n=t.currentTarget,s=d(n,!0),i=o(n,"section");k(i);const r=e(".miscellaneous__active-filter-container--shape",i);ot(s,f.filters,r)}function st(t){const n=t.currentTarget,s=d(n,!0),i=o(n,"section");k(i);const r=e(".miscellaneous__active-filter-container--canvas",i);ot(s,p.filters,r)}function ot(t,e,n){var s;const o=(s=n,Array.from(s.classList)).includes("miscellaneous__active-filter-container--shape")?"shape-filter":"canvas-filter";for(const s of t){if(!!e.find((t=>t.includes(s))))continue;const t=document.createElement(o);a(t,"filter",s),a(t,"value",0),a(t,"unit","%"),r(t,n)}}function it(t){const e=t.currentTarget.value;f.globalCompositeOperation=e}function rt(t){const e=t.currentTarget;f.tool=e.id,k("change",f.tool)}function at(t){const n=t.currentTarget,s=F(n.id,"-")[0];f.shape=s;const i="polygon"!==s&&"star"!==s;f.hasEditableShape=!i;const r=o(n,"fieldset"),a=e("input#shape-sides-amount",r),l=e("input#shape-star-inner-radius",r);!0===f.hasEditableShape?h(a):u(a);"star"===s?h(l):u(l)}function lt(t){const e=t.currentTarget;if(isNaN(e.valueAsNumber))return;ht(e,0,Number.POSITIVE_INFINITY);const n=Z(l("for",s(e)));f[n]=e.valueAsNumber}function ct(t){const e=t.currentTarget;if(isNaN(e.valueAsNumber))return;ht(e,Number(e.min),Number(e.max));switch(Z(l("for",s(e)))){case"shapeSidesAmount":f.sides=e.valueAsNumber;break;case"shapeStarInnerRadius":f.innerRadius=e.valueAsNumber}}function ht(t,e=Number.NEGATIVE_INFINITY,n=Number.POSITIVE_INFINITY){const s=t.valueAsNumber;s>n&&(t.valueAsNumber=n);s<e&&(t.valueAsNumber=e)}function ut(t){const e=t.currentTarget,n=e.name;e.checked?v[n].id=y.set(10,dt,e):y.clear(v[n].id)}function dt(t){const n=t.name,s=o(t,".controls__brush-container"),i=e(".controls__input--range",s),r=i.valueAsNumber,a=Number(i.max),l=Number(i.min);switch(n){case"size":{r>=a&&(v[n].direction="backwards");r<=l&&(v[n].direction="forwards");const t="forwards"===v[n].direction;i.valueAsNumber=t?r+1:r-1;break}case"rotation":{const t=r>=a;i.valueAsNumber=r+1,t&&(i.valueAsNumber=l);break}}const c=`${i.valueAsNumber}`,h=i.name;f[h]=i.valueAsNumber,vt(s,c)}function ft(t){const e=t.currentTarget,n=e.valueAsNumber,o=s(e),i=e.name;f[i]=n,vt(o,n)}function pt(t){const n=t.currentTarget,o=X(n.value,"uppercase"),i=s(n);vt(i,o);const r=e("div",s(i)),a=n.id,l=mt(r);f[a]=l?"transparent":o}function bt(t){const i=t.currentTarget,r=F(i.id,"-")[0],a=s(o(i,"div"));if(i.checked){const t=X(e("input[type=color]",a).value,"uppercase");f[r]=t}else{const t=n("input[type=checkbox]",a)[1];!0===(null==t?void 0:t.checked)&&(t.checked=!1),f[r]="transparent"}k(f)}function mt(t){return!e("input[type=checkbox]",t).checked}function vt(t,n){e("span",t).textContent=n}function gt(t,e,n,...s){let o=(i=t,Array.from(i));var i;let r=[];return r=!!s.length?o.splice(e,n,...s):o.splice(e,n),{removedItems:r,newArray:o}}function wt(t,e=""){return t.join(e)}function xt(t,e){return t.getContext("2d",e)}class yt{constructor(t,{tool:e,fill:n,stroke:s,strokeWidth:o,size:i,angle:r,shadow:a,shadowBlur:l,shadowOffsetX:c,shadowOffsetY:h,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:b,filters:m},{x:v,y:g,isDrawing:w}){this.canvas=t,this.context=xt(this.canvas),this.updatePropertyValues({tool:e,fill:n,stroke:s,strokeWidth:o,size:i,angle:r,shadow:a,shadowBlur:l,shadowOffsetX:c,shadowOffsetY:h,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:b,filters:m},{x:v,y:g,isDrawing:w})}updatePropertyValues({tool:t,fill:e,stroke:n,strokeWidth:s,size:o,angle:i,shadow:r,shadowBlur:a,shadowOffsetX:l,shadowOffsetY:c,hasEditableShape:h,shape:u,sides:d,innerRadius:f,globalCompositeOperation:p,filters:b},{x:m,y:v,isDrawing:g}){this.tool=t,this.fill=e,this.stroke=n,this.strokeWidth=s,this.size=o,this.angle=i,this.context.shadowColor=r,this.context.shadowBlur=a,this.context.shadowOffsetX=l,this.context.shadowOffsetY=c,this.hasEditableShape=h,this.shape=u,this.sides=d,this.innerRadius=f,this.context.globalCompositeOperation=p;const w=wt(b," "),x=!w.length;this.context.filter=x?"none":w,this.x=m,this.y=v,this.isDrawing=g}drawOnCanvas(){if(!this.isDrawing)return;if("eraser"===this.tool)return void this.erase();if("pen"===this.tool)switch(this.shape){case"circle":this.drawCircle();break;case"square":this.drawSquare();break;case"star":this.drawStar();break;case"polygon":this.drawPolygon()}}drawCircle(){this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.beginPath(),this.context.arc(this.x,this.y,this.size,0,2*Math.PI),this.context.fill();this.strokeWidth>0&&this.context.stroke()}drawSquare(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.fillStyle=this.fill,this.context.fillRect(-this.size,-this.size,2*this.size,2*this.size),this.context.fill(),this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth;this.strokeWidth>0&&this.context.strokeRect(-this.size,-this.size,2*this.size,2*this.size),this.context.restore()}erase(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.fillStyle=this.fill,this.context.clearRect(-this.size,-this.size,2*this.size,2*this.size),this.context.fill(),this.context.restore()}drawPolygon(){this.context.save(),this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.beginPath(),this.context.moveTo(this.size,0);for(let t=1;t<this.sides;t++){const e=t*Math.PI*2/this.sides,n=this.size*Math.cos(e),s=this.size*Math.sin(e);this.context.lineTo(n,s)}this.context.closePath(),this.context.fill();this.strokeWidth>0&&this.context.stroke(),this.context.restore()}drawStar(){this.context.save(),this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.beginPath(),this.context.moveTo(this.size,0);for(let t=1;t<2*this.sides;t++){const e=t%2==0?this.size:this.innerRadius,n=t*Math.PI/this.sides,s=e*Math.cos(n),o=e*Math.sin(n);this.context.lineTo(s,o)}this.context.closePath(),this.context.fill();this.strokeWidth>0&&this.context.stroke(),this.context.restore()}}function kt(t,e,n){const s=`${t}(${e}${n})`;k("Filter to change:",t,e,n);let o=f.filters.findIndex((e=>e.includes(t)));if(o<0)return;const{newArray:i}=gt(f.filters,o,1,s);f.filters=i}const Ct="\n@media (prefers-reduced-motion: reduce) {\n\n    *,\n    :before,\n    ::after {\n        -webkit-animation: none !important;\n        animation: none !important;\n\n        transition: none !important;\n    }\n}\n\n/* Reset */\n*,\n::before,\n::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n\n*::selection {\n    -webkit-text-stroke: transparent;\n\n    color: var(--selection-color);\n\n    background-color: var(--selection-bg-color);\n}\n\nhtml {\n    scroll-behavior: smooth;\n    scroll-padding-top: 0%;\n    scroll-snap-type: y proximity;\n\n    color-scheme: dark light;\n}\n\n@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap);\n\nbody {\n    min-height: 100vh;\n\n    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;\n\n    background-color: var(--bg-primary);\n    color: var(--color-primary);\n\n\n    overflow-x: hidden;\n\n    transition:\n        background-color 650ms ease-in-out,\n        color 350ms ease-in-out;\n\n}\n\n:is(ul, ol) {\n    list-style-type: none;\n}\n\n/*\n//⚠ We make the border transparent so that if the user has a high contrast text mode enable the border will still appear for them\n//Good for accessibility\n*/\nbutton {\n    border-color: transparent;\n    background-color: transparent;\n\n    font-family: inherit;\n    color: inherit;\n\n\n    &:hover {\n        cursor: pointer;\n\n        &:disabled {\n            cursor: not-allowed;\n        }\n    }\n\n}\n\n\ninput {\n    font-family: inherit;\n\n\n    border-color: transparent;\n    outline-color: transparent;\n\n    &:hover {\n        cursor: pointer;\n    }\n\n    &:focus {\n        border-color: transparent;\n        outline: transparent;\n    }\n\n    &:disabled {\n        cursor: not-allowed;\n    }\n}\n\n\ntextarea {\n    font-family: inherit;\n    border-color: transparent;\n\n    &:focus {\n        border-color: transparent;\n        outline: transparent;\n    }\n}\n\na {\n    text-decoration: none;\n    color: inherit;\n\n    &:visited {\n        color: currentColor;\n    }\n}\n\nlabel {\n    &:hover {\n        cursor: pointer;\n    }\n}\n\nfieldset {\n    border-color: transparent;\n}\n\nlegend {\n    position: static;\n}\n\ndialog {\n    position: fixed;\n    border: transparent;\n    margin: 0;\n    padding: 0;\n    z-index: 0;\n    @include absolute-center;\n}\n\nselect {\n    border: transparent;\n    font-family: inherit;\n\n    &:hover {\n        cursor: pointer;\n    }\n}\n\noption {\n    font-family: inherit;\n}\n\n\n:is(p, h1, h2, h3, h4,\n    h5, h6, span):empty {\n    display: none !important;}\n",_t="\n/* \n    Hides the element and all its descendants from view\n */\n.hide {\n    display: none !important;\n}\n\n/* \n    Hides the element from view except for screen readers \n    \n    - Good for accessibilty and by consequence SEO\n*/\n.screen-readers-only {\n    /*    \n    Positions the element off the screen \n    */ \n    clip: rect(0 0 0 0);\n    clip-path: inset(50%);\n\n    /*    \n    Sets the dimensions of the element to 1×1 px \n    */ \n    height: 1px;\n    width: 1px;\n\n    /*    \n    Hides any content that overflows the element \n    */ \n    overflow: hidden;\n\n    /*    \n    Positions the element absolutely \n    */ \n    position: absolute;\n\n    /*    \n    Prevents line breaks in the element \n    */ \n    white-space: nowrap;\n}\n\n/* \n    Disables pointer (click on desktop and tap on mobile) events for the element and its descendants \n*/\n.no-pointer-events {\n    pointer-events: none;\n}\n\n",Et="\n:host {\n    --bg-primary: hwb(0 100% 0%);\n    --bg-secondary: #f0efef;\n    --bg-tertiary: #676767;\n    --bg-radio-button: #48c848;\n    --bg-canvas: #fff;\n    --color-primary: #000;\n    --color-secondary: gray;\n    --semi-transparent-bg: hsla(0, 0%, 100%, .7);\n    --border-color: #dbdbdb;\n    --scrollbar-track-bg-color: #fff;\n    --scrollbar-thumb-bg-color: #545454;\n    --scrollbar-thumb-bg-color--hover: #757575;\n    --scrollbar-thumb-bg-color--active: #b0b0b0;\n    --selection-bg-color: hwb(240 0% 0%);\n    --selection-color: #fff;\n    --out-of-range-bg: #fdd;\n    --out-of-range-color: #ff441b;\n    --fill-color: #000;\n    --stroke-color: transparent\n}\n\n::backdrop {\n    --backdrop-bg-color: hsla(0, 0%, 100%, .5);\n    --scrollbar-track-bg-color: #fff;\n    --scrollbar-thumb-bg-color: #545454;\n    --scrollbar-thumb-bg-color--hover: #757575;\n    --scrollbar-thumb-bg-color--active: #b0b0b0}\n",Tt="\n\n@media(prefers-color-scheme:dark) {\n    :host {\n        --bg-primary: #000;\n        --bg-secondary: #232323;\n        --bg-tertiary: #7a7a7a;\n        --bg-radio-button: green;\n        --color-primary: #fff;\n        --semi-transparent-bg: rgba(0, 0, 0, .7);\n        --bg-canvas: #505050;\n        --scrollbar-track-bg-color: #000;\n        --scrollbar-thumb-bg-color: #ababab;\n        --scrollbar-thumb-bg-color--hover: #8a8a8a;\n        --scrollbar-thumb-bg-color--active: #4f4f4f;\n        --selection-bg: #838383;\n        --selection-color: #fff;\n        --selection-bg-color: orange;\n        --selection-color: #000;\n        --out-of-range-bg: #290000;\n        --out-of-range-color: #eb3941\n    }\n\n    ::backdrop {\n        --backdrop-bg-color: rgba(0, 0, 0, .5);\n        --scrollbar-track-bg-color: #000;\n        --scrollbar-thumb-bg-color: #ababab;\n        --scrollbar-thumb-bg-color--hover: #8a8a8a;\n        --scrollbar-thumb-bg-color--active: #4f4f4f\n    }\n}\n",St=document.createElement("template");St.innerHTML=`\n  <style>\n    ${Et}\n    ${Tt}\n    ${Ct}\n    ${_t}\n    \n    \n.miscellaneous__shape-filter{\n     display: inline-flex;\n    justify-content: center;\n    align-items: center;\n\n    gap: 10px;\n}\n\n\n.miscellaneous__shape-filter-label {\n    align-items: center;\n    display: inline-flex;\n    gap: 15px;\n    justify-content: space-between\n}\n\n.miscellaneous__shape-filter-input {\n    max-width: 50px;\n\n    text-align: center;\n}\n\n.miscellaneous__shape-filter-button{ \n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n}\n\n  </style>\n  \n  \n <div class="miscellaneous__shape-filter">\n    <label class="miscellaneous__shape-filter-label" for="filter">\n    <span>Blur:</span>        \n        <input type="number" class="miscellaneous__shape-filter-input" name="value"\n            id="filter" value="0" min="0" />\n    </label>\n\n    <label class="miscellaneous__shape-filter-label" for="filter-unit">\n        <select name="unit" id="filter-unit">\n            <option value="">---</option>\n            <option value="%">Percentage (%)</option>\n            <option value="px">Pixels (px)</option>\n        </select>\n    </label>\n\n    <button type="button" class="miscellaneous__shape-filter-button">\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"\n            class="no-pointer-events" fill="var(--out-of-range-color)">\n            <path\n                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.21 11.79a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L12 13.41l-1.79 1.8a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.8-1.79-1.8-1.79a1 1 0 0 1 1.42-1.42l1.79 1.8 1.79-1.8a1 1 0 0 1 1.42 1.42L13.41 12Z">\n            </path>\n        </svg>\n    </button>\n</div>\n\n`;class Wt extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"}),e=St.content.cloneNode(!0);t.appendChild(e),this.setValueToWebComponent=this.setValueToWebComponent.bind(this),this.setUnitToWebComponent=this.setUnitToWebComponent.bind(this),this.removeWebComponent=this.removeWebComponent.bind(this)}get filter(){return l("filter",this)}set filter(t){a(this,"filter",t)}get value(){return l("value",this)}set value(t){a(this,"value",t)}get unit(){return l("unit",this)}set unit(t){a(this,"unit",t)}static get observedAttributes(){return["filter","value","unit"]}setValueToWebComponent(t){const e=t.currentTarget;this.value=e.value}setUnitToWebComponent(t){const e=t.currentTarget;this.unit=e.value}removeWebComponent(t){this.remove()}connectedCallback(){const t=e("input[type=number]",this.shadowRoot),n=e("select",this.shadowRoot);t.addEventListener("input",this.setValueToWebComponent),n.addEventListener("input",this.setUnitToWebComponent);const s=e("button",this.shadowRoot);s.addEventListener("click",this.removeWebComponent),k(t,n,s);const o=`${this.filter}(${this.value}${this.unit})`;var i;i=o,f.filters.push(i),k("Added!")}disconnectedCallback(){const t=e("input[type=number]",this.shadowRoot),n=e("select",this.shadowRoot);t.removeEventListener("input",this.setValueToWebComponent),n.removeEventListener("input",this.setUnitToWebComponent);var s;e("button",this.shadowRoot).removeEventListener("click",this.removeWebComponent),s=this.filter,f.filters=f.filters.filter((t=>!t.includes(s))),k("Removed!")}attributeChangedCallback(t,n,s){this.shadowRoot;switch(t){case"filter":{const t=e("label>span",this.shadowRoot),n=X(this.filter,"titlecase");t.textContent=n;const o=e("select",this.shadowRoot);if("invert"===s||"opacity"===s||"saturate"===s||"sepia"===s){e("option[value=px]",o).remove()}if("blur"===s){e('option[value="%"]',o).remove()}break}case"value":k("Value change");if(null===n)return;kt(this.filter,s,this.unit),k(f.filters);break;case"unit":k("Unit change");if(null===n)return;if("px"!==s&&"%"!==s)throw new Error(`Error: unexpected unit passed for shape filter, not a percentage or a px value: ${s}`);kt(this.filter,this.value,s),k(f.filters);break}}}function Nt(t,e,n){const s=`${t}(${e}${n})`;k("Filter to change:",t,e,n);let o=p.filters.findIndex((e=>e.includes(t)));if(o<0)return;const{newArray:i}=gt(p.filters,o,1,s);p.filters=i}customElements.define("shape-filter",Wt);const Lt=document.createElement("template");Lt.innerHTML=`\n  <style>\n    ${Et}\n    ${Tt}\n    ${Ct}\n    ${_t}\n    \n    \n.miscellaneous__canvas-filter{\n     display: inline-flex;\n    justify-content: center;\n    align-items: center;\n\n    gap: 10px;\n}\n\n\n.miscellaneous__canvas-filter-label {\n    align-items: center;\n    display: inline-flex;\n    gap: 15px;\n    justify-content: space-between\n}\n\n.miscellaneous__canvas-filter-input {\n    max-width: 50px;\n\n    text-align: center;\n}\n\n.miscellaneous__canvas-filter-button{ \n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n}\n\n  </style>\n  \n  \n <div class="miscellaneous__canvas-filter">\n    <label class="miscellaneous__canvas-filter-label" for="filter">\n    <span>Blur:</span>        \n        <input type="number" class="miscellaneous__canvas-filter-input" name="value"\n            id="filter" value="0" min="0" />\n    </label>\n\n    <label class="miscellaneous__canvas-filter-label" for="filter-unit">\n        <select name="unit" id="filter-unit">\n            <option value="">---</option>\n            <option value="%">Percentage (%)</option>\n            <option value="px">Pixels (px)</option>\n        </select>\n    </label>\n\n    <button type="button" class="miscellaneous__canvas-filter-button">\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"\n            class="no-pointer-events" fill="var(--out-of-range-color)">\n            <path\n                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.21 11.79a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L12 13.41l-1.79 1.8a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.8-1.79-1.8-1.79a1 1 0 0 1 1.42-1.42l1.79 1.8 1.79-1.8a1 1 0 0 1 1.42 1.42L13.41 12Z">\n            </path>\n        </svg>\n    </button>\n</div>\n\n`;class At extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"}),e=Lt.content.cloneNode(!0);t.appendChild(e),this.setValueToWebComponent=this.setValueToWebComponent.bind(this),this.setUnitToWebComponent=this.setUnitToWebComponent.bind(this),this.removeWebComponent=this.removeWebComponent.bind(this)}get filter(){return l("filter",this)}set filter(t){a(this,"filter",t)}get value(){return l("value",this)}set value(t){a(this,"value",t)}get unit(){return l("unit",this)}set unit(t){a(this,"unit",t)}static get observedAttributes(){return["filter","value","unit"]}setValueToWebComponent(t){const e=t.currentTarget;this.value=e.value}setUnitToWebComponent(t){const e=t.currentTarget;this.unit=e.value}removeWebComponent(t){this.remove()}connectedCallback(){const t=e("input[type=number]",this.shadowRoot),n=e("select",this.shadowRoot);t.addEventListener("input",this.setValueToWebComponent),n.addEventListener("input",this.setUnitToWebComponent);e("button",this.shadowRoot).addEventListener("click",this.removeWebComponent);const s=`${this.filter}(${this.value}${this.unit})`;var o;o=s,p.filters.push(o),this.updateCanvasElementProperty()}disconnectedCallback(){const t=e("input[type=number]",this.shadowRoot),n=e("select",this.shadowRoot);t.removeEventListener("input",this.setValueToWebComponent),n.removeEventListener("input",this.setUnitToWebComponent);e("button",this.shadowRoot).removeEventListener("click",this.removeWebComponent);const s=`${this.filter}(${this.value}${this.unit})`;var o;o=s,p.filters=p.filters.filter((t=>!t.includes(o))),this.updateCanvasElementProperty()}attributeChangedCallback(t,n,s){switch(t){case"filter":{const t=e("label>span",this.shadowRoot),n=X(this.filter,"titlecase");t.textContent=n;const o=e("select",this.shadowRoot);if("invert"===s||"opacity"===s||"saturate"===s||"sepia"===s){e("option[value=px]",o).remove()}if("blur"===s){e('option[value="%"]',o).remove()}break}case"value":k("Value change");if(null===n)return;Nt(this.filter,s,this.unit),k(f.filters);break;case"unit":k("Unit change");if(null===n)return;if("px"!==s&&"%"!==s)throw new Error(`Error: unexpected unit passed for canvas filter, not a percentage or a px value: ${s}`);Nt(this.filter,this.value,s),k(f.filters);break}this.updateCanvasElementProperty()}updateCanvasElementProperty(){const t=wt(p.filters," ");k(t);t.length?i("--canvas-filters",t):i("--canvas-filters","none")}}customElements.define("canvas-filter",At);const Rt=e("canvas.index__canvas"),It=xt(Rt),Ot=e("canvas.shapes__canvas"),Pt=(xt(Ot),e("fieldset.tools")),Mt=(e("fieldset.colors"),e("fieldset.controls"),e("fieldset.shapes"));e("fieldset.miscellaneous");!function(){const n=t("tools__input",Pt);for(const t of n)t.addEventListener("change",rt);e(".tools__button").addEventListener("click",(()=>{var t,e,n;t=It,e=Rt.width,n=Rt.height,t.clearRect(0,0,e,n)}))}(),function(){const t=n(".color__input--checkbox:not(input#fill-show, input#stroke-show)");for(const e of t)e.addEventListener("change",tt);e(".colors__input--stroke-width").addEventListener("input",lt)}(),function(){const e=t("controls__input--checkbox");for(const t of e)t.addEventListener("change",ut);const n=t("input--color");for(const t of n)t.addEventListener("input",pt);const s=t("show-input");for(const t of s)t.addEventListener("change",bt);const o=t("controls__input--range");for(const t of o)t.addEventListener("input",ft);const i=t("controls__input--number");for(const t of i)t.addEventListener("input",lt)}(),function(){const e=t("shapes__input--radio",Mt);for(const t of e)t.addEventListener("change",at);const n=t("shapes__input--number",Mt);for(const t of n)t.addEventListener("input",ct)}(),e(".miscellaneous__select--canvas").addEventListener("change",it),e(".miscellaneous__select-multiple--shape").addEventListener("input",nt),e(".miscellaneous__select-multiple--canvas").addEventListener("input",st),Rt.addEventListener("pointermove",g),Rt.addEventListener("pointerdown",w),Rt.addEventListener("pointerup",x),Rt.addEventListener("pointercancel",(t=>{k("Cancel")})),window.addEventListener("resize",$t);let zt=0;function $t(){Rt.width=Rt.clientWidth,Rt.height=Rt.clientHeight,Ot.width=Ot.clientWidth,Ot.height=Ot.clientHeight}$t();let Bt=new yt(Rt,f,b),Vt=new class extends yt{constructor(t,{tool:e,fill:n,stroke:s,strokeWidth:o,size:i,angle:r,shadow:a,shadowBlur:l,shadowOffsetX:c,shadowOffsetY:h,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:b,filters:m}){super(t,{tool:e,fill:n,stroke:s,strokeWidth:o,size:15,angle:r,shadow:a,shadowBlur:l,shadowOffsetX:c,shadowOffsetY:h,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:b,filters:m},{x:t.width/2,y:t.width/2,isDrawing:!0}),this.canvas=t,this.context=xt(this.canvas)}updatePropertyValues({tool:t,fill:e,stroke:n,strokeWidth:s,size:o,angle:i,shadow:r,shadowBlur:a,shadowOffsetX:l,shadowOffsetY:c,hasEditableShape:h,shape:u,sides:d,innerRadius:f,globalCompositeOperation:p,filters:b}){this.tool=t,this.fill=e,this.stroke=n,this.strokeWidth=s,this.size=o,this.angle=i,this.context.shadowColor=r,this.context.shadowBlur=a,this.context.shadowOffsetX=l,this.context.shadowOffsetY=c,this.hasEditableShape=h,this.shape=u,this.sides=d,this.innerRadius=f,this.x=this.canvas.width/2,this.y=this.canvas.height/2,this.isDrawing=!0;const m=wt(b," "),v=!m.length;this.context.filter=v?"none":m}drawOnCanvas(){switch(this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.shape){case"circle":this.drawCircle();break;case"square":this.drawSquare();break;case"star":this.drawStar();break;case"polygon":this.drawPolygon()}}}(Ot,f);!function t(){Bt.drawOnCanvas(),Bt.updatePropertyValues(f,b),Vt.drawOnCanvas(),Vt.updatePropertyValues(f),zt=requestAnimationFrame(t)}()})()})();