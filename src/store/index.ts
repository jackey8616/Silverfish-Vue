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
            const auth = data[AuthModuleName];
            auth.expireDatetime = new Date(auth.expireDatetime);

            const book = data[BookModuleName];
            const novels = Object.values(book.Novels);
            const comics = Object.values(book.Comics);
            book.Novels = {};
            book.Comics = {};

            novels.forEach((each) => {
              book.Novels[each.novelID] = {
                ...each,
                lastCrawlTime: new Date(each.lastCrawlTime),
              };
            });
            comics.forEach((each) => {
              book.Comics[each.comicID] = {
                ...each,
                lastCrawlTime: new Date(each.lastCrawlTime),
              };
            });

            const user = data[UserModuleName];
            const novelBookmarks = Object.values(user.bookmark.novel);
            const comicBookmarks = Object.values(user.bookmark.comic);
            user.bookmark.novel = {};
            user.bookmark.comic = {};

            novelBookmarks.forEach((each) => {
              user.bookmark.novel[each.ID] = {
                ...each,
                lastReadDatetime: new Date(each.lastReadDatetime),
              };
            });
            comicBookmarks.forEach((each) => {
              user.bookmark.comic[each.ID] = {
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
