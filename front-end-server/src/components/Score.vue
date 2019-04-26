<template>
  <div class="score-container">
    <h2>{{name}}</h2>
    <span :id="socialMedia"></span>
  </div>
</template>

<script>
export default {
  // A score is made up of a number and grade
  props: {
    name: String,
    socialMedia: String,
    scoreValue: Number,
    scoreGrade: String
  },
  // The mounted hook is only called once upon the creation of the page
  // Use mounted lifecyle hook to execute JS
  mounted() {
    let grade;

    // Set default values for non-existant score and grade
    if (!this.$props.scoreGrade) {
      grade = "N/A";
    } else {
      grade = this.$props.scoreGrade;
    }

    if (!this.$props.scoreValue && this.$props.scoreValue != 0) {
      this.$props.scoreValue = 0.5;
    }

    // Convert value to percentage
    if (this.$props.scoreValue > 1) {
      this.$props.scoreValue = this.$props.scoreValue / 100;
    }

    // Add a progress bar to the score
    let ProgressBar = require("progressbar.js");
    let bar = new ProgressBar.Circle("#" + this.socialMedia, {
      easing: "easeInOut",
      color: "#FCB03C",
      strokeWidth: 3,
      trailColor: "#eee",
      trailWidth: 1,
      text: {
        value: grade
      },
      from: { color: "#e5c189", width: 2.5 },
      to: { color: "#FCB03C", width: 2.5 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute("stroke", state.color);
        circle.path.setAttribute("stroke-width", state.width);
        circle.setText(grade);
      }
    });

    bar.text.style.fontSize = "2rem";

    // Animate progress bar
    bar.animate(this.$props.scoreValue);
  }
};
</script>

<style lang="scss" scoped>
h2 {
  padding-bottom: 1em;
}
.score-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

#score {
  position: relative;
}
</style>

