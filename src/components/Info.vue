<template>
  <div class="row">
    <div class="col-12 col-md-2 offset-md-2">
      <img :src="entry.cover_url">
    </div>
    <div class="col-10 offset-1 col-md-5 offset-md-0">
      <div style="padding-top: 10px;">
        <div>
          <div style="text-align: left;">
            <big class="btn-xs intro">{{ type === 'novel' ? '小說' : '漫畫' }}</big>
            <h4><strong>{{ entry.title }}</strong></h4>
          </div>
          <div class="d-none d-lg-block" style="text-align: right;">
            <a :href="entry.url"><small class="btn-xs btn-color-2 intro">{{ entry.dns }}</small></a>
            &nbsp;
            <small class="btn-xs btn-color-1 intro">{{ formatDate(entry.lastCrawlTime) }}</small><br>
          </div>
          <div class="d-md-none" style="text-align: right;">
            <a :href="entry.url">
              <small class="btn-xs btn-color-2 intro">
                <font-awesome-icon icon="link"/>&nbsp;Source
              </small>
            </a>
            &nbsp;
            <small class="btn-xs btn-color-1 intro">{{ simpleFormatDate(entry.lastCrawlTime) }}</small><br>
          </div>
        </div>
        <hr>
        <h6 style="text-align: right;"><strong>{{ entry.author }} / 著</strong></h6>
      </div>
      <div style="padding-top: 10px; text-align: left;">
        <p>{{ entry.description }}</p><br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      type: '',
      id: '',
      entry: {}
    }
  },
  created () {
    (async() => {
      if (this.$route.params.novelID !== undefined) {
        this.type = 'novel';
        this.id = this.$route.params.novelID;
        this.entry = await this.$fetchNovelByID(this.id)
      } else {
        this.type = 'comic';
        this.id = this.$route.params.comicID;
        this.entry = await this.$fetchComicByID(this.id)
      }
    })();
  },
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
  hr {
    background-color: #d3d3d3;
  }
  .intro {
    border-radius: 0.5em;
    border-width: 1px;
    border-style: solid;
    padding: 0 10px;
  }
</style>
