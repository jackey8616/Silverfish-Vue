// src/store/modules/auth.ts
/* eslint-disable import/no-cycle, no-shadow, implicit-arrow-linebreak */
import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex';

import {
  TStore, GettersReturnType, TCommit, TDispatch,
  TActionContext,
} from '@/store/type';
import {
  TRootActions, TRootGetters, TRootMutations, TRootState,
} from '@/store/index';
import { Session, User } from '@/api/type';

export const moduleName = 'auth';
type TModuleName = typeof moduleName;

export type TState = Session;

const state: () => TState = () => ({
  token: '',
  expireDatetime: new Date(0),
});

const GettersTypes = {
  getSession: 'getSession',
  isSessionExpired: 'isSessionExpired',
} as const;
type VGettersTypes = (typeof GettersTypes)[keyof typeof GettersTypes];

export type TGetters = {
  readonly [key in VGettersTypes]: (
    /* eslint-disable-next-line max-len */
    state: TState, getters?: GettersReturnType<TGetters, key>, rootState?: TRootState, rootGetters?: TRootGetters
  ) =>
    key extends typeof GettersTypes.getSession ? string
  : key extends typeof GettersTypes.isSessionExpired ? boolean : void;
};

const getters: GetterTree<TState, TRootState> & TGetters = {
  [GettersTypes.getSession]: (state) => state.token,
  [GettersTypes.isSessionExpired]: (state) =>
    new Date(0).getTime() >= state.expireDatetime.getTime(),
};

const MutationsTypes = {
  login: 'login',
  logout: 'logout',
} as const;
export type TMutations = {
  [MutationsTypes.login](state: TState, payload: Session): void;
  [MutationsTypes.logout](state: TState): void;
};
const mutations: MutationTree<TState> & TMutations = {
  [MutationsTypes.login](state, payload) {
    state.token = payload.token;
    state.expireDatetime = payload.expireDatetime;
  },
  [MutationsTypes.logout](state) {
    state.token = '';
    state.expireDatetime = new Date(0);
  },
};

export const ActionTypes = {
  login: 'login',
  logout: 'logout',
} as const;
type TAuthActionContext = TActionContext<
  /* eslint-disable-next-line no-use-before-define */
  TState, TRootState, TActions, TRootActions, TMutations,
  TRootMutations, TGetters, TRootGetters
>;
export type TActions = {
  [ActionTypes.login](context: TAuthActionContext, payload: {
    session: Session;
    user: User;
  }): Promise<void>
  [ActionTypes.logout](context: TAuthActionContext): Promise<void>;
};
/* eslint-disable object-curly-newline */
const actions: ActionTree<TState, TRootState> & TActions = {
  async login({ commit }, payload) {
    commit('auth/login', payload.session, { root: true });
    commit('user/login', payload.user, { root: true });
  },
  async logout({ commit }) {
    commit('auth/logout', undefined, { root: true });
    commit('user/logout', undefined, { root: true });
  },
};
/* eslint-enable object-curly-newline */

export type TAuthStore = TStore<
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
