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
Vue.prototype.$backend = "http://silverfish-backend.clo5de.info:8080"
Vue.prototype.$vuex = store;

Vue.prototype.$fetchNovelByID = function (id) {
  return new Promise(async (resolve, reject) => {
    let res = await axios({
      url: Vue.prototype.$backend + "/fetch_novel",
      method: "POST",
      data: {
        "novel_id": id
      }
    })

    const novel = res.data.Rtn;
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
  })
}

Vue.component('navigator', Navigator)
Vue.directive('observe-visibility', ObserveVisibility)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
