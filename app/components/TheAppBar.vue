<template>
  <section class="app-bar">
    <nav v-if="backIconVisible" class="nav leading">
      <button class="icon" @click="$router.back()">
        <svg-icon name="navigation/arrow_back" title="back" />
      </button>
    </nav>
    <h1 class="title">
      {{ title }}
    </h1>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    backIconVisible: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: $maxViewWidth;
  position: fixed;
  top: 0;
  height: 44px;
  padding: 4px 16px;
  background: $white;
  border: 1px solid $boundaryBlack;
  z-index: 2;

  > .title {
    @include subhead;
  }

  > .nav {
    display: flex;
    align-items: center;
    height: inherit;
    position: absolute;

    > .icon {
      width: 24px;
      height: 24px;

      svg {
        width: 100%;
        height: 100%;
        color: $gray;
      }
    }

    &.leading {
      left: 16px;
    }
  }
}
</style>
