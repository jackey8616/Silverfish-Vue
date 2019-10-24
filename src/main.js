import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import APIUsecase from "./api";

// ResizeObserver
import ResizeObserver from 'resize-observer-polyfill';
// Vue-Observe-Visibility
import { ObserveVisibility } from "vue-observe-visibility";
// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faArrowRight,
  faLightbulb as fasLightbulb,
  faLink,
  faInfo,
  faInfoCircle,
  faBookOpen,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLightbulb as farLightbulb,
  faTimesCircle
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// Vue-Toasted
import Toasted from "vue-toasted";
// Vue-Js-Toggle-Button
import ToggleButton from 'vue-js-toggle-button'
// Vue-ScrollTo
import VueScrollTo from 'vue-scrollto';

import Navigator from "@/components/Navigator";
import Loading from "@/components/Loading";
import Foot from "@/components/Foot";

library.add(
  faHome,
  faArrowRight,
  fasLightbulb,
  farLightbulb,
  faLink,
  faInfo,
  faInfoCircle,
  faBookOpen,
  faTimesCircle,
  faUser,
  faChevronDown,
);

// const backend = "http://127.0.0.1:8080";
const backend = "https://silverfish-backend.clo5de.info:2087";
const api_ver = "/api/v1";

Vue.config.productionTip = false;
Vue.prototype.$vuex = store;
Vue.prototype.$api = new APIUsecase(backend, api_ver);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("navigator", Navigator);
Vue.component("loading", Loading);
Vue.component("foot", Foot);
Vue.directive("observe-visibility", ObserveVisibility);
Vue.use(Toasted, {
  duration: 2500,
  keepOnHover: true,
  iconPack: "fontawesome",
  theme: "bubble"
});
Vue.use(ToggleButton);
Vue.use(VueScrollTo);

new Vue({
  router,
  metaInfo: () => {
    return {
      htmlAttrs: {
        prefix: "og: http://ogp.me/ns#",
        lang: "zh-Hant-TW"
      },
      title: "首頁",
      titleTemplate: "%s - 書蠹付梓 | 無縫閱讀",
      meta: [
        { charset: "utf-8" },
        {
          vmid: "description",
          name: "description",
          content:
            "提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。"
        },
        {
          vmid: "og:title",
          property: "og:title",
          content: "首頁",
          template: chunk => `${chunk}  - 書蠹付梓 | 無縫閱讀`
        },
        {
          vmid: "og:site_name",
          property: "og:site_name",
          content: "書蠹付梓 | 無縫閱讀"
        },
        {
          vmid: "og:url",
          property: "og:url",
          content: "",
          template: chunk => `https://silverfish.cc/#/${chunk}`
        },
        {
          vmid: "og:description",
          property: "og:description",
          content:
            "提供流暢、無廣告的小說/漫畫閱覽，支援各平台裝置使用，無需下載任何App。"
        },
        { vmid: "og:image", property: "og:image", content: "" },
        { vmid: "og:type", property: "og:type", content: "website" },
        { property: "fb:app_id", content: "1284931168337983" }
      ],
      script: [
        {
          vmid: "ldjson-schema",
          innerHTML: "",
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        "ldjson-schema": ["innerHTML"]
      }
    };
  },
  store,
  data () {
    return {
      height: 0,
    }
  },
  mounted () {
    this.$nextTick(() => {
      const ro = new ResizeObserver((entries) => {
        this.$nextTick(() => {
          const el = document.getElementById('navigator');
          if (el != null)
            this.height = window.innerHeight - el.clientHeight;
        });
      });
      const el = document.getElementById('navigator');
      ro.observe(document.body);
      if (el != null) {
        ro.observe(el);
      }
    })
  },
  methods: {
    fetchBookmark () {
      if (this.$vuex.getters.isLogging() == true) {
        this.$api.fetchLatestBookmark(this.$vuex.getters.getSession())
          .then(data => {
            this.$vuex.commit("updateBookmark", data);
          }).catch(err => {
            console.log(err);
          });
      }
    },
    formatDate (dateStr, second) {
      let date = new Date(dateStr);
      let m = `0${date.getMonth() + 1}`.slice(-2);
      let d = `0${date.getDate()}`.slice(-2);
      let h = `0${date.getHours()}`.slice(-2);
      let M = `0${date.getMinutes()}`.slice(-2);
      if (second == undefined || second == false) {
        return `${date.getFullYear()}/${m}/${d} ${h}:${M}`; 
      } else {
        let s = `0${date.getSeconds()}`.slice(-2);
        return `${date.getFullYear()}/${m}/${d} ${h}:${M}:${s}`;
      }
    },
    simpleFormatDate (dateStr) {
      let date = new Date(dateStr);
      let y = date.getFullYear().toString().substr(-2);
      let m = `0${date.getMonth() + 1}`.slice(-2);
      let d = `0${date.getDate()}`.slice(-2);
      return `${y}/${m}/${d}`;
    }
  },
  render: h => h(App)
}).$mount("#app");
