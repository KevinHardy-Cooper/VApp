<template>
  <div class="error-box">
    <strong>Error!</strong>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.error-box {
  padding: 1em 2em;
  background: #f3beb8;
  border: 1px solid #f09898;
}
</style>
