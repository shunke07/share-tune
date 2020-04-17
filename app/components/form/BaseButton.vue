<template>
  <button
    class="base-button"
    :disabled="disabled"
    @click.prevent="$emit('onClick')"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.base-button {
  @include strong;
  height: 32px;
  width: 100%;
  max-width: $maxViewWidth;
  padding: 6px 16px;
  box-shadow: $shadowLow;
  border-radius: 4px;
  background: $primary;
  color: $white;
  position: relative;
  transition-duration: 0.25s;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    opacity: 0.95;

    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 32px;
    width: 100%;
    box-shadow: $shadowVery;
    opacity: 0;
    transition-duration: 0.1s;
  }
}
</style>
