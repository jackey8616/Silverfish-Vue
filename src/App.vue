<template>
  <div id="app">
    <router-view name="nav" />
    <router-view />
    <foot />
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
    min-height: 85.1vh;
    padding: 60px 0;
  }
  .btn-color-1 {
    color: #ffffff;
    background-color: #5c9291;
    border-color: #5c9291;
  }
  .btn-color-2 {
    color: #ffffff;
    background-color: #9079ad;
    border-color: #9079ad;
  }
  .btn-color-3 {
    color: #ffffff;
    background-color: #9d5b8b;
    border-color: #9d5b8b;
  }

  input.form-control {
    background-color: #8b968d;
    border-color: #8b968d;
  }
  input.form-control::placeholder {
    color: #203744;
  }
  /* Need to remove after Home component not use as List. */
  img {
    width: 100%;
    height: 100%;
  }
</style>
