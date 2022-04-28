// src/api/user.ts
/* eslint-disable no-async-promise-executor, no-promise-executor-return */
import { getCurrentInstance } from 'vue';
import axios from 'axios';

import { Bookmark } from '@/api/type';
import { useToast } from 'vue-toastification';

export default function () {
  const toast = useToast();
  const $endpoint = getCurrentInstance()?.appContext.config.globalProperties.$endpoint;
  const client = axios.create({ baseURL: `${$endpoint}/user` });

  function latestBookmark(session: string): Promise<{
    novel: Record<string, Bookmark>;
    comic: Record<string, Bookmark>;
  }> {
    return new Promise((resolve, reject) => client.get('/bookmark', {
      headers: { Authorization: session },
    }).then((res) => {
      if (res.data.success) {
        const novel: Record<string, Bookmark> = {};
        Object.values(res.data.data.novel as Record<string, Bookmark>).forEach((each) => {
          novel[each.ID] = {
            ...each,
            lastReadDatetime: new Date(each.lastReadDatetime),
          };
        });
        const comic: Record<string, Bookmark> = {};
        Object.values(res.data.data.comic as Record<string, Bookmark>).forEach((each) => {
          comic[each.ID] = {
            ...each,
            lastReadDatetime: new Date(each.lastReadDatetime),
          };
        });
        return resolve({ novel, comic });
      }
      return reject(res.data.data);
    }).catch((err) => toast.error(`發生錯誤: ${err.toString()}`)));
  }

  return { latestBookmark };
}
