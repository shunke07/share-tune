<template>
  <div class="only-sp-view site-wrapper">
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
.site-wrapper {
  padding-bottom: calc(60px + env(safe-area-inset-bottom));
  position: relative;
}

.only-sp-view {
  width: 100%;
  max-width: 414px;
  margin: 0 auto;
  background: #fcfcfc;
  display: block;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
</style>
