<!-- Sign up form -->
<template>
  <transition name="fade" appear>
    <!-- 
  When the form is submitted, use the signUp method.
  .prevent orevents the refreshing of the page 
    -->
    <form id="signUpForm" @submit.prevent="signUp">
      <label>Email</label>

      <div>
        <font-awesome-icon icon="envelope"></font-awesome-icon>
        <input type="email" placeholder="Email" name="email" v-model="email" required>
      </div>

      <label>Password</label>
      <div>
        <font-awesome-icon icon="key"></font-awesome-icon>
        <input
          type="password"
          placeholder="Password"
          name="password"
          v-model="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          required
        >
      </div>

      <label>Confirm Password</label>
      <div>
        <font-awesome-icon icon="key"></font-awesome-icon>
        <input
          type="password"
          placeholder="Confirm password"
          name="confirm"
          v-model="confirm"
          required
        >
      </div>
      <button type="submit" value="Sign up">Sign up</button>
    </form>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      email,
      password,
      confirm
    };
  },
  methods: {
    signUp() {
      let self = this;

      // Define data payload
      let data = JSON.stringify({
        email: this.email,
        password: this.password
      });

      // Post data to sign up
      this.$http
        .post("http://localhost:3000/signup", data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(function(response) {
          console.log("Successful POST");
          console.log(response.data);
          self.$router.push("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_sign-up-form.scss";
</style>
