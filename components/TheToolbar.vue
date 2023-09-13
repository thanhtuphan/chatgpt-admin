<template>
  <div class="the-toolbar">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheToolbar',
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-toolbar.scss';
</style>
