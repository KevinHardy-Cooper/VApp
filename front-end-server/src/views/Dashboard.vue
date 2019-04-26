<!-- View for dashboard -->
<template>
  <div class="page-container">
    <div class="scores-container">
      <score v-for="score in scores" v-bind:key="[score.scoreValue,score.name]" v-bind="score"></score>
    </div>
    <div class="history-container">
      <history></history>
    </div>
    <div class="sm-cards-container">
      <!-- Generate panel templates -->
      <SocialMediaCard v-for="card in cards" v-bind:key="card.id" v-bind="card"></SocialMediaCard>
    </div>
  </div>
</template>

<script>
import Foot from "../components/Footer.vue";
import SocialMediaCard from "../components/SocialMediaCard.vue";
import Score from "../components/Score.vue";
import History from "../views/History.vue";

export default {
  name: "dashboard",
  components: {
    SocialMediaCard,
    Foot,
    Score,
    History
  },
  data() {
    return {
      // Initial value of cards
      cards: [
        {
          id: 1,
          imgFile: "twitter-logo.svg",
          name: "Twitter",
          score: "N/A",
          flowLink: "/twitter",
          settingsLink: "twitter"
        },
        {
          id: 2,
          imgFile: "facebook-logo.svg",
          name: "Facebook",
          score: "N/A",
          flowLink: "/facebook",
          settingsLink: "facebook"
        },
        {
          id: 3,
          imgFile: "instagram-logo.svg",
          name: "Instagram",
          score: "N/A",
          flowLink: "/instagram",
          settingsLink: "instagram"
        }
      ],
      scores: [
        {
          name: "Cumulative",
          socialMedia: "cumulative",
          scoreValue: 0.5,
          scoreGrade: "N/A"
        },
        {
          name: "Twitter",
          socialMedia: "twitter",
          scoreValue: 0.5,
          scoreGrade: "N/A"
        },
        {
          name: "Facebook",
          socialMedia: "facebook",
          scoreValue: 0.5,
          scoreGrade: "N/A"
        },
        {
          name: "Instagram",
          socialMedia: "instagram",
          scoreValue: 0.5,
          scoreGrade: "N/A"
        }
      ]
    };
  },

  mounted() {
    this.getScores();
  },
  methods: {
    // Gets all scores
    getScores() {
      let self = this;
      // Get most recent scores from all social medias
      this.$http
        .get(
          "http://localhost:3000/score/recent/" +
            this.$cookies.get("session_id")
        )
        .then(function(response) {
          let scores = response.data.scores;

          // Should be a better way of getting all the values, but that would involve sorting the response
          for (let i = 0; i < scores.length; i++) {
            if (scores[i].type_id == 1) {
              self.scores[0].scoreValue = self.invertScoreValue(
                scores[i].score
              );
              self.scores[0].scoreGrade = self.convertToGrade(
                self.scores[0].scoreValue
              );
            } else if (scores[i].type_id == 2) {
              self.scores[1].scoreValue = self.invertScoreValue(
                scores[i].score
              );
              self.scores[1].scoreGrade = self.convertToGrade(
                self.scores[1].scoreValue
              );
            } else if (scores[i].type_id == 3) {
              self.scores[2].scoreValue = self.invertScoreValue(
                scores[i].score
              );
              self.scores[2].scoreGrade = self.convertToGrade(
                self.scores[2].scoreValue
              );
            } else if (scores[i].type_id == 4) {
              self.scores[3].scoreValue = self.invertScoreValue(
                scores[i].score
              );
              self.scores[3].scoreGrade = self.convertToGrade(
                self.scores[3].scoreValue
              );
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log(self.scoreGrade);
    },

    // Converts score value to letter grade
    convertToGrade(score) {
      let grade = "F";
      if (score >= 90) {
        grade = "A+";
      } else if (score >= 85) {
        grade = "A";
      } else if (score >= 80) {
        grade = "A-";
      } else if (score >= 75) {
        grade = "B+";
      } else if (score >= 70) {
        grade = "B";
      } else if (score >= 65) {
        grade = "B-";
      } else if (score >= 60) {
        grade = "C+";
      } else if (score >= 55) {
        grade = "C";
      } else if (score >= 50) {
        grade = "C-";
      } else if (score >= 45) {
        grade = "D+";
      } else if (score >= 40) {
        grade = "D";
      } else if (score >= 35) {
        grade = "D-";
      }
      return grade;
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
@import "../styles/_dashboard.scss";
</style>
