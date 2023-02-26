<template>
  <div id="content" class="container" :style="{ 'min-height': withFootHeight + 'px' }">
    <div v-if="load == true">
      <br>
      <center><loading :size="160"/></center>
    </div>
    <div v-else class="row">
      <div class="col-12 col-md-2 offset-md-2">
        <img :src="entry.cover_url" :alt="entry.title" />
      </div>
      <div class="col-10 offset-1 col-md-5 offset-md-0">
        <div style="padding-top: 10px;">
          <div>
            <div style="text-align: left;">
              <big class="btn-xs intro">{{ type === 'novel' ? '小說' : '漫畫' }}</big>
              <h4><strong>{{ entry.title }}</strong></h4>
            </div>
            <div class="d-none d-lg-block" style="text-align: right;">
              <a :href="entry.url">
                <small class="btn-xs btn-color-2 intro">{{ entry.dns }}</small>
              </a>
              &nbsp;
              <small class="btn-xs btn-color-1 intro">
                {{ formatDate(entry.lastCrawlTime, true) }}
              </small>
              <br>
            </div>
            <div class="d-md-none" style="text-align: right;">
              <a :href="entry.url">
                <small class="btn-xs btn-color-2 intro">
                  <font-awesome-icon icon="link"/>&nbsp;Source
                </small>
              </a>
              &nbsp;
              <small class="btn-xs btn-color-1 intro">
                {{ simpleFormatDate(entry.lastCrawlTime) }}
              </small>
              <br>
            </div>
          </div>
          <hr>
          <h6 style="text-align: right;"><strong>{{ entry.author }} / 著</strong></h6>
        </div>
        <div style="padding-top: 10px; text-align: left;">
          <p>{{ entry.description }}</p><br>
        </div>
      </div>
      <div class="col-10 offset-1">
        <div class="row">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item"
              v-for="each, idx in chapterGroups" :key="idx"
            >
              <h2 class="accordion-header" :id="`heading-${idx}`">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse-${idx}`"
                  aria-expanded="false"
                  :aria-controls="`collapseOne-${idx}`"
                >
                  {{ `${each[0].title} ~ ${each[each.length - 1].title}` }}
                </button>
              </h2>
              <div
                :id="`collapse-${idx}`"
                class="accordion-collapse collapse"
                :aria-labelledby="`heading-${idx}`"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body row">
                  <div
                    class="col-md-3 offset-md-0 col-11 offset-1 left middle"
                    style="padding: 3px 0;"
                    v-for="{ title } in each" :key="title"
                  >
                    {{ title }}
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
  ref, watch, inject, defineComponent, ComputedRef, onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import fetchAPI from '@/api/fetch';
import utils from '@/utils';
import { ChapterInfo, Novel } from '@/api/type';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { params } = useRoute();
    const { fetchComicByID, fetchNovelByID } = fetchAPI();
    const { formatDate, simpleFormatDate, chunkArray } = utils();
    const load = ref(true);
    const type = ref('');
    const id = ref('');
    const entry = ref<Novel>({
      novelID: '',
      dns: '',
      url: '',
      chapters: [],
      isEnable: true,
      title: '',
      author: '',
      description: '',
      cover_url: '',
      lastCrawlTime: new Date(0),
    });
    const chapterGroups = ref<Array<Array<ChapterInfo>>>([]);
    const withFootHeight = inject('withFootHeight');
    const session = inject<ComputedRef<string>>('session')!;

    onMounted(async () => {
      load.value = true;
      const { type: routeType, id: routeId } = params;

      type.value = routeType as string;
      id.value = routeId as string;
      switch (type.value) {
        case 'novel':
          entry.value = await fetchNovelByID(session.value, id.value);
          break;
        case 'comic':
          entry.value = await fetchComicByID(session.value, id.value);
          break;
        default:
          return router.go(-1);
      }

      load.value = false;
      return null;
    });

    watch(
      () => entry.value.chapters,
      (val) => {
        const a = chunkArray<ChapterInfo>(val, 20);
        chapterGroups.value = a;
        console.log(a);
      },
      { immediate: true, deep: true },
    );

    return {
      session,
      withFootHeight,
      load,
      type,
      id,
      entry,
      chapterGroups,
      fetchComicByID,
      fetchNovelByID,
      formatDate,
      simpleFormatDate,
    };
  },
});
</script>

<style scoped>
  .accordion-button.collapsed {
    color: #d3d3d3;
    background-color: #415a6f;
  }
  .accordion-body {
    margin: 0;
    color: #d3d3d3;
    background-color: #2c3e50;
  }
  img {
    min-width: 98px;
    min-height: 130px;
    max-width: 160px;
    max-height: 212px;
    border-radius: .5em;
  }
  hr {
    background-color: #d3d3d3;
  }
  .intro {
    border-radius: 0.5em;
    border-width: 1px;
    border-style: solid;
    padding: 0 10px;
  }
  .left {
    text-align: left;
  }
  .middle {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
