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

  function authStatus(session: string): Promise<any> {
    return new Promise((resolve, reject) => axios({
      url: `${$endpoint}/auth/status`,
      method: 'GET',
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
    return new Promise((resolve, reject) => axios({
      url: `${$endpoint}/auth/register`,
      method: 'POST',
      data: stringify({ ...{ recaptchaToken }, ...authData }),
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function authLogin(session: string, recaptchaToken: string, authData: {
    account: string; password: string;
  }): Promise<{ session: Session; user: User }> {
    return new Promise((resolve, reject) => axios({
      url: `${$endpoint}/auth/login`,
      method: 'POST',
      headers: { Authorization: session },
      data: stringify({ ...{ recaptchaToken }, ...authData }),
    }).then((res) => {
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
    return new Promise((resolve) => axios({
      url: `${$endpoint}/auth/logout`,
      method: 'GET',
      headers: { Authorization: session },
    }).then(() => resolve(true))
      .catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function authIsAdmin(session: string): Promise<any> {
    return new Promise((resolve, reject) => axios({
      url: `${$endpoint}/auth/isAdmin`,
      method: 'GET',
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
