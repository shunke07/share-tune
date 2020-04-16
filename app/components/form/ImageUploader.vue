<template>
  <div class="image-uploader">
    <svg-icon class="icon" name="actions/upload" alt="画像をアップロード" />
    <input
      type="file"
      accept="image/png,image/jpeg"
      @change="onImageSelected()"
    />
    <div class="filter" />
    <img :src="imageUrl" alt="ユーザー画像" class="icon" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '~/store'

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T
}

export default Vue.extend({
  data() {
    return {
      image: '' as string
    }
  },

  computed: {
    imageUrl(): string {
      if (this.image) return this.image

      const imageUrl = (this.$store.state as RootState).loginUser?.image.url
      return imageUrl ?? require('~/assets/images/default-icon.png')
    }
  },

  methods: {
    onImageSelected(e: HTMLElementEvent<HTMLInputElement>): void {
      const file = e.target.files ? e.target.files[0] : null
      if (!file) return

      // validate file extension
      const fileExtension = file.type.split('/')[1]
      const validExtensions = ['png', 'jpg', 'jpeg']
      if (!validExtensions.includes(fileExtension)) {
        alert(
          'ファイルの形式が正しくありません\npng、jpg または jpeg 拡張子の画像を指定してください'
        )
        return
      }

      // validate file size (max size is 10MB)
      if (file.size > 1024 * 1024 * 10) {
        alert(
          'ファイルのサイズが大きすぎます\n10MB 以下の画像を指定してください'
        )
        return
      }

      // display image
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = ({ target }) => {
        if (!target || !target.result) return
        this.image = target.result as string
      }

      this.$emit('onFileUploaded', file)
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
  width: 96px;
  height: 96px;
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
