<template>
  <div class="auth-layout">
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AuthLayout',

  middleware: 'guest',
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/layouts/auth.scss';
</style>
