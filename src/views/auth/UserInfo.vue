<template>
  <div id="content" class="container" :style="{ 'min-height': $root.$data.withFootHeight + 'px' }">
    <div class="row">
      <div class="col-10 offset-1 col-md-6 offset-md-3">
        <div class="row">
          帳號<br>
          <div class="col-12 right">&nbsp;{{ account }}</div>
        </div>
        <div class="row">
          註冊時間<br>
          <div class="col-12 right">&nbsp;{{ $root.formatDate(registerDatetime) }}</div>
        </div>
        <div class="row">
          上次登入時間<br>
          <div class="col-12 right">
          &nbsp;{{ $root.formatDate(lastLoginDatetime)}}
          </div>
        </div>
        <div class="row">
          <label>書籤</label>&nbsp;
          <div class="col-12 booksList">
            <div class="row">
              <div class="col left">小說書名 / 作者</div>
              <div class="col-5 right">上次章節</div>
            </div>
            <div v-for="val in bookmark.novel" :key="val.id" class="row bookRow">
              <div class="col left">
                <div class="d-none d-md-block">
                  <span :title="'上次閱讀: ' + val.lastReadDatetime">{{ val.info.title }}</span>
                  &nbsp;/&nbsp;{{ val.info.author }}
                </div>
                <div class="d-md-none">
                  <small>
                    <span :title="'上次閱讀: ' + val.lastReadDatetime">{{ val.info.title }}</span><br>
                    <div class="right">{{ val.info.author }}&nbsp;/&nbsp;著</div>
                  </small>
                </div>
              </div>
              <div class="col-4 col-md-3 right center">
                <small>
                  {{ val.lastReadIndex }}&nbsp;
                  <router-link :to="{ path: ('/novel/' + val.info.novelID) }">
                    <font-awesome-icon icon="book-open"/>
                  </router-link>
                </small>
              </div>
            </div>
          </div>
          <div class="col-12 booksList">
            <div class="row">
              <div class="col left">漫畫書名 / 作者</div>
              <div class="col-5 right">上次章節</div>
            </div>
            <div v-for="val in bookmark.comic" :key="val.id" class="row bookRow">
              <div class="col left">
                <div class="d-none d-md-block">
                  <span :title="'上次閱讀: ' + val.lastReadDatetime">{{ val.info.title }}</span>
                  &nbsp;/&nbsp;{{ val.info.author }}
                </div>
                <div class="d-md-none">
                  <small>
                    <span :title="'上次閱讀: ' + val.lastReadDatetime">{{ val.info.title }}</span><br>
                    <div class="right">{{ val.info.author }}&nbsp;/&nbsp;著</div>
                  </small>
                </div>
              </div>
              <div class="col-4 col-md-3 right center">
                <small>
                  {{ val.lastReadIndex }}&nbsp;
                  <router-link :to="{ path: ('/comic/' + val.info.comicID) }">
                    <font-awesome-icon icon="book-open"/>
                  </router-link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data () {
    return {
      account: "guest",
      registerDatetime: "",
      lastLoginDatetime: "",
      bookmark: {
        novel: [],
        comic: [],
      }
    }
  },
  async mounted () {
    await this.$root.fetchBookmark(true);
    let auth = this.$vuex.getters.getAuth();
    this.account = auth.account;
    this.registerDatetime = auth.registerDatetime;
    this.lastLoginDatetime = auth.lastLoginDatetime;
    for (let each in auth.bookmark.novel) {
      let bookmarkData = auth.bookmark.novel[each];
      let data = this.$vuex.getters.getNovelByID(each);
      if (data !== undefined) {
        const bookmark = {
          ...bookmarkData,
            "info": data,
        };
        if (this.bookmark.novel.length > 0 &&
            this.bookmark.novel[0].lastReadDatetime < bookmarkData.lastReadDatetime) {
          this.bookmark.novel.unshift(bookmark);
        } else {
          this.bookmark.novel.push(bookmark);
        }
      }
    }
    for (let each in auth.bookmark.comic) {
      let bookmarkData = auth.bookmark.comic[each];
      let data = this.$vuex.getters.getComicByID(each);
      if (data !== undefined) {
        const bookmark = {
          ...bookmarkData,
            "info": data,
        };

        if (this.bookmark.comic.length > 0 &&
            this.bookmark.comic[0].lastReadDatetime < bookmarkData.lastReadDatetime) {
          this.bookmark.comic.unshift(bookmark);
        } else {
          this.bookmark.comic.push(bookmark);
        }
      }
    }
  },
}
</script>

<style scoped>
  div.left {
    text-align: left;
  }
  div.right {
    text-align: right;
  }
  div.center {
    margin-top: auto;
    margin-bottom: auto;
  }
  .booksList {
    padding-top: 5px;
  }
  .bookRow {
    border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
  }
</style>

