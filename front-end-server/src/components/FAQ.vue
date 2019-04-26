<!-- About section for home page -->
<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>

    <section>
      <h2>What is {{appName}}?</h2>
      <p>
        {{appName}} is a platform designed with the goal to help you improve your digital literacy and keep you safe online.
        It started out as an idea for a capstone project by a group of students at McMaster University.
      </p>
    </section>

    <section>
      <h2>How does {{appName}} work?</h2>
      <p>
        When you sign up and create an account on {{appName}}, you will be able to add one of your social media accounts.
        We will analyze (but NOT store) some privacy settings from that social media account then inform you about the implications of those settings.
      </p>
    </section>

    <section>
      <h2>Which social medias do you support?</h2>
      <p>We support Facebook, Instagram and Twitter.</p>
    </section>

    <section>
      <h2>Why should we trust you?</h2>
      <p>
        In reality, you shouldn’t trust us - just like you shouldn’t trust any other company that uses your data!
        However, we are aiming to be as transparent and honest as possible. We commit to being a free and open-source software forever.
        We are simply students that are passionate about informing the general public about their digital security.
      </p>
    </section>

    <section>
      <h2>Where can I go if I want to find out more about my privacy or digital security?</h2>
      <p>
        There are tons of resources online and we do not recommend any specific program or source.
        Simply search for things like “digital security”, “digital security”, “digital privacy” and “online safety”.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName: "Vapp"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_faq.scss";
</style>
