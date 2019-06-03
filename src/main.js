import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from './store';

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
import "bootstrap/dist/css/bootstrap.css";
import "./registerServiceWorker";
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
  store,
  render: h => h(App)
}).$mount("#app");
