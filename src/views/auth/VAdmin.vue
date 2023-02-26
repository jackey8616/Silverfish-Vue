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
              <label for="deleteNovelID">
                <select class="form-control" v-model="deleteNovelID">
                  <option v-for="novel in novels" :key="novel.novelID" :value="novel.novelID">
                    {{ `${novel.novelID} / ${novel.title} / ${novel.author}` }}
                  </option>
                </select>
              </label>
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
              <label for="deleteComicId">
                <select class="form-control" v-model="deleteComicID">
                  <option v-for="comic in comics" :key="comic.comicID" :value="comic.comicID">
                    {{ `${comic.comicID} / ${comic.title} / ${comic.author}` }}
                  </option>
                </select>
              </label>
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
  defineComponent, inject, onMounted, reactive, ref, ComputedRef,
} from 'vue';
import { useToast } from 'vue-toastification';

import adminAPI from '@/api/admin';
import fetchAPI from '@/api/fetch';
import { ComicInfo, NovelInfo } from '@/api/type';

export default defineComponent({
  setup() {
    const toast = useToast();
    const {
      adminFetcherList,
      addNewComic, addNewNovel,
      deleteComicByID, deleteNovelByID,
    } = adminAPI();
    const { fetchComics, fetchNovels } = fetchAPI();
    const withFootHeight = inject('withFootHeight');
    const session = inject<ComputedRef<string>>('session')!;
    const fetchers = reactive<{ novels: Array<string>; comics: Array<string>; }>({
      novels: [],
      comics: [],
    });
    const comics = reactive<Array<ComicInfo>>([]);
    const novels = reactive<Array<NovelInfo>>([]);
    const addNovelUrl = ref('');
    const deleteNovelID = ref('');
    const addComicUrl = ref('');
    const deleteComicID = ref('');

    const fetcherList = async () => {
      adminFetcherList(session.value).then((data) => {
        Object.assign(fetchers.novels, data.fetchers.novels);
        Object.assign(fetchers.comics, data.fetchers.comics);
      });
      Object.assign(novels, await fetchNovels(session.value));
      Object.assign(comics, await fetchComics(session.value));
    };
    const addNovel = () => {
      if (addNovelUrl.value === '') {
        toast.error('Novel URL不得為空.');
        return;
      }
      addNewNovel(session.value, addNovelUrl.value).then((data) => {
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
      deleteNovelByID(session.value, deleteNovelID.value).then((data) => {
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
      addNewComic(session.value, addComicUrl.value).then((data) => {
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
      deleteComicByID(session.value, deleteComicID.value).then((data) => {
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
