<template>
  <div class="profile-page">{{ $t('profilePage.title') }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

export default Vue.extend({
  name: 'ProfilePage',

  head(): MetaInfo {
    return {
      title: this.$t('profilePage.title').toString(),
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/profile/index.scss';
</style>
