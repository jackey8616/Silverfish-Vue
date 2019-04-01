<template>
  <div id="app">
    <navigator />
    <router-view id="content" />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #D4D8DB;
  background-color: #2c3e50;
}
#content {
  padding-top: 60px;
}
</style>
