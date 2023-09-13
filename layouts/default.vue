<template>
  <div class="default-layout">
    <the-sidebar :value="isSidebarOpen" />
    <div :class="['default-layout__main', { 'is-active': isSidebarOpen }]">
      <the-header :sidebar.sync="isSidebarOpen" />
      <div class="default-layout__content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface DataProps {
  isSidebarOpen: boolean
}

export default Vue.extend({
  middleware: 'auth',

  data(): DataProps {
    return {
      isSidebarOpen: true,
    }
  },

  watch: {
    isSidebarOpen(value: boolean) {
      console.log(value)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/layouts/default.scss';
</style>
