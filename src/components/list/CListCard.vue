<template>
  <router-link :to="{
    path: (entry.novelID !== undefined ? `/novel/${entry.novelID}` : `/comic/${entry.comicID}`),
  }">
    <div class="list-card">
      <img v-lazy="entry.coverUrl" :alt="entry.title"  referrerpolicy="no-referrer" />
      <div class="text-info-section">
        <div style="text-align: left;">
          <h6><strong>{{ entry.title }}</strong></h6>
        </div>
        <div style="text-align: right;">
          <small>{{ entry.author }} / 著</small>
        </div>
      </div>
      <div class="icon-info-section d-none d-lg-block">
        <router-link :to="{ path: `/info/${entry.novelID !== undefined
          ? `novel/${entry.novelID}` : `comic/${entry.comicID}`}` }"
        >
          <small tag="small" class="btn-xm btn-color-2 intro">簡介</small>
        </router-link>
        &nbsp;
        <router-link :to="{ path: (entry.novelID !== undefined
          ? `/novel/${entry.novelID}` : `/comic/${entry.comicID}`) }"
        >
          <small class="btn-xm btn-color-3 intro">閱讀</small>
        </router-link><br>
        <small class="btn-xm btn-color-1 intro">{{ formatDate(entry.lastCrawlTime) }}</small><br>
      </div>
      <div class="d-md-none">
        <router-link :to="{ path: `/info/${entry.novelID !== undefined
          ? `novel/${entry.novelID}` : `comic/${entry.comicID}`}` }"
        >
          <small class="btn-xm btn-color-2 intro">
            <font-awesome-icon icon="info-circle"/>
          </small>
        </router-link>
        &nbsp;
        <router-link :to="{ path: (entry.novelID !== undefined
          ? `/novel/${entry.novelID}` : `/comic/${entry.comicID}`) }"
        >
          <small class="btn-xm btn-color-3 intro">
            <font-awesome-icon icon="book-open"/>
          </small>
        </router-link><br>
        <small class="btn-xm btn-color-1 intro">{{ simpleFormatDate(entry.lastCrawlTime) }}</small>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import utils from '@/utils';

export default defineComponent({
  name: 'list-card',
  props: ['entry'],
  setup() {
    const { formatDate, simpleFormatDate } = utils();
    return { formatDate, simpleFormatDate };
  },
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
  .list-card {
    border-width: 1px;
    border-color: #ffffff;
    border-style: solid;
    border-radius: .5em;
    padding: 30px 15px 20px 15px;
    margin: 10px 0 10px 0;
  }
  .intro {
    border-radius: 0.5em;
    border-width: 1px;
    border-style: solid;
    padding: 0 10px;
  }
  .text-info-section {
    padding: 15px 0 10px 0;
    text-align: left;
  }
  .icon-info-section {
    text-align: right;
  }
</style>
