<template>
  <div id="content" :style="{ 'min-height': `${height}px` }">
    <div id="article" class="container" :class="{'light-on': lightOn,'light-off': !lightOn}">
      <div v-if="Object.keys(novel).length !== 0" class="row">
        <reader-nav
          :type="'novel'"
          :id="novelID"
          :isTW="isTW" @changeSimplified="onChangeSimplified"
          :lightOn="lightOn" @changeLight="onChangeLight"
          :fontSize="fontSize" @changeFontSize="onChangeFontSize"
          :currentIndex="currentIndex" @changeIndex="onChangeIndex"
          :chapterLength="novel.chapters.length"/>
        <div class="col-12">
          <div id="novel" :class="{
            'novel-font-sm': fontSize === 1,
            'novel-font-md': fontSize === 2,
            'novel-font-lg': fontSize === 3,
            'novel-font-xl': fontSize === 4,
          }">
            <chapter-section
              v-for="each in sections" :key="each.index" :isTW="isTW" :single="each"
              v-observe-visibility="{
                callback: (isVisible, entry) => observe(isVisible, entry, each),
                throttle: 300,
              }"
            />
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
  inject, reactive, ref, defineComponent, computed,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

import fetchAPI from '@/api/fetch';
import { Chapter } from '@/api/type';

import ReaderNav from '@/components/reader/CReaderNav.vue';
import ChapterSection from '@/components/reader/CChapterSection.vue';

export default defineComponent({
  components: { ReaderNav, ChapterSection },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { fetchNovelByID, fetchNovelChapter } = fetchAPI();
    const session = store.getters['auth/getSession'];
    const height = inject('height');
    const novelID = ref('');
    const loading = ref(false);
    const fontSize = ref(1);
    const isTW = ref(true);
    const lightOn = ref(false);
    const sections = reactive<Array<Chapter>>([]);
    const fetchIndex = ref(0);
    const currentIndex = ref(1);
    const transitIndex = ref(0);
    const bookmark = computed(() => store.getters['user/getNovelBookmarkByID'](novelID.value) || {});
    const novel = computed(() => store.getters['book/getNovelByID'](novelID.value) || {});

    const fetchChapter = async (index: number): Promise<Chapter> => {
      const data = await fetchNovelChapter(session, novelID.value, index);
      return {
        index,
        title: (novel.value.chapters[index] as any).title,
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
      novelID.value = route.params.novelID as string;

      if (!store.getters['book/isNovelIDExists'](novelID.value)) {
        await fetchNovelByID(session, novelID.value)
          .then((data) => store.commit('book/insertNovel', { novelID: novelID.value, novel: data }));
      } else {
        const localNovel = store.getters['book/getNovelByID'](novelID.value);
        if (localNovel.chapters === undefined
          || store.getters['book/isNovelNeedUpdate'](novelID.value)
        ) {
          await fetchNovelByID(session, novelID.value)
            .then((data) => store.commit('book/updateNovel', { novelID: novelID.value, novel: data }));
        }
        currentIndex.value = bookmark.value.lastReadIndex || currentIndex.value;
      }
      get();
    };
    const onChangeSimplified = (setTW: boolean) => { isTW.value = setTW; };
    const onChangeLight = (setLight: boolean) => { lightOn.value = setLight; };
    const onChangeFontSize = (setSize: number) => { fontSize.value = setSize; };
    const onChangeIndex = (setIndex: number) => {
      currentIndex.value = setIndex;
      get();
    };
    const observe = (isVisible: boolean, entry: any, section: Chapter) => {
      if (isVisible) {
        if (transitIndex.value < section.index) {
          currentIndex.value = section.index + 1;
          transitIndex.value = section.index;
          bookmark.value.lastReadIndex = currentIndex.value;
          store.commit('user/insertNovelBookmark', { novelID: novel.value.novelID, bookmark: bookmark.value });
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
      height, novelID, loading, fontSize, lightOn, isTW,
      sections, fetchIndex, currentIndex, transitIndex,
      bookmark, novel, onChangeSimplified, onChangeLight,
      onChangeFontSize, onChangeIndex, observe,
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
  .novel-font-sm {
    font-size: 1rem;
  }
  .novel-font-md {
    font-size: 1.125rem;
  }
  .novel-font-lg {
    font-size: 1.25rem;
  }
  .novel-font-xl {
    font-size: 1.5rem;
  }
</style>
