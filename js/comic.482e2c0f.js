"use strict";(self["webpackChunksilverfish"]=self["webpackChunksilverfish"]||[]).push([[493],{1975:function(e,t,a){a.r(t),a.d(t,{default:function(){return D}});var i=a(3396),l=a(7139);const n=e=>((0,i.dD)("data-v-1f0dd363"),e=e(),(0,i.Cn)(),e),c={id:"article",class:"container"},o={key:0,class:"row"},u={class:"col-12"},r={id:"comic"},s=["src","alt"],v=n((()=>(0,i._)("br",null,null,-1))),d=n((()=>(0,i._)("br",null,null,-1)));function m(e,t,a,n,m,h){const g=(0,i.up)("reader-nav"),p=(0,i.up)("loading"),I=(0,i.up)("center"),k=(0,i.Q2)("observe-visibility");return(0,i.wg)(),(0,i.iD)("div",{id:"content",style:(0,l.j5)({"min-height":`${e.height}px`})},[(0,i._)("div",c,[0!==Object.keys(e.comic).length?((0,i.wg)(),(0,i.iD)("div",o,[(0,i.Wm)(g,{type:"comic",id:e.comicID,currentIndex:e.currentIndex,onChangeIndex:e.onChangeIndex,chapterLength:e.comic.chapters.length},null,8,["id","currentIndex","onChangeIndex","chapterLength"]),(0,i._)("div",u,[(0,i._)("div",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.sections,(t=>((0,i.wg)(),(0,i.iD)("div",{key:t.index},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.content,(a=>((0,i.wg)(),(0,i.iD)("img",{key:a,referrerpolicy:"no-referrer",style:(0,l.j5)(e.getStyle(a)),src:a,alt:t.index.toString()},null,12,s)))),128)),(0,i.wy)((0,i._)("hr",null,null,512),[[k,{callback:(a,i)=>e.observe(a,i,t)}]])])))),128))]),(0,i._)("div",null,[v,d,(0,i.Wm)(I,null,{default:(0,i.w5)((()=>[(0,i.Wm)(p,{size:150})])),_:1})])])])):(0,i.kq)("",!0)])],4)}var h=a(4870),g=a(678),p=a(990),I=a(3196),k=a(3849),y=a(7885),b=(0,i.aZ)({components:{ReaderNav:y.Z},setup(){const{pageview:e,event:t}=(0,p.uT)(),a=(0,g.yj)(),l=(0,I.oR)(),{fetchComicByID:n,fetchComicChapter:c}=(0,k.Z)(),o=(0,i.f3)("height"),u=(0,i.f3)("session"),r=(0,h.iH)(""),s=(0,h.iH)(!1),v=(0,h.iH)(!1),d=(0,h.qj)([]),m=(0,h.iH)(0),y=(0,h.iH)(1),b=(0,h.iH)(0),x=(0,i.Fl)((()=>l.getters["user/getComicBookmarkByID"](r.value)||{})),f=(0,i.Fl)((()=>l.getters["book/getComicByID"](r.value)||{})),D=async e=>{const a=await c(u.value,r.value,e);return t("read",{event_category:"comic",event_label:`${r.value}-${f.value.title}`,value:e}),{index:e,content:a}},w=async()=>{d.splice(0),m.value=y.value-1,b.value=y.value-1,await D(m.value).then((e=>d.push(e))),m.value+=1,await D(m.value).then((e=>d.push(e))),m.value+=1},C=async()=>{if(r.value=a.params.comicID,l.getters["book/isComicIDExists"](r.value)){const e=l.getters["book/getComicByID"](r.value);(void 0===e.chapters||l.getters["book/isComicNeedUpdate"](r.value))&&await n(u.value,r.value).then((e=>l.commit("book/updateComic",{comicID:r.value,comic:e}))),y.value=x.value.lastReadIndex||y.value}else await n(u.value,r.value).then((e=>l.commit("book/insertComic",{comicID:r.value,comic:e})));w()},_=e=>{y.value=e,w()},H=e=>e.endsWith("20%")?{width:"20%"}:{},B=(e,t,a)=>{e&&b.value<a.index&&(y.value=a.index+1,b.value=a.index,x.value.lastReadIndex=y.value,l.commit("user/insertComicBookmark",{comicID:f.value.comicID,bookmark:x.value}),!v.value&&m.value-y.value<1&&(v.value=!0,D(m.value).then((e=>d.push(e))),m.value+=1,setTimeout((()=>{v.value=!1}),1e3)))};return(0,i.bv)((()=>{C(),e({page_title:f.value.title})})),{height:o,comicID:r,loading:v,lightOn:s,sections:d,fetchIndex:m,currentIndex:y,transitIndex:b,bookmark:x,comic:f,onChangeIndex:_,getStyle:H,observe:B}}}),x=a(89);const f=(0,x.Z)(b,[["render",m],["__scopeId","data-v-1f0dd363"]]);var D=f}}]);
//# sourceMappingURL=comic.482e2c0f.js.map