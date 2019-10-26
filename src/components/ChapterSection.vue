<template>
  <div>
    <h4>{{ switchTWCH(single.title) }}</h4>
    <div v-html="switchTWCH(single.content)" />
  </div>
</template>

<script>
import { tify, sify } from "chinese-conv";

export default {
  name: "chapter-section",
  props: {
    single: Object,
    isTW: Boolean
  },
  methods: {
    switchTWCH(value) {
      return this.isTW ? tify(value) : sify(value);
    }
  }
};
</script>

<style scoped>
div {
  text-align: left;
}
</style>
