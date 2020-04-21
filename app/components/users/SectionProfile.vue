<template>
  <section class="section-profile">
    <img :src="imageUrl" alt="ユーザー画像" class="icon" />
    <h1 class="name">
      {{ user.displayName }}
    </h1>
    <p v-if="user.profileText">
      {{ user.profileText }}
    </p>
    <div v-if="user.siteUrl" class="site">
      <svg-icon name="link" title="ウェブサイト" />
      <a :href="user.siteUrl" target="_blank" rel="noopener noreferrer">
        {{ user.siteUrl }}
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { User } from '~/types/firestore'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },

  computed: {
    imageUrl(): string {
      const imageUrl = this.user.image.url
      return imageUrl ?? require('~/assets/images/default-icon.png')
    }
  }
})
</script>

<style lang="scss" scoped>
.section-profile {
  margin: 0 -16px;
  padding: 0 32px 16px;

  > .icon {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border: 1px solid $boundaryBlack;
    border-radius: 50%;
  }

  > .site {
    display: flex;
    align-items: center;

    > a {
      color: $primary;
    }

    > svg {
      color: $mono2;
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }

  > .name {
    @include subhead;
  }
}
</style>
