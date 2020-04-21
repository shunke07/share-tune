<template>
  <form class="form-post">
    <BaseTextarea
      class="textarea"
      label="コメント"
      :max-length="800"
      :is-value-valid="isCommentValid"
      @onChangeValue="comment = $event"
    />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseTextarea from '~/components/form/BaseTextarea.vue'

export default Vue.extend({
  components: {
    BaseTextarea
  },

  data() {
    return {
      comment: '' as string
    }
  },

  computed: {
    isCommentValid(): boolean {
      const length = this.comment.length
      return length > 0 && length <= 800
    }
  },

  watch: {
    comment(newVal) {
      this.$emit('onChangeComment', {
        comment: newVal,
        isCommentValid: this.isCommentValid
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.form-post {
  position: fixed;
  top: 44px; // nav-bar height
  z-index: 5;
  width: 100%;
  height: 100%;
  max-width: $maxViewWidth;
  max-height: 100vh;
  margin-left: -16px;
  background: $mono4;
  overflow-y: scroll;
  padding: 16px 16px 0;
}
</style>
