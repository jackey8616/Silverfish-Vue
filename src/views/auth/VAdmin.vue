<template>
  <div id="content" class="container" :style="{ 'min-height': `${withFootHeight}px` }">
    <div class="row">
      <div class="col-8 offset-2 col-md-8 offset-md-2">
        <h5>Novels</h5>
        <div class="row">
          <div class="col col-4">
            <div v-for="each in fetchers.novels" :key="each">
              <a :href="'http://' + each" target="_blank">{{ each }}</a><br>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input v-model="addNovelUrl" class="form-control"/>
              <button
                @click="addNovel" :disabled="addNovelUrl === ''"
                class="btn-sm btn-color-1" type="button"
              >
                <font-awesome-icon icon="arrow-circle-right"/> Add
              </button>
            </div>
            <div class="input-group mb-3">
              <select class="form-control" v-model="deleteNovelID">
                <option v-for="novel in novels" :key="novel.novelID" :value="novel.novelID">
                  {{ `${novel.novelID} / ${novel.title} / ${novel.author}` }}
                </option>
              </select>
              <button
                @click="deleteNovel" :disabled="deleteNovelID === ''"
                class="btn-sm btn-color-1" type="button"
              >
                <font-awesome-icon icon="arrow-circle-right"/> Delete
              </button>
            </div>
          </div>
        </div>
        <h5>Comics</h5>
        <div class="row">
          <div class="col col-4">
            <div v-for="each in fetchers.comics" :key="each">
              <a :href="'http://' + each" target="_blank">{{ each }}</a><br>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input v-model="addComicUrl" class="form-control"/>
              <button
                @click="addComic" :disabled="addComicUrl === ''"
                class="btn-sm btn-color-1" type="button"
              >
                <font-awesome-icon icon="arrow-circle-right"/> Add
              </button>
            </div>
            <div class="input-group mb-3">
              <select class="form-control" v-model="deleteComicID">
                <option v-for="comic in comics" :key="comic.comicID" :value="comic.comicID">
                  {{ `${comic.comicID} / ${comic.title} / ${comic.author}` }}
                </option>
              </select>
              <button
                @click="deleteComic" :disabled="deleteComicID === ''"
                class="btn-sm btn-color-1" type="button"
              >
                <font-awesome-icon icon="arrow-circle-right"/> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, onMounted, reactive, ref,
} from 'vue';

import { useStore } from '@/store';

import adminAPI from '@/api/admin';
import fetchAPI from '@/api/fetch';
import { BookInfo } from '@/api/type';
import { useToast } from 'vue-toastification';

export default defineComponent({
  setup() {
    const toast = useToast();
    const store = useStore();
    const {
      adminFetcherList,
      addNewComic, addNewNovel,
      deleteComicByID, deleteNovelByID,
    } = adminAPI();
    const { fetchComics, fetchNovels } = fetchAPI();
    const withFootHeight = inject('withFootHeight');
    const session = store.getters['auth/getSession'];
    const fetchers = reactive<{ novels: Array<string>; comics: Array<string>; }>({
      novels: [],
      comics: [],
    });
    const comics = reactive<Array<BookInfo>>([]);
    const novels = reactive<Array<BookInfo>>([]);
    const addNovelUrl = ref('');
    const deleteNovelID = ref('');
    const addComicUrl = ref('');
    const deleteComicID = ref('');

    const fetcherList = async () => {
      adminFetcherList(session).then((data) => {
        Object.assign(fetchers.novels, data.fetchers.novels);
        Object.assign(fetchers.comics, data.fetchers.comics);
      });
      Object.assign(novels, await fetchNovels(session));
      Object.assign(comics, await fetchComics(session));
    };
    const addNovel = () => {
      if (addNovelUrl.value === '') {
        toast.error('Novel URL不得為空.');
        return;
      }
      addNewNovel(session, addNovelUrl.value).then((data) => {
        toast('添加成功！');
        fetcherList();
        console.log(data);
      }).catch((errData) => {
        toast.error('添加失敗!');
        console.error(errData);
      });
    };
    const deleteNovel = () => {
      if (deleteNovelID.value === '') {
        toast.error('Novel ID不得為空.');
        return;
      }
      deleteNovelByID(session, deleteNovelID.value).then((data) => {
        toast('刪除成功！');
        fetcherList();
        console.log(data);
      }).catch((errData) => {
        toast.error('刪除失敗!');
        console.error(errData);
      });
    };
    const addComic = () => {
      if (addComicUrl.value === '') {
        toast.error('Comic URL不得為空.');
        return;
      }
      addNewComic(session, addComicUrl.value).then((data) => {
        toast('添加成功！');
        fetcherList();
        console.log(data);
      }).catch((errData) => {
        toast.error('添加失敗!');
        console.error(errData);
      });
    };
    const deleteComic = () => {
      if (deleteComicID.value === '') {
        toast.error('Comic ID不得為空.');
        return;
      }
      deleteComicByID(session, deleteComicID.value).then((data) => {
        toast('刪除成功！');
        fetcherList();
        console.log(data);
      }).catch((errData) => {
        toast.error('刪除失敗!');
        console.error(errData);
      });
    };
    onMounted(() => fetcherList());

    /* eslint-disable object-property-newline */
    return {
      withFootHeight,
      fetchers, comics, novels,
      addNovelUrl, deleteNovelID, addComicUrl, deleteComicID,
      addNovel, deleteNovel, addComic, deleteComic,
    };
    /* eslint-enable object-property-newline */
  },
});
</script>
