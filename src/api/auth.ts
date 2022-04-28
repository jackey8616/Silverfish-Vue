// src/api/auth.ts
/* eslint-disable no-async-promise-executor, no-promise-executor-return */
import { getCurrentInstance } from 'vue';
import axios from 'axios';
import { stringify } from 'qs';
import { useToast } from 'vue-toastification';

import { Session, User } from '@/api/type';

export default function () {
  const toast = useToast();
  const $endpoint = getCurrentInstance()?.appContext.config.globalProperties.$endpoint;
  const client = axios.create({ baseURL: `${$endpoint}/auth` });

  function authStatus(session: string): Promise<any> {
    return new Promise((resolve, reject) => client.get('/status', {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function authRegister(recaptchaToken: string, authData: {
    account: string; password: string;
  }): Promise<any> {
    return new Promise((resolve, reject) => client.post(
      '/register',
      stringify({ ...{ recaptchaToken }, ...authData }),
    ).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function authLogin(session: string, recaptchaToken: string, authData: {
    account: string; password: string;
  }): Promise<{ session: Session; user: User }> {
    return new Promise((resolve, reject) => client.post(
      '/login',
      stringify({ ...{ recaptchaToken }, ...authData }),
      { headers: { Authorization: session } },
    ).then((res) => {
      if (res.data.success === true) {
        return resolve({
          session: res.data.data.session,
          user: res.data.data.user,
        });
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function authLogout(session: string): Promise<any> {
    return new Promise((resolve) => client.get('/logout', {
      headers: { Authorization: session },
    }).then(() => resolve(true))
      .catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function authIsAdmin(session: string): Promise<any> {
    return new Promise((resolve, reject) => client.get('/isAdmin', {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  return {
    authStatus,
    authRegister,
    authLogin,
    authLogout,
    authIsAdmin,
  };
}
