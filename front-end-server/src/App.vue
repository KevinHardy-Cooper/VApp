
<template>
  <div id="app">
    <navigation :key="isLogged"></navigation>

    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

export default {
  // Empty components in other components will include this by default.
  // Remember to not leave components: {} empty
  components: {
    Navigation
  },
  computed: {
    isLogged: function() {
      let sessionId = this.$cookies.get("session_id");
      if (sessionId) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./styles/styles.scss";
</style>
