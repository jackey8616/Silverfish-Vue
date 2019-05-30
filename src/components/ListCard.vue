<template>
  <div class="col-6 col-md-3">
    <router-link :to="{ path: (entry.novelID !== undefined ? '/novel/' + entry.novelID : '/comic/' + entry.comicID) }" tag="div" class="list-card">
      <img :src="entry.coverUrl">
      <div>
        <strong>{{ entry.title }}</strong><br>
        <span>{{ entry.author }} / 著</span><br>
        <!--router-link :to="{ path: (entry.novelID !== undefined ? '/novel_intro/' + entry.novelID : '/comic_intro/' + entry.comicID) }" class="intro">簡介</router-link-->
        &nbsp;
        <router-link :to="{ path: (entry.novelID !== undefined ? '/novel/' + entry.novelID : '/comic/' + entry.comicID) }" class="intro">閱讀</router-link>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'list-card',
  props: ['entry']
}
</script>

<style scoped>
  img {
    max-height: 320px;
    min-height: 162px;
    max-width: 160px;
    border-radius: .5em;
  }
  .list-card {
    border-width: 1px;
    border-color: #ffffff;
    border-style: solid;
    border-radius: .5em;
    padding: 30px 15px 30px 15px;
    margin: 10px 0 10px 0;
  }
  .intro {
    border-radius: 0.5em;
    border-width: 1px;
    border-style: solid;
    padding: 0 10px;
  }
</style>
