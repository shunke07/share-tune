<template>
  <div class="container">
    <FormProfiles />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FormProfiles from '~/components/settings/FormProfiles.vue'

export default Vue.extend({
  components: {
    FormProfiles
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: calc(100% - 32px);
}
</style>
