<template>
  <div class="container">
    <nav class="app-bar-icons">
      <button
        class="icon back"
        @click="$router.push(`/users/${$firebase.currentUser.uid}/`)"
      >
        <svg-icon name="navigation/arrow_back" title="戻る" />
      </button>
      <button class="icon" @click="changeColorMode()">
        <svg-icon
          name="actions/settings_brightness"
          title="カラーモードを変更"
        />
      </button>
    </nav>
    <FormProfiles />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FormProfiles from '~/components/settings/FormProfiles.vue'

export default Vue.extend({
  components: {
    FormProfiles
  },

  methods: {
    changeColorMode() {
      const currentMode = this.$colorMode.value
      this.$colorMode.value = currentMode === 'light' ? 'dark' : 'light'
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: calc(100% - 32px);

  > .app-bar-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: $maxViewWidth;
    height: 44px;
    padding: 0 16px;
    margin-left: -16px;
    z-index: 3;

    > .icon {
      width: 24px;
      height: 24px;

      &.back {
        width: 28px;
        height: 28px;
      }

      > svg {
        color: $mono2;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
