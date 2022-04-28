(function(){var e={2417:function(e,t,o){"use strict";o.d(t,{Z:function(){return c}});var n=o(3396),a=o(6265),i=o.n(a),r=o(5410),s=o(4677);function c(){const e=(0,s.pm)(),t=(0,n.FN)()?.appContext.config.globalProperties.$endpoint,o=i().create({baseURL:`${t}/auth`});function a(t){return new Promise(((n,a)=>o.get("/status",{headers:{Authorization:t}}).then((e=>!0===e.data.success?n(e.data.data):a(e.data.data))).catch((t=>e.error(`發生錯誤: ${t.toString()}`)))))}function c(t,n){return new Promise(((a,i)=>o.post("/register",(0,r.stringify)({recaptchaToken:t,...n})).then((e=>!0===e.data.success?a(e.data.data):i(e.data.data))).catch((t=>e.error(`發生錯誤: ${t.toString()}`)))))}function l(t,n,a){return new Promise(((i,s)=>o.post("/login",(0,r.stringify)({recaptchaToken:n,...a}),{headers:{Authorization:t}}).then((e=>!0===e.data.success?i({session:e.data.data.session,user:e.data.data.user}):s(e.data.data))).catch((t=>e.error(`發生錯誤: ${t.toString()}`)))))}function u(t){return new Promise((n=>o.get("/logout",{headers:{Authorization:t}}).then((()=>n(!0))).catch((t=>e.error(`發生錯誤: ${t.toString()}`)))))}function m(t){return new Promise(((n,a)=>o.get("/isAdmin",{headers:{Authorization:t}}).then((e=>e.data.success?n(e.data.data):a(e.data.data))).catch((t=>e.error(`發生錯誤: ${t.toString()}`)))))}return{authStatus:a,authRegister:c,authLogin:l,authLogout:u,authIsAdmin:m}}},4233:function(e,t,o){"use strict";var n=o(9242),a=o(5431);(0,a.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),window.location.reload()},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var i=o(7590),r=o(8125),s=o(8321),c=o(2274);r.vI.add(s.J9Y,s.eFW,s.FR9,s.X8G,c.X8G,s.nNP,s.YHc,s.sqG,s.cnt,c.nYk,s.ILF,s.ptq,s.rWw);var l=o(7749),u=(o(8937),o(4677)),m=(o(343),o(204)),d=o(990),v=o(3396);const g={id:"app"};function p(e,t,o,n,a,i){const r=(0,v.up)("navigator"),s=(0,v.up)("router-view"),c=(0,v.up)("foot");return(0,v.wg)(),(0,v.iD)("div",g,[(0,v.Wm)(r),(0,v.Wm)(s),(0,v.Wm)(c)])}var f=o(4870),h=o(566),b=o(3112),k=o(3196),w=o(6265),D=o.n(w);function y(){const e=(0,u.pm)(),t=(0,v.FN)()?.appContext.config.globalProperties.$endpoint,o=D().create({baseURL:`${t}/user`});function n(t){return new Promise(((n,a)=>o.get("/bookmark",{headers:{Authorization:t}}).then((e=>{if(e.data.success){const t={};Object.values(e.data.data.novel).forEach((e=>{t[e.ID]={...e,lastReadDatetime:new Date(e.lastReadDatetime)}}));const o={};return Object.values(e.data.data.comic).forEach((e=>{o[e.ID]={...e,lastReadDatetime:new Date(e.lastReadDatetime)}})),n({novel:t,comic:o})}return a(e.data.data)})).catch((t=>e.error(`發生錯誤: ${t.toString()}`)))))}return{latestBookmark:n}}var C=o(7139);const N=e=>((0,v.dD)("data-v-413e21b6"),e=e(),(0,v.Cn)(),e),_={id:"navigator",class:"navbar navbar-expand-lg navbar-dark"},I={class:"container-fluid"},x=N((()=>(0,v._)("a",{class:"navbar-brand"},"書蠹付梓 | 無縫閱讀",-1))),$=N((()=>(0,v._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,v._)("span",{class:"navbar-toggler-icon"})],-1))),B={id:"navbarNav",class:"navbar-collapse collapse row"},S={id:"left-nav",class:"navbar-nav col-8"},E={class:"nav-item"},T={class:"nav-link"},A=(0,v.Uk)(" 首頁 "),U={class:"nav-item"},L={class:"nav-link"},j=(0,v.Uk)(" 列表 "),P={key:0,class:"nav-item"},z={class:"nav-link"},O=(0,v.Uk)(" 後台 "),F={id:"right-nav",class:"navbar-nav col-4"},R={class:"nav-item dropdown"},Z={id:"navbarDropdown",class:"nav-link dropdown-toggle",href:"#",role:"button","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},H={class:"dropdown-menu dropdown-menu-lg-end","aria-labelledby":"navbarDropdown"},q={key:0},W={class:"dropdown-item",href:"#"},J=(0,v.Uk)("資訊"),M=N((()=>(0,v._)("div",{class:"dropdown-divider"},null,-1))),Y={key:1},G={class:"dropdown-item",href:"#"},V=N((()=>(0,v._)("a",{class:"dropdown-item"},"註冊",-1))),X=N((()=>(0,v._)("a",{class:"dropdown-item"},"登入",-1)));function K(e,t,o,n,a,i){const r=(0,v.up)("router-link"),s=(0,v.up)("font-awesome-icon");return(0,v.wg)(),(0,v.iD)("nav",_,[(0,v._)("div",I,[(0,v.Wm)(r,{to:{name:"home"}},{default:(0,v.w5)((()=>[x])),_:1}),$,(0,v._)("div",B,[(0,v._)("ul",S,[(0,v._)("li",E,[(0,v.Wm)(r,{to:{name:"home"}},{default:(0,v.w5)((()=>[(0,v._)("a",T,[(0,v.Wm)(s,{icon:"home"}),A])])),_:1})]),(0,v._)("li",U,[(0,v.Wm)(r,{to:{name:"list"}},{default:(0,v.w5)((()=>[(0,v._)("a",L,[(0,v.Wm)(s,{icon:"book-open"}),j])])),_:1})]),"admin"===e.user.account?((0,v.wg)(),(0,v.iD)("li",P,[(0,v.Wm)(r,{to:{name:"admin"}},{default:(0,v.w5)((()=>[(0,v._)("a",z,[(0,v.Wm)(s,{icon:"columns"}),O])])),_:1})])):(0,v.kq)("",!0)]),(0,v._)("ul",F,[(0,v._)("li",R,[(0,v._)("a",Z,[(0,v.Wm)(s,{icon:"user"})]),(0,v._)("div",H,[!0===e.isLogin?((0,v.wg)(),(0,v.iD)("div",q,[(0,v._)("a",W,(0,C.zw)(e.user.account),1),(0,v.Wm)(r,{to:{name:"userinfo"},class:"dropdown-item"},{default:(0,v.w5)((()=>[J])),_:1}),M,(0,v._)("a",{onClick:t[0]||(t[0]=t=>e.logout()),class:"dropdown-item",href:"#"},"登出")])):((0,v.wg)(),(0,v.iD)("div",Y,[(0,v._)("li",null,[(0,v._)("a",G,(0,C.zw)(e.user.account),1)]),(0,v._)("li",null,[(0,v.Wm)(r,{to:{name:"register"}},{default:(0,v.w5)((()=>[V])),_:1})]),(0,v._)("li",null,[(0,v.Wm)(r,{to:{name:"login"}},{default:(0,v.w5)((()=>[X])),_:1})])]))])])])])])])}var Q=o(678),ee=o(2417),te=(0,v.aZ)({setup(){const e=(0,Q.yj)(),t=(0,Q.tv)(),o=(0,k.oR)(),n=(0,u.pm)(),{authLogout:a,authStatus:i}=(0,ee.Z)(),r=(0,v.f3)("isLogin"),s=(0,v.f3)("session"),c=(0,v.Fl)((()=>o.getters["user/getUser"])),l=async()=>{await a(s.value),o.dispatch("auth/logout"),n("登出成功"),t.push({path:"/"})};return(0,v.YP)((()=>e.path),(async()=>{if(!1===r.value||""===s.value)return;const e=await i(s.value);!1===e&&(o.dispatch("auth/logout"),n.error("Session過期，請重新登入"))})),{store:o,isLogin:r,user:c,logout:l}}}),oe=o(89);const ne=(0,oe.Z)(te,[["render",K],["__scopeId","data-v-413e21b6"]]);var ae=ne;const ie=e=>((0,v.dD)("data-v-482fca30"),e=e(),(0,v.Cn)(),e),re={id:"foot"},se=(0,v.Uk)(" 本站所有圖文影來源皆為其他網站，"),ce=ie((()=>(0,v._)("br",{class:"d-md-none"},null,-1))),le=(0,v.Uk)("且針對所有內容未進行任何儲存。"),ue=ie((()=>(0,v._)("br",null,null,-1))),me=(0,v.Uk)(" Version   "),de=["href"],ve=ie((()=>(0,v._)("br",null,null,-1))),ge=ie((()=>(0,v._)("br",null,null,-1))),pe=ie((()=>(0,v._)("br",null,null,-1))),fe=(0,v.Uk)(" Service Mail: "),he=ie((()=>(0,v._)("a",{href:"mailto:service@silverfish.cc"},"service@silverfish.cc",-1)));function be(e,t,o,n,a,i){return(0,v.wg)(),(0,v.iD)("div",re,[(0,v._)("small",null,[se,ce,le,ue,me,(0,v._)("a",{href:`https://github.com/jackey8616/Silverfish-Vue/commit/${e.lastUpdateMasterHash}`,target:"_blank"},(0,C.zw)(e.lastUpdateMasterHash.slice(0,7)),9,de),ve,(0,v.Uk)(" Updated @ "+(0,C.zw)(e.lastUpdateMasterTime),1),ge,(0,v.Uk)(" Built @ "+(0,C.zw)(e.lastDeployTime),1),pe,fe,he])])}var ke=o(1883),we=(0,v.aZ)({setup(){const{formatDate:e}=(0,ke.Z)(),t=(0,f.iH)(""),o=(0,f.iH)(""),n=(0,f.iH)("");return(0,v.bv)((async()=>{const a=await D()({url:"https://api.github.com/repos/jackey8616/Silverfish-Vue/commits/master",method:"GET"}),i=await D()({url:"https://api.github.com/repos/jackey8616/Silverfish-Vue/deployments",method:"GET"});t.value=a.data.sha,o.value=e(a.data.commit.committer.date,!0),n.value=e(i.data[0].created_at,!0)})),{lastUpdateMasterHash:t,lastUpdateMasterTime:o,lastDeployTime:n}}});const De=(0,oe.Z)(we,[["render",be],["__scopeId","data-v-482fca30"]]);var ye=De,Ce=(0,v.aZ)({components:{Navigator:ae,Foot:ye},setup(){const{set:e}=(0,d.uT)(),t=(0,u.pm)(),{latestBookmark:o}=y(),n=(0,k.oR)(),a=(0,f.iH)(0),i=(0,f.iH)(0),r=(0,v.Fl)((()=>n.getters["user/isLogin"])),s=(0,v.Fl)((()=>n.getters["auth/getSession"])),c=()=>{!0===r.value&&o(s.value).then((e=>{n.commit("user/updateBookmark",e)})).catch((e=>{"SessionToken not exists"===e.reason?(n.dispatch("auth/logout"),t.error("不存在的Session，無法獲取書籤，請重新登入！")):console.error(e)}))};return(0,v.JJ)("height",a),(0,v.JJ)("withFootHeight",i),(0,v.JJ)("fetchBookmark",c),(0,v.JJ)("isLogin",r),(0,v.JJ)("session",s),(0,v.YP)((()=>n.getters["user/isLogin"]),(t=>{e(!0===t?{user_id:`${b.V.hashStr(n.getters["user/getUser"].account)}`}:{user_id:""})})),(0,v.bv)((()=>{(0,v.Y3)((()=>{const e=new h.Z((()=>{(0,v.Y3)((()=>{const e=document.getElementById("navigator"),t=document.getElementById("foot");null!==e&&(a.value=window.innerHeight-e.clientHeight,i.value=window.innerHeight-e.clientHeight-t.clientHeight)}))})),t=document.getElementById("navigator");e.observe(document.body),null!==t&&e.observe(t)}))})),{}}});const Ne=(0,oe.Z)(Ce,[["render",p]]);var _e=Ne;const Ie=(0,u.pm)(),xe=[{path:"/",name:"home",component:()=>o.e(177).then(o.bind(o,881))},{path:"/list",name:"list",component:()=>o.e(93).then(o.bind(o,2056))},{path:"/login",name:"login",component:()=>o.e(535).then(o.bind(o,837))},{path:"/register",name:"register",component:()=>o.e(685).then(o.bind(o,2437))},{path:"/userinfo",name:"userinfo",component:()=>o.e(944).then(o.bind(o,7597)),meta:{requiresAuth:!0}},{path:"/admin",name:"admin",component:()=>o.e(328).then(o.bind(o,6458)),meta:{requiresAuth:!0,requiresAdmin:!0}},{path:"/info/:type/:id",name:"info",component:()=>o.e(996).then(o.bind(o,3758)),props:!0},{path:"/novel/:novelID",name:"novel",component:()=>Promise.all([o.e(505),o.e(374)]).then(o.bind(o,5519)),props:!0},{path:"/comic/:comicID",name:"comic",component:()=>Promise.all([o.e(505),o.e(493)]).then(o.bind(o,1975)),props:!0}],$e=(0,Q.p7)({history:(0,Q.r5)(),routes:xe});$e.beforeEach((async e=>{if(e.matched.some((e=>e.meta.requiresAuth))){if(!1===k.ZP.getters["user/isLogin"])return Ie.error("請先登入!"),{path:"/login",query:{redirect:e.path}};if(!0===k.ZP.getters["auth/isSessionExpired"])return Ie.error("閒置過長，請重新登入！"),{path:"/login",query:{redirect:e.path}};if(e.matched.some((e=>e.meta.requiresAdmin)))return!0===k.ZP.getters["user/isAdmin"]||(Ie.error("安安你不是管理員ㄛ~"),!1)}return!0})),(0,d.iq)($e);var Be=$e;function Se(e,t,o,n,a,i){return(0,v.wg)(),(0,v.iD)("div",{style:(0,C.j5)({width:`${e.size}px`,height:`${e.size}px`})},[(0,v._)("div",{style:(0,C.j5)([{width:"100%",height:"100%"},{width:`${e.size}px !important`,height:`${e.size}px !important`,"-webkit-transform":`translate(-${e.size}px, -${e.size}px)scale(1) translate(${e.size}px, ${e.size}px)`,transform:`translate(-${e.size}px, -${e.size}px) scale(1) translate(${e.size}px, ${e.size}px)`}]),class:"lds-eclipse"},[(0,v._)("div",{style:(0,C.j5)({"box-shadow":`0 ${2*e.scale}px 0 0 #0089d0`,top:10*e.scale+"px",left:10*e.scale+"px",width:80*e.scale+"px",height:80*e.scale+"px","-webkit-transform-origin":`${40*e.scale}px ${41*e.scale}px`,"transform-origin":`${40*e.scale}px ${41*e.scale}px`})},null,4)],4)],4)}var Ee=(0,v.aZ)({props:["size"],setup(e){const t=(0,f.iH)(1);return(0,v.bv)((()=>{t.value=e.size.value/100})),{scale:t}}});const Te=(0,oe.Z)(Ee,[["render",Se],["__scopeId","data-v-6f008e1c"]]);var Ae=Te;const Ue=(0,n.ri)(_e);Ue.config.globalProperties.$endpoint="https://silverfish-backend.clo5de.info:2087",Ue.config.globalProperties.$apiVersionRoute="/api/v1",Ue.directive("observe-visibility",{beforeMount:(e,t,o)=>{o.context=t.instance,i.Sq.bind(e,t,o)},updated:(e,t,o)=>{o.context=t.instance,i.Sq.update(e,t,o)},unmounted:i.Sq.unbind}),Ue.component("font-awesome-icon",l.GN),Ue.component("loading",Ae),Ue.use(k.ZP,k.Jy).use(Be).use(u.ZP).use(m.Z).use(d.ZP,{isEnabled:!0,property:{id:"G-NR4E79EJ0F",params:{send_page_view:!0}}}).mount("#app")},3196:function(e,t,o){"use strict";o.d(t,{ZP:function(){return S},Jy:function(){return $},oR:function(){return B}});var n=o(65),a=o(2415);const i="auth",r=()=>({token:"",expireDatetime:new Date(0)}),s={getSession:"getSession",isSessionExpired:"isSessionExpired"},c={[s.getSession]:e=>e.token,[s.isSessionExpired]:e=>new Date(0).getTime()>=e.expireDatetime.getTime()},l={login:"login",logout:"logout"},u={[l.login](e,t){e.token=t.token,e.expireDatetime=new Date(t.expireDatetime)},[l.logout](e){e.token="",e.expireDatetime=new Date(0)}},m={async login({commit:e},t){e("auth/login",t.session,{root:!0}),e("user/login",t.user,{root:!0})},async logout({commit:e}){e("auth/logout",void 0,{root:!0}),e("user/logout",void 0,{root:!0}),e("book/removeNovelsByCondition",(e=>!e.isEnable),{root:!0}),e("book/removeComicsByCondition",(e=>!e.isEnable),{root:!0})}},d={namespaced:!0,state:r,getters:c,actions:m,mutations:u},v="user",g=()=>({isAdmin:!1,account:"guest",registerDatetime:new Date(0),lastLoginDatetime:new Date(0),bookmark:{novel:{},comic:{}}}),p={isLogin:"isLogin",isAdmin:"isAdmin",getUser:"getUser",getNovelBookmarkByID:"getNovelBookmarkByID",getComicBookmarkByID:"getComicBookmarkByID"},f={[p.isLogin]:e=>""!==e.account&&"guest"!==e.account,[p.isAdmin]:(e,t)=>t.isLogin&&e.isAdmin,[p.getUser]:e=>e,[p.getNovelBookmarkByID]:e=>t=>e.bookmark.novel[t],[p.getComicBookmarkByID]:e=>t=>e.bookmark.comic[t]},h={login:"login",logout:"logout",updateBookmark:"updateBookmark",insertNovelBookmark:"insertNovelBookmark",insertComicBookmark:"insertComicBookmark"},b={[h.login](e,t){e.isAdmin=t.isAdmin,e.account=t.account,e.registerDatetime=new Date(t.registerDatetime),e.lastLoginDatetime=new Date(t.lastLoginDatetime),e.bookmark={novel:null==t.bookmark.novel?{}:t.bookmark.novel,comic:null==t.bookmark.comic?{}:t.bookmark.comic}},[h.logout](e){e.isAdmin=!1,e.account="guest",e.registerDatetime=new Date(0),e.lastLoginDatetime=new Date(0),e.bookmark={novel:{},comic:{}}},[h.updateBookmark](e,t){e.bookmark=t},[h.insertNovelBookmark](e,t){const{novelID:o,bookmark:n}=t;e.bookmark.novel[o]=n},[h.insertComicBookmark](e,t){const{comicID:o,bookmark:n}=t;e.bookmark.comic[o]=n}},k={},w={namespaced:!0,state:g,getters:f,actions:k,mutations:b},D="book",y=()=>({Novels:{},Comics:{}}),C={isNovelIDExists:"isNovelIDExists",isNovelNeedUpdate:"isNovelNeedUpdate",getNovelByID:"getNovelByID",getNovelByURL:"getNovelByURL",isComicIDExists:"isComicIDExists",isComicNeedUpdate:"isComicNeedUpdate",getComicByID:"getComicByID"},N={[C.isNovelIDExists]:e=>t=>t in e.Novels,[C.isNovelNeedUpdate]:e=>t=>{const o=((new Date).getTime()-e.Novels[t].lastCrawlTime.getTime())/36e5;return o>=24},[C.getNovelByID]:e=>t=>e.Novels[t],[C.getNovelByURL]:e=>t=>{for(const o of Object.values(e.Novels))if(o.url===t)return o;return null},[C.isComicIDExists]:e=>t=>t in e.Comics,[C.isComicNeedUpdate]:e=>t=>{const o=((new Date).getTime()-e.Comics[t].lastCrawlTime.getTime())/36e5;return o>=24},[C.getComicByID]:e=>t=>e.Comics[t]},_={insertNovel(e,t){const{novelID:o,novel:n}=t;e.Novels[o]=n},upsertNovel(e,t){const{novelID:o}=t;e.Novels[o]=o in e.Novels?{...e.Novels[o],...t}:t},updateNovel(e,t){t.novelID in e.Novels&&(e.Novels[t.novelID].chapters=t.novel.chapters,e.Novels[t.novelID].lastCrawlTime=new Date(t.novel.lastCrawlTime))},removeNovelsByCondition(e,t){Object.values(e.Novels).filter((e=>t(e))).forEach((t=>delete e.Novels[t.novelID]))},insertComic(e,t){const{comicID:o,comic:n}=t;e.Comics[o]=n},upsertComic(e,t){const{comicID:o}=t;e.Comics[o]=o in e.Comics?{...e.Comics[o],...t}:t},updateComic(e,t){t.comicID in e.Comics&&(e.Comics[t.comicID].chapters=t.comic.chapters,e.Comics[t.comicID].lastCrawlTime=new Date(t.comic.lastCrawlTime))},removeComicsByCondition(e,t){Object.values(e.Comics).filter((e=>t(e))).forEach((t=>delete e.Comics[t.comicID]))}},I={},x={namespaced:!0,state:y,getters:N,actions:I,mutations:_},$=Symbol("store");function B(){return(0,n.oR)($)}var S=(0,n.MT)({plugins:[(0,a.Z)({key:"SILVERFISH",storage:{getItem:e=>{const t=window.localStorage.getItem(e);if(null!==t){const e=JSON.parse(t),o=e[i];o.expireDatetime=new Date(o.expireDatetime);const n=e[D],a=Object.values(n.Novels),r=Object.values(n.Comics);n.Novels={},n.Comics={},a.forEach((e=>{n.Novels[e.novelID]={...e,lastCrawlTime:new Date(e.lastCrawlTime)}})),r.forEach((e=>{n.Comics[e.comicID]={...e,lastCrawlTime:new Date(e.lastCrawlTime)}}));const s=e[v],c=Object.values(s.bookmark.novel),l=Object.values(s.bookmark.comic);return s.bookmark.novel={},s.bookmark.comic={},c.forEach((e=>{s.bookmark.novel[e.ID]={...e,lastReadDatetime:new Date(e.lastReadDatetime)}})),l.forEach((e=>{s.bookmark.comic[e.ID]={...e,lastReadDatetime:new Date(e.lastReadDatetime)}})),e}return t},setItem:(e,t)=>window.localStorage.setItem(e,t),removeItem:e=>window.localStorage.removeItem(e)}})],modules:{[i]:d,[v]:w,[D]:x}})},1883:function(e,t,o){"use strict";function n(){function e(e,t){const o=e instanceof Date?e:new Date(e),n=`0${o.getMonth()+1}`.slice(-2),a=`0${o.getDate()}`.slice(-2),i=`0${o.getHours()}`.slice(-2),r=`0${o.getMinutes()}`.slice(-2);if(void 0===t||!1===t)return`${o.getFullYear()}/${n}/${a} ${i}:${r}`;const s=`0${o.getSeconds()}`.slice(-2);return`${o.getFullYear()}/${n}/${a} ${i}:${r}:${s}`}function t(e){const t=e instanceof Date?e:new Date(e),o=t.getFullYear().toString().substr(-2),n=`0${t.getMonth()+1}`.slice(-2),a=`0${t.getDate()}`.slice(-2);return`${o}/${n}/${a}`}return{formatDate:e,simpleFormatDate:t}}o.d(t,{Z:function(){return n}})},4654:function(){}},t={};function o(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.m=e,function(){var e=[];o.O=function(t,n,a,i){if(!n){var r=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],i=e[u][2];for(var s=!0,c=0;c<n.length;c++)(!1&i||r>=i)&&Object.keys(o.O).every((function(e){return o.O[e](n[c])}))?n.splice(c--,1):(s=!1,i<r&&(r=i));if(s){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,a,i]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/"+({93:"list",177:"home",328:"admin",374:"novel",493:"comic",535:"login",685:"register",944:"userinfo",996:"info"}[e]||e)+"."+{93:"47491c85",177:"2eeb962f",328:"c033b3c5",374:"c0ac3d6a",493:"482e2c0f",505:"8d2021a9",535:"7a04ce5d",685:"f9dff533",944:"a36a0b00",996:"a46cb89d"}[e]+".js"}}(),function(){o.miniCssF=function(e){return"css/"+{93:"list",177:"home",374:"novel",493:"comic",535:"login",685:"register",944:"userinfo",996:"info"}[e]+"."+{93:"7a18f2e3",177:"4863148f",374:"58869cad",493:"9e650d5a",535:"7c14839b",685:"af27e95c",944:"8e113941",996:"a75ecf81"}[e]+".css"}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="silverfish:";o.l=function(n,a,i,r){if(e[n])e[n].push(a);else{var s,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var m=l[u];if(m.getAttribute("src")==n||m.getAttribute("data-webpack")==t+i){s=m;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.setAttribute("data-webpack",t+i),s.src=n),e[n]=[a];var d=function(t,o){s.onerror=s.onload=null,clearTimeout(v);var a=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((function(e){return e(o)})),t)return t(o)},v=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/"}(),function(){var e=function(e,t,o,n){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(i){if(a.onerror=a.onload=null,"load"===i.type)o();else{var r=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=s,a.parentNode.removeChild(a),n(c)}};return a.onerror=a.onload=i,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var o=document.getElementsByTagName("link"),n=0;n<o.length;n++){var a=o[n],i=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(i===e||i===t))return a}var r=document.getElementsByTagName("style");for(n=0;n<r.length;n++){a=r[n],i=a.getAttribute("data-href");if(i===e||i===t)return a}},n=function(n){return new Promise((function(a,i){var r=o.miniCssF(n),s=o.p+r;if(t(r,s))return a();e(n,s,a,i)}))},a={143:0};o.f.miniCss=function(e,t){var o={93:1,177:1,374:1,493:1,535:1,685:1,944:1,996:1};a[e]?t.push(a[e]):0!==a[e]&&o[e]&&t.push(a[e]=n(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={143:0};o.f.j=function(t,n){var a=o.o(e,t)?e[t]:void 0;if(0!==a)if(a)n.push(a[2]);else{var i=new Promise((function(o,n){a=e[t]=[o,n]}));n.push(a[2]=i);var r=o.p+o.u(t),s=new Error,c=function(n){if(o.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var i=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+r+")",s.name="ChunkLoadError",s.type=i,s.request=r,a[1](s)}};o.l(r,c,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,i,r=n[0],s=n[1],c=n[2],l=0;if(r.some((function(t){return 0!==e[t]}))){for(a in s)o.o(s,a)&&(o.m[a]=s[a]);if(c)var u=c(o)}for(t&&t(n);l<r.length;l++)i=r[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},n=self["webpackChunksilverfish"]=self["webpackChunksilverfish"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(4233)}));n=o.O(n)})();
//# sourceMappingURL=app.fa0bbc6e.js.map