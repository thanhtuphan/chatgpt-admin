<template>
  <aside :class="['the-sidebar', { 'is-active': value }]">
    <div class="the-sidebar__logo">
      <img src="/images/logo.png" alt="" />
    </div>

    <the-sidebar-menu>
      <the-sidebar-menu-item
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.to"
        :icon="menu.icon"
        :title="menu.title"
      />
    </the-sidebar-menu>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TheSidebar',

  props: {
    value: {
      type: Boolean,
    },
  },

  data() {
    return {
      menus: [
        {
          icon: 'akar-icons:dashboard',
          to: this.RoutePage.HOME,
          title: this.$t('common.sidebar.menus.dashboard'),
        },
        {
          icon: 'mdi:company',
          to: this.RoutePage.USERS,
          title: this.$t('common.sidebar.menus.companyManagement'),
        },
        {
          icon: 'material-symbols:chat-outline',
          to: this.RoutePage.PRODUCTS,
          title: this.$t('common.sidebar.menus.chatHistory'),
        },
        {
          icon: 'ant-design:setting-outlined',
          to: this.RoutePage.NOTICES,
          title: this.$t('common.sidebar.menus.settingChat'),
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-sidebar.scss';
</style>
