<template>
  <div>
    <img :src="entry.cover_url">
    <strong>{{ entry.title }}</strong>
    {{ entry.author }}
    {{ entry.dns }}
    {{ entry.description }}
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
  }
}
</script>

<style scoped>
  img {
    max-height: 320px;
    min-height: 162px;
    max-width: 160px;
    border-radius: .5em;
  }
</style>
