<template>
  <label class="base-textarea">
    <textarea
      v-model="value"
      class="textarea"
      :class="{ '-valid': isValueValid }"
      placeholder=" "
      :maxlength="maxLength"
    />
    <span class="label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
    isValueValid: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      value: '' as string
    }
  },

  watch: {
    value(newVal: string) {
      this.$emit('onChangeValue', newVal)
    }
  },

  mounted() {
    if (this.currentValue) this.value = this.currentValue
  }
})
</script>

<style lang="scss" scoped>
.base-textarea {
  display: block;
  position: relative;
  width: 100%;
  height: 120px;
  max-width: $maxViewWidth;

  > .textarea {
    @include input;
    resize: none;
    width: 100%;
    height: 100%;
    caret-color: $primary;
    border-bottom: 1px solid $mono3;
    margin-top: 16px;

    &.-valid {
      color: $primary;
    }

    &:hover {
      border-bottom: 2px solid $mono1;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid $primary;

      + .label {
        color: $primary;
        transform: translateY(-20px) scale(0.75);
      }
    }

    &:not(:placeholder-shown) + .label {
      transform: translateY(-20px) scale(0.75);
    }
  }

  > .label {
    @include input;
    font-size: 14px;
    top: 16px;
    left: 0;
    position: absolute;
    color: $mono2;
    transform-origin: 0 0;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
    pointer-events: none;
  }
}
</style>
