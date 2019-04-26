 <!-- Navigation bar -->
<template>
  <nav>
    <!-- 
    router-links must have a tag in order to apply style 
    router points to a .vue file based on the names given in router.js
    -->
    <ul>
      <router-link tag="div" class="logo" to="/">
        <img id="logo-icon" src="../assets/shield.svg">
        <b>VAPP</b>
      </router-link>
    </ul>
    <ul>
      <router-link tag="li" to="/about">About</router-link>
      <router-link tag="li" to="/dashboard" v-if="this.$parent.isLogged">Dashboard</router-link>
      <!-- <router-link tag="li" to="/history" v-if="this.$parent.isLogged">History</router-link> -->
      <span class="separator">|</span>
      <router-link tag="li" to="/login" v-if="!this.$parent.isLogged">Login</router-link>
      <router-link tag="li" to="/signup" v-if="!this.$parent.isLogged">Sign Up</router-link>
      <li v-if="this.$parent.isLogged" v-on:click="signOut">Sign Out</li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$cookies.remove("session_id");
      window.location.href = "/";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_navigation.scss";
</style>

