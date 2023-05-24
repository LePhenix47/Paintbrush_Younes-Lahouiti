(()=>{"use strict";(()=>{function t(t,e){return t.getContext("2d",e)}function e(t,e){var s;if(!e)return Array.from(document.getElementsByClassName(t));return(null===(s=null==e?void 0:e.tagName)||void 0===s?void 0:s.includes("-"))?Array.from(e.shadowRoot.getElementsByClassName(t)):Array.from(e.getElementsByClassName(t))}function s(t,e){var s;if(!e)return document.querySelector(t);return(null===(s=null==e?void 0:e.tagName)||void 0===s?void 0:s.includes("-"))?e.shadowRoot.querySelector(t):e.querySelector(t)}function n(t){return t.parentElement}function i(t,e){return t.closest(e)}function o(t,e){return e.getAttribute(t)}function r(t,e,s){t.removeAttribute(e),t.setAttribute(s,"")}function a(t){r(t,"disabled","enabled")}function h(t){r(t,"enabled","disabled")}const l={tool:"brush",fill:"#000000",stroke:"transparent",strokeWidth:0,size:25,angle:0,shadow:"transparent",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,hasEditableShape:!1,shape:"square",sides:3,innerRadius:1,globalCompositeOperation:"source-over"},c={x:NaN,y:NaN,isDrawing:!1},u={fill:{animationId:0,hue:0,saturation:0,lightness:0,type:"fill"},stroke:{animationId:0,hue:0,saturation:0,lightness:0,type:"stroke"}},d={size:{id:0,direction:"forwards"},rotation:{id:0,direction:"forwards"}};function f(t){const e=s("canvas.index__canvas"),{x:n,y:i}=e.getBoundingClientRect();c.x=t.x-n,c.y=t.y-i}function p(t){0===t.button&&(c.isDrawing=!0)}function g(t){0===t.button&&(c.isDrawing=!1)}class m{constructor(){}static set(t,e,...s){return this.id=setInterval((()=>{e(...s)}),t),this.arrayOfIds.push(this.id),this.id}static clear(t){const e=this.arrayOfIds.find((e=>e===t));clearInterval(e),this.arrayOfIds=this.arrayOfIds.filter((t=>t!==e))}}m.arrayOfIds=[];const{log:x,error:b,table:w,time:v,timeEnd:y,timeStamp:k,timeLog:N,assert:E,clear:S,count:I,countReset:_,group:A,groupCollapsed:C,groupEnd:M,trace:z,profile:L,profileEnd:O,warn:T,debug:P,info:R,dir:W,dirxml:q}=console;function B(t){return Number(`0x${t}`)}function D(t){return t.toString(16)}function Y(t,e){switch(e.toLowerCase().trim()){case"lowercase":return t.toLowerCase();case"uppercase":return t.toUpperCase();case"titlecase":{let e=t.split(" ");for(let t=0;t<e.length;t++){const s=e[t].substring(0,1).toUpperCase(),n=e[t].slice(1).toLowerCase();e[t]=s+n}return e=e.concat(),e.toString()}case"titlecase2":return t.substring(0,1).toUpperCase()+t.substring(1).toLowerCase();default:throw new Error("Formatting text error: unknown option passed in argument")}}function V(t,e){return t.split(e)}function $(t,e,s){return t.substring(e,s)}function F(t){let e=V(t,"-");for(let t=1;t<e.length;t++)e[t]=Y(e[t],"titlecase");const s=e.join();return n=",",i="",s.replaceAll(n,i);var n,i}function U(t){if((null==t?void 0:t.length)<6||(null==t?void 0:t.length)>7)throw`Error: Unexpected color argument length passed, was expecting a 6 or 7 characters long string but instead got ${t.length}`;let e=t;var s,n;"#"===t.charAt(0)&&(s=1,e=t.slice(s,n));let i=[$(e,0,2),$(e,2,4),$(e,4,6)];for(let t=0;t<i.length;t++){let e=i[t];i[t]=B(e)}return{red:Number(i[0]),green:Number(i[1]),blue:Number(i[2])}}function X(t,e,s){const n=t/255,i=e/255,o=s/255,r=Math.max(n,i,o),a=Math.min(n,i,o),h=r-a,l=(r+a)/2;let c,u;if(r===a)u=0,c=0;else switch(c=l>.5?h/(2-r-a):h/(r+a),r){case n:u=((i-o)/h+(i<o?6:0))/6;break;case i:u=((o-n)/h+2)/6;break;case o:u=((n-i)/h+4)/6}return{hue:Math.round(360*u),saturation:Math.round(100*c),lightness:Math.round(100*l)}}function H(t,e=100,s=50){if(t<0||t>360||e<0||e>100||s<0||s>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const n=t/360,i=e/100,o=s/100,r=(1-Math.abs(2*o-1))*i,a=6*n,h=r*(1-Math.abs(a%2-1));let l,c,u;[l,c,u]=a>=0&&a<1?[r,h,0]:a>=1&&a<2?[h,r,0]:a>=2&&a<3?[0,r,h]:a>=3&&a<4?[0,h,r]:a>=4&&a<5?[h,0,r]:[r,0,h];const d=o-r/2,f=Math.round(255*(l+d)),p=Math.round(255*(c+d)),g=Math.round(255*(u+d));return`#${D(f).padStart(2,"0")}${D(p).padStart(2,"0")}${D(g).padStart(2,"0")}`}function j(t,e,s){let n;e=e.toLowerCase(),s=s.toLowerCase();const i=e.includes("hex")&&s.includes("rgb"),o=e.includes("rgb")&&s.includes("hsl"),r=e.includes("hsl")&&s.includes("hex"),a=e.includes("hsl")&&s.includes("hwb"),h=e.includes("hsl")&&s.includes("rgb"),l=e.includes("rgb")&&s.includes("hex"),c=e.includes("hex")&&s.includes("hsl");if(i)n=U(t);else if(o)n=X(t.red,t.green,t.blue);else if(r)n=H(t.hue,t.saturation,t.lightness);else if(a)n=function(t,e=100,s=50){if(t<0||t>360||e<0||e>100||s<0||s>100)throw new Error("Invalid HSL color values. Hue should be between 0 and 360, saturation and lightness should be between 0 and 100.");const n=e/100,i=s/100,o=t/360,r=1-Math.max(n,i),a=1-Math.min(n,i);return{hue:Math.round(360*o),whiteness:Math.round(100*r),blackness:Math.round(100*a)}}(t.hue,t.saturation,t.lightness);else if(h){n=U(H(t.hue,t.saturation,t.lightness))}else if(l){const e=X(t.red,t.green,t.blue);n=H(e.hue,e.saturation,e.lightness)}else{if(!c)throw new Error("Color model conversion error: Unsupported color model conversion");{const e=U(t);n=X(e.red,e.green,e.blue)}}return n}function G(t){const e=t.currentTarget,n=i(e,".colors__container"),o=s(".colors__input",n),r=o.value,a=o.id,{hue:h,saturation:l,lightness:c}=j(r,"hex","hsl");if(ht(n)||(0===l||0===c||100===c))return;u[a].type=a,u[a].hue=h,u[a].saturation=l,u[a].lightness=c;e.checked?u[a].animationId=m.set(50,J,o,u[a]):m.clear(u[a].animationId)}function J(t,e){e.hue+=2,e.hue%=360;let s=j(e,"hsl","hex");s=Y(s,"uppercase");const i=n(t);t.value=s,lt(i,s),l[e.type]=s}function K(t){const e=t.currentTarget.value;l.globalCompositeOperation=e}function Q(t){const e=t.currentTarget;l.tool=e.id}function Z(t){const e=t.currentTarget,n=V(e.id,"-")[0];l.shape=n;const o="polygon"!==n&&"star"!==n;l.hasEditableShape=!o;const r=i(e,"fieldset"),c=s("input#shape-sides-amount",r),u=s("input#shape-star-inner-radius",r);!0===l.hasEditableShape?a(c):h(c);"star"===n?a(u):h(u)}function tt(t){const e=t.currentTarget;if(isNaN(e.valueAsNumber))return;st(e,0,Number.POSITIVE_INFINITY);const s=F(o("for",n(e)));l[s]=e.valueAsNumber}function et(t){const e=t.currentTarget;if(isNaN(e.valueAsNumber))return;st(e,Number(e.min),Number(e.max));switch(F(o("for",n(e)))){case"shapeSidesAmount":l.sides=e.valueAsNumber;break;case"shapeStarInnerRadius":l.innerRadius=e.valueAsNumber}}function st(t,e=Number.NEGATIVE_INFINITY,s=Number.POSITIVE_INFINITY){const n=t.valueAsNumber;n>s&&(t.valueAsNumber=s);n<e&&(t.valueAsNumber=e)}function nt(t){const e=t.currentTarget,s=e.name;e.checked?d[s].id=m.set(10,it,e):m.clear(d[s].id)}function it(t){const e=t.name,n=i(t,".controls__brush-container"),o=s(".controls__input--range",n),r=o.valueAsNumber,a=Number(o.max),h=Number(o.min);r>=a&&(d[e].direction="backwards");r<=h&&(d[e].direction="forwards");const c="forwards"===d[e].direction;o.valueAsNumber=c?r+1:r-1;const u=`${o.valueAsNumber}`,f=o.name;l[f]=o.valueAsNumber,lt(n,u)}function ot(t){const e=t.currentTarget,s=e.valueAsNumber,i=n(e),o=e.name;l[o]=s,lt(i,s)}function rt(t){const e=t.currentTarget,i=Y(e.value,"uppercase"),o=n(e);lt(o,i);const r=s("div",n(o)),a=e.id,h=ht(r);l[a]=h?"transparent":i}function at(t){const e=t.currentTarget,o=V(e.id,"-")[0];if(e.checked){const t=Y(s("input[type=color]",n(i(e,"div"))).value,"uppercase");l[o]=t}else l[o]="transparent"}function ht(t){return!s("input[type=checkbox]",t).checked}function lt(t,e){s("span",t).textContent=e}const ct=s("canvas.index__canvas"),ut=t(ct),dt=s("fieldset.tools"),ft=(s("fieldset.colors"),s("fieldset.controls"),s("fieldset.shapes"));s("fieldset.miscellaneous");!function(){const t=e("tools__input",dt);for(const e of t)e.addEventListener("change",Q);s(".tools__button").addEventListener("click",(t=>{var e,s,n,i;s=ut,n=(e=ct).width,i=e.height,s.clearRect(0,0,n,i)}))}(),function(){const t=(e=".color__input--checkbox:not(input#fill-show, input#stroke-show)",n?n.tagName.includes("-")?Array.from(n.shadowRoot.querySelectorAll(e)):Array.from(n.querySelectorAll(e)):Array.from(document.querySelectorAll(e)));var e,n;for(const e of t)e.addEventListener("change",G);s(".colors__input--stroke-width").addEventListener("input",tt)}(),function(){const t=e("controls__input--checkbox");for(const e of t)e.addEventListener("change",nt);const s=e("input--color");for(const t of s)t.addEventListener("input",rt);const n=e("show-input");for(const t of n)t.addEventListener("change",at);const i=e("controls__input--range");for(const t of i)t.addEventListener("input",ot);const o=e("controls__input--number");for(const t of o)t.addEventListener("input",tt)}(),function(){const t=e("shapes__input--radio",ft);for(const e of t)e.addEventListener("change",Z);const s=e("shapes__input--number",ft);for(const t of s)t.addEventListener("input",et)}(),s(".miscellaneous__select").addEventListener("change",K),ct.addEventListener("mousemove",f),ct.addEventListener("mousedown",p),ct.addEventListener("mouseup",g),window.addEventListener("resize",gt);let pt=0;function gt(){const t=s("main.index"),{width:e,height:n}=t.getBoundingClientRect();ct.width=.97*e,ct.height=.97*n}gt();let mt=new class{constructor(e,{tool:s,fill:n,stroke:i,strokeWidth:o,size:r,angle:a,shadow:h,shadowBlur:l,shadowOffsetX:c,shadowOffsetY:u,hasEditableShape:d,shape:f,sides:p,innerRadius:g,globalCompositeOperation:m},{x:b,y:w,isDrawing:v}){this.canvas=e,this.context=t(this.canvas),this.updatePropertyValues({tool:s,fill:n,stroke:i,strokeWidth:o,size:r,angle:a,shadow:h,shadowBlur:l,shadowOffsetX:c,shadowOffsetY:u,hasEditableShape:d,shape:f,sides:p,innerRadius:g,globalCompositeOperation:m},{x:b,y:w,isDrawing:v}),x(this)}updatePropertyValues({tool:t,fill:e,stroke:s,strokeWidth:n,size:i,angle:o,shadow:r,shadowBlur:a,shadowOffsetX:h,shadowOffsetY:l,hasEditableShape:c,shape:u,sides:d,innerRadius:f,globalCompositeOperation:p},{x:g,y:m,isDrawing:x}){this.tool=t,this.fill=e,this.stroke=s,this.strokeWidth=n,this.size=i,this.angle=o,this.context.shadowColor=r,this.context.shadowBlur=a,this.context.shadowOffsetX=h,this.context.shadowOffsetY=l,this.hasEditableShape=c,this.shape=u,this.sides=d,this.innerRadius=f,this.context.globalCompositeOperation=p,this.x=g,this.y=m,this.isDrawing=x}drawOnCanvas(){if(!this.isDrawing)return;if("eraser"===this.tool)this.erase();else switch(this.shape){case"circle":this.drawCircle();break;case"square":this.drawSquare();break;case"star":this.drawStar();break;case"polygon":this.drawPolygon()}}drawCircle(){this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.beginPath(),this.context.arc(this.x,this.y,this.size,0,2*Math.PI),this.context.fill();this.strokeWidth>0&&this.context.stroke()}drawSquare(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.fillStyle=this.fill,this.context.fillRect(-this.size,-this.size,2*this.size,2*this.size),this.context.fill(),this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth;this.strokeWidth>0&&this.context.strokeRect(-this.size,-this.size,2*this.size,2*this.size),this.context.restore()}erase(){this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.fillStyle=this.fill,this.context.clearRect(-this.size,-this.size,2*this.size,2*this.size),this.context.fill(),this.context.restore()}drawStar(){this.context.save(),this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.beginPath(),this.context.moveTo(this.size,0);for(let t=1;t<2*this.sides;t++){const e=t%2==0?this.size:this.innerRadius,s=t*Math.PI/this.sides,n=e*Math.cos(s),i=e*Math.sin(s);this.context.lineTo(n,i)}this.context.closePath(),this.context.fill();this.strokeWidth>0&&this.context.stroke(),this.context.restore()}drawPolygon(){this.context.save(),this.context.fillStyle=this.fill,this.context.strokeStyle=this.stroke,this.context.lineWidth=this.strokeWidth,this.context.translate(this.x,this.y),this.context.rotate(this.angle*Math.PI/180),this.context.beginPath(),this.context.moveTo(this.size,0);for(let t=1;t<this.sides;t++){const e=t*Math.PI*2/this.sides,s=this.size*Math.cos(e),n=this.size*Math.sin(e);this.context.lineTo(s,n)}this.context.closePath(),this.context.fill();this.strokeWidth>0&&this.context.stroke(),this.context.restore()}}(ct,l,c);!function t(){mt.drawOnCanvas(),mt.updatePropertyValues(l,c),pt=requestAnimationFrame(t)}(),m.set(3500,(()=>{C("Tracker"),x(mt),M()}))})()})();