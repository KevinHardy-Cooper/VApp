<template>
  <div class="page-container">
    <SignUpForm></SignUpForm>
  </div>
</template>

<script>
// Components
import SignUpForm from "../components/SignUpForm.vue";

export default {
  name: "signUp",
  components: {
    SignUpForm
  }
};
</script>

<style>
@import "../styles/_login.scss";
</style>