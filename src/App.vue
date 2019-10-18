<template>
  <div id="app">
    <navigator />
    <div class="container">
      <router-view id="content" />
    </div>
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
    padding-top: 60px;
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
</style>
