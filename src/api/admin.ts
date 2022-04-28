// src/api/admin.ts
/* eslint-disable no-async-promise-executor, no-promise-executor-return */
import { getCurrentInstance } from 'vue';
import { stringify } from 'qs';
import axios from 'axios';
import { useToast } from 'vue-toastification';

import fetchAPI from '@/api/fetch';

export default function () {
  const toast = useToast();
  const $endpoint = getCurrentInstance()?.appContext.config.globalProperties.$endpoint;
  const { $endpointRoute } = fetchAPI();
  const adminCli = axios.create({ baseURL: `${$endpoint}/admin` });
  const novelCli = axios.create({ baseURL: `${$endpointRoute}/novels` });
  const comicCli = axios.create({ baseURL: `${$endpointRoute}/comics` });

  function adminFetcherList(session: string): Promise<{
    fetchers: { comics: Array<string>; novels: Array<string>; };
  }> {
    return new Promise((resolve, reject) => adminCli.get('/fetchers', {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function addNewNovel(session: string, targetUrl: string): Promise<any> {
    return new Promise((resolve, reject) => novelCli.post('', {
      headers: { Authorization: session },
      data: stringify({ novel_url: targetUrl }),
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function deleteNovelByID(session: string, novelID: string): Promise<any> {
    return new Promise((resolve, reject) => novelCli.delete(`/${novelID}`, {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function addNewComic(session: string, targetUrl: string): Promise<any> {
    return new Promise((resolve, reject) => comicCli.post('', {
      headers: { Authorization: session },
      data: stringify({ comic_url: targetUrl }),
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function deleteComicByID(session: string, comicID: string): Promise<any> {
    return new Promise((resolve, reject) => comicCli.delete(`/${comicID}`, {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success === true) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  return {
    adminFetcherList,
    addNewNovel,
    deleteNovelByID,
    addNewComic,
    deleteComicByID,
  };
}
