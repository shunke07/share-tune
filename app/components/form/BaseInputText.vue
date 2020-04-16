<template>
  <label class="base-input">
    <input
      v-model="value"
      class="input"
      :class="{ '-valid': isValueValid }"
      :type="type"
      placeholder=" "
      :maxlength="maxLength"
      @blur="fillOldValue()"
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
    type: {
      type: String,
      required: true,
      validator(val) {
        return ['text', 'email', 'password'].includes(val)
      }
    },
    isValueValid: {
      type: Boolean,
      required: true
    },
    required: {
      type: Boolean,
      default: false
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
  },

  methods: {
    fillOldValue() {
      if (this.required && !this.value.length) this.value = this.currentValue
    }
  }
})
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

    &.-valid {
      color: $primary;
    }

    &:hover {
      border-bottom: 2px solid $black;
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
