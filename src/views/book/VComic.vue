<template>
  <div id="content" :style="{ 'min-height': `${height}px` }">
    <div id="article" class="container">
      <div v-if="Object.keys(comic).length !== 0" class="row">
        <reader-nav
          :type="'comic'"
          :id="comicID"
          :currentIndex="currentIndex" @changeIndex="onChangeIndex"
          :chapterLength="comic.chapters.length"/>
        <div class="col-12">
          <div id="comic">
            <div v-for="each in sections" :key="each.index">
              <img v-for="every in each.content" :key="every" referrerpolicy="no-referrer"
                :style="getStyle(every)" :src="every" :alt="each.index.toString()"
              />
              <hr v-observe-visibility="{
                callback: (isVisible, entry) => observe(isVisible, entry, each)}
              "/>
            </div>
          </div>
          <div>
            <br><br>
            <center><loading :size="150"/></center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, inject,
  computed,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

import fetchAPI from '@/api/fetch';
import { Chapter } from '@/api/type';

import ReaderNav from '@/components/reader/CReaderNav.vue';

export default defineComponent({
  components: { ReaderNav },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { fetchComicByID, fetchComicChapter } = fetchAPI();
    const session = store.getters['auth/getSession'];
    const height = inject('height');
    const comicID = ref('');
    const lightOn = ref(false);
    const loading = ref(false);
    const sections = reactive<Array<Chapter>>([]);
    const fetchIndex = ref(0);
    const currentIndex = ref(1);
    const transitIndex = ref(0);
    const bookmark = computed(() => store.getters['user/getComicBookmarkByID'](comicID.value) || {});
    const comic = computed(() => store.getters['book/getComicByID'](comicID.value) || {});

    const fetchChapter = async (index: number): Promise<Chapter> => {
      const data = await fetchComicChapter(session, comicID.value, index);
      return {
        index,
        content: data,
      };
    };
    const get = async () => {
      sections.splice(0);
      fetchIndex.value = currentIndex.value - 1;
      transitIndex.value = currentIndex.value - 1;

      await fetchChapter(fetchIndex.value).then((data) => sections.push(data));
      fetchIndex.value += 1;
      await fetchChapter(fetchIndex.value).then((data) => sections.push(data));
      fetchIndex.value += 1;
    };
    const created = async () => {
      comicID.value = route.params.comicID as string;

      if (!store.getters['book/isComicIDExists'](comicID.value)) {
        await fetchComicByID(session, comicID.value)
          .then((data) => store.commit('book/insertComic', { comicID: comicID.value, comic: data }));
      } else {
        const localComic = store.getters['book/getComicByID'](comicID.value);
        if (localComic.chapters === undefined
          || store.getters['book/isComicNeedUpdate'](comicID.value)) {
          await fetchComicByID(session, comicID.value)
            .then((data) => store.commit('book/updateComic', { comicID: comicID.value, comic: data }));
        }
        currentIndex.value = bookmark.value.lastReadIndex || currentIndex.value;
      }
      get();
    };
    const onChangeIndex = (setIndex: number) => {
      currentIndex.value = setIndex;
      get();
    };
    const getStyle = (url: string) => (url.endsWith('20%') ? { width: '20%' } : {});
    const observe = (isVisible: boolean, entry: any, section: Chapter) => {
      if (isVisible) {
        if (transitIndex.value < section.index) {
          currentIndex.value = section.index + 1;
          transitIndex.value = section.index;
          bookmark.value.lastReadIndex = currentIndex.value;
          store.commit('user/insertComicBookmark', { comicID: comic.value.comicID, bookmark: bookmark.value });
          if (!loading.value && fetchIndex.value - currentIndex.value < 1) {
            loading.value = true;
            fetchChapter(fetchIndex.value).then((data) => sections.push(data));
            fetchIndex.value += 1;
            setTimeout(() => {
              loading.value = false;
            }, 1000);
          }
        }
      }
    };

    created();

    /* eslint-disable object-property-newline */
    return {
      height, comicID, loading, lightOn,
      sections, fetchIndex, currentIndex, transitIndex,
      bookmark, comic,
      onChangeIndex, getStyle, observe,
    };
    /* eslint-enable object-property-newline */
  },
});
</script>

<style scoped>
  .container.light-on {
    background-color: white;
    color:  #2c3e50;
  }
  .container.light-off {
    color: #d3d3d3;
  }
</style>
