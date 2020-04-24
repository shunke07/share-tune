<template>
  <label class="base-input">
    <input
      v-model="value"
      class="input"
      :class="{ '-valid': isValueValid }"
      :type="inputType"
      placeholder=" "
      :maxlength="maxLength"
      @blur="fillOldValue()"
    />
    <span class="label">{{ label }}</span>
    <button
      v-if="type === 'password'"
      class="visibility"
      @click.prevent="switchPasswordVisiblity()"
    >
      <svg-icon
        v-if="isPasswordVisible"
        name="actions/visibility"
        title="パスワードを非表示にする"
      />
      <svg-icon
        v-else
        name="actions/visibility_off"
        title="パスワードを表示する"
      />
    </button>
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
      value: '' as string,
      isPasswordVisible: false as boolean
    }
  },

  computed: {
    inputType(): string {
      if (this.type !== 'password') return this.type
      return this.isPasswordVisible ? 'text' : 'password'
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
    },

    switchPasswordVisiblity() {
      this.isPasswordVisible = !this.isPasswordVisible
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
    border-bottom: 1px solid $mono3;
    padding-top: 12px;

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
    bottom: 4px;
    left: 0;
    position: absolute;
    color: $mono2;
    transform-origin: 0 0;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
    pointer-events: none;
  }

  > .visibility {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 12px;
    right: 12px;
  }

  svg {
    width: 100%;
    height: 100%;
    color: $mono2;
  }
}
</style>
