<!-- View for settings and implications -->
<template>
  <div class="page-container">
    <Score
      v-if="scoreGrade != 'N/A'"
      :key="scoreGrade"
      v-bind:scoreGrade="scoreGrade"
      v-bind:scoreValue="scoreValue"
      v-bind:name="name"
      v-bind:socialMedia="socialMedia"
    ></Score>
    <h2>
      <a :href="socialMediaPrivacyPage">Change your settings here</a>
    </h2>
    <div class="cards-container">
      <ImplicationsCard
        v-for="settingCard in settingCards"
        :key="settingCard.setting"
        v-bind="settingCard"
      ></ImplicationsCard>
    </div>
  </div>
</template>

<script>
// Components
import ImplicationsCard from "../components/ImplicationsCard.vue";
import Score from "../components/Score.vue";

export default {
  name: "settings",
  components: {
    ImplicationsCard,
    Score
  },
  data() {
    return {
      socialMedia: String,
      settingCards: [],
      socialMediaPrivacyPage: String,
      scoreGrade: "N/A",
      scoreValue: 1,
      name: String
    };
  },
  created() {
    // Grab social media name from url
    this.socialMedia = location.pathname
      .match(/\/settings\/(.*)/)[1]
      .toLowerCase();

    this.name = location.pathname.match(/\/settings\/(.*)/)[1];

    // Get score and grade
    this.getScore(this.socialMedia);
  },

  mounted() {
    // Get settings based on social media
    this.getSettings(this.socialMedia);
  },
  methods: {
    // Gets settings based on social media
    getSettings(socialMedia) {
      let self = this;
      let settings = [];
      let friendlySettings = [];
      let implications = [];
      let fix = [];

      if (socialMedia === "twitter") {
        settings = [
          "discoverable_by_email",
          "geo_enabled",
          "protected",
          "use_cookie_personalization",
          "allow_dms_from"
        ];
        friendlySettings = {
          discoverable_by_email: "Let others find you by your email address",
          geo_enabled:
            "Tweet with a location (website), Precise location (mobile app)",
          protected: "Protect your tweets from the public",
          use_cookie_personalization:
            "Track where you see Twitter content across the web",
          allow_dms_from:
            "Receive direct messages from anyone (website), Receive message requests (mobile app)"
        };
        this.socialMediaPrivacyPage = "https://twitter.com/settings/safety";
      } else if (socialMedia === "facebook") {
        settings = [
          "future_posts",
          "friend_requests",
          "friends_list",
          "discoverable_by_email",
          "discoverable_by_phone",
          "discoverable_by_search_engine"
        ];
        friendlySettings = {
          future_posts: "Who can see your future posts",
          friend_requests: "Who can send you friend requests",
          friends_list: "Who can see your friends list",
          discoverable_by_email:
            "Who can look you up using the email address you provided",
          discoverable_by_phone:
            "Who can look you up using the phone number you provided",
          discoverable_by_search_engine:
            "Do you want search engines outside of Facebook to link to your profile"
        };
        this.socialMediaPrivacyPage =
          "https://www.facebook.com/settings?tab=privacy";
      } else if (socialMedia === "instagram") {
        settings = [
          "account_privacy",
          "activity_status",
          "story_sharing",
          "usertag_review"
        ];

        friendlySettings = {
          account_privacy: "Make account private",
          activity_status: "Show activity status",
          story_sharing: "Allow sharing of story photos and videos",
          usertag_review:
            "Add tagged photos and videos to your profile automatically"
        };
        this.socialMediaPrivacyPage =
          "https://www.instagram.com/accounts/privacy_and_security/";
      }

      let settingStates;

      // Get user setting states for social media
      this.$http
        .get("http://localhost:3000/user/settings/" + this.socialMedia)
        .then(function(response) {
          // On success populate data array
          if (response.data.code === 200) {
            for (let i = 0; i < settings.length; i++) {
              // Use .all to wait for all requests to complete before proceeding
              self.$http
                .all([
                  self.getImplications(
                    self.socialMedia,
                    settings[i],
                    response.data[settings[i]]
                  ),
                  self.getInstructions(
                    self.socialMedia,
                    settings[i],
                    response.data[settings[i]]
                  ),
                  self.getWeights(self.socialMedia, settings[i])
                ])
                .then(
                  self.$http.spread(function(
                    implications,
                    instructions,
                    weights
                  ) {
                    // Suboptimal implementation of getting the optimal weight -- bloats function. Should be a backend API call.
                    // Getting type of weight, ie optimal, sub-optimal, or worst
                    let max = 0;
                    let min = Number.MAX_SAFE_INTEGER;
                    let weightsData = weights.data.weights;

                    for (let i = 0; i < weightsData.length; i++) {
                      if (weightsData[i].weight > max) {
                        max = weightsData[i].weight;
                      }
                      if (weightsData[i].weight < min) {
                        min = weightsData[i].weight;
                      }
                    }

                    let weightType;

                    // Compare setting state to weight value and assign type
                    for (let j = 0; j < weightsData.length; j++) {
                      // If worst weight
                      if (
                        weightsData[j].state.toString().toLowerCase() ===
                          response.data[settings[i]].toString().toLowerCase() &&
                        weightsData[j].weight === max
                      ) {
                        weightType = "worst";
                        // If optimal weight
                      } else if (
                        weightsData[j].state.toString().toLowerCase() ===
                          response.data[settings[i]].toString().toLowerCase() &&
                        weightsData[j].weight === min
                      ) {
                        weightType = "optimal";
                        // If sub-optimal weight
                      } else {
                        weightType = "sub-optimal";
                      }
                    }

                    let settingCard = {
                      setting: settings[i],
                      friendlySetting: friendlySettings[settings[i]],
                      settingState: response.data[settings[i]].toString(),
                      implications: implications.data.implications,
                      instructions: instructions.data.instructions,
                      weightType: weightType
                    };

                    // Push new implications card
                    self.settingCards.push(settingCard);
                  })
                );
            }
          }
        });
    },
    // Gets implications based on social media, setting, and setting's value
    getImplications(socialMedia, setting, value) {
      return this.$http.get(
        "http://localhost:3000/implications/" +
          socialMedia +
          "/" +
          setting +
          "/" +
          value
      );
    },
    // Gets instructions on how to fix based on implication
    getInstructions(socialMedia, setting, value) {
      return this.$http.get(
        "http://localhost:3000/instructions/" +
          socialMedia +
          "/" +
          setting +
          "/" +
          value
      );
    },
    getWeights(socialMedia, setting) {
      return this.$http.get(
        "http://localhost:3000/implicationWeights/" +
          socialMedia +
          "/" +
          setting
      );
    },
    // Gets social media score
    getScore(socialMedia) {
      let self = this;
      // Get social media score and grade
      this.$http
        .get(
          "http://localhost:3000/grade/" +
            this.$cookies.get("session_id") +
            "/" +
            socialMedia
        )
        .then(function(response) {
          if (response.data.code === 200) {
            self.scoreValue = self.invertScoreValue(response.data.score);
            self.scoreGrade = response.data.grade;
          } else {
            console.log(reponse.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    invertScoreValue(score) {
      let value = score - 100;
      if (value < 0) {
        value = value * -1;
      }
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_settings.scss";
</style>

