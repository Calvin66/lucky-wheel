<template>
  <div id="app">
    <LuckyWheel />
  </div>
</template>

<script>
import LuckyWheel from './components/LuckyWheel.vue';

export default {
  name: 'App',
  components: {
    LuckyWheel
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
}
html,
body {
  height: 100%;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  height: 100%;
}
</style>
