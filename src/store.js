import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ key: "SILVERFISH", storage: window.localStorage })],
  state: {
    Novels: {},
    Comics: {},
    Bookmarks: {}
  },
  mutations: {
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
        state.Novels[payload.novelID].lastCrawlTime = payload.novel.lastCrawlTime;
      }
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
      if (payload.comicID in state.COmics) {
        state.Comics[payload.comicID].chapters = payload.comic.chapters;
        state.Comics[payload.comicID].lastCrawlTime = payload.comic.lastCrawlTime;
      }
    },
    insertBookmark(state, payload) {
      Vue.set(state.Bookmarks, payload.novelID, payload.bookmark)
    }
  },
  getters: {
    isNovelIDExists: state => novelID => {
      return novelID in state.Novels
    },
    isNovelNeedUpdate: state => novelID => {
      let hour_offset = (new Date() - new Date(state.Novels[novelID].lastCrawlTime)) / 1000 / 60 / 60;
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
    isComicIDExists: state => comicID => {
      return comicID in state.Comics;
    },
    isComicNeedUpdate: state => comicID => {
      let hour_offset = (new Date() - new Date(state.Comics[comicID].lastCrawlTime)) / 1000 / 60 / 60;
      return hour_offset >= 24;
    },
    getComicByID: state => comicID => {
      return state.Comics[comicID];
    },
    getBookmarkByID: state => novelID => {
      return state.Bookmarks[novelID];
    }
  }
})