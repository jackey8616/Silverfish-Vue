// src/api/fetch.ts
/* eslint-disable no-async-promise-executor, no-promise-executor-return */
import { getCurrentInstance } from 'vue';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useToast } from 'vue-toastification';

import { BookInfo, Novel } from '@/api/type';

export default function () {
  const toast = useToast();
  const $endpoint = getCurrentInstance()?.appContext.config.globalProperties.$endpoint;
  const $apiVersionRoute = getCurrentInstance()?.appContext.config
    .globalProperties.$apiVersionRoute;
  const $endpointRoute = `${$endpoint}${$apiVersionRoute}`;
  const novelCli = axios.create({ baseURL: `${$endpointRoute}/novels` });
  const comicCli = axios.create({ baseURL: `${$endpointRoute}/comics` });
  axiosRetry(novelCli, { retries: 3 });
  axiosRetry(comicCli, { retries: 3 });

  function fetchNovels(session: string): Promise<Array<BookInfo>> {
    return new Promise((resolve, reject) => novelCli.get('', {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        return resolve((res.data.data as Array<BookInfo>)
          .map((each) => ({
            ...each,
            lastCrawlTime: new Date(each.lastCrawlTime),
          })));
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function fetchNovelByID(session: string, novelID: string): Promise<Novel> {
    return new Promise((resolve, reject) => novelCli.get(`/${novelID}`, {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        const novel = res.data.data;
        return resolve({
          isEnable: novel.isEnable,
          novelID: novel.novelID,
          author: novel.author,
          description: novel.description,
          dns: novel.dns,
          url: novel.url,
          title: novel.title,
          cover_url: novel.coverUrl,
          chapters: novel.chapters,
          lastCrawlTime: new Date(novel.lastCrawlTime),
        });
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function fetchNovelChapter(session: string, novelID: string, chapterIndex: number): Promise<any> {
    return new Promise((resolve, reject) => novelCli.get(`/${novelID}/chapter/${chapterIndex}`, {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function fetchComics(session: string): Promise<Array<BookInfo>> {
    return new Promise((resolve, reject) => comicCli.get('', {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        return resolve((res.data.data as Array<BookInfo>)
          .map((each) => ({
            ...each,
            lastCrawlTime: new Date(each.lastCrawlTime),
          })));
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function fetchComicByID(session: string, comicID: string): Promise<any> {
    return new Promise((resolve, reject) => comicCli.get(`/${comicID}`, {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        const comic = res.data.data;
        return resolve({
          comicID: comic.comicID,
          author: comic.author,
          description: comic.description,
          dns: comic.dns,
          url: comic.url,
          title: comic.title,
          cover_url: comic.coverUrl,
          chapters: comic.chapters,
          lastCrawlTime: new Date(comic.lastCrawlTime),
        });
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  function fetchComicChapter(session: string, comicID: string, chapterIndex: number): Promise<any> {
    return new Promise((resolve, reject) => comicCli.get(`/${comicID}/chapter/${chapterIndex}`, {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        return resolve(res.data.data);
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  return {
    $endpointRoute,
    fetchNovels,
    fetchNovelByID,
    fetchNovelChapter,
    fetchComics,
    fetchComicByID,
    fetchComicChapter,
  };
}
