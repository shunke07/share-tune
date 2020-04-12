<template>
  <div class="image-uploader">
    <svg-icon class="icon" name="actions/upload" alt="画像をアップロード" />
    <input type="file" accept="image/png,image/jpeg" />
    <div class="filter" />
    <img :src="imageUrl" alt="ユーザー画像" class="icon" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      image: ''
    }
  },

  computed: {
    imageUrl(): string {
      const imageUrl = this.$store.state.loginUser?.imageUrl
      return imageUrl ?? require('~/assets/images/default-icon.png')
    }
  }
})
</script>

<style lang="scss" scoped>
.image-uploader {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  background: $lightGray;
  border-radius: 50%;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  > svg {
    cursor: pointer;
    width: 32px;
    height: 32px;
    color: $white;
    z-index: 2;
  }

  > input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    border: none;
    text-indent: 100vw;
    z-index: 2;
  }

  > .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      background: rgba($black, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      border-radius: 50%;
      border: solid 1px $boundaryBlack;
    }
  }
}
</style>
