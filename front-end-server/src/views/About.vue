<template>
  <div>
    <Team></Team>
    <FAQ></FAQ>
    <Footer></Footer>
  </div>
</template>

<script>
// Components
import FAQ from "../components/FAQ.vue";
import Team from "../components/Team.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "about",
  components: {
    FAQ,
    Team,
    Footer
  }
};
</script>

<style>
</style>