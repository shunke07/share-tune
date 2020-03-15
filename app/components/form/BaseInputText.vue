<template>
  <label class="base-input">
    <input
      v-model="value"
      class="input"
      :type="type"
      placeholder=" "
      :maxlength="maxLength"
    />
    <span class="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    currentValue: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator(val) {
        return ['text', 'email', 'password'].includes(val)
      }
    }
  },

  data() {
    return {
      value: ''
    }
  },

  watch: {
    value(newVal) {
      this.$emit('onChangeValue', newVal)
    }
  },

  mounted() {
    if (this.currentValue) this.value = this.currentValue
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;
  width: 100%;
  max-width: $maxViewWidth;

  > .input {
    @include input;
    width: 100%;
    height: 40px;
    caret-color: $primary;
    border-bottom: 1px solid $lightGray;
    padding-top: 12px;

    &:hover {
      border-bottom: 2px solid $black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid $primary;

      + .label {
        color: $primary;
        transform: translateY(-16px) scale(0.75);
      }
    }

    &:not(:placeholder-shown) + .label {
      transform: translateY(-16px) scale(0.75);
    }
  }

  > .label {
    @include input;
    font-size: 14px;
    bottom: 4px;
    left: 0;
    position: absolute;
    color: $gray;
    transform-origin: 0 0;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
    pointer-events: none;
  }
}
</style>
