<!-- View for home page -->
<template>
  <div class="splash-container">
    <SplashScreen></SplashScreen>

    <div class="card-container">
      <div class="card-item">
        <div class="card-title">
          <font-awesome-icon icon="cogs" size="6x"></font-awesome-icon>
          <div class="title">
            <h2>Settings & Implications</h2>
            <span class="byline">AN IMPLICATION FOR EVERY SETTING</span>
          </div>
        </div>
        <p>
          Have you ever wondered what all those privacy settings on
          Facebook mean? We'll tell you in plain English. Connect your
          social media accounts to
          <strong>VApp</strong> and learn about
          the implications of each of these settings.
        </p>
      </div>

      <div class="card-item">
        <div class="card-title">
          <font-awesome-icon icon="signal" size="6x"></font-awesome-icon>

          <div class="title">
            <h2>Progress</h2>
            <span class="byline">WATCH AS YOUR SCORE INCREASES</span>
          </div>
        </div>
        <p>
          Keep track of your progress online when you use
          <strong>VApp</strong>. See a history of your score and watch how
          you improve your digital security.
        </p>
      </div>

      <div class="card-item">
        <div class="card-title">
          <font-awesome-icon icon="lock" size="6x"></font-awesome-icon>
          <div class="title">
            <h2>Safe & Secure</h2>
            <span class="byline">IMPOSSIBLE TO BREAK</span>
          </div>
        </div>
        <p>
          Your data will be secured from end-to-end - so even if we wanted
          to read your data, we couldn’t! We take it a step further by
          committing not to save any of your data.
        </p>
      </div>
    </div>
    <div class="quote-container">
      <b>
        Arguing that you don't care about the right to privacy because you have nothing to hide is no different
        than saying you don't care about free speech because you have nothing to say.”
        <br>-
        Edward Snowden
      </b>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
// Components
import Navigation from "../components/Navigation.vue";
import SplashScreen from "../components/SplashScreen.vue";
import Foot from "../components/Footer.vue";

export default {
  name: "home",
  components: {
    SplashScreen,
    Navigation,
    // Component names cannot be the same as HTML tags, so Footer.vue -> foot
    Foot
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_home.scss";
</style>

