import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ key: "SILVERFISH", storage: window.localStorage })],
  state: {
    Novels: {},
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
    insertBookmark(state, payload) {
      Vue.set(state.Bookmarks, payload.novelID, payload.bookmark)
    }
  },
  getters: {
    isNovelIDExists: state => novelID => {
      return novelID in state.Novels
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
    getBookmarkByID: state => novelID => {
      return state.Bookmarks[novelID];
    }
  }
})