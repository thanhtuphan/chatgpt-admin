<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <div class="the-header-user-info">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :size="28"
      />

      <div class="the-header-user-info__name">{{ '' }}</div>
    </div>

    <el-dropdown-menu slot="dropdown" class="tw-w-[150px]">
      <!--
 <el-dropdown-item command="profile">{{
        $t('common.header.userInfo.profile')
      }}</el-dropdown-item>
-->
      <el-dropdown-item command="logout">{{
        $t('common.header.userInfo.logout')
      }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { User } from '@supabase/supabase-js'
import Vue from 'vue'

type CommandType = 'profile' | 'logout'

export default Vue.extend({
  name: 'TheHeaderUserInfo',

  computed: {
    user(): User {
      return this.$store.state.auth.user
    },
  },

  methods: {
    handleCommand(command: CommandType) {
      switch (command) {
        case 'profile':
          this.$router.push(this.RoutePage.PROFILE)
          break

        case 'logout':
          this.$store.dispatch('logout')
          break
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/the-header-user-info.scss';
</style>
