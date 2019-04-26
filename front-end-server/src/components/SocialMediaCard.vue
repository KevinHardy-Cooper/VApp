<!-- Social media panels for dashboard -->
<template>
  <transition name="fade" appear>
    <div class="card-container">
      <img class="card-logo" :src="getImgUrl(imgFile)" :alt="imgFile">
      <router-link :to="{path: flowLink}" tag="button">Start {{name}} flow</router-link>
      <router-link :to="{path: '/settings/' + name}" tag="button">View {{name}} settings</router-link>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["imgFile", "name", "flowLink", "settingsLink"],
  methods: {
    // Need this method because the expression inside v-bind is executed at runtime, webpack aliases at compile time.
    getImgUrl(imgFile) {
      return require("../assets/" + imgFile);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_social-media-card.scss";
</style>

