import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({ key: "SILVERFISH", storage: window.localStorage })
  ],
  state: {
    session: "",
    auth: {
      account: "guest",
      registerDatetime: "",
      lastLoginDatetime: "",
      bookmark: {
        novel: {},
        comic: {}
      }
    },
    Novels: {},
    Comics: {}
  },
  mutations: {
    login(state, payload) {
      state.session = payload.session;
      state.auth.account = payload.user.account;
      state.auth.registerDatetime = payload.user.registerDatetime;
      state.auth.lastLoginDatetime = payload.user.lastLoginDatetime;
      state.auth.bookmark = {
        novel:
          payload.user.bookmark.novel == null
            ? {}
            : payload.user.bookmark.novel,
        comic:
          payload.user.bookmark.comic == null ? {} : payload.user.bookmark.comic
      };
    },
    logout(state) {
      state.session = "";
      state.auth = {
        account: "guest",
        registerDatetime: "",
        lastLoginDatetime: "",
        bookmark: {
          novel: {},
          comic: {}
        }
      };
    },
    updateBookmark(state, payload) {
      state.auth.bookmark = payload;
    },
    insertNovel(state, payload) {
      Vue.set(state.Novels, payload.novelID, payload.novel);
    },
    upsertNovel(state, payload) {
      if (payload.novelID in state.Novels) {
        for (let each in payload) {
          state.Novels[payload.novelID][each] = payload[each];
        }
      } else {
        Vue.set(state.Novels, payload.novelID, payload);
      }
    },
    updateNovel(state, payload) {
      if (payload.novelID in state.Novels) {
        state.Novels[payload.novelID]["chapters"] = payload.novel.chapters;
        state.Novels[payload.novelID]["lastCrawlTime"] =
          payload.novel.lastCrawlTime;
      }
    },
    insertNovelBookmark(state, payload) {
      Vue.set(state.auth.bookmark.novel, payload.novelID, payload.bookmark);
    },
    insertComic(state, payload) {
      Vue.set(state.Comics, payload.comicID, payload.comic);
    },
    upsertComic(state, payload) {
      if (payload.comicID in state.Comics) {
        for (let each in payload) {
          state.Comics[payload.comicID][each] = payload[each];
        }
      } else {
        Vue.set(state.Comics, payload.comicID, payload);
      }
    },
    updateComic(state, payload) {
      if (payload.comicID in state.Comics) {
        state.Comics[payload.comicID]["chapters"] = payload.comic.chapters;
        state.Comics[payload.comicID]["lastCrawlTime"] =
          payload.comic.lastCrawlTime;
      }
    },
    insertComicBookmark(state, payload) {
      Vue.set(state.auth.bookmark.comic, payload.comicID, payload.bookmark);
    }
  },
  getters: {
    isLogging: state => () => {
      return state.auth.account !== "" && state.auth.account !== "guest";
    },
    getSession: state => () => {
      return state.session;
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
      return state.auth.bookmark.novel[novelID];
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
      return state.auth.bookmark.comic[comicID];
    }
  }
});
