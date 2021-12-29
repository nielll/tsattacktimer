var tsAttackTimer;(()=>{"use strict";var t={698:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class n{constructor(){}static getMsFromString(t){const e=t.match(/\d+/g);return 60*Number(e[0])*60*1e3+60*Number(e[1])*1e3+1e3*Number(e[2])}static getMsFormated(t){var e=t/60/60/1e3,n=(t-3600*Math.floor(e)*1e3)/60/1e3,a=(t-3600*Math.floor(e)*1e3-60*Math.floor(n)*1e3)/1e3;return`(${Math.floor(e)}:${Math.floor(n)}:${Math.floor(a)})`}static updateTimeDOM(t,e,a,r){const i=n.now.getTime(),o=t.getTime()-i,s=setInterval((function(){const t=(new Date).getTime();e.value=a.replace(/\(.*\)/,"")+" "+n.getMsFormated(o-(t-i)),o-(t-i)<=0&&(clearInterval(s),r&&r.click())}),1e3);return s}static generateDateFromString(t){const e=t.match(/\d+/g),n=Number(e[0]),a=Number(e[1])-1,r=Number(e[2]),i=Number(e[3]),o=Number(e[4]),s=Number(e[5]),l=Number(e[6])?Number(e[6]):0;return new Date(new Date(r,a,n,i,o,s).setMilliseconds(l))}}e.default=n,n.now=new Date(Date.now()),n.correctTimeOffset=t=>{const e=60*n.now.getTimezoneOffset()*1e3;return new Date(t.getTime()-e)},n.toString=()=>{const t=n.now.toLocaleString().match(/^.*\s/g),e=n.now.toLocaleString().match(/\s.*$/g),[a,r,i]=t[0].trim().split("."),[o,s,l]=e[0].trim().split(":");return`${a}.${r}.${i} ${o}:${s}:${l}`}}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var i=e[a]={exports:{}};return t[a](i,i.exports,n),i.exports}var a={};(()=>{var t=a;const e=n(698);t.default=class{constructor(){this.execution=()=>{this.timedId&&clearInterval(this.timedId);const t=this._container.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2].innerHTML,n=this._container.getElementsByClassName("timedAction")[0].value,a=this._container.getElementsByClassName("troop_confirm_go")[0],r=new Date(e.default.generateDateFromString(n).getTime()-e.default.getMsFromString(t)),i=this._container.getElementsByClassName("troop_confirm_go")[0];if(e.default.now.getTime()>e.default.generateDateFromString(n).getTime()-e.default.getMsFromString(t))return alert("Time for attack is already passed!"),void(this.timedId&&clearInterval(this.timedId));this.timedId=e.default.updateTimeDOM(r,a,a.value,i)};const t=document.getElementById("popup_box_popup_command");!t||t.classList.contains("initialized")?t.classList.contains("initialized")?alert("already initialized!"):alert("Please run on attacking/supporting popup"):(console.log("tsAttackTimer initialized"),t.classList.add("initialized"),this._container=t)}static init(t){const n=t._container,a=n.getElementsByTagName("tbody")[0],r=a.getElementsByTagName("tr");if(!n||!a||!r)return;if(console.log(`===== Start Initialization: ${e.default.now} =====`),n.getElementsByTagName("button").length>0)return console.error("tsAttackTimer already running, please refresh and rerun script!");const i=document.createElement("tr"),o=new Date(e.default.now.getTime()+36e5);i.innerHTML=`\n     <td>Timed:</td>\n     <td id="date_arrival">\n      <input type="text" class="timedAction" value="${o.getDate()}.${o.getMonth()+1}.${o.getFullYear()} ${o.getUTCHours()}:${o.getMinutes()}:${o.getSeconds()}:${o.getMilliseconds()}" />\n      <button type="button" class="btn setTimedAction">Set Timing</button>\n     </td>\n     <script>\n     $("#command-data-form").submit(function(event){ \n      event.preventDefault(); \n     }); \n     <\/script>\n    `,a.appendChild(i),a.getElementsByClassName("setTimedAction")[0].onclick=function(e){e.preventDefault(),t.execution()}}}})(),tsAttackTimer=a.default})();