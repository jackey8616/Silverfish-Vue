<template>
  <button @click="toggle()" class="btn-sm btn-color-2">{{ Omine.toggle ? `On: ${this.hashRate} h/s` : 'Off' }}</button>
</template>

<script>
export default {
  name: 'omine',
  data () {
    return {
      interval: null,
      hashRate: 0
    }
  },
  computed: {
    Omine () {
      return this.$vuex.getters.getOmine() || {};
    }
  },
  created () {
    this.checkOmine(this.Omine.toggle);
  },
  methods: {
    toggle() {
      this.Omine.toggle = !this.Omine.toggle;
      this.checkOmine(this.Omine.toggle);
    },
    checkOmine (t) {
      if (t === true) {
          OMINEId(this.Omine.loginID, this.Omine.thread)
          throttleMiner = this.Omine.throttle;
          var lastHashes = 0;
          this.interval = setInterval(() => {
            for (;sendStack.length > 0;)
              console.log(sendStack.pop());
            for (;receiveStack.length > 0;) 
              console.log(receiveStack.pop());
            this.hashRate = (totalhashes - lastHashes) / 2;
            console.log(`[${new Date().toLocaleString()}] calculated ${totalhashes} hashes.(${this.hashRate})`)
            lastHashes = totalhashes
          }, 2e3);
          console.log("Started.");
      } else {
          stopMining();
          clearInterval(this.interval);
          console.log("Stopped.");
      }
    }
  }
}
</script>
