<template>
  <div id="content" :style="{ 'min-height': $root.$data.height + 'px' }">
    <div id="article" class="container" :class="{'light-on': lightOn,'light-off': !lightOn}">
      <div v-if="Object.keys(novel).length !== 0" class="row">
        <reader-nav
          :type="'novel'"
          :id="novelID"
          :isTW="isTW" @changeSimplified="onChangeSimplified"
          :lightOn="lightOn" @changeLight="onChangeLight"
          :fontSize="fontSize" @changeFontSize="onChangeFontSize"
          :currentIndex="currentIndex" @changeIndex="onChangeIndex"
          :chapterLength="novel.chapters.legnth"/>
        <div class="col-12">
          <div id="novel" :class="{'novel-font-sm': fontSize === 1, 'novel-font-md': fontSize === 2, 'novel-font-lg': fontSize === 3, 'novel-font-xl': fontSize === 4}">
            <chapter-section v-for="each in sections" :key="each.index" :isTW="isTW" :single="each" v-observe-visibility="{
              callback: (isVisible, entry) => observe(isVisible, entry, each),
              throttle: 300,
              }" />
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
import ChapterSection from '@/components/ChapterSection';

export default {
  name: "novel",
  components: { ReaderNav, ChapterSection },
  data() {
    return {
      novelID: "",
      loading: false,
      fontSize: 1,
      isTW: true,
      lightOn: false,
      sections: [],
      fetchIndex: 0,
      currentIndex: 1,
      transitIndex: 0
    };
  },
  async created () {
    const session = this.$vuex.getters.getSession();
    this.novelID = this.$route.params.novelID;
    
    if (!this.$vuex.getters.isNovelIDExists(this.novelID)) {
      let novel = await this.$api.fetchNovelByID(session, this.novelID)
      this.$vuex.commit('insertNovel', {novelID: this.novelID, novel: novel});
    } else {
      let localNovel = this.$vuex.getters.getNovelByID(this.novelID);
      if (localNovel.chapters === undefined || this.$vuex.getters.isNovelNeedUpdate(this.novelID)) {
        let novel = await this.$api.fetchNovelByID(session, this.novelID);
        this.$vuex.commit('updateNovel', {novelID: this.novelID, novel: novel})
      }
      this.currentIndex = this.bookmark['lastReadIndex'] || this.currentIndex;
    }
    this.get();
  },
  computed: {
    bookmark() {
      return this.$vuex.getters.getNovelBookmarkByID(this.novelID) || {}
    },
    novel() {
      return this.$vuex.getters.getNovelByID(this.novelID) || {}
    }
  },
  methods: {
    onChangeSimplified(isTW) {
      this.isTW = isTW;
    },
    onChangeLight(lightOn) {
      this.lightOn = lightOn;
    },
    onChangeFontSize(fontSize) {
      this.fontSize = fontSize;
    },
    onChangeIndex(index) {
      this.currentIndex = index;
      this.get();
    },
    async get() {
      this.sections = [];
      this.fetchIndex = this.currentIndex - 1;
      this.transitIndex = this.currentIndex - 1;

      await this.fetchChapter(this.fetchIndex++).then(data => this.sections.push(data));
      await this.fetchChapter(this.fetchIndex++).then(data => this.sections.push(data));
    },
    fetchChapter(index) {
      return this.$api.fetchNovelChapter(this.$vuex.getters.getSession(), this.novelID, index).then(data => {
        return {
          index: index,
          title: this.novel.chapters[index].title,
          content: data
        };
      })
    },
    observe(isVisible, entry, section) {
      if (isVisible) {
        if (this.transitIndex < section.index) {
          this.currentIndex = section.index + 1;
          this.transitIndex = section.index;
          this.bookmark['lastReadIndex'] = this.currentIndex;
          this.$vuex.commit('insertNovelBookmark', { novelID: this.novel.novelID, bookmark: this.bookmark});
          if (!this.loading && this.fetchIndex - this.currentIndex < 1) {
            this.loading = true;
            this.fetchChapter(this.fetchIndex++).then(data => this.sections.push(data));
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        }
      }
    },
  }
};
</script>

<style scoped>
  .container.light-on {
    background-color: white;
    color:  #2c3e50;
  }
  .container.light-off {
    color: #d3d3d3;
  }
  .novel-font-sm {
    font-size: 1rem;
  }
  .novel-font-md {
    font-size: 1.125rem;
  }
  .novel-font-lg {
    font-size: 1.25rem;
  }
  .novel-font-xl {
    font-size: 1.5rem;
  }
</style>
