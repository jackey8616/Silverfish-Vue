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
                {{ formatDate(entry.lastCrawlTime) }}
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
          <div
            class="col-md-3 offset-md-0 col-11 offset-1 left middle" style="padding: 3px 0;"
            v-for="each in entry.chapters" :key="each.title"
          >
            {{ each.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref, reactive, inject, defineComponent, ComputedRef,
} from 'vue';
import { useRoute } from 'vue-router';

import fetchAPI from '@/api/fetch';
import utils from '@/utils';

export default defineComponent({
  setup() {
    const route = useRoute();
    const { fetchComicByID, fetchNovelByID } = fetchAPI();
    const { formatDate, simpleFormatDate } = utils();
    const load = ref(true);
    const type = ref('');
    const id = ref('');
    const entry = reactive({});
    const withFootHeight = inject('withFootHeight');
    const session = inject<ComputedRef<string>>('session')!;

    return {
      session,
      routeType: route.params.type,
      routeId: route.params.id,
      withFootHeight,
      load,
      type,
      id,
      entry,
      fetchComicByID,
      fetchNovelByID,
      formatDate,
      simpleFormatDate,
    };
  },
  /* eslint-disable no-param-reassign */
  beforeRouteEnter(to: any, from: any, next: any) {
    next(async (vm: any) => {
      const {
        session, routeType, routeId,
        fetchNovelByID, fetchComicByID,
      } = vm;
      vm.type = routeType;
      vm.id = routeId;
      if (routeType === 'novel') {
        vm.entry = await fetchNovelByID(session, routeId);
      } else if (routeType === 'comic') {
        vm.entry = await fetchComicByID(session, routeId);
      } else {
        return false;
      }
      vm.load = false;
      return true;
    });
  },
  /* eslint-enable no-param-reassign */
});
</script>

<style scoped>
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
