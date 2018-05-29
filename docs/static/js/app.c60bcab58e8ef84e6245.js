webpackJsonp([1],[,,,,,,function(t,e,n){"use strict";var a=n(25),i=(n.n(a),n(26));n.n(i);e.a={name:"app"}},function(t,e,n){"use strict";var a=n(32),i=n(35),o=n(38),c=n(41),s=n(63);e.a={name:"home",components:{webcam:a.a,timer:i.a,photo:o.a,actions:c.a,feedback:s.a},data:function(){return{feedbackMessage:"La aplicación necesita acceso a la cámara para funcionar",feedbackClass:"webcam",actionsAvailable:!1,trainingModeEnable:!0,timerSeconds:0,stillPhoto:""}}}},function(t,e,n){"use strict";e.a={name:"webcam",mounted:function(){var t=this;window.webcam=document.getElementById("webcam"),navigator.mediaDevices.getUserMedia({video:!0,audio:!1}).then(function(e){window.webcam.srcObject=e,window.webcam.play(),t.$parent.feedbackMessage="",t.$parent.feedbackClass="",t.$parent.actionsAvailable=!0}).catch(function(t){console.log("An error occured! "+t)})}}},function(t,e,n){"use strict";e.a={name:"timer",props:{seconds:{type:Number,default:0}},data:function(){return{countdown:0,play:!1}},watch:{countdown:function(){var t=this;t.countdown>0&&(t.play=!0,window.setTimeout(function(){t.play=!1},950),window.setTimeout(function(){t.countdown--},1e3))}},mounted:function(){document.getElementById("timer").style.top=window.webcam.offsetTop+"px",this.countdown=this.seconds}}},function(t,e,n){"use strict";e.a={name:"photo",props:{source:{type:String,default:"#"}},mounted:function(){document.getElementById("photo").style.top=window.webcam.offsetTop+"px"}}},function(t,e,n){"use strict";var a=n(43),i=n.n(a);e.a={name:"actions",data:function(){return{settingKey:""}},methods:{takePicture:function(t){var e=this;e.$parent.actionsAvailable=!1,window.setTimeout(function(){e.$parent.timerSeconds=5,window.setTimeout(function(){var n=document.createElement("canvas"),a=n.getContext("2d");n.width=960,n.height=720,a.drawImage(window.webcam,0,0,960,720),n.toBlob(function(n){e.getURL(t).then(function(a){e.upload(n,a.data.url).then(function(n){e.$parent.feedbackClass="success "+t,window.setTimeout(function(){e.$parent.feedbackClass="",e.$parent.stillPhoto=""},500),window.setTimeout(function(){e.$parent.actionsAvailable=!0},1e3)}).catch(function(t){e.handleError(t)})}).catch(function(t){e.handleError(t)})},"image/jpeg",1);var i=n.toDataURL("image/jpeg");e.$parent.timerSeconds=0,e.$parent.stillPhoto=i,e.$parent.feedbackClass="loading"},5e3)},1e3)},keydown:function(t){var e=this;if(""===e.settingKey)switch(t.keyCode){case parseInt(localStorage.getItem("firstKey")):document.getElementById("neutral").click();break;case parseInt(localStorage.getItem("secondKey")):document.getElementById("happy").click();break;case parseInt(localStorage.getItem("thirdKey")):document.getElementById("angry").click();break;case parseInt(localStorage.getItem("fourthKey")):document.getElementById("sad").click()}else localStorage.setItem(e.settingKey,t.keyCode),e.settingKey=""},getURL:function(t){return i.a.post("https://openwhisk.ng.bluemix.net/api/v1/web/tic%40ort.edu.ar_TIC/default/upload.json",{content_type:"image/jpeg",category:t})},upload:function(t,e){return i()({method:"put",url:e,headers:{"content-type":t.type},data:t})},handleError:function(t){var e=this;e.$parent.feedbackMessage="Ha ocurrido un error al enviar la imagen",e.$parent.feedbackClass="error",console.log("Uploading error!",t),window.setTimeout(function(){e.$parent.feedbackMessage="",e.$parent.feedbackClass="",e.$parent.stillPhoto=""},3e3),window.setTimeout(function(){e.$parent.actionsAvailable=!0},3500)},holdingAction:function(t,e){var n=this;t?n.keyboardTimeout=window.setTimeout(function(){window.alert("Presione la tecla que desea configurar a continuación."),n.settingKey=e},3e3):clearTimeout(n.keyboardTimeout)}},mounted:function(){document.getElementById("actions").style.top=window.webcam.offsetTop+"px",document.addEventListener("keydown",this.keydown,!1)},destroyed:function(){document.removeEventListener("keydown",this.keydown,!0)}}},,,,,,function(t,e,n){"use strict";e.a={name:"feedback",props:{message:{type:String,default:""}},mounted:function(){document.getElementById("feedback").style.top=window.webcam.offsetTop+"px"}}},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=n(22),o=n(28),c=n(18),s=n(67),r=n(68),u=n.n(r);c.default.library.add(s.a),a.a.component("font-awesome-icon",u.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:o.a,template:"<App/>",components:{App:i.a}})},,,function(t,e,n){"use strict";function a(t){n(23)}var i=n(6),o=n(27),c=n(1),s=a,r=c(i.a,o.a,!1,s,null,null);e.a=r.exports},function(t,e){},,function(t,e){},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},function(t,e,n){"use strict";var a=n(4),i=n(29),o=n(30);a.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Home",component:o.a}]})},,function(t,e,n){"use strict";function a(t){n(31)}var i=n(7),o=n(66),c=n(1),s=a,r=c(i.a,o.a,!1,s,"data-v-d47af39c",null);e.a=r.exports},function(t,e){},function(t,e,n){"use strict";function a(t){n(33)}var i=n(8),o=n(34),c=n(1),s=a,r=c(i.a,o.a,!1,s,"data-v-596b1bf1",null);e.a=r.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("video",{attrs:{id:"webcam",width:"960",height:"720"}})},i=[],o={render:a,staticRenderFns:i};e.a=o},function(t,e,n){"use strict";function a(t){n(36)}var i=n(9),o=n(37),c=n(1),s=a,r=c(i.a,o.a,!1,s,"data-v-071cedf4",null);e.a=r.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mask",attrs:{id:"timer"}},[n("span",{staticClass:"animated",class:{zoomOut:t.play}},[t._v(t._s(t.countdown))])])},i=[],o={render:a,staticRenderFns:i};e.a=o},function(t,e,n){"use strict";function a(t){n(39)}var i=n(10),o=n(40),c=n(1),s=a,r=c(i.a,o.a,!1,s,"data-v-63941410",null);e.a=r.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"mask",attrs:{src:t.source,width:"960",height:"720",alt:"Webcam´s still photo",id:"photo"}})},i=[],o={render:a,staticRenderFns:i};e.a=o},function(t,e,n){"use strict";function a(t){n(42)}var i=n(11),o=n(62),c=n(1),s=a,r=c(i.a,o.a,!1,s,"data-v-347c495e",null);e.a=r.exports},function(t,e){},,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mask",attrs:{id:"actions"}},[n("h3",[t._v("Ayuda a entrenar la Inteligencia Artifical mostrándo cómo siete un Argentin@")]),t._v(" "),n("h2",[t._v("¿Qué sentimiento vas a hacer?")]),t._v(" "),n("div",{staticClass:"buttons"},[n("button",{attrs:{id:"neutral"},on:{click:function(e){t.takePicture("neutral")},mousedown:function(e){t.holdingAction(!0,"firstKey")},mouseup:function(e){t.holdingAction(!1)}}},[t._v("Neutral")]),t._v(" "),n("button",{attrs:{id:"happy"},on:{click:function(e){t.takePicture("happy")},mousedown:function(e){t.holdingAction(!0,"secondKey")},mouseup:function(e){t.holdingAction(!1)}}},[t._v("Feliz")]),t._v(" "),n("button",{attrs:{id:"angry"},on:{click:function(e){t.takePicture("angry")},mousedown:function(e){t.holdingAction(!0,"thirdKey")},mouseup:function(e){t.holdingAction(!1)}}},[t._v("Enojado")]),t._v(" "),n("button",{attrs:{id:"sad"},on:{click:function(e){t.takePicture("sad")},mousedown:function(e){t.holdingAction(!0,"fourthKey")},mouseup:function(e){t.holdingAction(!1)}}},[t._v("Triste")])])])},i=[],o={render:a,staticRenderFns:i};e.a=o},function(t,e,n){"use strict";function a(t){n(64)}var i=n(17),o=n(65),c=n(1),s=a,r=c(i.a,o.a,!1,s,"data-v-0d55653f",null);e.a=r.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mask",attrs:{id:"feedback"}},[n("span",[t._v(t._s(t.message))])])},i=[],o={render:a,staticRenderFns:i};e.a=o},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",[n("header",[n("h1",[t._v("FanaTIC")]),t._v(" "),n("label",{class:{enable:t.trainingModeEnable}},[n("span",[t._v("Training mode")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.trainingModeEnable,expression:"trainingModeEnable"}],attrs:{type:"checkbox",disabled:"disabled"},domProps:{checked:Array.isArray(t.trainingModeEnable)?t._i(t.trainingModeEnable,null)>-1:t.trainingModeEnable},on:{change:function(e){var n=t.trainingModeEnable,a=e.target,i=!!a.checked;if(Array.isArray(n)){var o=t._i(n,null);a.checked?o<0&&(t.trainingModeEnable=n.concat([null])):o>-1&&(t.trainingModeEnable=n.slice(0,o).concat(n.slice(o+1)))}else t.trainingModeEnable=i}}})])]),t._v(" "),n("webcam"),t._v(" "),t.timerSeconds>0?n("timer",{attrs:{seconds:t.timerSeconds}}):t._e(),t._v(" "),n("transition",{attrs:{"enter-active-class":"burnIn","leave-active-class":"animated bounceOutUp"}},[""!==t.stillPhoto?n("photo",{attrs:{source:t.stillPhoto}}):t._e()],1),t._v(" "),n("transition",{attrs:{"enter-active-class":"animated zoomInDown","leave-active-class":"animated fadeOut"}},[t.actionsAvailable?n("actions"):t._e()],1),t._v(" "),n("transition",{attrs:{"leave-active-class":"animated fadeOut"}},[""!==t.feedbackMessage||""!==t.feedbackClass?n("feedback",{class:t.feedbackClass,attrs:{message:t.feedbackMessage}}):t._e()],1),t._v(" "),n("footer",[t._m(0),t._v(" "),n("div",{staticClass:"right"},[n("a",{staticClass:"twitter",attrs:{href:"https://twitter.com/TIC_ORT",target:"_blank",title:"TIC en Twitter"}},[n("font-awesome-icon",{attrs:{icon:["fab","twitter"]}})],1),t._v(" "),n("a",{staticClass:"github",attrs:{href:"https://github.com/TIC-ORT/fanatic",target:"_blank",title:"FanaTIC en GitHub"}},[n("font-awesome-icon",{attrs:{icon:["fab","github"]}})],1)])])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"left"},[n("img",{attrs:{src:"./static/img/logos/ort.svg",width:"240",height:"102",alt:"Escuelas Técnica ORT"}}),t._v(" "),n("div",{staticClass:"watson"},[n("span",[t._v("Hecho con")]),t._v(" "),n("img",{attrs:{src:"./static/img/logos/watson.svg",width:"260",height:"76",alt:"IBM Watson"}})])])}],o={render:a,staticRenderFns:i};e.a=o}],[19]);
//# sourceMappingURL=app.c60bcab58e8ef84e6245.js.map