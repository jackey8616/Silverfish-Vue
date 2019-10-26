<template>
  <div id="content" :style="{ 'min-height': $root.$data.height + 'px' }">
    <div
      id="article"
      class="container"
      :class="{ 'light-on': lightOn, 'light-off': !lightOn }"
    >
      <div v-if="Object.keys(novel).length !== 0" class="row">
        <aside class="col-2 col-md-1">
          <affix
            class="sidebar-menu"
            relative-element-selector="#novel"
            align="left"
          >
            <button
              @click="$router.go(-1)"
              class="sticky-bar-el btn btn-circle btn-sm"
              :class="{ 'btn-primary': lightOn, 'btn-secondary': !lightOn }"
            >
              <font-awesome-icon icon="home" />
            </button>
            <br />
            <router-link
              :to="{ path: '/info/novel/' + novelID }"
              tag="button"
              class="sticky-bar-el btn btn-circle btn-sm"
              :class="{ 'btn-primary': lightOn, 'btn-secondary': !lightOn }"
            >
              <font-awesome-icon icon="info" />
            </router-link>
            <br />
            <button
              @click="isTW = !isTW"
              class="sticky-bar-el btn btn-circle btn-sm"
              :class="{ 'btn-primary': lightOn, 'btn-secondary': !lightOn }"
            >
              {{ isTW ? "TW" : "CH" }}
            </button>
            <br />
            <button
              @click="lightOn = !lightOn"
              class="sticky-bar-el btn-circle btn btn-sm"
              :class="{ 'btn-primary': lightOn, 'btn-secondary': !lightOn }"
            >
              <font-awesome-icon v-if="lightOn" :icon="['fa', 'lightbulb']" />
              <font-awesome-icon v-if="!lightOn" :icon="['far', 'lightbulb']" />
            </button>
            <br />
            <button
              @click="fontSize = fontSize === 4 ? 1 : fontSize + 1"
              class="sticky-bar-el btn btn-circle btn-sm"
              :class="{ 'btn-primary': lightOn, 'btn-secondary': !lightOn }"
            >
              {{ ["Sm", "Md", "Lg", "Xl"][fontSize - 1] }}
            </button>
            <br />
            <input
              v-model="currentIndex"
              class="sticky-bar-el chapter-text form-control form-control-sm"
              :class="{
                'bg-white': lightOn,
                'text-dark': lightOn,
                'bg-dark': !lightOn,
                'text-white': !lightOn
              }"
              maxlength="5"
            />
            <button
              @click="get"
              :disabled="novel.chapters.length === 0"
              class="sticky-bar-el btn btn-circle btn-sm"
              :class="{ 'btn-primary': lightOn, 'btn-secondary': !lightOn }"
            >
              <font-awesome-icon icon="arrow-right" />
            </button>
            <br />
          </affix>
        </aside>
        <div class="col-10 col-md-10">
          <div
            id="novel"
            :class="{
              'novel-font-sm': fontSize === 1,
              'novel-font-md': fontSize === 2,
              'novel-font-lg': fontSize === 3,
              'novel-font-xl': fontSize === 4
            }"
          >
            <chapter-section
              v-for="each in sections"
              :key="each.index"
              :isTW="isTW"
              :single="each"
              v-observe-visibility="{
                callback: (isVisible, entry) => observe(isVisible, entry, each),
                throttle: 300
              }"
            />
          </div>
          <div>
            <br />
            <br />
            <center>
              <loading :size="150" />
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Affix } from "vue-affix";
import ChapterSection from "@/components/ChapterSection";

export default {
  name: "novel",
  components: { Affix, ChapterSection },
  data() {
    return {
      novelID: "",
      isTW: true,
      lightOn: false,
      fontSize: 1,
      loading: false,
      sections: [],
      fetchIndex: 0,
      currentIndex: 1,
      transitIndex: 0
    };
  },
  async created() {
    const session = this.$vuex.getters.getSession();
    this.novelID = this.$route.params.novelID;

    if (!this.$vuex.getters.isNovelIDExists(this.novelID)) {
      let novel = await this.$api.fetchNovelByID(session, this.novelID);
      this.$vuex.commit("insertNovel", { novelID: this.novelID, novel: novel });
    } else {
      let localNovel = this.$vuex.getters.getNovelByID(this.novelID);
      if (
        localNovel.chapters === undefined ||
        this.$vuex.getters.isNovelNeedUpdate(this.novelID)
      ) {
        let novel = await this.$api.fetchNovelByID(session, this.novelID);
        this.$vuex.commit("updateNovel", {
          novelID: this.novelID,
          novel: novel
        });
      }
      this.currentIndex = this.bookmark["lastReadIndex"] || this.currentIndex;
    }
    this.get();
  },
  computed: {
    bookmark() {
      return this.$vuex.getters.getNovelBookmarkByID(this.novelID) || {};
    },
    novel() {
      return this.$vuex.getters.getNovelByID(this.novelID) || {};
    }
  },
  methods: {
    async get() {
      this.sections = [];
      this.fetchIndex = this.currentIndex - 1;
      this.transitIndex = this.currentIndex - 1;

      await this.fetchChapter(this.fetchIndex++).then(data =>
        this.sections.push(data)
      );
      await this.fetchChapter(this.fetchIndex++).then(data =>
        this.sections.push(data)
      );
    },
    fetchChapter(index) {
      return this.$api
        .fetchNovelChapter(this.$vuex.getters.getSession(), this.novelID, index)
        .then(data => {
          return {
            index: index,
            title: this.novel.chapters[index].title,
            content: data
          };
        });
    },
    observe(isVisible, entry, section) {
      if (isVisible) {
        if (this.transitIndex < section.index) {
          this.currentIndex = section.index + 1;
          this.transitIndex = section.index;
          this.bookmark["lastReadIndex"] = this.currentIndex;
          this.$vuex.commit("insertNovelBookmark", {
            novelID: this.novel.novelID,
            bookmark: this.bookmark
          });
          if (!this.loading && this.fetchIndex - this.currentIndex < 1) {
            this.loading = true;
            this.fetchChapter(this.fetchIndex++).then(data =>
              this.sections.push(data)
            );
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.container.light-on {
  background-color: white;
  color: #2c3e50;
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
.btn-circle {
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  border-radius: 20px;
  text-align: center;
  line-height: 1.42857;
}
</style>
