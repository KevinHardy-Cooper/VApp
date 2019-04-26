  <!-- Login form -->
<template>
  <transition name="fade" appear>
    <form id="loginForm" @submit.prevent="login">
      <label>Email</label>
      <div>
        <font-awesome-icon icon="envelope"></font-awesome-icon>
        <input type="email" placeholder="Email" name="email" v-model="email" required>
      </div>

      <label>Password</label>
      <div>
        <font-awesome-icon icon="key"></font-awesome-icon>
        <input type="password" placeholder="Password" name="password" v-model="password" required>
      </div>

      <button type="submit" value="Login">Login</button>
    </form>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      email,
      password
    };
  },
  mounted() {
    //this.$router.push("/dashboard");
  },
  methods: {
    login() {
      let self = this;

      // Define data payload
      let data = JSON.stringify({
        email: this.email,
        password: this.password
      });

      // Post data to log into the app
      this.$http
        .post("http://localhost:3000/signin", data, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(function(response) {
          console.log("Successful POST");
          console.log(response.data);
          if (response.data.code == 200) {
            // expiry date of session is 14 days
            self.$cookies.set("session_id", response.data.sessionId, "14d");
            console.log(window.$cookies.get("session_id"));
            // route back to the dashboard on successful login
            //self.$router.push("/dashboard");
            window.location.href = "/dashboard";
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/_login-form.scss";
</style>