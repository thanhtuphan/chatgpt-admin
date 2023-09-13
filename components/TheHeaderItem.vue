<template>
  <div class="the-header-item">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheHeaderItem',
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-header-item.scss';
</style>
