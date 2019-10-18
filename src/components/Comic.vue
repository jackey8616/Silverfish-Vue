<template>
  <div id="article" class="container">
    <div v-if="Object.keys(comic).length !== 0" class="row">
      <aside class="col-2 col-md-1">
        <affix class="sidebar-menu" relative-element-selector="#comic" align="left">
          <router-link :to="{ name: 'home' }" tag="button" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
            <font-awesome-icon icon="home"/>
          </router-link><br/>
          <input v-model="currentIndex" class="sticky-bar-el chapter-text form-control form-control-sm" :class="{'bg-white': lightOn, 'text-dark': lightOn, 'bg-dark': !lightOn, 'text-white': !lightOn}" maxlength="5" />
          <button @click="get" :disabled="comic.chapters.length === 0" class="sticky-bar-el btn btn-circle btn-sm" :class="{'btn-primary': lightOn, 'btn-secondary': !lightOn}">
            <font-awesome-icon icon="arrow-right"/>
          </button><br />
        </affix>
      </aside>
      <div class="col-10 col-md-10">
        <div id="comic">
          <div v-for="each in sections" :key="each.index">
            <img v-for="every in each.content" :key="every" :src="every"/>
            <hr v-observe-visibility="{callback: (isVisible, entry) => observe(isVisible, entry, each)}"/>
          </div>
        </div>
        <div>
          <br><br>
          <center><loading :size="150"/></center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Affix } from 'vue-affix';

export default {
  name: 'comic',
  components: { Affix },
  data () {
    return {
      comicID: "",
      lightOn: false,
      loading: false,
      sections: [],
      fetchIndex: 0,
      currentIndex: 1,
      transitIndex: 0
    }
  },
  created () {
    this.comicID = this.$route.params.comicID;
    (async() => {
      if (!this.$vuex.getters.isComicIDExists(this.comicID)) {
        let comic = await this.$fetchComicByID(this.comicID)
        this.$vuex.commit('insertComic', {comicID: this.comicID, comic: comic})
      } else {
        let localComic = this.$vuex.getters.getComicByID(this.comicID);
        if (localComic.cahpers === undefined || this.$vuex.getters.isComicNeedUpdate(this.comicID)) {
          let comic = await this.$fetchComicByID(this.comicID)
          this.$vuex.commit('updateComic', {comicID: this.comicID, comic: comic})
        }
        this.currentIndex = this.bookmark['lastReadIndex'] || this.currentIndex
      }
      this.get();
    })();
  },
  computed: {
    bookmark () {
      return this.$vuex.getters.getComicBookmarkByID(this.comicID) || {}
    },
    comic () {
      return this.$vuex.getters.getComicByID(this.comicID) || {}
    }
  },
  methods: {
    get () {
      this.sections = [];
      this.fetchIndex = this.currentIndex - 1;
      this.transitIndex = this.currentIndex - 1;
      (async() => {
        await this.fetchComicChapter(this.fetchIndex++).then(data => this.sections.push(data));
        await this.fetchComicChapter(this.fetchIndex++).then(data => this.sections.push(data));
      })();
    },
    fetchComicChapter (index) {
      return this.$fetchComicChapter(this.comicID, index).then(data => {
        return {
          index: index,
          content: data
        }
      })
    },
    observe(isVisible, entry, section) {
      if (isVisible) {
        if (this.transitIndex < section.index) {
          this.currentIndex = section.index + 1;
          this.transitIndex = section.index;
          this.bookmark['lastReadIndex'] = this.currentIndex;
          this.$vuex.commit('insertComicBookmark', { comicID: this.comic.comicID, bookmark: this.bookmark});
          if (!this.loading && this.fetchIndex - this.currentIndex < 1) {
            this.loading = true;
            this.fetchComicChapter(this.fetchIndex++).then(data => this.sections.push(data));
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .container.light-on {
    background-color: white;
    color:  #2c3e50;
  }
  .container.light-off {
    color: #d3d3d3;
  }
  .sticky-bar-el {
    margin-left: 0px;
    margin-top: 5px;
    width: 40px;
    height: 31px;
  }
  .sticky-bar-el.chapter-text {
    font-size: 10px;
    padding: 3px;
  }
  input.sticky-bar-el {
    text-align: center;
    line-height: 31px;
    height: 40px;
    border-radius: 20px;
  }
  .btn-circle {
    width: 40px;
    height: 40px;
    padding: 6px 0px;
    border-radius: 20px;
    text-align: center;
    line-height: 1.42857;
  }
</style>

