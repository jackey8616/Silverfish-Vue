// src/store/modules/book.ts
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
import { Book, Comic, Novel } from '@/api/type';

export const moduleName = 'book';
type TModuleName = typeof moduleName;
export type TState = {
  Novels: Record<string, Novel>,
  Comics: Record<string, Comic>,
};

const state: () => TState = () => ({
  Novels: {},
  Comics: {},
});

const GettersTypes = {
  isNovelIDExists: 'isNovelIDExists',
  isNovelNeedUpdate: 'isNovelNeedUpdate',
  getNovelByID: 'getNovelByID',
  getNovelByURL: 'getNovelByURL',
  isComicIDExists: 'isComicIDExists',
  isComicNeedUpdate: 'isComicNeedUpdate',
  getComicByID: 'getComicByID',
} as const;
type VGettersTypes = (typeof GettersTypes)[keyof typeof GettersTypes];

export type TGetters = {
  readonly [key in VGettersTypes]: (
    /* eslint-disable-next-line max-len */
    state: TState, getters?: GettersReturnType<TGetters, key>, rootState?: TRootState, rootGetters?: TRootGetters
  ) =>
    key extends typeof GettersTypes.isNovelIDExists ? (noveiD: string) => boolean
  : key extends typeof GettersTypes.isNovelNeedUpdate ? (novelID: string) => boolean
  : key extends typeof GettersTypes.getNovelByID ? (novelID: string) => Novel
  : key extends typeof GettersTypes.getNovelByURL ? (novelURL: string) => Novel | null
  : key extends typeof GettersTypes.isComicIDExists ? (comicID: string) => boolean
  : key extends typeof GettersTypes.isComicNeedUpdate ? (comicID: string) => boolean
  : key extends typeof GettersTypes.getComicByID ? (comicID: string) => Comic : void
  ;
};

const getters: GetterTree<TState, TRootState> & TGetters = {
  [GettersTypes.isNovelIDExists]: (state) => (novelID) => novelID in state.Novels,
  [GettersTypes.isNovelNeedUpdate]: (state) => (novelID) => {
    const hourOffset = (new Date().getTime() - state.Novels[novelID].lastCrawlTime.getTime())
      / 3600000;
    return hourOffset >= 24;
  },
  [GettersTypes.getNovelByID]: (state) => (novelID) => state.Novels[novelID],
  [GettersTypes.getNovelByURL]: (state) => (novelURL) => {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const novel of Object.values(state.Novels)) {
      if (novel.url === novelURL) {
        return novel;
      }
    }
    return null;
  },
  [GettersTypes.isComicIDExists]: (state) => (comicID) => comicID in state.Comics,
  [GettersTypes.isComicNeedUpdate]: (state) => (comicID) => {
    const hourOffset = (new Date().getTime() - state.Comics[comicID].lastCrawlTime.getTime())
      / 3600000;
    return hourOffset >= 24;
  },
  [GettersTypes.getComicByID]: (state) => (comicID) => state.Comics[comicID],
};

const MutationsType = {
  insertNovel: 'insertNovel',
  upsertNovel: 'upsertNovel',
  updateNovel: 'updateNovel',
  insertComic: 'insertComic',
  upsertComic: 'upsertComic',
  updateComic: 'updateComic',
} as const;
/* eslint-disable max-len */
export type TMutations = {
  [MutationsType.insertNovel]<T extends { novelID: string; novel: Novel }>(state: TState, payload: T): void;
  [MutationsType.upsertNovel]<T extends Novel>(state: TState, payload: T): void;
  [MutationsType.updateNovel]<T extends { novelID: string; novel: Novel }>(state: TState, payload: T): void;
  [MutationsType.insertComic]<T extends { comicID: string; comic: Comic }>(state: TState, payload: T): void;
  [MutationsType.upsertComic]<T extends Comic>(state: TState, payload: T): void;
  [MutationsType.updateComic]<T extends { comicID: string; comic: Comic }>(state: TState, payload: T): void;
};
/* eslint-enable max-len */
const mutations: MutationTree<TState> & TMutations = {
  insertNovel(state, payload) {
    const { novelID, novel } = payload;
    state.Novels[novelID] = novel;
  },
  upsertNovel(state, payload) {
    const { novelID } = payload;
    state.Novels[novelID] = novelID in state.Novels
      ? { ...state.Novels[novelID], ...payload }
      : payload;
  },
  updateNovel(state, payload) {
    if (payload.novelID in state.Novels) {
      state.Novels[payload.novelID].chapters = payload.novel.chapters;
      state.Novels[payload.novelID].lastCrawlTime = new Date(payload.novel.lastCrawlTime);
    }
  },
  insertComic(state, payload) {
    const { comicID, comic } = payload;
    state.Comics[comicID] = comic;
  },
  upsertComic(state, payload) {
    const { comicID } = payload;
    state.Comics[comicID] = comicID in state.Comics
      ? { ...state.Comics[comicID], ...payload }
      : payload;
  },
  updateComic(state, payload) {
    if (payload.comicID in state.Comics) {
      state.Comics[payload.comicID].chapters = payload.comic.chapters;
      state.Comics[payload.comicID].lastCrawlTime = new Date(payload.comic.lastCrawlTime);
    }
  },
};

export type TActions = Record<string, never>;
const actions: ActionTree<TState, TRootState> & TActions = {};

export type TBookStore = TStore<
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
