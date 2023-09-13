<template>
  <div class="auth-callback-page">
    {{ $t('authCallbackPage.content.redirect') }}
  </div>
</template>

<script lang="ts">
import { MetaInfo } from 'vue-meta'
import { AuthMixin } from '~/mixins/auth'

interface DataProps {
  subscription: any
}

export default AuthMixin.extend({
  name: 'AuthCallbackPage',

  data(): DataProps {
    return {
      subscription: null,
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('authCallbackPage.title').toString(),
    }
  },

  mounted() {
    const {
      data: { subscription },
    } = this.$supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === 'SIGNED_IN') {
        await this.handleLoginSuccess(session)
        this.subscription?.unsubscribe()
      }
    })

    this.subscription = subscription
  },

  beforeDestroy() {
    this.subscription?.unsubscribe()
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/auth/callback/index.scss';
</style>
