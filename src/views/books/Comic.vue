<template>
  <div id="content" :style="{ 'min-height': $root.$data.height + 'px' }">
    <div id="article" class="container">
      <div v-if="Object.keys(comic).length !== 0" class="row">
        <reader-nav
          :type="'comic'"
          :id="comicID"
          :currentIndex="currentIndex" @changeIndex="onChangeIndex"
          :chapterLength="comic.chapters.legnth"/>
        <div class="col-12">
          <div id="comic">
            <div v-for="each in sections" :key="each.index">
              <img v-for="every in each.content" :key="every" :src="every" referrerpolicy="no-referrer" />
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
  </div>
</template>

<script>
import ReaderNav from '@/components/ReaderNav';

export default {
  name: 'comic',
  components: { ReaderNav },
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
  async created () {
    const session = this.$vuex.getters.getSession();
    this.comicID = this.$route.params.comicID;

    if (!this.$vuex.getters.isComicIDExists(this.comicID)) {
      let comic = await this.$api.fetchComicByID(session, this.comicID)
      this.$vuex.commit('insertComic', {comicID: this.comicID, comic: comic})
    } else {
      let localComic = this.$vuex.getters.getComicByID(this.comicID);
      if (localComic.cahpers === undefined || this.$vuex.getters.isComicNeedUpdate(this.comicID)) {
        let comic = await this.$api.fetchComicByID(session, this.comicID)
        this.$vuex.commit('updateComic', {comicID: this.comicID, comic: comic})
      }
      this.currentIndex = this.bookmark['lastReadIndex'] || this.currentIndex
    }
    this.get();
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
    onChangeIndex(index) {
      this.currentIndex = index;
      this.get();
    },
    async get () {
      this.sections = [];
      this.fetchIndex = this.currentIndex - 1;
      this.transitIndex = this.currentIndex - 1;
      
      await this.fetchComicChapter(this.fetchIndex++).then(data => this.sections.push(data));
      await this.fetchComicChapter(this.fetchIndex++).then(data => this.sections.push(data));
    },
    fetchComicChapter (index) {
      return this.$api.fetchComicChapter(this.$vuex.getters.getSession(), this.comicID, index).then(data => {
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
</style>

