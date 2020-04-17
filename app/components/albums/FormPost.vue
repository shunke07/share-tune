<template>
  <div class="form-post">
    <nav class="nav-bar">
      <button class="cancel" @click="$emit('onClickClose')">
        <svg-icon name="navigation/close" title="キャンセル" />
      </button>
      <h1 class="title">
        新規投稿
      </h1>
      <button
        class="submit"
        :disabled="!isCommentValid"
        @click="$emit('onSubmit', { comment })"
      >
        シェア
      </button>
    </nav>
    <form class="compose-form">
      <BaseTextarea
        class="textarea"
        label="コメント"
        :max-length="800"
        :is-value-valid="isCommentValid"
        @onChangeValue="comment = $event"
      />
    </form>
  </div>
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
  }
})
</script>

<style lang="scss" scoped>
.form-post {
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  max-width: $maxViewWidth;
  max-height: 100vh;
  margin-left: -16px;
  background: #fcfcfc;
  overflow-y: scroll;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 4px 16px;
  margin-bottom: 16px;
  max-width: $maxViewWidth;
  background: $white;
  border-bottom: 1px solid $boundaryBlack;

  > title {
    @include subhead;
  }

  > .cancel {
    width: 28px;
    height: 28px;

    > svg {
      width: 100%;
      height: 100%;
      color: $gray;
    }
  }

  > .submit {
    @include strong;
    color: $primary;

    &:disabled {
      color: $lightGray;
    }
  }
}

.compose-form {
  margin: 0 16px;
}
</style>
