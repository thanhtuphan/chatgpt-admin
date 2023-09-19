<template>
  <li :class="['the-sidebar-menu-item', { 'is-active': isActive }]">
    <nuxt-link :to="to">
      <icon :icon="icon" />
      <span>{{ title }}</span>
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheSidebarMenuItem',

  props: {
    to: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    isActive() {
      if (this.to === '/') {
        return this.$route.path === this.to
      } else {
        return this.$route.path.includes(this.to)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-sidebar-menu-item.scss';
</style>
