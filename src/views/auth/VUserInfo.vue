<template>
  <div id="content" class="container" :style="{ 'min-height': withFootHeight + 'px' }">
    <div class="row">
      <div class="col-10 offset-1 col-md-6 offset-md-3">
        <div class="row">
          帳號<br>
          <div class="col-12 right">&nbsp;{{ account }}</div>
        </div>
        <div class="row">
          註冊時間<br>
          <div class="col-12 right">&nbsp;{{ formatDate(registerDatetime, true) }}</div>
        </div>
        <div class="row">
          上次登入時間<br>
          <div class="col-12 right">
          &nbsp;{{ formatDate(lastLoginDatetime, true)}}
          </div>
        </div>
        <div class="row">
          <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
          <label>書籤</label>&nbsp;
          <div class="col-12 booksList">
            <div class="row">
              <div class="col left">小說書名 / 作者</div>
              <div class="col-5 right">上次章節</div>
            </div>
            <div v-for="val in novelBookmarks" :key="val.ID" class="row">
              <div class="slider">
                <div class="slides">
                  <div class="info">
                    <div class="col left">
                      <span :title="'上次閱讀: ' + val.lastReadDatetime">{{ val.info.title }}</span>
                      &nbsp;/&nbsp;{{ val.info.author }}
                    </div>
                    <div class="col-4 col-md-4 right center">
                      <small>第{{ val.lastReadIndex }}章&nbsp;</small>
                    </div>
                  </div>
                  <div class="keepRead">
                    <router-link :to="{ path: `/novel/${val.ID}` }">
                      <small>繼續閱讀</small>
                    </router-link>
                  </div>
                  <div class="bookmarkRemove">
                    <div>
                      <small>刪除書籤</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 booksList">
            <div class="row">
              <div class="col left">漫畫書名 / 作者</div>
              <div class="col-5 right">上次章節</div>
            </div>
            <div v-for="val in comicBookmarks" :key="val.ID" class="row">
              <div class="slider">
                <div class="slides">
                  <div class="info">
                    <div class="col left">
                      <span :title="'上次閱讀: ' + val.lastReadDatetime">{{ val.info.title }}</span>
                      &nbsp;/&nbsp;{{ val.info.author }}
                    </div>
                    <div class="col-4 col-md-4 right center">
                      <small>第{{ val.lastReadIndex }}章&nbsp;</small>
                    </div>
                  </div>
                  <div class="keepRead">
                    <router-link :to="{ path: `/comic/${val.ID}` }">
                      <small>繼續閱讀</small>
                    </router-link>
                  </div>
                  <div class="bookmarkRemove">
                    <div>
                      <small>刪除書籤</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, inject, onMounted,
  reactive, ref,
} from 'vue';

import { useStore } from '@/store';
import { Bookmark } from '@/api/type';
import utils from '@/utils';

export default defineComponent({
  setup() {
    const store = useStore();
    /* eslint-disable-next-line @typescript-eslint/ban-types */
    const fetchBookmark: Function = inject('fetchBookmark') as Function;
    const { formatDate } = utils();
    const user = computed(() => store.getters['user/getUser']);
    const withFootHeight = inject('withFootHeight');
    const account = ref('guest');
    const registerDatetime = ref(new Date(0));
    const lastLoginDatetime = ref(new Date(0));
    const novelBookmarks = reactive<Array<Bookmark & {
      info: { author: string; title: string };
    }>>([]);
    const comicBookmarks = reactive<Array<Bookmark & {
      info: { author: string; title: string };
    }>>([]);

    onMounted(async () => {
      await fetchBookmark(true);
      account.value = user.value.account;
      registerDatetime.value = user.value.registerDatetime;
      lastLoginDatetime.value = user.value.lastLoginDatetime;
      Object.assign(novelBookmarks, Object.values(user.value.bookmark.novel)
        .map((each) => {
          const book = store.getters['book/getNovelByID'](each.ID);
          const info = book === undefined
            ? { title: 'empty', author: 'empty' }
            : { title: book.title, author: book.author };
          return { ...each, info };
        })
        .filter((each) => !(each.info.title === 'empty' || each.info.author === 'empty'))
        .sort((a, b) => b.lastReadDatetime.getTime() - a.lastReadDatetime.getTime()));
      Object.assign(comicBookmarks, Object.values(user.value.bookmark.comic)
        .map((each) => {
          const book = store.getters['book/getComicByID'](each.ID);
          const info = book === undefined
            ? { title: 'empty', author: 'empty' }
            : { title: book.title, author: book.author };
          return { ...each, info };
        })
        .filter((each) => !(each.info.title === 'empty' || each.info.author === 'empty'))
        .sort((a, b) => b.lastReadDatetime.getTime() - a.lastReadDatetime.getTime()));
    });

    /* eslint-disable object-property-newline */
    return {
      withFootHeight, account, registerDatetime, lastLoginDatetime,
      novelBookmarks, comicBookmarks,
      formatDate,
    };
    /* eslint-enable object-property-newline */
  },
});
</script>

<style scoped>
  .slider {
    width: 100%;
    overflow-x: auto;
  }
  .slides {
    width: 100%;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  .slides::-webkit-scrollbar {
    display: none;
  }
  .slides > div {
    scroll-snap-align: start;
    flex-shrink: 0;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;
    display: flex;
  }
  .slides > div.info {
    border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
    width: 100%;
  }
  .slides > div.keepRead,div.bookmarkRemove > a > .small,small {
    color: white;
  }
  .slides > div.keepRead > a {
    margin: auto;
  }
  .slides > div.keepRead {
    padding: 0 15px;
    background-color: #0d6efd;
  }
  .slides > div.bookmarkRemove > div {
    margin: auto;
  }
  .slides > div.bookmarkRemove {
    display: none;
    padding: 0 15px;
    background-color: red;
  }
  div.left {
    text-align: left;
  }
  div.right {
    text-align: right;
  }
  div.center {
    margin-top: auto;
    margin-bottom: auto;
  }
  .booksList {
    padding-top: 5px;
  }
</style>
