<template>
  <div id="content" class="container" :style="{ 'min-height': $root.$data.height + 'px' }">
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
              <a :href="entry.url"><small class="btn-xs btn-color-2 intro">{{ entry.dns }}</small></a>
              &nbsp;
              <small class="btn-xs btn-color-1 intro">{{ $root.formatDate(entry.lastCrawlTime) }}</small><br>
            </div>
            <div class="d-md-none" style="text-align: right;">
              <a :href="entry.url">
                <small class="btn-xs btn-color-2 intro">
                  <font-awesome-icon icon="link"/>&nbsp;Source
                </small>
              </a>
              &nbsp;
              <small class="btn-xs btn-color-1 intro">{{ $root.simpleFormatDate(entry.lastCrawlTime) }}</small><br>
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
          <div v-for="each in entry.chapters" :key="each.title" class="col-md-3 offset-md-0 col-11 offset-1 left middle" style="padding: 3px 0;">
            {{ each.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  metaInfo () {
    return {
      title: this.entry.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.entry.description },
        { vmid: 'og:title', property: 'og:title', content: this.entry.title },
        { vmid: 'og:url' , property: 'og:url', content: `${this.type}_intro/${this.entry.novelID}` },
        { vmid: 'og:description', property: 'og:description', content: this.entry.description },
        { vmid: 'og:image', property: 'og:image', content: this.entry.coverURL },
        { vmid: 'og:type', property: 'og:type', content: this.type },
      ],
      script: [
        {
          vmid: "ldjson-schema",
          innerHTML: `{
            "@context": "http://schema.org",
            "@type": "Article",
            "name": "${this.entry.title}",
            "author": {
              "@type": "Person",
              "name": "${this.entry.author}"
            },
            "image": "${this.entry.cover_url}"
          }`,
          type: "application/ld+json"
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      (async() => {
        const session = vm.$vuex.getters.getSession();
        vm.type = vm.$route.params.type;
        vm.id = vm.$route.params.id;
        if (vm.type == "novel") {
          vm.entry = await vm.$api.fetchNovelByID(session, vm.id)
        } else if (vm.type == "comic") {
          vm.entry = await vm.$api.fetchComicByID(session, vm.id)
        } else {
          return false;
        }
        vm.load = false;
        return true;
      })();
    });
  },
  data () {
    return {
      load: true,
      type: '',
      id: '',
      entry: {}
    }
  },
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
  .left {
    text-align: left;
  }
  .middle {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
