<template>
  <div class="page-container">
    <div class="form-container">
      <div class="info-container">
        <p>
          Facebook does not allow us to grab your account settings, so
          so you need to open this
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/settings?tab=privacy"
          >link</a> in a new tab and copy the
          entire page using Control + A for Windows or Command + A for Mac.
          Once copied, paste in the text box below.
        </p>
      </div>

      <textarea id="facebookText"></textarea>
      <button @click="processFacebook">Process</button>
    </div>
  </div>
</template>

<script>
// Components
export default {
  name: "facebookFlow",
  components: {},

  methods: {
    processFacebook() {
      self = this;

      let data = document.getElementById("facebookText").value;
      let splitData = data.split("\n");
      let whoCanSeeYourFuturePostsIndex = splitData.indexOf(
        "Who can see your future posts?"
      );
      let whoCanSeeYourFuturePosts =
        splitData[whoCanSeeYourFuturePostsIndex + 1];

      let whoCanSendYouFriendRequestsIndex = splitData.indexOf(
        "Who can send you friend requests?"
      );
      let whoCanSendYouFriendRequests =
        splitData[whoCanSendYouFriendRequestsIndex + 1];

      let whoCanSeeYourFriendsListIndex = splitData.indexOf(
        "Who can see your friends list?"
      );
      let whoCanSeeYourFriendsList = "";
      if (
        splitData[whoCanSeeYourFriendsListIndex + 1].indexOf("Remember") >= 0
      ) {
        whoCanSeeYourFriendsList = splitData[whoCanSeeYourFriendsListIndex + 2]; // chrome on mac
      } else {
        whoCanSeeYourFriendsList = splitData[whoCanSeeYourFriendsListIndex + 1]; // chrome on windows
      }

      let whoCanLookYouUpUsingTheEmailAddressYouProvidedIndex = splitData.indexOf(
        "Who can look you up using the email address you provided?"
      );
      let whoCanLookYouUpUsingTheEmailAddressYouProvided =
        splitData[whoCanLookYouUpUsingTheEmailAddressYouProvidedIndex + 1];

      let whoCanLookYouUpUsingThePhoneNumberYouProvidedIndex = splitData.indexOf(
        "Who can look you up using the phone number you provided?"
      );
      let whoCanLookYouUpUsingThePhoneNumberYouProvided =
        splitData[whoCanLookYouUpUsingThePhoneNumberYouProvidedIndex + 1];

      let doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfileIndex = splitData.indexOf(
        "Do you want search engines outside of Facebook to link to your profile?"
      );
      let doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfile =
        splitData[
          doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfileIndex + 1
        ];

      let settings = {
        future_posts: whoCanSeeYourFuturePosts,
        friend_requests: whoCanSendYouFriendRequests,
        friends_list: whoCanSeeYourFriendsList,
        discoverable_by_email: whoCanLookYouUpUsingTheEmailAddressYouProvided,
        discoverable_by_phone: whoCanLookYouUpUsingThePhoneNumberYouProvided,
        discoverable_by_search_engine: doYouWantSearchEnginesOutsideOfFacebookToLinkToYourProfile
      };

      let postData = JSON.stringify({
        sessionId: this.$cookies.get("session_id"),
        settings: settings
      });

      console.log(postData);

      this.$http
        .post("http://localhost:3000/score/facebook", postData, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(function(response) {
          console.log("Successful POST");
          console.log(response.data);
          if (response.data.code == 200) {
            self.$router.push("/settings/facebook");
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

<style>
@import "../styles/_facebook-flow.scss";
</style>