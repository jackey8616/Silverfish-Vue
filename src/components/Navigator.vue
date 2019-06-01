<template>
  <nav id="navigator" class="navbar navbar-expand-lg navbar-dark">
    <router-link to="/" class="navbar-brand">書蠹</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbatNav" aria-expanded="false" aria-label="Toggle navgaton">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Index</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigator'
}
</script>

<style scoped>
  #navigator {
    background-color: #222426;
    box-sizing: border-box;
    position: relative;
  }
</style>
