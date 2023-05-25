(()=>{"use strict";(()=>{function t(t,e){var s;if(!e)return Array.from(document.getElementsByClassName(t));return(null===(s=null==e?void 0:e.tagName)||void 0===s?void 0:s.includes("-"))?Array.from(e.shadowRoot.getElementsByClassName(t)):Array.from(e.getElementsByClassName(t))}function e(t,e){var s;if(!e)return document.querySelector(t);return(null===(s=null==e?void 0:e.tagName)||void 0===s?void 0:s.includes("-"))?e.shadowRoot.querySelector(t):e.querySelector(t)}function s(t,e){if(!e)return Array.from(document.querySelectorAll(t));return e.tagName.includes("-")?Array.from(e.shadowRoot.querySelectorAll(t)):Array.from(e.querySelectorAll(t))}function i(t){return t.parentElement}function n(t,e){return t.closest(e)}function o(t,e){return e.getAttribute(t)}function r(t,e,s){t.removeAttribute(e),t.setAttribute(s,"")}function a(t){r(t,"disabled","enabled")}function h(t){r(t,"enabled","disabled")}const l={tool:"brush",fill:"#000000",stroke:"transparent",strokeWidth:0,size:25,angle:0,shadow:"transparent",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,hasEditableShape:!1,shape:"square",sides:5,innerRadius:45,globalCompositeOperation:"source-over"},c={x:NaN,y:NaN,isDrawing:!1},u={fill:{animationId:0,hue:0,saturation:0,lightness:0,type:"fill"},stroke:{animationId:0,hue:0,saturation:0,lightness:0,type:"stroke"}},d={size:{id:0,direction:"forwards"},rotation:{id:0,direction:"forwards"}};function f(t){t.preventDefault();const s=e("canvas.index__canvas"),{x:i,y:n}=s.getBoundingClientRect();c.x=t.clientX-i,c.y=t.clientY-n}function p(t){t.preventDefault();const e="mouse"===t.pointerType&&0===t.button,s="touch"===t.pointerType;(e||s)&&(c.isDrawing=!0)}function g(t){t.preventDefault();const e="mouse"===t.pointerType&&0===t.button,s="touch"===t.pointerType;(e||s)&&(c.isDrawing=!1)}class w{constructor(){}static set(t,e,...s){return this.id=setInterval((()=>{e(...s)}),t),this.arrayOfIds.push(this.id),this.id}static clear(t){const e=this.arrayOfIds.find((e=>e===t));clearInterval(e),this.arrayOfIds=this.arrayOfIds.filter((t=>t!==e))}}w.arrayOfIds=[];const{log:b,error:m,table:x,time:v,timeEnd:k,timeStamp:y,timeLog:N,assert:E,clear:S,count:I,countReset:O,group:_,groupCollapsed:C,groupEnd:A,trace:z,profile:L,profileEnd:M,warn:T,debug:W,info:P,dir:R,dirxml:B}=console;function q(t){return Number(`0x${t}`)}function D(t){return t.toString(16)}function Y(t,e){switch(e.toLowerCase().trim()){case"lowercase":return t.toLowerCase();case"uppercase":return t.toUpperCase();case"titlecase":{let e=t.split(" ");for(let t=0;t<e.length;t++){const s=e[t].substring(0,1).toUpperCase(),i=e[t].slice(1).toLowerCase();e[t]=s+i}return e=e.concat(),e.toString()}case"titlecase2":return t.substring(0,1).toUpperCase()+t.substring(1).toLowerCase();default:throw new Error("Formatting text error: unknown option passed in argument")}}function X(t,e){return t.split(e)}function V(t,e,s){return t.substring(e,s)}function F(t){let e=X(t,"-");for(let t=1;t<e.length;t++)e[t]=Y(e[t],"titlecase");const s=e.join();return i=",",n="",s.replaceAll(i,n);var i,n}function H(t){if((null==t?void 0:t.length)<6||(null==t?void 0:t.length)>7)throw`Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ${t.length}`;let e=t;var s,i;"#"===t.charAt(0)&&(s=1,e=t.slice(s,i));let n=[V(e,0,2),V(e,2,4),V(e,4,6)];for(let t=0;t<n.length;t++){let e=n[t];n[t]=q(e)}return{red:Number(n[0]),green:Number(n[1]),blue:Number(n[2])}}function $(t,e,s){const i=t/255,n=e/255,o=s/255,r=Math.max(i,n,o),a=Math.min(i,n,o),h=r-a,l=(r+a)/2;let c,u;if(r===a)u=0,c=0;else switch(c=l>.5?h/(2-r-a):h/(r+a),r){case i:u=((n-o)/h+(n<o?6:0))/6;break;case n:u=((o-i)/h+2)/6;break;case o:u=((i-n)/h+4)/6}return{hue:Math.round(360*u),saturation:Math.round(100*c),lightness:Math.round(100*l)}}function U(t,e=100,s=50){if(t<0||t>360||e<0||e>100||s<0||s>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const i=t/360,n=e/100,o=s/100,r=(1-Math.abs(2*o-1))*n,a=6*i,h=r*(1-Math.abs(a%2-1));let l,c,u;[l,c,u]=a>=0&&a<1?[r,h,0]:a>=1&&a<2?[h,r,0]:a>=2&&a<3?[0,r,h]:a>=3&&a<4?[0,h,r]:a>=4&&a<5?[h,0,r]:[r,0,h];const d=o-r/2,f=Math.round(255*(l+d)),p=Math.round(255*(c+d)),g=Math.round(255*(u+d));return`#${D(f).padStart(2,"0")}${D(p).padStart(2,"0")}${D(g).padStart(2,"0")}`}function j(t,e,s){let i;e=e.toLowerCase(),s=s.toLowerCase();const n=e.includes("hex")&&s.includes("rgb"),o=e.includes("rgb")&&s.includes("hsl"),r=e.includes("hsl")&&s.includes("hex"),a=e.includes("hsl")&&s.includes("hwb"),h=e.includes("hsl")&&s.includes("rgb"),l=e.includes("rgb")&&s.includes("hex"),c=e.includes("hex")&&s.includes("hsl");if(n)i=H(t);else if(o)i=$(t.red,t.green,t.blue);else if(r)i=U(t.hue,t.saturation,t.lightness);else if(a)i=function(t,e=100,s=50){if(t<0||t>360||e<0||e>100||s<0||s>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const i=e/100,n=s/100,o=t/360,r=1-Math.max(i,n),a=1-Math.min(i,n);return{hue:Math.round(360*o),whiteness:Math.round(100*r),blackness:Math.round(100*a)}}(t.hue,t.saturation,t.lightness);else if(h){i=H(U(t.hue,t.saturation,t.lightness))}else if(l){const e=$(t.red,t.green,t.blue);i=U(e.hue,e.saturation,e.lightness)}else{if(!c)throw new Error("Color model conversion error: Unsupported wanted color model");{const e=H(t);i=$(e.red,e.green,e.blue)}}return i}function G(t){const s=t.currentTarget,i=n(s,".colors__container"),o=e(".colors__input",i),r=o.value,a=o.id,{hue:h,saturation:l,lightness:c}=j(r,"hex","hsl"),d=ht(i);if(b("Before",{mustBeTransparent:d}),d)return void w.clear(u[a].animationId);b("After IF condition",{mustBeTransparent:d});if(0===l||0===c||100===c)return void w.clear(u[a].animationId);u[a].type=a,u[a].hue=h,u[a].saturation=l,u[a].lightness=c;s.checked?u[a].animationId=w.set(50,J,o,u[a]):w.clear(u[a].animationId)}function J(t,e){e.hue+=2,e.hue%=360;let s=j(e,"hsl","hex");s=Y(s,"uppercase");const n=i(t);t.value=s,lt(n,s),l[e.type]=s}function K(t){const e=t.currentTarget.value;l.globalCompositeOperation=e}function Q(t){const e=t.currentTarget;l.tool=e.id}function Z(t){const s=t.currentTarget,i=X(s.id,"-")[0];l.shape=i;const o="polygon"!==i&&"star"!==i;l.hasEditableShape=!o;const r=n(s,"fieldset"),c=e("input#shape-sides-amount",r),u=e("input#shape-star-inner-radius",r);!0===l.hasEditableShape?a(c):h(c);"star"===i?a(u):h(u)}function tt(t){const e=t.currentTarget;if(isNaN(e.valueAsNumber))return;st(e,0,Number.POSITIVE_INFINITY);const s=F(o("for",i(e)));l[s]=e.valueAsNumber}function et(t){const e=t.currentTarget;if(isNaN(e.valueAsNumber))return;st(e,Number(e.min),Number(e.max));switch(F(o("for",i(e)))){case"shapeSidesAmount":l.sides=e.valueAsNumber;break;case"shapeStarInnerRadius":l.innerRadius=e.valueAsNumber}}function st(t,e=Number.NEGATIVE_INFINITY,s=Number.POSITIVE_INFINITY){const i=t.valueAsNumber;i>s&&(t.valueAsNumber=s);i<e&&(t.valueAsNumber=e)}function it(t){const e=t.currentTarget,s=e.name;e.checked?d[s].id=w.set(10,nt,e):w.clear(d[s].id)}function nt(t){const s=t.name,i=n(t,".controls__brush-container"),o=e(".controls__input--range",i),r=o.valueAsNumber,a=Number(o.max),h=Number(o.min);switch(s){case"size":{r>=a&&(d[s].direction="backwards");r<=h&&(d[s].direction="forwards");const t="forwards"===d[s].direction;o.valueAsNumber=t?r+1:r-1;break}case"rotation":{const t=r>=a;o.valueAsNumber=r+1,t&&(o.valueAsNumber=h);break}}const c=`${o.valueAsNumber}`,u=o.name;l[u]=o.valueAsNumber,lt(i,c)}function ot(t){const e=t.currentTarget,s=e.valueAsNumber,n=i(e),o=e.name;l[o]=s,lt(n,s)}function rt(t){const s=t.currentTarget,n=Y(s.value,"uppercase"),o=i(s);lt(o,n);const r=e("div",i(o)),a=s.id,h=ht(r);l[a]=h?"transparent":n}function at(t){const o=t.currentTarget,r=X(o.id,"-")[0],a=i(n(o,"div"));if(o.checked){const t=Y(e("input[type=color]",a).value,"uppercase");l[r]=t}else{const t=s("input[type=checkbox]",a)[1];!0===(null==t?void 0:t.checked)&&(t.checked=!1),l[r]="transparent"}b(l)}function ht(t){return!e("input[type=checkbox]",t).checked}function lt(t,s){e("span",t).textContent=s}function ct(t,e){return t.getContext("2d",e)}class ut{constructor(t,{tool:e,fill:s,stroke:i,strokeWidth:n,size:o,angle:r,shadow:a,shadowBlur:h,shadowOffsetX:l,shadowOffsetY:c,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:g},{x:w,y:b,isDrawing:m}){this.canvas=t,this.context=ct(this.canvas),this.updatePropertyValues({tool:e,fill:s,stroke:i,strokeWidth:n,size:o,angle:r,shadow:a,shadowBlur:h,shadowOffsetX:l,shadowOffsetY:c,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:g},{x:w,y:b,isDrawing:m})}updatePropertyValues({tool:t,fill:e,stroke:s,strokeWidth:i,size:n,angle:o,shadow:r,shadowBlur:a,shadowOffsetX:h,shadowOffsetY:l,hasEditableShape:c,shape:u,sides:d,innerRadius:f,globalCompositeOperation:p},{x:g,y:w,isDrawing:b}){this.tool=t,this.fill=e,this.stroke=s,this.strokeWidth=i,this.size=n,this.angle=o,this.context.shadowColor=r,this.context.shadowBlur=a,this.context.shadowOffsetX=h,this.context.shadowOffsetY=l,this.hasEditableShape=c,this.shape=u,this.sides=d,this.innerRadius=f,this.context.globalCompositeOperation=p,this.x=g,this.y=w,this.isDrawing=b}drawOnCanvas(){if(!this.isDrawing)return;if("eraser"===this.tool)this.erase();else switch(this.shape){case"circle":this.drawCircle();break;case"square":this.drawSquare();break;case"star":this.drawStar();break;case"polygon":this.drawPolygon()}}drawCircle(){this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.beginPath(),this.context.arc(this.x,this.y,this.size,0,2*Math.PI),this.context.fill();this.strokeWidth>0&&this.context.stroke()}drawSquare(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.fillStyle=this.fill,this.context.fillRect(-this.size,-this.size,2*this.size,2*this.size),this.context.fill(),this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth;this.strokeWidth>0&&this.context.strokeRect(-this.size,-this.size,2*this.size,2*this.size),this.context.restore()}erase(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.fillStyle=this.fill,this.context.clearRect(-this.size,-this.size,2*this.size,2*this.size),this.context.fill(),this.context.restore()}drawPolygon(){this.context.save(),this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.beginPath(),this.context.moveTo(this.size,0);for(let t=1;t<this.sides;t++){const e=t*Math.PI*2/this.sides,s=this.size*Math.cos(e),i=this.size*Math.sin(e);this.context.lineTo(s,i)}this.context.closePath(),this.context.fill();this.strokeWidth>0&&this.context.stroke(),this.context.restore()}drawStar(){this.context.save(),this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.beginPath(),this.context.moveTo(this.size,0);for(let t=1;t<2*this.sides;t++){const e=t%2==0?this.size:this.innerRadius,s=t*Math.PI/this.sides,i=e*Math.cos(s),n=e*Math.sin(s);this.context.lineTo(i,n)}this.context.closePath(),this.context.fill();this.strokeWidth>0&&this.context.stroke(),this.context.restore()}}const dt=e("canvas.index__canvas"),ft=ct(dt),pt=e("canvas.shapes__canvas"),gt=(ct(pt),e("fieldset.tools")),wt=(e("fieldset.colors"),e("fieldset.controls"),e("fieldset.shapes"));e("fieldset.miscellaneous");!function(){const s=t("tools__input",gt);for(const t of s)t.addEventListener("change",Q);e(".tools__button").addEventListener("click",(()=>{var t,e,s;t=ft,e=dt.width,s=dt.height,t.clearRect(0,0,e,s)}))}(),function(){const t=s(".color__input--checkbox:not(input#fill-show, input#stroke-show)");for(const e of t)e.addEventListener("change",G);e(".colors__input--stroke-width").addEventListener("input",tt)}(),function(){const e=t("controls__input--checkbox");for(const t of e)t.addEventListener("change",it);const s=t("input--color");for(const t of s)t.addEventListener("input",rt);const i=t("show-input");for(const t of i)t.addEventListener("change",at);const n=t("controls__input--range");for(const t of n)t.addEventListener("input",ot);const o=t("controls__input--number");for(const t of o)t.addEventListener("input",tt)}(),function(){const e=t("shapes__input--radio",wt);for(const t of e)t.addEventListener("change",Z);const s=t("shapes__input--number",wt);for(const t of s)t.addEventListener("input",et)}(),e(".miscellaneous__select").addEventListener("change",K),dt.addEventListener("pointermove",f),dt.addEventListener("pointerdown",p),dt.addEventListener("pointerup",g),dt.addEventListener("pointercancel",(t=>{b("Cancel")})),window.addEventListener("resize",mt);let bt=0;function mt(){dt.width=dt.clientWidth,dt.height=dt.clientHeight,pt.width=pt.clientWidth,pt.height=pt.clientHeight}mt();let xt=new ut(dt,l,c),vt=new class extends ut{constructor(t,{tool:e,fill:s,stroke:i,strokeWidth:n,size:o,angle:r,shadow:a,shadowBlur:h,shadowOffsetX:l,shadowOffsetY:c,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:g}){super(t,{tool:e,fill:s,stroke:i,strokeWidth:n,size:15,angle:r,shadow:a,shadowBlur:h,shadowOffsetX:l,shadowOffsetY:c,hasEditableShape:u,shape:d,sides:f,innerRadius:p,globalCompositeOperation:g},{x:t.width/2,y:t.width/2,isDrawing:!0}),this.canvas=t,this.context=ct(this.canvas)}updatePropertyValues({tool:t,fill:e,stroke:s,strokeWidth:i,size:n,angle:o,shadow:r,shadowBlur:a,shadowOffsetX:h,shadowOffsetY:l,hasEditableShape:c,shape:u,sides:d,innerRadius:f,globalCompositeOperation:p}){this.tool=t,this.fill=e,this.stroke=s,this.strokeWidth=i,this.size=n,this.angle=o,this.context.shadowColor=r,this.context.shadowBlur=a,this.context.shadowOffsetX=h,this.context.shadowOffsetY=l,this.hasEditableShape=c,this.shape=u,this.sides=d,this.innerRadius=f,this.x=this.canvas.width/2,this.y=this.canvas.height/2,this.isDrawing=!0}drawOnCanvas(){switch(this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.shape){case"circle":this.drawCircle();break;case"square":this.drawSquare();break;case"star":this.drawStar();break;case"polygon":this.drawPolygon()}}}(pt,l);!function t(){xt.drawOnCanvas(),xt.updatePropertyValues(l,c),vt.drawOnCanvas(),vt.updatePropertyValues(l),bt=requestAnimationFrame(t)}()})()})();