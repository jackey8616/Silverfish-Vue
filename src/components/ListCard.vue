<template>
  <div class="col-6 col-md-3">
    <router-link :to="{ path: (entry.novelID !== undefined ? '/novel/' + entry.novelID : '/comic/' + entry.comicID) }" tag="div" class="list-card">
      <img :src="entry.coverUrl">
      <div class="text-info-section">
        <div style="text-align: left;">
          <h6><strong>{{ entry.title }}</strong></h6>
        </div>
        <div style="text-align: right;">
          <small>{{ entry.author }} / 著</small>
        </div>
      </div>
      <div class="icon-info-section d-none d-lg-block">
        <router-link :to="{ path: (entry.novelID !== undefined ? '/novel_intro/' + entry.novelID : '/comic_intro/' + entry.comicID) }" tag="small" class="btn-xm btn-primary intro">簡介</router-link>
        &nbsp;
        <router-link :to="{ path: (entry.novelID !== undefined ? '/novel/' + entry.novelID : '/comic/' + entry.comicID) }" tag="small" class="btn-xm btn-primary intro">閱讀</router-link><br>
        <small class="btn-xm btn-success intro">{{ formatDate(entry.lastCrawlTime) }}</small><br>
      </div>
      <div class="d-md-none">
        <router-link :to="{ path: (entry.novelID !== undefined ? '/novel_intro/' + entry.novelID : '/comic_intro/' + entry.comicID) }" tag="small" class="btn-xm btn-primary intro">
          <i class="fas fa-info-circle"></i>
        </router-link>
        &nbsp;
        <router-link :to="{ path: (entry.novelID !== undefined ? '/novel/' + entry.novelID : '/comic/' + entry.comicID) }" tag="small" class="btn-xm btn-primary intro">
          <i class="fas fa-book-open"></i>
        </router-link><br>
        <small class="btn-xm btn-success intro">{{ simpleFormatDate(entry.lastCrawlTime) }}</small>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'list-card',
  props: ['entry'],
  methods: {
    formatDate (dateStr) {
      let date = new Date(dateStr);
      let m = `0${date.getMonth() + 1}`.slice(-2);
      let d = `0${date.getDate()}`.slice(-2);
      let h = `0${date.getHours()}`.slice(-2);
      let M = `0${date.getMinutes()}`.slice(-2);
      return `${date.getFullYear()}/${m}/${d} ${h}:${M}`;
    },
    simpleFormatDate (dateStr) {
      let date = new Date(dateStr);
      let y = date.getFullYear().toString().substr(-2);
      let m = `0${date.getMonth() + 1}`.slice(-2);
      let d = `0${date.getDate()}`.slice(-2);
      return `${y}/${m}/${d}`;
    }
  }
}
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
