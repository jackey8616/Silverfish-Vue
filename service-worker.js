if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const u=s=>l(s,r),c={module:{uri:r},exports:o,require:u};e[r]=Promise.all(i.map((s=>c[s]||u(s)))).then((s=>(n(...s),o)))}}define(["./workbox-2d118ab0"],(function(s){"use strict";s.setCacheNameDetails({prefix:"silverfish"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/.nojekyll",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/css/app.86e00e9d.css",revision:null},{url:"/css/chunk-vendors.5cf4c47b.css",revision:null},{url:"/css/comic.3229964b.css",revision:null},{url:"/css/home.4863148f.css",revision:null},{url:"/css/info.9900f76c.css",revision:null},{url:"/css/list.3b5d65b8.css",revision:null},{url:"/css/login.06bacebc.css",revision:null},{url:"/css/novel.25adb6f7.css",revision:null},{url:"/css/register.af27e95c.css",revision:null},{url:"/css/userinfo.f921dcd8.css",revision:null},{url:"/img/bg.b2c091e9.jpg",revision:null},{url:"/index.html",revision:"839b8fcbb92bd1f6de3e7a78d8497026"},{url:"/js/admin.69812d46.js",revision:null},{url:"/js/app.9ddf2bbd.js",revision:null},{url:"/js/chunk-vendors.6e94cbec.js",revision:null},{url:"/js/comic.563a034f.js",revision:null},{url:"/js/home.2eeb962f.js",revision:null},{url:"/js/info.96986776.js",revision:null},{url:"/js/list.d44fc3fc.js",revision:null},{url:"/js/login.3e4e448b.js",revision:null},{url:"/js/novel.6db3bfa0.js",revision:null},{url:"/js/register.8f24220d.js",revision:null},{url:"/js/userinfo.c2b383b1.js",revision:null},{url:"/manifest.json",revision:"fdac3e5918fb4e0c70892e490fef9047"},{url:"/robots.txt",revision:"82339bd1f2d9a6a79f4d757dfebc79e4"},{url:"/sitemap.xml",revision:"d5971c22568995e1120c3b176fc6348e"}],{})}));
//# sourceMappingURL=service-worker.js.map
