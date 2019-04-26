<template>
  <div class="page-container">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
// Components
import LoginForm from "../components/LoginForm.vue";
import Navigation from "../components/Navigation.vue";

export default {
  name: "login",
  components: {
    Navigation,
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_login.scss";
</style>
