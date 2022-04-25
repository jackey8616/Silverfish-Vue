// src/store/modules/user.ts
/* eslint-disable import/no-cycle, no-shadow, implicit-arrow-linebreak */
import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';

import {
  TStore, GettersReturnType, TCommit, TDispatch,
} from '@/store/type';
import {
  TRootActions, TRootGetters, TRootMutations, TRootState,
} from '@/store/index';
import { Bookmark, User } from '@/api/type';

export const moduleName = 'user';
type TModuleName = typeof moduleName;

export type TState = User;

const state: () => TState = () => ({
  isAdmin: false,
  account: 'guest',
  registerDatetime: new Date(0),
  lastLoginDatetime: new Date(0),
  bookmark: {
    novel: {},
    comic: {},
  },
});

const GettersTypes = {
  isLogin: 'isLogin',
  isAdmin: 'isAdmin',
  getUser: 'getUser',
  getNovelBookmarkByID: 'getNovelBookmarkByID',
  getComicBookmarkByID: 'getComicBookmarkByID',
} as const;
type VGettersTypes = (typeof GettersTypes)[keyof typeof GettersTypes];

export type TGetters = {
  readonly [key in VGettersTypes]: (
    /* eslint-disable-next-line max-len */
    state: TState, getters: GettersReturnType<TGetters, key>, rootState: TRootState, rootGetters: TRootGetters
  ) =>
    key extends typeof GettersTypes.isLogin ? boolean
  : key extends typeof GettersTypes.isAdmin ? boolean
  : key extends typeof GettersTypes.getUser ? TState
  : key extends typeof GettersTypes.getNovelBookmarkByID ? (novelID: string) => Bookmark
  : key extends typeof GettersTypes.getComicBookmarkByID ? (comicID: string) => Bookmark
  : void
  ;
};

/* eslint-disable @typescript-eslint/no-unused-vars, max-len */
const getters: GetterTree<TState, TRootState> & TGetters = {
  [GettersTypes.isLogin]: (state) => state.account !== '' && state.account !== 'guest',
  [GettersTypes.isAdmin]: (state, getters) => getters.isLogin && state.isAdmin,
  [GettersTypes.getUser]: (state) => state,
  [GettersTypes.getNovelBookmarkByID]: (state) => (novelID: string) => state.bookmark.novel[novelID],
  [GettersTypes.getComicBookmarkByID]: (state) => (comicID: string) => state.bookmark.comic[comicID],
};
/* eslint-enable @typescript-eslint/no-unused-vars, max-len */

const MutationsTypes = {
  login: 'login',
  logout: 'logout',
  updateBookmark: 'updateBookmark',
  insertNovelBookmark: 'insertNovelBookmark',
  insertComicBookmark: 'insertComicBookmark',
} as const;
export type TMutations = {
  [MutationsTypes.login](state: TState, payload: User): void;
  [MutationsTypes.logout](state: TState): void;
  [MutationsTypes.updateBookmark]<T extends {
    novel: Record<string, Bookmark>,
    comic: Record<string, Bookmark>,
  }>(state: TState, payload: T): void;
  [MutationsTypes.insertNovelBookmark]<T extends {
    novelID: string; bookmark: Bookmark;
  }>(state: TState, payload: T): void;
  [MutationsTypes.insertComicBookmark]<T extends {
    comicID: string; bookmark: Bookmark;
  }>(state: TState, payload: T): void;
};
const mutations: MutationTree<TState> & TMutations = {
  [MutationsTypes.login](state, payload) {
    state.isAdmin = payload.isAdmin;
    state.account = payload.account;
    state.registerDatetime = new Date(payload.registerDatetime);
    state.lastLoginDatetime = new Date(payload.lastLoginDatetime);
    state.bookmark = {
      novel: payload.bookmark.novel == null ? {} : payload.bookmark.novel,
      comic: payload.bookmark.comic == null ? {} : payload.bookmark.comic,
    };
  },
  [MutationsTypes.logout](state) {
    state.isAdmin = false;
    state.account = 'guest';
    state.registerDatetime = new Date(0);
    state.lastLoginDatetime = new Date(0);
    state.bookmark = {
      novel: {},
      comic: {},
    };
  },
  [MutationsTypes.updateBookmark](state, payload) {
    state.bookmark = payload;
  },
  [MutationsTypes.insertNovelBookmark](state, payload) {
    const { novelID, bookmark } = payload;
    state.bookmark.novel[novelID] = bookmark;
  },
  [MutationsTypes.insertComicBookmark](state, payload) {
    const { comicID, bookmark } = payload;
    state.bookmark.comic[comicID] = bookmark;
  },
};

export type TActions = Record<string, never>;
const actions: ActionTree<TState, TRootState> & TActions = {};

export type TUserStore = TStore<
  { [moduleName]: TState },
  TCommit<TMutations, TRootMutations, true>,
  TDispatch<TActions, TRootActions, true>,
  {
    [key in keyof TGetters as `${TModuleName}/${key}`]: ReturnType<TGetters[key]>
  }
>;
export const store: Module<TState, TRootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
} as const;
