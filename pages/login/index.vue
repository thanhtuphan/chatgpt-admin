<template>
  <div class="login-page">
    <h1>{{ $t('loginPage.title') }}</h1>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="email">
        <el-input
          v-model="form.email"
          :placeholder="$t('common.fields.email')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :placeholder="$t('common.fields.password')"
          type="password"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="info"
        class="tw-w-full"
        @click="onLogin"
        >{{ $t('common.actions.login') }}</el-button
      >

      <!--
 <div class="tw-flex tw-items-center tw-mt-5">
        <div class="login-page__divider" />
        <div class="tw-mx-5 tw-text-gray-500">
          {{ $t('loginPage.content.loginSocial') }}
        </div>
        <div class="login-page__divider" />
      </div>

      <div class="tw-mt-5">
        <the-button-social
          :loading="loading"
          @click="onLoginSocial(Enums.SocialProvider.Google)"
        >
          <icon icon="flat-color-icons:google" />
          <span class="tw-ml-2">{{
            $t('common.actions.loginWithGoogle')
          }}</span>
        </the-button-social>
        <the-button-social
          :loading="loading"
          @click="onLoginSocial(Enums.SocialProvider.Twitter)"
        >
          <icon icon="devicon:twitter" />
          <span class="tw-ml-2">{{
            $t('common.actions.loginWithTwitter')
          }}</span>
        </the-button-social>
        <the-button-social
          :loading="loading"
          @click="onLoginSocial(Enums.SocialProvider.Facebook)"
        >
          <icon icon="logos:facebook" />
          <span class="tw-ml-2">{{
            $t('common.actions.loginWithFacebook')
          }}</span>
        </the-button-social>
      </div>
-->
    </el-form>
  </div>
</template>

<script lang="ts">
import { MetaInfo } from 'vue-meta'
import TheButtonSocial from '~/components/TheButtonSocial.vue'
import { AuthMixin } from '~/mixins/auth'

interface DataProps {
  loading: boolean

  form: {
    email: string
    password: string
  }

  rules: Record<string, any>
}

export default AuthMixin.extend({
  name: 'LoginPage',
  components: { TheButtonSocial },

  layout: 'auth',

  data(): DataProps {
    return {
      loading: false,

      form: {
        email: '',
        password: '',
      },

      rules: {
        email: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.email').toString(),
          }),
          this.Utils.Validate.email(),
        ],

        password: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.password').toString(),
          }),
        ],
      },
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('loginPage.title').toString(),
    }
  },

  methods: {
    async onLogin() {
      const refForm = this.$refs.form as any

      try {
        await refForm.validate()

        this.loading = true

        const { data, error } = await this.$supabase.auth.signInWithPassword({
          email: this.form.email,
          password: this.form.password,
        })

        if (error) {
          this.$message.error(error.message)

          return
        }

        if (data.session) {
          await this.handleLoginSuccess(data.session)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    // async onLoginSocial(provider: SocialProvider) {
    //   try {
    //     await this.$supabase.auth.signInWithOAuth({
    //       provider,
    //       options: {
    //         queryParams: {
    //           access_type: 'offline',
    //           prompt: 'consent',
    //         },
    //         redirectTo: `${window.location.origin}/auth/callback`,
    //       },
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/login/index.scss';
</style>
