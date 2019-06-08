import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from './store';
import "./registerServiceWorker";

// Vue-Observe-Visibility
import { ObserveVisibility } from 'vue-observe-visibility'
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHome, faArrowRight, faLightbulb as fasLightbulb,
  faLink, faInfoCircle, faBookOpen
} from '@fortawesome/free-solid-svg-icons'
import { faLightbulb as farLightbulb, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Bootstrap
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.css";
// Vue-Toasted
import Toasted from 'vue-toasted';

import Navigator from '@/components/Navigator'

axios.defaults.withCredentials = false;

library.add(
  faHome, faArrowRight, fasLightbulb, farLightbulb,
  faLink, faInfoCircle, faBookOpen, faTimesCircle);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//Vue.prototype.$backend = "http://127.0.0.1:8080"
Vue.prototype.$backend = "https://silverfish-backend.clo5de.info:2087"
Vue.prototype.$api_ver = "/api/v1"
Vue.prototype.$vuex = store;

Vue.prototype.$fetchNovels = function () {
  return new Promise(async (resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/novels",
      method: "GET"
    })

    if (res.data.success) {
      return resolve(res.data.data)
    } else {
      return reject(res.data.data)
    }
  })
}

Vue.prototype.$fetchNovelByID = function (novelID) {
  return new Promise(async (resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/novel",
      method: "GET",
      headers: {
        //"Reader": Vue.prototype.$vuex.getters.getAuth().account
      },
      params: {
        "novel_id": novelID
      }
    })

    if (res.data.success) {
      const novel = res.data.data;
      return resolve({
        novelID: novel.novelID,
        author: novel.author,
        description: novel.description,
        dns: novel.dns,
        url: novel.url,
        title: novel.title,
        cover_url: novel.coverUrl,
        articles: novel.chapters,
        lastCrawlTime: novel.lastCrawlTime
      });
    } else {
      return reject(res.data.data);
    }
  })
}

Vue.prototype.$fetchChapter = function (novelID, chapterIndex) {
  return new Promise(async (resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/chapter",
      method: "GET",
      headers: {
        //"Reader": Vue.prototype.$vuex.getters.getAuth().account
      },
      params: {
        "novel_id": novelID,
        "chapter_index": chapterIndex
      }
    })
    if (res.data.success) {
      return resolve(res.data.data)
    } else {
      return reject(res.data.data)
    }
  })
}

Vue.prototype.$fetchComics = function () {
  return new Promise(async(resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/comics",
      method: "GET"
    })

    if (res.data.success) {
      return resolve(res.data.data)
    } else {
      return reject(res.data.data)
    }
  })
}

Vue.prototype.$fetchComicByID = function (comicID) {
  return new Promise(async(resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/comic",
      method: "GET",
      headers: {
        //"Reader": Vue.prototype.$vuex.getters.getAuth().account
      },
      params: {
        "comic_id": comicID
      }
    })

    if (res.data.success) {
      const comic = res.data.data;
      return resolve({
        comicID: comic.comicID,
        author: comic.author,
        description: comic.description,
        dns: comic.dns,
        url: comic.url,
        title: comic.title,
        cover_url: comic.coverUrl,
        chapters: comic.chapters,
        lastCrawlTime: comic.lastCrawlTime
      });
    } else {
      return reject(res.data.data);
    }
  })
}

Vue.prototype.$fetchComicChapter = function (comicID, chapterIndex) {
  return new Promise(async (resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/comic/chapter",
      method: "GET",
      headers: {
        //"Reader": Vue.prototype.$vuex.getters.getAuth().account
      },
      params: {
        "comic_id": comicID,
        "chapter_index": chapterIndex
      }
    })
    if (res.data.success) {
      return resolve(res.data.data)
    } else {
      return reject(res.data.data)
    }
  })
}

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('navigator', Navigator)
Vue.directive('observe-visibility', ObserveVisibility)
Vue.use(Toasted, {
  duration: 5000,
  keepOnHover: true,
  iconPack: "fontawesome",
  theme: "bubble"
})

new Vue({
  router,
  metaInfo: () => {
    return {
      htmlAttrs: {
        prefix: 'og: http://ogp.me/ns#',
        lang: 'zh-Hant-TW'
      },
      title: '首頁',
      titleTemplate: '%s - 書蠹付梓 | 無縫閱讀',
      meta: [
        { charset: 'utf-8' },
        { vmid: 'description', name: 'description', content: '提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。' },
        { vmid: 'og:title', property: 'og:title', content: '首頁', template: chunk => `${chunk}  - 書蠹付梓 | 無縫閱讀` },
        { vmid: 'og:site_name', property: 'og:site_name', content: '書蠹付梓 | 無縫閱讀' },
        { vmid: 'og:url' , property: 'og:url', content:'', template: chunk => `https://silverfish.cc/#/${chunk}` },
        { vmid: 'os:description', property: 'og:description', content: '提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。' },
        { vmid: 'os:image', property: 'og:image', content: '' },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { property: 'fb:app_id', content: '1284931168337983' },
      ]
    }
  },
  store,
  render: h => h(App)
}).$mount("#app");
