<template>
  <transition name="fade">
    <div class="loader">
      <!-- svg spinner -->
      <svg
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".3" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
      <p class="text">Loading...</p>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.loader {
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  min-height: 100vh;
  z-index: 10;

  > svg {
    color: $primary;
    width: 56px;
    height: 56px;
  }

  > .text {
    @include caption;
    color: $primary;
    display: inline-block;
    margin-top: 8px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
