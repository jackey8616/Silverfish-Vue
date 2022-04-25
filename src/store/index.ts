// src/store/index.ts
/* eslint-disable import/no-cycle */
import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, useStore as baseUseStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { RootGettersReturnType } from '@/store/type';
import {
  moduleName as AuthModuleName, TAuthStore, store as authStore,
  TState as TAuthState, TGetters as TAuthGetters,
  TMutations as TAuthMutations, TActions as TAuthActions,
} from '@/store/modules/auth';
import {
  moduleName as UserModuleName, TUserStore, store as userStore,
  TState as TUserState, TGetters as TUserGetters,
  TMutations as TUserMutations, TActions as TUserActions,
} from '@/store/modules/user';
import {
  moduleName as BookModuleName, TBookStore, store as bookStore,
  TState as TBookState, TGetters as TBookGetters,
  TMutations as TBookMutations, TActions as TBookActions,
} from '@/store/modules/book';

export type TRootState = {
  [AuthModuleName]: TAuthState;
  [UserModuleName]: TUserState;
  [BookModuleName]: TBookState;
};

export type TRootGetters = RootGettersReturnType<TAuthGetters, typeof AuthModuleName>
  & RootGettersReturnType<TUserGetters, typeof UserModuleName>
  & RootGettersReturnType<TBookGetters, typeof BookModuleName>;

export type TRootMutations = {
  [AuthModuleName]: TAuthMutations;
  [UserModuleName]: TUserMutations;
  [BookModuleName]: TBookMutations;
};

export type TRootActions = {
  [AuthModuleName]: TAuthActions;
  [UserModuleName]: TUserActions;
  [BookModuleName]: TBookActions;
};

export type TRootStore = TAuthStore & TUserStore & TBookStore;
export const key: InjectionKey<VuexStore<TRootState>> = Symbol('store');

export function useStore(): TRootStore {
  return baseUseStore(key);
}

export default createStore({
  plugins: [
    createPersistedState({
      key: 'SILVERFISH-DEV',
      storage: {
        getItem: (storageKey) => {
          const value: string | null = window.localStorage.getItem(storageKey);
          if (value !== null) {
            const data = JSON.parse(value) as TRootState;
            const novels = Object.values(data[BookModuleName].Novels);
            const comics = Object.values(data[BookModuleName].Comics);
            data[BookModuleName].Novels = {};
            data[BookModuleName].Comics = {};

            novels.forEach((each) => {
              data[BookModuleName].Novels[each.novelID] = {
                ...each,
                lastCrawlTime: new Date(each.lastCrawlTime),
              };
            });
            comics.forEach((each) => {
              data[BookModuleName].Comics[each.comicID] = {
                ...each,
                lastCrawlTime: new Date(each.lastCrawlTime),
              };
            });

            const novelBookmarks = Object.values(data[UserModuleName].bookmark.novel);
            const comicBookmarks = Object.values(data[UserModuleName].bookmark.comic);
            data[UserModuleName].bookmark.novel = {};
            data[UserModuleName].bookmark.comic = {};

            novelBookmarks.forEach((each) => {
              data[UserModuleName].bookmark.novel[each.ID] = {
                ...each,
                lastReadDatetime: new Date(each.lastReadDatetime),
              };
            });
            comicBookmarks.forEach((each) => {
              data[UserModuleName].bookmark.comic[each.ID] = {
                ...each,
                lastReadDatetime: new Date(each.lastReadDatetime),
              };
            });
            return data;
          }
          return value;
        },
        setItem: (storageKey, value) => window.localStorage.setItem(storageKey, value),
        removeItem: (storageKey) => window.localStorage.removeItem(storageKey),
      },
    }),
  ],
  modules: {
    [AuthModuleName]: authStore,
    [UserModuleName]: userStore,
    [BookModuleName]: bookStore,
  },
});
