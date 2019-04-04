import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { ObserveVisibility } from 'vue-observe-visibility'
import "bootstrap/dist/css/bootstrap.css";
import "./registerServiceWorker";

import Navigator from '@/components/Navigator'
import store from './store';

axios.defaults.withCredentials = false;
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
      url: Vue.prototype.$backend + Vue.prototype.$api_ver + "/chapter_new",
      method: "GET",
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

Vue.component('navigator', Navigator)
Vue.directive('observe-visibility', ObserveVisibility)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
