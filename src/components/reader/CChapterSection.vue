<template>
  <div>
    <h4>{{ switchTWCH(single.title) }}</h4>
    <div v-html="switchTWCH(single.content)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { OpenCC } from 'opencc';
import { tify, sify } from 'chinese-conv';

export default defineComponent({
  props: ['single', 'isTW'],
  setup(props) {
    // const s2t = new OpenCC('s2t.json');
    // const t2s = new OpenCC('t2s.json');
    const switchTWCH = (value: string) => (props.isTW ? tify(value) : sify(value));
    // ? s2t.convertPromise(value) : t2s.convertPromise(value));

    return { switchTWCH };
  },
});
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
