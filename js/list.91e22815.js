"use strict";(self["webpackChunksilverfish"]=self["webpackChunksilverfish"]||[]).push([[93],{3849:function(t,e,n){n.d(e,{Z:function(){return N}});var r=n(3396),o=n(6265),a=n.n(o),l=(n(7658),n(1474));function i(t,e,n,r,o,a,l){try{var i=t[a](l),s=i.value}catch(c){return void n(c)}i.done?e(s):Promise.resolve(s).then(r,o)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function l(t){i(a,r,o,l,s,"next",t)}function s(t){i(a,r,o,l,s,"throw",t)}l(void 0)}))}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v="axios-retry";function _(t){return!t.response&&Boolean(t.code)&&"ECONNABORTED"!==t.code&&l(t)}var f=["get","head","options"],p=f.concat(["put","delete"]);function m(t){return"ECONNABORTED"!==t.code&&(!t.response||t.response.status>=500&&t.response.status<=599)}function h(t){return!!t.config&&(m(t)&&-1!==f.indexOf(t.config.method))}function E(t){return!!t.config&&(m(t)&&-1!==p.indexOf(t.config.method))}function y(t){return _(t)||E(t)}function D(){return 0}function g(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=100*Math.pow(2,t),n=.2*e*Math.random();return e+n}function R(t){var e=t[v]||{};return e.retryCount=e.retryCount||0,t[v]=e,e}function C(t,e){return u(u({},e),t[v])}function T(t,e){t.defaults.agent===e.agent&&delete e.agent,t.defaults.httpAgent===e.httpAgent&&delete e.httpAgent,t.defaults.httpsAgent===e.httpsAgent&&delete e.httpsAgent}function w(t,e,n,r){return b.apply(this,arguments)}function b(){return b=s((function*(t,e,n,r){var o=n.retryCount<t&&e(r);if("object"===typeof o)try{var a=yield o;return!1!==a}catch(l){return!1}return o})),b.apply(this,arguments)}function I(t,e){t.interceptors.request.use((t=>{var e=R(t);return e.lastRequestTime=Date.now(),t})),t.interceptors.response.use(null,function(){var n=s((function*(n){var{config:r}=n;if(!r)return Promise.reject(n);var{retries:o=3,retryCondition:a=y,retryDelay:l=D,shouldResetTimeout:i=!1,onRetry:s=(()=>{})}=C(r,e),c=R(r);if(yield w(o,a,c,n)){c.retryCount+=1;var u=l(c.retryCount,n);if(T(t,r),!i&&r.timeout&&c.lastRequestTime){var d=Date.now()-c.lastRequestTime,v=r.timeout-d-u;if(v<=0)return Promise.reject(n);r.timeout=v}return r.transformRequest=[t=>t],s(c.retryCount,n,r),new Promise((e=>setTimeout((()=>e(t(r))),u)))}return Promise.reject(n)}));return function(t){return n.apply(this,arguments)}}())}I.isNetworkError=_,I.isSafeRequestError=h,I.isIdempotentRequestError=E,I.isNetworkOrIdempotentRequestError=y,I.exponentialDelay=g,I.isRetryableError=m;var O=n(4677);function N(){const t=(0,O.pm)(),e=(0,r.FN)()?.appContext.config.globalProperties.$endpoint,n=(0,r.FN)()?.appContext.config.globalProperties.$apiVersionRoute,o=`${e}${n}`,l=a().create({baseURL:`${o}/novels`}),i=a().create({baseURL:`${o}/comics`});function s(e){return new Promise(((n,r)=>l.get("",{headers:{Authorization:e}}).then((t=>t.data.success?n(t.data.data.map((t=>({...t,lastCrawlTime:new Date(t.lastCrawlTime)})))):r(t.data.data))).catch((e=>t.error(`發生錯誤: ${e.toString()}`)))))}function c(e,n){return new Promise(((r,o)=>l.get(`/${n}`,{headers:{Authorization:e}}).then((t=>{if(t.data.success){const e=t.data.data;return r({isEnable:e.isEnable,novelID:e.novelID,author:e.author,description:e.description,dns:e.dns,url:e.url,title:e.title,cover_url:e.coverUrl,chapters:e.chapters,lastCrawlTime:new Date(e.lastCrawlTime)})}return o(t.data.data)})).catch((e=>t.error(`發生錯誤: ${e.toString()}`)))))}function u(e,n,r){return new Promise(((o,a)=>l.get(`/${n}/chapter/${r}`,{headers:{Authorization:e}}).then((t=>t.data.success?o(t.data.data):a(t.data.data))).catch((e=>t.error(`發生錯誤: ${e.toString()}`)))))}function d(e){return new Promise(((n,r)=>i.get("",{headers:{Authorization:e}}).then((t=>t.data.success?n(t.data.data.map((t=>({...t,lastCrawlTime:new Date(t.lastCrawlTime)})))):r(t.data.data))).catch((e=>t.error(`發生錯誤: ${e.toString()}`)))))}function v(e,n){return new Promise(((r,o)=>i.get(`/${n}`,{headers:{Authorization:e}}).then((t=>{if(t.data.success){const e=t.data.data;return r({comicID:e.comicID,author:e.author,description:e.description,dns:e.dns,url:e.url,title:e.title,cover_url:e.coverUrl,chapters:e.chapters,lastCrawlTime:new Date(e.lastCrawlTime)})}return o(t.data.data)})).catch((e=>t.error(`發生錯誤: ${e.toString()}`)))))}function _(e,n,r){return new Promise(((o,a)=>i.get(`/${n}/chapter/${r}`,{headers:{Authorization:e}}).then((t=>t.data.success?o(t.data.data):a(t.data.data))).catch((e=>t.error(`發生錯誤: ${e.toString()}`)))))}return I(l,{retries:3}),I(i,{retries:3}),{$endpointRoute:o,fetchNovels:s,fetchNovelByID:c,fetchNovelChapter:u,fetchComics:d,fetchComicByID:v,fetchComicChapter:_}}},1474:function(t){const e=new Set(["ENOTFOUND","ENETUNREACH","UNABLE_TO_GET_ISSUER_CERT","UNABLE_TO_GET_CRL","UNABLE_TO_DECRYPT_CERT_SIGNATURE","UNABLE_TO_DECRYPT_CRL_SIGNATURE","UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY","CERT_SIGNATURE_FAILURE","CRL_SIGNATURE_FAILURE","CERT_NOT_YET_VALID","CERT_HAS_EXPIRED","CRL_NOT_YET_VALID","CRL_HAS_EXPIRED","ERROR_IN_CERT_NOT_BEFORE_FIELD","ERROR_IN_CERT_NOT_AFTER_FIELD","ERROR_IN_CRL_LAST_UPDATE_FIELD","ERROR_IN_CRL_NEXT_UPDATE_FIELD","OUT_OF_MEM","DEPTH_ZERO_SELF_SIGNED_CERT","SELF_SIGNED_CERT_IN_CHAIN","UNABLE_TO_GET_ISSUER_CERT_LOCALLY","UNABLE_TO_VERIFY_LEAF_SIGNATURE","CERT_CHAIN_TOO_LONG","CERT_REVOKED","INVALID_CA","PATH_LENGTH_EXCEEDED","INVALID_PURPOSE","CERT_UNTRUSTED","CERT_REJECTED","HOSTNAME_MISMATCH"]);t.exports=t=>!e.has(t&&t.code)},2204:function(t,e,n){n.r(e),n.d(e,{default:function(){return nt}});var r=n(3396),o=n(7139);const a=t=>((0,r.dD)("data-v-2ac3eb51"),t=t(),(0,r.Cn)(),t),l={class:"container"},i=a((()=>(0,r._)("h1",null,"Novels",-1))),s={key:0,class:"row"},c={key:1},u=a((()=>(0,r._)("hr",null,null,-1))),d=a((()=>(0,r._)("h1",null,"Comics",-1))),v={key:2,class:"row"},_={key:3};function f(t,e,n,a,f,p){const m=(0,r.up)("card-carousel"),h=(0,r.up)("loading"),E=(0,r.up)("center");return(0,r.wg)(),(0,r.iD)("div",{id:"content",style:(0,o.j5)({"min-height":`${t.height}px`})},[(0,r._)("div",l,[i,0!==t.novels.length?((0,r.wg)(),(0,r.iD)("div",s,[(0,r.Wm)(m,{list:t.novels},null,8,["list"])])):((0,r.wg)(),(0,r.iD)("div",c,[(0,r.Wm)(E,null,{default:(0,r.w5)((()=>[(0,r.Wm)(h,{size:150})])),_:1})])),u,d,0!==t.comics.length?((0,r.wg)(),(0,r.iD)("div",v,[(0,r.Wm)(m,{list:t.comics},null,8,["list"])])):((0,r.wg)(),(0,r.iD)("div",_,[(0,r.Wm)(E,null,{default:(0,r.w5)((()=>[(0,r.Wm)(h,{size:150})])),_:1})]))])],4)}var p=n(4870),m=n(2483),h=n(3196),E=n(3849);const y=t=>((0,r.dD)("data-v-d3340d32"),t=t(),(0,r.Cn)(),t),D={style:{width:"100%",height:"100%"}},g=y((()=>(0,r._)("span",{class:"carousel-control-prev-icon","aria-hidden":"true"},null,-1))),R=y((()=>(0,r._)("span",{class:"sr-only"},"Previous",-1))),C=[g,R],T=y((()=>(0,r._)("span",{class:"carousel-control-next-icon","aria-hidden":"true"},null,-1))),w=y((()=>(0,r._)("span",{class:"sr-only"},"Next",-1))),b=[T,w];function I(t,e,n,a,l,i){const s=(0,r.up)("list-card");return(0,r.wg)(),(0,r.iD)("div",{class:"carousel",onScroll:e[4]||(e[4]=(...e)=>t.scrolling&&t.scrolling(...e))},[(0,r._)("div",{class:"inner",ref:"innerEl",style:(0,o.j5)(t.innerStyles)},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.cards,(t=>((0,r.wg)(),(0,r.iD)("div",{class:"card col-6 col-md-2 col-sm-1",key:t},[(0,r._)("div",D,[(0,r.Wm)(s,{entry:t},null,8,["entry"])])])))),128))],4),(0,r._)("a",{class:"carousel-control-prev",role:"button",tabindex:"0",onClick:e[0]||(e[0]=(...e)=>t.prev&&t.prev(...e)),onKeydown:e[1]||(e[1]=(...e)=>t.prev&&t.prev(...e))},C,32),(0,r._)("a",{class:"carousel-control-next",role:"button",tabindex:"0",onClick:e[2]||(e[2]=(...e)=>t.next&&t.next(...e)),onKeydown:e[3]||(e[3]=(...e)=>t.next&&t.next(...e))},b,32)],32)}n(7658),n(541);const O=t=>((0,r.dD)("data-v-bf27d8fc"),t=t(),(0,r.Cn)(),t),N={class:"list-card"},A=["alt"],L={class:"text-info-section d-none d-lg-block"},P={style:{"text-align":"left"}},S={style:{"text-align":"right"}},$={class:"icon-info-section d-none d-lg-block"},U=O((()=>(0,r._)("small",{tag:"small",class:"btn-xm btn-color-2 intro"},"簡介",-1))),x=O((()=>(0,r._)("small",{class:"btn-xm btn-color-3 intro"},"閱讀",-1))),j=O((()=>(0,r._)("br",null,null,-1))),k={class:"btn-xm btn-color-1 intro"},F=O((()=>(0,r._)("br",null,null,-1))),H={class:"d-md-none"},B={class:"btn-xm btn-color-2 intro"},W={class:"btn-xm btn-color-3 intro"},z=O((()=>(0,r._)("br",null,null,-1))),G={class:"btn-xm btn-color-1 intro"};function q(t,e,n,a,l,i){const s=(0,r.up)("router-link"),c=(0,r.up)("font-awesome-icon"),u=(0,r.Q2)("lazy");return(0,r.wg)(),(0,r.j4)(s,{to:{path:void 0!==t.entry.novelID?`/novel/${t.entry.novelID}`:`/comic/${t.entry.comicID}`}},{default:(0,r.w5)((()=>[(0,r._)("div",N,[(0,r.wy)((0,r._)("img",{alt:t.entry.title,referrerpolicy:"no-referrer"},null,8,A),[[u,t.entry.coverUrl]]),(0,r._)("div",L,[(0,r._)("div",P,[(0,r._)("h6",null,[(0,r._)("strong",null,(0,o.zw)(t.entry.title),1)])]),(0,r._)("div",S,[(0,r._)("small",null,(0,o.zw)(t.entry.author)+" / 著",1)])]),(0,r._)("div",$,[(0,r.Wm)(s,{to:{path:"/info/"+(void 0!==t.entry.novelID?`novel/${t.entry.novelID}`:`comic/${t.entry.comicID}`)}},{default:(0,r.w5)((()=>[U])),_:1},8,["to"]),(0,r.Uk)("   "),(0,r.Wm)(s,{to:{path:void 0!==t.entry.novelID?`/novel/${t.entry.novelID}`:`/comic/${t.entry.comicID}`}},{default:(0,r.w5)((()=>[x])),_:1},8,["to"]),j,(0,r._)("small",k,(0,o.zw)(t.formatDate(t.entry.lastCrawlTime,!0)),1),F]),(0,r._)("div",H,[(0,r.Wm)(s,{to:{path:"/info/"+(void 0!==t.entry.novelID?`novel/${t.entry.novelID}`:`comic/${t.entry.comicID}`)}},{default:(0,r.w5)((()=>[(0,r._)("small",B,[(0,r.Wm)(c,{icon:"info-circle"})])])),_:1},8,["to"]),(0,r.Uk)("   "),(0,r.Wm)(s,{to:{path:void 0!==t.entry.novelID?`/novel/${t.entry.novelID}`:`/comic/${t.entry.comicID}`}},{default:(0,r.w5)((()=>[(0,r._)("small",W,[(0,r.Wm)(c,{icon:"book-open"})])])),_:1},8,["to"]),z,(0,r._)("small",G,(0,o.zw)(t.simpleFormatDate(t.entry.lastCrawlTime)),1)])])])),_:1},8,["to"])}var Z=n(1883),X=(0,r.aZ)({name:"list-card",props:["entry"],setup(){const{formatDate:t,simpleFormatDate:e}=(0,Z.Z)();return{formatDate:t,simpleFormatDate:e}}}),Y=n(89);const V=(0,Y.Z)(X,[["render",q],["__scopeId","data-v-bf27d8fc"]]);var M=V,K=(0,r.aZ)({props:["list"],components:{ListCard:M},setup(t){const e=(0,p.iH)(null),n=(0,p.Vh)(t,"list"),o=(0,p.iH)({}),a=(0,p.iH)("0px"),l=(0,p.iH)(!1),i=()=>{const t=e.value.scrollWidth,r=n.value.length;a.value=t/r+"px"},s=()=>{o.value={transform:`translateX(-${a.value})\n                    translateX(-${a.value})`}},c=()=>{o.value={transform:`translateX(${a.value})\n                    translateX(-${a.value})`}},u=t=>{const n=()=>{t(),e.value.removeEventListener("transitionend",n)};e.value.addEventListener("transitionend",n)},d=()=>{o.value={transition:"none",transform:`translateX(-${a.value})`}},v=()=>{l.value||(l.value=!0,s(),u((()=>{console.log(11);const t=n.value.shift();n.value.push(t),d(),l.value=!1})))},_=()=>{l.value||(l.value=!0,c(),u((()=>{const t=n.value.pop();n.value.unshift(t),d(),l.value=!1})))},f=t=>{const{clientHeight:e,scrollHeight:n,scrollTop:r}=t.target;console.log("Yay!")};return(0,r.bv)((()=>{i(),d()})),{cards:n,innerEl:e,innerStyles:o,next:v,prev:_,scrolling:f}}});const J=(0,Y.Z)(K,[["render",I],["__scopeId","data-v-d3340d32"]]);var Q=J,tt=(0,r.aZ)({components:{CardCarousel:Q},setup(){(0,m.yj)();const t=(0,h.oR)(),e=(0,r.f3)("height"),n=(0,r.f3)("fetchBookmark"),o=(0,r.f3)("session"),{fetchComics:a,fetchNovels:l}=(0,E.Z)(),i=(0,p.qj)([]),s=(0,p.qj)([]),c=()=>{l(o.value).then((e=>{Object.assign(i,e),i.forEach((e=>t.commit("book/upsertNovel",e)))})),a(o.value).then((e=>{Object.assign(s,e),s.forEach((e=>t.commit("book/upsertComic",e)))}))};return(0,r.bv)((()=>{c(),n()})),{height:e,novels:i,comics:s}}});const et=(0,Y.Z)(tt,[["render",f],["__scopeId","data-v-2ac3eb51"]]);var nt=et}}]);
//# sourceMappingURL=list.91e22815.js.map