<!-- Component to display settings and their implications --> 
<template>
  <div class="si-card-container">
    <div class="card-title">
      <h2>
        {{friendlySetting}} :
        <span :class="weightType">{{settingState}}</span>
      </h2>
      <font-awesome-icon icon="key" size="2x"></font-awesome-icon>
    </div>
    <hr>
    <h2>Implications</h2>
    <p>{{implications}}</p>
    <h2 v-if="instructions">Suggestions</h2>
    <p>{{instructions}}</p>
  </div>
</template>

<script>
export default {
  props: {
    setting: String,
    friendlySetting: String,
    settingState: String,
    implications: String,
    instructions: String,
    weightType: String
  },
  computed: {
    classArray() {
      return {};
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_implications-card.scss";
</style>
