<template>
  <div class="page-container">
    <h2>Instagram Setting</h2>
    <p>
      Find Instagram settings
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/accounts/privacy_and_security/"
      >here</a> and fill out the form below
    </p>
    <hr>
    <div class="row">
      <div class="col-sm" style="margin-top: 30px">
        <section>
          <h2>Account Privacy</h2>
          <div class="form-check">
            <label for="accountPrivacy">
              <input
                class="form-check-input"
                name="accountPrivacy"
                id="accountPrivacy"
                type="checkbox"
                value="True"
                checked="checked"
              >
              <input
                class="form-check-input"
                name="accountPrivacyFalse"
                id="accountPrivacyFalse"
                type="hidden"
                value="False"
              >
              Private Account
            </label>
          </div>
          <p>When your account is private, only people you approve can see your photos and videos on Instagram. Your existing followers won't be affected.</p>
        </section>
      </div>
    </div>
    <hr style="margin: 20px">
    <div class="row">
      <div class="col-sm" style="margin-top: 30px">
        <section>
          <h2>Activity Status</h2>
          <div class="form-check">
            <label for="activityStatus">
              <input
                class="form-check-input"
                name="activityStatus"
                id="activityStatus"
                type="checkbox"
                value="True"
                checked="checked"
              >
              <input
                class="form-check-input"
                name="activityStatusFalse"
                id="activityStatusFalse"
                type="hidden"
                value="False"
              >
              Show Activity Status
            </label>
          </div>
          <p>Allow accounts you follow and anyone you message to see when you were last active on Instagram apps. When this is turned off, you won't be able to see the activity status of other accounts.</p>
        </section>
      </div>
    </div>
    <hr style="margin: 20px">
    <div class="row">
      <div class="col-sm" style="margin-top: 30px">
        <section>
          <h2>Story Sharing</h2>
          <div class="form-check">
            <label for="storySharing">
              <input
                class="form-check-input"
                name="storySharing"
                id="storySharing"
                type="checkbox"
                value="True"
                checked="checked"
              >
              <input
                class="form-check-input"
                name="storySharingFalse"
                id="storySharingFalse"
                type="hidden"
                value="False"
              >
              Allow Sharing
            </label>
          </div>
          <p>Let people share your story as messages</p>
        </section>
      </div>
    </div>
    <hr style="margin: 20px">
    <div class="row">
      <div class="col-sm" style="margin-top: 30px">
        <section>
          <h2>Photos of You</h2>
          <div class="form-check">
            <fieldset id="igUserTagOptions">
              <label for="igUsertagReviewEnabledautomatic">
                <input
                  class="form-check-input"
                  id="igUsertagReviewEnabledautomatic"
                  name="usertagReviewEnabled"
                  type="radio"
                  value="automatic"
                  checked="checked"
                >
                Add Automatically
              </label>
              <br>
              <label for="igUsertagReviewEnabledmanual">
                <input
                  class="form-check-input"
                  id="igUsertagReviewEnabledmanual"
                  name="usertagReviewEnabled"
                  type="radio"
                  value="manual"
                >
                Add Manually
              </label>
            </fieldset>
          </div>
          <p>Let people share your story as messages</p>
        </section>
      </div>
    </div>
    <hr style="margin: 20px">
    <button @click="processInstagram" type="button" class="btn btn-primary btn-lg">Process</button>
  </div>
</template>

<script>
// Components

export default {
  name: "instagram",
  methods: {
    processInstagram() {
      let self = this;
      // HTML doesn't send the value of unchecked boxes, so in the form we added
      // hidden checkboxes with False values.
      // If the checkbox is checked we don't send the false values.
      if (document.getElementById("accountPrivacy").checked) {
        document.getElementById("accountPrivacyFalse").disabled = true;
      }

      if (document.getElementById("activityStatus").checked) {
        document.getElementById("activityStatusFalse").disabled = true;
      }

      if (document.getElementById("storySharing").checked) {
        document.getElementById("storySharingFalse").disabled = true;
      }

      let curForm = $("form#igPrivacyForm").serializeArray();
      let settings = {
        account_privacy: curForm[0].value,
        activity_status: curForm[1].value,
        story_sharing: curForm[2].value,
        usertag_review: curForm[3].value
      };

      this.$http
        .post("http://localhost:3000/score/instagram", {
          data: JSON.stringify({
            sessionId: self.$cookies.get("session_id"),
            settings: settings
          }),
          contentType: "application/json"
        })
        .then(function(response) {
          if (response.data.code === 200) {
            window.location = "/settings/instagram";
          }
        });
    }
  }
};
</script>

<style>
</style>