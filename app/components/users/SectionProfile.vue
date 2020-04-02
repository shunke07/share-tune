<template>
  <section class="section-profile">
    <img
      v-if="user.imageUrl"
      :src="user.imageUrl"
      alt="ユーザー画像"
      class="icon"
    />
    <img
      v-else
      src="~/assets/images/default-icon.png"
      alt="ユーザー画像"
      class="icon"
    />
    <h1 class="name">
      {{ user.displayName }}
    </h1>
    <p v-if="user.profileText">
      {{ user.profileText }}
    </p>
    <div v-if="user.siteUrl" class="site">
      <svg-icon name="link" title="site" />
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
  }

  > .site {
    display: flex;
    align-items: center;

    > a {
      color: $primary;
    }

    > svg {
      color: $gray;
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
