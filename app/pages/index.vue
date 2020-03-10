<template>
  <section class="landing-page">
    <h1 class="title">
      ShareTune
    </h1>
    <h2 class="copy">
      好きな音楽を語ろう。
    </h2>
  </section>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: '',
      title: 'ShareTune'
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 32px);
  min-height: 100vh;
  margin: 0 auto;

  > .title {
    @include title-1;
    margin-bottom: 8px;
  }

  > .copy {
    @include subhead;
  }
}
</style>
