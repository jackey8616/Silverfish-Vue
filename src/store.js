import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({ key: "SILVERFISH", storage: window.localStorage })
  ],
  state: {
    auth: {
      account: "guest",
      registerDatetime: "",
      lastLoginDatetime: "",
      bookmark: {
        Novel: {},
        Comic: {}
      }
    },
    Novels: {},
    Comics: {},
    Omine: {
      toggle: true,
      loginID: "9d70aae19ef74a69b0d8b1be64d3b498",
      thread: "-1",
      throttle: 50
    }
  },
  mutations: {
    login(state, payload) {
      state.auth.account = payload.account;
      state.auth.registerDatetime = payload.registerDatetime;
      state.auth.lastLoginDatetime = payload.lastLoginDatetime;
      state.auth.bookmark = {
        Novel: payload.bookmark.Novel == null ? {} : payload.bookmark.Novel,
        Comic: payload.bookmark.Comic == null ? {} : payload.bookmark.Comic
      };
    },
    logout(state) {
      state.auth = {
        account: "guest",
        registerDatetime: "",
        lastLoginDatetime: "",
        bookmark: {
          Novel: {},
          Comic: {}
        }
      };
    },
    insertNovel(state, payload) {
      Vue.set(state.Novels, payload.novelID, payload.novel);
    },
    upsertNovel(state, payload) {
      if (payload.novelID in state.Novels) {
        state.Novels[payload.novelID] = payload.novel;
      } else {
        Vue.set(state.Novels, payload.novelID, payload.novel);
      }
    },
    updateNovel(state, payload) {
      if (payload.novelID in state.Novels) {
        state.Novels[payload.novelID].chapters = payload.novel.chapters;
        state.Novels[payload.novelID].lastCrawlTime =
          payload.novel.lastCrawlTime;
      }
    },
    insertNovelBookmark(state, payload) {
      Vue.set(state.auth.bookmark.Novel, payload.novelID, payload.bookmark);
    },
    insertComic(state, payload) {
      Vue.set(state.Comics, payload.comicID, payload.comic);
    },
    upsertComic(state, payload) {
      if (payload.comicID in state.Comics) {
        state.Comics[payload.comicID] = payload.comic;
      } else {
        Vue.set(state.Comics, payload.comicID, payload.comic);
      }
    },
    updateComic(state, payload) {
      if (payload.comicID in state.Comics) {
        state.Comics[payload.comicID].chapters = payload.comic.chapters;
        state.Comics[payload.comicID].lastCrawlTime =
          payload.comic.lastCrawlTime;
      }
    },
    insertComicBookmark(state, payload) {
      Vue.set(state.auth.bookmark.Comic, payload.comicID, payload.bookmark);
    }
  },
  getters: {
    isLogging: state => () => {
      return state.auth.account !== "" && state.auth.account !== "guest";
    },
    getAuth: state => () => {
      return state.auth;
    },
    isNovelIDExists: state => novelID => {
      return novelID in state.Novels;
    },
    isNovelNeedUpdate: state => novelID => {
      let hour_offset =
        (new Date() - new Date(state.Novels[novelID].lastCrawlTime)) / 3600000;
      return hour_offset >= 24;
    },
    getNovelByID: state => novelID => {
      return state.Novels[novelID];
    },
    getNovelByURL: state => novelURL => {
      for (let novel in Object.values(state.Novels)) {
        if (novel.url === novelURL) {
          return novel;
        }
      }
      return null;
    },
    getNovelBookmarkByID: state => novelID => {
      return state.auth.bookmark.Novel[novelID];
    },
    isComicIDExists: state => comicID => {
      return comicID in state.Comics;
    },
    isComicNeedUpdate: state => comicID => {
      let hour_offset =
        (new Date() - new Date(state.Comics[comicID].lastCrawlTime)) / 3600000;
      return hour_offset >= 24;
    },
    getComicByID: state => comicID => {
      return state.Comics[comicID];
    },
    getComicBookmarkByID: state => comicID => {
      return state.auth.bookmark.Comic[comicID];
    }
  }
});
