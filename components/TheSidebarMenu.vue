<template>
  <ul class="the-sidebar-menu">
    <slot />
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheSidebarMenu',
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-sidebar-menu.scss';
</style>
