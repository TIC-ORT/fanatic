<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'normalize.css'
import 'animate.css'
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700|Permanent+Marker');

body {
  font-family: $main-font;
}
</style>
