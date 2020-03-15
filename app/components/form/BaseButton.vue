<template>
  <button
    class="base-button"
    :disabled="disabled"
    @click.prevent="$emit('onClick')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
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
}
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

  &:disabled {
    opacity: 0.5;
  }
}
</style>
